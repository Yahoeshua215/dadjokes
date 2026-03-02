# DadJokes.directory SEO Roadmap

## Priority Implementation Plan

### 1. Individual Joke Pages with SEO Slugs
- **Effort**: Medium | **Impact**: Highest
- Create `/joke/[slug]` routes with human-readable URLs (e.g., `/joke/why-dont-scientists-trust-atoms`)
- Each joke gets its own meta title, description, and `FAQPage` schema (setup = question, punchline = answer)
- Related jokes, category breadcrumbs, share buttons, "next joke" navigation
- Turns 250 jokes into 250 indexable pages targeting long-tail queries
- **Status**: [x] Complete

### 2. More Categories (Seasonal + Topical)
- **Effort**: Low | **Impact**: High
- Seasonal: Father's Day, Christmas, Halloween, Thanksgiving
- Topical: animal, food, science, sports, work, math
- Format: one-liners, knock-knock, short
- Each is a real search query with meaningful volume
- **Status**: [x] Complete (added 10 categories: animal, sports, food, science, work, math, thanksgiving, halloween, christmas, fathers-day — 250 new jokes, 530 total static pages)

### 3. More Jokes Per Category (50-100)
- **Effort**: Low | **Impact**: High
- Current: 25 per category (thin vs. competitors with 200-300+)
- Target: 50-100 per category to strengthen topical authority
- **Status**: [x] Complete (expanded all 20 categories to 100 jokes each — 2,000 total jokes, 2,000 indexable pages)

### 4. "What is a Dad Joke?" Pillar Page
- **Effort**: Low | **Impact**: Medium-High
- Create `/what-is-a-dad-joke` informational page
- Target PAA queries: origin, history, what makes a joke a dad joke, "when the punchline becomes apparent"
- Currently owned by dictionaries/Wikipedia — a dedicated authority page can compete
- **Status**: [x] Complete (pillar page with Article schema, FAQ schema for 6 PAA queries, TOC, timeline, internal links from homepage + footer)

### 5. Voting/Rating System
- **Effort**: Medium | **Impact**: Medium
- Upvote/downvote or star rating on each joke
- Enables "Top Rated" pages that update organically
- User engagement signals (time on site, interactions)
- **Status**: [x] Complete (thumbs up/down on joke cards + individual pages via localStorage, /top-rated page with top 50 jokes by curated rating, header + footer nav links)

### 6. Working Submit Flow
- **Effort**: Medium | **Impact**: Medium
- Current submit form is client-side only, doesn't save
- Make it functional to generate fresh user-contributed content
- Builds community + content pipeline without editorial effort
- **Status**: [ ] Not started

### 7. Free Dad Jokes API (Backlink Magnet)
- **Effort**: Medium | **Impact**: Medium-High
- Endpoints: `/api/random`, `/api/jokes?category=funny`
- Generates organic backlinks from developer blogs, tutorials, GitHub READMEs
- High-quality .edu and .dev backlinks for building DR
- **Status**: [x] Complete (3 API endpoints: /api/random, /api/jokes with category/limit/page params, /api/categories; /developers docs page with curl + JS examples and backlink CTA)

### 8. RSS Feed + Email Subscription for JOTD
- **Effort**: Low | **Impact**: Medium
- RSS feed at `/feed.xml` (indexable URL + aggregator backlinks)
- Email signup for daily joke delivery
- Builds return-visitor base
- **Status**: [ ] Not started

### 9. Quick Technical Wins
- **Effort**: Low | **Impact**: Medium
- [ ] SearchAction schema (sitelinks search box in Google)
- [ ] OG images per joke (branded share images)
- [ ] Improve internal linking across all pages
- [ ] Update year-targeted titles to 2026
- [ ] Social proof counters ("250+ jokes and counting")

---

## Strategic Notes
- **Do NOT** compete head-on with Today.com/Parade for head terms (their DR is too high)
- **DO** win on long-tail category and individual joke queries
- **DO** lean into the "directory" model as differentiation (organized, browsable, individually-linkable)
- **DO** keep brand wholesome and focused on dad jokes only
