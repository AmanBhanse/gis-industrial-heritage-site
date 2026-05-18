import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Popup, Marker } from 'react-leaflet'
import L from 'leaflet'
import styles from '../styles/MapContainer.module.css'
import TileLayerSwitcher from './TileLayerSwitcher'

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
 * @param {Function} onMarkerClick - Callback when a marker is clicked
 * @returns {JSX.Element}
 */
function MapContainerComponent({ sites = [], onMarkerClick = () => {} }) {
  const KAISERSLAUTERN_CENTER = [49.4463, 7.7575]
  const DEFAULT_ZOOM = 12
  const [activeLayer, setActiveLayer] = useState('osm')

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
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/voyager/{z}/{x}/{y}{r}.png"
          />
        )}

        {/* Site Markers */}
        {sites && sites.map((site) => (
          <Marker
            key={site.id}
            position={[site.lat, site.lng]}
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
