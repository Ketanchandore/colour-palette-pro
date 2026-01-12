// Shared color utility functions

export interface ColorRGB {
  r: number;
  g: number;
  b: number;
}

export interface ColorHSL {
  h: number;
  s: number;
  l: number;
}

export const hexToRgb = (hex: string): ColorRGB => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 0, g: 0, b: 0 };
};

export const rgbToHex = (r: number, g: number, b: number): string => {
  return `#${[r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('')}`.toUpperCase();
};

export const rgbToHsl = (r: number, g: number, b: number): ColorHSL => {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
};

export const hslToRgb = (h: number, s: number, l: number): ColorRGB => {
  s /= 100;
  l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    return Math.round(255 * (l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)));
  };
  return { r: f(0), g: f(8), b: f(4) };
};

export const hslToHex = (h: number, s: number, l: number): string => {
  const { r, g, b } = hslToRgb(h, s, l);
  return rgbToHex(r, g, b);
};

// Calculate relative luminance for WCAG
export const getLuminance = (r: number, g: number, b: number): number => {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    c /= 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
};

// Calculate contrast ratio between two colors
export const getContrastRatio = (rgb1: ColorRGB, rgb2: ColorRGB): number => {
  const l1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
  const l2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
};

// WCAG compliance levels
export type WCAGLevel = 'AAA' | 'AA' | 'AA-Large' | 'Fail';

export const getWCAGLevel = (contrastRatio: number): WCAGLevel => {
  if (contrastRatio >= 7) return 'AAA';
  if (contrastRatio >= 4.5) return 'AA';
  if (contrastRatio >= 3) return 'AA-Large';
  return 'Fail';
};

// Adjust color to meet target contrast
export const adjustColorForContrast = (
  foreground: ColorRGB,
  background: ColorRGB,
  targetRatio: number = 4.5
): ColorRGB => {
  const bgLum = getLuminance(background.r, background.g, background.b);
  const fgHsl = rgbToHsl(foreground.r, foreground.g, foreground.b);
  
  // Try adjusting lightness
  for (let delta = 0; delta <= 100; delta++) {
    // Try darker
    const darkerL = Math.max(0, fgHsl.l - delta);
    const darkerRgb = hslToRgb(fgHsl.h, fgHsl.s, darkerL);
    const darkerLum = getLuminance(darkerRgb.r, darkerRgb.g, darkerRgb.b);
    const darkerRatio = bgLum > darkerLum 
      ? (bgLum + 0.05) / (darkerLum + 0.05)
      : (darkerLum + 0.05) / (bgLum + 0.05);
    
    if (darkerRatio >= targetRatio) return darkerRgb;
    
    // Try lighter
    const lighterL = Math.min(100, fgHsl.l + delta);
    const lighterRgb = hslToRgb(fgHsl.h, fgHsl.s, lighterL);
    const lighterLum = getLuminance(lighterRgb.r, lighterRgb.g, lighterRgb.b);
    const lighterRatio = bgLum > lighterLum
      ? (bgLum + 0.05) / (lighterLum + 0.05)
      : (lighterLum + 0.05) / (bgLum + 0.05);
    
    if (lighterRatio >= targetRatio) return lighterRgb;
  }
  
  return foreground;
};

// Extract dominant colors from image using canvas
export const extractColorsFromImage = (
  imageData: ImageData,
  numColors: number = 5
): ColorRGB[] => {
  const pixels: ColorRGB[] = [];
  const data = imageData.data;
  
  // Sample every nth pixel for performance
  const step = Math.max(1, Math.floor(data.length / 4 / 10000));
  
  for (let i = 0; i < data.length; i += 4 * step) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const a = data[i + 3];
    
    // Skip transparent pixels
    if (a < 128) continue;
    
    // Skip near-white and near-black
    if ((r > 240 && g > 240 && b > 240) || (r < 15 && g < 15 && b < 15)) continue;
    
    pixels.push({ r, g, b });
  }
  
  // Simple k-means clustering
  return kMeansColors(pixels, numColors);
};

// K-means clustering for color extraction
const kMeansColors = (pixels: ColorRGB[], k: number, maxIterations: number = 10): ColorRGB[] => {
  if (pixels.length === 0) return [];
  if (pixels.length <= k) return pixels;
  
  // Initialize centroids randomly
  let centroids: ColorRGB[] = [];
  const usedIndices = new Set<number>();
  
  while (centroids.length < k && centroids.length < pixels.length) {
    const idx = Math.floor(Math.random() * pixels.length);
    if (!usedIndices.has(idx)) {
      usedIndices.add(idx);
      centroids.push({ ...pixels[idx] });
    }
  }
  
  for (let iter = 0; iter < maxIterations; iter++) {
    // Assign pixels to nearest centroid
    const clusters: ColorRGB[][] = Array.from({ length: k }, () => []);
    
    for (const pixel of pixels) {
      let minDist = Infinity;
      let nearestIdx = 0;
      
      for (let i = 0; i < centroids.length; i++) {
        const dist = colorDistance(pixel, centroids[i]);
        if (dist < minDist) {
          minDist = dist;
          nearestIdx = i;
        }
      }
      
      clusters[nearestIdx].push(pixel);
    }
    
    // Update centroids
    centroids = clusters.map((cluster, i) => {
      if (cluster.length === 0) return centroids[i];
      
      const sum = cluster.reduce(
        (acc, c) => ({ r: acc.r + c.r, g: acc.g + c.g, b: acc.b + c.b }),
        { r: 0, g: 0, b: 0 }
      );
      
      return {
        r: Math.round(sum.r / cluster.length),
        g: Math.round(sum.g / cluster.length),
        b: Math.round(sum.b / cluster.length),
      };
    });
  }
  
  // Sort by saturation and brightness
  return centroids.sort((a, b) => {
    const hslA = rgbToHsl(a.r, a.g, a.b);
    const hslB = rgbToHsl(b.r, b.g, b.b);
    return (hslB.s + hslB.l) - (hslA.s + hslA.l);
  });
};

const colorDistance = (c1: ColorRGB, c2: ColorRGB): number => {
  return Math.sqrt(
    Math.pow(c1.r - c2.r, 2) +
    Math.pow(c1.g - c2.g, 2) +
    Math.pow(c1.b - c2.b, 2)
  );
};

// Generate color name
export const getColorName = (h: number, s: number, l: number): string => {
  const prefixes = l > 70 ? ['Light', 'Pale', 'Soft'] : l < 30 ? ['Dark', 'Deep', 'Rich'] : ['Vivid', 'Bold', 'Pure'];
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  
  let baseName = 'Gray';
  if (s > 10) {
    if (h < 15 || h >= 345) baseName = 'Red';
    else if (h < 45) baseName = 'Orange';
    else if (h < 75) baseName = 'Yellow';
    else if (h < 105) baseName = 'Lime';
    else if (h < 165) baseName = 'Green';
    else if (h < 195) baseName = 'Teal';
    else if (h < 225) baseName = 'Cyan';
    else if (h < 255) baseName = 'Blue';
    else if (h < 285) baseName = 'Indigo';
    else if (h < 315) baseName = 'Purple';
    else baseName = 'Pink';
  }
  
  return `${prefix} ${baseName}`;
};
