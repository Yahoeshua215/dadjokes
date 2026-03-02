import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Dad Jokes Directory",
    short_name: "Dad Jokes",
    description:
      "The ultimate collection of dad jokes. Browse, search, and share the best groan-worthy puns and one-liners.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
