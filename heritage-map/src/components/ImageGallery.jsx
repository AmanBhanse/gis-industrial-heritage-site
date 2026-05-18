import { useEffect } from 'react'
import { useImageGallery } from '../hooks/useImageGallery'
import styles from '../styles/ImageGallery.module.css'

/**
 * ImageGallery Component
 * Displays a carousel of site images with navigation
 * Uses useImageGallery hook for carousel logic
 * @param {Array} images - Array of image URLs
 * @param {String} siteName - Name of the site for alt text
 * @returns {JSX.Element}
 */
function ImageGallery({ images = [], siteName = 'Heritage Site' }) {
  const { currentIndex, handlePrevious, handleNext, handleThumbnailClick, handleKeyDown, hasImages } =
    useImageGallery(images)

  // Add keyboard navigation listener
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  if (!hasImages) {
    return (
      <div className={styles.gallery}>
        <div className={styles.emptyPlaceholder}>
          <p>📸 No images available</p>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.gallery}>
      {/* Main Image */}
      <div className={styles.mainImageContainer}>
        <img
          src={images[currentIndex]}
          alt={`${siteName} - Image ${currentIndex + 1}`}
          className={styles.mainImage}
          loading="lazy"
        />

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              className={`${styles.navButton} ${styles.prevButton}`}
              onClick={handlePrevious}
              aria-label="Previous image"
              title="Previous image"
            >
              ‹
            </button>
            <button
              className={`${styles.navButton} ${styles.nextButton}`}
              onClick={handleNext}
              aria-label="Next image"
              title="Next image"
            >
              ›
            </button>
          </>
        )}

        {/* Image Counter */}
        <div className={styles.counter}>
          {currentIndex + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className={styles.thumbnailsContainer}>
          <div className={styles.thumbnails}>
            {images.map((image, index) => (
              <button
                key={index}
                className={`${styles.thumbnail} ${
                  index === currentIndex ? styles.activeThumbnail : ''
                }`}
                onClick={() => handleThumbnailClick(index)}
                aria-label={`View image ${index + 1}`}
                aria-pressed={index === currentIndex}
              >
                <img src={image} alt={`${siteName} thumbnail ${index + 1}`} />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default ImageGallery
