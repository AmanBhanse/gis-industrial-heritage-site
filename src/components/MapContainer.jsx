import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Popup, Marker } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import styles from '../styles/MapContainer.module.css'
import TileLayerSwitcher from './TileLayerSwitcher'
import PolygonLayer from './PolygonLayer'
import RouteLayer from './RouteLayer'
import { createCategoryIcon } from '../utils/markerIcons'

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
function MapContainerComponent({ sites = [], selectedSite = null, onMarkerClick = () => {}, allSites = [], route = [], showRoute = false }) {
  const KAISERSLAUTERN_CENTER = [49.4463, 7.7575]
  const DEFAULT_ZOOM = 12
  const [activeLayer, setActiveLayer] = useState('osm')

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
        scrollWheelZoom={true}
        className={styles.map}
      >
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

        {/* Polygon Areas */}
        <PolygonLayer sites={sites} onMarkerClick={onMarkerClick} />

        {/* Walking Tour Route */}
        <RouteLayer sites={allSites} route={route} visible={showRoute} />

        {/* Site Markers */}
        {sites && sites.map((site) => (
          <Marker
            key={site.id}
            position={[site.lat, site.lng]}
            icon={selectedSite?.id === site.id ? createActiveMarkerIcon(site.category) : createCategoryIcon(site.category)}
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

      {/* Tile Layer Switcher */}
      <TileLayerSwitcher activeLayer={activeLayer} onLayerChange={setActiveLayer} />

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
