'use client';

import { useState } from 'react';

type Ethereum = { request: (args: { method: string; params?: unknown[] }) => Promise<unknown> };

const VITRUVEO_CHAIN = {
  chainId: '0x5d2', // 1490
  chainName: 'Vitruveo',
  nativeCurrency: { name: 'VTRU', symbol: 'VTRU', decimals: 18 },
  rpcUrls: ['https://rpc.vitruveo.ai'],
  blockExplorerUrls: ['https://explorer.vitruveo.ai'],
};

// Slim bar fixed at the very top of every page: one click adds Vitruveo to MetaMask.
export default function MetaMaskBar() {
  const [status, setStatus] = useState<'idle' | 'added' | 'failed'>('idle');

  const addNetwork = async () => {
    const ethereum = (window as unknown as { ethereum?: Ethereum }).ethereum;
    if (!ethereum) {
      window.open('https://metamask.io/download/', '_blank', 'noopener,noreferrer');
      return;
    }
    try {
      await ethereum.request({ method: 'wallet_addEthereumChain', params: [VITRUVEO_CHAIN] });
      setStatus('added');
    } catch {
      setStatus('failed');
    }
  };

  return (
    <button type="button" className="vf-metamask-bar" onClick={addNetwork}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/assets/metamask-fox.svg" alt="" width={16} height={16} />
      {status === 'added' ? (
        <span>Vitruveo added to MetaMask</span>
      ) : status === 'failed' ? (
        <span>Could not add Vitruveo. Click to try again</span>
      ) : (
        <span>
          Click to add <strong>Vitruveo</strong> to MetaMask
        </span>
      )}
    </button>
  );
}
