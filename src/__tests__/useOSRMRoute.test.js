import { describe, it, expect } from 'vitest'
import {
  buildStraightLinePositions,
  parseOSRMRoutePositions,
} from '../hooks/useOSRMRoute'

const mockSites = [
  { id: 1, lat: 49.4463, lng: 7.7575 },
  { id: 2, lat: 49.4378, lng: 7.7489 },
  { id: 3, lat: 49.4321, lng: 7.7654 },
]

describe('useOSRMRoute helpers', () => {
  it('builds straight-line positions from ordered route ids', () => {
    const positions = buildStraightLinePositions(mockSites, [1, 3, 2])
    expect(positions).toEqual([
      [49.4463, 7.7575],
      [49.4321, 7.7654],
      [49.4378, 7.7489],
    ])
  })

  it('ignores unknown route ids when building fallback positions', () => {
    const positions = buildStraightLinePositions(mockSites, [1, 999, 2])
    expect(positions).toEqual([
      [49.4463, 7.7575],
      [49.4378, 7.7489],
    ])
  })

  it('returns empty fallback positions for fewer than two route points', () => {
    expect(buildStraightLinePositions(mockSites, [1])).toEqual([])
    expect(buildStraightLinePositions(mockSites, [])).toEqual([])
  })

  it('parses OSRM geojson route geometry to leaflet [lat, lng]', () => {
    const payload = {
      routes: [
        {
          geometry: {
            coordinates: [
              [7.7575, 49.4463],
              [7.753, 49.442],
              [7.7489, 49.4378],
            ],
          },
        },
      ],
    }

    const positions = parseOSRMRoutePositions(payload)
    expect(positions).toEqual([
      [49.4463, 7.7575],
      [49.442, 7.753],
      [49.4378, 7.7489],
    ])
  })

  it('returns empty positions for invalid OSRM payload', () => {
    expect(parseOSRMRoutePositions(null)).toEqual([])
    expect(parseOSRMRoutePositions({ routes: [] })).toEqual([])
    expect(
      parseOSRMRoutePositions({ routes: [{ geometry: { coordinates: [] } }] }),
    ).toEqual([])
  })

})
