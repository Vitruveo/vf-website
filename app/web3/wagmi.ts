import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { bsc } from 'wagmi/chains';
import { fallback, http } from 'wagmi';

// WalletConnect Cloud project id. This is a public client identifier (it ships
// in the browser bundle); access is restricted by allowed domains in the
// WalletConnect Cloud dashboard. Override per-environment via
// NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID if needed.
const projectId =
  process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'c86913c1e4403a33af0a51d8d3e39334';

// BSC is the only supported network.
export const wagmiConfig = getDefaultConfig({
  appName: 'Vitruveo Validators',
  projectId,
  chains: [bsc],
  ssr: true,
  // Pin explicit CORS-friendly BSC endpoints. viem's built-in default
  // (56.rpc.thirdweb.com) rate-limits browser traffic (429 + no CORS headers),
  // which broke the validators grid in production. NodeReal is primary; the
  // public endpoints are automatic fallbacks.
  transports: {
    [bsc.id]: fallback([
      http('https://bsc-mainnet.nodereal.io/v1/a54fef697b604ae3af38fe5cc2d7da0f'),
      http('https://bsc-dataseed.binance.org'),
      http('https://bsc-rpc.publicnode.com'),
      http('https://bsc-dataseed1.bnbchain.org'),
    ]),
  },
  // Slow the log/event polling (default 4s) — the grid's event watcher only
  // needs to notice claims within a refresh cycle, not every block.
  pollingInterval: 15_000,
});
