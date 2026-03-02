import fs from 'fs';
import path from 'path';

const jokesDir = path.join(process.cwd(), 'data', 'jokes');

function toSlug(setup) {
  return setup
    .toLowerCase()
    .replace(/['']/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 60)
    .replace(/-$/, '');
}

const allSlugs = new Set();

const files = fs.readdirSync(jokesDir).filter(f => f.endsWith('.json'));

// First pass: generate all slugs and detect duplicates
const fileData = files.map(file => {
  const filePath = path.join(jokesDir, file);
  const jokes = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  return { file, filePath, jokes };
});

for (const { jokes } of fileData) {
  for (const joke of jokes) {
    let slug = toSlug(joke.setup);
    let finalSlug = slug;
    let counter = 2;
    while (allSlugs.has(finalSlug)) {
      finalSlug = `${slug}-${counter}`;
      counter++;
    }
    allSlugs.add(finalSlug);
    joke.slug = finalSlug;
  }
}

// Write back
for (const { filePath, jokes } of fileData) {
  fs.writeFileSync(filePath, JSON.stringify(jokes, null, 2) + '\n');
}

console.log(`Generated slugs for ${allSlugs.size} jokes across ${files.length} files.`);
