// Master SEO Dataset for Programmatic Content Engine
// Used across all 12 playbook types for combinational page generation

export interface Persona {
  slug: string;
  name: string;
  title: string;
  painPoints: string[];
  tools: string[];
  keywords: string[];
}

export interface Industry {
  slug: string;
  name: string;
  colorNeeds: string[];
  keywords: string[];
}

export interface Tool {
  slug: string;
  name: string;
  description: string;
  path: string;
}

export interface Integration {
  slug: string;
  name: string;
  category: string;
  keywords: string[];
}

export interface ColorFormat {
  slug: string;
  name: string;
  fullName: string;
  description: string;
}

export const PERSONAS: Persona[] = [
  {
    slug: "ui-designer",
    name: "UI Designer",
    title: "UI/UX Designer",
    painPoints: ["Maintaining consistency across design systems", "Dark mode color adaptation", "Accessible color contrast"],
    tools: ["Figma", "Sketch", "Adobe XD"],
    keywords: ["ui design color palette", "design system colors", "ui color scheme"]
  },
  {
    slug: "frontend-developer",
    name: "Frontend Developer",
    title: "Frontend Developer",
    painPoints: ["Converting design tokens to code", "CSS variable naming", "Theme switching implementation"],
    tools: ["VS Code", "Tailwind CSS", "CSS Variables"],
    keywords: ["developer color palette", "css color tokens", "tailwind color scheme"]
  },
  {
    slug: "brand-designer",
    name: "Brand Designer",
    title: "Brand Identity Designer",
    painPoints: ["Creating cohesive brand color systems", "Print vs digital color matching", "Client presentation of color rationale"],
    tools: ["Adobe Illustrator", "Canva", "Brand Guidelines"],
    keywords: ["brand color palette", "brand identity colors", "logo color scheme"]
  },
  {
    slug: "mobile-app-designer",
    name: "Mobile App Designer",
    title: "Mobile App Designer",
    painPoints: ["iOS & Android color guidelines", "Dark mode adaptation", "Small screen contrast"],
    tools: ["SwiftUI", "Material Design", "Flutter"],
    keywords: ["mobile app colors", "app color scheme", "ios android color palette"]
  },
  {
    slug: "marketing-manager",
    name: "Marketing Manager",
    title: "Marketing Manager",
    painPoints: ["A/B testing color variations", "CTA button optimization", "Brand consistency across campaigns"],
    tools: ["HubSpot", "Mailchimp", "Social Media"],
    keywords: ["marketing color psychology", "cta button colors", "conversion color palette"]
  },
  {
    slug: "product-manager",
    name: "Product Manager",
    title: "Product Manager",
    painPoints: ["Communicating design decisions to stakeholders", "Feature prioritization with design", "User research color preferences"],
    tools: ["Jira", "Confluence", "Miro"],
    keywords: ["product design colors", "saas dashboard colors", "product color strategy"]
  },
  {
    slug: "graphic-designer",
    name: "Graphic Designer",
    title: "Graphic Designer",
    painPoints: ["CMYK vs RGB conversion", "Print color accuracy", "Creating mood boards"],
    tools: ["Photoshop", "InDesign", "Procreate"],
    keywords: ["graphic design color palette", "print color scheme", "poster color combination"]
  },
  {
    slug: "ux-researcher",
    name: "UX Researcher",
    title: "UX Researcher",
    painPoints: ["Color perception user testing", "Accessibility compliance reporting", "Cultural color associations"],
    tools: ["UserTesting", "Hotjar", "Survey Tools"],
    keywords: ["ux color research", "color accessibility study", "user color preference"]
  }
];

export const INDUSTRIES: Industry[] = [
  { slug: "saas", name: "SaaS", colorNeeds: ["Dashboard clarity", "Trust signals", "Feature hierarchy"], keywords: ["saas color palette", "dashboard colors", "software ui colors"] },
  { slug: "ecommerce", name: "E-Commerce", colorNeeds: ["Conversion optimization", "Trust badges", "Product showcase"], keywords: ["ecommerce color scheme", "online store colors", "shopping website palette"] },
  { slug: "healthcare", name: "Healthcare", colorNeeds: ["Calming tones", "Accessibility compliance", "Trust & reliability"], keywords: ["healthcare color palette", "medical website colors", "health app colors"] },
  { slug: "fintech", name: "FinTech", colorNeeds: ["Security signals", "Data visualization", "Professional trust"], keywords: ["fintech color palette", "banking app colors", "financial dashboard colors"] },
  { slug: "gaming", name: "Gaming", colorNeeds: ["Energy & excitement", "Dark mode defaults", "Neon accents"], keywords: ["gaming color palette", "esports colors", "game ui colors"] },
  { slug: "education", name: "Education", colorNeeds: ["Engagement", "Readability", "Age-appropriate schemes"], keywords: ["education color palette", "learning app colors", "edtech colors"] },
  { slug: "real-estate", name: "Real Estate", colorNeeds: ["Luxury feel", "Trust signals", "Clean layouts"], keywords: ["real estate color palette", "property website colors", "luxury real estate colors"] },
  { slug: "restaurant", name: "Restaurant & Food", colorNeeds: ["Appetite stimulation", "Warmth", "Menu readability"], keywords: ["restaurant color palette", "food website colors", "cafe color scheme"] },
  { slug: "luxury", name: "Luxury & Fashion", colorNeeds: ["Premium feel", "Minimalist elegance", "High contrast typography"], keywords: ["luxury color palette", "fashion brand colors", "premium color scheme"] },
  { slug: "sustainability", name: "Sustainability & Green", colorNeeds: ["Nature tones", "Eco credentials", "Earthy warmth"], keywords: ["sustainability color palette", "eco friendly colors", "green brand colors"] },
  { slug: "wedding", name: "Wedding & Events", colorNeeds: ["Romantic tones", "Seasonal themes", "Elegant typography"], keywords: ["wedding color palette", "event color scheme", "bridal colors"] },
  { slug: "tech-startup", name: "Tech Startup", colorNeeds: ["Modern & bold", "Differentiation", "Innovation signals"], keywords: ["startup color palette", "tech brand colors", "modern startup colors"] }
];

export const TOOLS: Tool[] = [
  { slug: "palette-generator", name: "Palette Generator", description: "Generate harmonious color palettes with AI", path: "/generator" },
  { slug: "contrast-checker", name: "Contrast Checker", description: "WCAG 2.1 AA/AAA contrast ratio validation", path: "/contrast-checker" },
  { slug: "color-converter", name: "Color Space Converter", description: "Convert between HEX, RGB, HSL, CMYK formats", path: "/color-space-converter" },
  { slug: "brand-architect", name: "AI Brand Architect", description: "AI-powered brand color system generator", path: "/brand-architect" },
  { slug: "code-export", name: "Code Export", description: "Export palettes as CSS, Tailwind, SCSS tokens", path: "/code-export" },
  { slug: "blindness-simulator", name: "Color Blindness Simulator", description: "Test palettes for color vision deficiencies", path: "/blindness-simulator" }
];

export const INTEGRATIONS: Integration[] = [
  { slug: "figma", name: "Figma", category: "Design Tool", keywords: ["figma color palette", "figma design tokens", "figma color styles"] },
  { slug: "tailwind-css", name: "Tailwind CSS", category: "CSS Framework", keywords: ["tailwind color palette", "tailwind custom colors", "tailwind theme colors"] },
  { slug: "css-variables", name: "CSS Variables", category: "Web Standard", keywords: ["css custom properties colors", "css variables color theme", "css color tokens"] },
  { slug: "scss-sass", name: "SCSS/SASS", category: "CSS Preprocessor", keywords: ["scss color variables", "sass color palette", "scss color functions"] }
];

export const COLOR_FORMATS: ColorFormat[] = [
  { slug: "hex", name: "HEX", fullName: "Hexadecimal", description: "6-digit web color code starting with # (e.g., #FF5733)" },
  { slug: "rgb", name: "RGB", fullName: "Red Green Blue", description: "Additive color model with values 0-255 per channel" },
  { slug: "hsl", name: "HSL", fullName: "Hue Saturation Lightness", description: "Human-readable color model based on the color wheel" },
  { slug: "cmyk", name: "CMYK", fullName: "Cyan Magenta Yellow Key", description: "Subtractive color model for print production" }
];

// Glossary terms for the Glossary playbook
export const GLOSSARY_TERMS = [
  { slug: "color-theory", name: "Color Theory", category: "Fundamentals" },
  { slug: "wcag-contrast-ratio", name: "WCAG Contrast Ratio", category: "Accessibility" },
  { slug: "complementary-colors", name: "Complementary Colors", category: "Color Harmony" },
  { slug: "analogous-colors", name: "Analogous Colors", category: "Color Harmony" },
  { slug: "color-psychology", name: "Color Psychology", category: "Design Theory" },
  { slug: "triadic-colors", name: "Triadic Colors", category: "Color Harmony" },
  { slug: "split-complementary", name: "Split-Complementary", category: "Color Harmony" },
  { slug: "color-temperature", name: "Color Temperature", category: "Fundamentals" },
  { slug: "saturation", name: "Saturation", category: "Fundamentals" },
  { slug: "color-blindness", name: "Color Blindness", category: "Accessibility" },
];

// Internal linking helper: get related pages for any given page
export function getRelatedPages(currentPath: string, playbook: string): { label: string; path: string; description: string }[] {
  const allPages = [
    { label: "Color Palette Generator", path: "/generator", description: "Generate AI-powered color palettes", playbook: "tool" },
    { label: "Trending Palettes", path: "/trending", description: "Discover trending color combinations", playbook: "curation" },
    { label: "Color Explorer", path: "/color-explorer", description: "Browse and search 50,000+ colors", playbook: "directory" },
    { label: "Color Database", path: "/colors", description: "Complete color reference with HEX, RGB, HSL values", playbook: "directory" },
    { label: "Contrast Checker", path: "/contrast-checker", description: "WCAG 2.1 AA/AAA contrast validation", playbook: "tool" },
    { label: "Color Blindness Simulator", path: "/blindness-simulator", description: "Test color accessibility", playbook: "tool" },
    { label: "AI Brand Architect", path: "/brand-architect", description: "AI-powered brand color system", playbook: "tool" },
    { label: "Code Export", path: "/code-export", description: "Export palettes as CSS, Tailwind, SCSS", playbook: "integration" },
    { label: "2026 Color Trends", path: "/trends", description: "Explore 2026 trending color palettes", playbook: "curation" },
    { label: "Cloud Dancer 2026", path: "/trends/cloud-dancer-2026", description: "Cloud Dancer trend analysis", playbook: "curation" },
    { label: "Mermaidcore 2026", path: "/trends/mermaidcore-2026", description: "Mermaidcore trend deep dive", playbook: "curation" },
    { label: "Thermal Glow 2026", path: "/trends/thermal-glow-2026", description: "Thermal Glow trend exploration", playbook: "curation" },
    { label: "Collections", path: "/collections", description: "Curated color collections", playbook: "curation" },
    { label: "Color Tools", path: "/tools", description: "Complete color toolkit", playbook: "tool" },
    { label: "UI Designer Palettes", path: "/palettes/ui-designer", description: "Color palettes for UI designers", playbook: "persona" },
    { label: "Frontend Developer Palettes", path: "/palettes/frontend-developer", description: "Color palettes for developers", playbook: "persona" },
    { label: "HEX vs RGB vs HSL", path: "/compare/hex-vs-rgb-vs-hsl", description: "Color format comparison guide", playbook: "comparison" },
    { label: "Color Theory Glossary", path: "/glossary/color-theory", description: "Complete color theory guide", playbook: "glossary" },
    { label: "Image Color Extractor", path: "/image-extractor", description: "Extract color palettes from images", playbook: "tool" },
    { label: "Live UI Preview", path: "/live-preview", description: "Preview colors in real UI components", playbook: "tool" },
  ];

  return allPages
    .filter(p => p.path !== currentPath)
    .sort(() => Math.random() - 0.5)
    .slice(0, 8);
}
