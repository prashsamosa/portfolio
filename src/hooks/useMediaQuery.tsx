import { useEffect, useState, useCallback, useRef } from "react";

/**
 * Hook to match a media query string.
 * Handles SSR, debouncing, and hydration mismatches.
 */
export function useMediaQuery(
  query: string,
  defaultValue: boolean = false,
  options: {
    suppressHydrationWarning?: boolean;
    debounceMs?: number;
  } = {}
): boolean {
  const { suppressHydrationWarning = false, debounceMs = 0 } = options;
  const timeoutRef = useRef<NodeJS.Timeout>();
  const getInitial = useCallback(() => {
    if (typeof window === "undefined") return defaultValue;
    return window.matchMedia(query).matches;
  }, [query, defaultValue]);

  const [matches, setMatches] = useState<boolean>(getInitial);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia(query);

    const updateMatch = (e: MediaQueryListEvent | MediaQueryList) => {
      const match = e instanceof MediaQueryListEvent ? e.matches : e.matches;
      if (debounceMs > 0) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => setMatches(match), debounceMs);
      } else {
        setMatches(match);
      }
    };

    updateMatch(mediaQuery); // Ensure it's synced initially

    // Add event listener (modern + legacy support)
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", updateMatch);
    } else {
      mediaQuery.addListener(updateMatch);
    }

    return () => {
      clearTimeout(timeoutRef.current);
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", updateMatch);
      } else {
        mediaQuery.removeListener(updateMatch);
      }
    };
  }, [query, debounceMs]);

  // SSR hydration support
  useEffect(() => {
    if (suppressHydrationWarning && typeof window !== "undefined") {
      setMatches(window.matchMedia(query).matches);
    }
  }, [query, suppressHydrationWarning]);

  return matches;
}

// Predefined media query hooks (mobile-first mindset)
export const useIsMobile = () => useMediaQuery("(max-width: 767px)");
export const useIsTablet = () =>
  useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
export const useIsDesktop = () => useMediaQuery("(min-width: 1024px)");
export const useIsLarge = () => useMediaQuery("(min-width: 1280px)");

// User/system preferences
export const usePrefersDark = () =>
  useMediaQuery("(prefers-color-scheme: dark)");
export const usePrefersReducedMotion = () =>
  useMediaQuery("(prefers-reduced-motion: reduce)");

// Orientation
export const useIsLandscape = () => useMediaQuery("(orientation: landscape)");
export const useIsPortrait = () => useMediaQuery("(orientation: portrait)");

// Input capabilities
export const useIsTouchDevice = () =>
  useMediaQuery("(hover: none) and (pointer: coarse)");

// High-DPI screen detection
export const useIsHighDPI = () =>
  useMediaQuery(
    "(-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi)"
  );

// Print media query
export const useIsPrint = () => useMediaQuery("print");

// Bundle of common breakpoints
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

/**
 * Use multiple media queries and return a map of matches
 */
export function useMediaQueries(
  queries: Record<string, string>
): Record<string, boolean> {
  return Object.fromEntries(
    Object.entries(queries).map(([key, q]) => [key, useMediaQuery(q)])
  );
}
