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
  Eye
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";

const navItems = [
  { icon: Home, label: "Dashboard", path: "/" },
  { icon: Palette, label: "Generator", path: "/generator" },
  { icon: TrendingUp, label: "Trending", path: "/trending" },
  { icon: FolderOpen, label: "Collections", path: "/collections" },
  { icon: Wrench, label: "Color Tools", path: "/tools" },
  { icon: ImageIcon, label: "Image Extractor", path: "/image-extractor" },
  { icon: Wand2, label: "AI Suggestions", path: "/ai-suggestions" },
  { icon: Building2, label: "Brand Colors", path: "/brand-colors" },
  { icon: Eye, label: "Blindness Simulator", path: "/blindness-simulator" },
];

const userItems = [
  { icon: Heart, label: "My Favorites", path: "/favorites" },
  { icon: User, label: "Profile", path: "/profile" },
];

export function Sidebar() {
  const location = useLocation();
  const { user, signOut } = useAuth();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-sidebar border-r border-sidebar-border">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-6">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-glow-sm">
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

        {/* Main Navigation - Scrollable */}
        <nav className="flex-1 px-4 py-4 overflow-y-auto">
          <div className="space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-glow-sm"
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* User Section */}
          {user && (
            <div className="mt-8">
              <p className="px-4 mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                My Space
              </p>
              <div className="space-y-1">
                {userItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                        isActive
                          ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-glow-sm"
                          : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                      )}
                    >
                      <item.icon className="w-5 h-5" />
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </nav>

        {/* User Actions */}
        <div className="p-4 border-t border-sidebar-border">
          {user ? (
            <div className="space-y-3">
              <div className="flex items-center gap-3 px-4 py-2">
                <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center">
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
            <Link to="/auth">
              <Button className="w-full gradient-primary text-white hover:opacity-90">
                <LogIn className="w-4 h-4 mr-2" />
                Sign In
              </Button>
            </Link>
          )}
        </div>
      </div>
    </aside>
  );
}
