import { useState } from 'react'
import './App.css'

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

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Industrial Heritage Map</h1>
        <p>Explore the industrial history of Kaiserslautern</p>
      </header>
      
      <main className="app-main">
        {/* Placeholder for future components */}
        <div className="placeholder">
          <p>Map components will be mounted here</p>
        </div>
      </main>
    </div>
  )
}

export default App
