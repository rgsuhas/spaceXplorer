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
  title: "SpaceX Mission Control - Launches & Space Exploration",
  description: "Explore SpaceX missions, launches, and the future of space exploration. Track Falcon 9, Starship, Crew Dragon, and the journey to Mars with stunning visuals.",
  keywords: ["SpaceX", "launches", "rockets", "Mars", "Starship", "Falcon 9", "space exploration", "Elon Musk"],
  authors: [{ name: "SpaceX Mission Control" }],
  creator: "SpaceX Explorer",
  publisher: "SpaceX Explorer",
  openGraph: {
    title: "SpaceX Mission Control - Launches & Space Exploration",
    description: "Explore SpaceX missions, launches, and the future of space exploration with stunning visuals",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "SpaceX Mission Control - Launches & Space Exploration",
    description: "Track SpaceX missions and the journey to Mars with real-time data and beautiful imagery",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
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
