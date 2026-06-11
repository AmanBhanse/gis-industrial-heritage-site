import { Marker, Popup } from 'react-leaflet'
import { Info } from 'lucide-react'
import { createCategoryIcon, createActiveMarkerIcon } from '../../utils/markerIcons'

function SiteMarkers({ sites, selectedSite, onMarkerClick, onOpenSiteDetails, markerRefs }) {
  if (!sites?.length) return null

  return sites.map((site) => (
    <Marker
      key={site.id}
      position={[site.lat, site.lng]}
      icon={selectedSite?.id === site.id ? createActiveMarkerIcon(site.category) : createCategoryIcon(site.category)}
      ref={(marker) => {
        if (marker) {
          markerRefs.current[site.id] = marker
        } else {
          delete markerRefs.current[site.id]
        }
      }}
      eventHandlers={{
        click: () => onMarkerClick(site),
      }}
    >
      <Popup>
        <div className="w-64 p-4 pr-8">
          {/* Title row */}
          <div className="mb-3">
            <h3 className="text-sm font-semibold leading-snug text-white">
              {site.name}
            </h3>
          </div>
          {/* Meta rows */}
          <div className="space-y-1.5 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-slate-400">Category</span>
              <span className="ml-auto font-medium text-white">{site.category}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-slate-400">Status</span>
              <span className="ml-auto font-medium text-white">{site.status}</span>
            </div>
          </div>
          {/* Details button */}
          <button
            type="button"
            className="mt-3 flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-md border border-blue-500/30 bg-blue-500/10 px-3 py-1.5 text-xs font-medium text-blue-300 transition-colors hover:bg-blue-500/20 hover:text-blue-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-400"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              onOpenSiteDetails(site)
            }}
            aria-label={`Open details for ${site.name}`}
          >
            <Info className="h-3 w-3" />
            View Details
          </button>
        </div>
      </Popup>
    </Marker>
  ))
}

export default SiteMarkers
