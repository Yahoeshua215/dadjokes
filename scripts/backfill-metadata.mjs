import fs from 'fs';
import path from 'path';

const jokesDir = path.join(process.cwd(), 'data', 'jokes');

const AGE_MAP = {
  'for-kids': 'little-kids',
  'funny': 'all-ages',
  'corny': 'all-ages',
  'food': 'all-ages',
  'animal': 'all-ages',
  'clean': 'all-ages',
  'best': 'all-ages',
  'good': 'all-ages',
  'best-ever': 'all-ages',
  'best-of-all-time': 'all-ages',
  'bad': 'all-ages',
  'christmas': 'all-ages',
  'halloween': 'all-ages',
  'thanksgiving': 'all-ages',
  'fathers-day': 'all-ages',
  'math': 'all-ages',
  'science': 'all-ages',
  'sports': 'all-ages',
  'work': 'all-ages',
  'dirty': 'teens',
  'for-adults': 'teens',
};

const files = fs.readdirSync(jokesDir).filter(f => f.endsWith('.json'));
let updated = 0;

for (const file of files) {
  const filePath = path.join(jokesDir, file);
  const jokes = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  const category = path.basename(file, '.json');
  const ageRange = AGE_MAP[category] || 'all-ages';

  let changed = false;
  for (const joke of jokes) {
    if (!joke.ageRange) {
      joke.ageRange = ageRange;
      changed = true;
      updated++;
    }
  }

  if (changed) {
    fs.writeFileSync(filePath, JSON.stringify(jokes, null, 2) + '\n');
    console.log(`Updated ${file} → ageRange: ${ageRange}`);
  }
}

console.log(`\nDone! Updated ${updated} jokes across ${files.length} files.`);
