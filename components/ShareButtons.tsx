'use client';

import { useState } from 'react';
import { Joke } from '@/lib/types';

export default function ShareButtons({ joke, jokeUrl }: { joke: Joke; jokeUrl?: string }) {
  const [copiedJoke, setCopiedJoke] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const jokeText = `${joke.setup}\n${joke.punchline}`;

  const handleCopyJoke = async () => {
    await navigator.clipboard.writeText(jokeText);
    setCopiedJoke(true);
    setTimeout(() => setCopiedJoke(false), 2000);
  };

  const handleCopyLink = async () => {
    if (jokeUrl) {
      await navigator.clipboard.writeText(jokeUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({ title: 'Dad Joke', text: jokeText, url: jokeUrl });
    } else {
      handleCopyJoke();
    }
  };

  const handleTwitter = () => {
    const teaser = jokeUrl
      ? `${joke.setup}\n\nFind out the answer:`
      : joke.setup;
    const tweetText = jokeUrl
      ? `${encodeURIComponent(teaser)}&url=${encodeURIComponent(jokeUrl)}`
      : encodeURIComponent(teaser);
    const url = `https://twitter.com/intent/tweet?text=${tweetText}`;
    window.open(url, '_blank');
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleCopyJoke}
        className="text-xs text-text-secondary hover:text-foreground bg-background px-3 py-1.5 rounded-full border border-border hover:border-foreground/20 transition-colors"
      >
        {copiedJoke ? '✓ Copied!' : 'Copy joke'}
      </button>
      {jokeUrl && (
        <button
          onClick={handleCopyLink}
          className="text-xs text-text-secondary hover:text-foreground bg-background px-3 py-1.5 rounded-full border border-border hover:border-foreground/20 transition-colors"
        >
          {copiedLink ? '✓ Copied!' : 'Copy link'}
        </button>
      )}
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
