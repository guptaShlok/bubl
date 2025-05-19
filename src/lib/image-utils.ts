import type { StaticImageData } from "next/image"

export interface ImageProps {
  src: string | StaticImageData
  alt: string
  width?: number
  height?: number
  priority?: boolean
  quality?: number
  className?: string
  sizes?: string
}

export const getImageProps = (props: ImageProps): ImageProps => {
  // Default sizes if not provided
  const defaultSizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"

  return {
    ...props,
    sizes: props.sizes || defaultSizes,
    quality: props.quality || 85,
    width: props.width || 1200,
    height: props.height || 800,
  }
}

// Helper to determine if an image should be prioritized
export const shouldPrioritize = (index: number, isAboveFold = false): boolean => {
  return index === 0 || isAboveFold
}
