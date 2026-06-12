import { useState, useRef } from 'react'
import './App.css'
import Layout from './components/Layout'
import AppSidebar from './components/AppSidebar'
import MapContainer from './components/MapContainer'
import { useFilteredSites } from './hooks/useFilteredSites'
import { useSkulpturenWFS } from './hooks/useSkulpturenWFS'
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
  const [dialogSite, setDialogSite] = useState(null)
  const [dialogSculpture, setDialogSculpture] = useState(null)
  const [showRoute, setShowRoute] = useState(false)
  const [showSculptures, setShowSculptures] = useState(true)
  const [sculptureCategories, setSculptureCategories] = useState([])
  const [filters, setFilters] = useState({
    categories: [],
    eras: [],
    statuses: []
  })
  // Ref to MapContainer's flyTo function
  const flyToRef = useRef(null)

  // Get filtered sites based on current filters using custom hook
  const filteredSites = useFilteredSites(heritageData.sites, filters)
  const { sculptures } = useSkulpturenWFS()

  /**
   * Handle marker click event from map
   * @param {Object} site - Site object clicked on map
   */
  const handleMarkerClick = (site) => {
    setSelectedSite(site)
    if (site?.lat && site?.lng) {
      flyToRef.current?.({ lat: site.lat, lng: site.lng })
    }
  }

  /**
   * Handle site selection from list
   * @param {Object} site - Site object selected from list
   */
  const handleSelectSite = (site) => {
    setSelectedSite(site)
    if (site?.lat && site?.lng) {
      flyToRef.current?.({ lat: site.lat, lng: site.lng })
    }
  }

  const handleOpenSiteDetails = (site) => {
    setDialogSite(site)
  }

  const handleCloseSiteDetails = () => {
    setDialogSite(null)
  }

  const handleOpenSculptureDetails = (sculpture) => {
    setDialogSculpture(sculpture)
  }

  const handleCloseSculptureDetails = () => {
    setDialogSculpture(null)
  }

  const handleSelectSculpture = (sculpture) => {
    if (sculpture?.lat && sculpture?.lng) {
      flyToRef.current?.({ lat: sculpture.lat, lng: sculpture.lng })
    }
  }

  /**
   * Handle filter changes from filter controls
   * @param {Object} newFilters - Updated filter criteria
   */
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
  }

  const headerContent = (
    <div className="flex h-full w-full items-center justify-between gap-2">
      <div className="flex flex-col">
        <span className="text-base font-bold leading-tight tracking-[0.01em] text-white">Welcome to Kaiserslautern</span>
      </div>
      <img
        src="/kaiserslautern.png"
        alt="Kaiserslautern"
        className="ml-auto h-full w-auto object-contain"
      />
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
      dialogSite={dialogSite}
      onOpenSiteDetails={handleOpenSiteDetails}
      onCloseSiteDetails={handleCloseSiteDetails}
      dialogSculpture={dialogSculpture}
      onOpenSculptureDetails={handleOpenSculptureDetails}
      onCloseSculptureDetails={handleCloseSculptureDetails}
      showRoute={showRoute}
      onRouteToggle={setShowRoute}
      showSculptures={showSculptures}
      onSculpturesToggle={setShowSculptures}
      sculptureCategories={sculptureCategories}
      onSculptureCategoriesChange={setSculptureCategories}
      sculptures={sculptures}
      onSelectSculpture={handleSelectSculpture}
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
        showSculptures={showSculptures}
        sculptureCategories={sculptureCategories}
        sculptures={sculptures}
        onSelectSculpture={handleSelectSculpture}
        onOpenSiteDetails={handleOpenSiteDetails}
        onOpenSculptureDetails={handleOpenSculptureDetails}
        onFlyTo={(fn) => { flyToRef.current = fn }}
      />
    </Layout>
  )
}

export default App
