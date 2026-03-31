import type { Metadata } from "next";
import { Titillium_Web } from "next/font/google";
import "./globals.css";

const titillium = Titillium_Web({
  subsets: ["latin"],
  weight: ["200", "300", "400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Vertical Foundation | Pretrend Protocol",
  description: "Vertical Foundation builds the Pretrend protocol — native on-chain statistical analysis for trend-aware DeFi — and products like PolyRadar and Vibe Legal on an AI-native EVM blockchain.",
  keywords: ["Vertical Foundation", "Pretrend", "blockchain", "L1", "EVM", "AI", "HOST protocol", "PolyRadar", "Vibe Legal", "DeFi"],
  openGraph: {
    title: "Vertical Foundation | Pretrend Protocol",
    description: "Vertical Foundation builds the Pretrend protocol and AI-native blockchain products.",
    type: "website",
  },
  icons: {
    icon: "/assets/vertical-foundation-logomark.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${titillium.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
