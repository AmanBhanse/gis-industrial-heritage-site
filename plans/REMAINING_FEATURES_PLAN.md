# Remaining Features Implementation Plan

## Overview

Three features are missing from the initial implementation and are required to fulfill the
task requirements. This plan adds them in 8 iterative commits, reviewed one at a time.

---

## Quick Reference: Task Status

- ⏳ = Not Started
- 🔄 = In Progress
- ✅ = Completed

---

## Missing Features

| Feature | Status |
|---|---|
| Polygon layers (Werksgelände + Arbeitersiedlungen) | ✅ |
| Historical map layer (OpenHistoricalMap) | ✅ |
| Route suggestion (thematic walking tour) | ✅ |

---

# PHASE 9: MISSING FEATURES

## Commit 9.1: Extend Data with Polygons, Settlements, and Route ⏳

**Goal:** Enrich `heritage-sites.json` so it contains everything the next commits need.

- Add `"polygon": [[lat, lng], ...]` coordinates to 5–6 existing factory/warehouse sites
- Add 3 new sites with `"category": "settlement"` (Arbeitersiedlungen) — each with polygon coords
- Add top-level `"route": [id, id, ...]` — ordered site IDs forming a logical walking tour
- Keep all existing sites and fields untouched

**File:** `src/data/heritage-sites.json`

**Commit message:** `data: Add polygon areas, settlement sites, and route order`

---

## Commit 9.2: Add Settlement Category to FilterControls ⏳

**Goal:** Make the new settlement sites filterable like other categories.

- Add `"settlement"` to the categories array in `FilterControls.jsx`
- Assign a distinct color (warm green) for the settlement category dot/badge
- Update `FilterControls.module.css` with the color token

**Files:** `src/components/FilterControls.jsx`, `src/styles/FilterControls.module.css`

**Commit message:** `feat: Add settlement category to filter controls`

---

## Commit 9.3: Add Historical Tile Layer to TileLayerSwitcher ⏳

**Goal:** Add OpenHistoricalMap as a third tile layer option.

- Add a third entry to the `layers` array in `TileLayerSwitcher.jsx`:
  - id: `'historical'`, label: `'Historical'`, icon: `🗺️`
  - URL: `https://{s}.tile.openhistoricalmap.org/ohm-default/{z}/{x}/{y}.png`
- Update `MapContainer.jsx` to render the OpenHistoricalMap `TileLayer` when `activeLayer === 'historical'`
- Add proper attribution string for OpenHistoricalMap

**Files:** `src/components/TileLayerSwitcher.jsx`, `src/components/MapContainer.jsx`

**Commit message:** `feat: Add historical map layer to tile layer switcher`

---

## Commit 9.4: Create PolygonLayer Component ⏳

**Goal:** New component that renders area polygons for sites that have polygon coordinates.

- Create `src/components/PolygonLayer.jsx`
  - Accepts `sites` array and `onMarkerClick` callback as props
  - Filters to sites where `site.polygon` exists
  - Renders react-leaflet `<Polygon>` for each
  - Fill color: one color for `factory/mine/warehouse` sites, another for `settlement` sites
  - Click on polygon calls `onMarkerClick(site)` — same as marker click
- Create `src/styles/PolygonLayer.module.css` for wrapper styles

**Files:** `src/components/PolygonLayer.jsx` (new), `src/styles/PolygonLayer.module.css` (new)

**Commit message:** `feat: Add PolygonLayer component for area sites`

---

## Commit 9.5: Integrate Polygons into MapContainer and Add Legend ⏳

**Goal:** Render polygons on the live map alongside markers, with a visual legend.

- Import and render `<PolygonLayer>` inside `MapContainer.jsx`
- Pass `sites` (all sites, PolygonLayer filters internally) and `onMarkerClick`
- Add a small legend overlay inside the map div showing:
  - Colored square + "Werksgelände" label
  - Colored square + "Arbeitersiedlung" label
- Style legend in `MapContainer.module.css`

**Files:** `src/components/MapContainer.jsx`, `src/styles/MapContainer.module.css`

**Commit message:** `feat: Render polygon areas on map with legend`

---

## Commit 9.6: Create RouteLayer Component ⏳

**Goal:** New component that renders the thematic walking tour as a polyline.

- Create `src/components/RouteLayer.jsx`
  - Accepts `sites` array, `route` array (ordered IDs), and `visible` boolean as props
  - Resolves route IDs to lat/lng coordinates from the sites array
  - Renders a react-leaflet `<Polyline>` in a distinct color (deep blue, dashed)
  - Returns null when `visible === false`

**File:** `src/components/RouteLayer.jsx` (new)

**Commit message:** `feat: Add RouteLayer component for thematic walking tour`

---

## Commit 9.7: Add Route Toggle and Wire into App ⏳

**Goal:** Give the user control over route visibility and render it on the map.

- Add `showRoute` boolean state to `App.jsx` (default: `false`)
- Add a "Show Route" toggle button/checkbox in the sidebar below FilterFeedback
- Render `<RouteLayer>` inside `MapContainer.jsx` with `visible={showRoute}`
- Pass `route` from imported data and `sites` to RouteLayer

**Files:** `src/App.jsx`, `src/components/MapContainer.jsx`

**Commit message:** `feat: Add route toggle and wire RouteLayer into app`

---

## Commit 9.8: Final Polish and Build Verification ⏳

**Goal:** Ensure all three new features look cohesive and the build is clean.

- Visual QA: polygon legend readable, layer switcher clean with 3 options, route line distinct
- Fix any console errors or style inconsistencies
- Verify `pnpm build` passes without warnings
- Tweak z-index, opacity, or colors as needed

**Files:** Any of the above as needed

**Commit message:** `fix: Final polish for polygon layer, route, and historical tiles`

---

# Summary

| Commit | Scope | Files Changed |
|---|---|---|
| 9.1 | Data | `heritage-sites.json` | ✅ |
| 9.2 | Filter UI | `FilterControls.jsx`, `FilterControls.module.css` | ✅ |
| 9.3 | Tile layers | `TileLayerSwitcher.jsx`, `MapContainer.jsx` | ✅ |
| 9.4 | New component | `PolygonLayer.jsx`, `PolygonLayer.module.css` | ✅ |
| 9.5 | Map integration | `MapContainer.jsx`, `MapContainer.module.css` | ✅ |
| 9.6 | New component | `RouteLayer.jsx` | ✅ |
| 9.7 | App wiring | `App.jsx`, `MapContainer.jsx` | ✅ |
| 9.8 | Polish + build | Various | ✅ |

**Total: 8 commits** — reviewed and approved one at a time before each commit is made.
