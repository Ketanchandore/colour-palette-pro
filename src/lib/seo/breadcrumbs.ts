import { BreadcrumbItem } from "@/components/seo/SEOHead";

/**
 * Route-to-breadcrumb map. Used by useAutoBreadcrumbs() to generate
 * BreadcrumbList JSON-LD for any page automatically.
 *
 * Dynamic route patterns use ":param" matched against the actual path.
 */
type CrumbBuilder = (path: string, params: Record<string, string>) => BreadcrumbItem[];

const home: BreadcrumbItem = { name: "Home", url: "/" };

const titleCase = (s: string) =>
  s.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

const ROUTES: Array<{ pattern: RegExp; build: CrumbBuilder }> = [
  // Tools
  { pattern: /^\/generator$/, build: () => [home, { name: "Color Tools", url: "/tools" }, { name: "Palette Generator", url: "/generator" }] },
  { pattern: /^\/tools$/, build: () => [home, { name: "Color Tools", url: "/tools" }] },
  { pattern: /^\/contrast-checker$/, build: () => [home, { name: "Tools", url: "/tools" }, { name: "WCAG Contrast Checker", url: "/contrast-checker" }] },
  { pattern: /^\/blindness-simulator$/, build: () => [home, { name: "Tools", url: "/tools" }, { name: "Color Blindness Simulator", url: "/blindness-simulator" }] },
  { pattern: /^\/image-extractor$/, build: () => [home, { name: "Tools", url: "/tools" }, { name: "Image Color Extractor", url: "/image-extractor" }] },
  { pattern: /^\/url-extractor$/, build: () => [home, { name: "Tools", url: "/tools" }, { name: "URL Brand Extractor", url: "/url-extractor" }] },
  { pattern: /^\/color-space-converter$/, build: () => [home, { name: "Tools", url: "/tools" }, { name: "Color Space Converter", url: "/color-space-converter" }] },
  { pattern: /^\/code-export$/, build: () => [home, { name: "Tools", url: "/tools" }, { name: "Code Export", url: "/code-export" }] },
  { pattern: /^\/accessibility$/, build: () => [home, { name: "Tools", url: "/tools" }, { name: "Accessibility Dashboard", url: "/accessibility" }] },
  { pattern: /^\/ui-simulator$/, build: () => [home, { name: "Tools", url: "/tools" }, { name: "UI Simulator", url: "/ui-simulator" }] },
  { pattern: /^\/live-preview$/, build: () => [home, { name: "Tools", url: "/tools" }, { name: "Live UI Preview", url: "/live-preview" }] },

  // AI Tools
  { pattern: /^\/ai-suggestions$/, build: () => [home, { name: "AI Tools", url: "/tools" }, { name: "AI Color Suggestions", url: "/ai-suggestions" }] },
  { pattern: /^\/ai-constraint-generator$/, build: () => [home, { name: "AI Tools", url: "/tools" }, { name: "AI Constraint Generator", url: "/ai-constraint-generator" }] },
  { pattern: /^\/brand-architect$/, build: () => [home, { name: "AI Tools", url: "/tools" }, { name: "AI Brand Architect", url: "/brand-architect" }] },
  { pattern: /^\/mood-search$/, build: () => [home, { name: "AI Tools", url: "/tools" }, { name: "Mood AI Search", url: "/mood-search" }] },
  { pattern: /^\/social-kit$/, build: () => [home, { name: "AI Tools", url: "/tools" }, { name: "Social Media Kit", url: "/social-kit" }] },
  { pattern: /^\/data-viz-studio$/, build: () => [home, { name: "AI Tools", url: "/tools" }, { name: "Data Viz Studio", url: "/data-viz-studio" }] },

  // Colors
  { pattern: /^\/colors$/, build: () => [home, { name: "Color Database", url: "/colors" }] },
  { pattern: /^\/color-explorer$/, build: () => [home, { name: "Color Database", url: "/colors" }, { name: "Color Explorer", url: "/color-explorer" }] },
  { pattern: /^\/color\/[^/]+$/, build: (_p, params) => [home, { name: "Colors", url: "/colors" }, { name: `#${params.hex || "Color"}`, url: `/color/${params.hex}` }] },
  { pattern: /^\/brand-colors$/, build: () => [home, { name: "Brand Colors", url: "/brand-colors" }] },

  // Trends
  { pattern: /^\/trends$/, build: () => [home, { name: "2026 Color Trends", url: "/trends" }] },
  { pattern: /^\/trends\/cloud-dancer-2026$/, build: () => [home, { name: "2026 Trends", url: "/trends" }, { name: "Cloud Dancer 2026", url: "/trends/cloud-dancer-2026" }] },
  { pattern: /^\/trends\/mermaidcore-2026$/, build: () => [home, { name: "2026 Trends", url: "/trends" }, { name: "Mermaidcore 2026", url: "/trends/mermaidcore-2026" }] },
  { pattern: /^\/trends\/thermal-glow-2026$/, build: () => [home, { name: "2026 Trends", url: "/trends" }, { name: "Thermal Glow 2026", url: "/trends/thermal-glow-2026" }] },

  // Festivals
  { pattern: /^\/palettes\/festival$/, build: () => [home, { name: "Color Palettes", url: "/palettes/festival" }, { name: "Festival Palettes", url: "/palettes/festival" }] },
  { pattern: /^\/palettes\/festival\/[^/]+$/, build: (_p, params) => [home, { name: "Festival Palettes", url: "/palettes/festival" }, { name: titleCase(params.slug || ""), url: `/palettes/festival/${params.slug}` }] },
  { pattern: /^\/palettes\/halloween-color-palette$/, build: () => [home, { name: "Festival Palettes", url: "/palettes/festival" }, { name: "Halloween", url: "/palettes/halloween-color-palette" }] },
  { pattern: /^\/palettes\/halloween\/[^/]+$/, build: (_p, params) => [home, { name: "Festival Palettes", url: "/palettes/festival" }, { name: "Halloween", url: "/palettes/halloween-color-palette" }, { name: titleCase(params.slug || ""), url: `/palettes/halloween/${params.slug}` }] },
  { pattern: /^\/palettes\/wedding-color-palettes$/, build: () => [home, { name: "Color Palettes", url: "/palettes/festival" }, { name: "Wedding Palettes", url: "/palettes/wedding-color-palettes" }] },
  { pattern: /^\/palettes\/pastel-color-palettes$/, build: () => [home, { name: "Color Palettes", url: "/palettes/festival" }, { name: "Pastel Palettes", url: "/palettes/pastel-color-palettes" }] },
  { pattern: /^\/palettes\/dark-mode-color-palettes$/, build: () => [home, { name: "Color Palettes", url: "/palettes/festival" }, { name: "Dark Mode Palettes", url: "/palettes/dark-mode-color-palettes" }] },
  { pattern: /^\/palettes\/minimalist-color-palettes$/, build: () => [home, { name: "Color Palettes", url: "/palettes/festival" }, { name: "Minimalist Palettes", url: "/palettes/minimalist-color-palettes" }] },
  { pattern: /^\/palettes\/ui-designer$/, build: () => [home, { name: "Color Palettes", url: "/palettes/festival" }, { name: "UI Designer", url: "/palettes/ui-designer" }] },
  { pattern: /^\/palettes\/frontend-developer$/, build: () => [home, { name: "Color Palettes", url: "/palettes/festival" }, { name: "Frontend Developer", url: "/palettes/frontend-developer" }] },

  // Guides
  { pattern: /^\/guides\/what-colors-go-with-red$/, build: () => [home, { name: "Guides", url: "/glossary/color-theory" }, { name: "What Colors Go With Red", url: "/guides/what-colors-go-with-red" }] },
  { pattern: /^\/guides\/creative-color-wheel$/, build: () => [home, { name: "Guides", url: "/glossary/color-theory" }, { name: "Creative Color Wheel", url: "/guides/creative-color-wheel" }] },
  { pattern: /^\/guides\/pantone-to-hex$/, build: () => [home, { name: "Guides", url: "/glossary/color-theory" }, { name: "Pantone to HEX", url: "/guides/pantone-to-hex" }] },
  { pattern: /^\/guides\/pink-and-green-palette$/, build: () => [home, { name: "Guides", url: "/glossary/color-theory" }, { name: "Pink and Green Palette", url: "/guides/pink-and-green-palette" }] },
  { pattern: /^\/guides\/color-opposite-of-pink$/, build: () => [home, { name: "Guides", url: "/glossary/color-theory" }, { name: "Color Opposite of Pink", url: "/guides/color-opposite-of-pink" }] },
  { pattern: /^\/guides\/canvas-color-codes$/, build: () => [home, { name: "Guides", url: "/glossary/color-theory" }, { name: "Canvas Color Codes", url: "/guides/canvas-color-codes" }] },
  { pattern: /^\/guides\/high-contrast-text$/, build: () => [home, { name: "Guides", url: "/glossary/color-theory" }, { name: "High Contrast Text", url: "/guides/high-contrast-text" }] },
  { pattern: /^\/guides\/black-and-white-checker$/, build: () => [home, { name: "Guides", url: "/glossary/color-theory" }, { name: "Black & White Checker", url: "/guides/black-and-white-checker" }] },
  { pattern: /^\/compare\/hex-vs-rgb-vs-hsl$/, build: () => [home, { name: "Guides", url: "/glossary/color-theory" }, { name: "HEX vs RGB vs HSL", url: "/compare/hex-vs-rgb-vs-hsl" }] },
  { pattern: /^\/glossary\/color-theory$/, build: () => [home, { name: "Color Theory", url: "/glossary/color-theory" }] },

  // Community
  { pattern: /^\/trending$/, build: () => [home, { name: "Trending Palettes", url: "/trending" }] },
  { pattern: /^\/collections$/, build: () => [home, { name: "Collections", url: "/collections" }] },
  { pattern: /^\/leaderboard$/, build: () => [home, { name: "Leaderboard", url: "/leaderboard" }] },
  { pattern: /^\/favorites$/, build: () => [home, { name: "My Favorites", url: "/favorites" }] },
  { pattern: /^\/profile$/, build: () => [home, { name: "Profile", url: "/profile" }] },
  { pattern: /^\/auth$/, build: () => [home, { name: "Sign In", url: "/auth" }] },
  { pattern: /^\/subscription$/, build: () => [home, { name: "Plans & Pricing", url: "/subscription" }] },
  { pattern: /^\/project-workspace$/, build: () => [home, { name: "Project Workspace", url: "/project-workspace" }] },
];

/**
 * Resolve breadcrumbs for any pathname (server-rendered pages should not call this).
 * Returns undefined for the home route — Google ignores single-item BreadcrumbList.
 */
export function resolveBreadcrumbs(pathname: string): BreadcrumbItem[] | undefined {
  if (pathname === "/" || pathname === "") return undefined;

  for (const route of ROUTES) {
    if (route.pattern.test(pathname)) {
      // Extract simple :slug or :hex param from last segment
      const params: Record<string, string> = {};
      const segments = pathname.split("/").filter(Boolean);
      const last = segments[segments.length - 1];
      if (pathname.includes("/color/")) params.hex = last;
      if (pathname.includes("/festival/") || pathname.includes("/halloween/")) params.slug = last;
      return route.build(pathname, params);
    }
  }
  return undefined;
}
