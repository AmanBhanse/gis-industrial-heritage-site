import { getCategoryColor, getCategoryLabel } from '../utils/markerIcons'
import styles from '../styles/FilterControls.module.css'

/**
 * FilterControls Component
 * Displays filter checkboxes for categories, eras, and statuses
 * @param {Object} filters - Current filter state
 * @param {Function} onFilterChange - Callback when a filter is toggled
 * @returns {JSX.Element}
 */
function FilterControls({ filters = {}, onFilterChange = () => {} }) {
  const categories = ['factory', 'mine', 'warehouse', 'railway', 'settlement']
  const eras = ['1800s', '1900-1950', '1950+']
  const statuses = ['active', 'converted', 'abandoned', 'museum']

  const handleCategoryToggle = (category) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter((c) => c !== category)
      : [...filters.categories, category]
    onFilterChange({ ...filters, categories: newCategories })
  }

  const handleEraToggle = (era) => {
    const newEras = filters.eras.includes(era)
      ? filters.eras.filter((e) => e !== era)
      : [...filters.eras, era]
    onFilterChange({ ...filters, eras: newEras })
  }

  const handleStatusToggle = (status) => {
    const newStatuses = filters.statuses.includes(status)
      ? filters.statuses.filter((s) => s !== status)
      : [...filters.statuses, status]
    onFilterChange({ ...filters, statuses: newStatuses })
  }

  const handleResetFilters = () => {
    onFilterChange({ categories: [], eras: [], statuses: [] })
  }

  const isActive = filters.categories.length > 0 || filters.eras.length > 0 || filters.statuses.length > 0

  return (
    <div className={styles.filterControls}>
      <div className={styles.header}>
        <h3 className={styles.title}>Filters</h3>
        {isActive && (
          <button
            className={styles.resetButton}
            onClick={handleResetFilters}
            title="Clear all filters"
          >
            Clear
          </button>
        )}
      </div>

      {/* Category Filters */}
      <div className={styles.filterGroup}>
        <h4 className={styles.groupTitle}>Category</h4>
        <div className={styles.checkboxGroup}>
          {categories.map((category) => (
            <label key={category} className={styles.checkbox}>
              <input
                type="checkbox"
                checked={filters.categories.includes(category)}
                onChange={() => handleCategoryToggle(category)}
                aria-label={`Filter by ${getCategoryLabel(category)}`}
              />
              <div
                className={styles.colorDot}
                style={{ backgroundColor: getCategoryColor(category) }}
              />
              <span>{getCategoryLabel(category)}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Era Filters */}
      <div className={styles.filterGroup}>
        <h4 className={styles.groupTitle}>Era</h4>
        <div className={styles.checkboxGroup}>
          {eras.map((era) => (
            <label key={era} className={styles.checkbox}>
              <input
                type="checkbox"
                checked={filters.eras.includes(era)}
                onChange={() => handleEraToggle(era)}
                aria-label={`Filter by era ${era}`}
              />
              <span>{era}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Status Filters */}
      <div className={styles.filterGroup}>
        <h4 className={styles.groupTitle}>Status</h4>
        <div className={styles.checkboxGroup}>
          {statuses.map((status) => (
            <label key={status} className={styles.checkbox}>
              <input
                type="checkbox"
                checked={filters.statuses.includes(status)}
                onChange={() => handleStatusToggle(status)}
                aria-label={`Filter by status ${status}`}
              />
              <span className={styles.statusLabel}>{status}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Active Filters Badge */}
      {isActive && (
        <div className={styles.activeBadge}>
          {filters.categories.length +
            filters.eras.length +
            filters.statuses.length}{' '}
          filter{filters.categories.length + filters.eras.length + filters.statuses.length !== 1 ? 's' : ''} active
        </div>
      )}
    </div>
  )
}

export default FilterControls
