import { useState } from 'react'
import FilterControls from './FilterControls'

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
    <div className="border-b border-[var(--border)] bg-white">
      <div className="p-0">
        <button
          className="group flex w-full items-center justify-between border-0 border-b-2 border-[var(--border)] bg-[linear-gradient(135deg,#f8f9fa_0%,#ffffff_100%)] px-[var(--spacing-md)] py-[var(--spacing-md)] text-[var(--font-size-md)] font-semibold text-[var(--dark)] transition-all duration-300 ease-in-out hover:border-[var(--secondary)] hover:bg-[linear-gradient(135deg,#e8eef5_0%,#f0f6fc_100%)] hover:shadow-[inset_0_2px_4px_rgba(52,152,219,0.1)] active:bg-[linear-gradient(135deg,#f0f1f2_0%,#f8f9fa_100%)] max-md:px-[var(--spacing-md)] max-md:py-[var(--spacing-sm)] max-md:text-[var(--font-size-sm)]"
          onClick={() => setIsExpanded(!isExpanded)}
          aria-label={isExpanded ? 'Collapse filters' : 'Expand filters'}
          aria-expanded={isExpanded}
        >
          <span className="flex items-center gap-[var(--spacing-sm)] text-[var(--font-size-md)] font-bold tracking-[-0.3px] max-md:text-[var(--font-size-sm)]">
            🔍 Filter Sites
          </span>
          <span className="inline-block text-[var(--font-size-md)] transition-transform duration-300 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] group-hover:translate-y-[2px] max-md:text-[var(--font-size-sm)]">
            {isExpanded ? '▼' : '▶'}
          </span>
        </button>
      </div>

      {isExpanded && (
        <FilterControls filters={filters} onFilterChange={onFilterChange} />
      )}
    </div>
  )
}

export default FilterSidebar
