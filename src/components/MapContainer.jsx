import { useEffect, useRef, useState } from 'react'
import { MapContainer, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import TileLayerSwitcher from './TileLayerSwitcher'
import ZoomControls from './map/ZoomControls'
import OhmYearSlider from './map/OhmYearSlider'
import MapLegend from './map/MapLegend'
import TileLayers from './map/TileLayers'
import PolygonLayer from './PolygonLayer'
import RouteLayer from './RouteLayer'
import SkulpturenLayer from './SkulpturenLayer'
import SiteMarkers from './map/SiteMarkers'

function MapInstanceBridge({ onReady }) {
  const map = useMap()

  useEffect(() => {
    onReady(map)
  }, [map, onReady])

  return null
}

// Fix leaflet default icons
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

/**
 * MapContainer Component
 * Displays the Leaflet map centered on Kaiserslautern with interactive features
 * @param {Array} sites - Array of heritage sites to display
 * @param {Object} selectedSite - Currently selected site
 * @param {Function} onMarkerClick - Callback when a marker is clicked
 * @returns {JSX.Element}
 */
function MapContainerComponent({ sites = [], selectedSite = null, onMarkerClick = () => {}, allSites = [], route = [], showRoute = false, showSculptures = false, sculptureCategories = [], sculptures = [], onFlyTo = () => {}, onSelectSculpture = () => {}, onOpenSiteDetails = () => {}, onOpenSculptureDetails = () => {} }) {
  const KAISERSLAUTERN_CENTER = [49.4463, 7.7575]
  const DEFAULT_ZOOM = 13
  const [activeLayer, setActiveLayer] = useState('basemapde')
  const [ohmYear, setOhmYear] = useState(2025)
  const [mapInstance, setMapInstance] = useState(null)
  const markerRefs = useRef({})

  // Register flyTo callback with parent
  useEffect(() => {
    if (!mapInstance) return
    onFlyTo(({ lat, lng }) => {
      mapInstance.flyTo([lat, lng], Math.max(mapInstance.getZoom(), 15), { duration: 1 })
    })
  }, [mapInstance, onFlyTo])

  // Keep exactly one popup open: the one belonging to the current selected marker.
  useEffect(() => {
    if (!mapInstance) return

    Object.values(markerRefs.current).forEach((marker) => {
      marker?.closePopup?.()
    })

    if (selectedSite?.id) {
      markerRefs.current[selectedSite.id]?.openPopup?.()
    }
  }, [mapInstance, selectedSite])

  return (
    <div className="relative h-full w-full overflow-hidden">
      <MapContainer
        center={KAISERSLAUTERN_CENTER}
        zoom={DEFAULT_ZOOM}
        zoomControl={false}
        scrollWheelZoom={true}
        className="h-full w-full z-[1]"
      >
        <MapInstanceBridge onReady={setMapInstance} />

        {/* Tile Layers */}
        <TileLayers activeLayer={activeLayer} ohmYear={ohmYear} />

        {/* Polygon Areas */}
        <PolygonLayer sites={sites} onMarkerClick={onMarkerClick} />

        {/* Walking Tour Route */}
        <RouteLayer sites={allSites} route={route} visible={showRoute} />

        {/* Public Art / Sculptures overlay */}
        {showSculptures && (
          <SkulpturenLayer
            sculptures={sculptures}
            activeCategories={sculptureCategories}
            onSelectSculpture={onSelectSculpture}
            onOpenSculptureDetails={onOpenSculptureDetails}
          />
        )}

        {/* Site Markers */}
        <SiteMarkers
          sites={sites}
          selectedSite={selectedSite}
          onMarkerClick={onMarkerClick}
          onOpenSiteDetails={onOpenSiteDetails}
          markerRefs={markerRefs}
        />
      </MapContainer>

      {/* Top-right map controls */}
      <div className="aman1 absolute top-(--spacing-md) right-(--spacing-md) z-1000  w-[50vw] ">

        <div className='control-content flex items-stretch gap-1 w-full'>
          <TileLayerSwitcher
            activeLayer={activeLayer}
            onLayerChange={setActiveLayer}
            inline={true}
          />

          <ZoomControls
            onZoomIn={() => mapInstance?.zoomIn()}
            onZoomOut={() => mapInstance?.zoomOut()}
          />

        </div>
      </div>

      {/* OHM Year Slider — shown only when OHM layer is active */}
      {activeLayer === 'ohm' && (
        <OhmYearSlider year={ohmYear} onChange={setOhmYear} />
      )}

      {/* Map Legend */}
      <MapLegend />
    </div>
  )
}

export default MapContainerComponent
