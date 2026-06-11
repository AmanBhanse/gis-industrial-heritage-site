export const SIDEBAR_THEME = {
  bg: '#131929',
  surface: '#1b2336',
  hover: '#22304a',
  border: '#283448',
  text: '#e2e8f0',
  muted: '#7a8499',
  input: '#1a2540',
}

export const DETAIL_THEME = {
  title: '#ffffff',
  body: '#e5eefb',
  muted: '#a8b6c9',
  panel: '#0b1322',
  panelAlt: '#0f172a',
  border: '#334155',
}

export const FILTER_OPTIONS = {
  categories: ['factory', 'mine', 'warehouse', 'railway', 'settlement'],
  eras: ['1800s', '1900-1950', '1950+'],
  statuses: ['active', 'converted', 'abandoned', 'museum'],
}

export const SITE_STATUS_COLORS = {
  active: { bg: '#052e1633', text: '#4ade80', border: '#4ade8033' },
  converted: { bg: '#1e3a5f33', text: '#60a5fa', border: '#60a5fa33' },
  abandoned: { bg: '#3d1f0433', text: '#fb923c', border: '#fb923c33' },
  museum: { bg: '#2d1b6933', text: '#c084fc', border: '#c084fc33' },
}

export function getSculptureImageUrl(photo) {
  if (!photo) return null
  if (/^https?:\/\//i.test(photo)) return photo
  const fileName = photo.replace(/^\/+/, '').split('/').pop()
  return `https://geoportal.kaiserslautern.de/img/skulpturen/${fileName}`
}