import { useState } from 'react'

const LEGEND_ITEMS = [
  {
    group: 'Heritage Sites',
    entries: [
      { label: 'Factory', stroke: '#8e44ad', path: <><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M7 7V3M17 7V3M2 11h20"/><rect x="4" y="13" width="3" height="5"/><rect x="10" y="13" width="3" height="5"/><rect x="16" y="13" width="3" height="5"/></> },
      { label: 'Mine', stroke: '#e67e22', path: <><path d="M17.2 9.9l-5.8 5.8"/><path d="M18.5 4a2.12 2.12 0 0 1 3 3L13 16.5"/><path d="M9.5 4a2.12 2.12 0 0 0-3 3l8.5 8.5"/><path d="M3 3v8a2 2 0 0 0 2 2h8"/></> },
      { label: 'Warehouse', stroke: '#3498db', path: <><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></> },
      { label: 'Railway', stroke: '#16a085', path: <><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="6" cy="19" r="2"/><circle cx="18" cy="19" r="2"/><path d="M2 9h20M6 6V4M18 6V4"/></> },
      { label: 'Settlement', stroke: '#27ae60', path: <><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></> },
    ],
  },
  {
    group: 'Public Art',
    entries: [
      { label: 'Skulptur', stroke: '#a78bfa', path: <><circle cx="12" cy="5" r="2"/><path d="M12 7v4M9 9h6M9 13h6M10 17h4M8 21h8"/></> },
      { label: 'Denkmal', stroke: '#c084fc', path: <><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/><path d="M9 12h0"/><path d="M15 12h0"/></> },
      { label: 'Brunnen', stroke: '#06b6d4', path: <><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/><circle cx="6.5" cy="13.5" r="1.5"/><circle cx="17.5" cy="10.5" r="1.5"/></> },
      { label: 'Relief', stroke: '#f97316', path: <><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></> },
      { label: 'Plastik', stroke: '#ec4899', path: <><path d="M12 3l1.9 5.8h6.1l-4.9 3.6 1.9 5.8-4.9-3.6-4.9 3.6 1.9-5.8-4.9-3.6h6.1z"/><path d="M3 21l2-5M20 7l2-5M6 12l-2-5M18 20l2-5"/></> },
    ],
  },
]

function LegendIcon({ stroke, path }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      className="shrink-0"
      style={{ fill: 'none', stroke, strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' }}
    >
      {path}
    </svg>
  )
}

function MapLegend() {
  const [open, setOpen] = useState(true)

  return (
    <div className="absolute bottom-[52px] left-2.5 z-[1000] min-w-[130px] max-h-[360px] overflow-y-auto rounded-lg border border-blue-400/20 bg-gray-900/95 p-1.5 text-[11px] text-white/90 shadow-xl backdrop-blur-sm [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:rounded [&::-webkit-scrollbar-track]:bg-blue-400/10 [&::-webkit-scrollbar-thumb]:rounded [&::-webkit-scrollbar-thumb]:bg-blue-400/30 [&::-webkit-scrollbar-thumb:hover]:bg-blue-400/50">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full cursor-pointer items-center gap-1.5 border-none bg-transparent py-0.5 text-[11px] font-semibold text-blue-400 hover:text-blue-300"
        aria-label={open ? 'Collapse legend' : 'Expand legend'}
      >
        <span>☰</span>
        <span>{open ? 'Hide legend' : 'Legend'}</span>
      </button>

      {open && LEGEND_ITEMS.map((section, i) => (
        <div key={section.group}>
          {i > 0 && <div className="my-2.5 h-px bg-blue-400/15" />}
          <div className="mb-2 mt-2.5 rounded bg-blue-400/8 px-1.5 py-1 text-center text-[10px] font-bold uppercase tracking-[0.14em] text-blue-400 first:mt-0">
            {section.group}
          </div>
          {section.entries.map((entry) => (
            <div key={entry.label} className="mb-1.5 flex items-center gap-2 last:mb-0">
              <LegendIcon stroke={entry.stroke} path={entry.path} />
              <span>{entry.label}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default MapLegend
