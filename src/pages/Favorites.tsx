import { useEffect, useState } from "react";
import { Heart, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { PaletteCard } from "@/components/palette/PaletteCard";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

interface Palette {
  id: string;
  name: string;
  colors: string[];
  likes_count: number;
}

export default function Favorites() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState<Palette[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      fetchFavorites();
    }
  }, [user]);

  async function fetchFavorites() {
    if (!user) return;

    setLoading(true);
    const { data, error } = await supabase
      .from("user_favorites")
      .select(`
        palette_id,
        palettes (
          id,
          name,
          colors,
          likes_count
        )
      `)
      .eq("user_id", user.id);

    if (!error && data) {
      const palettes = data
        .map((f: any) => f.palettes)
        .filter(Boolean)
        .map((p: any) => ({
          id: p.id,
          name: p.name,
          colors: p.colors as string[],
          likes_count: p.likes_count,
        }));
      setFavorites(palettes);
    }
    setLoading(false);
  }

  async function removeFavorite(paletteId: string) {
    if (!user) return;

    const { error } = await supabase
      .from("user_favorites")
      .delete()
      .eq("user_id", user.id)
      .eq("palette_id", paletteId);

    if (!error) {
      setFavorites((prev) => prev.filter((p) => p.id !== paletteId));
      toast.success("Removed from favorites");
    }
  }

  if (authLoading) {
    return (
      <MainLayout>
        <div className="p-6 lg:p-8 flex items-center justify-center min-h-[60vh]">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="p-6 lg:p-8 space-y-8">
        {/* Header */}
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-3xl font-display font-bold text-foreground">
              My Favorites
            </h1>
          </div>
          <p className="text-muted-foreground">
            Your saved color palettes collection
          </p>
        </div>

        {/* Favorites Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-48 rounded-2xl bg-muted animate-pulse" />
            ))}
          </div>
        ) : favorites.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favorites.map((palette, index) => (
              <PaletteCard
                key={palette.id}
                id={palette.id}
                name={palette.name}
                colors={palette.colors}
                likes={palette.likes_count}
                isFavorite={true}
                onFavoriteToggle={removeFavorite}
                className="animate-fade-in-up opacity-0"
                style={{ animationDelay: `${index * 50}ms`, animationFillMode: "forwards" } as React.CSSProperties}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-muted/50 rounded-2xl">
            <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-display font-bold text-foreground mb-2">
              No favorites yet
            </h3>
            <p className="text-muted-foreground mb-6">
              Start exploring and save your favorite palettes
            </p>
            <Link to="/trending">
              <Button className="gradient-primary text-white hover:opacity-90">
                Browse Trending
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
