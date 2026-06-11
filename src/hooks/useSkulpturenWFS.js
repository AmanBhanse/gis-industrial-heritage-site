import { useState, useEffect } from 'react'

const WFS_URL =
  'https://geoportal.kaiserslautern.de/cgi-bin/skulpturen' +
  '?service=WFS&version=1.1.0&request=GetFeature' +
  '&typeName=GPSLocation&srsName=EPSG:4326'

function parseGML(xmlText) {
  const parser = new DOMParser()
  const doc = parser.parseFromString(xmlText, 'text/xml')
  const members = doc.querySelectorAll('featureMember')
  const features = []

  members.forEach((member) => {
    const get = (tag) => member.querySelector(tag)?.textContent?.trim() ?? ''

    // gml:pos is "lat lng" in EPSG:4326 via WFS 1.1.0
    const posText = get('pos')
    if (!posText) return
    const [lat, lng] = posText.split(' ').map(Number)
    if (!lat || !lng) return

    features.push({
      id: member.querySelector('GPSLocation')?.getAttribute('gml:id') ?? '',
      lat,
      lng,
      name: get('name'),
      artist: get('kuenstler'),
      category: get('kategorie'),
      location: get('standort'),
      year: get('entstehung'),
    })
  })

  return features
}

/**
 * Fetches and parses the Kaiserslautern Skulpturen WFS layer.
 * Returns { sculptures, loading, error }.
 */
export function useSkulpturenWFS() {
  const [sculptures, setSculptures] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)

    fetch(WFS_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`WFS request failed: ${res.status}`)
        return res.text()
      })
      .then((xml) => {
        if (!cancelled) {
          setSculptures(parseGML(xml))
          setLoading(false)
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message)
          setLoading(false)
        }
      })

    return () => { cancelled = true }
  }, [])

  return { sculptures, loading, error }
}
