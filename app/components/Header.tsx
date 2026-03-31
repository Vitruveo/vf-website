'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`navbar navbar-expand-md navbar-dark fixed-top ${
        scrolled ? 'bg-black' : 'bg-transparent'
      }`}
      style={{ transition: 'background 0.3s' }}
    >
      <div className="container">
        <a className="navbar-brand" href="/">
          <Image
            src="/assets/vertical-foundation-logo.png"
            alt="Vertical Foundation"
            width={140}
            height={35}
            style={{ height: '32px', width: 'auto' }}
            priority
          />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="/#about">About</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/#technology">Technology</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/pretrend">Pretrend</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="mailto:info@verticalfoundation.net">Contact</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
