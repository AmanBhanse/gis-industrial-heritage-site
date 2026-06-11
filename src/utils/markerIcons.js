import L from "leaflet";

/**
 * Create custom marker icon based on site category
 * @param {String} category - Site category (factory, mine, warehouse, railway)
 * @returns {L.Icon} Leaflet icon object
 */
export function createCategoryIcon(category) {
  // Map categories to colors and emojis
  const iconConfig = {
    factory: { emoji: "🏭", color: "#8e44ad", label: "Factory" },
    mine: { emoji: "⛏️", color: "#e67e22", label: "Mine" },
    warehouse: { emoji: "📦", color: "#3498db", label: "Warehouse" },
    railway: { emoji: "🚂", color: "#16a085", label: "Railway" },
    settlement: { emoji: "🏘️", color: "#27ae60", label: "Settlement" },
  };

  const config = iconConfig[category] || {
    emoji: "🏛️",
    color: "#2c3e50",
    label: "Site",
  };

  // Create SVG icon with emoji and background
  const svg = `
    <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
      <!-- Background circle -->
      <circle cx="20" cy="20" r="18" fill="${config.color}" stroke="white" stroke-width="2"/>
      
      <!-- Pointer -->
      <path d="M 20 38 L 25 25 Q 20 28 15 25 Z" fill="${config.color}"/>
      
      <!-- Emoji/Icon text -->
      <text x="20" y="24" font-size="20" text-anchor="middle" dominant-baseline="middle">
        ${config.emoji}
      </text>
    </svg>
  `;

  const iconUrl = `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svg)))}`;

  return L.icon({
    iconUrl: iconUrl,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
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
  const colorMap = {
    factory: "#8e44ad",
    mine: "#e67e22",
    warehouse: "#3498db",
    railway: "#16a085",
    settlement: "#27ae60",
  };
  return colorMap[category] || "#2c3e50";
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
  const iconConfig = {
    Skulptur: { emoji: "🗿", color: "#a78bfa", label: "Sculpture" },
    Denkmal: { emoji: "🏛️", color: "#c084fc", label: "Monument" },
    Brunnen: { emoji: "⛲", color: "#06b6d4", label: "Fountain" },
    Relief: { emoji: "🎭", color: "#f97316", label: "Relief" },
    Plastik: { emoji: "🎨", color: "#ec4899", label: "Plastic" },
  };

  const config = iconConfig[category] || {
    emoji: "✨",
    color: "#a78bfa",
    label: "Public Art",
  };

  // Create SVG icon with colored circle background
  const svg = `
    <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
      <!-- Background circle -->
      <circle cx="20" cy="20" r="16" fill="${config.color}" stroke="white" stroke-width="2"/>
      
      <!-- Pointer -->
      <path d="M 20 38 L 24 25 Q 20 28 16 25 Z" fill="${config.color}"/>
      
      <!-- Emoji/Icon text -->
      <text x="20" y="24" font-size="20" text-anchor="middle" dominant-baseline="middle">
        ${config.emoji}
      </text>
    </svg>
  `;

  const iconUrl = `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svg)))}`;

  return L.icon({
    iconUrl: iconUrl,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  });
}

/**
 * Get sculpture category color
 * @param {String} category - Sculpture category
 * @returns {String} Hex color code
 */
export function getSculptureColor(category) {
  const colorMap = {
    Skulptur: "#a78bfa",
    Denkmal: "#c084fc",
    Brunnen: "#06b6d4",
    Relief: "#f97316",
    Plastik: "#ec4899",
  };
  return colorMap[category] || "#a78bfa";
}
