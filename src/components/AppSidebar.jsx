import { useState } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { getCategoryColor, getCategoryLabel } from '../utils/markerIcons'
import { getFilterStats } from '../hooks/useFilteredSites'
import { MapPin, Filter, Route, X, Search } from 'lucide-react'

function AppSidebar({
  sites = [],
  filteredSites = [],
  filters = {},
  onFilterChange = () => {},
  selectedSite = null,
  onSelectSite = () => {},
  onCloseSiteDetails = () => {},
  showRoute = false,
  onRouteToggle = () => {},
}) {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTab, setActiveTab] = useState('sites')

  const stats = getFilterStats(sites, filteredSites)
  const hasActiveFilters = Object.values(filters).some((arr) => arr?.length > 0)

  // Search within filtered sites
  const searchedSites = filteredSites.filter((site) => {
    if (!searchTerm) return true
    const q = searchTerm.toLowerCase()
    return (
      (site.name ?? '').toLowerCase().includes(q) ||
      (site.category ?? '').toLowerCase().includes(q)
    )
  })

  // Filter config
  const categories = ['factory', 'mine', 'warehouse', 'railway', 'settlement']
  const eras = ['1800s', '1900-1950', '1950+']
  const statuses = ['active', 'converted', 'abandoned', 'museum']

  const toggleFilter = (key, value) => {
    const arr = filters[key] || []
    const next = arr.includes(value)
      ? arr.filter((v) => v !== value)
      : [...arr, value]
    onFilterChange({ ...filters, [key]: next })
  }

  const resetFilters = () => {
    onFilterChange({ categories: [], eras: [], statuses: [] })
  }

  // If a site is selected, show its details
  if (selectedSite) {
    return <SiteDetailPanel site={selectedSite} onClose={onCloseSiteDetails} />
  }

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Search bar */}
      <div className="p-3 border-b border-gray-100">
        <div className="relative flex items-center">
          <Search className="absolute left-2.5 size-4 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            placeholder="Search sites..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ paddingLeft: '2rem', paddingRight: searchTerm ? '1.75rem' : '0.625rem' }}
            className="h-8 w-full rounded-lg border border-input bg-transparent py-1 text-sm outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 transition-colors"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-2 text-gray-400 hover:text-gray-600"
            >
              <X className="size-3.5" />
            </button>
          )}
        </div>
        {/* Status line */}
        <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
          <span>
            {hasActiveFilters
              ? `${stats.filtered} of ${stats.total} sites`
              : `${stats.total} sites`}
          </span>
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="text-red-500 hover:text-red-700 font-medium"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col flex-1 min-h-0">
        <TabsList className="w-full rounded-none border-b border-gray-100 bg-gray-50/50 h-10 p-0 gap-0">
          <TabsTrigger value="sites" className="flex-1 gap-1 rounded-none text-xs data-[state=active]:shadow-none">
            <MapPin className="size-3.5" />
            Sites
          </TabsTrigger>
          <TabsTrigger value="filters" className="flex-1 gap-1 rounded-none text-xs data-[state=active]:shadow-none">
            <Filter className="size-3.5" />
            Filters
            {hasActiveFilters && (
              <span className="size-1.5 rounded-full bg-blue-500" />
            )}
          </TabsTrigger>
          <TabsTrigger value="route" className="flex-1 gap-1 rounded-none text-xs data-[state=active]:shadow-none">
            <Route className="size-3.5" />
            Tour
          </TabsTrigger>
        </TabsList>

        {/* Sites list */}
        <TabsContent value="sites" className="flex-1 overflow-y-auto m-0 p-0">
          <ul className="divide-y divide-gray-50">
            {searchedSites.length > 0 ? (
              searchedSites.map((site) => (
                <li key={site.id}>
                  <button
                    onClick={() => onSelectSite(site)}
                    className="w-full text-left px-3 py-2.5 hover:bg-gray-50 transition-colors flex items-start gap-2.5"
                  >
                    <span
                      className="mt-1.5 size-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: getCategoryColor(site.category) }}
                    />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {site.name}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {getCategoryLabel(site.category)} · {site.yearBuilt} · {site.status}
                      </p>
                    </div>
                  </button>
                </li>
              ))
            ) : (
              <li className="p-6 text-center text-sm text-gray-400">
                No sites found
              </li>
            )}
          </ul>
        </TabsContent>

        {/* Filters */}
        <TabsContent value="filters" className="flex-1 overflow-y-auto m-0 p-0">
          <div className="p-3 space-y-4">
            <FilterGroup
              title="Category"
              items={categories}
              selected={filters.categories || []}
              onToggle={(v) => toggleFilter('categories', v)}
              renderLabel={(c) => getCategoryLabel(c)}
              renderDot={(c) => getCategoryColor(c)}
            />
            <FilterGroup
              title="Era"
              items={eras}
              selected={filters.eras || []}
              onToggle={(v) => toggleFilter('eras', v)}
            />
            <FilterGroup
              title="Status"
              items={statuses}
              selected={filters.statuses || []}
              onToggle={(v) => toggleFilter('statuses', v)}
              renderLabel={(s) => s.charAt(0).toUpperCase() + s.slice(1)}
            />
          </div>
        </TabsContent>

        {/* Route */}
        <TabsContent value="route" className="flex-1 overflow-y-auto m-0 p-0">
          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">Walking Tour</p>
                <p className="text-xs text-gray-500 mt-0.5">
                  Heritage trail through Kaiserslautern
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={showRoute}
                  onChange={(e) => onRouteToggle(e.target.checked)}
                />
                <div className="w-9 h-5 bg-gray-200 peer-focus:ring-2 peer-focus:ring-[#1a2332]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#1a2332]" />
              </label>
            </div>
            {showRoute && (
              <div className="bg-gray-50 rounded-lg p-3 text-xs text-gray-600 space-y-1">
                <p className="font-medium text-gray-900">Route info</p>
                <p>The numbered markers on the map show the walking tour sequence.</p>
                <p>Follow the dashed line connecting each heritage site.</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

/* ── Filter group sub-component ── */
function FilterGroup({ title, items, selected, onToggle, renderLabel, renderDot }) {
  return (
    <div>
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
        {title}
      </p>
      <div className="space-y-1">
        {items.map((item) => {
          const active = selected.includes(item)
          return (
            <button
              key={item}
              onClick={() => onToggle(item)}
              className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md text-sm transition-colors ${
                active
                  ? 'bg-[#1a2332] text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {renderDot && (
                <span
                  className="size-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: renderDot(item) }}
                />
              )}
              <span>{renderLabel ? renderLabel(item) : item}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

/* ── Site detail panel ── */
function SiteDetailPanel({ site, onClose }) {
  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header with close */}
      <div className="flex items-center justify-between px-3 py-2.5 border-b border-gray-100">
        <h2 className="text-sm font-semibold text-gray-900 truncate pr-2">
          {site.name}
        </h2>
        <button
          onClick={onClose}
          className="shrink-0 p-1 rounded-md hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors"
          aria-label="Close details"
        >
          <X className="size-4" />
        </button>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto">
        {/* Badges */}
        <div className="px-3 pt-3 flex gap-1.5 flex-wrap">
          <Badge
            variant="secondary"
            className="text-[11px]"
            style={{
              backgroundColor: getCategoryColor(site.category) + '20',
              color: getCategoryColor(site.category),
              borderColor: getCategoryColor(site.category) + '40',
            }}
          >
            {getCategoryLabel(site.category)}
          </Badge>
          <Badge variant="outline" className="text-[11px] capitalize">
            {site.status}
          </Badge>
          <Badge variant="outline" className="text-[11px]">
            {site.era}
          </Badge>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-2 gap-2 px-3 pt-3">
          <div className="bg-gray-50 rounded-lg p-2.5">
            <p className="text-[10px] text-gray-500 uppercase tracking-wider">Built</p>
            <p className="text-sm font-semibold text-gray-900">{site.yearBuilt}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-2.5">
            <p className="text-[10px] text-gray-500 uppercase tracking-wider">Location</p>
            <p className="text-sm font-semibold text-gray-900">
              {site.lat.toFixed(3)}, {site.lng.toFixed(3)}
            </p>
          </div>
        </div>

        {/* Description */}
        {site.description && (
          <div className="px-3 pt-3">
            <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">History</p>
            <p className="text-sm text-gray-700 leading-relaxed">{site.description}</p>
          </div>
        )}

        {/* Additional info */}
        {site.additionalInfo && (
          <div className="px-3 pt-3 pb-4">
            <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">
              Additional Info
            </p>
            <p className="text-sm text-gray-700 leading-relaxed">{site.additionalInfo}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default AppSidebar
