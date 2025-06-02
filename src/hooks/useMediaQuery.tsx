import { useEffect, useState, useCallback, useRef } from "react";

/**
 * Enhanced media query hook with better performance and additional features
 * @param query - CSS media query string
 * @param defaultValue - Default value for SSR (defaults to false)
 * @param options - Additional options
 * @returns boolean indicating if the media query matches
 */
export function useMediaQuery(
  query: string,
  defaultValue: boolean = false,
  options: {
    /** Whether to suppress hydration warnings */
    suppressHydrationWarning?: boolean;
    /** Debounce delay in milliseconds for resize events */
    debounceMs?: number;
  } = {}
): boolean {
  const { suppressHydrationWarning = false, debounceMs = 0 } = options;

  // Use a function to get initial state to avoid calling during SSR
  const getInitialState = useCallback(() => {
    if (typeof window === "undefined") {
      return defaultValue;
    }
    return window.matchMedia(query).matches;
  }, [query, defaultValue]);

  const [matches, setMatches] = useState(getInitialState);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    // Early return if we're on server
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia(query);

    const handleChange = (event: MediaQueryListEvent) => {
      if (debounceMs > 0) {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
          setMatches(event.matches);
        }, debounceMs);
      } else {
        setMatches(event.matches);
      }
    };

    // Set initial value on mount (handles hydration)
    setMatches(mediaQuery.matches);

    // Use the modern addEventListener API with fallback
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleChange);
    }

    return () => {
      // Clear any pending timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Remove event listener with the same fallback pattern
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, [query, debounceMs]);

  // Handle hydration mismatch gracefully
  useEffect(() => {
    if (suppressHydrationWarning && typeof window !== "undefined") {
      setMatches(window.matchMedia(query).matches);
    }
  }, [query, suppressHydrationWarning]);

  return matches;
}

// Convenience hooks for common breakpoints
export const useIsMobile = () => useMediaQuery("(max-width: 767px)");
export const useIsTablet = () =>
  useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
export const useIsDesktop = () => useMediaQuery("(min-width: 1024px)");
export const useIsLarge = () => useMediaQuery("(min-width: 1280px)");

// System preference hooks
export const usePrefersDark = () =>
  useMediaQuery("(prefers-color-scheme: dark)");
export const usePrefersReducedMotion = () =>
  useMediaQuery("(prefers-reduced-motion: reduce)");
export const useIsLandscape = () => useMediaQuery("(orientation: landscape)");
export const useIsPortrait = () => useMediaQuery("(orientation: portrait)");

// Touch device detection
export const useIsTouchDevice = () =>
  useMediaQuery("(hover: none) and (pointer: coarse)");

// High DPI detection
export const useIsHighDPI = () =>
  useMediaQuery(
    "(-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi)"
  );

// Print media detection
export const useIsPrint = () => useMediaQuery("print");

// Example usage with TypeScript
export interface MediaQueryBreakpoints {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isLarge: boolean;
}

export const useBreakpoints = (): MediaQueryBreakpoints => ({
  isMobile: useIsMobile(),
  isTablet: useIsTablet(),
  isDesktop: useIsDesktop(),
  isLarge: useIsLarge(),
});

// Hook for multiple queries at once
export function useMediaQueries(
  queries: Record<string, string>
): Record<string, boolean> {
  const results: Record<string, boolean> = {};

  for (const [key, query] of Object.entries(queries)) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    results[key] = useMediaQuery(query);
  }

  return results;
}
