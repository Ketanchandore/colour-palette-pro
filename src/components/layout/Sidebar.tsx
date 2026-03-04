import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Home, 
  Palette, 
  TrendingUp, 
  FolderOpen, 
  Wrench, 
  Heart, 
  User,
  LogOut,
  LogIn,
  Sparkles,
  ImageIcon,
  Wand2,
  Building2,
  Eye,
  BarChart3,
  FolderKanban,
  RefreshCw,
  Sliders,
  X,
  Menu,
  Crown,
  Star,
  Gem,
  Zap,
  Trophy,
  BookOpen,
  GitCompare,
  FileText
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { useSubscription, SubscriptionTier } from "@/hooks/useSubscription";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useSidebar } from "@/hooks/useSidebar";
import { SubscriptionModal } from "@/components/subscription/SubscriptionModal";

const navItems = [
  { icon: Home, label: "Dashboard", path: "/" },
  { icon: Palette, label: "Generator", path: "/generator" },
  { icon: TrendingUp, label: "Trending", path: "/trending" },
  { icon: Sparkles, label: "2026 Trends", path: "/trends" },
  { icon: Palette, label: "Color Database", path: "/colors" },
  { icon: FolderOpen, label: "Collections", path: "/collections" },
  { icon: Wrench, label: "Color Tools", path: "/tools" },
  { icon: ImageIcon, label: "Image Extractor", path: "/image-extractor" },
  { icon: Wand2, label: "AI Suggestions", path: "/ai-suggestions" },
  { icon: Building2, label: "Brand Colors", path: "/brand-colors" },
  { icon: Eye, label: "Blindness Simulator", path: "/blindness-simulator" },
];

const advancedTools = [
  { icon: Palette, label: "Color Explorer", path: "/color-explorer" },
  { icon: Palette, label: "50K+ Color Database", path: "/colors" },
  { icon: Eye, label: "Live UI Preview", path: "/live-preview" },
  { icon: Eye, label: "Contrast Checker", path: "/contrast-checker" },
  { icon: Eye, label: "UI Simulator", path: "/ui-simulator" },
  { icon: Building2, label: "URL Extractor", path: "/url-extractor" },
  { icon: Eye, label: "Accessibility", path: "/accessibility" },
  { icon: Wrench, label: "Code Export", path: "/code-export" },
  { icon: Wand2, label: "Mood AI Search", path: "/mood-search" },
  { icon: Palette, label: "Brand Architect", path: "/brand-architect" },
  { icon: ImageIcon, label: "Social Media Kit", path: "/social-kit" },
  { icon: Sliders, label: "AI Constraint Gen", path: "/ai-constraint-generator" },
  { icon: BarChart3, label: "Data Viz Studio", path: "/data-viz-studio" },
  { icon: FolderKanban, label: "Project Workspace", path: "/project-workspace" },
  { icon: RefreshCw, label: "Color Space Converter", path: "/color-space-converter" },
  { icon: Sparkles, label: "2026 Trends Hub", path: "/trends" },
  { icon: Sparkles, label: "Cloud Dancer 2026", path: "/trends/cloud-dancer-2026" },
  { icon: Sparkles, label: "Mermaidcore 2026", path: "/trends/mermaidcore-2026" },
  { icon: Sparkles, label: "Thermal Glow 2026", path: "/trends/thermal-glow-2026" },
];

const resourceItems = [
  { icon: FileText, label: "UI Designer Palettes", path: "/palettes/ui-designer" },
  { icon: FileText, label: "Developer Palettes", path: "/palettes/frontend-developer" },
  { icon: GitCompare, label: "HEX vs RGB vs HSL", path: "/compare/hex-vs-rgb-vs-hsl" },
  { icon: BookOpen, label: "Color Theory Guide", path: "/glossary/color-theory" },
];

const userItems = [
  { icon: Heart, label: "My Favorites", path: "/favorites" },
  { icon: Trophy, label: "Leaderboard", path: "/leaderboard" },
  { icon: User, label: "Profile", path: "/profile" },
];

const tierIcons: Record<SubscriptionTier, React.ReactNode> = {
  free: <Sparkles className="w-4 h-4" />,
  silver: <Star className="w-4 h-4" />,
  gold: <Crown className="w-4 h-4" />,
  diamond: <Gem className="w-4 h-4" />,
};

const tierGradients: Record<SubscriptionTier, string> = {
  free: "from-gray-400 to-gray-600",
  silver: "from-slate-300 via-gray-400 to-slate-500",
  gold: "from-yellow-400 via-amber-500 to-yellow-600",
  diamond: "from-cyan-300 via-blue-400 to-purple-500",
};

export function Sidebar() {
  const location = useLocation();
  const { user, signOut } = useAuth();
  const { tier } = useSubscription();
  const { isOpen, close } = useSidebar();
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);

  const handleLinkClick = () => {
    if (window.innerWidth < 1024) {
      close();
    }
  };

  const handleAdvancedToolClick = (_e: React.MouseEvent, _path: string) => {
    handleLinkClick();
  };

  

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300"
          onClick={close}
        />
      )}

      <aside 
        className={cn(
          "fixed left-0 top-0 z-50 h-screen w-64 bg-sidebar border-r border-sidebar-border",
          "transform transition-transform duration-300 ease-in-out will-change-transform",
          isOpen ? "translate-x-0" : "-translate-x-full",
          tier !== 'free' && `theme-${tier}`
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo & Close Button */}
          <div className="flex items-center justify-between px-4 py-4 lg:px-6 lg:py-6">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center shadow-glow-sm",
                  tier !== 'free' ? `bg-gradient-to-br ${tierGradients[tier]}` : "gradient-primary",
                  tier === 'diamond' && "animate-diamond-sparkle"
                )}>
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-xl font-display font-bold text-sidebar-foreground">
                  Colour Pine
                </h1>
                <p className="text-xs text-muted-foreground">Design with Colors</p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="lg:hidden hover:bg-sidebar-accent"
              onClick={close}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* All Tools Free Badge */}
          <div className="mx-4 mb-4">
            <div className="flex items-center justify-center gap-2 py-2 px-4 rounded-xl text-white text-sm font-medium bg-gradient-to-r from-emerald-500 to-teal-600">
              <Zap className="w-4 h-4" />
              <span>All Tools Free ✨</span>
            </div>
          </div>

          {/* Main Navigation - Scrollable */}
          <nav className="flex-1 px-3 py-2 lg:px-4 lg:py-4 overflow-y-auto overscroll-contain">
            <div className="space-y-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={handleLinkClick}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 lg:px-4 lg:py-3 rounded-xl text-sm font-medium transition-all duration-200",
                      isActive
                        ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-glow-sm"
                        : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground active:scale-[0.98]"
                    )}
                  >
                    <item.icon className="w-5 h-5 flex-shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* Advanced Tools Section */}
            <div className="mt-6">
              <p className="px-3 lg:px-4 mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                Advanced Tools
              </p>
              <div className="space-y-1">
                {advancedTools.map((item) => {
                  const isActive = location.pathname === item.path;
                  
                  return (
                    <Link
                      key={item.path + item.label}
                      to={item.path}
                      onClick={(e) => handleAdvancedToolClick(e, item.path)}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 lg:px-4 rounded-xl text-sm font-medium transition-all duration-200 relative",
                        isActive
                          ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-glow-sm"
                          : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground active:scale-[0.98]"
                      )}
                    >
                      <item.icon className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate">{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Resources Section */}
            <div className="mt-6">
              <p className="px-3 lg:px-4 mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                <BookOpen className="w-3 h-3" /> Resources
              </p>
              <div className="space-y-1">
                {resourceItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={handleLinkClick}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 lg:px-4 rounded-xl text-sm font-medium transition-all duration-200",
                        isActive
                          ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-glow-sm"
                          : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground active:scale-[0.98]"
                      )}
                    >
                      <item.icon className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate">{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* User Section */}
            {user && (
              <div className="mt-6">
                <p className="px-3 lg:px-4 mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  My Space
                </p>
                <div className="space-y-1">
                  {userItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={handleLinkClick}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2.5 lg:px-4 lg:py-3 rounded-xl text-sm font-medium transition-all duration-200",
                          isActive
                            ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-glow-sm"
                            : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground active:scale-[0.98]"
                        )}
                      >
                        <item.icon className="w-5 h-5 flex-shrink-0" />
                        <span className="truncate">{item.label}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Free Badge */}
          </nav>

          {/* User Actions */}
          <div className="p-3 lg:p-4 border-t border-sidebar-border">
            {user ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3 px-3 lg:px-4 py-2">
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                    tier !== 'free' ? `bg-gradient-to-br ${tierGradients[tier]}` : "gradient-primary"
                  )}>
                    <span className="text-xs font-bold text-white">
                      {user.email?.[0].toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-sidebar-foreground truncate">
                      {user.email?.split("@")[0]}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {user.email}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
                  onClick={signOut}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <Link to="/auth" onClick={handleLinkClick}>
                <Button className="w-full gradient-primary text-white hover:opacity-90">
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </div>
      </aside>

      {/* Subscription Modal */}
      <SubscriptionModal 
        open={showSubscriptionModal} 
        onOpenChange={setShowSubscriptionModal} 
      />
    </>
  );
}

// Mobile header with menu toggle
export function MobileHeader() {
  const { toggle, isOpen } = useSidebar();

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-30 h-14 bg-background/95 backdrop-blur-sm border-b border-border",
      "flex items-center justify-between px-4 lg:hidden transition-all duration-300",
      isOpen && "opacity-0 pointer-events-none"
    )}>
      <div className="flex items-center">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={toggle}
          className="hover:bg-accent"
        >
          <Menu className="w-5 h-5" />
        </Button>
        <div className="flex items-center gap-2 ml-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center gradient-primary">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="font-display font-bold text-foreground">Colour Pine</span>
        </div>
      </div>

      <Badge className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-0">
        <Zap className="w-3 h-3" />
        <span className="ml-1">Free</span>
      </Badge>
    </header>
  );
}

// Desktop toggle button (floating)
export function DesktopSidebarToggle() {
  const { toggle, isOpen } = useSidebar();
  
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggle}
      className={cn(
        "fixed z-50 hidden lg:flex items-center justify-center",
        "w-8 h-8 rounded-full bg-background shadow-lg border-border",
        "hover:bg-accent transition-all duration-300",
        isOpen ? "left-[252px] top-6" : "left-4 top-6"
      )}
    >
      {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
    </Button>
  );
}
