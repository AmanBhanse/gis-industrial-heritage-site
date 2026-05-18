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
 * Root component for Industrial Heritage Mapping application
 */
function App() {
  const [selectedSite, setSelectedSite] = useState(null)
  const [filters, setFilters] = useState({
    categories: [],
    eras: [],
    statuses: []
  })

  // Get filtered sites based on current filters
  const filteredSites = useFilteredSites(heritageData.sites, filters)

  // Handler for when a marker is clicked on the map
  const handleMarkerClick = (site) => {
    setSelectedSite(site)
  }

  // Handler for when a site is selected from the list
  const handleSelectSite = (site) => {
    setSelectedSite(site)
  }

  // Handler for when a filter changes
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
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
