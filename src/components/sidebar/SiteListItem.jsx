import { Info } from 'lucide-react'
import { getCategoryColor, getCategoryLabel } from '../../utils/markerIcons'
import { SIDEBAR_THEME } from './SidebarConstants'

function SiteListItem({ site, isSelected, onSelectSite, onOpenSiteDetails }) {
  const color = getCategoryColor(site.category)

  return (
    <li style={{ borderBottom: `1px solid ${SIDEBAR_THEME.border}` }}>
      <div
        className="flex items-center pr-2"
        style={{
          background: isSelected ? `${color}18` : 'transparent',
          borderLeft: isSelected ? `3px solid ${color}` : '3px solid transparent',
          transition: 'all 0.15s',
        }}
        onMouseEnter={(e) => {
          if (!isSelected) e.currentTarget.style.background = SIDEBAR_THEME.hover
        }}
        onMouseLeave={(e) => {
          if (!isSelected) e.currentTarget.style.background = isSelected ? `${color}18` : 'transparent'
        }}
      >
        <button
          onClick={() => onSelectSite(site)}
          className="flex min-w-0 flex-1 items-center gap-3 px-4 py-3 text-left"
          style={{ color: SIDEBAR_THEME.text }}
        >
          <span
            className="size-2.5 shrink-0 rounded-full"
            style={{ backgroundColor: color, boxShadow: isSelected ? `0 0 0 3px ${color}33` : 'none' }}
          />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold" style={{ color: isSelected ? color : SIDEBAR_THEME.text }}>
              {site.name}
            </p>
            <p className="mt-0.5 truncate text-xs" style={{ color: SIDEBAR_THEME.muted }}>
              {getCategoryLabel(site.category)}
              {site.yearBuilt ? ` · ${site.yearBuilt}` : ''}
              {site.status ? ` · ${site.status}` : ''}
            </p>
          </div>
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation()
            onOpenSiteDetails(site)
          }}
          className="shrink-0 rounded-md p-1.5 transition-all"
          style={{ color: SIDEBAR_THEME.muted }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#60a5fa'
            e.currentTarget.style.background = '#60a5fa18'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = SIDEBAR_THEME.muted
            e.currentTarget.style.background = 'transparent'
          }}
          title="Site info"
          aria-label={`Info for ${site.name}`}
        >
          <Info className="size-3.5" />
        </button>
      </div>
    </li>
  )
}

export default SiteListItem
