import { ImageResponse } from 'next/og';
import { getTopicBySlug, getJokesByTags } from '@/lib/jokes';

export const runtime = 'nodejs';
export const contentType = 'image/png';
export const size = { width: 1200, height: 630 };

export default async function OGImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const topic = getTopicBySlug(slug);

  if (!topic) {
    return new ImageResponse(
      <div style={{ display: 'flex', width: '100%', height: '100%', background: '#FAFAFA', alignItems: 'center', justifyContent: 'center', fontSize: 48 }}>
        Topic not found
      </div>,
      { ...size }
    );
  }

  const jokeCount = getJokesByTags(topic.tags).length;

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
        alignItems: 'center',
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
          alignItems: 'center',
          width: '100%',
        }}
      >
        <p style={{ fontSize: 96, margin: 0 }}>{topic.emoji}</p>
        <p
          style={{
            fontSize: 48,
            color: '#171717',
            marginTop: '24px',
            fontWeight: 700,
            textAlign: 'center',
          }}
        >
          {topic.name}
        </p>
        <p
          style={{
            fontSize: 28,
            color: '#F59E0B',
            marginTop: '12px',
            fontWeight: 600,
          }}
        >
          {jokeCount} jokes
        </p>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '20px',
          width: '100%',
        }}
      >
        <p style={{ fontSize: 24, color: '#737373', margin: 0 }}>jokelikeadad.com</p>
        <p style={{ fontSize: 20, color: '#737373', margin: 0 }}>Dad Jokes Directory</p>
      </div>
    </div>,
    { ...size }
  );
}
