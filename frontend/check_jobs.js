const data = require('./lib/jobsData.ts').default;
const ids = data.map(j => j.id).sort((a,b) => a-b);
console.log('ID Range:', ids[0], '-', ids[ids.length-1]);
console.log('Total jobs:', ids.length);
const duplicates = ids.filter((id, idx) => ids.indexOf(id) !== idx);
if(duplicates.length > 0) console.log('Duplicate IDs:', duplicates);
else console.log('No duplicates found');

// Show breakdown by category
const categories = {};
data.forEach(job => {
  const firstLang = job.languages[0];
  categories[firstLang] = (categories[firstLang] || 0) + 1;
});
console.log('\nBreakdown by primary language:');
Object.entries(categories).sort((a,b) => b[1] - a[1]).forEach(([lang, count]) => {
  console.log(`  ${lang}: ${count}`);
});
