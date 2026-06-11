import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'

function TileLayerSwitcher({ activeLayer = 'osm', onLayerChange = () => {}, inline = false }) {
  const groups = [
    {
      label: 'Current',
      layers: [
        { id: 'basemapde', label: 'DE Official', provider: 'basemap.de Web Raster — official German government geodata, provided by BKG / ZSGT (CC BY 4.0)' },
        { id: 'osm', label: 'Street', provider: 'OpenStreetMap — community-maintained world map (ODbL)' },
        { id: 'satellite', label: 'Aerial', provider: 'Esri World Imagery — satellite & aerial photography' },
        { id: 'historical', label: 'Terrain', provider: 'OpenTopoMap — topographic map derived from OpenStreetMap & SRTM elevation data (CC BY-SA)' },
      ],
    },
    {
      label: 'Historical',
      layers: [
        { id: 'ohm', label: 'Time Map', provider: 'OpenHistoricalMap \u2014 community-built historical vector map, filterable by year' },
        { id: 'military1814', label: 'Military 1814', provider: 'MapWarper #107689 — Topographisch-militairische Charte (Weiland, 1814)' },
        { id: 'medieval', label: 'Pfalz 1789', provider: 'MapWarper #52395 — Herrschaftsgebiete der Pfalz, 1789' },
      ],
    },
  ]

  const wrapperClasses = inline
    ? 'static'
    : 'absolute right-[var(--spacing-md)] top-[var(--spacing-md)] z-[1000]'

  return (
    <TooltipProvider delayDuration={300}>
      <div className={wrapperClasses}>
        <div className="inline-flex gap-2 rounded-lg border border-white/10 bg-gray-900/90 p-1.5 shadow-lg backdrop-blur-sm">
          {groups.map((group, index) => (
            <div
              key={group.label}
              className={`flex flex-col gap-1 ${index > 0 ? 'border-l border-white/10 pl-2' : ''}`}
            >
              <span className="text-center text-[9px] font-semibold uppercase tracking-wider text-blue-400">
                {group.label}
              </span>
              <div className="flex gap-1">
                {group.layers.map((layer) => (
                  <Tooltip key={layer.id}>
                    <TooltipTrigger asChild>
                      <button
                        className={`whitespace-nowrap rounded px-2 py-0.5 text-xs font-medium transition-colors ${
                          activeLayer === layer.id
                            ? 'bg-blue-600 text-white'
                            : 'text-white/60 hover:bg-white/10 hover:text-white'
                        }`}
                        onClick={() => onLayerChange(layer.id)}
                        aria-label={`Switch to ${layer.label} view`}
                        aria-pressed={activeLayer === layer.id}
                      >
                        {layer.label}
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
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
