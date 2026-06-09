# Interactive Map of Kaiserslautern — Project Summary

## Task

Creation of an interactive web map of Kaiserslautern for the **ReTra Stadt** project
(HiWi application, RPTU Kaiserslautern-Landau, Dr.-Ing. René Fleschurz).

---

## Tools and Technologies

| Tool | Purpose |
|---|---|
| **React 19** | Component-based UI architecture |
| **Leaflet 1.9 / react-leaflet 5** | Interactive map rendering |
| **Vite 8** | Build tool and development server |
| **OpenStreetMap** | Default base map layer |
| **ESRI World Imagery** | Satellite imagery layer |
| **OpenTopoMap** | Topographic layer in traditional German survey map style |

---

## Implemented Requirements

### 1. Points of Interest (POI)
- **13 heritage sites** in Kaiserslautern mapped
- Categories: Factory, Mine, Warehouse, Railway, **Worker Settlement (Arbeitersiedlung)**
- Detail panel per site with description, images, year built, and status
- Color-coded markers per category
- Filter controls (category / era / status) and text search in the site list

### 2. Polygon Area Layers
- Polygon outlines for **6 factory sites (Werksgelände)** — shown in purple
- Polygon outlines for **3 worker settlements (Arbeitersiedlungen)** — shown in green
- Clicking a polygon opens the site detail panel
- Map legend (bottom-left) explains fill colors

### 3. Historical Map Layer
- Third layer button **"Topo"** in the tile layer switcher
- Displays **OpenTopoMap** — traditional German topographic survey style (contour lines, relief shading, German place names)
- Data sources: OpenStreetMap contributors + SRTM elevation data
- License: CC-BY-SA

### 4. Route Suggestion
- Thematic **walking tour** connecting all 13 POIs in a logical geographic loop
- Rendered as a dashed dark-blue polyline
- Numbered waypoint markers show the tour sequence
- Toggled via **"Show walking tour route"** checkbox in the sidebar

### 5. Visual Design
- Two-column layout: map on the left, sidebar on the right
- Filter panel with category, era, and status checkboxes
- Text search within the site list
- Site detail panel with image carousel (prev/next navigation, keyboard support)
- Responsive design for desktop and mobile
- CSS Modules, consistent color language, frosted-glass map legend

---

## Data Sources

- **Site data:** Research-based sample dataset of historical industrial sites in Kaiserslautern
- **Base maps:** OpenStreetMap contributors, ESRI World Imagery, OpenTopoMap / SRTM
- **Preview images:** Unsplash (royalty-free)

---

## Project Structure (Key Files)

```
src/
├── data/heritage-sites.json      # 13 POIs with polygon coords and route order
├── components/
│   ├── MapContainer.jsx          # Map, tile layers, polygons, route
│   ├── PolygonLayer.jsx          # Area polygons for factory sites and settlements
│   ├── RouteLayer.jsx            # Thematic walking tour polyline
│   ├── TileLayerSwitcher.jsx     # OSM / Satellite / Topo switcher
│   ├── FilterControls.jsx        # Filter UI
│   ├── SiteDetails.jsx           # Site detail panel
│   └── ImageGallery.jsx          # Image carousel
└── hooks/
    ├── useFilteredSites.js       # Filter logic
    └── useImageGallery.js        # Gallery navigation
```

---

## Build

```bash
npm install
npm run dev     # Development server at http://localhost:5173
npm run build   # Production build -> dist/
```

Build size: ~376 KB (114 KB gzipped)
