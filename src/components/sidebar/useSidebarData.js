import { useMemo } from 'react'
import { getFilterStats } from '../../hooks/useFilteredSites'

function useSidebarData({
  sites,
  filteredSites,
  filters,
  onFilterChange,
  sculptures,
  showSculptures,
  sculptureCategories,
  searchTerm,
}) {
  const stats = getFilterStats(sites, filteredSites)
  const hasActiveFilters = Object.values(filters).some((items) => items?.length > 0)

  const searchedSites = useMemo(() => {
    if (!searchTerm) return filteredSites
    const query = searchTerm.toLowerCase()
    return filteredSites.filter((site) => (
      (site.name ?? '').toLowerCase().includes(query) ||
      (site.category ?? '').toLowerCase().includes(query)
    ))
  }, [filteredSites, searchTerm])

  const visibleSculptures = useMemo(() => {
    if (!showSculptures) return []

    return sculptures.filter((sculpture) => {
      const matchesCategory =
        sculptureCategories.length === 0 || sculptureCategories.includes(sculpture.category)
      if (!matchesCategory) return false
      if (!searchTerm) return true
      const query = searchTerm.toLowerCase()
      return (
        (sculpture.name ?? '').toLowerCase().includes(query) ||
        (sculpture.category ?? '').toLowerCase().includes(query) ||
        (sculpture.artist ?? '').toLowerCase().includes(query)
      )
    })
  }, [sculptures, showSculptures, sculptureCategories, searchTerm])

  const toggleFilter = (key, value) => {
    const values = filters[key] || []
    const nextValues = values.includes(value)
      ? values.filter((item) => item !== value)
      : [...values, value]

    onFilterChange({ ...filters, [key]: nextValues })
  }

  const resetFilters = () => {
    onFilterChange({ categories: [], eras: [], statuses: [] })
  }

  return {
    hasActiveFilters,
    resetFilters,
    searchedSites,
    stats,
    toggleFilter,
    visibleSculptures,
  }
}

export default useSidebarData
