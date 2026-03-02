import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jokelikeadad.com"),
  title: {
    default: "Dad Jokes Directory — Joke Like a Dad",
    template: "%s | Dad Jokes Directory",
  },
  description:
    "The ultimate collection of dad jokes. Browse, search, and share the best groan-worthy puns and one-liners.",
  authors: [{ name: "Dad Jokes Directory" }],
  creator: "Dad Jokes Directory",
  category: "Entertainment",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://jokelikeadad.com",
    siteName: "Dad Jokes Directory",
    title: "Dad Jokes Directory — Joke Like a Dad",
    description:
      "The ultimate collection of dad jokes. Browse, search, and share the best groan-worthy puns and one-liners.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dad Jokes Directory — Joke Like a Dad",
    description:
      "The ultimate collection of dad jokes. Browse, search, and share the best groan-worthy puns and one-liners.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://jokelikeadad.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
