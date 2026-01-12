// Comprehensive color database for programmatic SEO pages
// This generates 1000+ unique color pages

export interface ColorInfo {
  hex: string;
  name: string;
  rgb: { r: number; g: number; b: number };
  hsl: { h: number; s: number; l: number };
  category: string;
  psychology: string;
  useCases: string[];
  complementary: string[];
  analogous: string[];
  triadic: string[];
}

// Popular color names database
export const namedColors: Record<string, { name: string; category: string; psychology: string }> = {
  // Reds
  'FF0000': { name: 'Pure Red', category: 'red', psychology: 'Excitement, passion, urgency' },
  'DC143C': { name: 'Crimson', category: 'red', psychology: 'Power, determination, courage' },
  'B22222': { name: 'Firebrick', category: 'red', psychology: 'Strength, warmth, intensity' },
  'FF6B6B': { name: 'Coral Red', category: 'red', psychology: 'Playful energy, warmth' },
  'E74C3C': { name: 'Alizarin Crimson', category: 'red', psychology: 'Alert, action, boldness' },
  'C0392B': { name: 'Pomegranate', category: 'red', psychology: 'Rich, sophisticated, deep' },
  'FF4757': { name: 'Watermelon', category: 'red', psychology: 'Fresh, vibrant, youthful' },
  
  // Oranges
  'FF6B35': { name: 'Outrageous Orange', category: 'orange', psychology: 'Creative, adventurous, confident' },
  'FFA500': { name: 'Pure Orange', category: 'orange', psychology: 'Enthusiasm, creativity, success' },
  'FF8C00': { name: 'Dark Orange', category: 'orange', psychology: 'Warmth, harvest, autumn' },
  'E67E22': { name: 'Carrot', category: 'orange', psychology: 'Friendly, cheerful, approachable' },
  'D35400': { name: 'Pumpkin', category: 'orange', psychology: 'Earthy warmth, tradition' },
  'FF7F50': { name: 'Coral', category: 'orange', psychology: 'Tropical, inviting, warm' },
  'FCE54D': { name: 'Banana Yellow', category: 'yellow', psychology: 'Optimistic, friendly, cheerful' },
  
  // Yellows
  'FFFF00': { name: 'Pure Yellow', category: 'yellow', psychology: 'Happiness, optimism, clarity' },
  'F1C40F': { name: 'Sunflower', category: 'yellow', psychology: 'Joy, energy, intellect' },
  'F39C12': { name: 'Orange Yellow', category: 'yellow', psychology: 'Warmth, prosperity, wisdom' },
  'FFD93D': { name: 'Golden Yellow', category: 'yellow', psychology: 'Luxury, success, achievement' },
  'FFF59D': { name: 'Lemon Chiffon', category: 'yellow', psychology: 'Soft, gentle, calming' },
  
  // Greens
  '00FF00': { name: 'Pure Green', category: 'green', psychology: 'Nature, growth, harmony' },
  '2ECC71': { name: 'Emerald', category: 'green', psychology: 'Balance, growth, renewal' },
  '27AE60': { name: 'Nephritis', category: 'green', psychology: 'Health, tranquility, money' },
  '1ABC9C': { name: 'Turquoise', category: 'green', psychology: 'Calm, sophistication, clarity' },
  '16A085': { name: 'Green Sea', category: 'green', psychology: 'Stability, endurance, nature' },
  '00A86B': { name: 'Jade', category: 'green', psychology: 'Prosperity, wisdom, serenity' },
  '228B22': { name: 'Forest Green', category: 'green', psychology: 'Deep nature, stability' },
  '1A4D3E': { name: 'Pine Green', category: 'green', psychology: 'Trust, professionalism, depth' },
  '39FF14': { name: 'Neon Green', category: 'green', psychology: 'Futuristic, tech, innovation' },
  
  // Blues
  '0000FF': { name: 'Pure Blue', category: 'blue', psychology: 'Trust, security, stability' },
  '3498DB': { name: 'Peter River', category: 'blue', psychology: 'Professional, trustworthy' },
  '2980B9': { name: 'Belize Hole', category: 'blue', psychology: 'Dependable, serene, wise' },
  '3A86FF': { name: 'Azure', category: 'blue', psychology: 'Clear, confident, professional' },
  '0077B6': { name: 'Star Command Blue', category: 'blue', psychology: 'Authority, trust, depth' },
  '00B4D8': { name: 'Pacific Cyan', category: 'blue', psychology: 'Fresh, modern, innovative' },
  '003366': { name: 'Navy Blue', category: 'blue', psychology: 'Power, integrity, seriousness' },
  '1E3A5F': { name: 'Midnight Blue', category: 'blue', psychology: 'Elegance, depth, mystery' },
  '5DADE2': { name: 'Sky Blue', category: 'blue', psychology: 'Peaceful, serene, open' },
  
  // Purples
  '9B59B6': { name: 'Amethyst', category: 'purple', psychology: 'Creativity, luxury, wisdom' },
  '8E44AD': { name: 'Wisteria', category: 'purple', psychology: 'Mystery, spirituality, royalty' },
  '6C3483': { name: 'Purple Heart', category: 'purple', psychology: 'Noble, luxurious, ambitious' },
  'A855F7': { name: 'Vivid Purple', category: 'purple', psychology: 'Innovation, creativity, magic' },
  '7C3AED': { name: 'Electric Violet', category: 'purple', psychology: 'Modern, bold, energetic' },
  'D946EF': { name: 'Fuchsia', category: 'purple', psychology: 'Playful, confident, feminine' },
  
  // Pinks
  'FF69B4': { name: 'Hot Pink', category: 'pink', psychology: 'Playful, romantic, energetic' },
  'D8A7B1': { name: 'Grown-up Pink', category: 'pink', psychology: 'Wellness, eco-friendly, beauty' },
  'FFC0CB': { name: 'Pink', category: 'pink', psychology: 'Romance, tenderness, care' },
  'E91E63': { name: 'Material Pink', category: 'pink', psychology: 'Bold, energetic, confident' },
  'FF1493': { name: 'Deep Pink', category: 'pink', psychology: 'Excitement, fashion, youth' },
  
  // Browns & Earth Tones
  '8B4513': { name: 'Saddle Brown', category: 'brown', psychology: 'Earthy, reliable, warm' },
  'A0522D': { name: 'Sienna', category: 'brown', psychology: 'Natural, grounded, organic' },
  'D2691E': { name: 'Chocolate', category: 'brown', psychology: 'Comfort, richness, tradition' },
  '5D4037': { name: 'Walnut', category: 'brown', psychology: 'Sophisticated, timeless, luxury' },
  '795548': { name: 'Coffee', category: 'brown', psychology: 'Warm, reliable, comfortable' },
  'A1887F': { name: 'Taupe', category: 'brown', psychology: 'Neutral, classic, versatile' },
  
  // Neutrals
  '000000': { name: 'Black', category: 'neutral', psychology: 'Power, elegance, sophistication' },
  'FFFFFF': { name: 'White', category: 'neutral', psychology: 'Purity, cleanliness, simplicity' },
  '808080': { name: 'Gray', category: 'neutral', psychology: 'Balance, neutrality, calm' },
  'F5F5F5': { name: 'Cloud Dancer', category: 'neutral', psychology: 'Airy, soft, lofty - Pantone 2026' },
  'E5E5E5': { name: 'Light Gray', category: 'neutral', psychology: 'Modern, minimal, clean' },
  '2C3E50': { name: 'Midnight', category: 'neutral', psychology: 'Professional, serious, deep' },
  '34495E': { name: 'Wet Asphalt', category: 'neutral', psychology: 'Urban, modern, sophisticated' },
  '121212': { name: 'OLED Black', category: 'neutral', psychology: 'Pure, modern, battery-saving' },
  
  // 2026 Trend Colors
  '0D9488': { name: 'Transformative Teal', category: 'teal', psychology: 'WGSN 2026 Color - Sustainability, tech' },
  '06B6D4': { name: 'Cyan 400', category: 'teal', psychology: 'Fresh, modern, digital' },
  '14B8A6': { name: 'Jelly Mint', category: 'teal', psychology: 'Refreshing, digital interfaces, motion' },
  '7DD3FC': { name: 'Holographic Blue', category: 'special', psychology: 'Digital, futuristic, iridescent' },
  'C4B5FD': { name: 'Digital Lavender', category: 'special', psychology: 'Y2K soft, Gen Z, calming' },
  'FCA5A5': { name: 'Frosted Coral', category: 'special', psychology: 'Holographic bloom, soft energy' },
  'E879F9': { name: 'Pearl Purple', category: 'special', psychology: 'Mermaidcore, shimmering, magical' },
  'FF5733': { name: 'Tangerine Disco', category: 'special', psychology: 'Retro energy, fashion, high impact' },
  
  // Mermaidcore Colors
  '5EEAD5': { name: 'Iridescent Aqua', category: 'mermaidcore', psychology: 'Ocean shimmer, mystery, fantasy' },
  'A78BFB': { name: 'Pearlescent Purple', category: 'mermaidcore', psychology: 'Magical, dreamy, underwater' },
  'C4B5FE': { name: 'Lilac Shimmer', category: 'mermaidcore', psychology: 'Soft iridescence, fairy tale' },
  '67E8FA': { name: 'Ocean Spray', category: 'mermaidcore', psychology: 'Fresh ocean, coastal vibes' },
  
  // Thermal Glow Colors
  'EF4445': { name: 'Thermal Red', category: 'thermal', psychology: 'Heat map hot, intensity, energy' },
  'F97317': { name: 'Infrared Orange', category: 'thermal', psychology: 'High contrast, visibility' },
  '7C3AEE': { name: 'Thermal Purple', category: 'thermal', psychology: 'Cool zones, contrast, depth' },
  'FACC16': { name: 'Heat Yellow', category: 'thermal', psychology: 'Warning, attention, warmth' },
};

// Generate color harmony functions
export const hexToRgb = (hex: string): { r: number; g: number; b: number } => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : { r: 0, g: 0, b: 0 };
};

export const rgbToHsl = (r: number, g: number, b: number): { h: number; s: number; l: number } => {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }

  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
};

export const hslToHex = (h: number, s: number, l: number): string => {
  s /= 100; l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `${f(0)}${f(8)}${f(4)}`.toUpperCase();
};

export const getComplementary = (hex: string): string[] => {
  const rgb = hexToRgb(hex);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  return [hslToHex((hsl.h + 180) % 360, hsl.s, hsl.l)];
};

export const getAnalogous = (hex: string): string[] => {
  const rgb = hexToRgb(hex);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  return [
    hslToHex((hsl.h + 30) % 360, hsl.s, hsl.l),
    hslToHex((hsl.h + 330) % 360, hsl.s, hsl.l),
  ];
};

export const getTriadic = (hex: string): string[] => {
  const rgb = hexToRgb(hex);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  return [
    hslToHex((hsl.h + 120) % 360, hsl.s, hsl.l),
    hslToHex((hsl.h + 240) % 360, hsl.s, hsl.l),
  ];
};

export const getSplitComplementary = (hex: string): string[] => {
  const rgb = hexToRgb(hex);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  return [
    hslToHex((hsl.h + 150) % 360, hsl.s, hsl.l),
    hslToHex((hsl.h + 210) % 360, hsl.s, hsl.l),
  ];
};

export const getColorInfo = (hex: string): ColorInfo => {
  const cleanHex = hex.replace('#', '').toUpperCase();
  const rgb = hexToRgb(cleanHex);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  
  const namedColor = namedColors[cleanHex];
  
  // Generate a name if not in database
  const name = namedColor?.name || generateColorName(hsl);
  const category = namedColor?.category || getCategoryFromHsl(hsl);
  const psychology = namedColor?.psychology || getPsychologyFromCategory(category);
  
  return {
    hex: cleanHex,
    name,
    rgb,
    hsl,
    category,
    psychology,
    useCases: getUseCasesForCategory(category),
    complementary: getComplementary(cleanHex),
    analogous: getAnalogous(cleanHex),
    triadic: getTriadic(cleanHex),
  };
};

const generateColorName = (hsl: { h: number; s: number; l: number }): string => {
  const { h, s, l } = hsl;
  
  let lightness = '';
  if (l < 20) lightness = 'Dark ';
  else if (l < 40) lightness = 'Deep ';
  else if (l > 80) lightness = 'Light ';
  else if (l > 60) lightness = 'Soft ';
  
  let saturation = '';
  if (s < 20) saturation = 'Muted ';
  else if (s > 80) saturation = 'Vivid ';
  
  let hue = 'Gray';
  if (s > 10) {
    if (h < 15 || h >= 345) hue = 'Red';
    else if (h < 45) hue = 'Orange';
    else if (h < 75) hue = 'Yellow';
    else if (h < 150) hue = 'Green';
    else if (h < 210) hue = 'Cyan';
    else if (h < 270) hue = 'Blue';
    else if (h < 315) hue = 'Purple';
    else hue = 'Pink';
  }
  
  return `${lightness}${saturation}${hue}`.trim();
};

const getCategoryFromHsl = (hsl: { h: number; s: number; l: number }): string => {
  const { h, s, l } = hsl;
  
  if (s < 10) return 'neutral';
  if (h < 15 || h >= 345) return 'red';
  if (h < 45) return 'orange';
  if (h < 75) return 'yellow';
  if (h < 150) return 'green';
  if (h < 210) return 'teal';
  if (h < 270) return 'blue';
  if (h < 315) return 'purple';
  return 'pink';
};

const getPsychologyFromCategory = (category: string): string => {
  const psychologyMap: Record<string, string> = {
    red: 'Energy, passion, urgency, excitement',
    orange: 'Creativity, enthusiasm, warmth, friendliness',
    yellow: 'Happiness, optimism, clarity, warmth',
    green: 'Nature, growth, harmony, balance',
    teal: 'Calm, sophistication, clarity, modernity',
    blue: 'Trust, security, stability, professionalism',
    purple: 'Creativity, luxury, wisdom, spirituality',
    pink: 'Romance, tenderness, playfulness, care',
    brown: 'Earthy, reliable, warm, organic',
    neutral: 'Balance, sophistication, timelessness',
  };
  return psychologyMap[category] || 'Versatile, adaptable, balanced';
};

const getUseCasesForCategory = (category: string): string[] => {
  const useCaseMap: Record<string, string[]> = {
    red: ['Food & Restaurant', 'Sale Banners', 'CTA Buttons', 'Gaming', 'Sports'],
    orange: ['Creative Agencies', 'Children Brands', 'Food Delivery', 'E-commerce'],
    yellow: ['Warning Messages', 'Optimistic Brands', 'Education', 'Entertainment'],
    green: ['Healthcare', 'Finance', 'Sustainability', 'Organic Products', 'Nature'],
    teal: ['Tech Startups', 'SaaS', 'Healthcare Tech', 'Modern Apps'],
    blue: ['Finance', 'Tech', 'Corporate', 'Social Media', 'Healthcare'],
    purple: ['Luxury Brands', 'Beauty', 'Creative', 'Spirituality', 'Premium SaaS'],
    pink: ['Beauty', 'Fashion', 'Romance', 'Children', 'Wellness'],
    brown: ['Coffee Shops', 'Organic', 'Vintage', 'Craft', 'Real Estate'],
    neutral: ['Minimalist Design', 'Tech', 'Professional', 'Photography', 'Architecture'],
  };
  return useCaseMap[category] || ['General Use', 'Versatile Applications'];
};

// Generate all color hex pages (for programmatic SEO - 50,000+ colors)
export const generateAllColorPages = (): string[] => {
  const colorsSet = new Set<string>();
  
  // Add all named colors first (these have priority names)
  Object.keys(namedColors).forEach(hex => colorsSet.add(hex));
  
  // COMPREHENSIVE COLOR GENERATION FOR 50,000+ UNIQUE COLORS
  
  // 1. Fine-grained HSL generation (main source - ~43,200 colors)
  // Hue: 0-359 in steps of 3 (120 values)
  // Saturation: 5-100 in steps of 5 (20 values)  
  // Lightness: 5-95 in steps of 5 (19 values)
  // Total: 120 * 20 * 19 = 45,600 theoretical (minus duplicates)
  for (let h = 0; h < 360; h += 3) {
    for (let s = 5; s <= 100; s += 5) {
      for (let l = 5; l <= 95; l += 5) {
        colorsSet.add(hslToHex(h, s, l));
      }
    }
  }
  
  // 2. Extra fine gradients for popular hues (reds, blues, greens, purples)
  const popularHueRanges = [
    { start: 0, end: 30 },    // Reds & Oranges
    { start: 200, end: 250 }, // Blues
    { start: 100, end: 150 }, // Greens
    { start: 270, end: 320 }, // Purples & Pinks
  ];
  
  for (const range of popularHueRanges) {
    for (let h = range.start; h <= range.end; h += 1) {
      for (let s = 10; s <= 100; s += 10) {
        for (let l = 10; l <= 90; l += 10) {
          colorsSet.add(hslToHex(h, s, l));
        }
      }
    }
  }
  
  // 3. Grayscale and near-grayscale (important for design)
  for (let l = 0; l <= 100; l += 1) {
    colorsSet.add(hslToHex(0, 0, l)); // Pure grayscale
  }
  for (let s = 1; s <= 10; s += 1) {
    for (let h = 0; h < 360; h += 30) {
      for (let l = 10; l <= 90; l += 5) {
        colorsSet.add(hslToHex(h, s, l)); // Near-grays with slight tint
      }
    }
  }
  
  // 4. Web-safe color variations
  const webSafeValues = [0, 51, 102, 153, 204, 255];
  for (const r of webSafeValues) {
    for (const g of webSafeValues) {
      for (const b of webSafeValues) {
        const hex = [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('').toUpperCase();
        colorsSet.add(hex);
      }
    }
  }
  
  // 5. Material Design colors
  const materialColors = [
    // Red
    'FFEBEE', 'FFCDD2', 'EF9A9A', 'E57373', 'EF5350', 'F44336', 'E53935', 'D32F2F', 'C62828', 'B71C1C',
    // Pink  
    'FCE4EC', 'F8BBD9', 'F48FB1', 'F06292', 'EC407A', 'E91E63', 'D81B60', 'C2185B', 'AD1457', '880E4F',
    // Purple
    'F3E5F5', 'E1BEE7', 'CE93D8', 'BA68C8', 'AB47BC', '9C27B0', '8E24AA', '7B1FA2', '6A1B9A', '4A148C',
    // Deep Purple
    'EDE7F6', 'D1C4E9', 'B39DDB', '9575CD', '7E57C2', '673AB7', '5E35B1', '512DA8', '4527A0', '311B92',
    // Indigo
    'E8EAF6', 'C5CAE9', '9FA8DA', '7986CB', '5C6BC0', '3F51B5', '3949AB', '303F9F', '283593', '1A237E',
    // Blue
    'E3F2FD', 'BBDEFB', '90CAF9', '64B5F6', '42A5F5', '2196F3', '1E88E5', '1976D2', '1565C0', '0D47A1',
    // Light Blue
    'E1F5FE', 'B3E5FC', '81D4FA', '4FC3F7', '29B6F6', '03A9F4', '039BE5', '0288D1', '0277BD', '01579B',
    // Cyan
    'E0F7FA', 'B2EBF2', '80DEEA', '4DD0E1', '26C6DA', '00BCD4', '00ACC1', '0097A7', '00838F', '006064',
    // Teal
    'E0F2F1', 'B2DFDB', '80CBC4', '4DB6AC', '26A69A', '009688', '00897B', '00796B', '00695C', '004D40',
    // Green
    'E8F5E9', 'C8E6C9', 'A5D6A7', '81C784', '66BB6A', '4CAF50', '43A047', '388E3C', '2E7D32', '1B5E20',
    // Light Green
    'F1F8E9', 'DCEDC8', 'C5E1A5', 'AED581', '9CCC65', '8BC34A', '7CB342', '689F38', '558B2F', '33691E',
    // Lime
    'F9FBE7', 'F0F4C3', 'E6EE9C', 'DCE775', 'D4E157', 'CDDC39', 'C0CA33', 'AFB42B', '9E9D24', '827717',
    // Yellow
    'FFFDE7', 'FFF9C4', 'FFF59D', 'FFF176', 'FFEE58', 'FFEB3B', 'FDD835', 'FBC02D', 'F9A825', 'F57F17',
    // Amber
    'FFF8E1', 'FFECB3', 'FFE082', 'FFD54F', 'FFCA28', 'FFC107', 'FFB300', 'FFA000', 'FF8F00', 'FF6F00',
    // Orange
    'FFF3E0', 'FFE0B2', 'FFCC80', 'FFB74D', 'FFA726', 'FF9800', 'FB8C00', 'F57C00', 'EF6C00', 'E65100',
    // Deep Orange
    'FBE9E7', 'FFCCBC', 'FFAB91', 'FF8A65', 'FF7043', 'FF5722', 'F4511E', 'E64A19', 'D84315', 'BF360C',
    // Brown
    'EFEBE9', 'D7CCC8', 'BCAAA4', 'A1887F', '8D6E63', '795548', '6D4C41', '5D4037', '4E342E', '3E2723',
    // Grey
    'FAFAFA', 'F5F5F5', 'EEEEEE', 'E0E0E0', 'BDBDBD', '9E9E9E', '757575', '616161', '424242', '212121',
    // Blue Grey
    'ECEFF1', 'CFD8DC', 'B0BEC5', '90A4AE', '78909C', '607D8B', '546E7A', '455A64', '37474F', '263238',
  ];
  materialColors.forEach(hex => colorsSet.add(hex));
  
  // 6. Tailwind CSS colors
  const tailwindColors = [
    // Slate
    'F8FAFC', 'F1F5F9', 'E2E8F0', 'CBD5E1', '94A3B8', '64748B', '475569', '334155', '1E293B', '0F172A',
    // Gray
    'F9FAFB', 'F3F4F6', 'E5E7EB', 'D1D5DB', '9CA3AF', '6B7280', '4B5563', '374151', '1F2937', '111827',
    // Zinc
    'FAFAFA', 'F4F4F5', 'E4E4E7', 'D4D4D8', 'A1A1AA', '71717A', '52525B', '3F3F46', '27272A', '18181B',
    // Neutral
    'FAFAFA', 'F5F5F5', 'E5E5E5', 'D4D4D4', 'A3A3A3', '737373', '525252', '404040', '262626', '171717',
    // Stone
    'FAFAF9', 'F5F5F4', 'E7E5E4', 'D6D3D1', 'A8A29E', '78716C', '57534E', '44403C', '292524', '1C1917',
    // Red
    'FEF2F2', 'FEE2E2', 'FECACA', 'FCA5A5', 'F87171', 'EF4444', 'DC2626', 'B91C1C', '991B1B', '7F1D1D',
    // Orange
    'FFF7ED', 'FFEDD5', 'FED7AA', 'FDBA74', 'FB923C', 'F97316', 'EA580C', 'C2410C', '9A3412', '7C2D12',
    // Amber
    'FFFBEB', 'FEF3C7', 'FDE68A', 'FCD34D', 'FBBF24', 'F59E0B', 'D97706', 'B45309', '92400E', '78350F',
    // Yellow
    'FEFCE8', 'FEF9C3', 'FEF08A', 'FDE047', 'FACC15', 'EAB308', 'CA8A04', 'A16207', '854D0E', '713F12',
    // Lime
    'F7FEE7', 'ECFCCB', 'D9F99D', 'BEF264', 'A3E635', '84CC16', '65A30D', '4D7C0F', '3F6212', '365314',
    // Green
    'F0FDF4', 'DCFCE7', 'BBF7D0', '86EFAC', '4ADE80', '22C55E', '16A34A', '15803D', '166534', '14532D',
    // Emerald
    'ECFDF5', 'D1FAE5', 'A7F3D0', '6EE7B7', '34D399', '10B981', '059669', '047857', '065F46', '064E3B',
    // Teal
    'F0FDFA', 'CCFBF1', '99F6E4', '5EEAD4', '2DD4BF', '14B8A6', '0D9488', '0F766E', '115E59', '134E4A',
    // Cyan
    'ECFEFF', 'CFFAFE', 'A5F3FC', '67E8F9', '22D3EE', '06B6D4', '0891B2', '0E7490', '155E75', '164E63',
    // Sky
    'F0F9FF', 'E0F2FE', 'BAE6FD', '7DD3FC', '38BDF8', '0EA5E9', '0284C7', '0369A1', '075985', '0C4A6E',
    // Blue
    'EFF6FF', 'DBEAFE', 'BFDBFE', '93C5FD', '60A5FA', '3B82F6', '2563EB', '1D4ED8', '1E40AF', '1E3A8A',
    // Indigo
    'EEF2FF', 'E0E7FF', 'C7D2FE', 'A5B4FC', '818CF8', '6366F1', '4F46E5', '4338CA', '3730A3', '312E81',
    // Violet
    'F5F3FF', 'EDE9FE', 'DDD6FE', 'C4B5FD', 'A78BFA', '8B5CF6', '7C3AED', '6D28D9', '5B21B6', '4C1D95',
    // Purple
    'FAF5FF', 'F3E8FF', 'E9D5FF', 'D8B4FE', 'C084FC', 'A855F7', '9333EA', '7E22CE', '6B21A8', '581C87',
    // Fuchsia
    'FDF4FF', 'FAE8FF', 'F5D0FE', 'F0ABFC', 'E879F9', 'D946EF', 'C026D3', 'A21CAF', '86198F', '701A75',
    // Pink
    'FDF2F8', 'FCE7F3', 'FBCFE8', 'F9A8D4', 'F472B6', 'EC4899', 'DB2777', 'BE185D', '9D174D', '831843',
    // Rose
    'FFF1F2', 'FFE4E6', 'FECDD3', 'FDA4AF', 'FB7185', 'F43F5E', 'E11D48', 'BE123C', '9F1239', '881337',
  ];
  tailwindColors.forEach(hex => colorsSet.add(hex));
  
  // 7. Extra fine lightness variations for mid-range colors
  for (let h = 0; h < 360; h += 10) {
    for (let s = 30; s <= 80; s += 10) {
      for (let l = 20; l <= 80; l += 2) {
        colorsSet.add(hslToHex(h, s, l));
      }
    }
  }
  
  // 8. Pastel colors (high lightness, low-mid saturation)
  for (let h = 0; h < 360; h += 5) {
    for (let s = 20; s <= 60; s += 10) {
      for (let l = 75; l <= 95; l += 5) {
        colorsSet.add(hslToHex(h, s, l));
      }
    }
  }
  
  // 9. Dark/rich colors (low lightness, high saturation)
  for (let h = 0; h < 360; h += 5) {
    for (let s = 60; s <= 100; s += 10) {
      for (let l = 10; l <= 35; l += 5) {
        colorsSet.add(hslToHex(h, s, l));
      }
    }
  }
  
  // 10. Skin tones (important for design)
  const skinTones = [
    'FFDBAC', 'F1C27D', 'E0AC69', 'C68642', '8D5524', '6B4423', '4A2C0A',
    'FFE0BD', 'FFCD94', 'EAC086', 'DFC183', 'D1A36F', 'C68C53', 'A57547',
    'FFF5E6', 'FFE8D4', 'FFDCC8', 'E8BEAC', 'D4A189', 'C08060', '8B5742',
  ];
  skinTones.forEach(hex => colorsSet.add(hex));
  
  // 11. Brand colors (popular companies for SEO)
  const brandColors = [
    // Social Media
    '1877F2', // Facebook
    '1DA1F2', // Twitter
    'E4405F', // Instagram
    '0A66C2', // LinkedIn
    'FF0000', // YouTube
    'FF4500', // Reddit
    '25D366', // WhatsApp
    '5865F2', // Discord
    '000000', // TikTok
    'BD081C', // Pinterest
    // Tech
    '4285F4', // Google Blue
    'EA4335', // Google Red
    'FBBC05', // Google Yellow
    '34A853', // Google Green
    '0078D4', // Microsoft
    '00A4EF', // Skype
    '7289DA', // Discord old
    'FF6900', // Cloudflare
    '635BFF', // Stripe
    // E-commerce
    'FF9900', // Amazon
    '96BF48', // Shopify
    'F16334', // Alibaba
    '00457C', // Walmart
    'E31837', // Target
    // Design
    '1ABCFE', // Figma Blue
    '0ACF83', // Figma Green
    'A259FF', // Figma Purple
    'F24E1E', // Figma Red
    'FF7262', // Figma Orange
  ];
  brandColors.forEach(hex => colorsSet.add(hex));
  
  return Array.from(colorsSet);
};

// Industry color palettes for SEO pages
export const industryPalettes: Record<string, { colors: string[]; description: string }> = {
  'fintech': {
    colors: ['003366', '0077B6', '00B4D8', '90E0EF', 'CAF0F8'],
    description: 'Trust-building blues with modern cyan accents for financial technology'
  },
  'healthcare': {
    colors: ['1A4D3E', '2ECC71', '3498DB', 'F1F8E9', 'FFFFFF'],
    description: 'Calming greens and blues that inspire trust and wellness'
  },
  'ecommerce': {
    colors: ['FF6B35', 'F7C59F', '2EC4B6', '011627', 'FDFFFC'],
    description: 'Action-driving oranges with balanced contrast for conversions'
  },
  'saas': {
    colors: ['7C3AED', 'A855F7', '06B6D4', '0F172A', 'F8FAFC'],
    description: 'Modern purples and teals that feel innovative and professional'
  },
  'restaurant': {
    colors: ['DC143C', 'FF6B6B', 'FFD93D', '2C3E50', 'FFFFF0'],
    description: 'Appetite-stimulating reds and warm accents for food brands'
  },
  'luxury': {
    colors: ['000000', 'C9A227', '1C1C1C', 'D4AF37', 'FFFAFA'],
    description: 'Sophisticated black and gold for premium brand positioning'
  },
  'sustainability': {
    colors: ['0D9488', '14B8A6', '5EEAD4', 'F0FDF4', '022C22'],
    description: 'Earth-conscious teals and greens for eco-friendly brands'
  },
  'gaming': {
    colors: ['39FF14', '7C3AED', '121212', 'FF1493', '00FFFF'],
    description: 'High-energy neons on dark backgrounds for gaming interfaces'
  },
  'wedding': {
    colors: ['F5F5F5', 'D8A7B1', 'C9B037', 'E8E8E8', '2C2C2C'],
    description: 'Romantic soft pinks and elegant neutrals for wedding brands'
  },
  'tech-startup': {
    colors: ['3A86FF', '8338EC', '06D6A0', '1A1A2E', 'EAEAEA'],
    description: 'Bold, innovative blues and purples for tech companies'
  },
  'real-estate': {
    colors: ['1E3A5F', 'C9A227', '2C3E50', 'F5F5DC', 'FFFFFF'],
    description: 'Professional navy with luxury gold accents for property brands'
  },
  'education': {
    colors: ['3498DB', '2ECC71', 'F39C12', 'FFFFFF', '34495E'],
    description: 'Trustworthy blues with optimistic accents for learning platforms'
  },
};

// 2026 trend palettes
export const trend2026Palettes = {
  'cloud-dancer': {
    name: 'Cloud Dancer',
    pantone: '11-4201',
    description: 'Pantone Color of the Year 2026 - A soft, lofty white that feels airy and expansive',
    colors: ['F5F5F5', 'E8E8E8', 'D4D4D4', '9CA3AF', '4B5563'],
    psychology: 'Purity, new beginnings, clarity, hope',
    useCases: ['Minimalist brands', 'Wellness', 'Luxury fashion', 'Clean tech'],
  },
  'mermaidcore': {
    name: 'Mermaidcore',
    description: 'Shimmering ocean-inspired iridescent colors with pearlescent effects',
    colors: ['5EEAD4', 'A78BFA', 'E879F9', '67E8F9', 'C4B5FD'],
    psychology: 'Mystery, fantasy, ocean magic, transformation',
    useCases: ['Beauty brands', 'Fashion', 'Entertainment', 'Fantasy gaming'],
  },
  'thermal-glow': {
    name: 'Thermal Glow',
    description: 'High-contrast infrared-inspired colors with heat map aesthetics',
    colors: ['EF4444', 'F97316', 'FACC15', '7C3AED', '121212'],
    psychology: 'Energy, intensity, futuristic vision, data visualization',
    useCases: ['Data dashboards', 'Fitness apps', 'Tech products', 'Gaming'],
  },
  'walnut-retro': {
    name: 'Walnut Retro',
    description: '70s-inspired deep browns and earth tones as a sophisticated alternative to neutrals',
    colors: ['5D4037', '795548', 'A1887F', 'D7CCC8', 'EFEBE9'],
    psychology: 'Sophistication, timelessness, warmth, authenticity',
    useCases: ['Coffee shops', 'Craft brands', 'Vintage fashion', 'Interior design'],
  },
  'holographic-bloom': {
    name: 'Holographic Bloom',
    description: 'Soft pastels with a digital, glowing effect - lilac, blush orchid, frosted coral',
    colors: ['C4B5FD', 'FBCFE8', 'FCA5A5', 'A5F3FC', 'FDE68A'],
    psychology: 'Digital dreamscape, Y2K nostalgia, soft futurism',
    useCases: ['Gen Z brands', 'Social media', 'Fashion', 'NFT projects'],
  },
  'bio-luminescent': {
    name: 'Bio-Luminescent',
    description: 'Deep blacks paired with glowing neon nature tones',
    colors: ['121212', '39FF14', '00FFFF', '7C3AED', '00FF88'],
    psychology: 'Mystery, nature meets tech, deep ocean, innovation',
    useCases: ['Dark mode apps', 'Gaming', 'Futuristic brands', 'Crypto'],
  },
};
