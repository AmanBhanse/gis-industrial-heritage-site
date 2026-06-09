import { useState } from 'react'
import './App.css'
import MapContainer from './components/MapContainer'
import MarkerList from './components/MarkerList'
import SiteDetails from './components/SiteDetails'
import FilterSidebar from './components/FilterSidebar'
import FilterFeedback from './components/FilterFeedback'
import { useFilteredSites } from './hooks/useFilteredSites'
import heritageData from './data/heritage-sites.json'

/**
 * Main App Component
 * 
 * Root component for Industrial Heritage Mapping application.
 * Orchestrates data flow between map, filters, and site details.
 * Manages global state for site selection and filter criteria.
 * 
 * @component
 * @returns {JSX.Element} The main app container with header, map, and sidebar
 * 
 * @state {Object} selectedSite - Currently selected heritage site object or null
 * @state {Object} filters - Active filter criteria { categories, eras, statuses }
 * 
 * @example
 * <App />
 */
function App() {
  // State management
  const [selectedSite, setSelectedSite] = useState(null)
  const [showRoute, setShowRoute] = useState(false)
  const [filters, setFilters] = useState({
    categories: [],
    eras: [],
    statuses: []
  })

  // Get filtered sites based on current filters using custom hook
  const filteredSites = useFilteredSites(heritageData.sites, filters)

  /**
   * Handle marker click event from map
   * @param {Object} site - Site object clicked on map
   */
  const handleMarkerClick = (site) => {
    setSelectedSite(site)
  }

  /**
   * Handle site selection from list
   * @param {Object} site - Site object selected from list
   */
  const handleSelectSite = (site) => {
    setSelectedSite(site)
  }

  /**
   * Handle filter changes from filter controls
   * @param {Object} newFilters - Updated filter criteria
   */
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
  }

  /**
   * Handle closing site details panel
   */
  const handleCloseSiteDetails = () => {
    setSelectedSite(null)
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Industrial Heritage Map</h1>
        <p>Explore the industrial history of Kaiserslautern</p>
      </header>
      
      <main className="app-main">
        <MapContainer 
          sites={filteredSites} 
          selectedSite={selectedSite}
          onMarkerClick={handleMarkerClick}
          allSites={heritageData.sites}
          route={heritageData.route}
          showRoute={showRoute}
        />
        <div className="sidebar">
          <FilterSidebar
            filters={filters}
            onFilterChange={handleFilterChange}
          />
          {!selectedSite && (
            <FilterFeedback
              sites={heritageData.sites}
              filteredSites={filteredSites}
              filters={filters}
            />
          )}
          <div className="route-toggle">
            <label className="route-toggle-label">
              <input
                type="checkbox"
                checked={showRoute}
                onChange={(e) => setShowRoute(e.target.checked)}
              />
              <span>🗺️ Show walking tour route</span>
            </label>
          </div>
          {selectedSite ? (
            <SiteDetails
              site={selectedSite}
              onClose={handleCloseSiteDetails}
            />
          ) : (
            <MarkerList
              sites={filteredSites}
              selectedSite={selectedSite}
              onSelectSite={handleSelectSite}
            />
          )}
        </div>
      </main>
    </div>
  )
}

export default App
