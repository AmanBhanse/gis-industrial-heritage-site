import { getFilterStats } from '../hooks/useFilteredSites'
import styles from '../styles/FilterFeedback.module.css'

/**
 * FilterFeedback Component
 * Displays feedback about active filters and results
 * @param {Array} sites - All heritage sites
 * @param {Array} filteredSites - Currently filtered sites
 * @param {Object} filters - Active filter criteria
 * @returns {JSX.Element}
 */
function FilterFeedback({ sites = [], filteredSites = [], filters = {} }) {
  const stats = getFilterStats(sites, filteredSites)
  const hasActiveFilters = Object.values(filters).some((arr) => arr && arr.length > 0)

  if (!hasActiveFilters) {
    return (
      <div className={styles.feedback}>
        <p className={styles.message}>
          📍 Showing all {stats.total} {stats.total === 1 ? 'site' : 'sites'}
        </p>
      </div>
    )
  }

  return (
    <div className={`${styles.feedback} ${styles.filtered}`}>
      {stats.filtered > 0 ? (
        <>
          <p className={styles.message}>
            ✓ Showing {stats.filtered} of {stats.total} {stats.total === 1 ? 'site' : 'sites'} ({stats.percentage}%)
          </p>
          {stats.hidden > 0 && (
            <p className={styles.info}>
              {stats.hidden} {stats.hidden === 1 ? 'site' : 'sites'} hidden by filters
            </p>
          )}
        </>
      ) : (
        <>
          <p className={styles.message}>
            ✗ No sites match these filters
          </p>
          <p className={styles.info}>
            {stats.total} total sites available
          </p>
        </>
      )}
    </div>
  )
}

export default FilterFeedback
