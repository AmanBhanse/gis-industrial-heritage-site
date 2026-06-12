import { TabsContent } from '@/components/ui/tabs'
import { SIDEBAR_THEME } from './SidebarConstants'

const TOUR_OPTIONS = [
  {
    value: 'short',
    label: 'Short tour',
    subtitle: '1 day',
    description: 'Connect 5 nearby heritage sites.',
  },
  {
    value: 'middle',
    label: 'Middle tour',
    subtitle: '2 day',
    description: 'Connect 10 nearby heritage sites.',
  },
  {
    value: 'all',
    label: 'All location',
    subtitle: 'Full route',
    description: 'Connect every heritage site.',
  },
]

function RouteTab({ showRoute, onRouteToggle, tourType = 'all', onTourTypeChange }) {
  return (
    <TabsContent value="route" className="m-0 flex-1 overflow-y-auto p-0">
      <div className="space-y-5 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium" style={{ color: SIDEBAR_THEME.text }}>
              Walking Tour
            </p>
            <p className="mt-0.5 text-xs" style={{ color: SIDEBAR_THEME.muted }}>
              Heritage trail through Kaiserslautern
            </p>
          </div>
          <label className="relative inline-flex cursor-pointer items-center">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={showRoute}
              onChange={(e) => onRouteToggle(e.target.checked)}
            />
            <div
              className="relative h-5 w-9 rounded-full transition-all"
              style={{ background: showRoute ? '#3b82f6' : SIDEBAR_THEME.border }}
            >
              <div
                className="absolute left-[2px] top-[2px] size-4 rounded-full bg-white transition-transform"
                style={{ transform: showRoute ? 'translateX(16px)' : 'none' }}
              />
            </div>
          </label>
        </div>
        <div className="space-y-2">
          {TOUR_OPTIONS.map((option) => {
            const isSelected = option.value === tourType

            return (
              <button
                key={option.value}
                type="button"
                onClick={() => onTourTypeChange(option.value)}
                className="w-full rounded-lg border px-3 py-2 text-left transition-colors"
                style={{
                  background: isSelected ? '#1e3a5f' : SIDEBAR_THEME.surface,
                  borderColor: isSelected ? '#60a5fa' : SIDEBAR_THEME.border,
                }}
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold" style={{ color: SIDEBAR_THEME.text }}>
                    {option.label}
                  </p>
                  <span className="text-[11px] font-medium uppercase tracking-wide" style={{ color: isSelected ? '#93c5fd' : SIDEBAR_THEME.muted }}>
                    {option.subtitle}
                  </span>
                </div>
                <p className="mt-1 text-xs" style={{ color: SIDEBAR_THEME.muted }}>
                  {option.description}
                </p>
              </button>
            )
          })}
        </div>
        {showRoute && (
          <div
            className="space-y-1 rounded-lg p-3 text-xs"
            style={{
              background: SIDEBAR_THEME.surface,
              border: `1px solid ${SIDEBAR_THEME.border}`,
              color: SIDEBAR_THEME.muted,
            }}
          >
            <p className="font-semibold" style={{ color: SIDEBAR_THEME.text }}>
              Route info
            </p>
            <p>Numbered markers on the map show the selected tour sequence.</p>
            <p>Follow the dashed line connecting each site in the chosen route.</p>
          </div>
        )}
      </div>
    </TabsContent>
  )
}

export default RouteTab
