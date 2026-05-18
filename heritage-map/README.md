# Industrial Heritage Mapping App

A modern React + Leaflet.js web application for discovering and exploring industrial heritage sites in Kaiserslautern, Germany. Built as a portfolio project for the ReTra Stadt project at Technische Universität Kaiserslautern.

## 🎯 Features

- **Interactive Map**: OpenStreetMap integration with Leaflet.js centered on Kaiserslautern
- **Site Filtering**: 3-way filtering system (Category, Era, Status)
  - Categories: Factory, Mine, Warehouse, Railway
  - Eras: 1800s, 1900-1950, 1950+
  - Status: Active, Converted, Abandoned, Museum
- **Satellite View**: Toggle between OpenStreetMap and CARTO Satellite tiles
- **Image Gallery**: Carousel view with thumbnail navigation and keyboard support
- **Site Details**: Comprehensive information panel with images, descriptions, and coordinates
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Real-time Search**: Live search through site names and categories
- **Performance**: Memoized filtering and optimized rendering

## 📋 Project Structure

```
src/
├── components/
│   ├── App.jsx                      # Root component
│   ├── MapContainer.jsx             # Map display with Leaflet
│   ├── MarkerList.jsx               # Site list with search
│   ├── SiteDetails.jsx              # Site information panel
│   ├── ImageGallery.jsx             # Image carousel
│   ├── FilterControls.jsx           # Filter checkboxes
│   ├── FilterSidebar.jsx            # Filter container
│   ├── FilterFeedback.jsx           # Filter statistics
│   └── TileLayerSwitcher.jsx        # Map tile selector
├── hooks/
│   ├── useFilteredSites.js          # Filtering logic hook
│   └── useImageGallery.js           # Carousel logic hook
├── utils/
│   └── markerIcons.js               # Marker icon generation
├── data/
│   └── heritage-sites.json          # Site data (10 sites)
├── styles/
│   ├── main.css                     # Global styles & CSS variables
│   ├── App.css                      # Layout styles
│   ├── MapContainer.module.css      # Map component styles
│   ├── SiteDetails.module.css       # Details panel styles
│   ├── FilterControls.module.css    # Filter UI styles
│   ├── FilterSidebar.module.css     # Sidebar toggle styles
│   ├── FilterFeedback.module.css    # Statistics display styles
│   ├── ImageGallery.module.css      # Carousel styles
│   └── MarkerList.module.css        # List component styles
└── main.jsx                         # React entry point
```

## 🚀 Getting Started

### Prerequisites

- Node.js 16.0+
- npm 8.0+

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🛠️ Technology Stack

- **React 18.2.6**: UI Framework
- **Vite 8.0.12**: Build tool & dev server
- **Leaflet 1.9.4**: Map library
- **react-leaflet 5.0.0**: React bindings
- **CSS Modules**: Component scoped styling

## 🎨 Design System

**Colors:**

- Primary: #2c3e50, Secondary: #3498db, Accent: #e74c3c
- Categories: Factory (#8e44ad), Mine (#e67e22), Warehouse (#3498db), Railway (#16a085)

**Spacing:** xs (4px) → sm (8px) → md (16px) → lg (24px) → xl (32px)

**Responsive:** Mobile (<768px) | Tablet (768-1024px) | Desktop (>1024px)

## 📱 Key Components

- **MapContainer**: Renders Leaflet map with markers and popups
- **MarkerList**: Filterable list with search and selection
- **SiteDetails**: Full information panel with gallery
- **FilterControls**: Checkbox-based multi-criteria filtering
- **ImageGallery**: Carousel with keyboard navigation

## 🔗 Custom Hooks

- **useFilteredSites**: Memoized filtering with statistics
- **useImageGallery**: Carousel state management with keyboard support

## 📖 See Also

- [TECHNICAL_DOCS.md](./TECHNICAL_DOCS.md) - Architecture & implementation details
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Build & deployment guide

## 📈 Performance

- Bundle: 367 KB (111 KB gzipped)
- Build time: ~250ms
- 78 modules optimized
- CSS Modules for code splitting

---

**Status**: ✅ Production Ready | **Commits**: 20/31 | **Build**: Passing
