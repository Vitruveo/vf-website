import type { Metadata } from "next";
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Web3Providers } from '../../web3/Providers';
import ActionTiles from './ActionTiles';

export const metadata: Metadata = {
  title: "Become a Validator | Vertical Foundation",
  description: "Join the Vitruveo validator set. Legacy validators and new/rejoining validators each receive a package of VTRU, Pretrend, and VIBE rewards.",
};

const Check = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 me-3 mt-1">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default function ValidatorJoinPage() {
  return (
    <Web3Providers>
      <Header />
      <main>
        <section className="section-padding bg-dark-custom" style={{ paddingTop: '140px' }}>
          <div className="container">
            <div className="text-center mb-5">
              <h1 className="display-4 fw-bold mb-0">
                Become a <span className="text-gradient">Validator</span>
              </h1>
            </div>

            <div className="row g-4 justify-content-center">
              {/* Legacy Validators */}
              <div className="col-lg-5 col-md-6">
                <div className="card-dark p-4 p-lg-5 h-100 d-flex flex-column">
                  <h2 className="h4 text-green mb-4">Benefits for Legacy Validators</h2>
                  <ul className="list-unstyled mb-4">
                    <li className="d-flex mb-3">
                      <Check />
                      <span className="text-muted-custom">
                        <span className="text-white fw-semibold">10,000 VTRU</span> — 1,000 unlocked,
                        4,500 locked for 1 year, 4,500 locked for 2 years
                      </span>
                    </li>
                    <li className="d-flex mb-3">
                      <Check />
                      <span className="text-muted-custom">
                        <span className="text-white fw-semibold">131,500 Pretrend VIP units</span>
                      </span>
                    </li>
                  </ul>
                  <div className="mt-auto text-center">
                    <a
                      href="https://scope.vitruveo.ai/legacy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-green btn-lg px-5"
                    >
                      Claim on Scope
                    </a>
                  </div>
                </div>
              </div>

              {/* Rejoining / New Validators */}
              <div className="col-lg-5 col-md-6">
                <div className="card-dark p-4 p-lg-5 h-100">
                  <h2 className="h4 text-green mb-4">Benefits for Rejoining &amp; New Validators</h2>
                  <ul className="list-unstyled mb-0">
                    <li className="d-flex mb-3">
                      <Check />
                      <span className="text-muted-custom"><span className="text-white fw-semibold">1 VTRU</span> per block mined</span>
                    </li>
                    <li className="d-flex mb-3">
                      <Check />
                      <span className="text-muted-custom"><span className="text-white fw-semibold">315,360 VTRU</span> over five years</span>
                    </li>
                    <li className="d-flex mb-3">
                      <Check />
                      <span className="text-muted-custom"><span className="text-white fw-semibold">10 VIBE shares</span></span>
                    </li>
                    <li className="d-flex mb-3">
                      <Check />
                      <span className="text-muted-custom">Rejoin starting at <span className="text-white fw-semibold">$100</span></span>
                    </li>
                    <li className="d-flex mb-3">
                      <Check />
                      <span className="text-muted-custom">New for <span className="text-white fw-semibold">$3,000</span></span>
                    </li>
                    <li className="d-flex">
                      <Check />
                      <span className="text-muted-custom">All Legacy Validator benefits</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <ActionTiles />
          </div>
        </section>
      </main>
      <Footer />
    </Web3Providers>
  );
}
