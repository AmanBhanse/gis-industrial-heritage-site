import styles from '../styles/TileLayerSwitcher.module.css'

function TileLayerSwitcher({ activeLayer = 'osm', onLayerChange = () => {}, inline = false }) {
  const groups = [
    {
      label: 'Current',
      layers: [
        { id: 'osm', label: 'Street' },
        { id: 'satellite', label: 'Aerial' },
        { id: 'historical', label: 'Terrain' },
      ],
    },
    {
      label: 'Historical',
      layers: [
        { id: 'medieval', label: 'Pfalz 1789' },
        { id: 'military1814', label: 'Military 1814' },
        { id: 'ohm', label: 'OHM' },
      ],
    },
  ]

  return (
    <div className={`${styles.switcher} ${inline ? styles.switcherInline : ''}`}>
      <div className={styles.switcherContainer}>
        {groups.map((group) => (
          <div key={group.label} className={styles.group}>
            <span className={styles.groupLabel}>{group.label}</span>
            <div className={styles.groupButtons}>
              {group.layers.map((layer) => (
                <button
                  key={layer.id}
                  className={`${styles.button} ${activeLayer === layer.id ? styles.active : ''}`}
                  onClick={() => onLayerChange(layer.id)}
                  title={`Switch to ${layer.label} view`}
                  aria-label={`Switch to ${layer.label} view`}
                  aria-pressed={activeLayer === layer.id}
                >
                  <span className={styles.label}>{layer.label}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TileLayerSwitcher
