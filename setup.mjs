import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jotkbcqyjvlnudpbubse.supabase.co';
const supabaseKey = 'sb_secret_oyStE0w_PXIyP4l8cPGBtQ_r34t0HKs';

const supabase = createClient(supabaseUrl, supabaseKey);

async function setupDatabase() {
  console.log('🚀 开始设置数据库...\n');

  // 示例数据
  const jobs = [
    {
      title: 'Senior Full Stack Engineer',
      company: 'TechFlow EU',
      logo: 'TF',
      color: 'bg-blue-600',
      languages: ['Chinese (Mandarin)', 'English'],
      level: 'Native/Fluent',
      salary_min: 75000,
      salary_max: 110000,
      currency: 'EUR',
      location: 'Remote (EU Timezone)',
      type: 'Full-time',
      tags: ['React', 'Node.js', 'Fintech'],
      apply_url: 'https://example.com/apply',
      featured: true,
      ai_verified: true,
      source: 'Direct Career Page',
      match_score: 98,
      summary: 'Requires native Mandarin for APAC banking integration team.'
    },
    {
      title: 'Customer Success Manager (APAC)',
      company: 'CloudScale',
      logo: 'CS',
      color: 'bg-purple-600',
      languages: ['Korean', 'English'],
      level: 'Native',
      salary_min: 55000,
      salary_max: 80000,
      currency: 'USD',
      location: 'Remote (Global)',
      type: 'Contract',
      tags: ['SaaS', 'Support', 'B2B'],
      apply_url: 'https://example.com/apply',
      featured: true,
      ai_verified: true,
      source: 'LinkedIn Verified',
      match_score: 95,
      summary: 'Handling enterprise clients in Seoul. B2B SaaS experience critical.'
    },
    {
      title: 'Localization Specialist & QA',
      company: 'GameWorld',
      logo: 'GW',
      color: 'bg-red-500',
      languages: ['Japanese', 'English'],
      level: 'N1/Native',
      salary_min: 40000,
      salary_max: 65000,
      currency: 'EUR',
      location: 'Remote (Flexible)',
      type: 'Freelance',
      tags: ['Gaming', 'Translation', 'QA'],
      apply_url: 'https://example.com/apply',
      featured: false,
      ai_verified: false,
      source: 'Aggregated',
      match_score: 88,
      summary: 'RPG game text translation and cultural adaptation.'
    },
    {
      title: 'Marketing Lead (China Market)',
      company: 'EuroLux Group',
      logo: 'EL',
      color: 'bg-emerald-600',
      languages: ['Chinese (Mandarin)', 'English'],
      level: 'Native',
      salary_min: 80000,
      salary_max: 120000,
      currency: 'EUR',
      location: 'Remote (EU/Asia Overlap)',
      type: 'Full-time',
      tags: ['Marketing', 'Growth', 'WeChat'],
      apply_url: 'https://example.com/apply',
      featured: false,
      ai_verified: true,
      source: 'Direct Career Page',
      match_score: 92,
      summary: 'Leading brand expansion into Shanghai/Beijing markets.'
    },
    {
      title: 'Technical Support Engineer',
      company: 'SaaSify',
      logo: 'SF',
      color: 'bg-indigo-500',
      languages: ['German', 'English'],
      level: 'Fluent',
      salary_min: 60000,
      salary_max: 85000,
      currency: 'USD',
      location: 'Remote (Americas)',
      type: 'Full-time',
      tags: ['Support', 'API', 'Python'],
      apply_url: 'https://example.com/apply',
      featured: false,
      ai_verified: true,
      source: 'Greenhouse',
      match_score: 85,
      summary: 'L2 support for DACH region customers.'
    }
  ];

  try {
    // 插入数据
    console.log('📊 正在插入示例职位数据...');
    const { data, error } = await supabase
      .from('jobs')
      .insert(jobs)
      .select();

    if (error) {
      console.error('❌ 插入数据失败:', error.message);
      console.log('\n⚠️ 可能的原因:');
      console.log('1. jobs 表还不存在 - 需要先在 Supabase SQL Editor 创建表');
      console.log('2. 使用的 API Key 权限不足');
      console.log('\n请在 Supabase Dashboard 执行 setup_database.sql 创建表结构');
      process.exit(1);
    }

    console.log(`✅ 成功插入 ${data.length} 条职位数据！\n`);

    // 验证数据
    const { count } = await supabase
      .from('jobs')
      .select('*', { count: 'exact', head: true });

    console.log(`📈 数据库中共有 ${count} 条职位\n`);
    console.log('🎉 数据库设置完成！现在可以启动应用了:\n');
    console.log('   cd frontend');
    console.log('   npm run dev\n');

  } catch (err) {
    console.error('❌ 发生错误:', err);
  }
}

setupDatabase();
