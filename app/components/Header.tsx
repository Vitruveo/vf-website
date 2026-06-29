'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';

// Wallet connect button is only loaded/rendered on the validator app page.
const ConnectWallet = dynamic(() => import('../web3/ConnectWallet'), { ssr: false });

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  // trailingSlash: true → usePathname() returns "/validators/join/"
  const showConnect = pathname?.replace(/\/+$/, '') === '/validators/join';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`navbar navbar-expand-md navbar-dark fixed-top ${
        scrolled || menuOpen ? 'bg-black' : 'bg-transparent'
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
          className={`navbar-toggler ${menuOpen ? '' : 'collapsed'}`}
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`navbar-collapse justify-content-end ${menuOpen ? 'show' : 'collapse'}`} id="navbarNav">
          <ul className="navbar-nav gap-md-4" onClick={() => setMenuOpen(false)}>
            <li className="nav-item">
              <a className="nav-link" href="/">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/pretrend">Pretrend</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/validators">Validators</a>
            </li>
          </ul>
          {showConnect && (
            <div className="ms-md-4 mt-3 mt-md-0">
              <ConnectWallet />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
