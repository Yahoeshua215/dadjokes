import { Joke, Category } from './types';

/**
 * Generate enriched content sections for individual joke pages.
 * This adds unique, contextual text to each joke page to improve
 * content depth and help with Google indexing.
 */

// Humor type detection based on joke content and tags
type HumorType = 'pun' | 'wordplay' | 'anti-humor' | 'observational' | 'absurd' | 'classic';

const HUMOR_TYPE_DESCRIPTIONS: Record<HumorType, string> = {
  pun: 'This joke is a classic pun — it plays on words that sound alike but have different meanings. Puns are the bread and butter of dad humor, relying on the listener catching the double meaning for maximum groan effect.',
  wordplay: 'This joke relies on clever wordplay, twisting the meaning of a familiar phrase or word. The humor comes from the unexpected interpretation, which is what makes it land so well in conversation.',
  'anti-humor': 'This is an anti-humor joke — the punchline is funny precisely because it\'s so straightforward and obvious. The comedy comes from subverting your expectation of a clever twist.',
  observational: 'This joke takes an everyday observation and flips it into something absurd. The best dad jokes find humor in the mundane, and this one nails that formula perfectly.',
  absurd: 'This joke leans into pure absurdity — the punchline doesn\'t try to make logical sense, and that\'s exactly why it works. The sillier, the better.',
  classic: 'This is a classic setup-and-punchline dad joke. The structure is timeless: a seemingly innocent question followed by a groan-worthy answer that you should have seen coming.',
};

const HUMOR_TYPE_TIPS: Record<HumorType, string> = {
  pun: 'For maximum effect, pause slightly before the punchline and deliver it with a completely straight face. The groan is the goal.',
  wordplay: 'Timing is everything — let the setup sink in, then hit the punchline before they can guess it. If they guess it anyway, you\'ve told a great dad joke.',
  'anti-humor': 'Deliver this one with total sincerity, as if you genuinely think it\'s the funniest thing ever said. The contrast is where the laughs live.',
  observational: 'Drop this casually in conversation when the topic naturally comes up. The best dad jokes feel spontaneous, even when you\'ve been waiting all day to use them.',
  absurd: 'Commit fully to the absurdity. Don\'t laugh at your own joke — let the ridiculousness speak for itself.',
  classic: 'This one works in any setting. Save it for when there\'s a lull in conversation, or deploy it at the dinner table for guaranteed eye rolls.',
};

export function detectHumorType(joke: Joke): HumorType {
  const text = `${joke.setup} ${joke.punchline}`.toLowerCase();
  const tags = joke.tags.map(t => t.toLowerCase());

  if (tags.includes('pun') || tags.includes('puns')) return 'pun';
  if (tags.includes('wordplay') || tags.includes('double-meaning')) return 'wordplay';
  if (tags.includes('anti-humor') || tags.includes('deadpan')) return 'anti-humor';
  if (tags.includes('observational') || tags.includes('relatable')) return 'observational';
  if (tags.includes('absurd') || tags.includes('silly') || tags.includes('nonsense')) return 'absurd';

  // Content-based detection
  if (text.includes('because') && (text.includes('they') || text.includes('it'))) return 'pun';
  if (joke.setup.startsWith('What do you call')) return 'wordplay';
  if (joke.setup.startsWith('Why did') || joke.setup.startsWith('Why do')) return 'classic';

  return 'classic';
}

export function getHumorExplanation(joke: Joke): string {
  const type = detectHumorType(joke);
  return HUMOR_TYPE_DESCRIPTIONS[type];
}

export function getDeliveryTip(joke: Joke): string {
  const type = detectHumorType(joke);
  return HUMOR_TYPE_TIPS[type];
}

// Occasion suggestions based on category and tags
const CATEGORY_OCCASIONS: Record<string, string[]> = {
  'for-kids': ['road trips', 'lunchbox notes', 'bedtime stories', 'school pickup', 'playdates'],
  'for-adults': ['office meetings', 'dinner parties', 'happy hours', 'date nights', 'barbecues'],
  'work': ['Monday morning meetings', 'team standups', 'Slack channels', 'coffee breaks', 'all-hands'],
  'food': ['cooking together', 'restaurant outings', 'grocery shopping', 'Thanksgiving dinner', 'potlucks'],
  'animal': ['zoo visits', 'pet store trips', 'nature walks', 'watching animal documentaries', 'the dog park'],
  'science': ['homework help', 'science fairs', 'museum visits', 'watching documentaries', 'trivia nights'],
  'sports': ['game day', 'tailgates', 'watching the big game', 'practice pickup', 'sports bars'],
  'math': ['homework time', 'math class', 'balancing the budget', 'tax season', 'trivia night'],
  'christmas': ['Christmas dinner', 'holiday parties', 'opening presents', 'decorating the tree', 'family gatherings'],
  'halloween': ['trick-or-treating', 'costume parties', 'pumpkin carving', 'haunted houses', 'spooky movie nights'],
  'thanksgiving': ['Thanksgiving dinner', 'Black Friday shopping', 'family gatherings', 'turkey prep', 'around the table'],
  'fathers-day': ['Father\'s Day brunch', 'card messages', 'gift-giving', 'family celebrations', 'dad appreciation moments'],
  'funny': ['any occasion', 'ice breakers', 'awkward silences', 'family dinners', 'road trips'],
  'bad': ['when you want eye rolls', 'to test friendships', 'at the worst possible moment', 'during serious conversations', 'job interviews (don\'t)'],
  'corny': ['family dinners', 'car rides', 'texting your kids', 'breaking the ice', 'embarrassing your teenagers'],
  'good': ['first dates', 'meeting the in-laws', 'new coworkers', 'family reunions', 'anywhere, honestly'],
  'dirty': ['adult game nights', 'bachelor parties', 'happy hours', 'late-night hangouts', 'comedy open mics'],
  'best': ['any time you need a guaranteed laugh', 'when you want to establish dad joke dominance', 'family gatherings', 'social media posts'],
  'best-ever': ['when nothing else will do', 'championship-level dad joke battles', 'making a lasting impression'],
  'best-of-all-time': ['legendary moments', 'when you need the absolute best', 'dad joke hall of fame speeches'],
};

export function getOccasions(joke: Joke): string[] {
  return CATEGORY_OCCASIONS[joke.category] || CATEGORY_OCCASIONS['funny'];
}

// Generate a contextual paragraph about when/how to use this joke
export function getUsageContext(joke: Joke, category: Category): string {
  const occasions = getOccasions(joke);
  const picked = occasions.slice(0, 3);

  return `This ${category.name.toLowerCase().replace(' dad jokes', '').replace('dad jokes ', '')} joke is perfect for ${picked[0]} and ${picked[1]}. You can also pull it out during ${picked[2]} — it's the kind of joke that works because everyone sees the punchline coming and groans anyway. That's the magic of a great dad joke.`;
}

// Generate fun facts about the joke category
export function getCategoryFunFact(category: Category): string {
  const facts: Record<string, string> = {
    'funny': 'Studies show that "dad jokes" as a term surged in popularity after 2015, though fathers have been telling groan-worthy puns since at least ancient Rome. The format — short setup, obvious punchline — is designed to maximize eye rolls per word.',
    'for-kids': 'Research in developmental psychology shows that kids start understanding puns and wordplay around age 6-7. Dad jokes are actually great for language development — they teach kids to think about multiple meanings of words.',
    'bad': 'There\'s a psychological reason bad jokes make us laugh: it\'s called "benign violation theory." The joke violates our expectations of humor, but in a harmless way, creating a unique kind of amusement.',
    'for-adults': 'The average adult hears about 1,500 jokes per year but can only remember about 10% of them. The ones that stick? Usually puns and wordplay — the backbone of dad humor.',
    'corny': 'The word "corny" for bad jokes dates back to the 1930s — it originally referred to humor found in seed catalogs sent to corn farmers, which were famously full of terrible puns.',
    'good': 'Comedy researchers have found that the best jokes follow a "2-3-1" rhythm: two beats of setup, three beats of building tension, one beat of punchline. Most great dad jokes follow this pattern naturally.',
    'dirty': 'Double entendres have been a staple of comedy since Shakespeare — many of his plays are packed with innuendo that would make even modern audiences blush.',
    'best': 'The world record for most jokes told in one hour is 549, but quality beats quantity — a single well-timed dad joke can outperform a whole comedy set.',
    'best-ever': 'The oldest recorded joke in history is from 1900 BC Sumeria. It\'s a fart joke. Dad humor truly is timeless.',
    'best-of-all-time': 'According to a University of Oxford study, puns activate both hemispheres of the brain simultaneously — making dad jokes literally a full-brain workout.',
    'animal': 'Animals have been the subject of jokes since ancient Greece — Aesop\'s fables were basically dad jokes with morals attached.',
    'sports': 'Sports humor is universal — researchers found that sports jokes are understood across cultures more easily than any other category of humor.',
    'food': 'Food puns are the most shared category of jokes on social media, possibly because everyone can relate to the subject matter regardless of background.',
    'science': 'Science jokes are the most popular category of humor among STEM professionals, with 73% of scientists reporting they regularly tell puns at work.',
    'work': 'Workplace humor studies show that teams who share jokes (especially bad ones) have 15% higher productivity. Your HR department should be thanking you.',
    'math': 'Math jokes rely on the same logical structure as mathematical proofs — setup (hypothesis), expectation (theorem), punchline (QED of comedy).',
    'christmas': 'Christmas cracker jokes — the original dad jokes — have been a British tradition since 1847, when Tom Smith invented the Christmas cracker.',
    'halloween': 'Halloween jokes peaked in Google searches in 2023, with "skeleton dad jokes" being one of the fastest-growing search terms.',
    'thanksgiving': 'Turkey jokes dominate Thanksgiving humor, but the tradition of telling jokes at the table goes back to the original 1621 celebration (probably).',
    'fathers-day': 'Father\'s Day was made a national holiday in 1972, but dads have been telling bad jokes since the dawn of fatherhood itself.',
  };

  return facts[category.slug] || facts['funny'];
}
