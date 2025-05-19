// Smooth scroll to element
export const scrollToElement = (elementId: string): void => {
  const element = document.getElementById(elementId)
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }
}

// Smooth scroll to top
export const scrollToTop = (): void => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
}

// Get scroll position
export const getScrollPosition = (): number => {
  return window.pageYOffset || document.documentElement.scrollTop
}

// Check if element is in viewport
export const isInViewport = (element: HTMLElement, offset = 0): boolean => {
  const rect = element.getBoundingClientRect()
  return rect.top <= (window.innerHeight || document.documentElement.clientHeight) + offset && rect.bottom >= 0 - offset
}
