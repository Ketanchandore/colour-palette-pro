import { useEffect, useState } from "react";
import { TrendingUp, Flame, Clock, Filter } from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";
import { PaletteCard } from "@/components/palette/PaletteCard";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Palette {
  id: string;
  name: string;
  colors: string[];
  likes_count: number;
  category: string | null;
}

type SortOption = "likes" | "recent";
type CategoryFilter = "all" | "Nature" | "Mood" | "Style";

export default function Trending() {
  const { user } = useAuth();
  const [palettes, setPalettes] = useState<Palette[]>([]);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<SortOption>("likes");
  const [category, setCategory] = useState<CategoryFilter>("all");

  useEffect(() => {
    fetchPalettes();
  }, [sortBy, category]);

  useEffect(() => {
    if (user) {
      fetchFavorites();
    }
  }, [user]);

  async function fetchPalettes() {
    setLoading(true);
    let query = supabase
      .from("palettes")
      .select("*");

    if (category !== "all") {
      query = query.eq("category", category);
    }

    if (sortBy === "likes") {
      query = query.order("likes_count", { ascending: false });
    } else {
      query = query.order("created_at", { ascending: false });
    }

    const { data, error } = await query.limit(24);

    if (!error && data) {
      setPalettes(
        data.map((p) => ({
          id: p.id,
          name: p.name,
          colors: p.colors as string[],
          likes_count: p.likes_count,
          category: p.category,
        }))
      );
    }
    setLoading(false);
  }

  async function fetchFavorites() {
    if (!user) return;
    
    const { data } = await supabase
      .from("user_favorites")
      .select("palette_id")
      .eq("user_id", user.id);

    if (data) {
      setFavorites(new Set(data.map((f) => f.palette_id)));
    }
  }

  async function toggleFavorite(paletteId: string) {
    if (!user) {
      toast.error("Please sign in to save favorites");
      return;
    }

    const isFavorite = favorites.has(paletteId);

    if (isFavorite) {
      const { error } = await supabase
        .from("user_favorites")
        .delete()
        .eq("user_id", user.id)
        .eq("palette_id", paletteId);

      if (!error) {
        setFavorites((prev) => {
          const newSet = new Set(prev);
          newSet.delete(paletteId);
          return newSet;
        });
        toast.success("Removed from favorites");
      }
    } else {
      const { error } = await supabase
        .from("user_favorites")
        .insert({ user_id: user.id, palette_id: paletteId });

      if (!error) {
        setFavorites((prev) => new Set([...prev, paletteId]));
        toast.success("Added to favorites");
      }
    }
  }

  return (
    <MainLayout>
      <div className="p-6 lg:p-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-3xl font-display font-bold text-foreground">
                Trending Palettes
              </h1>
            </div>
            <p className="text-muted-foreground">
              Discover the most popular color combinations
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Select
              value={category}
              onValueChange={(value) => setCategory(value as CategoryFilter)}
            >
              <SelectTrigger className="w-36">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Nature">Nature</SelectItem>
                <SelectItem value="Mood">Mood</SelectItem>
                <SelectItem value="Style">Style</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex rounded-lg border border-border overflow-hidden">
              <Button
                variant={sortBy === "likes" ? "default" : "ghost"}
                size="sm"
                onClick={() => setSortBy("likes")}
                className={sortBy === "likes" ? "gradient-primary text-white" : ""}
              >
                <Flame className="w-4 h-4 mr-1" />
                Popular
              </Button>
              <Button
                variant={sortBy === "recent" ? "default" : "ghost"}
                size="sm"
                onClick={() => setSortBy("recent")}
                className={sortBy === "recent" ? "gradient-primary text-white" : ""}
              >
                <Clock className="w-4 h-4 mr-1" />
                Recent
              </Button>
            </div>
          </div>
        </div>

        {/* Palettes Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="h-48 rounded-2xl bg-muted animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {palettes.map((palette, index) => (
              <PaletteCard
                key={palette.id}
                id={palette.id}
                name={palette.name}
                colors={palette.colors}
                likes={palette.likes_count}
                isFavorite={favorites.has(palette.id)}
                onFavoriteToggle={toggleFavorite}
                className="animate-fade-in-up opacity-0"
                style={{ animationDelay: `${index * 50}ms`, animationFillMode: "forwards" } as React.CSSProperties}
              />
            ))}
          </div>
        )}

        {!loading && palettes.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No palettes found</p>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
