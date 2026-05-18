import { useMemo } from 'react'

/**
 * useFilteredSites Hook
 * Filters heritage sites based on category, era, and status filters
 * @param {Array} sites - Array of all heritage sites
 * @param {Object} filters - Filter criteria { categories, eras, statuses }
 * @returns {Array} Filtered sites array
 */
export function useFilteredSites(sites = [], filters = {}) {
  const { categories = [], eras = [], statuses = [] } = filters

  return useMemo(() => {
    if (!sites || sites.length === 0) return []

    // If no filters are active, return all sites
    const hasFilters = categories.length > 0 || eras.length > 0 || statuses.length > 0
    if (!hasFilters) return sites

    return sites.filter((site) => {
      // Check category filter
      if (categories.length > 0 && !categories.includes(site.category)) {
        return false
      }

      // Check era filter
      if (eras.length > 0 && !eras.includes(site.era)) {
        return false
      }

      // Check status filter
      if (statuses.length > 0 && !statuses.includes(site.status)) {
        return false
      }

      return true
    })
  }, [sites, categories, eras, statuses])
}

/**
 * Get filter statistics
 * @param {Array} sites - All sites
 * @param {Array} filteredSites - Filtered sites
 * @returns {Object} Statistics object
 */
export function getFilterStats(sites = [], filteredSites = []) {
  return {
    total: sites.length,
    filtered: filteredSites.length,
    hidden: sites.length - filteredSites.length,
    percentage: sites.length > 0 ? Math.round((filteredSites.length / sites.length) * 100) : 100,
  }
}
