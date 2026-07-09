import type { Metadata } from "next";
import Header from '../components/Header';
import Footer from '../components/Footer';
import DomainCarousel from './DomainCarousel';

export const metadata: Metadata = {
  title: "Pretrend Protocol | Vertical Foundation",
  description: "Pretrend is a trend-based oracle protocol enabling prediction markets to resolve based on directional movement rather than binary outcomes. Native on-chain statistical computation on the Vitruveo blockchain.",
};

const InProgressBadge = () => (
  <div
    className="position-relative d-inline-flex align-items-center justify-content-center"
    style={{ width: '120px', height: '120px' }}
    aria-label="In progress"
  >
    <svg className="vf-spin position-absolute" width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="#7bc47f" strokeOpacity="0.45" strokeWidth="1.1">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
    <svg className="vf-flip" width="52" height="52" viewBox="0 0 24 24">
      <rect x="5" y="2" width="14" height="1.6" rx="0.8" fill="#a8e6a3" />
      <rect x="5" y="20.4" width="14" height="1.6" rx="0.8" fill="#a8e6a3" />
      <path d="M7 3.6h10v1.9c0 3-3.5 4.5-5 6.5-1.5-2-5-3.5-5-6.5z" fill="rgba(168,230,163,0.55)" />
      <path d="M7 20.4h10v-1.9c0-3-3.5-4.5-5-6.5-1.5 2-5 3.5-5 6.5z" fill="rgba(168,230,163,0.55)" />
    </svg>
  </div>
);

export default function PretrendPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="section-padding bg-dark-custom" style={{ paddingTop: '140px' }}>
          <div className="container">
            <div className="text-center">
              <h1 className="display-4 fw-bold mb-3">
                <span className="text-gradient">Pretrend</span> Protocol
              </h1>
              <p className="lead text-muted-custom" style={{ maxWidth: '800px', margin: '0 auto', fontSize: '1.4rem' }}>
                Continuous trend resolution for prediction markets. Users predict the
                magnitude and direction of change — not just whether an event occurs.
              </p>
              <p className="text-white-50 mt-3">Version 2.0</p>
              <div className="mt-5">
                <DomainCarousel />
              </div>
              <div className="d-flex gap-3 justify-content-center flex-wrap mt-5">
                <a
                  href="https://www.pretrend.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-green btn-lg px-5"
                >
                  Pretrend Website
                </a>
                <a
                  href="https://www.pretrend.ai/whitepaper"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline-light btn-lg px-5"
                >
                  Read the Whitepaper
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Pretrend Roadmap */}
        <section id="roadmap" className="section-padding bg-dark-alt">
          <div className="container">
            <div className="text-center mb-5">
              <h2 className="display-6 fw-bold mb-3">2026 Roadmap</h2>
              <p className="text-muted-custom" style={{ maxWidth: '700px', margin: '0 auto' }}>
                The path to a live Pretrend oracle — quarter by quarter through 2026.
              </p>
            </div>

            <div className="row g-4">
              {[
                {
                  q: 'Q1 2026',
                  title: 'Shanghai Upgrade & Protocol Contracts',
                  desc: 'Upgrade protocol to Shanghai, remove legacy features and revise tokenomics.',
                  href: 'https://explorer.vitruveo.ai',
                  cta: 'View Explorer',
                  done: true,
                  inProgress: false,
                },
                {
                  q: 'Q2 2026',
                  title: 'On-Chain Trend Algorithm',
                  desc: 'Implement algorithms needed for Pretrend into the protocol as built-in smart contracts and deploy.',
                  href: 'https://www.pretrend.ai/examples',
                  cta: 'Try it out',
                  done: true,
                  inProgress: false,
                },
                {
                  q: 'Q3 2026',
                  title: 'Smart Contracts, Libraries & SDK',
                  desc: 'Develop and deploy the smart contracts that implement the Pretrend protocol, plus the libraries and SDK developers need to build on it.',
                  href: null,
                  cta: null,
                  done: false,
                  inProgress: true,
                },
                {
                  q: 'Q4 2026',
                  title: 'Oracle & Launch',
                  desc: 'Complete development of Pretrend and launch the oracle alongside the reference site.',
                  href: null,
                  cta: null,
                  done: false,
                  inProgress: false,
                },
              ].map((item, i, arr) => (
                <div key={item.q} className="col-lg-3 col-md-6">
                  {/* timeline marker with vertically-centered connecting line */}
                  <div className="position-relative d-flex justify-content-center mb-3" style={{ height: '56px' }}>
                    <div
                      className="d-none d-lg-block position-absolute"
                      style={{
                        top: '50%',
                        left: i === 0 ? '50%' : '-12px',
                        right: i === arr.length - 1 ? '50%' : '-12px',
                        height: '2px',
                        transform: 'translateY(-50%)',
                        background: 'linear-gradient(90deg, rgba(123,196,127,0.4), rgba(123,196,127,0.6))',
                        zIndex: 0,
                      }}
                    />
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center fw-bold"
                      style={{
                        width: '56px',
                        height: '56px',
                        background: 'var(--vf-dark-alt)',
                        border: '2px solid #7bc47f',
                        color: '#a8e6a3',
                        position: 'relative',
                        zIndex: 1,
                      }}
                    >
                      {i + 1}
                    </div>
                  </div>
                  <div className="card-dark p-4 h-100 text-center d-flex flex-column">
                    <div>
                      <div
                        className="d-inline-block px-3 py-1 rounded-pill mb-3"
                        style={{ background: 'rgba(123,196,127,0.12)', border: '1px solid rgba(123,196,127,0.35)' }}
                      >
                        <span className="text-green fw-semibold small">{item.q}</span>
                      </div>
                      <h3 className="h5 text-white mb-3">{item.title}</h3>
                      <p className="text-muted-custom small mb-3">{item.desc}</p>
                      {item.href && (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-green small text-decoration-none fw-semibold"
                        >
                          {item.cta} &rarr;
                        </a>
                      )}
                    </div>
                    {item.done && (
                      <div className="mt-auto pt-4">
                        <span
                          className="d-inline-flex align-items-center justify-content-center rounded-circle vf-pulse"
                          style={{ width: '128px', height: '128px', background: '#4ade80' }}
                          aria-label="Complete"
                        >
                          <svg width="76" height="76" viewBox="0 0 24 24" fill="none" stroke="#0a0f0a" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </span>
                      </div>
                    )}
                    {item.inProgress && (
                      <div className="mt-auto pt-4">
                        <InProgressBadge />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding bg-dark-custom">
          <div className="container text-center">
            <p className="display-5 fw-bold mb-4" style={{ maxWidth: '820px', margin: '0 auto' }}>
              <span className="d-block">The world runs on trends.</span>
              <span className="text-gradient d-block">Pretrend makes them tradable.</span>
            </p>
            <p className="text-muted-custom mb-4" style={{ maxWidth: '500px', margin: '0 auto' }}>
              Interested in building on Pretrend or deploying a white-label marketplace?
            </p>
            <div className="d-flex gap-3 justify-content-center flex-wrap">
              <a href="mailto:info@verticalfoundation.net" className="btn btn-green btn-lg px-5">
                Contact Us
              </a>
              <a
                href="https://www.pretrend.ai/whitepaper"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-light btn-lg px-5"
              >
                Read the Whitepaper
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
