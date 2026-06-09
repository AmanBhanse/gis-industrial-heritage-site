import styles from '../styles/TileLayerSwitcher.module.css'

/**
 * TileLayerSwitcher Component
 * Provides buttons to switch between different map tile layers
 * @param {String} activeLayer - Currently active layer ('osm' or 'satellite')
 * @param {Function} onLayerChange - Callback when layer is switched
 * @returns {JSX.Element}
 */
function TileLayerSwitcher({ activeLayer = 'osm', onLayerChange = () => {} }) {
  const layers = [
    { id: 'osm', label: 'Map', icon: '🗺️' },
    { id: 'satellite', label: 'Satellite', icon: '🛰️' },
    { id: 'historical', label: 'Topo', icon: '🏔️' },
  ]

  return (
    <div className={styles.switcher}>
      <div className={styles.switcherContainer}>
        {layers.map((layer) => (
          <button
            key={layer.id}
            className={`${styles.button} ${activeLayer === layer.id ? styles.active : ''}`}
            onClick={() => onLayerChange(layer.id)}
            title={`Switch to ${layer.label} view`}
            aria-label={`Switch to ${layer.label} view`}
            aria-pressed={activeLayer === layer.id}
          >
            <span className={styles.icon}>{layer.icon}</span>
            <span className={styles.label}>{layer.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default TileLayerSwitcher
