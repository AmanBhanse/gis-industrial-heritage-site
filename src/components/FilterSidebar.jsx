import { useState } from 'react'
import FilterControls from './FilterControls'
import styles from '../styles/FilterSidebar.module.css'

/**
 * FilterSidebar Component
 * Contains filter controls with collapsible sections
 * @param {Object} filters - Current filter state
 * @param {Function} onFilterChange - Callback when filters change
 * @param {Object} selectedSite - Currently selected site
 * @param {Function} onSelectSite - Callback when a site is selected
 * @returns {JSX.Element}
 */
function FilterSidebar({ filters = {}, onFilterChange = () => {}, selectedSite = null, onSelectSite = () => {} }) {
  const [isExpanded, setIsExpanded] = useState(true)

  return (
    <div className={styles.filterSidebar}>
      <div className={styles.toggleContainer}>
        <button
          className={styles.toggleButton}
          onClick={() => setIsExpanded(!isExpanded)}
          aria-label={isExpanded ? 'Collapse filters' : 'Expand filters'}
          aria-expanded={isExpanded}
        >
          <span className={styles.toggleLabel}>🔍 Filter Sites</span>
          <span className={styles.toggleIcon}>{isExpanded ? '▼' : '▶'}</span>
        </button>
      </div>

      {isExpanded && (
        <FilterControls filters={filters} onFilterChange={onFilterChange} />
      )}
    </div>
  )
}

export default FilterSidebar
