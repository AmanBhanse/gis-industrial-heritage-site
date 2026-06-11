import { useState } from 'react'
import { createPortal } from 'react-dom'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { getCategoryColor, getCategoryLabel } from '../utils/markerIcons'
import { getFilterStats } from '../hooks/useFilteredSites'
import { MapPin, Filter, Route, X, Search, ArrowLeft, Clock, Tag, Activity, Navigation, Info } from 'lucide-react'

const D = {
  bg:      '#131929',
  surface: '#1b2336',
  hover:   '#22304a',
  border:  '#283448',
  text:    '#e2e8f0',
  muted:   '#7a8499',
  input:   '#1a2540',
}

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
  const [dialogSite, setDialogSite] = useState(null)

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

  // Sculptures filtered by search + active category filter
  const visibleSculptures = showSculptures
    ? sculptures.filter((s) => {
        const matchesCategory =
          sculptureCategories.length === 0 || sculptureCategories.includes(s.category)
        if (!matchesCategory) return false
        if (!searchTerm) return true
        const q = searchTerm.toLowerCase()
        return (
          (s.name ?? '').toLowerCase().includes(q) ||
          (s.category ?? '').toLowerCase().includes(q) ||
          (s.artist ?? '').toLowerCase().includes(q)
        )
      })
    : []

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
    <>
      <div className="flex flex-col h-full" style={{ background: D.bg, color: D.text }}>
      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col flex-1 min-h-0">
        <TabsList
          className="w-full rounded-none h-12 p-0 gap-0"
          style={{ background: D.surface, borderBottom: `1px solid ${D.border}` }}
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
                color: activeTab === value ? '#60a5fa' : D.muted,
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

        {/* Sites list */}
        <TabsContent value="sites" className="flex-1 overflow-y-auto m-0 p-0 flex flex-col">
          {/* Search bar */}
          <div className="px-4 py-5 shrink-0" style={{ borderBottom: `1px solid ${D.border}` }}>
            <div className="relative flex items-center">
              <Search className="absolute left-2.5 size-4 pointer-events-none" style={{ color: D.muted }} />
              <input
                type="text"
                placeholder="Search sites..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  paddingLeft: '2rem',
                  paddingRight: searchTerm ? '1.75rem' : '0.625rem',
                  background: D.input,
                  border: `1px solid ${D.border}`,
                  color: D.text,
                }}
                className="h-9 w-full rounded-lg py-2 text-sm outline-none transition-colors"
              />
              {searchTerm && (
                <button onClick={() => setSearchTerm('')} className="absolute right-2" style={{ color: D.muted }}>
                  <X className="size-3.5" />
                </button>
              )}
            </div>
          </div>
          
          <ul className="flex-1 overflow-y-auto">
            {/* Heritage sites */}
            {searchedSites.length > 0 && (
              <>
                <li className="px-4 py-1.5 sticky top-0" style={{ background: D.surface, borderBottom: `1px solid ${D.border}` }}>
                  <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#60a5fa' }}>Heritage Sites</span>
                </li>
                {searchedSites.map((site) => {
                  const isSelected = selectedSite?.id === site.id
                  const color = getCategoryColor(site.category)
                  return (
                    <li key={site.id} style={{ borderBottom: `1px solid ${D.border}` }}>
                      <div
                        className="flex items-center pr-2"
                        style={{
                          background: isSelected ? `${color}18` : 'transparent',
                          borderLeft: isSelected ? `3px solid ${color}` : '3px solid transparent',
                          transition: 'all 0.15s',
                        }}
                        onMouseEnter={(e) => { if (!isSelected) e.currentTarget.style.background = D.hover }}
                        onMouseLeave={(e) => { if (!isSelected) e.currentTarget.style.background = isSelected ? `${color}18` : 'transparent' }}
                      >
                        <button
                          onClick={() => onSelectSite(site)}
                          className="flex-1 text-left px-4 py-3 flex items-center gap-3 min-w-0"
                          style={{ color: D.text }}
                        >
                          <span className="size-2.5 rounded-full shrink-0" style={{ backgroundColor: color, boxShadow: isSelected ? `0 0 0 3px ${color}33` : 'none' }} />
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-semibold truncate" style={{ color: isSelected ? color : D.text }}>{site.name}</p>
                            <p className="text-xs mt-0.5 truncate" style={{ color: D.muted }}>
                              {getCategoryLabel(site.category)}
                              {site.yearBuilt ? ` · ${site.yearBuilt}` : ''}
                              {site.status ? ` · ${site.status}` : ''}
                            </p>
                          </div>
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); setDialogSite(site) }}
                          className="shrink-0 p-1.5 rounded-md transition-all"
                          style={{ color: D.muted }}
                          onMouseEnter={(e) => { e.currentTarget.style.color = '#60a5fa'; e.currentTarget.style.background = '#60a5fa18' }}
                          onMouseLeave={(e) => { e.currentTarget.style.color = D.muted; e.currentTarget.style.background = 'transparent' }}
                          title="Site info"
                          aria-label={`Info for ${site.name}`}
                        >
                          <Info className="size-3.5" />
                        </button>
                      </div>
                    </li>
                  )
                })}
              </>
            )}

            {/* Sculptures */}
            {visibleSculptures.length > 0 && (
              <>
                <li className="px-4 py-1.5 sticky top-0" style={{ background: D.surface, borderBottom: `1px solid ${D.border}` }}>
                  <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#a78bfa' }}>Public Art</span>
                </li>
                {visibleSculptures.map((s) => {
                  const isSelected = selectedSculptureId === s.id
                  return (
                    <li key={s.id} style={{ borderBottom: `1px solid ${D.border}` }}>
                      <button
                        onClick={() => {
                          setSelectedSculptureId(s.id)
                          onSelectSculpture(s)
                        }}
                        className="w-full text-left px-4 py-3 flex items-center gap-3 transition-all"
                        style={{
                          background: isSelected ? '#7c3aed18' : 'transparent',
                          borderLeft: isSelected ? '3px solid #a78bfa' : '3px solid transparent',
                          color: D.text,
                        }}
                        onMouseEnter={(e) => { if (!isSelected) e.currentTarget.style.background = D.hover }}
                        onMouseLeave={(e) => { if (!isSelected) e.currentTarget.style.background = 'transparent' }}
                      >
                        <span className="size-2.5 rounded-full shrink-0" style={{ backgroundColor: '#a78bfa', boxShadow: isSelected ? '0 0 0 3px #a78bfa33' : 'none' }} />
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold truncate" style={{ color: isSelected ? '#a78bfa' : D.text }}>{s.name || '(unnamed)'}</p>
                          <p className="text-xs mt-0.5 truncate" style={{ color: D.muted }}>
                            {s.category || 'Skulptur'}
                            {s.artist ? ` · ${s.artist}` : ''}
                            {s.year ? ` · ${s.year}` : ''}
                          </p>
                        </div>
                        {isSelected && <span className="size-1.5 rounded-full shrink-0" style={{ backgroundColor: '#a78bfa' }} />}
                      </button>
                    </li>
                  )
                })}
              </>
            )}

            {searchedSites.length === 0 && visibleSculptures.length === 0 && (
              <li className="p-6 text-center text-sm" style={{ color: D.muted }}>No sites found</li>
            )}
          </ul>
        </TabsContent>

        {/* Filters */}
        <TabsContent value="filters" className="flex-1 overflow-y-auto m-0 p-0 flex flex-col">
          {/* Filter header with stats and clear button */}
          {hasActiveFilters && (
            <div className="px-4 py-4 shrink-0" style={{ borderBottom: `1px solid ${D.border}` }}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium" style={{ color: D.text }}>{stats.filtered} of {stats.total} sites</span>
                <button onClick={resetFilters} className="text-xs text-red-400 hover:text-red-300 font-medium">Clear filters</button>
              </div>
            </div>
          )}
          <div className="p-6 pl-8 space-y-8 flex-1 overflow-y-auto">
            <FilterGroup title="Category" items={categories} selected={filters.categories || []}
              onToggle={(v) => toggleFilter('categories', v)} renderLabel={(c) => getCategoryLabel(c)} renderDot={(c) => getCategoryColor(c)} />
            <FilterGroup title="Era" items={eras} selected={filters.eras || []}
              onToggle={(v) => toggleFilter('eras', v)} />
            <FilterGroup title="Status" items={statuses} selected={filters.statuses || []}
              onToggle={(v) => toggleFilter('statuses', v)} renderLabel={(s) => s.charAt(0).toUpperCase() + s.slice(1)} />

            {/* Public Art overlay */}
            <div className="pb-2">
              <p className="text-xs font-bold uppercase tracking-widest mb-4 pl-4" style={{ color: '#a78bfa' }}>
                Public Art
              </p>
              {/* Show / hide toggle */}
              <div
                className="flex items-center justify-between px-3.5 py-2.5 rounded-lg mb-2"
                style={{ background: showSculptures ? '#7c3aed22' : 'transparent', border: showSculptures ? '1.5px solid #7c3aed55' : '1.5px solid transparent' }}
              >
                <span className="text-sm font-medium" style={{ color: showSculptures ? '#a78bfa' : '#c8d0de' }}>Show sculptures</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" checked={showSculptures} onChange={(e) => onSculpturesToggle(e.target.checked)} />
                  <div className="w-9 h-5 rounded-full transition-all relative" style={{ background: showSculptures ? '#7c3aed' : D.border }}>
                    <div className="absolute top-[2px] left-[2px] size-4 rounded-full bg-white transition-transform" style={{ transform: showSculptures ? 'translateX(16px)' : 'none' }} />
                  </div>
                </label>
              </div>
              {/* Category filter — only visible when layer is on */}
              {showSculptures && (
                <div className="mt-3 space-y-2">
                  {['Skulptur', 'Denkmal', 'Brunnen', 'Relief', 'Plastik'].map((cat) => {
                    const active = sculptureCategories.includes(cat)
                    return (
                      <button
                        key={cat}
                        onClick={() => {
                          const next = active
                            ? sculptureCategories.filter((c) => c !== cat)
                            : [...sculptureCategories, cat]
                          onSculptureCategoriesChange(next)
                        }}
                        className="w-full flex items-center gap-3 px-3.5 py-2 rounded-lg text-sm font-medium transition-all"
                        style={{
                          background: active ? '#7c3aed22' : 'transparent',
                          color: active ? '#a78bfa' : '#c8d0de',
                          border: active ? '1.5px solid #7c3aed55' : '1.5px solid transparent',
                        }}
                        onMouseEnter={(e) => { if (!active) { e.currentTarget.style.background = D.surface; e.currentTarget.style.borderColor = D.border } }}
                        onMouseLeave={(e) => { if (!active) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'transparent' } }}
                      >
                        <span className="size-3 rounded-full shrink-0" style={{ backgroundColor: '#a78bfa' }} />
                        {cat}
                      </button>
                    )
                  })}
                  <p className="text-xs pl-4 pt-1" style={{ color: D.muted }}>Empty selection = show all types</p>
                </div>
              )}
            </div>
          </div>
        </TabsContent>

        {/* Tour */}
        <TabsContent value="route" className="flex-1 overflow-y-auto m-0 p-0">
          <div className="p-4 space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium" style={{ color: D.text }}>Walking Tour</p>
                <p className="text-xs mt-0.5" style={{ color: D.muted }}>Heritage trail through Kaiserslautern</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" checked={showRoute} onChange={(e) => onRouteToggle(e.target.checked)} />
                <div
                  className="w-9 h-5 rounded-full transition-all relative"
                  style={{ background: showRoute ? '#3b82f6' : D.border }}
                >
                  <div
                    className="absolute top-[2px] left-[2px] size-4 rounded-full bg-white transition-transform"
                    style={{ transform: showRoute ? 'translateX(16px)' : 'none' }}
                  />
                </div>
              </label>
            </div>
            {showRoute && (
              <div className="rounded-lg p-3 text-xs space-y-1" style={{ background: D.surface, border: `1px solid ${D.border}`, color: D.muted }}>
                <p className="font-semibold" style={{ color: D.text }}>Route info</p>
                <p>Numbered markers on the map show the walking tour sequence.</p>
                <p>Follow the dashed line connecting each heritage site.</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>

    {/* Site detail dialog portal */}
    {dialogSite && createPortal(
      <SiteDetailDialog site={dialogSite} onClose={() => setDialogSite(null)} />,
      document.body
    )}
  </>
  )
}

/* ── Filter group ── */
function FilterGroup({ title, items, selected, onToggle, renderLabel, renderDot }) {
  return (
    <div className="pb-2">
      <p className="text-xs font-bold uppercase tracking-widest mb-4 pl-4" style={{ color: '#60a5fa' }}>
        {title}
      </p>
      <div className="space-y-2.5">
        {items.map((item) => {
          const active = selected.includes(item)
          return (
            <button
              key={item}
              onClick={() => onToggle(item)}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all"
              style={{
                background: active ? '#2563eb33' : 'transparent',
                color: active ? '#60a5fa' : '#c8d0de',
                border: active ? '1.5px solid #2563eb66' : '1.5px solid transparent',
              }}
              onMouseEnter={(e) => { 
                if (!active) {
                  e.currentTarget.style.background = '#1b2336'
                  e.currentTarget.style.borderColor = '#283448'
                }
              }}
              onMouseLeave={(e) => { 
                if (!active) {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.borderColor = 'transparent'
                }
              }}
            >
              {renderDot && (
                <span className="size-3 rounded-full shrink-0" style={{ backgroundColor: renderDot(item) }} />
              )}
              <span>{renderLabel ? renderLabel(item) : item}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

/* ── Site detail dialog ── */
function SiteDetailDialog({ site, onClose }) {
  const color = getCategoryColor(site.category)
  const categoryLabel = getCategoryLabel(site.category)
  const statusColors = {
    active:    { bg: '#052e1633', text: '#4ade80', border: '#4ade8033' },
    converted: { bg: '#1e3a5f33', text: '#60a5fa', border: '#60a5fa33' },
    abandoned: { bg: '#3d1f0433', text: '#fb923c', border: '#fb923c33' },
    museum:    { bg: '#2d1b6933', text: '#c084fc', border: '#c084fc33' },
  }
  const sc = statusColors[site.status] || { bg: '#1e253533', text: '#8892a4', border: '#2a334833' }

  return (
    <div
      className="fixed inset-0 flex items-end sm:items-center justify-center p-4"
      style={{ zIndex: 9999, background: 'rgba(5,10,20,0.6)', backdropFilter: 'blur(5px)' }}
      onClick={onClose}
    >
      <div
        className="relative flex flex-col w-full rounded-2xl p-4"
        style={{
          background: '#0b1322',
          border: `1px solid #3b4b63`,
          boxShadow: '0 24px 70px rgba(0,0,0,0.55)',
          maxWidth: '560px',
          maxHeight: '88vh',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="rounded-xl overflow-hidden"
          style={{ background: '#0f172a', border: '1px solid #243248' }}
        >
        {/* Header */}
        <div className="px-8 pt-7 pb-5" style={{ borderBottom: `1px solid #273245` }}>
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">

              <h2 className="text-[1.85rem] font-extrabold leading-tight" style={{ color: '#f8fafc' }}>{site.name}</h2>
            </div>
            <button
              onClick={onClose}
              className="shrink-0 mt-0.5 p-2 rounded-xl transition-all"
              style={{ color: D.muted, background: '#162033' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = D.text; e.currentTarget.style.background = D.hover }}
              onMouseLeave={(e) => { e.currentTarget.style.color = D.muted; e.currentTarget.style.background = '#162033' }}
              aria-label="Close"
            >
              <X className="size-4" />
            </button>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-2 mt-4">
            <span
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full"
              style={{ background: color + '1c', color }}
            >
              <span className="size-1.5 rounded-full" style={{ background: color }} />
              {categoryLabel}
            </span>
            <span
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full capitalize"
              style={{ background: sc.bg, color: sc.text }}
            >
              {site.status}
            </span>
          </div>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-8 py-6" style={{ color: D.text }}>

          {/* Key facts */}
          <div className="grid grid-cols-3 gap-4 pb-5" style={{ borderBottom: '1px solid #273245' }}>
            {[
              { label: 'Built',  value: site.yearBuilt || '—' },
              { label: 'Era',    value: site.era || '—' },
              { label: 'Coords', value: site.lat ? `${site.lat.toFixed(3)}, ${site.lng.toFixed(3)}` : '—' },
            ].map(({ label, value }) => (
              <div key={label} className="text-center">
                <p className="text-[11px] font-semibold uppercase tracking-wider mb-1" style={{ color: '#8ea0bc' }}>{label}</p>
                <p className="text-lg font-bold leading-tight" style={{ color: '#f1f5f9' }}>{value}</p>
              </div>
            ))}
          </div>

          {/* Images */}
          {site.images?.length > 0 && (
            <div className="pt-5 pb-5" style={{ borderBottom: '1px solid #273245' }}>
              <div className="flex gap-3 overflow-x-auto pb-1">
                {site.images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`${site.name} ${i + 1}`}
                    className="shrink-0 object-cover rounded-lg"
                    style={{
                      height: 136,
                      width: site.images.length === 1 ? '100%' : 200,
                      border: '1px solid #334155',
                    }}
                    onError={(e) => { e.target.style.display = 'none' }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Description */}
          {site.description && (
            <div className="pt-5 pb-5" style={{ borderBottom: '1px solid #273245' }}>
              <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: D.muted }}>
                History
              </p>
              <p className="text-[1.06rem] leading-8" style={{ color: '#d3deee' }}>{site.description}</p>
            </div>
          )}

          {/* Visitor info */}
          {site.additionalInfo && (
            <div className="pt-5 flex items-start gap-3">
              <Info className="size-4 shrink-0 mt-0.5" style={{ color }} />
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: '#8ea0bc' }}>Visitor Info</p>
                <p className="text-sm leading-relaxed" style={{ color: '#d3deee' }}>{site.additionalInfo}</p>
              </div>
            </div>
          )}
        </div>
        </div>
      </div>
    </div>
  )
}

/* ── Site detail panel ── */
function SiteDetailPanel({ site, onClose }) {
  const color = getCategoryColor(site.category)
  const categoryLabel = getCategoryLabel(site.category)

  const statusStyle = {
    active:    { bg: '#05603a22', text: '#34d399', border: '#34d39933' },
    converted: { bg: '#1d4ed822', text: '#60a5fa', border: '#60a5fa33' },
    abandoned: { bg: '#92400e22', text: '#fbbf24', border: '#fbbf2433' },
    museum:    { bg: '#6d28d922', text: '#c084fc', border: '#c084fc33' },
  }[site.status] || { bg: '#1e253533', text: '#8892a4', border: '#2a334833' }

  return (
    <div className="flex flex-col h-full" style={{ background: D.bg, color: D.text }}>
      {/* Hero */}
      <div
        className="px-6 pt-5 pb-6"
        style={{
          background: `linear-gradient(135deg, ${color}28 0%, ${D.surface} 100%)`,
          borderBottom: `2px solid ${color}`,
        }}
      >
        <button
          onClick={onClose}
          className="flex items-center gap-1.5 text-xs mb-3 transition-opacity hover:opacity-100 opacity-60"
          style={{ color: D.muted }}
        >
          <ArrowLeft className="size-4" />
          All sites
        </button>
        <h2 className="text-lg font-bold leading-tight" style={{ color: D.text }}>{site.name}</h2>
        <div className="flex flex-wrap gap-2.5 mt-4">
          <span
            className="inline-flex items-center gap-2 text-xs font-semibold px-3.5 py-2 rounded-full border-2"
            style={{ backgroundColor: color + '15', color, borderColor: color }}
          >
            <Tag className="size-3.5" />{categoryLabel}
          </span>
          <span
            className="inline-flex items-center text-xs font-semibold px-3.5 py-2 rounded-full border-2 capitalize"
            style={{ background: statusStyle.bg, color: statusStyle.text, borderColor: statusStyle.text }}
          >
            {site.status}
          </span>
        </div>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto">
        {/* Stats row */}
        <div className="grid grid-cols-3 px-6" style={{ borderBottom: `1px solid ${D.border}` }}>
          {[
            { value: site.yearBuilt,       label: 'Built' },
            { value: site.era,             label: 'Era' },
            { value: site.lat.toFixed(3),  label: site.lng.toFixed(3) },
          ].map(({ value, label }, i) => (
            <div
              key={i}
              className="flex flex-col py-5 px-3 gap-1.5 flex-1 text-center"
              style={{ borderRight: i < 2 ? `1px solid ${D.border}` : 'none' }}
            >
              <span className="text-xs uppercase tracking-wider font-semibold" style={{ color: D.muted }}>{label}</span>
              <span className="text-base font-bold" style={{ color: D.text }}>{value}</span>
            </div>
          ))}
        </div>

        {/* Images */}
        {site.images?.length > 0 && (
          <div className="flex gap-3 py-5 px-6 overflow-x-auto" style={{ borderBottom: `1px solid ${D.border}` }}>
            {site.images.map((img, i) => (
              <img
                key={i} src={img} alt={`${site.name} ${i + 1}`}
                className="h-28 w-44 shrink-0 object-cover rounded-xl"
                style={{ border: `1px solid ${D.border}` }}
                onError={(e) => { e.target.style.display = 'none' }}
              />
            ))}
          </div>
        )}

        {/* Description */}
        {site.description && (
          <div className="py-5 px-6" style={{ borderBottom: `1px solid ${D.border}` }}>
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: D.muted }}>History</p>
            <p className="text-sm leading-relaxed" style={{ color: '#c8d0de' }}>{site.description}</p>
          </div>
        )}

        {/* Visitor info */}
        {site.additionalInfo && (
          <div className="px-6 py-5">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: D.muted }}>Visitor Info</p>
            <div
              className="flex items-start gap-3 rounded-lg p-4"
              style={{ background: '#92400e1a', border: '1px solid #92400e55' }}
            >
              <span className="text-amber-400 text-lg mt-0.5 shrink-0">ℹ</span>
              <p className="text-sm leading-relaxed" style={{ color: '#fcd34d' }}>{site.additionalInfo}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AppSidebar
