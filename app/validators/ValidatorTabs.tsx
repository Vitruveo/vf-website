'use client';

import { useState } from 'react';
import NodeBenefits from './NodeBenefits';
import SeatingChart from './SeatingChart';
import NodeCalculator from './NodeCalculator';

const TABS = [
  { key: 'rejoin', label: 'Node Rejoining' },
  { key: 'calc', label: 'Node Calculator' },
  { key: 'benefits', label: 'Node Benefits' },
] as const;

type TabKey = (typeof TABS)[number]['key'];

export default function ValidatorTabs() {
  const [tab, setTab] = useState<TabKey>('rejoin');

  return (
    <div>
      <div className="d-flex justify-content-center mb-4">
        <div className="btn-group" role="tablist">
          {TABS.map((t) => (
            <button
              key={t.key}
              type="button"
              role="tab"
              aria-selected={tab === t.key}
              className={`btn px-4 ${tab === t.key ? 'btn-green' : 'btn-outline-light'}`}
              onClick={() => setTab(t.key)}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* All tabs stay mounted so the seating chart keeps its wallet state and
          contract polling while another tab is open. */}
      <div className={tab === 'benefits' ? undefined : 'd-none'}>
        <NodeBenefits />
      </div>
      <div className={tab === 'rejoin' ? undefined : 'd-none'}>
        <SeatingChart />
      </div>
      <div className={tab === 'calc' ? undefined : 'd-none'}>
        <NodeCalculator />
      </div>
    </div>
  );
}
