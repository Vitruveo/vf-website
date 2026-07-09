'use client';

import { useEffect } from 'react';

// The join page merged into /validators. Static export can't do server
// redirects, so this stub redirects in the browser for old links.
export default function JoinRedirect() {
  useEffect(() => {
    window.location.replace('/validators/');
  }, []);

  return (
    <main className="bg-dark-custom d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <p className="text-white-50">
        This page has moved to <a href="/validators/">/validators</a>.
      </p>
    </main>
  );
}
