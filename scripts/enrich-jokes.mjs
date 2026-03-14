/**
 * enrich-jokes.mjs
 *
 * Scans all joke JSON files and enriches any jokes missing whyFunny,
 * howToTell, or perfectFor using the Anthropic API.
 *
 * Usage:
 *   node scripts/enrich-jokes.mjs              # enrich all categories
 *   node scripts/enrich-jokes.mjs animal food  # enrich specific categories
 *
 * Requires: ANTHROPIC_API_KEY env var
 */

import fs from 'fs';
import path from 'path';
import Anthropic from '@anthropic-ai/sdk';

const JOKES_DIR = path.join(process.cwd(), 'data', 'jokes');
const BATCH_SIZE = 10; // jokes per API call

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

if (!process.env.ANTHROPIC_API_KEY) {
  console.error('❌  ANTHROPIC_API_KEY environment variable is required.');
  process.exit(1);
}

// Which files to process — CLI args or all files
const args = process.argv.slice(2);
const allFiles = fs.readdirSync(JOKES_DIR).filter(f => f.endsWith('.json'));
const targetFiles = args.length
  ? args.map(a => (a.endsWith('.json') ? a : `${a}.json`))
  : allFiles;

async function enrichBatch(jokes) {
  const jokeList = jokes
    .map((j, i) => `${i + 1}. Setup: "${j.setup}" | Punchline: "${j.punchline}"`)
    .join('\n');

  const prompt = `You are a comedy writer generating unique, joke-specific SEO content for dad jokes on jokelikeadad.com.

For each joke below, generate exactly 3 fields:
1. whyFunny (2-3 sentences): Explains the specific wordplay/pun. References the exact words creating double meaning. Conversational tone.
2. howToTell (1-2 sentences): Delivery advice specific to this joke's structure and punchline.
3. perfectFor (exactly 3 strings): Specific, contextual occasions tied to the joke's theme. Not generic.

Jokes to enrich:
${jokeList}

Respond with a JSON array of objects in this exact format:
[
  {
    "whyFunny": "...",
    "howToTell": "...",
    "perfectFor": ["...", "...", "..."]
  }
]

Return ONLY the JSON array. No markdown, no explanation.`;

  const message = await client.messages.create({
    model: 'claude-opus-4-5',
    max_tokens: 4096,
    messages: [{ role: 'user', content: prompt }],
  });

  const raw = message.content[0].text.trim();
  const cleaned = raw.replace(/^```json\n?/, '').replace(/\n?```$/, '');
  return JSON.parse(cleaned);
}

async function processFile(filename) {
  const filePath = path.join(JOKES_DIR, filename);

  if (!fs.existsSync(filePath)) {
    console.warn(`⚠️  File not found: ${filename}, skipping.`);
    return;
  }

  const jokes = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  const unenriched = jokes.filter(
    j => !j.whyFunny || !j.howToTell || !j.perfectFor
  );

  if (unenriched.length === 0) {
    console.log(`✅  ${filename} — already fully enriched (${jokes.length} jokes)`);
    return;
  }

  console.log(`\n📝  ${filename} — enriching ${unenriched.length}/${jokes.length} jokes...`);

  // Build index map so we can splice results back in
  const unenrichedIndices = jokes
    .map((j, i) => (!j.whyFunny || !j.howToTell || !j.perfectFor ? i : null))
    .filter(i => i !== null);

  let enrichedCount = 0;

  for (let b = 0; b < unenriched.length; b += BATCH_SIZE) {
    const batch = unenriched.slice(b, b + BATCH_SIZE);
    const batchIndices = unenrichedIndices.slice(b, b + BATCH_SIZE);
    const batchNum = Math.floor(b / BATCH_SIZE) + 1;
    const totalBatches = Math.ceil(unenriched.length / BATCH_SIZE);

    process.stdout.write(`  Batch ${batchNum}/${totalBatches}...`);

    try {
      const results = await enrichBatch(batch);

      results.forEach((result, i) => {
        const jokeIndex = batchIndices[i];
        jokes[jokeIndex].whyFunny = result.whyFunny;
        jokes[jokeIndex].howToTell = result.howToTell;
        jokes[jokeIndex].perfectFor = result.perfectFor;
        enrichedCount++;
      });

      console.log(` done (${enrichedCount}/${unenriched.length})`);
    } catch (err) {
      console.error(`\n  ❌ Batch ${batchNum} failed: ${err.message}`);
      // Continue with remaining batches
    }
  }

  fs.writeFileSync(filePath, JSON.stringify(jokes, null, 2));
  console.log(`  💾  Saved ${filename} — ${enrichedCount} jokes enriched`);
}

async function main() {
  console.log(`🚀  Joke Enrichment Script`);
  console.log(`📂  Processing ${targetFiles.length} file(s)...\n`);

  let totalEnriched = 0;

  for (const file of targetFiles) {
    await processFile(file);
  }

  // Final status
  console.log('\n─────────────────────────────');
  for (const file of targetFiles) {
    const filePath = path.join(JOKES_DIR, file);
    if (!fs.existsSync(filePath)) continue;
    const jokes = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const enriched = jokes.filter(j => j.whyFunny && j.howToTell && j.perfectFor).length;
    const status = enriched === jokes.length ? '✅' : `⚠️  ${enriched}/${jokes.length}`;
    console.log(`${status}  ${file}`);
    totalEnriched += enriched;
  }

  console.log('─────────────────────────────');
  console.log(`\n✨  Done!`);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
