import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useSidebar } from '@/hooks/useSidebar';
import { cn } from '@/lib/utils';

export const Header = () => {
  const { user } = useAuth();
  const { toggle } = useSidebar();

  return (
    <header className="fixed top-0 left-0 right-0 z-40 h-16 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto h-full flex items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-display font-bold text-foreground">Colour Pine</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link to="/colors" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Colors
          </Link>
          <Link to="/trends" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            2026 Trends
          </Link>
          <Link to="/generator" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Generator
          </Link>
          <Link to="/tools" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Tools
          </Link>
        </nav>

        <div className="flex items-center gap-3">
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
  );
};

export default Header;
