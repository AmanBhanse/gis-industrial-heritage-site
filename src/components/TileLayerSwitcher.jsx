import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'
import styles from '../styles/TileLayerSwitcher.module.css'

function TileLayerSwitcher({ activeLayer = 'osm', onLayerChange = () => {}, inline = false }) {
  const groups = [
    {
      label: 'Current',
      layers: [
        { id: 'osm',       label: 'Street',      provider: 'OpenStreetMap — community-maintained world map (ODbL)' },
        { id: 'basemapde', label: 'DE Official',  provider: 'basemap.de Web Raster — official German government geodata, provided by BKG / ZSGT (CC BY 4.0)' },
        { id: 'satellite', label: 'Aerial',       provider: 'Esri World Imagery — satellite & aerial photography' },
        { id: 'historical', label: 'Terrain',     provider: 'OpenTopoMap — topographic map derived from OpenStreetMap & SRTM elevation data (CC BY-SA)' },
      ],
    },
    {
      label: 'Historical',
      layers: [
        { id: 'medieval',    label: 'Pfalz 1789',    provider: 'MapWarper #52395 — Herrschaftsgebiete der Pfalz, 1789' },
        { id: 'military1814', label: 'Military 1814', provider: 'MapWarper #107689 — Topographisch-militairische Charte (Weiland, 1814)' },
        { id: 'ohm',         label: 'OHM',            provider: 'OpenHistoricalMap — community-built historical vector map, filterable by year' },
      ],
    },
  ]

  return (
    <TooltipProvider delayDuration={300}>
      <div className={`${styles.switcher} ${inline ? styles.switcherInline : ''}`}>
        <div className={styles.switcherContainer}>
          {groups.map((group) => (
            <div key={group.label} className={styles.group}>
              <span className={styles.groupLabel}>{group.label}</span>
              <div className={styles.groupButtons}>
                {group.layers.map((layer) => (
                  <Tooltip key={layer.id}>
                    <TooltipTrigger asChild>
                      <button
                        className={`${styles.button} ${activeLayer === layer.id ? styles.active : ''}`}
                        onClick={() => onLayerChange(layer.id)}
                        aria-label={`Switch to ${layer.label} view`}
                        aria-pressed={activeLayer === layer.id}
                      >
                        <span className={styles.label}>{layer.label}</span>
                      </button>
                    </TooltipTrigger>
                    <TooltipContent
                      side="bottom"
                      style={{
                        background: '#1b2336',
                        border: '1px solid #283448',
                        color: '#e2e8f0',
                        fontSize: '0.75rem',
                        maxWidth: '220px',
                        textAlign: 'center',
                        borderRadius: '0.5rem',
                        padding: '0.4rem 0.75rem',
                      }}
                    >
                      {layer.provider}
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </TooltipProvider>
  )
}

export default TileLayerSwitcher
