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
    ? 'aman-inline flex-1 min-w-0'
    : 'absolute right-[var(--spacing-md)] top-[var(--spacing-md)] z-[1000]'

  return (
    <TooltipProvider delayDuration={300}>
      <div className={wrapperClasses}>
        <div className="flex h-full w-full gap-1 rounded-lg border border-white/10 bg-gray-900/90 p-1.5 shadow-lg backdrop-blur-sm">
          {groups.map((group, index) => (
            <div
              key={group.label}
              className={`flex min-w-0 flex-1 flex-col gap-1 ${
                index > 0 ? 'border-l border-white/10 pl-1.5' : ''
              }`}
            >
              <span className="text-center font-bold uppercase tracking-wider text-blue-400">
                {group.label}
              </span>
              <div className="flex flex-wrap">
                {group.layers.map((layer) => (
                  <Tooltip key={layer.id}>
                    <TooltipTrigger
                      type="button"
                      className="amanbutton shrink-0 whitespace-nowrap rounded px-1 py-px m-0 border-0 bg-transparent appearance-none text-[9px] font-medium leading-none transition-colors hover:opacity-100 hover:transform-none hover:shadow-none text-white/55 hover:bg-white/10 hover:text-white aria-pressed:!bg-blue-600 aria-pressed:!text-white aria-pressed:!ring-1 aria-pressed:!ring-blue-300/50"
                      onClick={() => onLayerChange(layer.id)}
                      aria-label={`Switch to ${layer.label} view`}
                      aria-pressed={activeLayer === layer.id}
                    >
                      {layer.label}
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
