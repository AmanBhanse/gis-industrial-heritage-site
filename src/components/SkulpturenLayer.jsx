import L from 'leaflet'
import { Marker, Popup } from 'react-leaflet'
import { Info } from 'lucide-react'

const SCULPTURE_COLOR = '#a78bfa'

function makeSculptureIcon() {
  const svg = `
    <svg width="36" height="36" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
      <circle cx="18" cy="18" r="16" fill="${SCULPTURE_COLOR}" stroke="white" stroke-width="2"/>
      <path d="M 18 34 L 22 24 Q 18 27 14 24 Z" fill="${SCULPTURE_COLOR}"/>
      <text x="18" y="22" font-size="17" text-anchor="middle" dominant-baseline="middle">🗿</text>
    </svg>`
  return L.icon({
    iconUrl: `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svg)))}`,
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -36],
  })
}

const sculptureIcon = makeSculptureIcon()

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
      icon={sculptureIcon}
      eventHandlers={{
        click: () => onSelectSculpture(s),
      }}
    >
      <Popup>
        <div style={{ minWidth: 180, fontSize: 13, color: '#e5eefb' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8, marginBottom: 6 }}>
            <strong style={{ fontSize: 14, lineHeight: 1.2, color: '#ffffff', textShadow: '0 1px 2px rgba(0,0,0,0.45)' }}>{s.name || '(unnamed)'}</strong>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                onOpenSculptureDetails(s)
              }}
              aria-label={`Open details for ${s.name || 'public art item'}`}
              title="Open public art details"
              style={{
                width: 28,
                height: 28,
                flex: '0 0 auto',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 0,
                borderRadius: 999,
                border: '1px solid rgba(167, 139, 250, 0.2)',
                background: 'rgba(167, 139, 250, 0.1)',
                color: '#93c5fd',
                cursor: 'pointer',
              }}
            >
              <Info size={14} />
            </button>
          </div>
          {s.artist   && <p style={{ margin: '4px 0 0', color: '#e5eefb', textShadow: '0 1px 1px rgba(0,0,0,0.28)' }}>🎨 {s.artist}</p>}
          {s.year     && <p style={{ margin: '2px 0 0', color: '#e5eefb', textShadow: '0 1px 1px rgba(0,0,0,0.28)' }}>📅 {s.year}</p>}
          {s.location && <p style={{ margin: '2px 0 0', color: '#e5eefb', textShadow: '0 1px 1px rgba(0,0,0,0.28)' }}>📍 {s.location}</p>}
          {s.category && (
            <p style={{ margin: '4px 0 0' }}>
              <span style={{
                display: 'inline-block',
                background: '#a78bfa22',
                color: '#ddd6fe',
                border: '1px solid #a78bfa75',
                borderRadius: 4,
                padding: '1px 6px',
                fontSize: 11,
                fontWeight: 600,
              }}>{s.category}</span>
            </p>
          )}
          <p style={{ margin: '4px 0 0', fontSize: 11, color: '#a8b6c9', textShadow: '0 1px 1px rgba(0,0,0,0.2)' }}>Quelle: Geoportal Kaiserslautern</p>
        </div>
      </Popup>
    </Marker>
  ))
}

export default SkulpturenLayer
