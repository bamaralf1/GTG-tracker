import { useWindowDimensions, useColorScheme, useState, useEffect } from 'react';

const BREAKPOINTS = {
  phone: 0,
  tablet: 768,
  desktop: 1024,
};

export function useResponsive() {
  const { width, height } = useWindowDimensions();
  const colorScheme = useColorScheme();

  const isTablet = width >= BREAKPOINTS.tablet;
  const isDesktop = width >= BREAKPOINTS.desktop;
  const isPhone = !isTablet;
  const isLandscape = width > height;
  const isPortrait = height >= width;

  return {
    width,
    height,
    isPhone,
    isTablet,
    isDesktop,
    isLandscape,
    isPortrait,
    colorScheme,
    isDark: colorScheme === 'dark',
    breakpoints: BREAKPOINTS,
    scale: width / 375,
  };
}

export function useOrientation() {
  const { width, height } = useWindowDimensions();
  return width > height ? 'landscape' : 'portrait';
}

export function responsiveSize(size) {
  const { width } = useWindowDimensions();
  const baseWidth = 375;
  const scale = Math.min(width / baseWidth, 1.5);
  return Math.round(size * scale);
}

export function useDimensions() {
  const [dims, setDims] = useState({ width: 375, height: 667 });

  useEffect(() => {
    const { width, height } = window?.screen || { width: 375, height: 667 };
    setDims({ width, height });
  }, []);

  return dims;
}
