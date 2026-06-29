'use client';

import { useState } from 'react';
import {
  useAccount,
  useReadContract,
  useReadContracts,
  useWriteContract,
  useSwitchChain,
} from 'wagmi';
import { waitForTransactionReceipt } from '@wagmi/core';
import { bsc } from 'wagmi/chains';
import { erc20Abi, formatUnits, parseUnits, type Abi } from 'viem';
import { wagmiConfig } from '../../web3/wagmi';
import contracts from '../../config/vtru-contracts.json';

const VALIDATORS = contracts.bsc.Validators as `0x${string}`;
const VALIDATORS_ABI = contracts.abi.Validators as unknown as Abi;
// BSC USDT (BSC-USD), 18 decimals — used if the contract's USDT() read is unavailable.
const USDT_FALLBACK = '0x55d398326f99059fF775485246999027B3197955' as `0x${string}`;
const USDT_DECIMALS = 18;
// New validator price is fixed at 3,000 USDT.
const NEW_PRICE = parseUnits('3000', USDT_DECIMALS);

type Kind = 'new' | 'rejoin';

// Small BNB / BSC mark to show the price is on BNB Smart Chain.
const BscMark = () => (
  <svg
    viewBox="0 0 24 24"
    role="img"
    aria-label="BNB Smart Chain"
    style={{ width: '0.72em', height: '0.72em', marginLeft: '0.3rem', verticalAlign: 'baseline' }}
  >
    <g fill="#F0B90B">
      <path d="M12 9.4 14.6 12 12 14.6 9.4 12Z" />
      <path d="M12 3.4 14.6 6 12 8.6 9.4 6Z" />
      <path d="M12 15.4 14.6 18 12 20.6 9.4 18Z" />
      <path d="M6 9.4 8.6 12 6 14.6 3.4 12Z" />
      <path d="M18 9.4 20.6 12 18 14.6 15.4 12Z" />
    </g>
  </svg>
);

export default function ActionTiles() {
  const { address, isConnected, chainId } = useAccount();
  const { switchChainAsync } = useSwitchChain();
  const { writeContractAsync } = useWriteContract();

  const [busy, setBusy] = useState<Kind | null>(null);
  const [error, setError] = useState<string | null>(null);

  const base = { address: VALIDATORS, abi: VALIDATORS_ABI, chainId: bsc.id } as const;

  const { data } = useReadContracts({
    contracts: [
      { ...base, functionName: 'legacyRejoinPrice' },
      { ...base, functionName: 'slotsRemaining' },
      { ...base, functionName: 'USDT' },
      { ...base, functionName: 'getNewValidators' },
      { ...base, functionName: 'getRejoinedValidators' },
    ],
  });

  const { data: isValidatorRaw } = useReadContract({
    ...base,
    functionName: 'isValidator',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  });

  const rejoinPrice = data?.[0]?.result as bigint | undefined;
  const slots = data?.[1]?.result as bigint | undefined;
  const usdt = ((data?.[2]?.result as `0x${string}` | undefined) ?? USDT_FALLBACK);
  const newValidators = (data?.[3]?.result as readonly `0x${string}`[] | undefined) ?? [];
  const rejoinedValidators = (data?.[4]?.result as readonly `0x${string}`[] | undefined) ?? [];
  const decimals = USDT_DECIMALS;
  const isValidator = Boolean(isValidatorRaw);

  const rows: { address: string; type: 'New' | 'Rejoin' }[] = [
    ...newValidators.map((a) => ({ address: a as string, type: 'New' as const })),
    ...rejoinedValidators.map((a) => ({ address: a as string, type: 'Rejoin' as const })),
  ];

  const onBsc = chainId === bsc.id;
  const soldOut = slots !== undefined && slots === BigInt(0);

  const fmtUsdt = (v?: bigint) => {
    if (typeof v !== 'bigint') return '—';
    const d = Number.isFinite(decimals) && decimals >= 0 ? decimals : 18;
    try {
      const n = Number(formatUnits(v, d));
      return Number.isFinite(n) ? n.toLocaleString(undefined, { maximumFractionDigits: 2 }) : '—';
    } catch {
      return '—';
    }
  };
  const slotsLabel = typeof slots === 'bigint' ? slots.toString() : '—';

  async function handleBuy(kind: Kind) {
    setError(null);
    if (!isConnected || !address) {
      setError('Connect your wallet first.');
      return;
    }
    const price = kind === 'new' ? NEW_PRICE : rejoinPrice;
    if (price === undefined) {
      setError('Price has not loaded yet — try again in a moment.');
      return;
    }
    setBusy(kind);
    try {
      if (chainId !== bsc.id) {
        await switchChainAsync({ chainId: bsc.id });
      }

      // 1) Approve the USDT amount and wait for it to confirm.
      const approveHash = await writeContractAsync({
        address: usdt,
        abi: erc20Abi,
        functionName: 'approve',
        args: [VALIDATORS, price],
        chainId: bsc.id,
      });
      await waitForTransactionReceipt(wagmiConfig, { hash: approveHash });

      // 2) Call the contract function and wait for it to confirm.
      const txHash = await writeContractAsync({
        address: VALIDATORS,
        abi: VALIDATORS_ABI,
        functionName: kind === 'new' ? 'join' : 'rejoin',
        chainId: bsc.id,
      });
      await waitForTransactionReceipt(wagmiConfig, { hash: txHash });

      // Transaction complete — refresh so slots, eligibility, and the table update.
      window.location.reload();
      return;
    } catch (e: unknown) {
      const err = e as { shortMessage?: string; message?: string };
      setError(err.shortMessage || err.message || 'Transaction failed.');
    } finally {
      setBusy(null);
    }
  }

  const buyLabel = (kind: Kind) =>
    busy === kind ? 'Processing…' : !isConnected ? 'Connect Wallet' : !onBsc ? 'Switch to BSC' : 'Buy';

  return (
    <>
      <div className="row g-4 justify-content-center mt-2">
        {/* Rejoin */}
        <div className="col-lg-5 col-md-6">
          <div className="card-dark p-4 p-lg-5 h-100 text-center d-flex flex-column">
            <h3 className="h4 text-green mb-4">Rejoin</h3>
            <div className="mb-5">
              <div className="small text-white-50">Current Price (Increases $10 w/ each Buy)</div>
              <div className="display-6 fw-bold text-white">{fmtUsdt(rejoinPrice)} USDT<BscMark /></div>
            </div>            <div className="mt-auto">
              <button
                className="btn btn-green btn-lg px-5 w-100"
                onClick={() => handleBuy('rejoin')}
                disabled={busy !== null || !isConnected || !isValidator || soldOut}
              >
                {buyLabel('rejoin')}
              </button>
              {isConnected && !isValidator && (
                <p className="small text-white-50 mt-3 mb-0">
                  This wallet isn&apos;t a legacy validator, so rejoin is unavailable.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* New */}
        <div className="col-lg-5 col-md-6">
          <div className="card-dark p-4 p-lg-5 h-100 text-center d-flex flex-column">
            <h3 className="h4 text-green mb-4">New</h3>
            <div className="mb-5">
              <div className="small text-white-50">Price</div>
              <div className="display-6 fw-bold text-white">3,000 USDT<BscMark /></div>
            </div>            <div className="mt-auto">
              <button
                className="btn btn-green btn-lg px-5 w-100"
                onClick={() => handleBuy('new')}
                disabled={busy !== null || !isConnected || soldOut}
              >
                {buyLabel('new')}
              </button>
            </div>
          </div>
        </div>
      </div>

      {(error || !isConnected) && (
        <div className="text-center mt-4">
          {!isConnected && !error && (
            <p className="text-white-50 small mb-0">Connect your wallet (top right) on BNB Smart Chain to buy a seat.</p>
          )}
          {error && <p className="text-danger small mb-0">{error}</p>}
        </div>
      )}

      {/* Validators table */}
      <div className="row justify-content-center mt-5">
        <div className="col-lg-10">
          <div className="card-dark p-4 p-lg-5">
            <h3 className="h5 text-center mb-4">
              {rows.length} Validators{' '}
              <span className="text-white-50 fw-normal">&middot; {slotsLabel} slots available</span>
            </h3>
            <div className="table-responsive">
              <table className="table table-dark table-borderless align-middle mb-0">
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.12)' }}>
                    <th style={{ width: '64px' }}>#</th>
                    <th>Address</th>
                    <th style={{ width: '120px' }}>Type</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="text-center text-white-50 py-4">No validators yet.</td>
                    </tr>
                  ) : (
                    rows.map((r, i) => (
                      <tr key={`${r.address}-${i}`} style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                        <td className="text-white-50">{i + 1}</td>
                        <td className="font-monospace small text-white" style={{ wordBreak: 'break-all' }}>{r.address}</td>
                        <td className="text-green">{r.type}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
