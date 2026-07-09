import type { Metadata } from "next";
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Web3Providers } from '../web3/Providers';
import ValidatorTabs from './ValidatorTabs';

export const metadata: Metadata = {
  title: "Validators | Vertical Foundation",
  description: "Claim one of 100 Vitruveo validator node slots. Basic, Super, and Hyper nodes earn VTRU block rewards and VIBE shares; Super and Hyper add notary and processor eligibility.",
};

export default function ValidatorsPage() {
  return (
    <Web3Providers>
      <Header />
      <main>
        <section className="section-padding bg-dark-custom" style={{ paddingTop: '140px' }}>
          <div className="container">
            <div className="text-center mb-5">
              <h1 className="display-4 fw-bold mb-0">
                <span className="text-gradient">Validators</span>
              </h1>
            </div>

            <ValidatorTabs />
          </div>
        </section>
      </main>
      <Footer />
    </Web3Providers>
  );
}
