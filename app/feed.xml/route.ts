import { getAllJokes } from '@/lib/jokes';

export async function GET() {
  const jokes = getAllJokes().slice(0, 30);

  const now = new Date();
  const items = jokes
    .map((joke, i) => {
      const pubDate = new Date(now);
      pubDate.setDate(pubDate.getDate() - i);
      return `    <item>
      <title><![CDATA[${joke.setup}]]></title>
      <description><![CDATA[${joke.setup} ${joke.punchline}]]></description>
      <link>https://jokelikeadad.com/joke/${joke.slug}</link>
      <guid isPermaLink="true">https://jokelikeadad.com/joke/${joke.slug}</guid>
      <pubDate>${pubDate.toUTCString()}</pubDate>
      <category>${joke.category}</category>
    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Joke Like a Dad — Dad Jokes RSS Feed</title>
    <link>https://jokelikeadad.com</link>
    <description>The best dad jokes on the internet, delivered fresh to your feed reader.</description>
    <language>en-us</language>
    <lastBuildDate>${now.toUTCString()}</lastBuildDate>
    <atom:link href="https://jokelikeadad.com/feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
