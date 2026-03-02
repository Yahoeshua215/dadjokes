'use client';

import { useState } from 'react';
import { Joke } from '@/lib/types';

export default function ShareButtons({ joke, jokeUrl }: { joke: Joke; jokeUrl?: string }) {
  const [copied, setCopied] = useState(false);
  const jokeText = `${joke.setup}\n${joke.punchline}`;
  const shareText = jokeUrl ? `${jokeText}\n${jokeUrl}` : jokeText;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({ title: 'Dad Joke', text: jokeText, url: jokeUrl });
    } else {
      handleCopy();
    }
  };

  const handleTwitter = () => {
    const tweetText = jokeUrl
      ? `${encodeURIComponent(jokeText)}&url=${encodeURIComponent(jokeUrl)}`
      : encodeURIComponent(jokeText);
    const url = `https://twitter.com/intent/tweet?text=${tweetText}`;
    window.open(url, '_blank');
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleCopy}
        className="text-xs text-text-secondary hover:text-foreground bg-background px-3 py-1.5 rounded-full border border-border hover:border-foreground/20 transition-colors"
      >
        {copied ? '✓ Copied!' : 'Copy'}
      </button>
      <button
        onClick={handleShare}
        className="text-xs text-text-secondary hover:text-foreground bg-background px-3 py-1.5 rounded-full border border-border hover:border-foreground/20 transition-colors"
      >
        Share
      </button>
      <button
        onClick={handleTwitter}
        className="text-xs text-text-secondary hover:text-foreground bg-background px-3 py-1.5 rounded-full border border-border hover:border-foreground/20 transition-colors"
      >
        𝕏 Post
      </button>
    </div>
  );
}
