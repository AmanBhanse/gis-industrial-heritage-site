import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Popup, Marker } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import styles from '../styles/MapContainer.module.css'
import TileLayerSwitcher from './TileLayerSwitcher'
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
function MapContainerComponent({ sites = [], selectedSite = null, onMarkerClick = () => {} }) {
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
            attribution='&copy; <a href="https://www.openhistoricalmap.org/">OpenHistoricalMap</a> contributors'
            url="https://{s}.tile.openhistoricalmap.org/ohm-default/{z}/{x}/{y}.png"
            subdomains="abc"
            maxZoom={19}
          />
        )}

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
    </div>
  )
}

export default MapContainerComponent
