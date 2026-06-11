import { useEffect, useRef, useState } from 'react'
import { MapContainer, TileLayer, WMSTileLayer, Popup, Marker, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import styles from '../styles/MapContainer.module.css'
import TileLayerSwitcher from './TileLayerSwitcher'
import PolygonLayer from './PolygonLayer'
import RouteLayer from './RouteLayer'
import MapLibreLayer from './MapLibreLayer'
import SkulpturenLayer from './SkulpturenLayer'
import { createCategoryIcon } from '../utils/markerIcons'

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
function MapContainerComponent({ sites = [], selectedSite = null, onMarkerClick = () => {}, allSites = [], route = [], showRoute = false, showSculptures = false, sculptureCategories = [], sculptures = [], onFlyTo = () => {}, onSelectSculpture = () => {} }) {
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

  // Create an active/highlighted marker icon
  const createActiveMarkerIcon = (category) => {
    const baseIcon = createCategoryIcon(category)
    return L.icon({
      ...baseIcon.options,
      iconSize: [50, 50],
      iconAnchor: [25, 50],
      popupAnchor: [0, -50],
      className: 'active-marker',
    })
  }

  return (
    <div className={styles.mapContainer}>
      <MapContainer
        center={KAISERSLAUTERN_CENTER}
        zoom={DEFAULT_ZOOM}
        zoomControl={false}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <MapInstanceBridge onReady={setMapInstance} />

        {/* Conditional Tile Layer */}
        {activeLayer === 'osm' && (
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        )}

        {activeLayer === 'satellite' && (
          <TileLayer
            attribution='Tiles &copy; <a href="https://www.esri.com/">Esri</a>'
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          />
        )}

        {activeLayer === 'historical' && (
          <TileLayer
            attribution='Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
            url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
            subdomains="abc"
            maxZoom={17}
          />
        )}

        {activeLayer === 'medieval' && (
          <TileLayer
            attribution='Historical map &copy; <a href="https://www.mapwarper.net/maps/52395">MapWarper</a> | Herrschaftsgebiete Pfalz 1789'
            url="https://www.mapwarper.net/maps/tile/52395/{z}/{x}/{y}.png"
            maxZoom={18}
            opacity={0.75}
          />
        )}

        {activeLayer === 'military1814' && (
          <TileLayer
            attribution='Historical map &copy; <a href="https://www.mapwarper.net/maps/107689">MapWarper</a> | Topographisch-militairische Charte (Weiland, 1814)'
            url="https://mapwarper.net/maps/tile/107689/{z}/{x}/{y}.png"
            maxZoom={18}
            opacity={0.85}
          />
        )}

        {activeLayer === 'basemapde' && (
          <WMSTileLayer
            url="https://sgx.geodatenzentrum.de/wms_basemapde"
            layers="de_basemapde_web_raster_farbe"
            format="image/png"
            version="1.3.0"
            transparent={false}
            attribution='&copy; <a href="https://basemap.de/">basemap.de</a> / BKG 2026, &copy; GeoBasis-DE / BKG CC BY 4.0'
          />
        )}

        {activeLayer === 'ohm' && (
          <MapLibreLayer
            styleUrl="https://www.openhistoricalmap.org/map-styles/main/main.json"
            year={ohmYear}
          />
        )}

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
          />
        )}

        {/* Site Markers */}
        {sites && sites.map((site) => (
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
              <div className={styles.popup}>
                <h3>{site.name}</h3>
                <p>
                  <strong>Category:</strong> {site.category}
                </p>
                <p>
                  <strong>Status:</strong> {site.status}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Top-right map controls */}
      <div className={styles.topControls}>
        <TileLayerSwitcher
          activeLayer={activeLayer}
          onLayerChange={setActiveLayer}
          inline={true}
        />

        <div className={styles.zoomPanel} aria-label="Map zoom controls">
          <button
            type="button"
            className={styles.zoomButton}
            onClick={() => mapInstance?.zoomIn()}
            title="Zoom in"
            aria-label="Zoom in"
          >
            +
          </button>
          <button
            type="button"
            className={styles.zoomButton}
            onClick={() => mapInstance?.zoomOut()}
            title="Zoom out"
            aria-label="Zoom out"
          >
            -
          </button>
        </div>
      </div>

      {/* OHM Year Slider — shown only when OHM layer is active */}
      {activeLayer === 'ohm' && (
        <div style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1000,
          background: 'rgba(19, 25, 41, 0.92)',
          border: '1px solid #283448',
          borderRadius: '0.75rem',
          padding: '0.75rem 1.25rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          backdropFilter: 'blur(6px)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
          userSelect: 'none',
        }}>
          <span style={{ fontSize: '1rem' }}>🕰️</span>
          <input
            type="range"
            min={500}
            max={2025}
            step={1}
            value={ohmYear}
            onChange={(e) => setOhmYear(Number(e.target.value))}
            style={{ width: '220px', accentColor: '#60a5fa', cursor: 'pointer' }}
            aria-label="Historical year filter"
          />
          <span style={{
            fontFamily: 'monospace',
            fontSize: '1.1rem',
            fontWeight: 700,
            color: '#60a5fa',
            minWidth: '3.5rem',
            textAlign: 'right',
          }}>{ohmYear}</span>
        </div>
      )}

      {/* Map Legend */}
      <div className={styles.legend}>
        <div className={styles.legendTitle}>Flächentypen</div>
        <div className={styles.legendItem}>
          <span className={styles.legendSwatch} style={{ backgroundColor: '#8e44ad' }} />
          Werksgelände
        </div>
        <div className={styles.legendItem}>
          <span className={styles.legendSwatch} style={{ backgroundColor: '#27ae60' }} />
          Arbeitersiedlung
        </div>
      </div>
    </div>
  )
}

export default MapContainerComponent
