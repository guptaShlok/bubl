"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

// Inline implementation of useMediaQuery hook
function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);

    return () => media.removeEventListener("change", listener);
  }, [matches, query]);

  return matches;
}

interface ResponsiveProps {
  imageSrc?: string;
  verticalPosition?: "top" | "center" | "bottom";
  horizontalPosition?: "left" | "center" | "right";
  width?: string | number;
  height?: string | number;
  scale?: number;
  opacity?: number;
  size?: "contain" | "cover" | "auto";
  hide?: boolean;
}

interface ImageOverlayProps {
  imageSrc: string;
  alt?: string;
  className?: string;
  verticalPosition?: "top" | "center" | "bottom";
  horizontalPosition?: "left" | "center" | "right";
  size?: "contain" | "cover" | "auto";
  opacity?: number;
  priority?: boolean;
  width?: string | number;
  height?: string | number;
  exceedViewport?: boolean;
  scale?: number;
  // Responsive props
  mobile?: ResponsiveProps;
  tablet?: ResponsiveProps;
  desktop?: ResponsiveProps;
  mobileBreakpoint?: string;
  tabletBreakpoint?: string;
}

export default function ImageOverlay({
  imageSrc,
  alt = "Decorative overlay",
  className = "",
  verticalPosition = "center",
  horizontalPosition = "center",
  size = "contain",
  opacity = 1,
  priority = true,
  width = "100%",
  height = "100%",
  exceedViewport = false,
  scale = 1,
  // Responsive props
  mobile,
  tablet,
  desktop,
  mobileBreakpoint = "(max-width: 640px)",
  tabletBreakpoint = "(min-width: 641px) and (max-width: 1024px)",
}: ImageOverlayProps) {
  const [mounted, setMounted] = useState(false);
  const isMobile = useMediaQuery(mobileBreakpoint);
  const isTablet = useMediaQuery(tabletBreakpoint);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Determine which props to use based on screen size
  const getResponsiveProps = () => {
    if (isMobile && mobile) {
      return {
        imageSrc: mobile.imageSrc || imageSrc,
        verticalPosition: mobile.verticalPosition || verticalPosition,
        horizontalPosition: mobile.horizontalPosition || horizontalPosition,
        width: mobile.width || width,
        height: mobile.height || height,
        scale: mobile.scale ?? scale,
        opacity: mobile.opacity ?? opacity,
        size: mobile.size || size,
        hide: mobile.hide || false,
      };
    } else if (isTablet && tablet) {
      return {
        imageSrc: tablet.imageSrc || imageSrc,
        verticalPosition: tablet.verticalPosition || verticalPosition,
        horizontalPosition: tablet.horizontalPosition || horizontalPosition,
        width: tablet.width || width,
        height: tablet.height || height,
        scale: tablet.scale ?? scale,
        opacity: tablet.opacity ?? opacity,
        size: tablet.size || size,
        hide: tablet.hide || false,
      };
    } else if (!isMobile && !isTablet && desktop) {
      return {
        imageSrc: desktop.imageSrc || imageSrc,
        verticalPosition: desktop.verticalPosition || verticalPosition,
        horizontalPosition: desktop.horizontalPosition || horizontalPosition,
        width: desktop.width || width,
        height: desktop.height || height,
        scale: desktop.scale ?? scale,
        opacity: desktop.opacity ?? opacity,
        size: desktop.size || size,
        hide: desktop.hide || false,
      };
    }

    // Default props
    return {
      imageSrc,
      verticalPosition,
      horizontalPosition,
      width,
      height,
      scale,
      opacity,
      size,
      hide: false,
    };
  };

  if (!mounted) return null;

  const {
    imageSrc: responsiveImageSrc,
    verticalPosition: responsiveVerticalPosition,
    horizontalPosition: responsiveHorizontalPosition,
    width: responsiveWidth,
    height: responsiveHeight,
    scale: responsiveScale,
    opacity: responsiveOpacity,
    size: responsiveSize,
    hide,
  } = getResponsiveProps();

  // If hidden for this breakpoint, return null
  if (hide) return null;

  // Vertical position classes
  const verticalClasses = {
    top: "items-start",
    center: "items-center",
    bottom: "items-end",
  };

  // Horizontal position classes
  const horizontalClasses = {
    left: "justify-start",
    center: "justify-center",
    right: "justify-end",
  };

  // Size classes based on the size prop
  const sizeClasses = {
    contain: "object-contain",
    cover: "object-cover",
    auto: "object-none",
  };

  // Determine container classes based on whether we want to exceed viewport
  const containerClasses = exceedViewport
    ? "absolute left-0 right-0 pointer-events-none overflow-visible flex z-0"
    : "absolute inset-0 w-full h-full pointer-events-none overflow-hidden flex z-0";

  return (
    <div
      className={`${containerClasses} ${verticalClasses[responsiveVerticalPosition]} ${horizontalClasses[responsiveHorizontalPosition]} ${className}`}
      style={{ opacity: responsiveOpacity }}
    >
      <div
        className="relative"
        style={{
          width:
            typeof responsiveWidth === "number"
              ? `${responsiveWidth}px`
              : responsiveWidth,
          height:
            typeof responsiveHeight === "number"
              ? `${responsiveHeight}px`
              : responsiveHeight,
          transform:
            responsiveScale !== 1 ? `scale(${responsiveScale})` : undefined,
        }}
      >
        <Image
          src={responsiveImageSrc || "/placeholder.svg"}
          alt={alt}
          fill
          className={`${sizeClasses[responsiveSize]}`}
          priority={priority}
          sizes="100vw"
        />
      </div>
    </div>
  );
}
