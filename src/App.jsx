import { useState } from 'react'
import './App.css'
import Layout from './components/Layout'
import AppSidebar from './components/AppSidebar'
import MapContainer from './components/MapContainer'
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

  const headerContent = (
    <div className="header-inner">
      <span className="header-icon">🏭</span>
      <div className="header-text">
        <span className="header-title">Industrial Heritage Map</span>
        <span className="header-subtitle">Kaiserslautern</span>
      </div>
    </div>
  )

  const sidebarContent = (
    <AppSidebar
      sites={heritageData.sites}
      filteredSites={filteredSites}
      filters={filters}
      onFilterChange={handleFilterChange}
      selectedSite={selectedSite}
      onSelectSite={handleSelectSite}
      onCloseSiteDetails={handleCloseSiteDetails}
      showRoute={showRoute}
      onRouteToggle={setShowRoute}
    />
  )

  return (
    <Layout header={headerContent} sidebar={sidebarContent}>
      <MapContainer
        sites={filteredSites}
        selectedSite={selectedSite}
        onMarkerClick={handleMarkerClick}
        allSites={heritageData.sites}
        route={heritageData.route}
        showRoute={showRoute}
      />
    </Layout>
  )
}

export default App
