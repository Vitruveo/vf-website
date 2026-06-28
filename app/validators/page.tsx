import type { Metadata } from "next";
import Header from '../components/Header';
import Footer from '../components/Footer';

export const metadata: Metadata = {
  title: "Validators | Vertical Foundation",
  description: "Validators secure the Vitruveo blockchain — processing transactions, securing consensus, and signing HOST requests. Vertical Foundation runs the network and oversees validator onboarding, health, and success.",
};

export default function ValidatorsPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section
          className="section-padding position-relative"
          style={{
            paddingTop: '140px',
            backgroundImage:
              'linear-gradient(rgba(10,15,10,0.80), rgba(10,15,10,0.93)), url(/network.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="container">
            <div className="text-center mb-5">
              <h1 className="display-4 fw-bold mb-3">
                <span className="text-gradient">Validators</span>
              </h1>
              <p className="lead text-muted-custom mb-4" style={{ maxWidth: '780px', margin: '0 auto', fontSize: '1.4rem' }}>
                The network that secures Vitruveo — and the operators who run it. Vertical
                Foundation manages the protocol network and oversees validator
                onboarding and&nbsp;success.
              </p>
              <div className="d-flex gap-3 justify-content-center flex-wrap">
                <a href="/validators/app" className="btn btn-green btn-lg px-5">
                  Become a Validator
                </a>
                <a href="https://network.vitruveo.ai" target="_blank" rel="noopener noreferrer" className="btn btn-outline-light btn-lg px-5">
                  View Live Network
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Become a Validator */}
        <section id="become" className="section-padding bg-dark-alt">
          <div className="container">
            <div className="text-center mb-5">
              <h2 className="display-6 fw-bold mb-3">Become a Validator</h2>
              <p className="text-muted-custom" style={{ maxWidth: '720px', margin: '0 auto' }}>
                We&apos;re consolidating the network from 350 validators down to 100 — making every
                remaining seat scarcer and more valuable. A limited number are open now.
              </p>
            </div>

            {/* Availability */}
            <div className="row justify-content-center mb-5">
              <div className="col-lg-10">
                <div className="card-accent p-4">
                  <div className="row text-center">
                    <div className="col-4">
                      <div className="display-5 fw-bold text-white">100</div>
                      <div className="small text-white-50">Total seats</div>
                    </div>
                    <div className="col-4">
                      <div className="display-5 fw-bold text-white">10</div>
                      <div className="small text-white-50">Reserved</div>
                    </div>
                    <div className="col-4">
                      <div className="display-5 fw-bold text-green">90</div>
                      <div className="small text-white-50">Remaining</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Two paths */}
            <div className="row g-4 justify-content-center mb-5">
              <div className="col-lg-5 col-md-6">
                <div className="card-dark p-4 p-lg-5 h-100 text-center">
                  <h3 className="h4 text-green mb-3">New Validator</h3>
                  <div className="display-5 fw-bold text-white mb-3">$3,000</div>
                  <p className="text-muted-custom mb-0">
                    Buy a seat in the new 100-validator set and start earning from every block you mine. (New Validators automatically receive Reward 1 and Reward 2 described below.)
                  </p>
                </div>
              </div>
              <div className="col-lg-5 col-md-6">
                <div className="card-dark p-4 p-lg-5 h-100 text-center">
                  <h3 className="h4 text-green mb-3">Former Validator</h3>
                  <div className="display-5 fw-bold text-white mb-3">
                    from $100
                  </div>
                  <p className="text-muted-custom mb-0">
                    Reclaim your spot for an admin fee starting at $100. The fee rises by $10 with
                    every former validator who claims a seat — so earlier is cheaper.
                  </p>
                </div>
              </div>
            </div>

            {/* Liquidity commitment */}
            <div className="row justify-content-center mb-5">
              <div className="col-lg-10">
                <div className="card-accent p-4 p-lg-5 text-center">
                  <h3 className="h5 text-green mb-3">Every Seat Strengthens VTRU</h3>
                  <p className="text-white mb-0" style={{ fontSize: '1.2rem', lineHeight: 1.7, maxWidth: '720px', margin: '0 auto' }}>
                    <strong className="text-green">$50 of every fee</strong> goes directly to
                    liquidity, and the <strong className="text-green">LP tokens are burned</strong>,
                    {' '}ensuring the liquidity is permanent and strengthening VTRU for everyone who holds it.
                  </p>
                </div>
              </div>
            </div>

            {/* Benefits */}
            <h3 className="h5 text-center text-white mb-4">What every validator earns</h3>
            <div className="row g-4 justify-content-center mb-5">
              <div className="col-lg-5 col-md-6">
                <div className="card-dark p-4 h-100 text-center">
                  <div className="h3 text-green mb-2">1 VTRU <span className="h6 text-white-50">/ block mined</span></div>
                  <h4 className="h6 text-white mb-2">Block Rewards</h4>
                  <p className="text-muted-custom small mb-0">
                    Earn 1 VTRU for every block you mine, paid out monthly for 5 years.
                  </p>
                </div>
              </div>
              <div className="col-lg-5 col-md-6">
                <div className="card-dark p-4 h-100 text-center">
                  <div className="h3 text-green mb-2">10 <span className="h6 text-white-50">VIBE shares</span></div>
                  <h4 className="h6 text-white mb-2">Revenue Sharing</h4>
                  <p className="text-muted-custom small mb-0">
                    Receive 10 shares of VIBE, sharing in ongoing ecosystem revenue.
                  </p>
                </div>
              </div>
            </div>

            {/* Projected income */}
            <div className="row justify-content-center mb-5">
              <div className="col-lg-10">
                <div className="card-accent p-4 p-lg-5">
                  <h3 className="h5 text-center mb-2">What That Adds Up To</h3>
                  <p className="text-muted-custom text-center small mb-4" style={{ maxWidth: '640px', margin: '0 auto' }}>
                    Block rewards run for 5 years. With 5-second blocks shared evenly across the
                    100-validator set:
                  </p>
                  <div className="row g-3 text-center mb-4">
                    {[
                      { v: '17,280', l: 'Blocks / day', s: '86,400s ÷ 5s' },
                      { v: '172.8', l: 'Blocks / validator / day', s: '÷ 100 validators' },
                      { v: '1 VTRU', l: 'Reward / block', s: 'paid monthly' },
                      { v: '5 yrs', l: 'Reward period', s: '× 365 days' },
                    ].map((step) => (
                      <div key={step.l} className="col-6 col-lg-3">
                        <div className="p-3 rounded h-100" style={{ background: 'rgba(0,0,0,0.2)' }}>
                          <div className="h4 text-green mb-1">{step.v}</div>
                          <div className="small text-white mb-1">{step.l}</div>
                          <div className="text-white-50" style={{ fontSize: '0.75rem' }}>{step.s}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="text-center pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.12)' }}>
                    <div className="display-5 fw-bold text-green mb-1">315,360 VTRU</div>
                    <div className="text-white-50 small">
                      per validator over 5 years — about 31.5M VTRU across the full 100-validator set.
                    </div>
                    <div className="text-white-50 mt-2" style={{ fontSize: '0.75rem' }}>
                      Assumes even block distribution; actual rewards vary with uptime and rotation.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center">
              <a href="/validators/app" className="btn btn-green btn-lg px-5">
                Become a Validator
              </a>
            </div>
          </div>
        </section>

        {/* Legacy Validators */}
        <section id="legacy" className="section-padding bg-dark-custom">
          <div className="container">
            <div className="text-center mb-5">
              <h2 className="display-6 fw-bold mb-3">Legacy Validators</h2>
              <p className="text-muted-custom" style={{ maxWidth: '760px', margin: '0 auto' }}>
                While we can&apos;t accommodate every Legacy Validator on the re-imagined Vitruveo
                blockchain, we&apos;re grateful for your support and want to keep you in the ecosystem.
                Every Legacy Validator can go to{' '}
                <a href="https://scope.vitruveo.ai/legacy" target="_blank" rel="noopener noreferrer" className="text-green">scope.vitruveo.ai/legacy</a>{' '}
                starting June 28, 2026 and claim two valuable rewards through September 30, 2026.
              </p>
            </div>

            <div className="row g-4 justify-content-center mb-5">
              <div className="col-lg-5 col-md-6">
                <div className="card-dark p-4 p-lg-5 h-100 text-center">
                  <div className="small text-green fw-semibold mb-2" style={{ letterSpacing: '0.08em' }}>REWARD 1</div>
                  <div className="display-5 fw-bold text-white mb-4">10,000 VTRU</div>
                  <div className="d-flex flex-column gap-2 text-start">
                    <div className="d-flex justify-content-between p-3 rounded" style={{ background: 'rgba(0,0,0,0.25)' }}>
                      <span className="text-muted-custom">Unlocked now</span>
                      <span className="text-green fw-bold">1,000</span>
                    </div>
                    <div className="d-flex justify-content-between p-3 rounded" style={{ background: 'rgba(0,0,0,0.25)' }}>
                      <span className="text-muted-custom">Locked for 1 year</span>
                      <span className="text-white fw-bold">4,500</span>
                    </div>
                    <div className="d-flex justify-content-between p-3 rounded" style={{ background: 'rgba(0,0,0,0.25)' }}>
                      <span className="text-muted-custom">Locked for 2 years</span>
                      <span className="text-white fw-bold">4,500</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-5 col-md-6">
                <div className="card-dark p-4 p-lg-5 h-100 text-center">
                  <div className="small text-green fw-semibold mb-2" style={{ letterSpacing: '0.08em' }}>REWARD 2</div>
                  <div className="display-5 fw-bold text-white mb-2">VIP NFT</div>
                  <p className="text-green mb-4">
                    <strong>V</strong>itruveo <strong>I</strong>nspired <strong>P</strong>retrend
                  </p>
                  <p className="text-muted-custom mb-0">
                    Pro-rata ownership of a{' '}
                    <span className="text-green fw-semibold">5% validator-pool allocation</span>{' '}
                    of future Pretrend tokens.
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <a href="https://scope.vitruveo.ai/legacy" target="_blank" rel="noopener noreferrer" className="btn btn-green btn-lg px-5">
                Claim Your Rewards
              </a>
              <p className="text-white-50 small mt-3 mb-0">Claim window: June 28 – September 30, 2026.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
