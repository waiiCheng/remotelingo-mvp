const data = require('./lib/jobsData.ts').default;

// Find all duplicate IDs
const idCount = {};
data.forEach((job, idx) => {
  if (!idCount[job.id]) {
    idCount[job.id] = [];
  }
  idCount[job.id].push({ idx, title: job.title.substring(0, 50) });
});

const duplicates = Object.entries(idCount)
  .filter(([id, instances]) => instances.length > 1);

console.log('Duplicate IDs found:');
duplicates.forEach(([id, instances]) => {
  console.log(`\nID ${id} (${instances.length} occurrences):`);
  instances.forEach(({idx, title}) => {
    console.log(`  [${idx}] ${title}`);
  });
});

// Suggest new IDs
const usedIds = new Set(data.map(j => j.id));
const maxId = Math.max(...data.map(j => j.id));
console.log(`\nCurrent max ID: ${maxId}`);
console.log(`Total jobs: ${data.length}`);
console.log(`Suggested new ID range for duplicates: ${maxId + 1} - ${maxId + 20}`);
