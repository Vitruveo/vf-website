import type { Metadata } from "next";
import Header from '../components/Header';
import Footer from '../components/Footer';

export const metadata: Metadata = {
  title: "Pretrend Protocol | Vertical Foundation",
  description: "Pretrend is a trend-based oracle protocol enabling prediction markets to resolve based on directional movement rather than binary outcomes. Native on-chain statistical computation on the VTRU blockchain.",
};

const TrendLineSVG = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', height: 'auto' }}>
    <defs>
      <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#7bc47f" stopOpacity="0.3"/>
        <stop offset="100%" stopColor="#7bc47f" stopOpacity="0"/>
      </linearGradient>
    </defs>
    {/* Grid lines */}
    {[40, 80, 120, 160].map(y => (
      <line key={y} x1="60" y1={y} x2="760" y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
    ))}
    {/* Noisy data points */}
    <polyline
      points="80,140 120,135 160,125 200,130 240,110 280,115 320,95 360,100 400,85 440,90 480,70 520,75 540,65 580,72 620,55 660,60 700,45 740,50"
      fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5"/>
    {/* Data dots */}
    {[[80,140],[120,135],[160,125],[200,130],[240,110],[280,115],[320,95],[360,100],[400,85],[440,90],[480,70],[520,75],[540,65],[580,72],[620,55],[660,60],[700,45],[740,50]].map(([x,y], i) => (
      <circle key={i} cx={x} cy={y} r="3" fill="rgba(255,255,255,0.3)"/>
    ))}
    {/* OLS trend line */}
    <line x1="80" y1="145" x2="740" y2="42" stroke="#7bc47f" strokeWidth="2.5" strokeDasharray="8,4"/>
    {/* Trend fill area */}
    <polygon points="80,145 740,42 740,200 80,200" fill="url(#trendFill)"/>
    {/* Labels */}
    <text x="400" y="25" textAnchor="middle" fill="#7bc47f" fontSize="13" fontWeight="600">OLS REGRESSION: +5.8% SLOPE</text>
    <text x="60" y="185" fill="rgba(255,255,255,0.3)" fontSize="10">t₀</text>
    <text x="740" y="185" fill="rgba(255,255,255,0.3)" fontSize="10">t₁</text>
  </svg>
);

const BucketDistributionSVG = () => (
  <svg viewBox="0 0 800 220" style={{ width: '100%', height: 'auto' }}>
    {/* Bucket bars */}
    {[
      { x: 80, label: 'CRASH', color: '#ef4444', height: 60, pct: '< -8.2%' },
      { x: 220, label: 'BEAR', color: '#f97316', height: 90, pct: '-8.2% to -2.1%' },
      { x: 360, label: 'FLAT', color: '#a3a3a3', height: 120, pct: '-2.1% to +2.3%' },
      { x: 500, label: 'BULL', color: '#4ade80', height: 100, pct: '+2.3% to +9.1%' },
      { x: 640, label: 'MOON', color: '#7bc47f', height: 50, pct: '> +9.1%' },
    ].map((b) => (
      <g key={b.label}>
        <rect x={b.x} y={180 - b.height} width="80" height={b.height} rx="4"
              fill={b.color} opacity="0.25" stroke={b.color} strokeWidth="1"/>
        <rect x={b.x} y={180 - b.height} width="80" height="4" rx="2" fill={b.color}/>
        <text x={b.x + 40} y={195} textAnchor="middle" fill={b.color} fontSize="12" fontWeight="600">{b.label}</text>
        <text x={b.x + 40} y={210} textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="9">{b.pct}</text>
        {/* Unit count inside bar */}
        <text x={b.x + 40} y={180 - b.height + 20} textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="10">
          {b.height * 10} units
        </text>
      </g>
    ))}
    {/* Title */}
    <text x="400" y="25" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="13" fontWeight="600">OUTCOME BUCKET DISTRIBUTION</text>
    {/* Winning indicator */}
    <text x="540" y="60" textAnchor="middle" fill="#4ade80" fontSize="11" fontWeight="600">WINNER</text>
    <polygon points="540,65 535,72 545,72" fill="#4ade80"/>
  </svg>
);

const BondingCurveSVG = () => (
  <svg viewBox="0 0 400 250" style={{ width: '100%', height: 'auto' }}>
    <defs>
      <linearGradient id="curveFill" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#7bc47f" stopOpacity="0.2"/>
        <stop offset="100%" stopColor="#7bc47f" stopOpacity="0"/>
      </linearGradient>
    </defs>
    {/* Grid */}
    {[60, 100, 140, 180].map(y => (
      <line key={y} x1="50" y1={y} x2="370" y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
    ))}
    {/* Curve */}
    <path d="M50,210 Q100,205 130,195 Q180,175 220,150 Q270,115 310,75 Q340,45 370,25"
          fill="none" stroke="#7bc47f" strokeWidth="2.5"/>
    <path d="M50,210 Q100,205 130,195 Q180,175 220,150 Q270,115 310,75 Q340,45 370,25 L370,220 L50,220 Z"
          fill="url(#curveFill)"/>
    {/* Buyer markers */}
    <circle cx="90" cy="208" r="5" fill="#4ade80"/>
    <text x="90" y="230" textAnchor="middle" fill="#4ade80" fontSize="9">$0.20</text>
    <circle cx="180" cy="175" r="5" fill="#fbbf24"/>
    <text x="180" y="230" textAnchor="middle" fill="#fbbf24" fontSize="9">$0.40</text>
    <circle cx="250" cy="135" r="5" fill="#f97316"/>
    <text x="250" y="230" textAnchor="middle" fill="#f97316" fontSize="9">$0.58</text>
    {/* Axes */}
    <text x="20" y="135" fill="rgba(255,255,255,0.4)" fontSize="9" transform="rotate(-90,20,135)">PRICE</text>
    <text x="210" y="248" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="9">UNITS PURCHASED</text>
  </svg>
);

export default function PretrendPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="section-padding bg-dark-custom" style={{ paddingTop: '140px' }}>
          <div className="container">
            <div className="text-center mb-5">
              <h1 className="display-4 fw-bold mb-3">
                <span className="text-gradient">Pretrend</span> Protocol
              </h1>
              <p className="lead text-muted-custom" style={{ maxWidth: '800px', margin: '0 auto', fontSize: '1.4rem' }}>
                Continuous trend resolution for prediction markets. Users predict the
                magnitude and direction of change — not just whether an event occurs.
              </p>
              <p className="text-white-50 mt-3">Version 2.0</p>
            </div>
            {/* Hero visualization */}
            <div className="card-dark p-4">
              <TrendLineSVG />
            </div>
          </div>
        </section>

        {/* Problem & Solution */}
        <section className="section-padding bg-dark-alt">
          <div className="container">
            <div className="row mb-5">
              <div className="col-lg-6 mb-4 mb-lg-0">
                <h2 className="h3 text-green mb-4">The Problem with Binary Markets</h2>
                <p className="text-muted-custom mb-3">
                  Current prediction markets force complex, continuous phenomena into binary
                  outcomes. A market asking whether Bitcoin will reach $100,000 by a certain date
                  loses all nuance about price movement.
                </p>
                <p className="text-muted-custom mb-3">
                  If Bitcoin rises from $60,000 to $99,000, participants who bet on growth receive
                  nothing — despite being directionally correct. Markets can&apos;t capture the magnitude
                  of movement, only whether a threshold was crossed.
                </p>
                <p className="text-muted-custom">
                  Setting thresholds is arbitrary and can make markets unbalanced from inception.
                  Near-miss outcomes feel punitive to participants who correctly predicted direction
                  but not exact magnitude.
                </p>
              </div>
              <div className="col-lg-6">
                <h2 className="h3 text-green mb-4">The Trend Alternative</h2>
                <p className="text-muted-custom mb-3">
                  Real-world data moves continuously. Prices drift, metrics fluctuate, engagement
                  rises and falls. A prediction system that captures directional movement and
                  magnitude provides richer market dynamics and fairer outcomes.
                </p>
                <p className="text-muted-custom mb-3">
                  Pretrend computes the trend slope over a defined time period using linear
                  regression. The result is a percentage change that maps to one of five outcome
                  buckets, each representing a range of possible movements calibrated to the
                  specific data source.
                </p>
                <p className="text-muted-custom">
                  Users purchase units in one of five buckets — from significant decline to significant
                  growth. Earlier buyers receive more units per dollar through a bonding curve,
                  guaranteeing better returns for early conviction.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Five Outcome Buckets */}
        <section className="section-padding bg-dark-custom">
          <div className="container">
            <h2 className="display-6 fw-bold text-center mb-5">Five Outcome Buckets</h2>
            <p className="text-muted-custom text-center mb-5" style={{ maxWidth: '600px', margin: '0 auto' }}>
              Every market has exactly five buckets representing ranges of trend movement,
              calibrated to each data source&apos;s historical volatility.
            </p>
            <div className="row g-3 mb-5">
              {[
                { name: 'Crash', desc: 'Significant decline', range: 'Below 20th percentile', color: '#ef4444' },
                { name: 'Bear', desc: 'Moderate decline', range: '20th to 40th percentile', color: '#f97316' },
                { name: 'Flat', desc: 'Minimal change', range: '40th to 60th percentile', color: '#a3a3a3' },
                { name: 'Bull', desc: 'Moderate growth', range: '60th to 80th percentile', color: '#4ade80' },
                { name: 'Moon', desc: 'Significant growth', range: 'Above 80th percentile', color: '#7bc47f' },
              ].map((bucket) => (
                <div key={bucket.name} className="col">
                  <div className="card-dark p-3 h-100 text-center">
                    <div className="h5 mb-1" style={{ color: bucket.color }}>{bucket.name}</div>
                    <div className="small text-white mb-1">{bucket.desc}</div>
                    <div className="small text-white-50">{bucket.range}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="card-dark p-4">
              <BucketDistributionSVG />
            </div>
          </div>
        </section>

        {/* System Architecture */}
        <section className="section-padding bg-dark-alt">
          <div className="container">
            <h2 className="display-6 fw-bold text-center mb-3">System Architecture</h2>
            <p className="text-muted-custom text-center mb-5" style={{ maxWidth: '700px', margin: '0 auto' }}>
              Three primary components working together: the VTRU Oracle, the Notary Service,
              and the Marketplace Layer.
            </p>

            <div className="row g-4 mb-5">
              {[
                {
                  title: 'Oracle Contract',
                  location: 'VTRU Blockchain',
                  desc: 'Stores market state, bucket thresholds, trend results, and fee accounting. Does not compute trends directly — stores results submitted by the authorized Notary.',
                },
                {
                  title: 'Trend Precompile',
                  location: 'VTRU Blockchain (native)',
                  desc: 'Computes OLS regression, R-squared, volatility, and bucket quintiles at compiled machine-code speed. What would be impossible in Solidity executes in microseconds.',
                },
                {
                  title: 'Notary Service',
                  location: 'Off-chain',
                  desc: 'Fetches external data, signs results, submits to Oracle. Batches updates for markets sharing the same data source. Sole authorized writer to the Oracle contract.',
                },
                {
                  title: 'Marketplace Contract',
                  location: 'BSC (or other EVM chains)',
                  desc: 'Handles unit purchases, pot tracking, and winner payouts. Deployed on external chains for accessibility and liquidity.',
                },
                {
                  title: 'HOST Bridge',
                  location: 'VTRU to external chains',
                  desc: 'Pushes resolution data cross-chain via HTTP Outbound Service Trigger. Validator-signed payloads ensure cryptographic proof of resolution.',
                },
              ].map((component) => (
                <div key={component.title} className="col-lg-4 col-md-6">
                  <div className="card-dark p-4 h-100">
                    <h4 className="h5 text-white mb-1">{component.title}</h4>
                    <p className="small text-green mb-3">{component.location}</p>
                    <p className="text-muted-custom small mb-0">{component.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trend Precompile */}
        <section className="section-padding bg-dark-custom">
          <div className="container">
            <h2 className="display-6 fw-bold text-center mb-3">Trend Precompile</h2>
            <p className="text-muted-custom text-center mb-5" style={{ maxWidth: '700px', margin: '0 auto' }}>
              A native precompiled contract on the VTRU blockchain that performs statistical
              computation at the Geth client layer — compiled Go code, not interpreted EVM bytecode.
            </p>

            <div className="row g-4 mb-5">
              <div className="col-lg-6">
                <div className="card-dark p-4 h-100">
                  <h3 className="h5 text-green mb-3">Mode 1: Full Analysis</h3>
                  <p className="text-muted-custom mb-3">
                    Given a series of timestamp-value pairs, the precompile computes three values:
                  </p>
                  <ul className="text-muted-custom mb-3">
                    <li className="mb-2"><strong className="text-white">Slope percentage</strong> — the fitted trend change from start to end of the series</li>
                    <li className="mb-2"><strong className="text-white">R-squared</strong> — confidence in the linear fit</li>
                    <li className="mb-2"><strong className="text-white">Volatility</strong> — sample standard deviation</li>
                  </ul>
                  <div className="p-3 rounded" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <div className="small text-white-50">
                      <strong className="text-white">Input:</strong> 40 bytes per point (8-byte timestamp + 32-byte value), sorted chronologically<br/>
                      <strong className="text-white">Output:</strong> 96 bytes (3 &times; 32-byte signed integers, scaled by 10<sup>18</sup>)
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="card-dark p-4 h-100">
                  <h3 className="h5 text-green mb-3">Mode 2: Volatility Buckets</h3>
                  <p className="text-muted-custom mb-3">
                    Given historical data and a window size, the precompile computes quintile
                    thresholds for bucket boundaries:
                  </p>
                  <ul className="text-muted-custom mb-3">
                    <li className="mb-2">Calculates absolute percentage change for every rolling window</li>
                    <li className="mb-2">Sorts deltas and returns 20th, 40th, 60th, and 80th percentile values</li>
                    <li className="mb-2">These four thresholds define the five outcome buckets</li>
                  </ul>
                  <div className="p-3 rounded" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <div className="small text-white-50">
                      <strong className="text-white">Input:</strong> 8-byte window size + timestamp-value pairs<br/>
                      <strong className="text-white">Output:</strong> 128 bytes (4 &times; 32-byte unsigned integers representing quintile thresholds)
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bonding Curve Pricing */}
        <section className="section-padding bg-dark-alt">
          <div className="container">
            <h2 className="display-6 fw-bold text-center mb-3">Bonding Curve Pricing</h2>
            <p className="text-muted-custom text-center mb-5" style={{ maxWidth: '700px', margin: '0 auto' }}>
              Each bucket has its own independent price curve. Earlier buyers receive more units
              per dollar — rewarding early conviction with better returns.
            </p>

            <div className="row mb-5">
              <div className="col-lg-5 mb-4 mb-lg-0">
                <div className="card-dark p-4 h-100">
                  <BondingCurveSVG />
                </div>
              </div>
              <div className="col-lg-7">
                <div className="card-accent p-4 mb-4">
                  <h3 className="h5 mb-3">The Formula</h3>
                  <div className="p-3 rounded mb-3" style={{ background: 'rgba(0,0,0,0.3)', fontFamily: 'monospace' }}>
                    <span className="text-green">price</span> = basePrice &times; (1 + bucketUnits / k)
                  </div>
                  <p className="text-muted-custom mb-2">
                    <strong className="text-white">basePrice:</strong> $0.20 &middot;
                    <strong className="text-white"> k:</strong> 500 (price doubles after k units)
                  </p>
                </div>
                <div className="card-dark p-4">
                  <h3 className="h5 mb-3">Early Bird Advantage</h3>
                  <div className="table-responsive">
                    <table className="table table-dark table-sm mb-2" style={{ fontSize: '0.85rem' }}>
                      <thead>
                        <tr className="text-green">
                          <th>Buyer</th><th>Price</th><th>Units</th><th>Share</th><th>Return</th>
                        </tr>
                      </thead>
                      <tbody className="text-white-50">
                        <tr><td>Alice (1st)</td><td>$0.20</td><td>500</td><td>52.6%</td><td className="text-green">1.58x</td></tr>
                        <tr><td>Bob (2nd)</td><td>$0.40</td><td>250</td><td>26.3%</td><td>0.79x</td></tr>
                        <tr><td>Carol (3rd)</td><td>$0.50</td><td>200</td><td>21.1%</td><td>0.63x</td></tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="text-muted-custom small mb-0">
                    Each bucket&apos;s price is independent — activity in one bucket doesn&apos;t affect prices in another.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Data Flow */}
        <section className="section-padding bg-dark-custom">
          <div className="container">
            <h2 className="display-6 fw-bold text-center mb-3">Market Lifecycle</h2>
            <p className="text-muted-custom text-center mb-5" style={{ maxWidth: '700px', margin: '0 auto' }}>
              From creation to resolution — a complete flow across chains.
            </p>

            <div className="row g-4 mb-5">
              {[
                {
                  step: '01',
                  title: 'Create',
                  desc: 'Creator specifies data source, start time, and duration. Notary fetches historical data, computes bucket thresholds via the precompile, and initializes the market.',
                },
                {
                  step: '02',
                  title: 'Trade',
                  desc: 'Users purchase units in their chosen bucket on BSC. Bonding curve prices each purchase. The Notary updates the trend at every resolution interval (minimum 15 min).',
                },
                {
                  step: '03',
                  title: 'Resolve',
                  desc: 'When duration expires, the final trend determines the winning bucket. The Oracle pushes resolution via HOST to marketplace contracts, triggering payouts.',
                },
              ].map((phase) => (
                <div key={phase.step} className="col-lg-4">
                  <div className="card-dark p-4 h-100">
                    <div className="h2 text-green mb-2" style={{ opacity: 0.5 }}>{phase.step}</div>
                    <h3 className="h5 text-white mb-3">{phase.title}</h3>
                    <p className="text-muted-custom mb-0">{phase.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Data Sources */}
        <section className="section-padding bg-dark-alt">
          <div className="container">
            <h2 className="display-6 fw-bold text-center mb-3">Data Sources</h2>
            <p className="text-muted-custom text-center mb-5" style={{ maxWidth: '700px', margin: '0 auto' }}>
              Pretrend supports any time-series data. Each source has a provider module that handles
              fetching, authentication, and normalization.
            </p>

            <div className="row g-4 mb-5">
              {[
                { category: 'Cryptocurrency', examples: 'BTC price, ETH price, trading volume, TVL', resolution: '15 minutes', window: '30 days' },
                { category: 'Equities', examples: 'Stock prices, indices, forex rates', resolution: '15-60 minutes', window: '90 days' },
                { category: 'Social Metrics', examples: 'Follower counts, view counts, engagement rates', resolution: '1-4 hours', window: '90 days' },
                { category: 'Economic', examples: 'Inflation, unemployment, interest rates', resolution: '24 hours to weekly', window: '1 year' },
                { category: 'Elections', examples: 'Polling aggregates, approval ratings', resolution: '24 hours', window: '90 days' },
              ].map((source) => (
                <div key={source.category} className="col-lg-4 col-md-6">
                  <div className="card-dark p-4 h-100">
                    <h4 className="h5 text-green mb-2">{source.category}</h4>
                    <p className="text-muted-custom small mb-2">{source.examples}</p>
                    <div className="small text-white-50">
                      Resolution: {source.resolution} &middot; Window: {source.window}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Marketplace Variants */}
        <section className="section-padding bg-dark-alt">
          <div className="container">
            <h2 className="display-6 fw-bold text-center mb-3">Marketplace Models</h2>
            <p className="text-muted-custom text-center mb-5" style={{ maxWidth: '600px', margin: '0 auto' }}>
              Multiple deployment models for different use cases.
            </p>

            <div className="row g-4">
              <div className="col-lg-4">
                <div className="card-dark p-4 h-100">
                  <h3 className="h5 text-green mb-3">Primary Marketplace</h3>
                  <p className="text-muted-custom mb-0">
                    Operated by Pretrend with access to all data sources. Full transaction
                    fee retention. General-purpose interface for retail users.
                  </p>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="card-dark p-4 h-100">
                  <h3 className="h5 text-green mb-3">White-Label</h3>
                  <p className="text-muted-custom mb-0">
                    Third parties deploy branded marketplaces with custom domains and
                    optional source filtering. 50/50 fee split with Pretrend. No upfront licensing fee.
                  </p>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="card-dark p-4 h-100">
                  <h3 className="h5 text-green mb-3">Open-Source Starter Kit</h3>
                  <p className="text-muted-custom mb-0">
                    React component library, contract ABIs, integration examples, and
                    documentation for building custom marketplace experiences.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Security & Roadmap */}
        <section className="section-padding bg-dark-custom">
          <div className="container">
            <div className="row g-5">
              <div className="col-lg-6">
                <h2 className="h3 fw-bold mb-4">Security</h2>
                <div className="card-dark p-4">
                  <p className="text-muted-custom mb-3">
                    <strong className="text-white">Oracle Trust Model:</strong> The Notary is a trusted component.
                    All submissions are signed and on-chain, creating an auditable history. The trend
                    precompile is deterministic — anyone can verify results independently.
                  </p>
                  <p className="text-muted-custom mb-3">
                    <strong className="text-white">Data Integrity:</strong> OLS regression dampens outlier effects.
                    Resolution intervals prevent flash manipulation. Multiple data points over
                    market duration provide redundancy.
                  </p>
                  <p className="text-muted-custom mb-3">
                    <strong className="text-white">Void Protection:</strong> Markets are automatically voided if they
                    receive fewer than 80% of expected updates. Participants receive refunds minus
                    infrastructure costs already incurred.
                  </p>
                  <p className="text-muted-custom mb-0">
                    <strong className="text-white">Cross-Chain Fallback:</strong> If HOST delivery fails, marketplace
                    contracts support manual resolution submission with Oracle signature verification.
                  </p>
                </div>
              </div>
              <div className="col-lg-6">
                <h2 className="h3 fw-bold mb-4">Roadmap</h2>
                <div className="d-flex flex-column gap-3">
                  {[
                    {
                      phase: 'Phase 1',
                      title: 'Core Infrastructure',
                      items: 'Oracle + Notary on VTRU testnet, Marketplace on BSC testnet, HOST bridge, initial data sources (BTC, ETH)',
                    },
                    {
                      phase: 'Phase 2',
                      title: 'Primary Marketplace',
                      items: 'Mainnet deployment, marketplace web app, expanded data sources, security audit',
                    },
                    {
                      phase: 'Phase 3',
                      title: 'Ecosystem Expansion',
                      items: 'White-label framework, open-source starter kit, additional chains, broader data catalog',
                    },
                    {
                      phase: 'Phase 4',
                      title: 'Decentralization',
                      items: 'Decentralized notary network, staking and slashing, fraud proofs, community governance',
                    },
                  ].map((phase) => (
                    <div key={phase.phase} className="card-dark p-3">
                      <div className="d-flex align-items-center gap-2 mb-1">
                        <span className="small text-green fw-semibold">{phase.phase}</span>
                        <span className="small text-white fw-semibold">{phase.title}</span>
                      </div>
                      <p className="text-muted-custom small mb-0">{phase.items}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding bg-dark-alt">
          <div className="container text-center">
            <h2 className="h3 fw-bold mb-3">Get in Touch</h2>
            <p className="text-muted-custom mb-4" style={{ maxWidth: '500px', margin: '0 auto' }}>
              Interested in building on Pretrend or deploying a white-label marketplace?
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
