import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://jokelikeadad.com'),
  title: {
    default: 'Dad Jokes — The Best Dad Jokes | JokeLikeaDad.com',
    template: '%s | JokeLikeaDad.com',
  },
  description:
    'The best collection of dad jokes on the internet. Browse 2,000+ handpicked dad jokes across 20 categories. Guaranteed groans.',
  authors: [{ name: 'JokeLikeaDad.com' }],
  creator: 'JokeLikeaDad.com',
  category: 'Entertainment',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://jokelikeadad.com',
    siteName: 'JokeLikeaDad.com',
    title: 'Dad Jokes — The Best Dad Jokes | JokeLikeaDad.com',
    description:
      'The best collection of dad jokes on the internet. Browse 2,000+ handpicked dad jokes across 20 categories. Guaranteed groans.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dad Jokes — The Best Dad Jokes | JokeLikeaDad.com',
    description:
      'The best collection of dad jokes on the internet. Browse 2,000+ handpicked dad jokes across 20 categories. Guaranteed groans.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://jokelikeadad.com',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} antialiased font-sans`}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
