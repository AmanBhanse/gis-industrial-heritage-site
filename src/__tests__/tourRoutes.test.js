import { describe, expect, it } from 'vitest'
import { buildNearestNeighborRoute, buildTourRoutes } from '../utils/tourRoutes'

const mockSites = [
  { id: 1, lat: 49.44, lng: 7.75 },
  { id: 2, lat: 49.441, lng: 7.751 },
  { id: 3, lat: 49.442, lng: 7.752 },
  { id: 4, lat: 49.46, lng: 7.78 },
  { id: 5, lat: 49.461, lng: 7.781 },
  { id: 6, lat: 49.462, lng: 7.782 },
  { id: 7, lat: 49.463, lng: 7.783 },
  { id: 8, lat: 49.464, lng: 7.784 },
  { id: 9, lat: 49.465, lng: 7.785 },
  { id: 10, lat: 49.466, lng: 7.786 },
  { id: 11, lat: 49.467, lng: 7.787 },
]

describe('tourRoutes', () => {
  it('builds a nearest-neighbor route containing each site once', () => {
    const route = buildNearestNeighborRoute(mockSites)

    expect(route).toHaveLength(mockSites.length)
    expect(new Set(route).size).toBe(mockSites.length)
  })

  it('builds short, middle, and all tours with expected sizes', () => {
    const tours = buildTourRoutes(mockSites)

    expect(tours.short).toHaveLength(5)
    expect(tours.middle).toHaveLength(10)
    expect(tours.all).toHaveLength(11)
  })

  it('handles smaller site sets without crashing', () => {
    const tours = buildTourRoutes(mockSites.slice(0, 4))

    expect(tours.short).toHaveLength(4)
    expect(tours.middle).toHaveLength(4)
    expect(tours.all).toHaveLength(4)
  })
})
