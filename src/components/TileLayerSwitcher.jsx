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
        <div className="inline-flex gap-1 rounded-lg border border-[rgba(52,152,219,0.15)] bg-[rgba(17,24,39,0.92)] p-1 shadow-[0_6px_18px_rgba(0,0,0,0.28)] backdrop-blur-[12px]">
          {groups.map((group, index) => (
            <div
              key={group.label}
              className={`flex flex-col gap-0.5 ${index > 0 ? 'border-l border-[rgba(52,152,219,0.2)] pl-1.5' : ''}`}
            >
              <div className="aman flex w-full items-center justify-center rounded bg-[rgba(52,152,219,0.1)] p-4 text-center text-xs font-bold uppercase tracking-[0.08em] text-[#60a5fa]">
                {group.label}
              </div>
              <div className="flex gap-px">
                {group.layers.map((layer) => (
                  <Tooltip key={layer.id}>
                    <TooltipTrigger asChild>
                      <button
                        className={`flex min-h-[22px] items-center justify-center whitespace-nowrap rounded border border-[rgba(96,165,250,0.2)] px-1.5 py-0.5 text-center text-[8px] leading-tight font-medium transition-all duration-200 ${
                          activeLayer === layer.id
                            ? 'border-[#60a5fa] bg-[rgba(96,165,250,0.18)] font-semibold text-[#60a5fa] hover:bg-[rgba(96,165,250,0.25)]'
                            : 'bg-transparent text-[rgba(255,255,255,0.6)] hover:border-[rgba(96,165,250,0.4)] hover:bg-[rgba(96,165,250,0.1)] hover:text-[rgba(255,255,255,0.85)]'
                        }`}
                        onClick={() => onLayerChange(layer.id)}
                        aria-label={`Switch to ${layer.label} view`}
                        aria-pressed={activeLayer === layer.id}
                      >
                        <span>{layer.label}</span>
                      </button>
                    </TooltipTrigger>
                    <TooltipContent
                      side="bottom"
                      className="max-w-[220px] rounded-lg border border-[#283448] bg-[#1b2336] px-3 py-[0.4rem] text-center text-xs text-[#e2e8f0]"
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
