import { Info, X } from 'lucide-react'
import { DETAIL_THEME, getSculptureImageUrl, SIDEBAR_THEME } from './SidebarConstants'

function SculptureDetailDialog({ sculpture, onClose }) {
  const imageUrl = getSculptureImageUrl(sculpture.photo)

  return (
    <div
      className="fixed inset-0 flex items-end justify-center p-4 sm:items-center"
      style={{ zIndex: 9999, background: 'rgba(5,10,20,0.6)', backdropFilter: 'blur(5px)' }}
      onClick={onClose}
    >
      <div
        className="relative flex max-h-[88vh] w-full max-w-[520px] flex-col rounded-2xl p-4"
        style={{
          background: DETAIL_THEME.panel,
          border: `1px solid ${DETAIL_THEME.border}`,
          boxShadow: '0 24px 70px rgba(0,0,0,0.55)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="overflow-hidden rounded-xl"
          style={{ background: DETAIL_THEME.panelAlt, border: `1px solid ${DETAIL_THEME.border}` }}
        >
          <div className="px-8 pb-5 pt-7" style={{ borderBottom: `1px solid ${DETAIL_THEME.border}` }}>
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h2
                  className="text-[1.85rem] font-extrabold leading-tight"
                  style={{ color: DETAIL_THEME.title, textShadow: '0 1px 2px rgba(0,0,0,0.45)' }}
                >
                  {sculpture.name || '(unnamed)'}
                </h2>
                <p className="mt-2 text-sm" style={{ color: DETAIL_THEME.muted }}>
                  Public art details
                </p>
              </div>
              <button
                onClick={onClose}
                className="mt-0.5 shrink-0 rounded-xl p-2 transition-all"
                style={{ color: SIDEBAR_THEME.muted, background: '#162033' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = SIDEBAR_THEME.text
                  e.currentTarget.style.background = SIDEBAR_THEME.hover
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = SIDEBAR_THEME.muted
                  e.currentTarget.style.background = '#162033'
                }}
                aria-label="Close"
              >
                <X className="size-4" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-8 py-6" style={{ color: DETAIL_THEME.body }}>
            <div className="grid grid-cols-3 gap-4 pb-5" style={{ borderBottom: `1px solid ${DETAIL_THEME.border}` }}>
              {[
                { label: 'Artist', value: sculpture.artist || '—' },
                { label: 'Year', value: sculpture.year || '—' },
                { label: 'Coords', value: sculpture.lat ? `${sculpture.lat.toFixed(3)}, ${sculpture.lng.toFixed(3)}` : '—' },
              ].map(({ label, value }) => (
                <div key={label} className="text-center">
                  <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider" style={{ color: DETAIL_THEME.muted }}>
                    {label}
                  </p>
                  <p
                    className="text-lg font-bold leading-tight"
                    style={{ color: DETAIL_THEME.title, textShadow: '0 1px 1px rgba(0,0,0,0.35)' }}
                  >
                    {value}
                  </p>
                </div>
              ))}
            </div>

            {imageUrl && (
              <div className="pb-5 pt-5" style={{ borderBottom: `1px solid ${DETAIL_THEME.border}` }}>
                <p className="mb-2 text-xs font-semibold uppercase tracking-widest" style={{ color: DETAIL_THEME.muted }}>
                  Image
                </p>
                <img
                  src={imageUrl}
                  alt={sculpture.name || 'Public art image'}
                  className="w-full rounded-xl object-cover"
                  style={{ maxHeight: 280, border: '1px solid #334155' }}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                  }}
                />
              </div>
            )}

            <div className="pb-5 pt-5" style={{ borderBottom: `1px solid ${DETAIL_THEME.border}` }}>
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest" style={{ color: DETAIL_THEME.muted }}>
                Location
              </p>
              <p
                className="text-[1.06rem] leading-8"
                style={{ color: DETAIL_THEME.body, textShadow: '0 1px 1px rgba(0,0,0,0.25)' }}
              >
                {sculpture.location || '—'}
              </p>
            </div>

            <div className="flex items-start gap-3 pt-5">
              <Info className="mt-0.5 size-4 shrink-0" style={{ color: '#a78bfa' }} />
              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-widest" style={{ color: DETAIL_THEME.muted }}>
                  Category
                </p>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: DETAIL_THEME.body, textShadow: '0 1px 1px rgba(0,0,0,0.25)' }}
                >
                  {sculpture.category || '—'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SculptureDetailDialog
