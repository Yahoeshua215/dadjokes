import fs from 'fs';
import path from 'path';

const jokesDir = path.join(process.cwd(), 'data', 'jokes');

const AGE_MAP = {
  'for-kids': 'kids',
  'funny': 'teens',
  'corny': 'kids',
  'food': 'kids',
  'animal': 'kids',
  'clean': 'kids',
  'best': 'teens',
  'good': 'teens',
  'best-ever': 'teens',
  'best-of-all-time': 'teens',
  'bad': 'teens',
  'christmas': 'kids',
  'halloween': 'kids',
  'thanksgiving': 'kids',
  'fathers-day': 'teens',
  'math': 'kids',
  'science': 'kids',
  'sports': 'teens',
  'work': 'teens',
  'dirty': 'adults',
  'for-adults': 'adults',
};

const files = fs.readdirSync(jokesDir).filter(f => f.endsWith('.json'));
let updated = 0;

for (const file of files) {
  const filePath = path.join(jokesDir, file);
  const jokes = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  const category = path.basename(file, '.json');
  const ageRange = AGE_MAP[category] || 'teens';

  const VALID_TIERS = ['kids', 'teens', 'adults'];
  let changed = false;
  for (const joke of jokes) {
    if (!joke.ageRange || !VALID_TIERS.includes(joke.ageRange)) {
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
