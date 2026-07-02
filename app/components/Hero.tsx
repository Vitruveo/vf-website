'use client';

import Image from 'next/image';

export default function Hero() {
  return (
    <section className="hero-section" style={{ minHeight: '70vh' }}>
      <div className="video-bg">
        <video autoPlay muted loop playsInline>
          <source src="/assets/VerticalFoundation.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="container text-center position-relative" style={{ zIndex: 10 }}>
        <Image
          src="/assets/vertical-foundation-logo.png"
          alt="Vertical Foundation"
          width={240}
          height={60}
          className="mb-4"
          style={{ height: 'auto', width: '240px' }}
          priority
        />
        <h1 className="display-3 fw-bold mb-3">
          <a href="https://www.vitruveo.ai" target="_blank" rel="noopener noreferrer" className="text-decoration-none">
            <span className="text-gradient">Vitruveo</span>
          </a>
          <span className="text-white"> Governance</span>
        </h1>
        <p className="display-6 text-white mb-3" style={{ maxWidth: '700px', margin: '0 auto' }}>
          The foundation governing and funding the Vitruveo ecosystem.
        </p>
        <p className="lead text-muted-custom mb-4" style={{ fontSize: '1.35rem' }}>
          An EVM-compatible L1 blockchain built for the AI era.
        </p>
        <div className="mb-4">
          <a href="/news" className="btn btn-green btn-lg px-5">
            Read Our Founding Announcement
          </a>
        </div>
        <a href="/#pillars" className="text-muted-custom text-decoration-none">
          ↓
        </a>
      </div>
    </section>
  );
}
