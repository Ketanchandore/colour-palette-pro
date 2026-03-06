import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-sidebar border-t border-border">
      {/* Main Footer Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* Colors */}
          <div>
            <h4 className="font-display font-semibold mb-4 text-white text-sm uppercase tracking-wider">Colors</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/colors" className="text-white/60 hover:text-white transition-colors">Color Database</Link></li>
              <li><Link to="/color-explorer" className="text-white/60 hover:text-white transition-colors">Color Explorer</Link></li>
              <li><Link to="/generator" className="text-white/60 hover:text-white transition-colors">Palette Generator</Link></li>
              <li><Link to="/trending" className="text-white/60 hover:text-white transition-colors">Trending Palettes</Link></li>
              <li><Link to="/collections" className="text-white/60 hover:text-white transition-colors">Collections</Link></li>
              <li><Link to="/brand-colors" className="text-white/60 hover:text-white transition-colors">Brand Colors</Link></li>
              <li><Link to="/favorites" className="text-white/60 hover:text-white transition-colors">Favorites</Link></li>
            </ul>
          </div>

          {/* AI Tools */}
          <div>
            <h4 className="font-display font-semibold mb-4 text-white text-sm uppercase tracking-wider">AI Tools</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/ai-suggestions" className="text-white/60 hover:text-white transition-colors">AI Color Suggestions</Link></li>
              <li><Link to="/brand-architect" className="text-white/60 hover:text-white transition-colors">AI Brand Architect</Link></li>
              <li><Link to="/mood-search" className="text-white/60 hover:text-white transition-colors">Mood AI Search</Link></li>
              <li><Link to="/ai-constraint-generator" className="text-white/60 hover:text-white transition-colors">AI Constraint Generator</Link></li>
              <li><Link to="/image-extractor" className="text-white/60 hover:text-white transition-colors">Image Color Extractor</Link></li>
              <li><Link to="/url-extractor" className="text-white/60 hover:text-white transition-colors">URL Brand Extractor</Link></li>
            </ul>
          </div>

          {/* Design Tools */}
          <div>
            <h4 className="font-display font-semibold mb-4 text-white text-sm uppercase tracking-wider">Design Tools</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/contrast-checker" className="text-white/60 hover:text-white transition-colors">Contrast Checker</Link></li>
              <li><Link to="/color-space-converter" className="text-white/60 hover:text-white transition-colors">Color Converter</Link></li>
              <li><Link to="/blindness-simulator" className="text-white/60 hover:text-white transition-colors">Blindness Simulator</Link></li>
              <li><Link to="/accessibility" className="text-white/60 hover:text-white transition-colors">Accessibility Dashboard</Link></li>
              <li><Link to="/code-export" className="text-white/60 hover:text-white transition-colors">Code Export</Link></li>
              <li><Link to="/tools" className="text-white/60 hover:text-white transition-colors">All Tools</Link></li>
            </ul>
          </div>

          {/* Preview & Studio */}
          <div>
            <h4 className="font-display font-semibold mb-4 text-white text-sm uppercase tracking-wider">Preview & Studio</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/live-preview" className="text-white/60 hover:text-white transition-colors">Live UI Preview</Link></li>
              <li><Link to="/ui-simulator" className="text-white/60 hover:text-white transition-colors">UI Simulator</Link></li>
              <li><Link to="/data-viz-studio" className="text-white/60 hover:text-white transition-colors">Data Viz Studio</Link></li>
              <li><Link to="/social-kit" className="text-white/60 hover:text-white transition-colors">Social Media Kit</Link></li>
              <li><Link to="/project-workspace" className="text-white/60 hover:text-white transition-colors">Project Workspace</Link></li>
              <li><Link to="/leaderboard" className="text-white/60 hover:text-white transition-colors">Leaderboard</Link></li>
            </ul>
          </div>

          {/* 2026 Trends */}
          <div>
            <h4 className="font-display font-semibold mb-4 text-white text-sm uppercase tracking-wider">2026 Trends</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/trends" className="text-white/60 hover:text-white transition-colors">All Trends</Link></li>
              <li><Link to="/trends/cloud-dancer-2026" className="text-white/60 hover:text-white transition-colors">Cloud Dancer</Link></li>
              <li><Link to="/trends/mermaidcore-2026" className="text-white/60 hover:text-white transition-colors">Mermaidcore</Link></li>
              <li><Link to="/trends/thermal-glow-2026" className="text-white/60 hover:text-white transition-colors">Thermal Glow</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-display font-semibold mb-4 text-white text-sm uppercase tracking-wider">Resources</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/palettes/ui-designer" className="text-white/60 hover:text-white transition-colors">UI Designer Palettes</Link></li>
              <li><Link to="/palettes/frontend-developer" className="text-white/60 hover:text-white transition-colors">Developer Palettes</Link></li>
              <li><Link to="/compare/hex-vs-rgb-vs-hsl" className="text-white/60 hover:text-white transition-colors">HEX vs RGB vs HSL</Link></li>
              <li><Link to="/glossary/color-theory" className="text-white/60 hover:text-white transition-colors">Color Theory Guide</Link></li>
              <li><Link to="/subscription" className="text-white/60 hover:text-white transition-colors">Plans & Pricing</Link></li>
              <li><Link to="/auth" className="text-white/60 hover:text-white transition-colors">Sign In</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2">
            <img src="/colourpine-logo.png" alt="Colour Pine" className="w-8 h-8 rounded-lg object-contain" />
            <span className="font-display font-bold text-white">Colour Pine</span>
          </Link>
          <p className="text-xs text-white/40 text-center">
            © {new Date().getFullYear()} Colour Pine. Free AI-powered color palette generator with 50,000+ colors, WCAG accessibility tools, and 2026 trend palettes.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
