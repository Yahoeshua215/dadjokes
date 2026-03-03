import fs from 'fs';
import path from 'path';
import Anthropic from '@anthropic-ai/sdk';

const DRY_RUN = process.argv.includes('--dry-run');
const BATCH_SIZE = 20;

const client = new Anthropic();

const jokesDir = path.join(process.cwd(), 'data', 'jokes');

const SYSTEM_PROMPT = `You are a content classifier. For each joke, assign exactly one age tier:

- "kids" — Fully safe for young children (ages 5-10). Clean wordplay, animals, simple puns, school humor. No romantic, marriage, workplace, or bodily-function themes.
- "teens" — Appropriate for middle school and up (ages 11+). May include mild dating, relationship, marriage, work humor, or light sarcasm. Nothing explicit or sexual.
- "adults" — Contains sexual innuendo, explicit references, double entendres, or clearly adult-only content.

Respond with ONLY a JSON array of objects with "id" and "ageRange" fields. No markdown, no explanation.`;

async function classifyBatch(jokes) {
  const input = jokes.map(j => ({ id: j.id, setup: j.setup, punchline: j.punchline }));

  const response = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 4096,
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: 'user',
        content: `Classify these jokes:\n${JSON.stringify(input)}`,
      },
    ],
  });

  const text = response.content[0].text;
  return JSON.parse(text);
}

async function main() {
  if (!process.env.ANTHROPIC_API_KEY) {
    console.error('Error: ANTHROPIC_API_KEY environment variable is required');
    process.exit(1);
  }

  const files = fs.readdirSync(jokesDir).filter(f => f.endsWith('.json'));
  let totalUpdated = 0;
  let totalJokes = 0;

  for (const file of files) {
    const filePath = path.join(jokesDir, file);
    const jokes = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    totalJokes += jokes.length;

    console.log(`\nProcessing ${file} (${jokes.length} jokes)...`);

    // Process in batches
    const results = [];
    for (let i = 0; i < jokes.length; i += BATCH_SIZE) {
      const batch = jokes.slice(i, i + BATCH_SIZE);
      console.log(`  Batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(jokes.length / BATCH_SIZE)}...`);
      const classified = await classifyBatch(batch);
      results.push(...classified);
    }

    // Build lookup map
    const ageMap = new Map(results.map(r => [r.id, r.ageRange]));

    let fileUpdated = 0;
    for (const joke of jokes) {
      const newAge = ageMap.get(joke.id);
      if (newAge && ['kids', 'teens', 'adults'].includes(newAge)) {
        if (joke.ageRange !== newAge) {
          if (DRY_RUN) {
            console.log(`  [DRY RUN] ${joke.id}: ${joke.ageRange} -> ${newAge}`);
          }
          joke.ageRange = newAge;
          fileUpdated++;
        }
      } else {
        console.warn(`  Warning: No valid classification for ${joke.id}, keeping existing value`);
      }
    }

    if (fileUpdated > 0 && !DRY_RUN) {
      fs.writeFileSync(filePath, JSON.stringify(jokes, null, 2) + '\n');
      console.log(`  Updated ${fileUpdated} jokes in ${file}`);
    } else if (fileUpdated > 0) {
      console.log(`  [DRY RUN] Would update ${fileUpdated} jokes in ${file}`);
    } else {
      console.log(`  No changes needed for ${file}`);
    }

    totalUpdated += fileUpdated;
  }

  console.log(`\n${DRY_RUN ? '[DRY RUN] ' : ''}Done! Updated ${totalUpdated} of ${totalJokes} jokes across ${files.length} files.`);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
