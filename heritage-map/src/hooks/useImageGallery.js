import { useState, useCallback, useMemo } from "react";

/**
 * useImageGallery Hook
 * Manages image carousel state and navigation logic
 * @param {Array} images - Array of image URLs
 * @returns {Object} - { currentIndex, handlePrevious, handleNext, handleThumbnailClick, hasImages, imageCount }
 */
export function useImageGallery(images = []) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Memoized image count and validation
  const imageCount = useMemo(() => images?.length || 0, [images]);
  const hasImages = imageCount > 0;

  // Navigate to previous image (circular)
  const handlePrevious = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + imageCount) % imageCount);
  }, [imageCount]);

  // Navigate to next image (circular)
  const handleNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % imageCount);
  }, [imageCount]);

  // Jump to specific thumbnail
  const handleThumbnailClick = useCallback(
    (index) => {
      if (index >= 0 && index < imageCount) {
        setCurrentIndex(index);
      }
    },
    [imageCount],
  );

  // Keyboard navigation support
  const handleKeyDown = useCallback(
    (event) => {
      if (!hasImages) return;

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        handlePrevious();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        handleNext();
      }
    },
    [hasImages, handlePrevious, handleNext],
  );

  return {
    currentIndex,
    handlePrevious,
    handleNext,
    handleThumbnailClick,
    handleKeyDown,
    hasImages,
    imageCount,
    currentImage: hasImages ? images[currentIndex] : null,
  };
}
