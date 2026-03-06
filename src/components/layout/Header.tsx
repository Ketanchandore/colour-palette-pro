import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';

const allFeatures = [
  { label: "Color Palette Generator", path: "/generator" },
  { label: "AI Color Suggestions", path: "/ai-suggestions" },
  { label: "Brand Architect", path: "/brand-architect" },
  { label: "Mood AI Search", path: "/mood-search" },
  { label: "Image Color Extractor", path: "/image-extractor" },
  { label: "URL Brand Extractor", path: "/url-extractor" },
  { label: "AI Constraint Generator", path: "/ai-constraint-generator" },
  { label: "Contrast Checker", path: "/contrast-checker" },
  { label: "Color Blindness Simulator", path: "/blindness-simulator" },
  { label: "Accessibility Dashboard", path: "/accessibility" },
  { label: "Color Space Converter", path: "/color-space-converter" },
  { label: "Code Export", path: "/code-export" },
  { label: "Live UI Preview", path: "/live-preview" },
  { label: "UI Simulator", path: "/ui-simulator" },
  { label: "Data Viz Studio", path: "/data-viz-studio" },
  { label: "Social Media Kit", path: "/social-kit" },
  { label: "Color Explorer", path: "/color-explorer" },
  { label: "Color Database", path: "/colors" },
  { label: "Brand Colors", path: "/brand-colors" },
  { label: "Trending Palettes", path: "/trending" },
  { label: "2026 Trends", path: "/trends" },
  { label: "Cloud Dancer 2026", path: "/trends/cloud-dancer-2026" },
  { label: "Mermaidcore 2026", path: "/trends/mermaidcore-2026" },
  { label: "Thermal Glow 2026", path: "/trends/thermal-glow-2026" },
  { label: "Collections", path: "/collections" },
  { label: "Favorites", path: "/favorites" },
  { label: "Project Workspace", path: "/project-workspace" },
  { label: "Leaderboard", path: "/leaderboard" },
];

export const Header = () => {
  const { user } = useAuth();
  const [showAll, setShowAll] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 h-16 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto h-full flex items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2">
            <img src="/colourpine-logo.png" alt="Colour Pine Logo" className="w-10 h-10 rounded-xl object-contain" />
            <span className="text-xl font-display font-bold text-foreground">Colour Pine</span>
          </Link>

          <nav className="hidden md:flex items-center gap-5">
            <Link to="/generator" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Generator
            </Link>
            <Link to="/colors" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Colors
            </Link>
            <Link to="/trends" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              2026 Trends
            </Link>
            <Link to="/contrast-checker" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Contrast Checker
            </Link>
            <Link to="/tools" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Tools
            </Link>
            <button
              onClick={() => setShowAll(true)}
              className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
            >
              All Features
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowAll(true)}
              className="md:hidden text-sm font-medium text-primary hover:text-primary/80"
            >
              All Features
            </button>
            {user ? (
              <Link to="/profile">
                <Button variant="outline" size="sm">
                  Profile
                </Button>
              </Link>
            ) : (
              <Link to="/auth">
                <Button size="sm" className="gradient-primary text-white">
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* All Features Overlay */}
      {showAll && (
        <div className="fixed inset-0 z-50 bg-background/98 backdrop-blur-md overflow-y-auto">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-display font-bold text-foreground">All Features</h2>
              <button
                onClick={() => setShowAll(false)}
                className="p-2 rounded-xl hover:bg-muted transition-colors"
              >
                <X className="w-6 h-6 text-foreground" />
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {allFeatures.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setShowAll(false)}
                  className="p-4 rounded-xl bg-card border border-border hover:border-primary/30 hover:shadow-glow-sm transition-all duration-200"
                >
                  <span className="text-sm font-medium text-foreground">{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
