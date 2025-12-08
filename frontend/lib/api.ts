import { supabase, Job } from './supabase';

export interface JobsResponse {
  total: number;
  jobs: Job[];
  filters_applied?: {
    language?: string;
    job_type?: string;
    min_salary?: number;
    verified_only?: boolean;
  };
}

export interface HealthStatus {
  crawler_status: string;
  sources_scanned: number;
  last_update: string;
  ai_engine_version: string;
  jobs_in_database: number;
}

export const api = {
  /**
   * Get jobs from Supabase with optional filters
   */
  async getJobs(filters?: {
    lang?: string;
    job_type?: string;
    min_salary?: number;
    verified_only?: boolean;
  }): Promise<JobsResponse> {
    try {
      let query = supabase
        .from('jobs')
        .select('*')
        .order('created_at', { ascending: false });

      // Apply language filter
      if (filters?.lang && filters.lang !== 'all') {
        const langMap: { [key: string]: string } = {
          zh: 'Chinese',
          ko: 'Korean',
          ja: 'Japanese',
          de: 'German',
          es: 'Spanish',
          fr: 'French',
        };

        const targetLang = langMap[filters.lang];
        if (targetLang) {
          // Check if any element in languages array contains the target language
          query = query.contains('languages', [targetLang]);
        }
      }

      // Apply job type filter
      if (filters?.job_type && filters.job_type !== 'All') {
        query = query.eq('type', filters.job_type);
      }

      // Apply salary filter
      if (filters?.min_salary) {
        query = query.gte('salary_min', filters.min_salary);
      }

      // Apply verified filter
      if (filters?.verified_only) {
        query = query.eq('ai_verified', true);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Supabase query error:', error);
        throw new Error(error.message);
      }

      return {
        total: data?.length || 0,
        jobs: data || [],
        filters_applied: filters,
      };
    } catch (error: any) {
      console.error('Error fetching jobs:', error);
      throw new Error(error.message || 'Failed to fetch jobs from database');
    }
  },

  /**
   * Get health status (simulated - since we don't have a backend now)
   */
  async getHealthStatus(): Promise<HealthStatus> {
    try {
      // Count total jobs in database
      const { count, error } = await supabase
        .from('jobs')
        .select('*', { count: 'exact', head: true });

      if (error) throw error;

      return {
        crawler_status: 'manual',
        sources_scanned: 0, // Manual entry, no scraping yet
        last_update: new Date().toLocaleTimeString(),
        ai_engine_version: 'v1.0.0-manual',
        jobs_in_database: count || 0,
      };
    } catch (error) {
      console.error('Error fetching health status:', error);
      return {
        crawler_status: 'offline',
        sources_scanned: 0,
        last_update: 'Unknown',
        ai_engine_version: 'v1.0.0',
        jobs_in_database: 0,
      };
    }
  },

  /**
   * Get single job by ID
   */
  async getJobById(id: number): Promise<Job> {
    try {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      if (!data) throw new Error('Job not found');

      return data;
    } catch (error: any) {
      console.error('Error fetching job:', error);
      throw new Error(error.message || 'Failed to fetch job');
    }
  },

  /**
   * Get supported languages (static list)
   */
  async getSupportedLanguages() {
    return {
      languages: [
        { code: 'all', name: 'All Languages', flag: '🌍' },
        { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
        { code: 'ko', name: 'Korean', flag: '🇰🇷' },
        { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
        { code: 'de', name: 'German', flag: '🇩🇪' },
        { code: 'es', name: 'Spanish', flag: '🇪🇸' },
        { code: 'fr', name: 'French', flag: '🇫🇷' },
      ],
    };
  },

  /**
   * Insert a new job (for manual entry or admin panel)
   */
  async createJob(jobData: Omit<Job, 'id' | 'created_at' | 'updated_at'>): Promise<Job> {
    try {
      const { data, error } = await supabase
        .from('jobs')
        .insert([jobData])
        .select()
        .single();

      if (error) throw error;
      if (!data) throw new Error('Failed to create job');

      return data;
    } catch (error: any) {
      console.error('Error creating job:', error);
      throw new Error(error.message || 'Failed to create job');
    }
  },

  /**
   * Update an existing job
   */
  async updateJob(id: number, updates: Partial<Job>): Promise<Job> {
    try {
      const { data, error } = await supabase
        .from('jobs')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      if (!data) throw new Error('Failed to update job');

      return data;
    } catch (error: any) {
      console.error('Error updating job:', error);
      throw new Error(error.message || 'Failed to update job');
    }
  },

  /**
   * Delete a job
   */
  async deleteJob(id: number): Promise<void> {
    try {
      const { error } = await supabase
        .from('jobs')
        .delete()
        .eq('id', id);

      if (error) throw error;
    } catch (error: any) {
      console.error('Error deleting job:', error);
      throw new Error(error.message || 'Failed to delete job');
    }
  },

  /**
   * Subscribe to newsletter
   */
  async subscribeNewsletter(email: string, languagePreference?: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert([
          {
            email: email.toLowerCase().trim(),
            language_preference: languagePreference || 'all',
          }
        ]);

      if (error) {
        // Check if it's a duplicate email error
        if (error.code === '23505') {
          throw new Error('This email is already subscribed!');
        }
        throw error;
      }
    } catch (error: any) {
      console.error('Error subscribing to newsletter:', error);
      throw new Error(error.message || 'Failed to subscribe');
    }
  },
};

export type { Job };
