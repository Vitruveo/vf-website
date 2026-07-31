'use client';

import { useEffect, useState } from 'react';
import {
  useAccount,
  useReadContract,
  useReadContracts,
  useWriteContract,
  useSwitchChain,
  useWatchContractEvent,
} from 'wagmi';
import { readContract, waitForTransactionReceipt } from '@wagmi/core';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { bsc } from 'wagmi/chains';
import { erc20Abi, formatUnits, parseUnits, type Abi } from 'viem';
import { wagmiConfig } from '../web3/wagmi';
import contracts from '../config/vtru-contracts.json';

const VALIDATORS = contracts.bsc.Validators as `0x${string}`;
const VALIDATORS_ABI = contracts.abi.Validators as unknown as Abi;
// BSC USDT (BSC-USD), 18 decimals.
const USDT = '0x55d398326f99059fF775485246999027B3197955' as `0x${string}`;
const USDT_DECIMALS = 18;

// Claim deadline has passed — flip to false to reopen claiming.
const CLAIMS_CLOSED = true;

// Contract enums.
const OPEN = 0;
const RESERVED = 1;
const CLAIMED = 2;
type NodeTypeId = 0 | 1 | 2;
const NODE_TYPES: { id: NodeTypeId; label: string }[] = [
  { id: 0, label: 'Basic' },
  { id: 1, label: 'Super' },
  { id: 2, label: 'Hyper' },
];

type SlotView = {
  slot: bigint;
  state: number;
  owner: `0x${string}`;
  nodeType: number;
  support: boolean;
  totalCost: bigint;
  amountPaid: bigint;
  active: boolean;
};

type NodeView = {
  exists: boolean;
  slot: bigint;
  nodeType: number;
  support: boolean;
  totalCost: bigint;
  amountPaid: bigint;
  owed: bigint;
  active: boolean;
};

// Grandfathered imports recorded whole-USDT amounts without 18-dec scaling
// (e.g. 100 instead of 100e18). Any nonzero value this small can't be a real
// scaled amount (< 0.000001 USDT; the minimum payment is 100e18), so treat it
// as already denominated in whole USDT.
const LEGACY_UNSCALED_MAX = BigInt(1_000_000_000_000); // 1e12

const fmtUsdt = (v?: bigint) => {
  if (typeof v !== 'bigint') return '—';
  const n =
    v > BigInt(0) && v < LEGACY_UNSCALED_MAX
      ? Number(v)
      : Number(formatUnits(v, USDT_DECIMALS));
  return Number.isFinite(n) ? n.toLocaleString(undefined, { maximumFractionDigits: 2 }) : '—';
};

const parseUsdt = (s: string): bigint | null => {
  const t = s.trim();
  if (!t || !/^\d+(\.\d+)?$/.test(t)) return null;
  try {
    return parseUnits(t, USDT_DECIMALS);
  } catch {
    return null;
  }
};

const errText = (e: unknown) => {
  const err = e as { shortMessage?: string; message?: string };
  return err.shortMessage || err.message || 'Transaction failed.';
};

// Wait for a tx to confirm, with a hard timeout so the UI can never hang
// forever on a dropped tx. waitForTransactionReceipt resolves (not throws)
// for reverted transactions, so surface those as errors explicitly.
async function confirmTx(hash: `0x${string}`, label: string) {
  const receipt = await waitForTransactionReceipt(wagmiConfig, {
    hash,
    timeout: 180_000,
  });
  if (receipt.status === 'reverted') {
    throw new Error(`${label} transaction reverted on-chain.`);
  }
}

// Cell colors per state.
const CELL = {
  open: {
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.18)',
    color: 'rgba(255, 255, 255, 0.65)',
  },
  reserved: {
    background:
      'repeating-linear-gradient(45deg, rgba(255,255,255,0.04), rgba(255,255,255,0.04) 4px, rgba(255,255,255,0.1) 4px, rgba(255,255,255,0.1) 8px)',
    border: '1px solid rgba(255, 255, 255, 0.12)',
    color: 'rgba(255, 255, 255, 0.35)',
  },
} as const;

// Cell color = node type. Brightness = active (full) vs still owes (faded).
const TYPE_FILL: { label: string; rgb: string }[] = [
  { label: 'Basic', rgb: '59, 130, 246' }, // blue
  { label: 'Super', rgb: '168, 85, 247' }, // purple
  { label: 'Hyper', rgb: '250, 204, 21' }, // yellow
];

// Active cells get an animated gradient sheen (see .vf-slot-active in
// globals.css — inline backgroundImage + class-driven background animation).
// Inactive ("still owes") cells are flat and faded.
const claimedLook = (nodeType: number, active: boolean): React.CSSProperties => {
  const rgb = TYPE_FILL[nodeType]?.rgb ?? '148, 163, 184';
  return {
    ...(active
      ? {
          backgroundImage: `linear-gradient(120deg, rgba(${rgb}, 0.95), rgba(${rgb}, 0.45) 50%, rgba(${rgb}, 0.95))`,
        }
      : { backgroundColor: `rgba(${rgb}, 0.22)` }),
    border: `1px solid rgba(${rgb}, ${active ? 1 : 0.5})`,
    // Bright yellow needs dark text; everything else reads better in white.
    color: nodeType === 2 && active ? '#0a0f0a' : 'rgba(255, 255, 255, 0.92)',
  };
};

// Support marker: wrench icon.
const Wrench = ({ size = 11 }: { size?: number }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="rgba(255, 255, 255, 0.95)"
    style={{ filter: 'drop-shadow(0 0 1.5px rgba(0, 0, 0, 0.9))' }}
  >
    <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z" />
  </svg>
);

const SupportMark = () => (
  <span style={{ position: 'absolute', top: 2, left: 3, lineHeight: 0 }}>
    <Wrench />
  </span>
);

const LegendSwatch = ({ style, className }: { style: React.CSSProperties; className?: string }) => (
  <span
    className={`d-inline-block me-2 align-middle${className ? ` ${className}` : ''}`}
    style={{ width: 14, height: 14, borderRadius: 3, ...style }}
  />
);

export default function SeatingChart() {
  const { address, chainId } = useAccount();
  const { switchChainAsync } = useSwitchChain();
  const { writeContractAsync } = useWriteContract();

  const base = { address: VALIDATORS, abi: VALIDATORS_ABI, chainId: bsc.id } as const;

  const { data: slotsRaw, refetch: refetchSlots } = useReadContract({
    ...base,
    functionName: 'getSlots',
    query: { refetchInterval: 30_000 },
  });
  const { data: metaRaw, refetch: refetchMeta } = useReadContracts({
    contracts: [
      { ...base, functionName: 'stats' },
      { ...base, functionName: 'minPayment' },
      { ...base, functionName: 'basicPrice' },
      { ...base, functionName: 'superPrice' },
      { ...base, functionName: 'hyperPrice' },
      { ...base, functionName: 'installPrice' },
    ],
    query: { refetchInterval: 30_000 },
  });
  const { data: nodeRaw, refetch: refetchNode } = useReadContract({
    ...base,
    functionName: 'getNode',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  });

  const refetchAll = () => {
    refetchSlots();
    refetchMeta();
    refetchNode();
  };

  // Live updates: any contract event (claims, payments, moves, reservations) invalidates the reads.
  useWatchContractEvent({ ...base, onLogs: refetchAll });

  const slots = (slotsRaw as SlotView[] | undefined) ?? [];
  const stats = metaRaw?.[0]?.result as
    | readonly [bigint, bigint, bigint, bigint, bigint]
    | undefined;
  const minPayment = metaRaw?.[1]?.result as bigint | undefined;
  const prices = {
    basic: metaRaw?.[2]?.result as bigint | undefined,
    super: metaRaw?.[3]?.result as bigint | undefined,
    hyper: metaRaw?.[4]?.result as bigint | undefined,
    install: metaRaw?.[5]?.result as bigint | undefined,
  };
  const node = nodeRaw as NodeView | undefined;
  const hasNode = Boolean(node?.exists);

  const [claimSlotNum, setClaimSlotNum] = useState<number | null>(null);
  const [moveMode, setMoveMode] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Approve USDT for `amount` if the current allowance is short, then run the write.
  async function payTx(
    amount: bigint,
    write: () => Promise<`0x${string}`>,
    onStatus?: (s: string) => void,
  ) {
    if (!address) throw new Error('Connect your wallet first.');
    if (chainId !== bsc.id) await switchChainAsync({ chainId: bsc.id });
    const allowance = await readContract(wagmiConfig, {
      address: USDT,
      abi: erc20Abi,
      functionName: 'allowance',
      args: [address, VALIDATORS],
      chainId: bsc.id,
    });
    if (allowance < amount) {
      onStatus?.('Approve the USDT spend in your wallet…');
      const approveHash = await writeContractAsync({
        address: USDT,
        abi: erc20Abi,
        functionName: 'approve',
        args: [VALIDATORS, amount],
        chainId: bsc.id,
      });
      onStatus?.('Waiting for the approval to confirm…');
      await confirmTx(approveHash, 'Approval');
    }
    onStatus?.('Confirm the transaction in your wallet…');
    const hash = await write();
    onStatus?.('Waiting for the transaction to confirm…');
    await confirmTx(hash, 'The');
    refetchAll();
  }

  async function handleMove(newSlot: number) {
    setError(null);
    setBusy(true);
    try {
      if (chainId !== bsc.id) await switchChainAsync({ chainId: bsc.id });
      const hash = await writeContractAsync({
        ...base,
        functionName: 'moveSlot',
        args: [BigInt(newSlot)],
      });
      await confirmTx(hash, 'The');
      refetchAll();
      setMoveMode(false);
    } catch (e) {
      setError(errText(e));
    } finally {
      setBusy(false);
    }
  }

  const cellClickable = (s: SlotView) =>
    !busy && s.state === OPEN && (moveMode || (!hasNode && !CLAIMS_CLOSED));

  function onCellClick(s: SlotView) {
    if (!cellClickable(s)) return;
    if (moveMode) {
      handleMove(Number(s.slot));
    } else {
      setError(null);
      setClaimSlotNum(Number(s.slot));
    }
  }

  const cellStyle = (s: SlotView): React.CSSProperties => {
    const isOwn =
      !!address && s.state === CLAIMED && s.owner.toLowerCase() === address.toLowerCase();
    const clickable = cellClickable(s);
    const look =
      s.state === RESERVED
        ? CELL.reserved
        : s.state === CLAIMED
          ? claimedLook(s.nodeType, s.active)
          : CELL.open;
    return {
      ...look,
      position: 'relative',
      borderRadius: 6,
      aspectRatio: '1',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      lineHeight: 1.1,
      fontSize: 'clamp(0.55rem, 1.6vw, 0.8rem)',
      cursor: clickable ? 'pointer' : 'default',
      userSelect: 'none',
      ...(clickable && moveMode ? { border: '1px dashed rgba(74, 222, 128, 0.8)' } : {}),
      ...(isOwn ? { boxShadow: '0 0 0 2px #fff, 0 0 14px rgba(74, 222, 128, 0.8)' } : {}),
    };
  };

  const cellTitle = (s: SlotView) => {
    const n = Number(s.slot);
    if (s.state === OPEN) return `Slot ${n} — Open`;
    if (s.state === RESERVED) return `Slot ${n} — Reserved`;
    const type = NODE_TYPES[s.nodeType]?.label ?? '?';
    const sup = s.support ? ', support' : '';
    const status = s.active
      ? 'Active'
      : `Inactive — paid ${fmtUsdt(s.amountPaid)} / ${fmtUsdt(s.totalCost)} USDT`;
    return `Slot ${n} — ${type}${sup} — ${status}`;
  };

  return (
    <div className="mt-5">
      {/* Stats header */}
      <div className="d-flex flex-wrap justify-content-center gap-4 mb-4 text-center">
        {(
          [
            ['Open', stats?.[0]],
            ['Reserved', stats?.[1]],
            ['Claimed', stats?.[2]],
            ['Active', stats?.[3]],
            ['Inactive', stats?.[4]],
          ] as const
        ).map(([label, v]) => (
          <div key={label}>
            <div className="h4 fw-bold text-white mb-0">{typeof v === 'bigint' ? v.toString() : '—'}</div>
            <div className="small text-white-50">{label}</div>
          </div>
        ))}
      </div>

      {/* Pricing (read from the contract) */}
      <p className="text-center mb-4" style={{ fontSize: '1.05rem' }}>
        <span className="text-white fw-semibold">Basic <span className="text-green">{fmtUsdt(prices.basic)} USDT</span></span>
        <span className="text-white-50"> &middot; </span>
        <span className="text-white fw-semibold">Super <span className="text-green">{fmtUsdt(prices.super)} USDT</span></span>
        <span className="text-white-50"> &middot; </span>
        <span className="text-white fw-semibold">Hyper <span className="text-green">{fmtUsdt(prices.hyper)} USDT</span></span>
        <span className="text-white-50"> (support included) &middot; Installation support +
        {fmtUsdt(prices.install)} USDT &middot; Minimum payment {fmtUsdt(minPayment)} USDT</span>
      </p>

      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card-dark p-3 p-lg-4">
            {/* Legend */}
            <div className="d-flex flex-wrap justify-content-center gap-3 small text-white-50 mb-2">
              <span><LegendSwatch style={CELL.open} />Open</span>
              <span><LegendSwatch style={CELL.reserved} />Reserved</span>
              {TYPE_FILL.map((t, i) => (
                <span key={t.label}><LegendSwatch style={claimedLook(i, true)} />{t.label}</span>
              ))}
            </div>
            <div className="d-flex flex-wrap justify-content-center gap-3 small text-white-50 mb-3">
              <span>
                <LegendSwatch
                  className="vf-slot-active"
                  style={{
                    backgroundImage:
                      'linear-gradient(120deg, rgba(255,255,255,0.75), rgba(255,255,255,0.25) 50%, rgba(255,255,255,0.75))',
                  }}
                />
                Active (animated)
              </span>
              <span><LegendSwatch style={{ background: 'rgba(255, 255, 255, 0.2)' }} />Owes balance (faded)</span>
              <span><span className="d-inline-block me-2 align-middle" style={{ lineHeight: 0 }}><Wrench size={13} /></span>Support</span>
            </div>

            {moveMode && (
              <div className="text-center small text-green mb-3">
                Click an open slot to move your node, or{' '}
                <button
                  className="btn btn-link btn-sm p-0 align-baseline text-white-50"
                  onClick={() => setMoveMode(false)}
                >
                  cancel
                </button>
                .
              </div>
            )}

            {/* The grid */}
            {slots.length === 0 ? (
              <p className="text-center text-white-50 py-5 mb-0">Loading slots…</p>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: 6 }}>
                {slots.map((s) => (
                  <div
                    key={Number(s.slot)}
                    className={
                      [
                        s.state === CLAIMED && s.active ? 'vf-slot-active' : '',
                        cellClickable(s) ? 'vf-slot-clickable' : '',
                      ]
                        .filter(Boolean)
                        .join(' ') || undefined
                    }
                    style={cellStyle(s)}
                    title={cellTitle(s)}
                    onClick={() => onCellClick(s)}
                  >
                    <span className="fw-semibold">{Number(s.slot)}</span>
                    {s.state === CLAIMED && (
                      <>
                        <span
                          className="font-monospace"
                          style={{ fontSize: '0.78em', opacity: 0.85 }}
                        >
                          {s.owner.slice(0, 6)}
                        </span>
                        {s.support && <SupportMark />}
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}

            {!hasNode && (
              <p className="text-center text-white-50 small mt-3 mb-0">
                {CLAIMS_CLOSED
                  ? 'Claiming is closed.'
                  : 'Click an open slot to claim it. One node per wallet.'}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Node panel */}
      {hasNode && node && (
        <NodePanel
          node={node}
          minPayment={minPayment}
          busy={busy}
          setBusy={setBusy}
          error={error}
          setError={setError}
          payTx={payTx}
          moveMode={moveMode}
          setMoveMode={setMoveMode}
          write={writeContractAsync}
          baseArgs={base}
        />
      )}

      {error && !claimSlotNum && (
        <p className="text-center text-danger small mt-4 mb-0">{error}</p>
      )}

      {/* Claim modal */}
      {claimSlotNum !== null && !hasNode && (
        <ClaimModal
          slot={claimSlotNum}
          minPayment={minPayment}
          onClose={() => setClaimSlotNum(null)}
          payTx={payTx}
          write={writeContractAsync}
          baseArgs={base}
        />
      )}
    </div>
  );
}

type WriteFn = ReturnType<typeof useWriteContract>['writeContractAsync'];
type BaseArgs = { address: `0x${string}`; abi: Abi; chainId: number };
type PayTx = (
  amount: bigint,
  write: () => Promise<`0x${string}`>,
  onStatus?: (s: string) => void,
) => Promise<void>;

function NodePanel({
  node,
  minPayment,
  busy,
  setBusy,
  error,
  setError,
  payTx,
  moveMode,
  setMoveMode,
  write,
  baseArgs,
}: {
  node: NodeView;
  minPayment?: bigint;
  busy: boolean;
  setBusy: (b: boolean) => void;
  error: string | null;
  setError: (e: string | null) => void;
  payTx: PayTx;
  moveMode: boolean;
  setMoveMode: (m: boolean) => void;
  write: WriteFn;
  baseArgs: BaseArgs;
}) {
  const [amountStr, setAmountStr] = useState('');
  const [status, setStatus] = useState<string | null>(null);
  const slotNum = Number(node.slot);
  const canMove = slotNum > 10;
  const owed = node.owed;

  const amount = parseUsdt(amountStr);
  const amountValid =
    amount !== null &&
    amount > BigInt(0) &&
    amount <= owed &&
    (minPayment === undefined || amount >= minPayment || amount === owed);

  async function handlePay() {
    if (amount === null || !amountValid) return;
    setError(null);
    setBusy(true);
    try {
      await payTx(
        amount,
        () => write({ ...baseArgs, functionName: 'pay', args: [amount] }),
        setStatus,
      );
      setAmountStr('');
    } catch (e) {
      setError(errText(e));
    } finally {
      setBusy(false);
      setStatus(null);
    }
  }

  return (
    <div className="row justify-content-center mt-4">
      <div className="col-lg-8">
        <div className="card-dark p-4 p-lg-5">
          <h3 className="h5 text-green mb-4">Your Node</h3>
          <div className="row g-3 small mb-2">
            <div className="col-6 col-md-3">
              <div className="text-white-50">Slot</div>
              <div className="text-white fw-semibold">{slotNum}</div>
            </div>
            <div className="col-6 col-md-3">
              <div className="text-white-50">Type</div>
              <div className="text-white fw-semibold">
                {NODE_TYPES[node.nodeType]?.label}
                {node.support ? ' + support' : ''}
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="text-white-50">Paid</div>
              <div className="text-white fw-semibold">
                {fmtUsdt(node.amountPaid)} / {fmtUsdt(node.totalCost)} USDT
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="text-white-50">Status</div>
              <div className={node.active ? 'text-green fw-semibold' : 'fw-semibold' } style={node.active ? undefined : { color: '#f59e0b' }}>
                {node.active ? 'Active' : `Inactive — owes ${fmtUsdt(owed)} USDT`}
              </div>
            </div>
          </div>

          {owed > BigInt(0) && (
            <div className="d-flex flex-wrap align-items-end gap-3 mt-4">
              <div>
                <label className="form-label small text-white-50 mb-1">
                  Payment (USDT, min {fmtUsdt(minPayment)} or the full {fmtUsdt(owed)})
                </label>
                <input
                  type="text"
                  inputMode="decimal"
                  className="form-control bg-dark text-white border-secondary"
                  style={{ maxWidth: 220 }}
                  value={amountStr}
                  onChange={(e) => setAmountStr(e.target.value)}
                  placeholder={formatUnits(owed, USDT_DECIMALS)}
                  disabled={busy}
                />
              </div>
              <button
                className="btn btn-green px-4"
                onClick={handlePay}
                disabled={busy || !amountValid}
              >
                {busy ? 'Processing…' : 'Pay'}
              </button>
              <button
                className="btn btn-outline-light"
                onClick={() => setAmountStr(formatUnits(owed, USDT_DECIMALS))}
                disabled={busy}
              >
                Pay full amount
              </button>
            </div>
          )}

          {canMove && !moveMode && (
            <div className="mt-4">
              <button
                className="btn btn-outline-light"
                onClick={() => { setError(null); setMoveMode(true); }}
                disabled={busy}
              >
                Move to another slot
              </button>
            </div>
          )}
          {!canMove && (
            <p className="small text-white-50 mt-4 mb-0">
              Nodes in slots 1–10 cannot be moved.
            </p>
          )}

          {busy && status && (
            <p className="text-white-50 small mt-3 mb-0">{status}</p>
          )}
          {error && <p className="text-danger small mt-3 mb-0">{error}</p>}
        </div>
      </div>
    </div>
  );
}

function ClaimModal({
  slot,
  minPayment,
  onClose,
  payTx,
  write,
  baseArgs,
}: {
  slot: number;
  minPayment?: bigint;
  onClose: () => void;
  payTx: PayTx;
  write: WriteFn;
  baseArgs: BaseArgs;
}) {
  const { isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();
  const [nodeType, setNodeType] = useState<NodeTypeId>(0);
  const [support, setSupport] = useState(false);
  const [paymentStr, setPaymentStr] = useState('');
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const isHyper = nodeType === 2;
  // Hyper always includes support; the contract forces it, mirror that here.
  const effectiveSupport = isHyper ? true : support;

  const { data: costRaw } = useReadContract({
    ...baseArgs,
    functionName: 'cost',
    args: [nodeType, effectiveSupport],
  });
  const total = (costRaw as readonly [bigint, boolean] | undefined)?.[0];

  // Options changed — default the payment to the full price.
  useEffect(() => {
    if (typeof total === 'bigint') setPaymentStr(formatUnits(total, USDT_DECIMALS));
  }, [total]);

  const payment = parseUsdt(paymentStr);
  const paymentValid =
    payment !== null &&
    typeof total === 'bigint' &&
    payment <= total &&
    (minPayment === undefined || payment >= minPayment);
  const owedAfter =
    paymentValid && typeof total === 'bigint' ? total - (payment as bigint) : undefined;

  async function handleClaim() {
    if (!paymentValid || payment === null) return;
    setError(null);
    setBusy(true);
    try {
      await payTx(
        payment,
        () =>
          write({
            ...baseArgs,
            functionName: 'claimSlot',
            args: [BigInt(slot), nodeType, effectiveSupport, payment],
          }),
        setStatus,
      );
      onClose();
    } catch (e) {
      setError(errText(e));
    } finally {
      setBusy(false);
      setStatus(null);
    }
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.75)',
        zIndex: 1050,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
      }}
      onClick={() => !busy && onClose()}
    >
      <div
        className="card-dark p-4 p-lg-5 w-100"
        style={{ maxWidth: 520, background: '#101510' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="d-flex justify-content-between align-items-start mb-4">
          <h3 className="h5 text-green mb-0">Claim Slot {slot}</h3>
          {/* Always closable — a pending tx keeps running in the background. */}
          <button
            className="btn btn-sm btn-outline-light"
            onClick={onClose}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Node type */}
        <div className="mb-3">
          <div className="small text-white-50 mb-2">Node type</div>
          <div className="btn-group w-100" role="group">
            {NODE_TYPES.map((t) => (
              <button
                key={t.id}
                type="button"
                className={`btn ${nodeType === t.id ? 'btn-green' : 'btn-outline-light'}`}
                onClick={() => setNodeType(t.id)}
                disabled={busy}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Support toggle */}
        <div className="form-check form-switch mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            id="support-toggle"
            checked={effectiveSupport}
            onChange={(e) => setSupport(e.target.checked)}
            disabled={busy || isHyper}
          />
          <label className="form-check-label small text-white-50" htmlFor="support-toggle">
            2-hour installation support{isHyper ? ' (included with Hyper)' : ''}
          </label>
        </div>

        <div className="d-flex justify-content-between small mb-1">
          <span className="text-white-50">Total cost</span>
          <span className="text-white fw-semibold">{fmtUsdt(total)} USDT</span>
        </div>
        <div className="d-flex justify-content-between small mb-3">
          <span className="text-white-50">Minimum payment</span>
          <span className="text-white">{fmtUsdt(minPayment)} USDT</span>
        </div>

        {/* Payment */}
        <div className="mb-3">
          <label className="form-label small text-white-50 mb-1">Pay now (USDT)</label>
          <input
            type="text"
            inputMode="decimal"
            className="form-control bg-dark text-white border-secondary"
            value={paymentStr}
            onChange={(e) => setPaymentStr(e.target.value)}
            disabled={busy}
          />
          {!paymentValid && paymentStr !== '' && (
            <div className="small text-danger mt-1">
              Enter an amount between {fmtUsdt(minPayment)} and {fmtUsdt(total)} USDT.
            </div>
          )}
          {owedAfter !== undefined && owedAfter > BigInt(0) && (
            <div className="small mt-1" style={{ color: '#f59e0b' }}>
              You will still owe {fmtUsdt(owedAfter)} USDT. The node stays Inactive until fully
              paid.
            </div>
          )}
        </div>

        <div
          className="small p-3 mb-4"
          style={{
            background: 'rgba(245, 158, 11, 0.1)',
            border: '1px solid rgba(245, 158, 11, 0.4)',
            borderRadius: 8,
            color: 'rgba(255, 255, 255, 0.8)',
          }}
        >
          Node type and support cannot be changed after claiming. You can only pay down the
          balance or move to another open slot.
        </div>

        <button
          className="btn btn-green btn-lg w-100"
          onClick={isConnected ? handleClaim : openConnectModal}
          disabled={CLAIMS_CLOSED || busy || (isConnected && !paymentValid)}
        >
          {CLAIMS_CLOSED ? 'Claiming closed' : busy ? 'Processing…' : isConnected ? 'Approve & Claim' : 'Connect Wallet on BSC'}
        </button>

        {busy && status && (
          <p className="text-white-50 small mt-3 mb-0 text-center">{status}</p>
        )}
        {error && <p className="text-danger small mt-3 mb-0">{error}</p>}
      </div>
    </div>
  );
}
