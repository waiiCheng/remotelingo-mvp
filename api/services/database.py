from typing import List, Dict, Optional
from datetime import datetime

class MockDatabase:
    """
    In-memory mock database for MVP

    TODO: Replace with Supabase/PostgreSQL in production
    Example migration:

    from supabase import create_client, Client

    supabase: Client = create_client(
        os.getenv("SUPABASE_URL"),
        os.getenv("SUPABASE_KEY")
    )

    def get_all_jobs():
        return supabase.table('jobs').select("*").execute()
    """

    def __init__(self):
        self.jobs = self._init_mock_data()
        self.next_id = len(self.jobs) + 1

    def _init_mock_data(self) -> List[Dict]:
        """Initialize with sample data from frontend mockup"""
        return [
            {
                "id": 1,
                "title": "Senior Full Stack Engineer",
                "company": "TechFlow EU",
                "logo": "TF",
                "color": "bg-blue-600",
                "languages": ["Chinese (Mandarin)", "English"],
                "level": "Native/Fluent",
                "salary_min": 75000,
                "salary_max": 110000,
                "currency": "EUR",
                "location": "Remote (EU Timezone)",
                "type": "Full-time",
                "tags": ["React", "Node.js", "Fintech"],
                "posted_at": "10m ago",
                "featured": True,
                "ai_verified": True,
                "source": "Direct Career Page",
                "match_score": 98,
                "summary": "Requires native Mandarin for APAC banking integration team."
            },
            {
                "id": 2,
                "title": "Customer Success Manager (APAC)",
                "company": "CloudScale",
                "logo": "CS",
                "color": "bg-purple-600",
                "languages": ["Korean", "English"],
                "level": "Native",
                "salary_min": 55000,
                "salary_max": 80000,
                "currency": "USD",
                "location": "Remote (Global)",
                "type": "Contract",
                "tags": ["SaaS", "Support", "B2B"],
                "posted_at": "45m ago",
                "featured": True,
                "ai_verified": True,
                "source": "LinkedIn Verified",
                "match_score": 95,
                "summary": "Handling enterprise clients in Seoul. B2B SaaS experience critical."
            },
            {
                "id": 3,
                "title": "Localization Specialist & QA",
                "company": "GameWorld",
                "logo": "GW",
                "color": "bg-red-500",
                "languages": ["Japanese", "English"],
                "level": "N1/Native",
                "salary_min": 40000,
                "salary_max": 65000,
                "currency": "EUR",
                "location": "Remote (Flexible)",
                "type": "Freelance",
                "tags": ["Gaming", "Translation", "QA"],
                "posted_at": "2h ago",
                "featured": False,
                "ai_verified": False,
                "source": "Aggregated",
                "match_score": 88,
                "summary": "RPG game text translation and cultural adaptation."
            },
            {
                "id": 4,
                "title": "Marketing Lead (China Market)",
                "company": "EuroLux Group",
                "logo": "EL",
                "color": "bg-emerald-600",
                "languages": ["Chinese (Mandarin)", "English"],
                "level": "Native",
                "salary_min": 80000,
                "salary_max": 120000,
                "currency": "EUR",
                "location": "Remote (EU/Asia Overlap)",
                "type": "Full-time",
                "tags": ["Marketing", "Growth", "WeChat"],
                "posted_at": "3h ago",
                "featured": False,
                "ai_verified": True,
                "source": "Direct Career Page",
                "match_score": 92,
                "summary": "Leading brand expansion into Shanghai/Beijing markets."
            },
            {
                "id": 5,
                "title": "Technical Support Engineer",
                "company": "SaaSify",
                "logo": "SF",
                "color": "bg-indigo-500",
                "languages": ["German", "English"],
                "level": "Fluent",
                "salary_min": 60000,
                "salary_max": 85000,
                "currency": "USD",
                "location": "Remote (Americas)",
                "type": "Full-time",
                "tags": ["Support", "API", "Python"],
                "posted_at": "5h ago",
                "featured": False,
                "ai_verified": True,
                "source": "Greenhouse",
                "match_score": 85,
                "summary": "L2 support for DACH region customers."
            }
        ]

    def get_all_jobs(self) -> List[Dict]:
        """Get all jobs"""
        return self.jobs

    def get_job_by_id(self, job_id: int) -> Optional[Dict]:
        """Get specific job by ID"""
        for job in self.jobs:
            if job['id'] == job_id:
                return job
        return None

    def add_job(self, job_data: Dict) -> Dict:
        """Add new job to database"""
        job_data['id'] = self.next_id
        self.next_id += 1
        self.jobs.append(job_data)
        return job_data

    def filter_by_language(self, job: Dict, lang_code: str) -> bool:
        """Check if job matches language filter"""
        lang_map = {
            'zh': 'Chinese',
            'ko': 'Korean',
            'ja': 'Japanese',
            'de': 'German',
            'es': 'Spanish',
            'fr': 'French'
        }

        target_lang = lang_map.get(lang_code, '')
        return any(target_lang in lang for lang in job.get('languages', []))

    # TODO: Future Supabase integration
    # def sync_to_supabase(self):
    #     """Sync in-memory data to Supabase"""
    #     from supabase import create_client
    #     supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
    #
    #     for job in self.jobs:
    #         supabase.table('jobs').upsert(job).execute()
