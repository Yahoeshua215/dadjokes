import { ImageResponse } from 'next/og';
import { getJokeBySlug } from '@/lib/jokes';

export const runtime = 'nodejs';
export const contentType = 'image/png';
export const size = { width: 1200, height: 630 };

export default async function OGImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const joke = getJokeBySlug(slug);

  if (!joke) {
    return new ImageResponse(
      <div style={{ display: 'flex', width: '100%', height: '100%', background: '#FAFAFA', alignItems: 'center', justifyContent: 'center', fontSize: 48 }}>
        Joke not found
      </div>,
      { ...size }
    );
  }

  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        background: '#FAFAFA',
        padding: '60px 80px',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          background: 'white',
          border: '2px solid #E5E5E5',
          borderRadius: '24px',
          padding: '48px 56px',
          flex: 1,
          justifyContent: 'center',
        }}
      >
        <p
          style={{
            fontSize: 44,
            lineHeight: 1.4,
            color: '#171717',
            margin: 0,
            fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
          }}
        >
          {joke.setup}
        </p>
        <p
          style={{
            fontSize: 28,
            lineHeight: 1.4,
            color: '#F59E0B',
            marginTop: '32px',
            fontWeight: 600,
          }}
        >
          Tap to reveal the answer...
        </p>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '20px',
        }}
      >
        <p style={{ fontSize: 24, color: '#737373', margin: 0 }}>jokelikeadad.com</p>
        <p style={{ fontSize: 20, color: '#737373', margin: 0 }}>Dad Jokes Directory</p>
      </div>
    </div>,
    { ...size }
  );
}
