import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, X, Palette, Sparkles, Eye, BarChart3, Wand2, ImageIcon, Globe, Zap, Code, Monitor, Share2, FolderKanban, RefreshCw, TrendingUp, Heart, Trophy, BookOpen, GitCompare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';

const allTools = [
  { label: "Palette Generator", path: "/generator", icon: Palette },
  { label: "AI Color Suggestions", path: "/ai-suggestions", icon: Sparkles },
  { label: "AI Brand Architect", path: "/brand-architect", icon: Wand2 },
  { label: "Mood AI Search", path: "/mood-search", icon: Sparkles },
  { label: "Image Color Extractor", path: "/image-extractor", icon: ImageIcon },
  { label: "URL Brand Extractor", path: "/url-extractor", icon: Globe },
  { label: "AI Constraint Generator", path: "/ai-constraint-generator", icon: Zap },
  { label: "Contrast Checker", path: "/contrast-checker", icon: Eye },
  { label: "Color Blindness Simulator", path: "/blindness-simulator", icon: Eye },
  { label: "Accessibility Dashboard", path: "/accessibility", icon: BarChart3 },
  { label: "Color Space Converter", path: "/color-space-converter", icon: RefreshCw },
  { label: "Code Export", path: "/code-export", icon: Code },
  { label: "Live UI Preview", path: "/live-preview", icon: Monitor },
  { label: "UI Simulator", path: "/ui-simulator", icon: Monitor },
  { label: "Data Viz Studio", path: "/data-viz-studio", icon: BarChart3 },
  { label: "Social Media Kit", path: "/social-kit", icon: Share2 },
  { label: "Color Explorer", path: "/color-explorer", icon: Palette },
  { label: "Color Database", path: "/colors", icon: Palette },
  { label: "Brand Colors", path: "/brand-colors", icon: Wand2 },
  { label: "Trending Palettes", path: "/trending", icon: TrendingUp },
  { label: "2026 Trends", path: "/trends", icon: TrendingUp },
  { label: "Cloud Dancer 2026", path: "/trends/cloud-dancer-2026", icon: TrendingUp },
  { label: "Mermaidcore 2026", path: "/trends/mermaidcore-2026", icon: TrendingUp },
  { label: "Thermal Glow 2026", path: "/trends/thermal-glow-2026", icon: TrendingUp },
  { label: "Collections", path: "/collections", icon: FolderKanban },
  { label: "Favorites", path: "/favorites", icon: Heart },
  { label: "Project Workspace", path: "/project-workspace", icon: FolderKanban },
  { label: "Leaderboard", path: "/leaderboard", icon: Trophy },
  { label: "UI Designer Palettes", path: "/palettes/ui-designer", icon: Palette },
  { label: "Developer Palettes", path: "/palettes/frontend-developer", icon: Code },
  { label: "HEX vs RGB vs HSL", path: "/compare/hex-vs-rgb-vs-hsl", icon: GitCompare },
  { label: "Color Theory Guide", path: "/glossary/color-theory", icon: BookOpen },
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
            <span className="text-xl font-display font-bold text-foreground hidden sm:inline">Colour Pine</span>
          </Link>

          <nav className="hidden md:flex items-center gap-5">
            <Link to="/generator" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Generator
            </Link>
            <Link to="/trending" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Trending
            </Link>
            <button
              onClick={() => setShowAll(true)}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
            >
              All Tools
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowAll(true)}
              className="md:hidden inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium bg-primary/10 text-primary"
            >
              All Tools
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
            {user ? (
              <Link to="/profile">
                <Button variant="outline" size="sm">Profile</Button>
              </Link>
            ) : (
              <Link to="/auth">
                <Button size="sm" className="gradient-primary text-white">Sign In</Button>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* All Tools Full-Screen Overlay */}
      {showAll && (
        <div className="fixed inset-0 z-50 bg-background/98 backdrop-blur-md overflow-y-auto animate-fade-in">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-display font-bold text-foreground">All Tools & Pages</h2>
                <p className="text-sm text-muted-foreground mt-1">Click any tool to navigate there</p>
              </div>
              <button
                onClick={() => setShowAll(false)}
                className="p-2 rounded-xl hover:bg-muted transition-colors"
              >
                <X className="w-6 h-6 text-foreground" />
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {allTools.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setShowAll(false)}
                  className="group flex items-center gap-3 p-4 rounded-xl bg-card border border-border hover:border-primary/40 hover:shadow-glow-sm transition-all duration-200"
                >
                  <item.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                  <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{item.label}</span>
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
