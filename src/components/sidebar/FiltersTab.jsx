import { TabsContent } from '@/components/ui/tabs'
import FilterGroup from './FilterGroup'
import { FILTER_OPTIONS, SIDEBAR_THEME } from './SidebarConstants'

function FiltersTab({
  hasActiveFilters,
  stats,
  resetFilters,
  filters,
  onToggleFilter,
  getCategoryLabel,
  getCategoryColor,
  showSculptures,
  onSculpturesToggle,
  sculptureCategories,
  onSculptureCategoriesChange,
}) {
  const { categories, eras, statuses } = FILTER_OPTIONS

  return (
    <TabsContent value="filters" className="m-0 flex flex-1 flex-col overflow-y-auto p-0">
      {hasActiveFilters && (
        <div className="shrink-0 px-4 py-4" style={{ borderBottom: `1px solid ${SIDEBAR_THEME.border}` }}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium" style={{ color: SIDEBAR_THEME.text }}>
              {stats.filtered} of {stats.total} sites
            </span>
            <button onClick={resetFilters} className="text-xs font-medium text-red-400 hover:text-red-300">
              Clear filters
            </button>
          </div>
        </div>
      )}

      <div className="flex-1 space-y-8 overflow-y-auto p-6 pl-8">
        <FilterGroup
          title="Category"
          items={categories}
          selected={filters.categories || []}
          onToggle={(value) => onToggleFilter('categories', value)}
          renderLabel={(category) => getCategoryLabel(category)}
          renderDot={(category) => getCategoryColor(category)}
        />
        <FilterGroup
          title="Era"
          items={eras}
          selected={filters.eras || []}
          onToggle={(value) => onToggleFilter('eras', value)}
        />
        <FilterGroup
          title="Status"
          items={statuses}
          selected={filters.statuses || []}
          onToggle={(value) => onToggleFilter('statuses', value)}
          renderLabel={(status) => status.charAt(0).toUpperCase() + status.slice(1)}
        />

        <div className="pb-2">
          <p className="mb-4 pl-4 text-xs font-bold uppercase tracking-widest" style={{ color: '#a78bfa' }}>
            Public Art
          </p>
          <div
            className="mb-2 flex items-center justify-between rounded-lg px-3.5 py-2.5"
            style={{
              background: showSculptures ? '#7c3aed22' : 'transparent',
              border: showSculptures ? '1.5px solid #7c3aed55' : '1.5px solid transparent',
            }}
          >
            <span className="text-sm font-medium" style={{ color: showSculptures ? '#a78bfa' : '#c8d0de' }}>
              Show sculptures
            </span>
            <label className="relative inline-flex cursor-pointer items-center">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={showSculptures}
                onChange={(e) => onSculpturesToggle(e.target.checked)}
              />
              <div
                className="relative h-5 w-9 rounded-full transition-all"
                style={{ background: showSculptures ? '#7c3aed' : SIDEBAR_THEME.border }}
              >
                <div
                  className="absolute left-[2px] top-[2px] size-4 rounded-full bg-white transition-transform"
                  style={{ transform: showSculptures ? 'translateX(16px)' : 'none' }}
                />
              </div>
            </label>
          </div>

          {showSculptures && (
            <div className="mt-3 space-y-2">
              {['Skulptur', 'Denkmal', 'Brunnen', 'Relief', 'Plastik'].map((category) => {
                const active = sculptureCategories.includes(category)
                return (
                  <button
                    key={category}
                    onClick={() => {
                      const next = active
                        ? sculptureCategories.filter((item) => item !== category)
                        : [...sculptureCategories, category]
                      onSculptureCategoriesChange(next)
                    }}
                    className="flex w-full items-center gap-3 rounded-lg px-3.5 py-2 text-sm font-medium transition-all"
                    style={{
                      background: active ? '#7c3aed22' : 'transparent',
                      color: active ? '#a78bfa' : '#c8d0de',
                      border: active ? '1.5px solid #7c3aed55' : '1.5px solid transparent',
                    }}
                    onMouseEnter={(e) => {
                      if (!active) {
                        e.currentTarget.style.background = SIDEBAR_THEME.surface
                        e.currentTarget.style.borderColor = SIDEBAR_THEME.border
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!active) {
                        e.currentTarget.style.background = 'transparent'
                        e.currentTarget.style.borderColor = 'transparent'
                      }
                    }}
                  >
                    <span className="size-3 shrink-0 rounded-full" style={{ backgroundColor: '#a78bfa' }} />
                    {category}
                  </button>
                )
              })}
              <p className="pl-4 pt-1 text-xs" style={{ color: SIDEBAR_THEME.muted }}>
                Empty selection = show all types
              </p>
            </div>
          )}
        </div>
      </div>
    </TabsContent>
  )
}

export default FiltersTab
