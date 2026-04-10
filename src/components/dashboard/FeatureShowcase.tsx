import { Link } from "react-router-dom";
import {
  Palette, Sparkles, Eye, Code, Globe, Image, Brain, Contrast,
  Paintbrush, BarChart3, Layout, Smartphone, Wand2, Layers, Search,
  Share2, Accessibility, RefreshCw, TrendingUp, Zap, FileCode,
  Monitor, PenTool, Compass
} from "lucide-react";

const featureCategories = [
  {
    title: "🎨 Color Generation",
    features: [
      { name: "Palette Generator", desc: "AI-powered harmonious palettes", path: "/generator", icon: Palette, gradient: "from-violet-500 to-purple-600" },
      { name: "AI Color Suggestions", desc: "Smart AI color recommendations", path: "/ai-suggestions", icon: Brain, gradient: "from-blue-500 to-cyan-500" },
      { name: "AI Constraint Generator", desc: "Palettes with design rules", path: "/ai-constraint-generator", icon: Wand2, gradient: "from-pink-500 to-rose-500" },
      { name: "Image Color Extractor", desc: "Extract colors from photos", path: "/image-extractor", icon: Image, gradient: "from-amber-500 to-orange-500" },
    ],
  },
  {
    title: "🔍 Explore & Discover",
    features: [
      { name: "50,000+ Colors", desc: "Browse the full color database", path: "/colors", icon: Compass, gradient: "from-emerald-500 to-teal-500" },
      { name: "Color Explorer", desc: "Search HEX, RGB, HSL, CMYK", path: "/color-explorer", icon: Search, gradient: "from-sky-500 to-blue-500" },
      { name: "Trending Palettes", desc: "Most popular combinations", path: "/trending", icon: TrendingUp, gradient: "from-red-500 to-pink-500" },
      { name: "Collections", desc: "Curated themed collections", path: "/collections", icon: Layers, gradient: "from-indigo-500 to-violet-500" },
    ],
  },
  {
    title: "♿ Accessibility & Testing",
    features: [
      { name: "Contrast Checker", desc: "WCAG AA/AAA validation", path: "/contrast-checker", icon: Contrast, gradient: "from-green-500 to-emerald-500" },
      { name: "Blindness Simulator", desc: "Test color blindness types", path: "/blindness-simulator", icon: Eye, gradient: "from-teal-500 to-cyan-500" },
      { name: "Accessibility Dashboard", desc: "Full WCAG compliance report", path: "/accessibility", icon: Accessibility, gradient: "from-blue-600 to-indigo-600" },
      { name: "Color Space Converter", desc: "HEX ↔ RGB ↔ HSL ↔ CMYK", path: "/color-space-converter", icon: RefreshCw, gradient: "from-purple-500 to-pink-500" },
    ],
  },
  {
    title: "🖥️ Preview & Export",
    features: [
      { name: "Live UI Preview", desc: "See colors on landing pages", path: "/live-preview", icon: Monitor, gradient: "from-cyan-500 to-blue-500" },
      { name: "UI Simulator", desc: "Preview on real UI mockups", path: "/ui-simulator", icon: Layout, gradient: "from-orange-500 to-red-500" },
      { name: "Code Export", desc: "CSS, Tailwind, SCSS, Swift", path: "/code-export", icon: FileCode, gradient: "from-slate-500 to-gray-700" },
      { name: "Data Viz Studio", desc: "Chart & graph color palettes", path: "/data-viz-studio", icon: BarChart3, gradient: "from-yellow-500 to-amber-500" },
    ],
  },
  {
    title: "🚀 Brand & Marketing",
    features: [
      { name: "AI Brand Architect", desc: "Generate complete brand identity", path: "/brand-architect", icon: PenTool, gradient: "from-fuchsia-500 to-purple-600" },
      { name: "Brand Colors", desc: "50+ famous brand HEX codes", path: "/brand-colors", icon: Paintbrush, gradient: "from-rose-500 to-red-500" },
      { name: "Social Media Kit", desc: "Branded social graphics", path: "/social-kit", icon: Share2, gradient: "from-pink-500 to-fuchsia-500" },
      { name: "URL Brand Extractor", desc: "Extract colors from websites", path: "/url-extractor", icon: Globe, gradient: "from-violet-500 to-indigo-500" },
    ],
  },
  {
    title: "📈 2026 Color Trends",
    features: [
      { name: "All 2026 Trends", desc: "Explore trending palettes", path: "/trends", icon: Zap, gradient: "from-amber-400 to-orange-500" },
      { name: "Cloud Dancer", desc: "Pantone Color of Year 2026", path: "/trends/cloud-dancer-2026", icon: Sparkles, gradient: "from-gray-300 to-slate-400" },
      { name: "Mermaidcore", desc: "Iridescent aqua & pearl", path: "/trends/mermaidcore-2026", icon: Sparkles, gradient: "from-teal-400 to-emerald-500" },
      { name: "Thermal Glow", desc: "Infrared heat map palette", path: "/trends/thermal-glow-2026", icon: Sparkles, gradient: "from-red-500 to-yellow-500" },
    ],
  },
];

export function FeatureShowcase() {
  return (
    <section className="space-y-10">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
          All-in-One Color Design Platform
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          25+ professional tools for designers, developers, and brands — all free
        </p>
      </div>

      {featureCategories.map((category) => (
        <div key={category.title}>
          <h3 className="text-xl font-display font-semibold text-foreground mb-4">
            {category.title}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {category.features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Link
                  key={feature.path}
                  to={feature.path}
                  className="group relative overflow-hidden rounded-xl border border-border bg-card p-5 hover:border-primary/40 hover:shadow-glow-sm transition-all duration-300"
                >
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="font-semibold text-foreground text-sm mb-1">{feature.name}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{feature.desc}</p>
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </section>
  );
}
