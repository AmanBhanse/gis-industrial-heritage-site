import { TabsContent } from '@/components/ui/tabs'
import { SIDEBAR_THEME } from './SidebarConstants'

function RouteTab({ showRoute, onRouteToggle }) {
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
            <p>Numbered markers on the map show the walking tour sequence.</p>
            <p>Follow the dashed line connecting each heritage site.</p>
          </div>
        )}
      </div>
    </TabsContent>
  )
}

export default RouteTab
