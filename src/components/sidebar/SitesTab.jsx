import { TabsContent } from '@/components/ui/tabs'
import { Search, X } from 'lucide-react'
import SculptureListItem from './SculptureListItem'
import SiteListItem from './SiteListItem'
import { SIDEBAR_THEME } from './SidebarConstants'

function SitesTab({
  searchTerm,
  onSearchTermChange,
  searchedSites,
  visibleSculptures,
  selectedSite,
  selectedSculptureId,
  onSelectSite,
  onSelectSculpture,
  onOpenSiteDetails,
  onOpenSculptureDetails,
}) {
  return (
    <TabsContent value="sites" className="m-0 flex flex-1 flex-col overflow-y-auto p-0">
      <div className="shrink-0 px-4 py-5" style={{ borderBottom: `1px solid ${SIDEBAR_THEME.border}` }}>
        <div className="relative flex items-center">
          <Search className="pointer-events-none absolute left-2.5 size-4" style={{ color: SIDEBAR_THEME.muted }} />
          <input
            type="text"
            placeholder="Search sites..."
            value={searchTerm}
            onChange={(e) => onSearchTermChange(e.target.value)}
            style={{
              paddingLeft: '2rem',
              paddingRight: searchTerm ? '1.75rem' : '0.625rem',
              background: SIDEBAR_THEME.input,
              border: `1px solid ${SIDEBAR_THEME.border}`,
              color: SIDEBAR_THEME.text,
            }}
            className="h-9 w-full rounded-lg py-2 text-sm outline-none transition-colors"
          />
          {searchTerm && (
            <button
              onClick={() => onSearchTermChange('')}
              className="absolute right-2"
              style={{ color: SIDEBAR_THEME.muted }}
            >
              <X className="size-3.5" />
            </button>
          )}
        </div>
      </div>

      <ul className="flex-1 overflow-y-auto">
        {searchedSites.length > 0 && (
          <>
            <li
              className="sticky top-0 px-4 py-1.5"
              style={{ background: SIDEBAR_THEME.surface, borderBottom: `1px solid ${SIDEBAR_THEME.border}` }}
            >
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#60a5fa' }}>
                Heritage Sites
              </span>
            </li>
            {searchedSites.map((site) => (
              <SiteListItem
                key={site.id}
                site={site}
                isSelected={selectedSite?.id === site.id}
                onSelectSite={onSelectSite}
                onOpenSiteDetails={onOpenSiteDetails}
              />
            ))}
          </>
        )}

        {visibleSculptures.length > 0 && (
          <>
            <li
              className="sticky top-0 px-4 py-1.5"
              style={{ background: SIDEBAR_THEME.surface, borderBottom: `1px solid ${SIDEBAR_THEME.border}` }}
            >
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#a78bfa' }}>
                Public Art
              </span>
            </li>
            {visibleSculptures.map((sculpture) => (
              <SculptureListItem
                key={sculpture.id}
                sculpture={sculpture}
                isSelected={selectedSculptureId === sculpture.id}
                onSelectSculpture={onSelectSculpture}
                onOpenSculptureDetails={onOpenSculptureDetails}
              />
            ))}
          </>
        )}

        {searchedSites.length === 0 && visibleSculptures.length === 0 && (
          <li className="p-6 text-center text-sm" style={{ color: SIDEBAR_THEME.muted }}>
            No sites found
          </li>
        )}
      </ul>
    </TabsContent>
  )
}

export default SitesTab
