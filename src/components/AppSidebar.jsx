import { useState } from 'react'
import { createPortal } from 'react-dom'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { getCategoryColor, getCategoryLabel } from '../utils/markerIcons'
import { MapPin, Filter, Route } from 'lucide-react'
import FiltersTab from './sidebar/FiltersTab'
import RouteTab from './sidebar/RouteTab'
import SiteDetailDialog from './sidebar/SiteDetailDialog'
import SitesTab from './sidebar/SitesTab'
import SculptureDetailDialog from './sidebar/SculptureDetailDialog'
import useSidebarData from './sidebar/useSidebarData'
import {
  SIDEBAR_THEME,
} from './sidebar/SidebarConstants'

function AppSidebar({
  sites = [],
  filteredSites = [],
  filters = {},
  onFilterChange = () => {},
  selectedSite = null,
  onSelectSite = () => {},
  dialogSite = null,
  onOpenSiteDetails = () => {},
  onCloseSiteDetails = () => {},
  dialogSculpture = null,
  onOpenSculptureDetails = () => {},
  onCloseSculptureDetails = () => {},
  showRoute = false,
  onRouteToggle = () => {},
  showSculptures = false,
  onSculpturesToggle = () => {},
  sculptureCategories = [],
  onSculptureCategoriesChange = () => {},
  sculptures = [],
  onSelectSculpture = () => {},
}) {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTab, setActiveTab] = useState('sites')
  const [selectedSculptureId, setSelectedSculptureId] = useState(null)

  const {
    hasActiveFilters,
    resetFilters,
    searchedSites,
    stats,
    toggleFilter,
    visibleSculptures,
  } = useSidebarData({
    sites,
    filteredSites,
    filters,
    onFilterChange,
    sculptures,
    showSculptures,
    sculptureCategories,
    searchTerm,
  })

  return (
    <>
      <div className="flex flex-col h-full" style={{ background: SIDEBAR_THEME.bg, color: SIDEBAR_THEME.text }}>
      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col flex-1 min-h-0">
        <TabsList
          className="w-full rounded-none h-12 p-0 gap-0"
          style={{ background: SIDEBAR_THEME.surface, borderBottom: `1px solid ${SIDEBAR_THEME.border}` }}
        >
          {[
            { value: 'sites',   icon: <MapPin className="size-3.5" />,  label: 'Sites' },
            { value: 'filters', icon: <Filter className="size-3.5" />, label: 'Filters' },
            { value: 'route',   icon: <Route className="size-3.5" />,   label: 'Tour' },
          ].map(({ value, icon, label }) => (
            <TabsTrigger
              key={value}
              value={value}
              className="flex-1 gap-1.5 rounded-none text-xs border-b-2 border-transparent data-[state=active]:shadow-none transition-colors py-3"
              style={{
                color: activeTab === value ? '#60a5fa' : SIDEBAR_THEME.muted,
                background: 'transparent',
                borderBottomColor: activeTab === value ? '#60a5fa' : 'transparent',
              }}
            >
              {icon}{label}
              {value === 'filters' && hasActiveFilters && (
                <span className="size-1.5 rounded-full bg-blue-400 ml-0.5" />
              )}
            </TabsTrigger>
          ))}
        </TabsList>

        <SitesTab
          searchTerm={searchTerm}
          onSearchTermChange={setSearchTerm}
          searchedSites={searchedSites}
          visibleSculptures={visibleSculptures}
          selectedSite={selectedSite}
          selectedSculptureId={selectedSculptureId}
          onSelectSite={onSelectSite}
          onSelectSculpture={(sculpture) => {
            setSelectedSculptureId(sculpture.id)
            onSelectSculpture(sculpture)
          }}
          onOpenSiteDetails={onOpenSiteDetails}
          onOpenSculptureDetails={onOpenSculptureDetails}
        />

        <FiltersTab
          hasActiveFilters={hasActiveFilters}
          stats={stats}
          resetFilters={resetFilters}
          filters={filters}
          onToggleFilter={toggleFilter}
          getCategoryLabel={getCategoryLabel}
          getCategoryColor={getCategoryColor}
          showSculptures={showSculptures}
          onSculpturesToggle={onSculpturesToggle}
          sculptureCategories={sculptureCategories}
          onSculptureCategoriesChange={onSculptureCategoriesChange}
        />

        <RouteTab showRoute={showRoute} onRouteToggle={onRouteToggle} />
      </Tabs>
    </div>

    {/* Site detail dialog portal */}
    {dialogSite && createPortal(
      <SiteDetailDialog site={dialogSite} onClose={onCloseSiteDetails} />,
      document.body
    )}

    {dialogSculpture && createPortal(
      <SculptureDetailDialog sculpture={dialogSculpture} onClose={onCloseSculptureDetails} />,
      document.body
    )}
  </>
  )
}

export default AppSidebar
