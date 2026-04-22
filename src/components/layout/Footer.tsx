import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

const footerSections = [
  {
    title: "Color Tools",
    links: [
      { to: "/generator", label: "Palette Generator" },
      { to: "/color-explorer", label: "Color Explorer" },
      { to: "/colors", label: "50,000+ Color Database" },
      { to: "/trending", label: "Trending Palettes" },
      { to: "/collections", label: "Collections" },
      { to: "/brand-colors", label: "Brand Colors" },
      { to: "/color-space-converter", label: "Color Space Converter" },
      { to: "/guides/pantone-to-hex", label: "Pantone to HEX Converter" },
      { to: "/guides/creative-color-wheel", label: "Creative Color Wheel" },
    ],
  },
  {
    title: "AI Tools",
    links: [
      { to: "/ai-suggestions", label: "AI Color Suggestions" },
      { to: "/brand-architect", label: "AI Brand Architect" },
      { to: "/mood-search", label: "Mood AI Search" },
      { to: "/ai-constraint-generator", label: "AI Constraint Generator" },
      { to: "/image-extractor", label: "Image Color Extractor" },
      { to: "/url-extractor", label: "URL Brand Extractor" },
    ],
  },
  {
    title: "Accessibility",
    links: [
      { to: "/contrast-checker", label: "Contrast Checker" },
      { to: "/blindness-simulator", label: "Color Blindness Simulator" },
      { to: "/accessibility", label: "Accessibility Dashboard" },
      { to: "/guides/high-contrast-text", label: "High Contrast Text Guide" },
      { to: "/guides/black-and-white-checker", label: "Black & White Checker" },
    ],
  },
  {
    title: "Preview & Export",
    links: [
      { to: "/live-preview", label: "Live UI Preview" },
      { to: "/ui-simulator", label: "UI Simulator" },
      { to: "/data-viz-studio", label: "Data Viz Studio" },
      { to: "/social-kit", label: "Social Media Kit" },
      { to: "/code-export", label: "Code Export" },
      { to: "/project-workspace", label: "Project Workspace" },
      { to: "/guides/canvas-color-codes", label: "Canvas Color Codes" },
    ],
  },
  {
    title: "Color Guides",
    links: [
      { to: "/guides/what-colors-go-with-red", label: "What Colors Go With Red" },
      { to: "/guides/pink-and-green-palette", label: "Pink & Green Palette" },
      { to: "/guides/color-opposite-of-pink", label: "Color Opposite of Pink" },
      { to: "/glossary/color-theory", label: "Color Theory Guide" },
      { to: "/compare/hex-vs-rgb-vs-hsl", label: "HEX vs RGB vs HSL" },
      { to: "/palettes/ui-designer", label: "UI Designer Palettes" },
      { to: "/palettes/frontend-developer", label: "Developer Palettes" },
    ],
  },
  {
    title: "Festivals & Trends",
    links: [
      { to: "/palettes/festival", label: "Festival Color Palettes" },
      { to: "/palettes/halloween-color-palette", label: "Halloween Palettes" },
      { to: "/palettes/wedding-color-palettes", label: "Wedding Color Palettes" },
      { to: "/palettes/pastel-color-palettes", label: "Pastel Palettes" },
      { to: "/palettes/dark-mode-color-palettes", label: "Dark Mode Palettes" },
      { to: "/palettes/minimalist-color-palettes", label: "Minimalist Palettes" },
      { to: "/trends", label: "2026 Color Trends" },
      { to: "/trends/cloud-dancer-2026", label: "Cloud Dancer 2026" },
      { to: "/trends/mermaidcore-2026", label: "Mermaidcore 2026" },
      { to: "/trends/thermal-glow-2026", label: "Thermal Glow 2026" },
      { to: "/leaderboard", label: "Leaderboard" },
    ],
  },
];

export const Footer = () => {
  return (
    <footer className="bg-muted/50 border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold mb-4 text-foreground">{section.title}</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {section.links.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className="hover:text-foreground transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* SEO keyword-rich bottom text */}
        <div className="border-t border-border mt-8 pt-8">
          <div className="text-xs text-muted-foreground/70 mb-6 max-w-4xl mx-auto text-center leading-relaxed">
            <p>Colour Pine is the #1 free online color palette generator, creative color wheel, contrast checker, and Pantone to HEX converter. 
            Explore what colors go with red, find the color opposite of pink, discover pink and green color palettes, and browse canvas color codes. 
            Our WCAG-compliant high contrast text checker, black and white checker, and color blindness simulator help designers create accessible designs. 
            Generate AI-powered color schemes, extract colors from images, and export to CSS, Tailwind, SCSS, Swift & Flutter.</p>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-display font-bold">Colour Pine</span>
            </Link>
            <p className="text-sm text-muted-foreground text-center">
              © {new Date().getFullYear()} Colour Pine. Free AI color palette generator with 50,000+ colors and WCAG accessibility tools.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
