import { Polygon, Tooltip } from 'react-leaflet'

const WERKSGELAENDE_CATEGORIES = ['factory', 'mine', 'warehouse', 'railway']

const POLYGON_STYLES = {
  werksgelaende: {
    color: '#8e44ad',
    fillColor: '#8e44ad',
    fillOpacity: 0.18,
    weight: 2,
    dashArray: '4 3',
  },
  settlement: {
    color: '#27ae60',
    fillColor: '#27ae60',
    fillOpacity: 0.18,
    weight: 2,
    dashArray: '4 3',
  },
}

function PolygonLayer({ sites = [], onMarkerClick = () => {} }) {
  const sitesWithPolygon = sites.filter((site) => site.polygon && site.polygon.length >= 3)

  if (sitesWithPolygon.length === 0) return null

  return sitesWithPolygon.map((site) => {
    const style =
      site.category === 'settlement'
        ? POLYGON_STYLES.settlement
        : POLYGON_STYLES.werksgelaende

    return (
      <Polygon
        key={`polygon-${site.id}`}
        positions={site.polygon}
        pathOptions={style}
        eventHandlers={{
          click: () => onMarkerClick(site),
        }}
      >
        <Tooltip sticky>{site.name}</Tooltip>
      </Polygon>
    )
  })
}

export default PolygonLayer
