import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-muted/50 border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-display font-bold">Colour Pine</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              The world's most advanced color palette platform with 50,000+ colors and 2026 trend analysis.
            </p>
          </div>

          {/* Colors */}
          <div>
            <h4 className="font-semibold mb-4">Colors</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/colors" className="hover:text-foreground transition-colors">Color Database</Link></li>
              <li><Link to="/generator" className="hover:text-foreground transition-colors">Palette Generator</Link></li>
              <li><Link to="/trending" className="hover:text-foreground transition-colors">Trending Palettes</Link></li>
              <li><Link to="/contrast-checker" className="hover:text-foreground transition-colors">Contrast Checker</Link></li>
            </ul>
          </div>

          {/* Trends */}
          <div>
            <h4 className="font-semibold mb-4">2026 Trends</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/trends" className="hover:text-foreground transition-colors">All Trends</Link></li>
              <li><Link to="/trends/cloud-dancer-2026" className="hover:text-foreground transition-colors">Cloud Dancer</Link></li>
              <li><Link to="/trends/mermaidcore-2026" className="hover:text-foreground transition-colors">Mermaidcore</Link></li>
              <li><Link to="/trends/thermal-glow-2026" className="hover:text-foreground transition-colors">Thermal Glow</Link></li>
            </ul>
          </div>

          {/* Tools */}
          <div>
            <h4 className="font-semibold mb-4">Tools</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/tools" className="hover:text-foreground transition-colors">All Tools</Link></li>
              <li><Link to="/image-extractor" className="hover:text-foreground transition-colors">Image Extractor</Link></li>
              <li><Link to="/ai-suggestions" className="hover:text-foreground transition-colors">AI Suggestions</Link></li>
              <li><Link to="/live-preview" className="hover:text-foreground transition-colors">Live UI Preview</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Colour Pine. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
