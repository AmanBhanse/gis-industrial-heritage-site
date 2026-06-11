import { Info } from 'lucide-react'
import { SIDEBAR_THEME } from './SidebarConstants'

function SculptureListItem({
  sculpture,
  isSelected,
  onSelectSculpture,
  onOpenSculptureDetails,
}) {
  return (
    <li style={{ borderBottom: `1px solid ${SIDEBAR_THEME.border}` }}>
      <div
        className="flex items-center px-4 py-3 transition-all"
        style={{
          background: isSelected ? '#7c3aed18' : 'transparent',
          borderLeft: isSelected ? '3px solid #a78bfa' : '3px solid transparent',
          color: SIDEBAR_THEME.text,
        }}
        onMouseEnter={(e) => {
          if (!isSelected) e.currentTarget.style.background = SIDEBAR_THEME.hover
        }}
        onMouseLeave={(e) => {
          if (!isSelected) e.currentTarget.style.background = 'transparent'
        }}
      >
        <button
          onClick={() => onSelectSculpture(sculpture)}
          className="flex min-w-0 flex-1 items-center gap-3 text-left"
          style={{ color: SIDEBAR_THEME.text }}
        >
          <span
            className="size-2.5 shrink-0 rounded-full"
            style={{ backgroundColor: '#a78bfa', boxShadow: isSelected ? '0 0 0 3px #a78bfa33' : 'none' }}
          />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold" style={{ color: isSelected ? '#a78bfa' : SIDEBAR_THEME.text }}>
              {sculpture.name || '(unnamed)'}
            </p>
            <p className="mt-0.5 truncate text-xs" style={{ color: SIDEBAR_THEME.muted }}>
              {sculpture.category || 'Skulptur'}
              {sculpture.artist ? ` · ${sculpture.artist}` : ''}
              {sculpture.year ? ` · ${sculpture.year}` : ''}
            </p>
          </div>
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation()
            onOpenSculptureDetails(sculpture)
          }}
          className="shrink-0 rounded-md p-1.5 transition-all"
          style={{ color: SIDEBAR_THEME.muted }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#a78bfa'
            e.currentTarget.style.background = '#a78bfa18'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = SIDEBAR_THEME.muted
            e.currentTarget.style.background = 'transparent'
          }}
          title="Public art info"
          aria-label={`Info for ${sculpture.name || 'public art item'}`}
        >
          <Info className="size-3.5" />
        </button>
        {isSelected && <span className="ml-2 size-1.5 shrink-0 rounded-full" style={{ backgroundColor: '#a78bfa' }} />}
      </div>
    </li>
  )
}

export default SculptureListItem
