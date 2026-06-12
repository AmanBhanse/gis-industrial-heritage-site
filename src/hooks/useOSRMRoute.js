import { useEffect, useMemo, useState } from 'react'

const OSRM_BASE_URL = 'https://router.project-osrm.org/route/v1/driving/'
const REQUEST_TIMEOUT_MS = 25000

function isValidCoordinate(site) {
  return Number.isFinite(site?.lat) && Number.isFinite(site?.lng)
}

export function buildStraightLinePositions(sites = [], route = []) {
  if (!Array.isArray(route) || route.length < 2) return []

  const siteById = Object.fromEntries(sites.map((site) => [site.id, site]))

  return route
    .map((id) => siteById[id])
    .filter(isValidCoordinate)
    .map((site) => [site.lat, site.lng])
}

function buildOSRMCoordinateString(positions = []) {
  return positions.map(([lat, lng]) => `${lng},${lat}`).join(';')
}

async function fetchFullRoute(positions, signal) {
  const coordinateString = buildOSRMCoordinateString(positions)
  const url = `${OSRM_BASE_URL}${coordinateString}?overview=full&geometries=geojson`
  const response = await fetch(url, { signal })

  if (!response.ok) {
    throw new Error(`OSRM request failed: ${response.status}`)
  }

  const payload = await response.json()
  if (payload?.code && payload.code !== 'Ok') {
    throw new Error(`OSRM ${payload.code}: ${payload?.message ?? 'unknown error'}`)
  }

  const osrmPositions = parseOSRMRoutePositions(payload)
  if (osrmPositions.length < 2) {
    throw new Error('OSRM response does not contain a valid route geometry')
  }

  return osrmPositions
}

export function parseOSRMRoutePositions(payload) {
  const coords = payload?.routes?.[0]?.geometry?.coordinates
  if (!Array.isArray(coords) || coords.length < 2) return []

  return coords
    .filter((pair) => Array.isArray(pair) && pair.length >= 2)
    .map(([lng, lat]) => [lat, lng])
    .filter(([lat, lng]) => Number.isFinite(lat) && Number.isFinite(lng))
}

export function useOSRMRoute({ sites = [], route = [], enabled = false } = {}) {
  const fallbackPositions = useMemo(
    () => buildStraightLinePositions(sites, route),
    [sites, route],
  )

  const [positions, setPositions] = useState(fallbackPositions)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [isFallback, setIsFallback] = useState(false)

  function logRouteStrategy(strategy, details = {}) {
    console.log(`[route] strategy=${strategy}`, details)
  }

  useEffect(() => {
    setPositions(fallbackPositions)

    if (!enabled || fallbackPositions.length < 2) {
      setLoading(false)
      setError(null)
      setIsFallback(false)
      logRouteStrategy('disabled', {
        reason: 'no-visible-route-or-insufficient-points',
        enabled,
        points: fallbackPositions.length,
      })
      return
    }

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)

    let cancelled = false
    setLoading(true)
    setError(null)
    setIsFallback(false)

    async function loadRoute() {
      try {
        const fullRoute = await fetchFullRoute(fallbackPositions, controller.signal)
        if (cancelled) return

        setPositions(fullRoute)
        setLoading(false)
        setIsFallback(false)
        setError(null)
        logRouteStrategy('osrm-full-route', {
          inputPoints: fallbackPositions.length,
          outputPoints: fullRoute.length,
        })
        return
      } catch (fullRouteError) {
        if (controller.signal.aborted || cancelled) {
          return
        }
        setPositions(fallbackPositions)
        setLoading(false)
        setError(fullRouteError?.message ?? 'OSRM routing failed')
        setIsFallback(true)

        logRouteStrategy('fallback-straight-line', {
          points: fallbackPositions.length,
          reason: fullRouteError?.message ?? 'OSRM routing failed',
        })
        console.warn('OSRM full-route request failed, using straight-line fallback.', fullRouteError)
      }
    }

    loadRoute().catch((err) => {
      if (cancelled) return

      setPositions(fallbackPositions)
      setLoading(false)
      setError(err?.message ?? 'OSRM routing failed')
      setIsFallback(true)

      logRouteStrategy('fallback-straight-line', {
        points: fallbackPositions.length,
        reason: err?.message ?? 'OSRM routing failed',
      })
      console.warn('OSRM route unavailable, using straight-line fallback.', err)
    })

    return () => {
      cancelled = true
      clearTimeout(timeoutId)
      controller.abort()
    }
  }, [enabled, fallbackPositions])

  return { positions, loading, error, isFallback }
}
