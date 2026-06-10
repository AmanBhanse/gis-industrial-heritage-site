import { useEffect, useRef } from 'react'
import { useMap } from 'react-leaflet'
import L from 'leaflet'
import 'maplibre-gl/dist/maplibre-gl.css'
import '@maplibre/maplibre-gl-leaflet'
import { filterByDate } from '@openhistoricalmap/maplibre-gl-dates'

/**
 * MapLibreLayer — renders an OHM vector tile style as a Leaflet layer
 * using @maplibre/maplibre-gl-leaflet, filtered by year via maplibre-gl-dates.
 */
function MapLibreLayer({ styleUrl, year }) {
  const map = useMap()
  const layerRef = useRef(null)

  // Create the GL layer once (only when styleUrl changes)
  useEffect(() => {
    if (layerRef.current) {
      map.removeLayer(layerRef.current)
      layerRef.current = null
    }

    if (!L.maplibreGL) {
      console.error('L.maplibreGL not available — plugin did not load')
      return
    }

    const glLayer = L.maplibreGL({
      style: styleUrl,
      attribution:
        'Map data &copy; <a href="https://www.openhistoricalmap.org">OpenHistoricalMap</a> contributors',
    })

    glLayer.addTo(map)
    layerRef.current = glLayer

    return () => {
      if (layerRef.current) {
        try { map.removeLayer(layerRef.current) } catch (_) {}
        layerRef.current = null
      }
    }
  }, [map, styleUrl])

  // Apply date filter whenever year changes
  useEffect(() => {
    if (!layerRef.current || year == null) return

    const mlMap = layerRef.current.getMaplibreMap()
    if (!mlMap) return

    const dateStr = `${year}-01-01`
    const applyFilter = () => filterByDate(mlMap, dateStr)

    if (mlMap.isStyleLoaded()) {
      applyFilter()
    } else {
      mlMap.once('styledata', applyFilter)
    }
  }, [year])

  return null
}

export default MapLibreLayer
