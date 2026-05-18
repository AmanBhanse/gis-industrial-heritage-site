# Technical Documentation

## Architecture Overview

The Industrial Heritage Mapping App uses a component-based React architecture with functional components and custom hooks for state management.

### Data Flow

```
App (state: selectedSite, filters)
  ├── MapContainer (receives: sites, selectedSite)
  ├── FilterSidebar (receives/sends: filters)
  │   ├── FilterControls (handles: filter changes)
  │   └── FilterFeedback (displays: statistics)
  └── SiteDetails or MarkerList
      ├── SiteDetails (displays: site info, images)
      └── MarkerList (displays: filtered list, search)
```

### State Management

**App.jsx State:**
```javascript
const [selectedSite, setSelectedSite] = useState(null)
const [filters, setFilters] = useState({
  categories: [],
  eras: [],
  statuses: []
})
const filteredSites = useFilteredSites(heritageData.sites, filters)
```

## Component Details

### 1. **App.jsx** (Root Container)
**Responsibility**: Orchestrate data flow, manage global state

**Props**: None (root)

**State**:
- `selectedSite`: Current selected site object
- `filters`: Active filter criteria

**Children**:
- MapContainer (filtered sites)
- FilterSidebar (filter controls)
- SiteDetails or MarkerList (conditional)

### 2. **MapContainer.jsx** (Map Display)
**Responsibility**: Render Leaflet map with interactive markers

**Props**:
- `sites`: Array of site objects to display
- `selectedSite`: Current selection (for highlighting)
- `onMarkerClick`: Callback when marker clicked

**Features**:
- Leaflet MapContainer centered on Kaiserslautern (49.4463, 7.7575)
- TileLayer switching (OSM/CARTO Satellite)
- Marker rendering with custom SVG icons
- Popup on marker click
- Active marker glow animation

### 3. **MarkerList.jsx** (Site List)
**Responsibility**: Display searchable list of sites with selection

**Props**:
- `sites`: Filtered sites array
- `selectedSite`: Current selection
- `onSelectSite`: Callback on site selection

**Features**:
- Real-time search by name/category
- Category color indicators
- Active site highlighting
- Site count statistics

### 4. **SiteDetails.jsx** (Information Panel)
**Responsibility**: Display comprehensive site information

**Props**:
- `site`: Selected site object
- `onClose`: Close button callback

**Features**:
- Image gallery with carousel
- Category and status badges
- Quick info grid (Year, Era, Status)
- Description section
- Additional info panel
- GPS coordinates

### 5. **ImageGallery.jsx** (Image Carousel)
**Responsibility**: Display images with navigation

**Props**:
- `images`: Array of image URLs
- `siteName`: Site name for accessibility

**Features**:
- Main image display
- Previous/Next buttons
- Thumbnail strip
- Image counter
- Keyboard navigation (←/→ arrows)
- Lazy loading

**Hook Used**: `useImageGallery`

### 6. **FilterControls.jsx** (Filter UI)
**Responsibility**: Render filter checkboxes

**Props**:
- `filters`: Current filter state
- `onFilterChange`: Callback on filter change

**Features**:
- Three filter groups: Categories, Eras, Statuses
- Color-coded checkboxes
- Category color indicators
- Reset button
- Active filter badge

### 7. **FilterSidebar.jsx** (Filter Container)
**Responsibility**: Collapsible wrapper for filters

**Props**:
- `filters`: Current filters
- `onFilterChange`: Filter change callback

**Features**:
- Expandable/collapsible toggle
- Smooth animations
- Mobile-friendly design

### 8. **FilterFeedback.jsx** (Statistics Display)
**Responsibility**: Show filtering results

**Props**:
- `sites`: All sites
- `filteredSites`: Filtered results
- `filters`: Current filter state

**Features**:
- "Showing X of Y sites" message
- Filter statistics
- "No sites match" message when empty
- Responsive display

### 9. **TileLayerSwitcher.jsx** (Map Layers)
**Responsibility**: Allow tile provider switching

**Props**:
- `onLayerChange`: Layer change callback

**Features**:
- Toggle between OSM and Satellite
- Visual indicator of active layer

## Custom Hooks

### useFilteredSites
**Location**: `src/hooks/useFilteredSites.js`

**Purpose**: Memoized filtering logic for sites

**Usage**:
```javascript
const filteredSites = useFilteredSites(sites, filters)
```

**Returns**:
```javascript
filteredSites // Array of filtered sites
```

**Exports**:
- `useFilteredSites(sites, filters)`: Main hook
- `getFilterStats(sites, filteredSites)`: Statistics utility

**Implementation**:
- Uses `useMemo` to prevent unnecessary recalculations
- Checks all three filter categories (categories, eras, statuses)
- Returns all sites if no filters active
- Dependencies: sites array, filter values

### useImageGallery
**Location**: `src/hooks/useImageGallery.js`

**Purpose**: Carousel state and navigation management

**Usage**:
```javascript
const { currentIndex, handlePrevious, handleNext, handleThumbnailClick, handleKeyDown, hasImages } = useImageGallery(images)
```

**Returns**:
```javascript
{
  currentIndex,           // Current image index
  handlePrevious,         // Navigate to previous (circular)
  handleNext,             // Navigate to next (circular)
  handleThumbnailClick,   // Jump to specific thumbnail
  handleKeyDown,          // Keyboard event handler
  hasImages,              // Validation boolean
  imageCount,             // Total images
  currentImage            // Current image URL (memoized)
}
```

**Features**:
- Memoized functions with `useCallback`
- Circular navigation (loops at ends)
- Keyboard support (arrow keys)
- Input validation

## Utility Functions

### markerIcons.js
**Location**: `src/utils/markerIcons.js`

**Exports**:
- `createCategoryIcon(category)`: Creates marker icon with emoji
- `getCategoryColor(category)`: Returns hex color for category
- `getCategoryLabel(category)`: Returns display label
- `createActiveMarkerIcon(category)`: Creates highlighted icon

**Features**:
- SVG-based icons with emojis
- Base64 encoding (no external image files)
- Category-specific colors
- Glow effect for active markers

## Styling System

### CSS Architecture
- **Global**: `src/styles/main.css` - Variables, base styles, typography
- **Layout**: `src/App.css` - Container layout, responsive design
- **Modules**: Component-specific `.module.css` files

### CSS Variables
```css
:root {
  /* Colors */
  --primary: #2c3e50
  --secondary: #3498db
  --accent: #e74c3c
  
  /* Category Colors */
  --factory: #8e44ad
  --mine: #e67e22
  --warehouse: #3498db
  --railway: #16a085
  
  /* Spacing */
  --spacing-xs: 4px
  --spacing-sm: 8px
  --spacing-md: 16px
  --spacing-lg: 24px
  --spacing-xl: 32px
  
  /* Typography */
  --font-family: system fonts
  --font-size-base: 16px
  --font-size-lg: 18px
  --font-size-2xl: 32px
  
  /* Shadows & Transitions */
  --shadow-md: 0 4px 8px rgba(...)
  --transition: all 0.3s ease
}
```

### Responsive Design
- **Mobile** (<768px): Full-height map, bottom sidebar
- **Tablet** (768-1024px): Responsive layout
- **Desktop** (>1024px): Side-by-side with 360px sidebar

## Data Format

### Site Object
```javascript
{
  id: 1,
  name: "Steelworks",
  category: "factory",
  yearBuilt: 1889,
  era: "1800s",
  status: "museum",
  lat: 49.4,
  lng: 7.75,
  description: "...",
  images: ["url1", "url2"],
  additionalInfo: "..."
}
```

### Filter Object
```javascript
{
  categories: [],  // ["factory", "mine"] or []
  eras: [],        // ["1800s", "1900-1950", "1950+"] or []
  statuses: []     // ["active", "converted", "abandoned", "museum"] or []
}
```

## Performance Optimizations

### Memoization
- `useFilteredSites`: Prevents recalculation on every render
- `useCallback` in hooks: Stable function references
- `useMemo` for derived values: Image count, validation

### Code Splitting
- Vite automatically chunks code
- Dynamic imports possible for large components

### CSS Modules
- Scoped styles reduce namespace collisions
- Tree-shaking removes unused styles

### Build Optimization
- Production build: 367 KB (111 KB gzipped)
- 78 modules optimized
- Minified and compressed assets

## Testing Considerations

### Component Testing Points
- Filter application (categories, eras, statuses)
- Site selection and deselection
- Image navigation (prev, next, thumbnails)
- Search functionality
- Map marker interaction
- Responsive layout breakpoints

### Hook Testing
- `useFilteredSites` with various filter combinations
- `useImageGallery` navigation and keyboard input
- Memoization behavior

### Integration Tests
- Filter → MapContainer updates
- Site selection → SiteDetails display
- Image gallery keyboard navigation

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Known Limitations

- Static data (JSON file)
- 10 sample sites included
- No backend API integration
- No user authentication
- No data persistence

## Future Enhancements

- Backend API integration
- User accounts & favorites
- Advanced search (full-text, distance-based)
- Image upload functionality
- Route planning
- Historical timeline view
- Multi-language support
- Accessibility improvements (ARIA labels)

---

**Last Updated**: May 2026
**Version**: 1.0.0
**Status**: Production Ready
