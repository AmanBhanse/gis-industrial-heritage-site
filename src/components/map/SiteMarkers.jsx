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
        <div className="box-border min-w-[240px] max-w-[300px] p-4 text-slate-100">
          <div className="mb-2 flex items-start justify-between gap-2.5">
            <h3 className="m-0 text-lg font-bold leading-tight tracking-tight text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.45)]">
              {site.name}
            </h3>
            <button
              type="button"
              className="inline-flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center rounded-full border border-blue-400/20 bg-blue-400/10 text-blue-300 transition-colors hover:border-blue-400/38 hover:bg-blue-400/18 hover:text-blue-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-400/55"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                onOpenSiteDetails(site)
              }}
              aria-label={`Open details for ${site.name}`}
              title="Open site details"
            >
              <Info className="h-3.5 w-3.5" />
            </button>
          </div>
          <p className="my-1 text-sm leading-relaxed text-slate-200 [text-shadow:0_1px_1px_rgba(0,0,0,0.28)]">
            <strong className="font-semibold text-white">Category:</strong> {site.category}
          </p>
          <p className="my-1 text-sm leading-relaxed text-slate-200 [text-shadow:0_1px_1px_rgba(0,0,0,0.28)]">
            <strong className="font-semibold text-white">Status:</strong> {site.status}
          </p>
        </div>
      </Popup>
    </Marker>
  ))
}

export default SiteMarkers
