import L from 'leaflet'
import { Marker, Popup } from 'react-leaflet'
import { Info } from 'lucide-react'
import { createSculptureIcon, getSculptureColor } from '../utils/markerIcons'

/**
 * Renders public art / sculpture markers from the Kaiserslautern WFS.
 */
function SkulpturenLayer({ sculptures = [], activeCategories = [], onSelectSculpture = () => {}, onOpenSculptureDetails = () => {} }) {
  const visible =
    activeCategories.length === 0
      ? sculptures
      : sculptures.filter((s) => activeCategories.includes(s.category))

  return visible.map((s) => (
    <Marker
      key={s.id}
      position={[s.lat, s.lng]}
      icon={createSculptureIcon(s.category)}
      eventHandlers={{
        click: () => onSelectSculpture(s),
      }}
    >
      <Popup>
        <div className="w-60 p-4 pr-8">
          {/* Title */}
          <h3 className="mb-3 text-sm font-semibold leading-snug text-white">
            {s.name || '(unnamed)'}
          </h3>
          {/* Meta */}
          <div className="space-y-1.5 text-xs text-slate-300">
            {s.artist   && (
              <div className="flex items-center gap-2">
                <span className="text-base leading-none">🎨</span>
                <span>{s.artist}</span>
              </div>
            )}
            {s.year     && (
              <div className="flex items-center gap-2">
                <span className="text-base leading-none">📅</span>
                <span>{s.year}</span>
              </div>
            )}
            {s.location && (
              <div className="flex items-center gap-2">
                <span className="text-base leading-none">📍</span>
                <span>{s.location}</span>
              </div>
            )}
          </div>
          {/* Category badge */}
          {s.category && (
            <div className="mt-3">
              <span
                className="inline-block rounded px-2 py-0.5 text-[11px] font-semibold"
                style={{
                  background: `${getSculptureColor(s.category)}22`,
                  color: getSculptureColor(s.category),
                  border: `1px solid ${getSculptureColor(s.category)}75`,
                }}
              >
                {s.category}
              </span>
            </div>
          )}
          {/* Source + details button row */}
          <div className="mt-3 flex items-center justify-between gap-2">
            <span className="text-[11px] text-slate-500">Geoportal Kaiserslautern</span>
            <button
              type="button"
              className="flex cursor-pointer items-center gap-1 rounded-md border border-violet-500/30 bg-violet-500/10 px-2 py-1 text-[11px] font-medium text-violet-300 transition-colors hover:bg-violet-500/20 hover:text-violet-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-400"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                onOpenSculptureDetails(s)
              }}
              aria-label={`Open details for ${s.name || 'public art item'}`}
            >
              <Info size={11} />
              Details
            </button>
          </div>
        </div>
      </Popup>
    </Marker>
  ))
}

export default SkulpturenLayer
