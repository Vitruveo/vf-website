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
          <span className="text-white">Building the Future of</span><br />
          <span className="text-gradient">On-Chain Intelligence</span>
        </h1>
        <p className="text-white mb-3" style={{ maxWidth: '800px', margin: '0 auto', fontSize: '1.5rem', lineHeight: '1.6' }}>
          Vertical Foundation creates protocols and products that bring statistical
          intelligence and AI capabilities natively to the blockchain.
        </p>
        <a href="/#about" className="text-muted-custom text-decoration-none">
          ↓
        </a>
      </div>
    </section>
  );
}
