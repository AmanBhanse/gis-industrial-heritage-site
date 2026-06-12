function getDistanceSquared(a, b) {
  const latDiff = a.lat - b.lat
  const lngDiff = a.lng - b.lng
  return (latDiff * latDiff) + (lngDiff * lngDiff)
}

function getCentroid(sites = []) {
  const total = sites.reduce(
    (accumulator, site) => ({
      lat: accumulator.lat + site.lat,
      lng: accumulator.lng + site.lng,
    }),
    { lat: 0, lng: 0 },
  )

  return {
    lat: total.lat / sites.length,
    lng: total.lng / sites.length,
  }
}

function getNearestSite(referencePoint, sites = []) {
  return sites.reduce((closestSite, site) => {
    if (!closestSite) return site

    return getDistanceSquared(referencePoint, site) < getDistanceSquared(referencePoint, closestSite)
      ? site
      : closestSite
  }, null)
}

export function buildNearestNeighborRoute(sites = []) {
  const validSites = sites.filter(
    (site) => Number.isFinite(site?.lat) && Number.isFinite(site?.lng) && site?.id != null,
  )

  if (validSites.length === 0) return []

  const remainingSites = [...validSites]
  const centroid = getCentroid(remainingSites)
  const startSite = getNearestSite(centroid, remainingSites)
  const route = [startSite.id]

  remainingSites.splice(remainingSites.findIndex((site) => site.id === startSite.id), 1)

  let currentSite = startSite
  while (remainingSites.length > 0) {
    const nextSite = getNearestSite(currentSite, remainingSites)
    route.push(nextSite.id)
    remainingSites.splice(remainingSites.findIndex((site) => site.id === nextSite.id), 1)
    currentSite = nextSite
  }

  return route
}

export function buildTourRoutes(sites = []) {
  const allRoute = buildNearestNeighborRoute(sites)

  return {
    short: allRoute.slice(0, 5),
    middle: allRoute.slice(0, 10),
    all: allRoute,
  }
}
