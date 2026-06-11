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
import { Info } from 'lucide-react'

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
  const [legendOpen, setLegendOpen] = useState(false)
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
            onOpenSculptureDetails={onOpenSculptureDetails}
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
                <div className={styles.popupHeader}>
                  <h3>{site.name}</h3>
                  <button
                    type="button"
                    className={styles.popupInfoButton}
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      onOpenSiteDetails(site)
                    }}
                    aria-label={`Open details for ${site.name}`}
                    title="Open site details"
                  >
                    <Info className={styles.popupInfoIcon} />
                  </button>
                </div>
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
        <button
          onClick={() => setLegendOpen((o) => !o)}
          className={styles.legendToggle}
          aria-label={legendOpen ? 'Collapse legend' : 'Expand legend'}
        >
          <span>☰</span>
          <span>{legendOpen ? 'Hide legend' : 'Legend'}</span>
        </button>
        {legendOpen && <>
        <div className={styles.legendTitle}>Heritage Sites</div>
        <div className={styles.legendItem}>
          <svg width="16" height="16" viewBox="0 0 24 24" style={{ fill: 'none', stroke: '#8e44ad', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round', minWidth: 16, minHeight: 16 }}>
            <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M7 7V3M17 7V3M2 11h20"/><rect x="4" y="13" width="3" height="5"/><rect x="10" y="13" width="3" height="5"/><rect x="16" y="13" width="3" height="5"/>
          </svg>
          Factory
        </div>
        <div className={styles.legendItem}>
          <svg width="16" height="16" viewBox="0 0 24 24" style={{ fill: 'none', stroke: '#e67e22', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round', minWidth: 16, minHeight: 16 }}>
            <path d="M17.2 9.9l-5.8 5.8"/><path d="M18.5 4a2.12 2.12 0 0 1 3 3L13 16.5"/><path d="M9.5 4a2.12 2.12 0 0 0-3 3l8.5 8.5"/><path d="M3 3v8a2 2 0 0 0 2 2h8"/>
          </svg>
          Mine
        </div>
        <div className={styles.legendItem}>
          <svg width="16" height="16" viewBox="0 0 24 24" style={{ fill: 'none', stroke: '#3498db', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round', minWidth: 16, minHeight: 16 }}>
            <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>
          </svg>
          Warehouse
        </div>
        <div className={styles.legendItem}>
          <svg width="16" height="16" viewBox="0 0 24 24" style={{ fill: 'none', stroke: '#16a085', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round', minWidth: 16, minHeight: 16 }}>
            <rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="6" cy="19" r="2"/><circle cx="18" cy="19" r="2"/><path d="M2 9h20M6 6V4M18 6V4"/>
          </svg>
          Railway
        </div>
        <div className={styles.legendItem}>
          <svg width="16" height="16" viewBox="0 0 24 24" style={{ fill: 'none', stroke: '#27ae60', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round', minWidth: 16, minHeight: 16 }}>
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
          Settlement
        </div>
        
        <div className={styles.legendDivider} />
        
        <div className={styles.legendTitle}>Public Art</div>
        <div className={styles.legendItem}>
          <svg width="16" height="16" viewBox="0 0 24 24" style={{ fill: 'none', stroke: '#a78bfa', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round', minWidth: 16, minHeight: 16 }}>
            <circle cx="12" cy="5" r="2"/><path d="M12 7v4M9 9h6M9 13h6M10 17h4M8 21h8"/>
          </svg>
          Skulptur
        </div>
        <div className={styles.legendItem}>
          <svg width="16" height="16" viewBox="0 0 24 24" style={{ fill: 'none', stroke: '#c084fc', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round', minWidth: 16, minHeight: 16 }}>
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/><path d="M9 12h0"/><path d="M15 12h0"/>
          </svg>
          Denkmal
        </div>
        <div className={styles.legendItem}>
          <svg width="16" height="16" viewBox="0 0 24 24" style={{ fill: 'none', stroke: '#06b6d4', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round', minWidth: 16, minHeight: 16 }}>
            <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/><circle cx="6.5" cy="13.5" r="1.5"/><circle cx="17.5" cy="10.5" r="1.5"/>
          </svg>
          Brunnen
        </div>
        <div className={styles.legendItem}>
          <svg width="16" height="16" viewBox="0 0 24 24" style={{ fill: 'none', stroke: '#f97316', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round', minWidth: 16, minHeight: 16 }}>
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
          </svg>
          Relief
        </div>
        <div className={styles.legendItem}>
          <svg width="16" height="16" viewBox="0 0 24 24" style={{ fill: 'none', stroke: '#ec4899', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round', minWidth: 16, minHeight: 16 }}>
            <path d="M12 3l1.9 5.8h6.1l-4.9 3.6 1.9 5.8-4.9-3.6-4.9 3.6 1.9-5.8-4.9-3.6h6.1z"/><path d="M3 21l2-5M20 7l2-5M6 12l-2-5M18 20l2-5"/>
          </svg>
          Plastik
        </div>
        </>}
      </div>
    </div>
  )
}

export default MapContainerComponent
