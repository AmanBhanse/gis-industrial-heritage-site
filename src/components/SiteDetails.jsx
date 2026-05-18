import ImageGallery from './ImageGallery'
import { getCategoryColor, getCategoryLabel } from '../utils/markerIcons'
import styles from '../styles/SiteDetails.module.css'

/**
 * SiteDetails Component
 * Displays comprehensive information about a selected heritage site
 * Features accessibility improvements with ARIA labels and semantic HTML
 * @param {Object} site - Selected heritage site object
 * @param {Function} onClose - Callback to close the details panel
 * @returns {JSX.Element}
 */
function SiteDetails({ site = null, onClose = () => {} }) {
  if (!site) {
    return (
      <div className={styles.siteDetails} role="region" aria-label="Site details">
        <div className={styles.empty}>
          <p>👈 Select a site to view details</p>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.siteDetails} role="region" aria-label={`Details for ${site.name}`}>
      {/* Close button */}
      <button
        className={styles.closeButton}
        onClick={onClose}
        aria-label="Close site details"
        title="Close details"
      >
        ✕
      </button>

      {/* Image Gallery */}
      <ImageGallery images={site.images} siteName={site.name} />

      {/* Content */}
      <div className={styles.content}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.titleSection}>
            <h2 className={styles.title}>{site.name}</h2>
            <div className={styles.badgeContainer}>
              <span
                className={styles.categoryBadge}
                style={{ backgroundColor: getCategoryColor(site.category) }}
              >
                {getCategoryLabel(site.category)}
              </span>
              <span className={styles.statusBadge}>{site.status}</span>
            </div>
          </div>
        </div>

        {/* Quick Info */}
        <div className={styles.quickInfo}>
          <div className={styles.infoItem}>
            <span className={styles.label}>Built</span>
            <span className={styles.value}>{site.yearBuilt}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.label}>Era</span>
            <span className={styles.value}>{site.era}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.label}>Category</span>
            <span className={styles.value}>{getCategoryLabel(site.category)}</span>
          </div>
        </div>

        {/* Description */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>History</h3>
          <p className={styles.description}>{site.description}</p>
        </div>

        {/* Additional Info */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Information</h3>
          <p className={styles.additionalInfo}>{site.additionalInfo}</p>
        </div>

        {/* Coordinates */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Location</h3>
          <div className={styles.coordinates}>
            <div className={styles.coordItem}>
              <span className={styles.coordLabel}>Latitude</span>
              <span className={styles.coordValue}>{site.lat.toFixed(4)}</span>
            </div>
            <div className={styles.coordItem}>
              <span className={styles.coordLabel}>Longitude</span>
              <span className={styles.coordValue}>{site.lng.toFixed(4)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SiteDetails
