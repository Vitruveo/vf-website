import type { Metadata } from "next";
import Header from '../components/Header';
import Footer from '../components/Footer';

export const metadata: Metadata = {
  title: "HOST Protocol | Vertical Foundation",
  description: "HOST (HTTP Outbound Service Trigger) is the first protocol-level outbound trigger in any EVM chain. Smart contracts can execute HTTP webhooks with validator-signed cryptographic proof.",
};

const HostWorkflowSVG = () => (
  <svg viewBox="0 0 800 280" style={{ width: '100%', height: 'auto' }}>
    <defs>
      <linearGradient id="hostGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#7bc47f" stopOpacity="0.2"/>
        <stop offset="100%" stopColor="#a8e6a3" stopOpacity="0.2"/>
      </linearGradient>
      <marker id="hostArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#7bc47f"/>
      </marker>
    </defs>

    {/* Step 1 - Contract */}
    <rect x="20" y="80" width="160" height="120" rx="12" fill="url(#hostGrad)" stroke="#7bc47f" strokeWidth="1"/>
    <text x="100" y="115" textAnchor="middle" fill="#a8e6a3" fontSize="14" fontWeight="600">CONTRACT</text>
    <text x="100" y="140" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="11">Calls addRequest()</text>
    <text x="100" y="158" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="11">with URL, payload,</text>
    <text x="100" y="176" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="11">headers, nodes</text>

    <line x1="190" y1="140" x2="240" y2="140" stroke="#7bc47f" strokeWidth="2" markerEnd="url(#hostArrow)"/>

    {/* Step 2 - Precompile */}
    <rect x="250" y="80" width="160" height="120" rx="12" fill="url(#hostGrad)" stroke="#7bc47f" strokeWidth="1"/>
    <text x="330" y="115" textAnchor="middle" fill="#a8e6a3" fontSize="14" fontWeight="600">PRECOMPILE</text>
    <text x="330" y="140" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="11">Static call to 0x99</text>
    <text x="330" y="158" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="11">executes the HTTP</text>
    <text x="330" y="176" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="11">request atomically</text>

    <line x1="420" y1="140" x2="470" y2="140" stroke="#7bc47f" strokeWidth="2" markerEnd="url(#hostArrow)"/>

    {/* Step 3 - Validator */}
    <rect x="480" y="80" width="160" height="120" rx="12" fill="url(#hostGrad)" stroke="#7bc47f" strokeWidth="1"/>
    <text x="560" y="115" textAnchor="middle" fill="#a8e6a3" fontSize="14" fontWeight="600">VALIDATOR</text>
    <text x="560" y="140" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="11">Signs the outbound</text>
    <text x="560" y="158" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="11">request with its</text>
    <text x="560" y="176" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="11">private key</text>

    <line x1="650" y1="140" x2="700" y2="140" stroke="#7bc47f" strokeWidth="2" markerEnd="url(#hostArrow)"/>

    {/* Step 4 - Web2 */}
    <rect x="710" y="80" width="70" height="120" rx="12" fill="url(#hostGrad)" stroke="#7bc47f" strokeWidth="1"/>
    <text x="745" y="135" textAnchor="middle" fill="#a8e6a3" fontSize="12" fontWeight="600">WEB2</text>
    <text x="745" y="155" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="10">API</text>

    {/* Labels */}
    <text x="100" y="60" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="10">ON-CHAIN</text>
    <text x="745" y="60" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="10">OFF-CHAIN</text>

    {/* Divider */}
    <line x1="680" y1="50" x2="680" y2="230" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="4,4"/>
  </svg>
);

const SecurityLayersSVG = () => (
  <svg viewBox="0 0 800 300" style={{ width: '100%', height: 'auto' }}>
    <defs>
      <linearGradient id="layer1" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#7bc47f" stopOpacity="0.15"/>
        <stop offset="100%" stopColor="#7bc47f" stopOpacity="0.05"/>
      </linearGradient>
      <linearGradient id="layer2" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#4ade80" stopOpacity="0.15"/>
        <stop offset="100%" stopColor="#4ade80" stopOpacity="0.05"/>
      </linearGradient>
      <linearGradient id="layer3" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#a8e6a3" stopOpacity="0.15"/>
        <stop offset="100%" stopColor="#a8e6a3" stopOpacity="0.05"/>
      </linearGradient>
    </defs>

    {/* Layer 1 - outermost */}
    <rect x="40" y="20" width="720" height="260" rx="16" fill="url(#layer1)" stroke="#7bc47f" strokeWidth="1" strokeOpacity="0.4"/>
    <text x="80" y="50" fill="#7bc47f" fontSize="13" fontWeight="600">LAYER 1: VALIDATOR NODE</text>
    <text x="80" y="68" fill="rgba(255,255,255,0.4)" fontSize="10">Infrastructure operators register on-chain, identified by unique addresses</text>

    {/* Layer 2 */}
    <rect x="80" y="85" width="640" height="180" rx="12" fill="url(#layer2)" stroke="#4ade80" strokeWidth="1" strokeOpacity="0.4"/>
    <text x="120" y="112" fill="#4ade80" fontSize="13" fontWeight="600">LAYER 2: DEVELOPER</text>
    <text x="120" y="130" fill="rgba(255,255,255,0.4)" fontSize="10">EOAs vetted by validators, must request and receive explicit approval</text>

    {/* Layer 3 - innermost */}
    <rect x="120" y="148" width="560" height="100" rx="10" fill="url(#layer3)" stroke="#a8e6a3" strokeWidth="1" strokeOpacity="0.4"/>
    <text x="160" y="175" fill="#a8e6a3" fontSize="13" fontWeight="600">LAYER 3: SMART CONTRACT</text>
    <text x="160" y="193" fill="rgba(255,255,255,0.4)" fontSize="10">Only whitelisted contracts registered by approved developers</text>
    <text x="160" y="211" fill="rgba(255,255,255,0.4)" fontSize="10">can trigger HOST requests</text>

    {/* Lock icon in center */}
    <rect x="560" y="168" width="60" height="50" rx="6" fill="none" stroke="#a8e6a3" strokeWidth="1.5" strokeOpacity="0.5"/>
    <path d="M575,168 L575,155 A15,15 0 0 1 605,155 L605,168" fill="none" stroke="#a8e6a3" strokeWidth="1.5" strokeOpacity="0.5"/>
    <circle cx="590" cy="193" r="4" fill="#a8e6a3" fillOpacity="0.5"/>
  </svg>
);

const EncryptionSVG = () => (
  <svg viewBox="0 0 600 180" style={{ width: '100%', height: 'auto' }}>
    <defs>
      <linearGradient id="encGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#7bc47f" stopOpacity="0.15"/>
        <stop offset="100%" stopColor="#a8e6a3" stopOpacity="0.15"/>
      </linearGradient>
    </defs>

    {/* Ciphertext format blocks */}
    <rect x="20" y="60" width="40" height="60" rx="4" fill="#7bc47f" fillOpacity="0.3" stroke="#7bc47f" strokeWidth="1"/>
    <text x="40" y="95" textAnchor="middle" fill="#7bc47f" fontSize="16" fontWeight="700">|</text>
    <text x="40" y="140" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="8">PREFIX</text>

    <rect x="70" y="60" width="140" height="60" rx="4" fill="url(#encGrad)" stroke="#7bc47f" strokeWidth="1" strokeOpacity="0.5"/>
    <text x="140" y="88" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="10">Ephemeral PubKey</text>
    <text x="140" y="104" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="9">65 bytes</text>
    <text x="140" y="140" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="8">ECDH secp256k1</text>

    <rect x="220" y="60" width="80" height="60" rx="4" fill="url(#encGrad)" stroke="#7bc47f" strokeWidth="1" strokeOpacity="0.5"/>
    <text x="260" y="88" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="10">Nonce</text>
    <text x="260" y="104" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="9">12 bytes</text>

    <rect x="310" y="60" width="160" height="60" rx="4" fill="url(#encGrad)" stroke="#7bc47f" strokeWidth="1" strokeOpacity="0.5"/>
    <text x="390" y="88" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="10">Ciphertext</text>
    <text x="390" y="104" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="9">variable length</text>
    <text x="390" y="140" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="8">AES-256-GCM</text>

    <rect x="480" y="60" width="100" height="60" rx="4" fill="url(#encGrad)" stroke="#7bc47f" strokeWidth="1" strokeOpacity="0.5"/>
    <text x="530" y="88" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="10">Auth Tag</text>
    <text x="530" y="104" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="9">16 bytes</text>

    <text x="300" y="30" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="12" fontWeight="600">CIPHERTEXT FORMAT</text>
  </svg>
);

export default function HostPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="section-padding bg-dark-custom" style={{ paddingTop: '140px' }}>
          <div className="container">
            <div className="text-center mb-5">
              <h1 className="display-4 fw-bold mb-3">
                <span className="text-gradient">HOST</span> Protocol
              </h1>
              <p className="lead text-muted-custom" style={{ maxWidth: '800px', margin: '0 auto', fontSize: '1.4rem' }}>
                Webhooks for Web3. The first protocol-level outbound trigger in any EVM chain.
                Smart contracts that speak to the outside world — with cryptographic proof.
              </p>
              <p className="text-white-50 mt-3">HTTP Outbound Service Trigger</p>
            </div>
            <div className="card-dark p-4">
              <HostWorkflowSVG />
            </div>
          </div>
        </section>

        {/* The Problem */}
        <section className="section-padding bg-dark-alt">
          <div className="container">
            <div className="row mb-5">
              <div className="col-lg-6 mb-4 mb-lg-0">
                <h2 className="h3 text-green mb-4">The One-Way Street</h2>
                <p className="text-muted-custom mb-3">
                  Web3 has operated as a one-way street. Data enters from Web2, contracts
                  execute, but nothing exits. Traditional Web2 services rely on webhooks —
                  Stripe, Shopify, Slack, GitHub all use them. But blockchain developers
                  are stuck with event logs that require indexing and polling.
                </p>
                <p className="text-muted-custom mb-3">
                  Smart contracts are isolated by design. They can receive transactions and
                  emit logs, but they cannot reach out. They can&apos;t call an API. They can&apos;t
                  send a webhook. They can&apos;t even ping a server.
                </p>
                <p className="text-muted-custom">
                  For enterprise adoption, this is a dealbreaker. Businesses need provable
                  chains of custody — auditable proof that an on-chain event triggered a
                  real-world action. Not event logs. Not polling middleware. Proof.
                </p>
              </div>
              <div className="col-lg-6">
                <h2 className="h3 text-green mb-4">The Solution</h2>
                <p className="text-muted-custom mb-3">
                  HOST enables smart contracts to execute HTTP webhooks during transaction
                  execution. Contracts can &quot;speak back&quot; to Web2 systems synchronously,
                  eliminating the need for external indexing or polling middleware.
                </p>
                <p className="text-muted-custom mb-3">
                  Every outbound request is signed by the validator that processed the
                  transaction. This creates a cryptographic chain of custody — immutable,
                  validator-attested proof that a specific on-chain event triggered a
                  specific off-chain action.
                </p>
                <p className="text-muted-custom">
                  This isn&apos;t a workaround or a middleware layer. HOST is a native precompile
                  at address <code className="text-green">0x...0099</code>, built directly into
                  the VTRU blockchain&apos;s execution layer.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Three-Layer Security */}
        <section className="section-padding bg-dark-custom">
          <div className="container">
            <h2 className="display-6 fw-bold text-center mb-3">Three-Layer Security Model</h2>
            <p className="text-muted-custom text-center mb-5" style={{ maxWidth: '700px', margin: '0 auto' }}>
              Not just anyone can trigger an outbound request. HOST enforces a strict
              permission hierarchy at every level.
            </p>

            <div className="card-dark p-4 mb-5">
              <SecurityLayersSVG />
            </div>

            <div className="row g-4">
              <div className="col-lg-4">
                <div className="card-dark p-4 h-100">
                  <h3 className="h5 text-green mb-3">Layer 1: Validator Node</h3>
                  <p className="text-muted-custom mb-0">
                    Infrastructure operators register on-chain, identified by unique addresses
                    with associated owner addresses managing approvals. Validators call
                    <code className="text-green ms-1">registerValidator(owner)</code> to map
                    their node address to an owner address.
                  </p>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="card-dark p-4 h-100">
                  <h3 className="h5 text-green mb-3">Layer 2: Developer</h3>
                  <p className="text-muted-custom mb-0">
                    EOAs vetted by validators must request and receive explicit approval
                    before accessing validator services. Developers call
                    <code className="text-green ms-1">requestAccess(validatorNodeAddress)</code>,
                    creating accountability and an audit trail.
                  </p>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="card-dark p-4 h-100">
                  <h3 className="h5 text-green mb-3">Layer 3: Smart Contract</h3>
                  <p className="text-muted-custom mb-0">
                    Only whitelisted contracts registered by approved developers can trigger
                    HOST requests. Developers call
                    <code className="text-green ms-1">registerContract(validator, contract)</code>,
                    enabling fine-grained control over which code can reach the outside world.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="section-padding bg-dark-alt">
          <div className="container">
            <h2 className="display-6 fw-bold text-center mb-3">How It Works</h2>
            <p className="text-muted-custom text-center mb-5" style={{ maxWidth: '700px', margin: '0 auto' }}>
              A two-step atomic process: registration via the registry contract,
              then execution via static call to the HOST precompile.
            </p>

            <div className="row g-4 mb-5">
              {[
                {
                  step: '01',
                  title: 'Validator Onboarding',
                  desc: 'Validator calls registerValidator(owner), mapping its node address to an owner address that manages approvals.',
                },
                {
                  step: '02',
                  title: 'Developer Access',
                  desc: 'Developer calls requestAccess(validatorNodeAddress) to request permission. Validator owner approves or denies.',
                },
                {
                  step: '03',
                  title: 'Contract Whitelisting',
                  desc: 'Approved developer calls registerContract(validatorNodeAddress, contractAddress) to whitelist their contract.',
                },
                {
                  step: '04',
                  title: 'Request Execution',
                  desc: 'Contract calls addRequest(url, payload, headers, nodes) on the registry, then makes a static call to the HOST precompile at 0x99.',
                },
              ].map((phase) => (
                <div key={phase.step} className="col-lg-3 col-md-6">
                  <div className="card-dark p-4 h-100">
                    <div className="h2 text-green mb-2" style={{ opacity: 0.5 }}>{phase.step}</div>
                    <h3 className="h5 text-white mb-3">{phase.title}</h3>
                    <p className="text-muted-custom small mb-0">{phase.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Encryption */}
        <section className="section-padding bg-dark-custom">
          <div className="container">
            <h2 className="display-6 fw-bold text-center mb-3">End-to-End Encryption</h2>
            <p className="text-muted-custom text-center mb-5" style={{ maxWidth: '700px', margin: '0 auto' }}>
              HOST supports encrypted sensitive data using ECDH key agreement combined with
              AES-256-GCM symmetric encryption on the secp256k1 curve.
            </p>

            <div className="card-dark p-4 mb-5">
              <EncryptionSVG />
            </div>

            <div className="row g-4">
              <div className="col-lg-6">
                <div className="card-dark p-4 h-100">
                  <h3 className="h5 text-green mb-3">How It Works</h3>
                  <p className="text-muted-custom mb-3">
                    Encrypted values are prefixed with <code className="text-green">|</code> and
                    are opaque on-chain — visible to everyone but decryptable only by the
                    designated validator&apos;s private key.
                  </p>
                  <p className="text-muted-custom mb-0">
                    The sender generates an ephemeral keypair, performs ECDH with the validator&apos;s
                    public key to derive a shared secret, then encrypts with AES-256-GCM. The
                    validator reverses the process using its private key.
                  </p>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="card-accent p-4 h-100">
                  <h3 className="h5 mb-3">Technical Details</h3>
                  <div className="d-flex flex-column gap-2">
                    <div className="p-2 rounded" style={{ background: 'rgba(0,0,0,0.2)' }}>
                      <span className="small text-white">Curve:</span>
                      <span className="small text-muted-custom ms-2">secp256k1</span>
                    </div>
                    <div className="p-2 rounded" style={{ background: 'rgba(0,0,0,0.2)' }}>
                      <span className="small text-white">Key Agreement:</span>
                      <span className="small text-muted-custom ms-2">ECDH (Elliptic Curve Diffie-Hellman)</span>
                    </div>
                    <div className="p-2 rounded" style={{ background: 'rgba(0,0,0,0.2)' }}>
                      <span className="small text-white">Symmetric Cipher:</span>
                      <span className="small text-muted-custom ms-2">AES-256-GCM</span>
                    </div>
                    <div className="p-2 rounded" style={{ background: 'rgba(0,0,0,0.2)' }}>
                      <span className="small text-white">Precompile Address:</span>
                      <span className="small text-muted-custom ms-2"><code className="text-green">0x0000...0099</code></span>
                    </div>
                    <div className="p-2 rounded" style={{ background: 'rgba(0,0,0,0.2)' }}>
                      <span className="small text-white">Registry:</span>
                      <span className="small text-muted-custom ms-2"><code className="text-green">0xbdc8...5FA7</code></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="section-padding bg-dark-alt">
          <div className="container">
            <h2 className="display-6 fw-bold text-center mb-3">What HOST Enables</h2>
            <p className="text-muted-custom text-center mb-5" style={{ maxWidth: '700px', margin: '0 auto' }}>
              When smart contracts can reach the outside world with cryptographic proof,
              entirely new categories of applications become possible.
            </p>

            <div className="row g-4">
              {[
                {
                  title: 'Autonomous Agents',
                  desc: 'Self-governing DAOs and intelligent automation systems that can interact with external services without human intervention.',
                },
                {
                  title: 'Agentic Workflows',
                  desc: 'Multi-step AI tool chains triggered by blockchain events. A single transaction can kick off an entire automated pipeline.',
                },
                {
                  title: 'Event-Driven AI',
                  desc: 'On-chain events triggering ML model analysis pipelines. Smart contracts that can call AI services and act on results.',
                },
                {
                  title: 'Generative Content',
                  desc: 'NFT mints spawning AI-driven creative workflows. Token transfers triggering content generation with provable origin.',
                },
                {
                  title: 'AI-Powered DeFi',
                  desc: 'Liquidation predictions, portfolio optimization signals, and risk assessment — all triggered natively from contract execution.',
                },
                {
                  title: 'Enterprise Automation',
                  desc: 'Supply chain notifications, autonomous customer service, invoice generation — blockchain events driving real business processes.',
                },
              ].map((uc) => (
                <div key={uc.title} className="col-lg-4 col-md-6">
                  <div className="card-dark p-4 h-100">
                    <h3 className="h5 text-green mb-3">{uc.title}</h3>
                    <p className="text-muted-custom small mb-0">{uc.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding bg-dark-custom">
          <div className="container text-center">
            <h2 className="h3 fw-bold mb-3">Build with HOST</h2>
            <p className="text-muted-custom mb-4" style={{ maxWidth: '500px', margin: '0 auto' }}>
              Interested in building on the HOST protocol or becoming a validator?
            </p>
            <a href="mailto:info@verticalfoundation.net" className="btn btn-outline-light btn-lg px-5">
              Contact Us
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
