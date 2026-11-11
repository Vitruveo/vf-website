import type { Metadata } from "next";
import { Titillium_Web } from "next/font/google";
import "./globals.css";
import MetaMaskBar from "./components/MetaMaskBar";

const titillium = Titillium_Web({
  subsets: ["latin"],
  weight: ["200", "300", "400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Vertical Foundation | Vitruveo Blockchain Governance",
  description: "Vertical Foundation governs and funds the Vitruveo blockchain — an EVM-compatible L1 built for the AI era — across six pillars: VTRU, Pretrend, VIBE, Scope, Protocol, and Validators.",
  keywords: ["Vertical Foundation", "Vitruveo", "governance", "blockchain", "L1", "EVM", "VTRU", "Pretrend", "VIBE", "HOST protocol", "Scope", "Validators", "AI"],
  openGraph: {
    title: "Vertical Foundation | Vitruveo Blockchain Governance",
    description: "The foundation governing and funding the Vitruveo ecosystem across six foundational pillars.",
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
        <MetaMaskBar />
        {children}
      </body>
    </html>
  );
}
