import type { Metadata } from "next";
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export const metadata: Metadata = {
  title: "Become a Validator | Vertical Foundation",
  description: "Validator onboarding for the Vitruveo network is coming soon.",
};

export default function ValidatorAppPage() {
  return (
    <>
      <Header />
      <main>
        <section
          className="section-padding bg-dark-custom d-flex align-items-center"
          style={{ minHeight: '80vh', paddingTop: '140px' }}
        >
          <div className="container text-center">
            <p className="text-green fw-semibold mb-3" style={{ letterSpacing: '0.12em' }}>
              VALIDATOR ONBOARDING
            </p>
            <h1 className="display-3 fw-bold mb-4">
              <span className="text-gradient">Coming Soon</span>
            </h1>
            <p className="lead text-muted-custom mb-5" style={{ maxWidth: '620px', margin: '0 auto' }}>
              The validator application is on its way. You&apos;ll soon be able to claim or reclaim a
              seat, onboard your node, and start earning — right here.
            </p>
            <div className="d-flex gap-3 justify-content-center flex-wrap">
              <a href="/validators" className="btn btn-outline-light btn-lg px-5">
                Back to Validators
              </a>
              <a href="mailto:info@verticalfoundation.net" className="btn btn-green btn-lg px-5">
                Get Notified
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
