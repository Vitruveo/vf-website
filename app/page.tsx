import Header from './components/Header';
import Hero from './components/Hero';
import Footer from './components/Footer';

// Icon components
const ExternalLinkIcon = () => (
  <svg className="external-link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/>
  </svg>
);

const ProtocolIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
  </svg>
);

const UtilitiesIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="3" y="3" width="7" height="7" rx="1"/>
    <rect x="14" y="3" width="7" height="7" rx="1"/>
    <rect x="3" y="14" width="7" height="7" rx="1"/>
    <rect x="14" y="14" width="7" height="7" rx="1"/>
  </svg>
);

const TreasuryIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="3" y="8" width="18" height="13" rx="2"/>
    <path d="M7 8V6a5 5 0 0 1 10 0v2"/>
    <circle cx="12" cy="15" r="2"/>
  </svg>
);

const DiceIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="3" y="3" width="18" height="18" rx="2"/>
    <circle cx="8" cy="8" r="1" fill="currentColor"/>
    <circle cx="16" cy="8" r="1" fill="currentColor"/>
    <circle cx="8" cy="16" r="1" fill="currentColor"/>
    <circle cx="16" cy="16" r="1" fill="currentColor"/>
    <circle cx="12" cy="12" r="1" fill="currentColor"/>
  </svg>
);

const CalculatorIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="4" y="2" width="16" height="20" rx="2"/>
    <rect x="6" y="4" width="12" height="4"/>
    <circle cx="8" cy="12" r="1" fill="currentColor"/>
    <circle cx="12" cy="12" r="1" fill="currentColor"/>
    <circle cx="16" cy="12" r="1" fill="currentColor"/>
    <circle cx="8" cy="16" r="1" fill="currentColor"/>
    <circle cx="12" cy="16" r="1" fill="currentColor"/>
    <circle cx="16" cy="16" r="1" fill="currentColor"/>
  </svg>
);

const KeyIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/>
  </svg>
);

const BatchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M16 3h5v5M8 3H3v5M3 16v5h5M16 21h5v-5M12 8v8M8 12h8"/>
  </svg>
);

const SplitIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="18" cy="5" r="3"/>
    <circle cx="6" cy="12" r="3"/>
    <circle cx="18" cy="19" r="3"/>
    <path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98"/>
  </svg>
);

const SaleIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
  </svg>
);

const GigIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/>
    <rect x="9" y="3" width="6" height="4" rx="1"/>
    <path d="M9 12l2 2 4-4"/>
  </svg>
);

const GovernanceIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 2L2 7h20L12 2z"/>
    <rect x="4" y="9" width="4" height="10"/>
    <rect x="10" y="9" width="4" height="10"/>
    <rect x="16" y="9" width="4" height="10"/>
    <path d="M2 19h20v2H2z"/>
  </svg>
);

const OperationsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="3"/>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
  </svg>
);

const ProductIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <polygon points="12 2 2 7 12 12 22 7 12 2"/>
    <polyline points="2 17 12 22 22 17"/>
    <polyline points="2 12 12 17 22 12"/>
  </svg>
);

const LightbulbIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7V17a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2.3A7 7 0 0 0 12 2z"/>
  </svg>
);

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="10"/>
    <polygon points="10 8 16 12 10 16 10 8" fill="currentColor"/>
  </svg>
);

// HOST Demo Icons
const BellIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="1.5">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
  </svg>
);

const ScoutIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="1.5">
    <circle cx="12" cy="12" r="10"/>
    <path d="M12 16V8M12 8l-3 3M12 8l3 3"/>
  </svg>
);

const GridIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="1.5">
    <rect x="3" y="3" width="4" height="4"/>
    <rect x="10" y="3" width="4" height="4"/>
    <rect x="17" y="3" width="4" height="4"/>
    <rect x="3" y="10" width="4" height="4"/>
    <rect x="10" y="10" width="4" height="4"/>
    <rect x="17" y="10" width="4" height="4"/>
    <rect x="3" y="17" width="4" height="4"/>
    <rect x="10" y="17" width="4" height="4"/>
    <rect x="17" y="17" width="4" height="4"/>
  </svg>
);

const SmartphoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="1.5">
    <rect x="5" y="2" width="14" height="20" rx="2"/>
    <line x1="12" y1="18" x2="12" y2="18"/>
  </svg>
);

const RocketIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
    <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
  </svg>
);

const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    <path d="M9 12l2 2 4-4"/>
  </svg>
);

const TrendingIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
    <polyline points="17 6 23 6 23 12"/>
  </svg>
);

// SVG Workflow Diagrams
const ChainOfCustodySVG = () => (
  <svg viewBox="0 0 800 200" className="workflow-svg" style={{ width: '100%', height: 'auto' }}>
    {/* Background */}
    <defs>
      <linearGradient id="greenGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#7bc47f" stopOpacity="0.2"/>
        <stop offset="100%" stopColor="#a8e6a3" stopOpacity="0.2"/>
      </linearGradient>
      <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#7bc47f"/>
      </marker>
    </defs>

    {/* Step 1 */}
    <rect x="20" y="40" width="200" height="120" rx="12" fill="url(#greenGradient)" stroke="#7bc47f" strokeWidth="1"/>
    <text x="120" y="75" textAnchor="middle" fill="#a8e6a3" fontSize="14" fontWeight="600">CONTRACT</text>
    <text x="120" y="100" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="12">Executes and calls</text>
    <text x="120" y="118" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="12">HOST with target</text>
    <text x="120" y="136" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="12">URL and payload</text>

    {/* Arrow 1 */}
    <line x1="230" y1="100" x2="290" y2="100" stroke="#7bc47f" strokeWidth="2" markerEnd="url(#arrowhead)"/>

    {/* Step 2 */}
    <rect x="300" y="40" width="200" height="120" rx="12" fill="url(#greenGradient)" stroke="#7bc47f" strokeWidth="1"/>
    <text x="400" y="75" textAnchor="middle" fill="#a8e6a3" fontSize="14" fontWeight="600">VALIDATOR</text>
    <text x="400" y="100" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="12">Signs the outbound</text>
    <text x="400" y="118" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="12">request with its</text>
    <text x="400" y="136" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="12">private key</text>

    {/* Arrow 2 */}
    <line x1="510" y1="100" x2="570" y2="100" stroke="#7bc47f" strokeWidth="2" markerEnd="url(#arrowhead)"/>

    {/* Step 3 */}
    <rect x="580" y="40" width="200" height="120" rx="12" fill="url(#greenGradient)" stroke="#7bc47f" strokeWidth="1"/>
    <text x="680" y="75" textAnchor="middle" fill="#a8e6a3" fontSize="14" fontWeight="600">RECEIVER</text>
    <text x="680" y="100" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="12">Verifies signature,</text>
    <text x="680" y="118" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="12">creating auditable</text>
    <text x="680" y="136" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="12">proof of origin</text>
  </svg>
);

const TransactionAsSignatureSVG = () => (
  <svg viewBox="0 0 800 280" className="workflow-svg" style={{ width: '100%', height: 'auto' }}>
    <defs>
      <linearGradient id="greenGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#7bc47f" stopOpacity="0.2"/>
        <stop offset="100%" stopColor="#a8e6a3" stopOpacity="0.2"/>
      </linearGradient>
      <marker id="arrowhead2" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#7bc47f"/>
      </marker>
    </defs>

    {/* Step 1 - Fund */}
    <rect x="20" y="80" width="200" height="120" rx="12" fill="url(#greenGradient2)" stroke="#7bc47f" strokeWidth="1"/>
    <text x="120" y="110" textAnchor="middle" fill="#a8e6a3" fontSize="18" fontWeight="600">FUND</text>
    <text x="120" y="135" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="11">Paying party funds their</text>
    <text x="120" y="153" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="11">contractual obligation,</text>
    <text x="120" y="171" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="11">signing by transaction</text>

    {/* Arrow 1 */}
    <line x1="230" y1="140" x2="290" y2="140" stroke="#7bc47f" strokeWidth="2" markerEnd="url(#arrowhead2)"/>

    {/* Step 2 - Sign */}
    <rect x="300" y="80" width="200" height="120" rx="12" fill="url(#greenGradient2)" stroke="#7bc47f" strokeWidth="1"/>
    <text x="400" y="110" textAnchor="middle" fill="#a8e6a3" fontSize="18" fontWeight="600">SIGN</text>
    <text x="400" y="135" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="11">Other parties sign in</text>
    <text x="400" y="153" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="11">parallel—like a multisig,</text>
    <text x="400" y="171" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="11">but for legal agreements</text>

    {/* Arrow to Execute (upper branch) */}
    <path d="M510 140 L540 140 L540 70 L570 70" stroke="#7bc47f" strokeWidth="2" fill="none" markerEnd="url(#arrowhead2)"/>

    {/* Arrow to Document (lower branch) */}
    <path d="M510 140 L540 140 L540 210 L570 210" stroke="#7bc47f" strokeWidth="2" fill="none" markerEnd="url(#arrowhead2)"/>

    {/* Step 3a - Execute */}
    <rect x="580" y="10" width="200" height="120" rx="12" fill="url(#greenGradient2)" stroke="#7bc47f" strokeWidth="1"/>
    <text x="680" y="40" textAnchor="middle" fill="#a8e6a3" fontSize="18" fontWeight="600">EXECUTE</text>
    <text x="680" y="65" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="11">Contract holds funds in</text>
    <text x="680" y="83" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="11">escrow, releasing per</text>
    <text x="680" y="101" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="11">agreed terms</text>

    {/* Step 3b - Document */}
    <rect x="580" y="150" width="200" height="120" rx="12" fill="url(#greenGradient2)" stroke="#7bc47f" strokeWidth="1"/>
    <text x="680" y="180" textAnchor="middle" fill="#a8e6a3" fontSize="18" fontWeight="600">DOCUMENT</text>
    <text x="680" y="205" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="11">HOST triggers AI workflow,</text>
    <text x="680" y="223" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="11">generating signed PDF with</text>
    <text x="680" y="241" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="11">all party addresses</text>
  </svg>
);

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />

        {/* About Vertical Foundation */}
        <section id="about" className="section-padding bg-dark-custom">
          <div className="container">
            <div className="row align-items-center mb-5">
              <div className="col-lg-6 mb-4 mb-lg-0">
                <p className="lead text-muted-custom" style={{ fontSize: '1.25rem', lineHeight: '1.8' }}>
                  We build at every layer of the stack — from the HOST protocol that lets smart
                  contracts interact with external services via validator-signed HTTP requests,
                  to the Pretrend protocol that brings native statistical computation to the EVM.
                </p>
              </div>
              <div className="col-lg-6">
                <p className="lead text-muted-custom" style={{ fontSize: '1.25rem', lineHeight: '1.8' }}>
                  Both protocols are built natively into the Vitruveo blockchain — not as smart contracts,
                  but as precompiled operations that execute at machine-code speed with negligible
                  gas costs. This is infrastructure that other chains simply don&apos;t have.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What We Build */}
        <section className="section-padding bg-dark-alt">
          <div className="container">
            <h2 className="display-5 fw-bold text-center mb-5">What We Build</h2>

            <div className="row g-4 justify-content-center">
              <div className="col-lg-5 col-md-6">
                <a href="/host" className="text-decoration-none">
                  <div className="card-dark p-4 h-100">
                    <div className="icon-container">
                      <ProtocolIcon />
                    </div>
                    <h3 className="h4 text-green mb-3">HOST Protocol</h3>
                    <p className="text-muted-custom mb-3">
                      The first protocol-level outbound trigger in any EVM chain. Smart contracts
                      can execute HTTP webhooks during transaction execution, with validator
                      signatures providing provable authenticity.
                    </p>
                    <p className="text-muted-custom mb-0">
                      Three-layer security model. ECDH encryption. Cryptographic chain of custody.
                      The bridge between Web3 and Web2 that the industry has been missing.
                    </p>
                  </div>
                </a>
              </div>
              <div className="col-lg-5 col-md-6">
                <a href="/pretrend" className="text-decoration-none">
                  <div className="card-dark p-4 h-100">
                    <div className="icon-container">
                      <CalculatorIcon />
                    </div>
                    <h3 className="h4 text-green mb-3">Pretrend Protocol</h3>
                    <p className="text-muted-custom mb-3">
                      Trend-based oracle protocol for prediction markets. Native on-chain
                      statistical computation via EVM precompile — OLS regression, volatility
                      analysis, and distribution modeling at machine-code speed.
                    </p>
                    <p className="text-muted-custom mb-0">
                      Five outcome buckets. Bonding curve pricing. Cross-chain resolution via HOST.
                      Prediction markets that capture direction and magnitude, not just binary outcomes.
                    </p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* HOST Protocol */}
        <section id="technology" className="section-padding bg-dark-custom">
          <div className="container">
            <div className="text-center mb-5">
              <h2 className="display-5 fw-bold mb-3">The HOST Protocol</h2>
              <p className="lead text-muted-custom">
                Webhooks for Web3. The first protocol-level outbound trigger in any EVM chain.
              </p>
            </div>

            <div className="row mb-5">
              <div className="col-lg-6 mb-4 mb-lg-0">
                <h3 className="h4 text-green mb-4">The Problem</h3>
                <p className="text-muted-custom mb-3">
                  Smart contracts are isolated by design. They can receive transactions and emit
                  logs, but they cannot reach out to the outside world. They can&apos;t call an API.
                  They can&apos;t send a webhook. They can&apos;t even ping a server.
                </p>
                <p className="text-muted-custom">
                  This forces developers to build elaborate workarounds — oracle networks, middleware
                  services, fragile bridges. For enterprise adoption, this is a dealbreaker. Businesses
                  need provable chains of custody, not duct tape.
                </p>
              </div>
              <div className="col-lg-6">
                <h3 className="h4 text-green mb-4">The Solution</h3>
                <p className="text-muted-custom mb-3">
                  HOST gives smart contracts a voice. When a contract executes on the Vitruveo blockchain,
                  it can make HTTP requests directly — calling APIs, triggering webhooks, pushing data
                  to any web service. No oracles. No middleware. No third-party dependencies.
                </p>
                <p className="text-muted-custom">
                  Every outbound request is signed by the validator that processed the transaction,
                  creating a cryptographic chain of custody — immutable, validator-attested proof
                  that a specific on-chain event triggered a specific off-chain action.
                </p>
              </div>
            </div>

            <div className="card-dark p-4 p-lg-5 mb-5">
              <h3 className="h5 text-center mb-4">Chain of Custody</h3>
              <ChainOfCustodySVG />
            </div>

            <div className="text-center">
              <a href="/host" className="btn btn-outline-light btn-lg px-5">
                Read the Full HOST Specification &rarr;
              </a>
            </div>
          </div>
        </section>

        {/* Pretrend */}
        <section id="pretrend" className="section-padding bg-dark-custom">
          <div className="container">
            <div className="text-center mb-5">
              <h2 className="display-5 fw-bold mb-3">Pretrend</h2>
              <p className="lead text-muted-custom">
                Continuous trend resolution for prediction markets — built on-chain with native statistical computation.
              </p>
            </div>

            <div className="row mb-5">
              <div className="col-lg-6 mb-4 mb-lg-0">
                <h3 className="h4 text-green mb-4">Beyond Binary Markets</h3>
                <p className="text-muted-custom mb-3">
                  Traditional prediction markets force complex phenomena into binary outcomes. If
                  Bitcoin rises from $60,000 to $99,000 but the market asked &quot;will it hit $100K?&quot;,
                  participants who correctly predicted growth receive nothing.
                </p>
                <p className="text-muted-custom">
                  Pretrend computes trend slope using linear regression, mapping results to five
                  outcome buckets — Crash, Bear, Flat, Bull, Moon — each calibrated to the data
                  source&apos;s historical volatility. A bonding curve rewards early conviction with
                  better returns.
                </p>
              </div>
              <div className="col-lg-6">
                <h3 className="h4 text-green mb-4">Native Precompile</h3>
                <p className="text-muted-custom mb-3">
                  Solidity can&apos;t handle iterative statistical analysis — gas costs are prohibitive
                  and there&apos;s no floating-point support. Pretrend runs as a native precompiled
                  contract on the Vitruveo blockchain, executing OLS regression and volatility
                  analysis at compiled machine-code speed.
                </p>
                <p className="text-muted-custom">
                  The Oracle on Vitruveo pushes resolution cross-chain via HOST to marketplace
                  contracts on BSC and other EVM chains.
                </p>
              </div>
            </div>

            <div className="text-center">
              <a href="/pretrend" className="btn btn-outline-light btn-lg px-5">
                Read the Full Protocol Specification &rarr;
              </a>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
