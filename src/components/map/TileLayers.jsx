import { TileLayer, WMSTileLayer } from 'react-leaflet'
import MapLibreLayer from '../MapLibreLayer'

function TileLayers({ activeLayer, ohmYear }) {
  if (activeLayer === 'osm') {
    return (
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    )
  }

  if (activeLayer === 'satellite') {
    return (
      <TileLayer
        attribution='Tiles &copy; <a href="https://www.esri.com/">Esri</a>'
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
      />
    )
  }

  if (activeLayer === 'historical') {
    return (
      <TileLayer
        attribution='Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
        url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
        subdomains="abc"
        maxZoom={17}
      />
    )
  }

  if (activeLayer === 'medieval') {
    return (
      <TileLayer
        attribution='Historical map &copy; <a href="https://www.mapwarper.net/maps/52395">MapWarper</a> | Herrschaftsgebiete Pfalz 1789'
        url="https://www.mapwarper.net/maps/tile/52395/{z}/{x}/{y}.png"
        maxZoom={18}
        opacity={0.75}
      />
    )
  }

  if (activeLayer === 'military1814') {
    return (
      <TileLayer
        attribution='Historical map &copy; <a href="https://www.mapwarper.net/maps/107689">MapWarper</a> | Topographisch-militairische Charte (Weiland, 1814)'
        url="https://mapwarper.net/maps/tile/107689/{z}/{x}/{y}.png"
        maxZoom={18}
        opacity={0.85}
      />
    )
  }

  if (activeLayer === 'basemapde') {
    return (
      <WMSTileLayer
        url="https://sgx.geodatenzentrum.de/wms_basemapde"
        layers="de_basemapde_web_raster_farbe"
        format="image/png"
        version="1.3.0"
        transparent={false}
        attribution='&copy; <a href="https://basemap.de/">basemap.de</a> / BKG 2026, &copy; GeoBasis-DE / BKG CC BY 4.0'
      />
    )
  }

  if (activeLayer === 'ohm') {
    return (
      <MapLibreLayer
        styleUrl="https://www.openhistoricalmap.org/map-styles/main/main.json"
        year={ohmYear}
      />
    )
  }

  return null
}

export default TileLayers
