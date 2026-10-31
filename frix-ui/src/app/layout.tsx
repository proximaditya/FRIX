import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

/**
 * Root Layout — Provides ClerkProvider, Google Fonts, and global styles.
 *
 * Fonts:
 *  - Space Grotesk (headings)
 *  - Inter (body text)
 *  - JetBrains Mono (scores, timers, technical labels)
 */

export const metadata: Metadata = {
  title: "FRIX — The Arena of Ideas | Where Arguments Earn Aura",
  description:
    "FRIX is a competitive, real-time multiplayer debate platform. Challenge ideas, defend arguments, and compete in arenas scored by AI and judged by crowds.",
  keywords: [
    "debate platform",
    "real-time debates",
    "AI moderated debates",
    "competitive debating",
    "FRIX",
    "argument arena",
    "ELO ranking debates",
  ],
  authors: [{ name: "proximaditya" }],
  openGraph: {
    title: "FRIX — The Arena of Ideas",
    description:
      "Challenge ideas, defend arguments, and compete in real-time multiplayer debate arenas.",
    type: "website",
    siteName: "FRIX",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <html lang="en" data-theme="dark">
        <head>
          {/* Google Fonts: Space Grotesk, Inter, JetBrains Mono */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap"
            rel="stylesheet"
          />
        </head>
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}