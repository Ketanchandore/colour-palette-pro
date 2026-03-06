import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-muted/50 border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* Colors */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Colors</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/colors" className="hover:text-foreground transition-colors">Color Database</Link></li>
              <li><Link to="/color-explorer" className="hover:text-foreground transition-colors">Color Explorer</Link></li>
              <li><Link to="/generator" className="hover:text-foreground transition-colors">Palette Generator</Link></li>
              <li><Link to="/trending" className="hover:text-foreground transition-colors">Trending Palettes</Link></li>
              <li><Link to="/collections" className="hover:text-foreground transition-colors">Collections</Link></li>
              <li><Link to="/brand-colors" className="hover:text-foreground transition-colors">Brand Colors</Link></li>
            </ul>
          </div>

          {/* AI Tools */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">AI Tools</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/ai-suggestions" className="hover:text-foreground transition-colors">AI Color Suggestions</Link></li>
              <li><Link to="/brand-architect" className="hover:text-foreground transition-colors">AI Brand Architect</Link></li>
              <li><Link to="/mood-search" className="hover:text-foreground transition-colors">Mood AI Search</Link></li>
              <li><Link to="/ai-constraint-generator" className="hover:text-foreground transition-colors">AI Constraint Generator</Link></li>
              <li><Link to="/image-extractor" className="hover:text-foreground transition-colors">Image Extractor</Link></li>
              <li><Link to="/url-extractor" className="hover:text-foreground transition-colors">URL Brand Extractor</Link></li>
            </ul>
          </div>

          {/* Design Tools */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Design Tools</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/contrast-checker" className="hover:text-foreground transition-colors">Contrast Checker</Link></li>
              <li><Link to="/color-space-converter" className="hover:text-foreground transition-colors">Color Converter</Link></li>
              <li><Link to="/blindness-simulator" className="hover:text-foreground transition-colors">Blindness Simulator</Link></li>
              <li><Link to="/accessibility" className="hover:text-foreground transition-colors">Accessibility Dashboard</Link></li>
              <li><Link to="/code-export" className="hover:text-foreground transition-colors">Code Export</Link></li>
              <li><Link to="/tools" className="hover:text-foreground transition-colors">All Tools</Link></li>
            </ul>
          </div>

          {/* Preview & Studio */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Preview & Studio</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/live-preview" className="hover:text-foreground transition-colors">Live UI Preview</Link></li>
              <li><Link to="/ui-simulator" className="hover:text-foreground transition-colors">UI Simulator</Link></li>
              <li><Link to="/data-viz-studio" className="hover:text-foreground transition-colors">Data Viz Studio</Link></li>
              <li><Link to="/social-kit" className="hover:text-foreground transition-colors">Social Media Kit</Link></li>
              <li><Link to="/project-workspace" className="hover:text-foreground transition-colors">Project Workspace</Link></li>
            </ul>
          </div>

          {/* 2026 Trends */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">2026 Trends</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/trends" className="hover:text-foreground transition-colors">All Trends</Link></li>
              <li><Link to="/trends/cloud-dancer-2026" className="hover:text-foreground transition-colors">Cloud Dancer</Link></li>
              <li><Link to="/trends/mermaidcore-2026" className="hover:text-foreground transition-colors">Mermaidcore</Link></li>
              <li><Link to="/trends/thermal-glow-2026" className="hover:text-foreground transition-colors">Thermal Glow</Link></li>
            </ul>
          </div>

          {/* Resources & Community */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/palettes/ui-designer" className="hover:text-foreground transition-colors">UI Designer Palettes</Link></li>
              <li><Link to="/palettes/frontend-developer" className="hover:text-foreground transition-colors">Developer Palettes</Link></li>
              <li><Link to="/compare/hex-vs-rgb-vs-hsl" className="hover:text-foreground transition-colors">HEX vs RGB vs HSL</Link></li>
              <li><Link to="/glossary/color-theory" className="hover:text-foreground transition-colors">Color Theory Guide</Link></li>
              <li><Link to="/leaderboard" className="hover:text-foreground transition-colors">Leaderboard</Link></li>
              <li><Link to="/favorites" className="hover:text-foreground transition-colors">Favorites</Link></li>
            </ul>
          </div>
        </div>

        {/* Brand Row */}
        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
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
    </footer>
  );
};

export default Footer;
