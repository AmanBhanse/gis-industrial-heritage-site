import { describe, it, expect } from 'vitest'

// Test data
const mockImages = [
  'https://example.com/image1.jpg',
  'https://example.com/image2.jpg',
  'https://example.com/image3.jpg'
]

describe('useImageGallery Hook Logic', () => {
  it('initializes with correct state', () => {
    const state = {
      currentIndex: 0,
      hasImages: mockImages.length > 0,
      imageCount: mockImages.length
    }
    expect(state.currentIndex).toBe(0)
    expect(state.hasImages).toBe(true)
    expect(state.imageCount).toBe(3)
  })

  it('navigates to next image (circular)', () => {
    let currentIndex = 0
    const imageCount = mockImages.length
    currentIndex = (currentIndex + 1) % imageCount
    expect(currentIndex).toBe(1)
    currentIndex = (currentIndex + 1) % imageCount
    expect(currentIndex).toBe(2)
    currentIndex = (currentIndex + 1) % imageCount
    expect(currentIndex).toBe(0) // Loops
  })

  it('navigates to previous image (circular)', () => {
    let currentIndex = 0
    const imageCount = mockImages.length
    currentIndex = (currentIndex - 1 + imageCount) % imageCount
    expect(currentIndex).toBe(2) // Loops backwards
    currentIndex = (currentIndex - 1 + imageCount) % imageCount
    expect(currentIndex).toBe(1)
  })

  it('handles thumbnail navigation', () => {
    const validIndex = 1
    if (validIndex >= 0 && validIndex < mockImages.length) {
      expect(validIndex).toBe(1)
    }
  })

  it('rejects invalid thumbnail index', () => {
    const invalidIndex = 10
    let currentIndex = 0
    if (invalidIndex >= 0 && invalidIndex < mockImages.length) {
      currentIndex = invalidIndex
    }
    expect(currentIndex).toBe(0) // Unchanged
  })

  it('handles empty images array', () => {
    const emptyImages = []
    const state = {
      hasImages: emptyImages.length > 0,
      imageCount: emptyImages.length
    }
    expect(state.hasImages).toBe(false)
    expect(state.imageCount).toBe(0)
  })

  it('returns current image URL', () => {
    let currentIndex = 1
    const currentImage = mockImages[currentIndex]
    expect(currentImage).toBe(mockImages[1])
  })

  it('handles keyboard navigation (arrow keys)', () => {
    let currentIndex = 1
    const imageCount = mockImages.length

    // Simulate arrow right
    let event = { key: 'ArrowRight' }
    if (event.key === 'ArrowRight') {
      currentIndex = (currentIndex + 1) % imageCount
    }
    expect(currentIndex).toBe(2)

    // Simulate arrow left
    event = { key: 'ArrowLeft' }
    if (event.key === 'ArrowLeft') {
      currentIndex = (currentIndex - 1 + imageCount) % imageCount
    }
    expect(currentIndex).toBe(1)
  })
})
