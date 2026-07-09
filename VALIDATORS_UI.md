# Validators UI — Build Guide

Build a "node seating chart": a grid of **100 numbered slots (1–100)** that a user can browse and click to claim/manage a validator node. This document is the contract spec + UX requirements. It is self-contained; you do not need to read the Solidity.

## Network & wiring

- **Chain:** BNB Smart Chain (chainId **56**). All reads and writes are on BSC. If the wallet is on another chain, prompt a switch to BSC before any write.
- **Payment token:** BSC **USDT** `0x55d398326f99059fF775485246999027B3197955`, **18 decimals**. All prices/amounts below are USDT in 18-dec wei. Format with `formatUnits(value, 18)`; parse with `parseUnits(str, 18)`.
- **Contract address:** read from the local config — `config.bsc.Validators`. (Do not hardcode; it changes on redeploy.)
- **ABI:** `config.abi.Validators` from the same local `vtru-contracts.json`.
- Config import pattern (matches the rest of the app): `import config from "@/app/config/vtru-contracts.json"`.

Reads can go through a plain RPC provider. Writes go through the connected wallet. USDT payments require an ERC-20 **approve** to the Validators contract first (see Approvals).

## Enums (integer values as returned by the contract)

```
NodeType  { Basic = 0, Super = 1, Hyper = 2 }
SlotState { Open = 0, Reserved = 1, Claimed = 2 }
```

## Slot & node model

- Slots are numbered **1..100**. Slots **1–10 start Reserved**; the rest Open.
- A slot is **Open** (claimable), **Reserved** (not claimable by the public), or **Claimed**.
- A **node is identified only by its wallet address** — one node per wallet.
- A Claimed node has a **type** (Basic / Super / Hyper) and a **support** flag (2-hr installation support).
- A node is **Active** when fully paid (`amountPaid >= totalCost`), otherwise **Inactive** (still owes).

### Pricing (USDT)

| Item | Price |
|---|---|
| Basic node | 100 |
| Super node | 200 |
| Hyper node | 3000 (**support included**) |
| Installation support (Basic/Super) | +100 |
| Minimum payment (per transaction) | 100 |

- **Hyper** always has support and it's bundled — total is **3000**, not 3100.
- **Basic + support = 200**, **Super + support = 300**.
- Prices are on-chain and could change; always compute cost from the contract (`cost(...)`), never hardcode in logic. The table is just the launch config.

## Reads (view functions)

- **`getSlots() → SlotView[100]`** — the whole grid in one call. Use this to render.
- **`getSlot(uint slot) → SlotView`** — one seat.
- **`getNode(address wallet) → NodeView`** — the connected user's node, with derived `owed` and `active`.
- **`stats() → (open, reserved, claimed, active, inactive)`** — counts for a header/legend, no client looping.
- **`cost(NodeType nodeType, bool support) → (uint total, bool effectiveSupport)`** — quote a claim. `effectiveSupport` is `true` for Hyper regardless of the `support` argument.
- **`amountOwed(address) → uint`**, **`isActive(address) → bool`**, **`nodeCount() → uint`**.
- Public getters if needed: `nodes(address)`, `slotOwner(uint)`, `slotState(uint)`, `basicPrice`, `superPrice`, `hyperPrice`, `installPrice`, `minPayment`.

### Struct shapes

```
SlotView {
  uint      slot;         // 1..100
  SlotState state;        // 0 Open | 1 Reserved | 2 Claimed
  address   owner;        // 0x0 if not claimed
  NodeType  nodeType;     // meaningful only when Claimed
  bool      support;
  uint      totalCost;    // USDT (18-dec)
  uint      amountPaid;   // USDT (18-dec)
  bool      active;       // amountPaid >= totalCost
}

NodeView {
  bool      exists;
  uint      slot;
  NodeType  nodeType;
  bool      support;
  uint      totalCost;
  uint      amountPaid;
  uint      owed;         // totalCost - amountPaid (0 if none/active)
  bool      active;
}
```

## Writes (transactions)

### `claimSlot(uint slot, NodeType nodeType, bool support, uint payment)`
Claim an Open slot. **Options lock permanently** — type/support can't be changed after this tx.
- Preconditions: `slotState[slot] == Open`; caller has no node yet; `minPayment <= payment <= total` (total from `cost`).
- Requires USDT approval for `payment`.
- `payment` may be less than the total (installments): the remainder becomes **owed** and the node is **Inactive** until paid off.

### `pay(uint payment)`
Pay down the caller's owed balance. Node flips to **Active** when fully paid.
- Preconditions: caller has a node; `owed > 0`; `payment <= owed`; `payment >= minPayment` (or exactly `owed`).
- Requires USDT approval for `payment`.

### `moveSlot(uint newSlot)`
Move the caller's node to any Open slot; the old slot reopens.
- Preconditions: caller has a node; **current slot must be > 10** (nodes in slots 1–10 cannot move); `newSlot` is Open.

### Admin-only (not part of the public UI, but exist)
`setPrices(...)`, `reserveSlot(slot, bool)`, `adminImport(wallets[], slots[], payments[])`, `withdrawToken(token, to, amount)`, `withdrawNative(to)`, `pause()`, `unpause()`.

## Approvals (USDT)

Before `claimSlot` or `pay`:
1. Read `USDT.allowance(user, validatorsAddress)`.
2. If `allowance < payment`, send `USDT.approve(validatorsAddress, payment)` and wait for it.
3. Then send the claim/pay tx.

Use the USDT address above; 18 decimals. (Standard ERC-20 `allowance`/`approve`/`balanceOf`.)

## Events (for live updates / toasts)

- `SlotClaimed(wallet, slot, nodeType, support, totalCost, paid)`
- `Paid(wallet, amount, amountPaid, active)`
- `SlotMoved(wallet, fromSlot, toSlot)`
- `SlotReserved(slot, reserved)`
- `Imported(count)`
- `PricesSet(...)`

Refetch `getSlots()` (or the affected `getSlot`) and `getNode(user)` after any of these.

## UI requirements

### The grid
- 100 cells laid out like airline seating, labeled **1–100** in order.
- Color/state legend, driven by `SlotView.state` (+ `active` when Claimed):
  - **Open** — selectable (hover/click).
  - **Reserved** — visually distinct, **not** clickable for claiming.
  - **Claimed + Active** — one color; show node type (Basic/Super/Hyper) and a support indicator.
  - **Claimed + Inactive** — a "still owes" color; optionally show `amountPaid / totalCost`.
- Highlight the connected user's own slot.
- Header uses `stats()` for counts (Open / Claimed / Active / Inactive).

### Claim flow (clicking an Open slot)
1. Modal with: node type selector (Basic / Super / Hyper), a **support** toggle.
   - When **Hyper** is selected, force the support toggle **on and disabled** (it's included).
2. Show **total cost** from `cost(nodeType, support)` and the **minimum payment** (`minPayment`).
3. Let the user enter a payment `>= minPayment` and `<= total`. Show the resulting **amount owed** (`total - payment`) and that the node will be **Inactive** until paid off.
4. Warn clearly: **the node type and support choice cannot be changed after claiming.**
5. Approve USDT (if needed) → `claimSlot(...)`.

### Node panel (for a wallet that owns a node — use `getNode`)
- Show: slot number, type, support, `amountPaid`, `owed`, Active/Inactive.
- **Pay** action (visible while `owed > 0`): amount input `>= minPayment` and `<= owed`; approve → `pay(amount)`.
- **Move** action (visible only if `slot > 10`): pick an Open slot → `moveSlot(newSlot)`.

## Rules & gotchas (enforce in the UI too, for good UX)

- **One node per wallet.** If `getNode(user).exists`, hide claim and show the node panel instead.
- **Options are permanent** after claim — no type/support editing; only pay down owed and move slot.
- **Minimum 100 per payment.** Costs are whole multiples of 100, so installments are in 100s.
- **Reserved slots (1–10)** aren't publicly claimable, and any node in 1–10 **cannot move**.
- **Active ⇔ fully paid.** `owed == 0`.
- Everything is USDT 18-dec; always approve before paying.
- Grandfathered/imported nodes appear as **Super + support, Active, owed 0** with their recorded prior payment as `totalCost`/`amountPaid`.
