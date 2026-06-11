import { Info, X } from 'lucide-react'
import { getCategoryColor, getCategoryLabel } from '../../utils/markerIcons'
import { DETAIL_THEME, SIDEBAR_THEME, SITE_STATUS_COLORS } from './SidebarConstants'

function SiteDetailDialog({ site, onClose }) {
  const color = getCategoryColor(site.category)
  const categoryLabel = getCategoryLabel(site.category)
  const statusColors = SITE_STATUS_COLORS[site.status] || {
    bg: '#1e253533',
    text: '#8892a4',
    border: '#2a334833',
  }

  return (
    <div
      className="fixed inset-0 flex items-end justify-center p-4 sm:items-center"
      style={{ zIndex: 9999, background: 'rgba(5,10,20,0.6)', backdropFilter: 'blur(5px)' }}
      onClick={onClose}
    >
      <div
        className="relative flex max-h-[88vh] w-full max-w-[560px] flex-col rounded-2xl p-4"
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
                  {site.name}
                </h2>
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

            <div className="mt-4 flex flex-wrap gap-2">
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold"
                style={{ background: color + '22', color: DETAIL_THEME.title, border: `1px solid ${color}55` }}
              >
                <span className="size-1.5 rounded-full" style={{ background: color }} />
                {categoryLabel}
              </span>
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold capitalize"
                style={{ background: statusColors.bg, color: statusColors.text }}
              >
                {site.status}
              </span>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-8 py-6" style={{ color: DETAIL_THEME.body }}>
            <div className="grid grid-cols-3 gap-4 pb-5" style={{ borderBottom: `1px solid ${DETAIL_THEME.border}` }}>
              {[
                { label: 'Built', value: site.yearBuilt || '—' },
                { label: 'Era', value: site.era || '—' },
                { label: 'Coords', value: site.lat ? `${site.lat.toFixed(3)}, ${site.lng.toFixed(3)}` : '—' },
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

            {site.images?.length > 0 && (
              <div className="pb-5 pt-5" style={{ borderBottom: '1px solid #273245' }}>
                <div className="flex gap-3 overflow-x-auto pb-1">
                  {site.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${site.name} ${index + 1}`}
                      className="shrink-0 rounded-lg object-cover"
                      style={{
                        height: 136,
                        width: site.images.length === 1 ? '100%' : 200,
                        border: '1px solid #334155',
                      }}
                      onError={(e) => {
                        e.target.style.display = 'none'
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            {site.description && (
              <div className="pb-5 pt-5" style={{ borderBottom: `1px solid ${DETAIL_THEME.border}` }}>
                <p className="mb-2 text-xs font-semibold uppercase tracking-widest" style={{ color: DETAIL_THEME.muted }}>
                  History
                </p>
                <p
                  className="text-[1.06rem] leading-8"
                  style={{ color: DETAIL_THEME.body, textShadow: '0 1px 1px rgba(0,0,0,0.25)' }}
                >
                  {site.description}
                </p>
              </div>
            )}

            {site.additionalInfo && (
              <div className="flex items-start gap-3 pt-5">
                <Info className="mt-0.5 size-4 shrink-0" style={{ color }} />
                <div>
                  <p className="mb-1 text-xs font-semibold uppercase tracking-widest" style={{ color: DETAIL_THEME.muted }}>
                    Visitor Info
                  </p>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: DETAIL_THEME.body, textShadow: '0 1px 1px rgba(0,0,0,0.25)' }}
                  >
                    {site.additionalInfo}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SiteDetailDialog
