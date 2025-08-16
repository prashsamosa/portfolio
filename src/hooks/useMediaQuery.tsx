import { useEffect, useState, useCallback, useRef, useSyncExternalStore } from "react";

/**
 * Media query hook options interface
 */
export interface UseMediaQueryOptions {
  suppressHydrationWarning?: boolean;
  debounceMs?: number;
  initialValue?: boolean;
}

/**
 * Hook to match a media query string with improved SSR handling and performance.
 * Uses React 18's useSyncExternalStore for better concurrent mode support.
 */
export function useMediaQuery(
  query: string,
  options: UseMediaQueryOptions = {}
): boolean {
  const { suppressHydrationWarning = false, debounceMs = 0, initialValue } = options;

  // Fallback for older React versions or when useSyncExternalStore is not available
  const hasUseSyncExternalStore = typeof useSyncExternalStore !== 'undefined';

  // Modern implementation using useSyncExternalStore (React 18+)
  if (hasUseSyncExternalStore && debounceMs === 0) {
    return useSyncExternalStore(
      useCallback(
        (callback) => {
          if (typeof window === "undefined") return () => {};

          const mediaQuery = window.matchMedia(query);

          if (mediaQuery.addEventListener) {
            mediaQuery.addEventListener("change", callback);
            return () => mediaQuery.removeEventListener("change", callback);
          } else {
            // Legacy support
            mediaQuery.addListener(callback);
            return () => mediaQuery.removeListener(callback);
          }
        },
        [query]
      ),
      useCallback(() => {
        if (typeof window === "undefined") {
          return initialValue ?? false;
        }
        return window.matchMedia(query).matches;
      }, [query, initialValue]),
      useCallback(() => {
        return initialValue ?? false;
      }, [initialValue])
    );
  }

  // Fallback implementation for debounced queries or older React versions
  return useLegacyMediaQuery(query, options);
}

/**
 * Legacy implementation for debounced queries or older React versions
 */
function useLegacyMediaQuery(
  query: string,
  options: UseMediaQueryOptions = {}
): boolean {
  const { suppressHydrationWarning = false, debounceMs = 0, initialValue } = options;
  const timeoutRef = useRef<NodeJS.Timeout>();
  const mountedRef = useRef(false);

  const getInitial = useCallback(() => {
    if (typeof window === "undefined") return initialValue ?? false;
    return window.matchMedia(query).matches;
  }, [query, initialValue]);

  const [matches, setMatches] = useState<boolean>(() => {
    // Only use actual media query result on client-side
    if (typeof window !== "undefined") {
      return getInitial();
    }
    return initialValue ?? false;
  });

  useEffect(() => {
    mountedRef.current = true;

    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia(query);

    const updateMatch = (e: MediaQueryListEvent | MediaQueryList) => {
      if (!mountedRef.current) return;

      const match = e instanceof MediaQueryListEvent ? e.matches : e.matches;

      if (debounceMs > 0) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
          if (mountedRef.current) {
            setMatches(match);
          }
        }, debounceMs);
      } else {
        setMatches(match);
      }
    };

    // Initial sync
    updateMatch(mediaQuery);

    // Add event listener with modern + legacy support
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", updateMatch);
    } else {
      mediaQuery.addListener(updateMatch);
    }

    return () => {
      mountedRef.current = false;
      clearTimeout(timeoutRef.current);

      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", updateMatch);
      } else {
        mediaQuery.removeListener(updateMatch);
      }
    };
  }, [query, debounceMs]);

  // SSR hydration mismatch prevention
  useEffect(() => {
    if (suppressHydrationWarning && typeof window !== "undefined") {
      const actualMatch = window.matchMedia(query).matches;
      if (actualMatch !== matches) {
        setMatches(actualMatch);
      }
    }
  }, [query, suppressHydrationWarning, matches]);

  return matches;
}

// Standard breakpoints (mobile-first approach)
export const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

// Predefined responsive hooks
export const useIsMobile = (maxWidth = BREAKPOINTS.sm) =>
  useMediaQuery(`(max-width: ${maxWidth})`);

export const useIsTablet = (minWidth = BREAKPOINTS.md, maxWidth = BREAKPOINTS.lg) =>
  useMediaQuery(`(min-width: ${minWidth}) and (max-width: calc(${maxWidth} - 1px))`);

export const useIsDesktop = (minWidth = BREAKPOINTS.lg) =>
  useMediaQuery(`(min-width: ${minWidth})`);

export const useIsLarge = (minWidth = BREAKPOINTS.xl) =>
  useMediaQuery(`(min-width: ${minWidth})`);

export const useIsExtraLarge = (minWidth = BREAKPOINTS['2xl']) =>
  useMediaQuery(`(min-width: ${minWidth})`);

// System preferences
export const usePrefersDark = () =>
  useMediaQuery("(prefers-color-scheme: dark)");

export const usePrefersLight = () =>
  useMediaQuery("(prefers-color-scheme: light)");

export const usePrefersReducedMotion = () =>
  useMediaQuery("(prefers-reduced-motion: reduce)");

export const usePrefersHighContrast = () =>
  useMediaQuery("(prefers-contrast: high)");

export const usePrefersReducedData = () =>
  useMediaQuery("(prefers-reduced-data: reduce)");

// Device capabilities
export const useIsTouch = () =>
  useMediaQuery("(hover: none) and (pointer: coarse)");

export const useCanHover = () =>
  useMediaQuery("(hover: hover)");

export const useHasFinePointer = () =>
  useMediaQuery("(pointer: fine)");

export const useHasCoarsePointer = () =>
  useMediaQuery("(pointer: coarse)");

// Display characteristics
export const useIsHighDPI = () =>
  useMediaQuery(
    "(-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi), (min-resolution: 2dppx)"
  );

export const useIsRetina = () =>
  useMediaQuery("(-webkit-min-device-pixel-ratio: 2)");

// Orientation
export const useIsLandscape = () =>
  useMediaQuery("(orientation: landscape)");

export const useIsPortrait = () =>
  useMediaQuery("(orientation: portrait)");

// Print detection
export const useIsPrint = () =>
  useMediaQuery("print");

// Color gamut support
export const useSupportsP3 = () =>
  useMediaQuery("(color-gamut: p3)");

export const useSupportsRec2020 = () =>
  useMediaQuery("(color-gamut: rec2020)");

// Comprehensive breakpoints interface
export interface ResponsiveBreakpoints {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isLarge: boolean;
  isExtraLarge: boolean;
}

export const useBreakpoints = (): ResponsiveBreakpoints => ({
  isMobile: useIsMobile(),
  isTablet: useIsTablet(),
  isDesktop: useIsDesktop(),
  isLarge: useIsLarge(),
  isExtraLarge: useIsExtraLarge(),
});

// Device type detection
export interface DeviceType {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isTouch: boolean;
  canHover: boolean;
}

export const useDeviceType = (): DeviceType => ({
  isMobile: useIsMobile(),
  isTablet: useIsTablet(),
  isDesktop: useIsDesktop(),
  isTouch: useIsTouch(),
  canHover: useCanHover(),
});

// User preferences bundle
export interface UserPreferences {
  prefersDark: boolean;
  prefersLight: boolean;
  prefersReducedMotion: boolean;
  prefersHighContrast: boolean;
  prefersReducedData: boolean;
}

export const useUserPreferences = (): UserPreferences => ({
  prefersDark: usePrefersDark(),
  prefersLight: usePrefersLight(),
  prefersReducedMotion: usePrefersReducedMotion(),
  prefersHighContrast: usePrefersHighContrast(),
  prefersReducedData: usePrefersReducedData(),
});

/**
 * Use multiple media queries and return a map of matches
 * Optimized to reduce the number of media query listeners
 */
export function useMediaQueries(
  queries: Record<string, string>,
  options: UseMediaQueryOptions = {}
): Record<string, boolean> {
  const results: Record<string, boolean> = {};

  // Use individual hooks for each query to maintain React's rules of hooks
  const entries = Object.entries(queries);
  const queryResults = entries.map(([key, query]) => [
    key,
    useMediaQuery(query, options)
  ] as const);

  return Object.fromEntries(queryResults);
}

/**
 * Custom hook for container queries (when supported)
 * Falls back to window-based media queries
 */
export function useContainerQuery(
  query: string,
  containerRef: React.RefObject<HTMLElement>,
  options: UseMediaQueryOptions = {}
): boolean {
  const supportsContainerQueries = typeof CSS !== 'undefined' &&
    'supports' in CSS &&
    CSS.supports('container-type', 'inline-size');

  // For now, fall back to regular media query
  // Container queries would need a different implementation
  return useMediaQuery(query, options);
}

/**
 * Utility to create responsive value based on breakpoints
 */
export function useResponsiveValue<T>(values: {
  mobile?: T;
  tablet?: T;
  desktop?: T;
  large?: T;
  default: T;
}): T {
  const { isMobile, isTablet, isDesktop, isLarge } = useBreakpoints();

  if (isLarge && values.large !== undefined) return values.large;
  if (isDesktop && values.desktop !== undefined) return values.desktop;
  if (isTablet && values.tablet !== undefined) return values.tablet;
  if (isMobile && values.mobile !== undefined) return values.mobile;

  return values.default;
}
