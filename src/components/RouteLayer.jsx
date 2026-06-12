import { Polyline, CircleMarker, Tooltip } from 'react-leaflet'

const ROUTE_STYLE = {
  color: '#1a5276',
  weight: 3,
  opacity: 0.8,
  dashArray: '8 6',
  lineJoin: 'round',
}

const WAYPOINT_STYLE = {
  radius: 7,
  color: '#1a5276',
  fillColor: '#2980b9',
  fillOpacity: 1,
  weight: 2,
}

function RouteLayer({ sites = [], route = [], routePositions = [], visible = false }) {
  if (!visible || route.length < 2) return null

  const siteById = Object.fromEntries(sites.map((s) => [s.id, s]))

  const positions = routePositions.length > 1
    ? routePositions
    : route
      .map((id) => siteById[id])
      .filter(Boolean)
      .map((site) => [site.lat, site.lng])

  const waypoints = route
    .map((id) => siteById[id])
    .filter(Boolean)

  if (positions.length < 2) return null

  return (
    <>
      <Polyline positions={positions} pathOptions={ROUTE_STYLE} />
      {waypoints.map((site, index) => (
        <CircleMarker
          key={`route-wp-${site.id}`}
          center={[site.lat, site.lng]}
          pathOptions={WAYPOINT_STYLE}
          radius={WAYPOINT_STYLE.radius}
        >
          <Tooltip permanent direction="top" offset={[0, -10]} className="route-label">
            {index + 1}
          </Tooltip>
        </CircleMarker>
      ))}
    </>
  )
}

export default RouteLayer
