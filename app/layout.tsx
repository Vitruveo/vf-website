import type { Metadata } from "next";
import { Titillium_Web } from "next/font/google";
import "./globals.css";
import MetaMaskBar from "./components/MetaMaskBar";

const titillium = Titillium_Web({
  subsets: ["latin"],
  weight: ["200", "300", "400", "600", "700"],
});

const SITE_TITLE = "Vertical Foundation | Vitruveo Blockchain Governance";
const SHARE_DESCRIPTION = "The foundation governing and funding the Vitruveo blockchain and the projects built on it, from Pretrend prediction markets to bridges, naming, and community revenue.";
const OG_IMAGE = { url: "/og.png", width: 1200, height: 630, alt: "Vertical Foundation: governing and funding the Vitruveo blockchain" };

export const metadata: Metadata = {
  metadataBase: new URL("https://www.verticalfoundation.net"),
  title: SITE_TITLE,
  description: "Vertical Foundation governs and funds the Vitruveo blockchain — an EVM-compatible L1 built for the AI era — across six pillars: VTRU, Pretrend, VIBE, Scope, Protocol, and Validators.",
  keywords: ["Vertical Foundation", "Vitruveo", "governance", "blockchain", "L1", "EVM", "VTRU", "Pretrend", "VIBE", "HOST protocol", "Scope", "Validators", "AI"],
  openGraph: {
    title: SITE_TITLE,
    description: SHARE_DESCRIPTION,
    siteName: "Vertical Foundation",
    type: "website",
    locale: "en_US",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SHARE_DESCRIPTION,
    images: [OG_IMAGE.url],
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
        <MetaMaskBar />
        {children}
      </body>
    </html>
  );
}
