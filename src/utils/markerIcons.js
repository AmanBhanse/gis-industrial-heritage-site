import L from "leaflet";

// Map categories to Lucide icon names and colors
const CATEGORY_CONFIG = {
  factory: { icon: "Factory", color: "#8e44ad" },
  mine: { icon: "Pickaxe", color: "#e67e22" },
  warehouse: { icon: "Package", color: "#3498db" },
  railway: { icon: "Train", color: "#16a085" },
  settlement: { icon: "Home", color: "#27ae60" },
};

const SCULPTURE_CONFIG = {
  Skulptur: { icon: "Statue", color: "#a78bfa" },
  Denkmal: { icon: "Building2", color: "#c084fc" },
  Brunnen: { icon: "Droplets", color: "#06b6d4" },
  Relief: { icon: "Image", color: "#f97316" },
  Plastik: { icon: "Sparkles", color: "#ec4899" },
};

/**
 * Icon SVG definitions from Lucide
 */
const LUCIDE_ICONS = {
  Factory: `<g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M7 7V3M17 7V3M2 11h20"/><rect x="4" y="13" width="3" height="5"/><rect x="10" y="13" width="3" height="5"/><rect x="16" y="13" width="3" height="5"/></g>`,
  Pickaxe: `<g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.2 9.9l-5.8 5.8"/><path d="M18.5 4a2.12 2.12 0 0 1 3 3L13 16.5"/><path d="M9.5 4a2.12 2.12 0 0 0-3 3l8.5 8.5"/><path d="M3 3v8a2 2 0 0 0 2 2h8"/></g>`,
  Package: `<g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></g>`,
  Train: `<g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="6" cy="19" r="2"/><circle cx="18" cy="19" r="2"/><path d="M2 9h20M6 6V4M18 6V4"/></g>`,
  Home: `<g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></g>`,
  Statue: `<g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="5" r="2"/><path d="M12 7v4M9 9h6M9 13h6M10 17h4M8 21h8"/></g>`,
  Building2: `<g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/><path d="M9 12h0"/><path d="M15 12h0"/></g>`,
  Droplets: `<g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/><circle cx="6.5" cy="13.5" r="1.5"/><circle cx="17.5" cy="10.5" r="1.5"/></g>`,
  Image: `<g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></g>`,
  Sparkles: `<g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l1.9 5.8h6.1l-4.9 3.6 1.9 5.8-4.9-3.6-4.9 3.6 1.9-5.8-4.9-3.6h6.1z"/><path d="M3 21l2-5M20 7l2-5M6 12l-2-5M18 20l2-5"/></g>`,
};

/**
 * Create SVG marker with Lucide icon centered in circle
 */
function createMarkerSVG(iconName, color) {
  const iconContent = LUCIDE_ICONS[iconName] || LUCIDE_ICONS.Home;
  
  return `
    <svg width="52" height="60" viewBox="0 0 52 60" xmlns="http://www.w3.org/2000/svg">
      <!-- Circle background -->
      <circle cx="26" cy="22" r="18" fill="${color}" stroke="white" stroke-width="2.5" opacity="0.96"/>
      <!-- Pointer -->
      <path d="M 26 44 L 16 24 Q 26 30 36 24 Z" fill="${color}" opacity="0.96"/>
      <!-- Icon centered in circle -->
      <g transform="translate(26, 22) scale(0.7)" stroke="white" fill="none">
        <svg viewBox="0 0 24 24" width="24" height="24" x="-12" y="-12">
          ${iconContent}
        </svg>
      </g>
    </svg>
  `;
}

/**
 * Create custom marker icon based on site category
 * @param {String} category - Site category (factory, mine, warehouse, railway, settlement)
 * @returns {L.Icon} Leaflet icon object
 */
export function createCategoryIcon(category) {
  const config = CATEGORY_CONFIG[category] || CATEGORY_CONFIG.settlement;
  const svg = createMarkerSVG(config.icon, config.color);
  const iconUrl = `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svg)))}`;

  return L.icon({
    iconUrl: iconUrl,
    iconSize: [52, 60],
    iconAnchor: [26, 60],
    popupAnchor: [0, -60],
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
    shadowSize: [41, 41],
    shadowAnchor: [12, 41],
  });
}

/**
 * Get category color for use in UI elements
 * @param {String} category - Site category
 * @returns {String} Hex color code
 */
export function getCategoryColor(category) {
  const config = CATEGORY_CONFIG[category];
  return config ? config.color : "#2c3e50";
}

/**
 * Get category label
 * @param {String} category - Site category
 * @returns {String} Human-readable category label
 */
export function getCategoryLabel(category) {
  const labelMap = {
    factory: "Factory",
    mine: "Mine",
    warehouse: "Warehouse",
    railway: "Railway",
    settlement: "Settlement",
  };
  return labelMap[category] || "Heritage Site";
}

/**
 * Create custom marker icon for sculpture category
 * @param {String} category - Sculpture category (Skulptur, Denkmal, Brunnen, Relief, Plastik)
 * @returns {L.Icon} Leaflet icon object
 */
export function createSculptureIcon(category) {
  const config = SCULPTURE_CONFIG[category] || SCULPTURE_CONFIG.Skulptur;
  const svg = createMarkerSVG(config.icon, config.color);
  const iconUrl = `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svg)))}`;

  return L.icon({
    iconUrl: iconUrl,
    iconSize: [52, 60],
    iconAnchor: [26, 60],
    popupAnchor: [0, -60],
  });
}

/**
 * Get sculpture category color
 * @param {String} category - Sculpture category
 * @returns {String} Hex color code
 */
export function getSculptureColor(category) {
  const config = SCULPTURE_CONFIG[category];
  return config ? config.color : "#a78bfa";
}

/**
 * Create an active/highlighted version of a category icon
 * @param {String} category - Site category
 * @returns {L.Icon} Leaflet icon with active-marker class and larger size
 */
export function createActiveMarkerIcon(category) {
  const base = createCategoryIcon(category)
  return L.icon({
    ...base.options,
    iconSize: [50, 50],
    iconAnchor: [25, 50],
    popupAnchor: [0, -50],
    className: 'active-marker',
  })
}
