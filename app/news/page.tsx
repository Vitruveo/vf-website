import type { Metadata } from "next";
import Image from 'next/image';
import Header from '../components/Header';
import Footer from '../components/Footer';

export const metadata: Metadata = {
  title: "News | Vertical Foundation",
  description: "Announcements and updates from Vertical Foundation, the governing body of the Vitruveo blockchain.",
};

type Item = { text: string; href?: string };

const announcements = [
  {
    date: 'July 1, 2026',
    title: 'Vertical Foundation Established to Steward Vitruveo',
    image: '/kintsugi.avif',
    caption: '“Timeless Magic,” 2023. Taisho era (1912–1926) black Raku ware, urushi lacquer, 24K gold, and resin. Photo by Naoko Fukumaru.',
    body: [
      'There’s a Japanese technique for repairing broken pottery called Kintsugi. It involves gluing the broken pieces with gold. As a philosophy, it treats breakage and repair as part of the history of an object, rather than something to disguise. Oftentimes, the repaired result is better than the original.',
      'This is where we are with Vitruveo. Vertical Foundation has worked through a new strategy, embracing mistakes of the past and developing a strong vision for the future.',
      'Vertical Foundation has been established as the governing body of the Vitruveo blockchain, founded by phantom, ctitch, and techbubble, who together form its founding leadership team. The Foundation intends to formally incorporate, laying the groundwork for transparent, long-term stewardship of the protocol and the ecosystem built around it.',
      'As one of its first initiatives, Vertical Foundation is set to acquire Yieldable, a decentralized finance project operating on BNB Smart Chain. The acquisition brings Yieldable’s assets, intellectual property, smart contracts, and brand under the Foundation’s ownership. Yieldable will continue operating as an ongoing project within the Vertical Foundation ecosystem, with phantom and ctitch continuing to lead its development.',
      'In consideration for the transfer, Yieldable receives an agreed-upon allocation of VTRU, along with three Vitruveo validator nodes and the full rights and rewards that come with operating them. The move expands the Foundation’s reach into DeFi and deepens Vitruveo’s presence on BNB Smart Chain.',
    ],
    achievements: [
      {
        category: 'General',
        items: [
          { text: 'Developed a six-pillar governance strategy: VTRU, Pretrend, VIBE, Scope, Protocol, and Validators' },
          { text: 'Developed brand identity for Vertical Foundation' },
        ] as Item[],
      },
      {
        category: 'Protocol',
        items: [
          { text: 'Upgraded the protocol to the Shanghai build' },
          { text: 'Deprecated the rebasing feature from the protocol' },
          { text: 'Recreated Vitruveo’s tokenomics with a fixed supply of 500 million VTRU' },
          { text: 'Developed and integrated numerous protocol smart contracts', href: 'https://www.vitruveo.ai/developers' },
          { text: 'Developed and deployed the HOST protocol', href: 'https://www.vitruveo.ai/developers' },
          { text: 'Added built-in support for Pretrend statistical functions in the protocol' },
        ] as Item[],
      },
      {
        category: 'Ecosystem',
        items: [
          { text: 'Deprecated all other projects to focus on one: Pretrend', href: '/pretrend' },
          { text: 'Developed a migration strategy for VTRO, VERSE, and Vortex tokens to Pretrend' },
          { text: 'Created a new Discord community server' },
          { text: 'Set up multi-sig wallets with 3-of-3 signers for all important wallets' },
          { text: 'Established long-term token locks allocated to specific purposes' },
          { text: 'Secured $25,000 in AWS credits to fund infrastructure through the pre-revenue stage' },
        ] as Item[],
      },
      {
        category: 'VTRU',
        items: [
          { text: 'Focused on a single coin — VTRU — as the flagship cryptocurrency of the ecosystem' },
          { text: 'Launched the VTRU Bridge to BNB Smart Chain and back' },
          { text: 'Committed to adding DEX liquidity and burning the LP tokens' },
          { text: 'Committed to funding VIBE with periodic treasury grants on top of revenue share' },
          { text: 'Developed a comprehensive strategy to manage VTRU’s growth' },
        ] as Item[],
      },
      {
        category: 'Applications',
        items: [
          { text: 'Added multi-sig wallet capabilities to Scope', href: 'https://scope.vitruveo.ai' },
          { text: 'Published revised tokenomics on Scope' },
          { text: 'Developed Legacy, an application for eligible token holders and validators' },
          { text: 'Published the HOST protocol whitepaper', href: 'https://kalyani.com/' },
          { text: 'Published the Pretrend whitepaper', href: 'https://www.pretrend.ai/' },
          { text: 'Developed the architecture for Pretrend', href: '/pretrend' },
        ] as Item[],
      },
      {
        category: 'Validators',
        items: [
          { text: 'Redesigned the Validators program, reducing the set from 380 to 100' },
          { text: 'Developed a rewards program for all validators' },
          { text: 'Built a simple, low-cost path to onboard 100 validators, rewarding early commitment' },
          { text: 'Reduced the protocol footprint so validators can run on an AWS t3.small' },
          { text: 'Created a five-year reimbursement program — 1 VTRU per block mined' },
        ] as Item[],
      },
    ],
  },
];

const Check = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 me-3 mt-1">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

function AchievementLink({ href }: { href: string }) {
  const external = href.startsWith('http');
  return (
    <a
      href={href}
      className="text-green ms-1 text-decoration-none"
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      aria-label="Learn more"
    >
      {external ? '↗' : '→'}
    </a>
  );
}

export default function NewsPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="section-padding bg-dark-custom" style={{ paddingTop: '140px' }}>
          <div className="container text-center">
            <h1 className="display-4 fw-bold mb-3">
              <span className="text-gradient">News</span>
            </h1>
            <p className="lead text-muted-custom mb-0" style={{ maxWidth: '640px', margin: '0 auto' }}>
              Announcements and updates from Vertical Foundation.
            </p>
          </div>
        </section>

        {/* Announcements */}
        <section className="section-padding bg-dark-alt">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-9">
                {announcements.map((a) => (
                  <article key={a.title} className="card-dark p-4 p-lg-5 mb-4">
                    <div className="small text-green fw-semibold mb-2" style={{ letterSpacing: '0.06em' }}>
                      {a.date}
                    </div>
                    <h2 className="h3 fw-bold mb-4">{a.title}</h2>
                    {a.image && (
                      <figure className="mb-4">
                        <Image
                          src={a.image}
                          alt="Kintsugi — pottery repaired with gold"
                          width={1200}
                          height={600}
                          className="w-100 rounded"
                          style={{ height: 'auto' }}
                        />
                        {a.caption && (
                          <figcaption className="text-white-50 small mt-2 fst-italic">{a.caption}</figcaption>
                        )}
                      </figure>
                    )}
                    {a.body.map((p, i) => (
                      <p key={i} className="text-muted-custom mb-3">{p}</p>
                    ))}

                    {a.achievements && (
                      <div className="mt-5 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                        <h3 className="h4 fw-bold mb-4 text-center">What Vertical Foundation Has Achieved So Far</h3>
                        <div className="achievement-columns">
                          {a.achievements.map((cat) => (
                            <div key={cat.category} className="mb-4">
                              <h4 className="h6 text-green fw-semibold mb-3" style={{ letterSpacing: '0.06em' }}>
                                {cat.category.toUpperCase()}
                              </h4>
                              <ul className="list-unstyled mb-0">
                                {cat.items.map((item, i) => (
                                  <li key={i} className="d-flex mb-3">
                                    <Check />
                                    <span className="text-muted-custom small">
                                      {item.text}
                                      {item.href && <AchievementLink href={item.href} />}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                              {cat.category === 'General' && (
                                <div className="text-center py-3">
                                  <Image
                                    src="/assets/vertical-foundation-logo.png"
                                    alt="Vertical Foundation"
                                    width={280}
                                    height={70}
                                    style={{ height: 'auto', width: '80%', maxWidth: '280px', opacity: 0.9 }}
                                  />
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
