import { useState } from 'react'
import { getCategoryColor, getCategoryLabel } from '../utils/markerIcons'
import styles from '../styles/MarkerList.module.css'

/**
 * MarkerList Component
 * Displays a list of heritage sites with filtering and selection
 * @param {Array} sites - Array of heritage sites
 * @param {Object} selectedSite - Currently selected site
 * @param {Function} onSelectSite - Callback when a site is selected
 * @returns {JSX.Element}
 */
function MarkerList({ sites = [], selectedSite = null, onSelectSite = () => {} }) {
  const [searchTerm, setSearchTerm] = useState('')

  // Validate sites array
  const validSites = Array.isArray(sites) ? sites : []

  // Filter sites based on search term with safe property access
  const filteredSites = validSites.filter((site) => {
    if (!site || typeof site !== 'object') return false
    const name = site.name ?? ''
    const category = site.category ?? ''
    return (
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })

  return (
    <div className={styles.markerList}>
      <div className={styles.header}>
        <h2>Heritage Sites</h2>
        <span className={styles.count}>{filteredSites.length}</span>
      </div>

      {/* Search input */}
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search sites..."
          className={styles.searchInput}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Search heritage sites"
        />
        {searchTerm && (
          <button
            className={styles.clearButton}
            onClick={() => setSearchTerm('')}
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>

      {/* Sites list */}
      <ul className={styles.list}>
        {filteredSites.length > 0 ? (
          filteredSites.map((site) => (
            <li
              key={site.id}
              className={`${styles.item} ${selectedSite?.id === site.id ? styles.active : ''}`}
            >
              <button
                className={styles.button}
                onClick={() => onSelectSite(site)}
                aria-pressed={selectedSite?.id === site.id}
              >
                <div
                  className={styles.categoryDot}
                  style={{ backgroundColor: getCategoryColor(site.category) }}
                  title={getCategoryLabel(site.category)}
                />
                <div className={styles.itemContent}>
                  <h3 className={styles.itemName}>{site.name}</h3>
                  <p className={styles.itemMeta}>
                    {site.category} • {site.yearBuilt}
                  </p>
                  <p className={styles.itemStatus}>{site.status}</p>
                </div>
              </button>
            </li>
          ))
        ) : (
          <li className={styles.empty}>
            <p>No sites found</p>
          </li>
        )}
      </ul>

      {/* Stats footer */}
      <div className={styles.footer}>
        <p className={styles.stats}>
          Showing {filteredSites.length} of {sites.length}
        </p>
      </div>
    </div>
  )
}

export default MarkerList
