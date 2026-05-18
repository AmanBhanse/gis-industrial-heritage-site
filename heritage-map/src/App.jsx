import { useState } from 'react'
import './App.css'
import MapContainer from './components/MapContainer'
import MarkerList from './components/MarkerList'
import SiteDetails from './components/SiteDetails'
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

  // Handler for when a marker is clicked on the map
  const handleMarkerClick = (site) => {
    setSelectedSite(site)
  }

  // Handler for when a site is selected from the list
  const handleSelectSite = (site) => {
    setSelectedSite(site)
  }

  // Handler to close site details
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
          sites={heritageData.sites} 
          onMarkerClick={handleMarkerClick}
        />
        {selectedSite ? (
          <SiteDetails
            site={selectedSite}
            onClose={handleCloseSiteDetails}
          />
        ) : (
          <MarkerList
            sites={heritageData.sites}
            selectedSite={selectedSite}
            onSelectSite={handleSelectSite}
          />
        )}
      </main>
    </div>
  )
}

export default App
