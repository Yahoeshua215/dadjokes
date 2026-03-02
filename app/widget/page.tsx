import { getRandomJoke, getJokesByCategory } from '@/lib/jokes';

interface Props {
  searchParams: Promise<{ category?: string }>;
}

export default async function WidgetPage({ searchParams }: Props) {
  const { category } = await searchParams;

  let joke;
  if (category) {
    const jokes = getJokesByCategory(category);
    joke = jokes.length > 0 ? jokes[Math.floor(Math.random() * jokes.length)] : getRandomJoke();
  } else {
    joke = getRandomJoke();
  }

  return (
    <html lang="en">
      <head>
        <style dangerouslySetInnerHTML={{ __html: `
          *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; background: #FAFAFA; color: #171717; }
          .card { background: white; border: 1px solid #E5E5E5; border-radius: 12px; padding: 20px 24px; max-width: 400px; margin: 12px auto; }
          .setup { font-size: 16px; line-height: 1.5; margin-bottom: 12px; }
          .punchline { font-size: 15px; font-weight: 600; color: #F59E0B; }
          .footer { text-align: center; margin-top: 8px; }
          .footer a { font-size: 11px; color: #737373; text-decoration: none; }
          .footer a:hover { color: #F59E0B; }
        `}} />
      </head>
      <body>
        <div className="card">
          <p className="setup">{joke.setup}</p>
          <p className="punchline">{joke.punchline}</p>
        </div>
        <div className="footer">
          <a href="https://jokelikeadad.com" target="_blank" rel="noopener noreferrer">
            jokelikeadad.com
          </a>
        </div>
      </body>
    </html>
  );
}
