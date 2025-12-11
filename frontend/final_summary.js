const data = require('./lib/jobsData.ts').default;

console.log('=== REMOTELINGO JOB DATABASE SUMMARY ===\n');
console.log(`Total Jobs: ${data.length}`);
console.log(`ID Range: ${Math.min(...data.map(j => j.id))} - ${Math.max(...data.map(j => j.id))}\n`);

// Check for duplicates
const ids = data.map(j => j.id);
const duplicates = ids.filter((id, idx) => ids.indexOf(id) !== idx);
console.log(`Duplicate IDs: ${duplicates.length > 0 ? duplicates.join(', ') : 'None ✓'}\n`);

// Breakdown by primary language
const categories = {};
data.forEach(job => {
  const lang = job.languages[0];
  categories[lang] = (categories[lang] || 0) + 1;
});

console.log('Breakdown by Primary Language:');
Object.entries(categories)
  .sort((a,b) => b[1] - a[1])
  .forEach(([lang, count]) => {
    const bar = '█'.repeat(Math.ceil(count / 2));
    console.log(`  ${lang.padEnd(25)} ${count.toString().padStart(3)} ${bar}`);
  });

// Breakdown by level
const levels = {};
data.forEach(job => {
  levels[job.level] = (levels[job.level] || 0) + 1;
});

console.log('\nBreakdown by Experience Level:');
Object.entries(levels)
  .sort((a,b) => b[1] - a[1])
  .forEach(([level, count]) => {
    console.log(`  ${level.padEnd(25)} ${count}`);
  });

// Featured jobs
const featured = data.filter(j => j.featured).length;
console.log(`\nFeatured Jobs: ${featured} (${Math.round(featured/data.length*100)}%)`);

// AI verified
const aiVerified = data.filter(j => j.ai_verified).length;
console.log(`AI Verified: ${aiVerified} (${Math.round(aiVerified/data.length*100)}%)`);

console.log('\n✓ Data integrity check complete!');
