# Industrial Heritage Mapping App - Implementation Plan

## Project Overview

An interactive web map showcasing industrial heritage sites in Kaiserslautern using Leaflet.js. Designed to demonstrate GIS capabilities and cultural heritage mapping for HiWi position application.

---

## Quick Reference: Task Status

- [ ] ✅ = Completed
- [ ] 🔄 = In Progress
- [ ] ⏳ = Not Started

---

# PHASE 1: PROJECT SETUP (45 min)

## Commit 1.1: Initialize React Project with Vite (15 min)

- [ ] Create new React + Vite project
  ```bash
  npm create vite@latest heritage-map -- --template react
  cd heritage-map
  npm install
  ```
- [ ] Verify project structure created
- [ ] Test: `npm run dev` starts without errors
- **Commit message:** `init: Create React + Vite project structure`

---

## Commit 1.2: Install Map Dependencies (10 min)

- [ ] Install required packages:
  ```bash
  npm install react-leaflet leaflet leaflet-control-geocoder
  ```
- [ ] Verify installation: check `package.json`
- [ ] Test: No build errors
- **Commit message:** `deps: Install react-leaflet and leaflet dependencies`

---

## Commit 1.3: Create Folder Structure (10 min)

- [ ] Create directories:
  - `src/components/`
  - `src/hooks/`
  - `src/data/`
  - `src/styles/`
  - `public/assets/images/`
  - `public/assets/icons/`
- [ ] Verify folder structure
- **Commit message:** `structure: Create directory structure for components and data`

---

## Commit 1.4: Setup Global Styles & App Component (10 min)

- [ ] Create `src/styles/main.css` with:
  - Reset CSS
  - Global variables (colors, fonts, spacing)
  - Base HTML/body styles
- [ ] Update `src/App.jsx` with basic structure
- [ ] Update `src/index.css` for baseline styles
- [ ] Test: App renders without errors
- **Commit message:** `style: Add global styles and setup App component`

---

# PHASE 2: MAP BASE & CORE DATA (60 min)

## Commit 2.1: Create Heritage Sites Data (15 min)

- [ ] Create `src/data/heritage-sites.json` with structure:
  ```json
  {
    "sites": [
      {
        "id": 1,
        "name": "Site Name",
        "category": "factory",
        "yearBuilt": 1887,
        "status": "converted",
        "era": "1800s",
        "lat": 49.4463,
        "lng": 7.7575,
        "description": "...",
        "images": ["url1", "url2"],
        "additionalInfo": "..."
      }
    ]
  }
  ```
- [ ] Add 8-10 sample heritage sites for Kaiserslautern region
- [ ] Verify JSON is valid
- **Commit message:** `data: Add heritage sites sample data with 10 locations`

---

## Commit 2.2: Create MapContainer Component (15 min)

- [ ] Create `src/components/MapContainer.jsx` with:
  - MapContainer from react-leaflet centered on Kaiserslautern (49.4463, 7.7575)
  - TileLayer with OpenStreetMap
  - Zoom level 12
  - Basic styling
- [ ] Create `src/styles/MapContainer.module.css`
- [ ] Test: Map displays correctly in browser
- **Commit message:** `feat: Add MapContainer component with OpenStreetMap layer`

---

## Commit 2.3: Create TileLayer Switcher Component (15 min)

- [ ] Create `src/components/TileLayerSwitcher.jsx`
- [ ] Implement:
  - State for active layer
  - Conditional rendering of TileLayer (OpenStreetMap vs Satellite)
  - Layer toggle button
- [ ] Style in `src/styles/TileLayerSwitcher.module.css`
- [ ] Test: Can switch between layers
- **Commit message:** `feat: Add tile layer switcher (OSM + Satellite)`

---

## Commit 2.4: Integrate Data into MapContainer (15 min)

- [ ] Import heritage sites data in MapContainer
- [ ] Pass data as prop to child components (preparation for markers)
- [ ] Add console logging to verify data is accessible
- [ ] Test: Data loads without errors
- **Commit message:** `feat: Load and integrate heritage sites data into map`

---

# PHASE 3: MARKERS & DISPLAY (55 min)

## Commit 3.1: Create HeritageMarker Component (15 min)

- [ ] Create `src/components/HeritageMarker.jsx`
- [ ] Props: `site` object, `onMarkerClick` handler
- [ ] Implement:
  - Marker at site coordinates
  - Custom icon based on category (different colors)
  - Click handler to emit site selection
- [ ] Create marker icons (use emoji or simple colored circles)
- [ ] Create `src/styles/HeritageMarker.module.css`
- [ ] Test: Markers appear on map
- **Commit message:** `feat: Add HeritageMarker component with category-based icons`

---

## Commit 3.2: Create MarkerList Component (10 min)

- [ ] Create `src/components/MarkerList.jsx`
- [ ] Props: `sites` array, `onMarkerClick` handler
- [ ] Loop through sites and render HeritageMarker for each
- [ ] Pass click handler to each marker
- [ ] Test: All 10 markers appear on map
- **Commit message:** `feat: Add MarkerList component to render all markers`

---

## Commit 3.3: Create ImageGallery Component (15 min)

- [ ] Create `src/components/ImageGallery.jsx`
- [ ] Props: `images` array, `siteTitle`
- [ ] Implement:
  - Display current image
  - Previous/Next buttons
  - Image counter (1/3, etc.)
  - Alt text for accessibility
- [ ] Create `src/styles/ImageGallery.module.css`
- [ ] Test: Can navigate through multiple images
- **Commit message:** `feat: Add ImageGallery component with carousel navigation`

---

## Commit 3.4: Create SiteDetails Component (15 min)

- [ ] Create `src/components/SiteDetails.jsx`
- [ ] Props: `site` object, `onClose` handler
- [ ] Implement:
  - Modal/panel layout
  - ImageGallery component for images
  - Site name, category, year built, status
  - Full description
  - Close button
- [ ] Create `src/styles/SiteDetails.module.css`
- [ ] Test: Modal displays correctly with all info
- **Commit message:** `feat: Add SiteDetails component with full site information`

---

## Commit 3.5: Wire Up Marker Click to Show Details (10 min)

- [ ] Add state in `App.jsx` for selected site
- [ ] Create handlers: `handleMarkerClick()`, `handleCloseSiteDetails()`
- [ ] Pass handlers to MarkerList
- [ ] Conditionally render SiteDetails when site is selected
- [ ] Test: Click marker → Details appear; Click close → Details hide
- **Commit message:** `feat: Connect marker clicks to display site details panel`

---

# PHASE 4: FILTERING SYSTEM (60 min)

## Commit 4.1: Create FilterControls Component (10 min)

- [ ] Create `src/components/FilterControls.jsx`
- [ ] Props: filter options (categories, eras, statuses), `onFilterChange` handler
- [ ] Render checkboxes for each filter option
- [ ] Create `src/styles/FilterControls.module.css`
- [ ] Test: Checkboxes render and are clickable
- **Commit message:** `feat: Add FilterControls component with filter options`

---

## Commit 4.2: Create FilterSidebar Component (15 min)

- [ ] Create `src/components/FilterSidebar.jsx`
- [ ] Implement:
  - Category filters (factory, mine, warehouse, railway, etc.)
  - Era filters (pre-1900, 1900-1950, 1950-2000, post-2000)
  - Status filters (active, abandoned, converted)
- [ ] Render FilterControls for each filter group
- [ ] Add "Clear All" button
- [ ] Create `src/styles/FilterSidebar.module.css`
- [ ] Test: All filter options display
- **Commit message:** `feat: Add FilterSidebar with category, era, and status filters`

---

## Commit 4.3: Create useFilteredSites Custom Hook (15 min)

- [ ] Create `src/hooks/useFilteredSites.js`
- [ ] Implement:
  - Accept sites array and active filters as parameters
  - Filter logic for category, era, and status
  - Return filtered sites array
- [ ] Test with console logs: verify filtering works correctly
- **Commit message:** `feat: Add useFilteredSites hook for filter logic`

---

## Commit 4.4: Integrate Filter State in App (15 min)

- [ ] Add filter state in `App.jsx`:
  - activeCategories
  - activeEras
  - activeStatuses
- [ ] Create `handleFilterChange()` handler
- [ ] Use `useFilteredSites` hook to get filtered sites
- [ ] Pass filtered sites to MarkerList
- [ ] Test: Filters work and markers update
- **Commit message:** `feat: Integrate filter state and apply filtering to markers`

---

## Commit 4.5: Add Filter Feedback UI (5 min)

- [ ] Display active filter count
- [ ] Show "showing X of Y sites" message
- [ ] Style feedback text
- [ ] Test: Count updates as filters change
- **Commit message:** `feat: Add filter feedback showing active filters count`

---

# PHASE 5: UI LAYOUT & STYLING (55 min)

## Commit 5.1: Create Layout Component (10 min)

- [ ] Create `src/components/Layout.jsx`
- [ ] Structure:
  - Header section (title, description)
  - Main content area with map and sidebar
  - Flexbox/Grid for responsive layout
- [ ] Create `src/styles/Layout.module.css`
- [ ] Test: Layout displays correctly
- **Commit message:** `feat: Add Layout component for overall page structure`

---

## Commit 5.2: Add Header Component (10 min)

- [ ] Create `src/components/Header.jsx`
- [ ] Include:
  - App title
  - Short description
  - Project subtitle
- [ ] Create `src/styles/Header.module.css`
- [ ] Test: Header displays at top
- **Commit message:** `feat: Add Header component with title and description`

---

## Commit 5.3: Style MapContainer & Details Panel (15 min)

- [ ] Update `MapContainer.module.css`:
  - Full height container
  - Proper spacing and borders
- [ ] Update `SiteDetails.module.css`:
  - Modal/panel styling with animations
  - Close button positioning
  - Responsive width
- [ ] Test: Responsive on desktop/mobile
- **Commit message:** `style: Add styling for map container and details panel`

---

## Commit 5.4: Style FilterSidebar (15 min)

- [ ] Update `FilterSidebar.module.css`:
  - Sidebar container styling
  - Filter section spacing
  - Checkbox/button styling
  - Active state styling
- [ ] Add hover effects and transitions
- [ ] Test: Interactive and visually appealing
- **Commit message:** `style: Add FilterSidebar styling with interactive elements`

---

## Commit 5.5: Add Responsive Design (5 min)

- [ ] Create `src/styles/responsive.css`
- [ ] Media queries for:
  - Mobile (< 768px): Stack layout vertically
  - Tablet (768px - 1024px): Adjusted spacing
  - Desktop (> 1024px): Side-by-side layout
- [ ] Add hamburger menu for mobile (collapse filters)
- [ ] Test: Responsive on different screen sizes
- **Commit message:** `style: Add responsive design for mobile, tablet, desktop`

---

# PHASE 6: CUSTOM HOOKS & OPTIMIZATION (25 min)

## Commit 6.1: Create useImageCarousel Hook (10 min)

- [ ] Create `src/hooks/useImageCarousel.js`
- [ ] Implement:
  - State for current image index
  - `nextImage()` and `previousImage()` functions
  - Handle edge cases (wrap around)
- [ ] Test: Hook works in ImageGallery component
- **Commit message:** `feat: Add useImageCarousel custom hook for gallery navigation`

---

## Commit 6.2: Refactor ImageGallery to Use Hook (15 min)

- [ ] Update `ImageGallery.jsx` to use `useImageCarousel` hook
- [ ] Remove inline state logic
- [ ] Verify gallery navigation still works
- [ ] Test: All functionality preserved
- **Commit message:** `refactor: Use useImageCarousel hook in ImageGallery component`

---

# PHASE 7: DOCUMENTATION & DEPLOYMENT (40 min)

## Commit 7.1: Add JSDoc Comments to Components (15 min)

- [ ] Add JSDoc blocks to all components:
  - Props description
  - Return type
  - Usage examples
- [ ] Add inline comments for complex logic
- [ ] Focus on: MapContainer, FilterSidebar, useFilteredSites
- [ ] Test: Verification in IDE shows documentation
- **Commit message:** `docs: Add JSDoc comments to components`

---

## Commit 7.2: Create README.md (10 min)

- [ ] Include sections:
  - Project description
  - Installation steps
  - How to run locally (`npm install`, `npm run dev`)
  - Project structure overview
  - How to add new heritage sites
  - How to modify filter categories
  - Technologies used
- **Commit message:** `docs: Add comprehensive README with setup instructions`

---

## Commit 7.3: Create TECHNICAL_DOCS.md (10 min)

- [ ] Document:
  - Component architecture diagram (ASCII)
  - Data schema explanation
  - Custom hooks API
  - Filter logic explanation
  - Future CMS integration guide
- **Commit message:** `docs: Add technical documentation for maintainability`

---

## Commit 7.4: Build & Deploy (5 min)

- [ ] Build production version: `npm run build`
- [ ] Deploy to Vercel or Netlify
- [ ] Verify deployed site works
- [ ] Get live URL
- **Commit message:** `deploy: Build and deploy to Vercel/Netlify`

---

# PHASE 8: TESTING & FINAL POLISH (25 min)

## Commit 8.1: Test All Features (10 min)

- [ ] Test checklist:
  - [ ] Map displays correctly
  - [ ] Layer switcher works
  - [ ] All markers appear
  - [ ] Marker click shows details
  - [ ] Image carousel works
  - [ ] All filters work
  - [ ] Clear filters button works
  - [ ] Responsive on mobile
  - [ ] No console errors
- **Commit message:** `test: Verify all features work as expected`

---

## Commit 8.2: Bug Fixes & Cleanup (10 min)

- [ ] Fix any visual inconsistencies
- [ ] Remove unused imports/variables
- [ ] Optimize performance if needed
- [ ] Final styling tweaks
- **Commit message:** `fix: Final polish and bug fixes`

---

## Commit 8.3: Add Demo/Screenshots (5 min)

- [ ] Take screenshots of:
  - Map with all markers
  - Filtered view
  - Site details panel
  - Mobile view
- [ ] Add to README.md or create `DEMO.md`
- **Commit message:** `docs: Add screenshots and demo information`

---

# Summary

**Total Commits:** 31 small, focused commits
**Total Time:** 3.5-4.5 hours
**Each Commit:** 5-15 minutes of focused work

**Commit Order for Best Reviews:**

1. Setup phase (1.1-1.4): Foundation
2. Core data & map (2.1-2.4): Map functionality
3. Markers & details (3.1-3.5): Display features
4. Filters (4.1-4.5): Filtering logic
5. UI/Styling (5.1-5.5): Polish
6. Optimization (6.1-6.2): Performance
7. Documentation (7.1-7.4): Long-term maintainability
8. Testing (8.1-8.3): Verification

---

# Dependency Graph (What to do first)

```
1.1 → 1.2 → 1.3 → 1.4
            ↓
         2.1 → 2.2 → 2.3 → 2.4
            ↓
         3.1 → 3.2 → 3.3 → 3.4 → 3.5
            ↓
         4.1 → 4.2 → 4.3 → 4.4 → 4.5
            ↓
         5.1 → 5.2 → 5.3 → 5.4 → 5.5
            ↓
         6.1 → 6.2
            ↓
         7.1 → 7.2 → 7.3 → 7.4
            ↓
         8.1 → 8.2 → 8.3
```

---

# Data Schema (Reference)

```json
{
  "sites": [
    {
      "id": 1,
      "name": "Kaiserlautern Steelworks",
      "category": "factory",
      "yearBuilt": 1887,
      "status": "converted",
      "era": "1800s",
      "lat": 49.4463,
      "lng": 7.7575,
      "description": "Historic steel manufacturing facility...",
      "images": ["url1.jpg", "url2.jpg"],
      "additionalInfo": "Now houses offices and cultural spaces"
    }
  ]
}
```

---

# Technology Stack

- **Frontend Framework:** React 18.x with Vite
- **Mapping:** React-Leaflet 4.x (Leaflet wrapper)
- **Core Maps:** Leaflet.js 1.9.x
- **Styling:** CSS Modules + Global CSS
- **Data Format:** JSON (heritage-sites.json)
- **Tile Providers:** OpenStreetMap, OpenTopoMap
- **State Management:** React Hooks (useState, useEffect)
- **Custom Hooks:** useFilteredSites, useImageCarousel
- **Media:** Sample images from free sources (Unsplash, Pexels)
- **Hosting:** Vercel/Netlify (free tier)
- **Build Tool:** Vite
- **Package Manager:** npm

---

# File Structure

```
heritage-map/
├── src/
│   ├── components/
│   │   ├── App.jsx
│   │   ├── Layout.jsx
│   │   ├── Header.jsx
│   │   ├── MapContainer.jsx
│   │   ├── TileLayerSwitcher.jsx
│   │   ├── MarkerList.jsx
│   │   ├── HeritageMarker.jsx
│   │   ├── FilterSidebar.jsx
│   │   ├── FilterControls.jsx
│   │   ├── SiteDetails.jsx
│   │   └── ImageGallery.jsx
│   ├── hooks/
│   │   ├── useFilteredSites.js
│   │   └── useImageCarousel.js
│   ├── data/
│   │   └── heritage-sites.json
│   ├── styles/
│   │   ├── main.css
│   │   ├── MapContainer.module.css
│   │   ├── TileLayerSwitcher.module.css
│   │   ├── FilterSidebar.module.css
│   │   ├── FilterControls.module.css
│   │   ├── SiteDetails.module.css
│   │   ├── ImageGallery.module.css
│   │   ├── Layout.module.css
│   │   ├── Header.module.css
│   │   └── responsive.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── public/
│   ├── assets/
│   │   ├── images/
│   │   └── icons/
│   └── index.html
├── plans/
│   ├── IMPLEMENTATION_PLAN.md
│   └── PROGRESS_TRACKER.md (create during development)
├── package.json
├── vite.config.js
├── README.md
├── TECHNICAL_DOCS.md
└── .gitignore
```

---

# Notes

- All sample data will be created synthetically (no real API calls for MVP)
- Images will use free stock photos from Unsplash/Pexels
- Fully responsive and accessible (WCAG standards)
- Optimized for both desktop and mobile viewing
- Start with Commit 1.1 and proceed sequentially for best results
- Each commit should be atomic and independently testable

- [ ] Create React project with Vite
  ```bash
  npm create vite@latest heritage-map -- --template react
  cd heritage-map
  npm install
  ```
- [ ] Install dependencies:
  - `react-leaflet` - React wrapper for Leaflet
  - `leaflet` - Core mapping library
  - `leaflet-control-geocoder` (optional, for search)
- [ ] Create folder structure:
  - `src/components/` - React components
  - `src/data/` - Sample GeoJSON data
  - `src/styles/` - CSS modules
  - `public/assets/` - Images and icons
- [ ] Setup basic App component with Leaflet map
- [ ] Configure TypeScript (optional but recommended)

---

## Phase 2: Map Base & Core Functionality (45 min)

### 2.1 Map Component (React-Leaflet)

- [ ] Create `MapContainer.jsx` component with:
  - MapContainer centered on Kaiserslautern (49.4463°N, 7.7575°E)
  - TileLayer switcher (OpenStreetMap, Satellite)
  - Zoom and pan controls
  - Attribution control
- [ ] Create `TileLayerSwitcher.jsx` component for layer selection
- [ ] Implement state management with `useState` for active layer

### 2.2 Sample Data Structure

- [ ] Create `src/data/heritage-sites.json` with 8-10 industrial heritage sites
- [ ] Each site includes:
  - Coordinates (lat/lng)
  - Name
  - Category (factory, mine, warehouse, railway, etc.)
  - Year built
  - Description (100-150 words)
  - Status (active, abandoned, converted, etc.)
  - 2-3 image URLs
- [ ] Export data as JavaScript module for easy access

---

## Phase 3: Location Markers & Popups (40 min)

- [ ] Create `HeritageMarker.jsx` component for individual markers
  - Custom icon rendering based on category
  - Click handler to display details
- [ ] Create `MarkerList.jsx` to render all markers from GeoJSON
- [ ] Create `SiteDetails.jsx` modal/panel component with:
  - Site name and photo gallery
  - Category and year built
  - Full description
  - Current status
  - Close button
- [ ] Implement state management to track selected site
- [ ] Add click event handlers for marker interaction

---

## Phase 4: Filtering System (50 min)

- [ ] Create `FilterSidebar.jsx` component with:
  - Category filter (checkboxes)
  - Era filter (radio buttons or multi-select)
  - Status filter (checkboxes)
- [ ] Create `FilterControls.jsx` for individual filter items
- [ ] Implement filter state with `useState`
  - Track active filters
  - Update markers based on filters
- [ ] Create `useFilteredSites.js` custom hook to:
  - Filter sites based on active filters
  - Return filtered array for marker rendering
- [ ] Show active filter count
- [ ] "Clear All Filters" button with reset functionality

---

## Phase 5: UI & Styling (50 min)

- [ ] Create `Layout.jsx` component for overall structure:
  - Header with title and description
  - Main content area (map + sidebar)
  - Responsive grid layout
- [ ] Create CSS modules for each component:
  - `MapContainer.module.css`
  - `FilterSidebar.module.css`
  - `SiteDetails.module.css`
  - `main.css` (global styles)
- [ ] Implement responsive design:
  - Flexbox/Grid layouts
  - Mobile hamburger menu for filters
  - Desktop sidebar
- [ ] Styling for:
  - Active/inactive filters
  - Markers and icons
  - Buttons and controls
  - Modal/panel animations
- [ ] Color scheme and typography setup

---

## Phase 6: Image Gallery & Media (35 min)

- [ ] Create `ImageGallery.jsx` component with:
  - Carousel/lightbox functionality
  - Navigation arrows
  - Image counter (1/3, 2/3, etc.)
- [ ] Implement `useImageCarousel.js` custom hook:
  - Track current image index
  - Handle next/previous navigation
- [ ] Add image lazy loading optimization
- [ ] Semantic HTML with proper alt text for accessibility
- [ ] Prepare data structure for audio support (future feature)

---

## Phase 7: Polish & Deployment (35 min)

- [ ] Testing
  - Test on mobile/desktop browsers
  - Fix responsive design issues
  - Test all filter combinations
  - Verify marker interactions
- [ ] Code quality
  - Add JSDoc comments to components
  - Remove unused imports
  - Consistent naming conventions
- [ ] Documentation
  - Create `TECHNICAL_DOCS.md` with:
    - Component architecture
    - How to add new sites
    - How to modify categories
    - CMS integration guide (future)
  - Update `README.md` with setup/usage
- [ ] Build & Deploy
  - `npm run build`
  - Deploy to Vercel/Netlify
  - Test live deployment

---

## Data Schema (Sample)

```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [7.7575, 49.4463]
      },
      "properties": {
        "id": 1,
        "name": "Kaiserlautern Steelworks",
        "category": "factory",
        "yearBuilt": 1887,
        "status": "converted",
        "description": "Historic steel manufacturing facility...",
        "images": ["url1.jpg", "url2.jpg"],
        "era": "1800s"
      }
    }
  ]
}
```

---

## Technology Stack

- **Frontend Framework:** React 18.x with Vite
- **Mapping:** React-Leaflet 4.x (Leaflet wrapper)
- **Core Maps:** Leaflet.js 1.9.x
- **Styling:** CSS Modules + Global CSS
- **Data Format:** JSON (heritage-sites.json)
- **Tile Providers:** OpenStreetMap, OpenTopoMap
- **State Management:** React Hooks (useState, useEffect)
- **Custom Hooks:** useFilteredSites, useImageCarousel
- **Media:** Sample images from free sources (Unsplash, Pexels)
- **Hosting:** Vercel/Netlify (free tier)
- **Build Tool:** Vite
- **Package Manager:** npm

---

## File Structure

```
heritage-map/
├── src/
│   ├── components/
│   │   ├── App.jsx
│   │   ├── Layout.jsx
│   │   ├── MapContainer.jsx
│   │   ├── TileLayerSwitcher.jsx
│   │   ├── MarkerList.jsx
│   │   ├── HeritageMarker.jsx
│   │   ├── FilterSidebar.jsx
│   │   ├── FilterControls.jsx
│   │   ├── SiteDetails.jsx
│   │   └── ImageGallery.jsx
│   ├── hooks/
│   │   ├── useFilteredSites.js
│   │   └── useImageCarousel.js
│   ├── data/
│   │   └── heritage-sites.json
│   ├── styles/
│   │   ├── main.css
│   │   ├── MapContainer.module.css
│   │   ├── FilterSidebar.module.css
│   │   ├── SiteDetails.module.css
│   │   ├── ImageGallery.module.css
│   │   └── responsive.css
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── public/
│   ├── assets/
│   │   ├── images/
│   │   └── icons/
│   └── index.html
├── plans/
│   └── IMPLEMENTATION_PLAN.md
├── package.json
├── vite.config.js
├── README.md
└── TECHNICAL_DOCS.md
```

---

## Estimated Timeline

- **Total Time:** 3.5-4.5 hours
- Phase 1: 45 min (React setup takes longer)
- Phase 2: 45 min
- Phase 3: 40 min
- Phase 4: 50 min
- Phase 5: 50 min
- Phase 6: 35 min
- Phase 7: 35 min

_React adds ~15 min setup but saves ~15 min on component development_

---

## Deliverables for Application

1. ✅ GitHub repository with clean code
2. ✅ Live demo (hosted on Vercel/Netlify)
3. ✅ README with setup/usage instructions
4. ✅ Technical documentation for maintainability
5. ✅ Responsive design proof
6. ✅ Portfolio-ready project

---

## Future Enhancements (Post-MVP)

- [ ] Backend CMS integration (WordPress API)
- [ ] User authentication for admin panel
- [ ] Audio file support
- [ ] Advanced search functionality
- [ ] Timeline view of industrial evolution
- [ ] User comments/ratings
- [ ] Social sharing
- [ ] Print map functionality

---

## Notes

- All sample data will be created synthetically (no real API calls for MVP)
- Images will use free stock photos from Unsplash/Pexels
- Fully responsive and accessible (WCAG standards)
- Optimized for both desktop and mobile viewing
