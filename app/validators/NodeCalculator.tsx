'use client';

import { useState } from 'react';

const YEARS = [2027, 2028, 2029, 2030, 2031];

// Per-node VTRU earned per year (five-year program: Basic 315,360 total,
// Super/Hyper 630,720 total at 2 VTRU per block).
const VTRU_PER_YEAR: Record<Tier, number> = {
  basic: 63_072,
  super: 126_144,
  hyper: 126_144,
};

// Launch prices, USDT. Display-only defaults for the calculator.
const NODE_PRICE: Record<Tier, number> = { basic: 100, super: 200, hyper: 3000 };
const SUPPORT_PRICE = 100;

type Tier = 'basic' | 'super' | 'hyper';
const TIERS: { key: Tier; label: string }[] = [
  { key: 'basic', label: 'Basic' },
  { key: 'super', label: 'Super' },
  { key: 'hyper', label: 'Hyper' },
];

const num = (s: string) => {
  const n = parseFloat(s);
  return Number.isFinite(n) && n >= 0 ? n : 0;
};

const money = (n: number) =>
  (n < 0 ? '-$' : '$') + Math.abs(n).toLocaleString(undefined, { maximumFractionDigits: 0 });

const inputClass = 'form-control form-control-sm bg-dark text-white border-secondary';

// Compact label column so more of the table fits in view.
const labelStyle = { fontSize: '0.8rem' } as const;

export default function NodeCalculator() {
  const [qty, setQty] = useState<Record<Tier, string>>({ basic: '1', super: '0', hyper: '0' });
  // Hyper support is always included; the checkbox is shown checked and locked.
  const [support, setSupport] = useState<Record<Tier, boolean>>({
    basic: false,
    super: false,
    hyper: true,
  });
  const [monthly, setMonthly] = useState<string[]>(Array(YEARS.length).fill('50'));
  const [price, setPrice] = useState<string[]>(['0.10', '0.20', '0.30', '0.40', '0.50']);

  const q: Record<Tier, number> = {
    basic: Math.floor(num(qty.basic)),
    super: Math.floor(num(qty.super)),
    hyper: Math.floor(num(qty.hyper)),
  };
  const nodeCount = q.basic + q.super + q.hyper;

  const purchase = TIERS.reduce((sum, t) => {
    const supportCost =
      t.key === 'hyper' ? 0 : support[t.key] ? SUPPORT_PRICE : 0;
    return sum + q[t.key] * (NODE_PRICE[t.key] + supportCost);
  }, 0);

  const vtruPerYear = TIERS.reduce((sum, t) => sum + q[t.key] * VTRU_PER_YEAR[t.key], 0);

  // Per-year figures. Node purchase is a year-one expense.
  const years = YEARS.map((year, i) => {
    const hosting1 = num(monthly[i]) * 12;
    const hostingAll = hosting1 * nodeCount;
    const expenses = hostingAll + (i === 0 ? purchase : 0);
    const income = vtruPerYear * num(price[i]);
    const profit = income - expenses;
    return { year, hosting1, hostingAll, expenses, income, profit };
  });

  const total = {
    hostingAll: years.reduce((s, y) => s + y.hostingAll, 0),
    expenses: years.reduce((s, y) => s + y.expenses, 0),
    income: years.reduce((s, y) => s + y.income, 0),
    profit: years.reduce((s, y) => s + y.profit, 0),
  };

  const roi = (profit: number, expenses: number) =>
    expenses > 0
      ? `${Math.round((profit / expenses) * 100).toLocaleString()}%`
      : '—';

  const profitClass = (n: number) => (n >= 0 ? 'text-green fw-semibold' : 'fw-semibold');
  const profitStyle = (n: number) => (n >= 0 ? undefined : { color: '#f87171' });
  // ROI gets its own color, distinct from the profit green/red.
  const roiStyle = { color: '#38bdf8' } as const;

  const setYearValue =
    (setter: typeof setMonthly, values: string[], i: number) =>
    (v: string) => {
      const next = values.slice();
      next[i] = v;
      setter(next);
    };

  return (
    <div className="row justify-content-center">
      <div className="col-lg-10">
        <div className="card-dark p-4 p-lg-5">
          {/* Node selection */}
          <div className="row g-3 justify-content-center mb-4">
            {TIERS.map((t) => (
              <div key={t.key} className="col-md-4">
                <div className="p-3 rounded h-100" style={{ background: 'rgba(0, 0, 0, 0.25)' }}>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="text-white fw-semibold">{t.label}</span>
                    <span className="h3 fw-bold text-green mb-0">{money(NODE_PRICE[t.key])}</span>
                  </div>
                  <div className="d-flex align-items-center gap-3">
                    <input
                      type="number"
                      min={0}
                      className={inputClass}
                      style={{ maxWidth: 90 }}
                      value={qty[t.key]}
                      onChange={(e) => setQty({ ...qty, [t.key]: e.target.value })}
                      aria-label={`${t.label} node quantity`}
                    />
                    <div className="form-check mb-0">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={`calc-support-${t.key}`}
                        checked={support[t.key]}
                        disabled={t.key === 'hyper'}
                        onChange={(e) => setSupport({ ...support, [t.key]: e.target.checked })}
                      />
                      <label
                        className="form-check-label small text-white-50"
                        htmlFor={`calc-support-${t.key}`}
                      >
                        Support{t.key === 'hyper' ? ' (included)' : ` (+${money(SUPPORT_PRICE)})`}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-white-50 small mb-4">
            {nodeCount.toLocaleString()} node{nodeCount === 1 ? '' : 's'} &middot; one-time node cost{' '}
            <span className="text-white fw-semibold">{money(purchase)}</span> &middot;{' '}
            {vtruPerYear.toLocaleString()} VTRU earned per year
          </p>

          {/* Five-year table */}
          <div className="table-responsive">
            <table
              className="calc-table table table-dark table-borderless table-sm align-middle mb-0 text-end"
              style={{ fontSize: '0.85rem' }}
            >
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.12)' }}>
                  <th className="text-start" style={{ minWidth: 150 }}></th>
                  {YEARS.map((y) => (
                    <th key={y} className="text-center" style={{ minWidth: 95, fontSize: '1.25rem' }}>{y}</th>
                  ))}
                  <th className="text-center" style={{ minWidth: 95, fontSize: '1.25rem' }}>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-start text-white-50" style={labelStyle}>Monthly hosting / node</td>
                  {YEARS.map((y, i) => (
                    <td key={y}>
                      <div className="input-group input-group-sm ms-auto flex-nowrap" style={{ maxWidth: 110 }}>
                        <span className="input-group-text bg-dark text-white-50 border-secondary">$</span>
                        <input
                          type="number"
                          min={0}
                          className={`${inputClass} text-end`}
                          value={monthly[i]}
                          onChange={(e) => setYearValue(setMonthly, monthly, i)(e.target.value)}
                          aria-label={`Monthly hosting cost ${y}`}
                        />
                      </div>
                    </td>
                  ))}
                  <td className="text-white-50">—</td>
                </tr>
                <tr>
                  <td className="text-start text-white-50" style={labelStyle}>
                    Annual hosting — all nodes ({nodeCount.toLocaleString()})
                  </td>
                  {years.map((y) => <td key={y.year}>{money(y.hostingAll)}</td>)}
                  <td>{money(total.hostingAll)}</td>
                </tr>
                <tr>
                  <td className="text-start text-white-50" style={labelStyle}>Node cost (one-time)</td>
                  {years.map((y, i) => (
                    <td key={y.year} className={i === 0 ? undefined : 'text-white-50'}>
                      {i === 0 ? money(purchase) : '—'}
                    </td>
                  ))}
                  <td>{money(purchase)}</td>
                </tr>
                <tr>
                  <td className="text-start text-white-50" style={labelStyle}>VTRU earned</td>
                  {years.map((y) => <td key={y.year}>{vtruPerYear.toLocaleString()}</td>)}
                  <td>{(vtruPerYear * YEARS.length).toLocaleString()}</td>
                </tr>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.12)' }}>
                  <td className="text-start text-white-50" style={labelStyle}>Approx VTRU price</td>
                  {YEARS.map((y, i) => (
                    <td key={y}>
                      <div className="input-group input-group-sm ms-auto flex-nowrap" style={{ maxWidth: 110 }}>
                        <span className="input-group-text bg-dark text-white-50 border-secondary">$</span>
                        <input
                          type="number"
                          min={0}
                          step={0.01}
                          className={`${inputClass} text-end`}
                          value={price[i]}
                          onChange={(e) => setYearValue(setPrice, price, i)(e.target.value)}
                          aria-label={`VTRU price ${y}`}
                        />
                      </div>
                    </td>
                  ))}
                  <td className="text-white-50">—</td>
                </tr>
                <tr>
                  <td className="text-start text-white-50" style={labelStyle}>Expenses</td>
                  {years.map((y) => <td key={y.year}>{money(y.expenses)}</td>)}
                  <td>{money(total.expenses)}</td>
                </tr>
                <tr>
                  <td className="text-start text-white-50" style={labelStyle}>Income</td>
                  {years.map((y) => <td key={y.year}>{money(y.income)}</td>)}
                  <td>{money(total.income)}</td>
                </tr>
                <tr>
                  <td className="text-start text-white-50" style={labelStyle}>Profit (Loss)</td>
                  {years.map((y) => (
                    <td key={y.year} className={profitClass(y.profit)} style={profitStyle(y.profit)}>
                      {money(y.profit)}
                    </td>
                  ))}
                  <td className={profitClass(total.profit)} style={profitStyle(total.profit)}>
                    {money(total.profit)}
                  </td>
                </tr>
                <tr>
                  <td className="text-start text-white-50" style={labelStyle}>ROI</td>
                  {years.map((y) => (
                    <td key={y.year} className="fw-semibold" style={roiStyle}>
                      {roi(y.profit, y.expenses)}
                    </td>
                  ))}
                  <td className="fw-semibold" style={roiStyle}>
                    {roi(total.profit, total.expenses)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-white-50 mt-4 mb-0 text-center" style={{ fontSize: '0.75rem' }}>
            Projection only — assumes even block distribution and full payment (Active status).
            Actual rewards vary with uptime and rotation; VTRU prices are hypothetical.
          </p>
        </div>
      </div>
    </div>
  );
}
