import { useState, useEffect } from "react";
import { FolderOpen, Leaf, Sun, Sparkles, Moon, Heart, Zap, Palette as PaletteIcon } from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";
import { PaletteCard } from "@/components/palette/PaletteCard";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

interface Collection {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  gradient: string;
  filter: { category?: string; tags?: string[] };
}

const collections: Collection[] = [
  {
    id: "nature",
    name: "Nature",
    icon: <Leaf className="w-6 h-6" />,
    description: "Colors inspired by the natural world",
    gradient: "from-green-500 to-emerald-600",
    filter: { category: "Nature" },
  },
  {
    id: "sunset",
    name: "Sunset Vibes",
    icon: <Sun className="w-6 h-6" />,
    description: "Warm, golden hour palettes",
    gradient: "from-orange-500 to-rose-600",
    filter: { tags: ["warm", "sunset"] },
  },
  {
    id: "minimalist",
    name: "Minimalist",
    icon: <Sparkles className="w-6 h-6" />,
    description: "Clean and simple color schemes",
    gradient: "from-gray-500 to-slate-700",
    filter: { tags: ["minimal"] },
  },
  {
    id: "dark-mode",
    name: "Dark Mode",
    icon: <Moon className="w-6 h-6" />,
    description: "Perfect for dark themed interfaces",
    gradient: "from-purple-600 to-indigo-900",
    filter: { tags: ["dark"] },
  },
  {
    id: "pastel",
    name: "Pastel Dreams",
    icon: <Heart className="w-6 h-6" />,
    description: "Soft and gentle color combinations",
    gradient: "from-pink-400 to-purple-400",
    filter: { tags: ["pastel"] },
  },
  {
    id: "vibrant",
    name: "Vibrant Energy",
    icon: <Zap className="w-6 h-6" />,
    description: "Bold and energetic palettes",
    gradient: "from-yellow-500 to-red-500",
    filter: { tags: ["vibrant", "bright"] },
  },
];

interface Palette {
  id: string;
  name: string;
  colors: string[];
  likes_count: number;
}

export default function Collections() {
  const [selectedCollection, setSelectedCollection] = useState<Collection | null>(null);
  const [palettes, setPalettes] = useState<Palette[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedCollection) {
      fetchPalettes(selectedCollection);
    }
  }, [selectedCollection]);

  async function fetchPalettes(collection: Collection) {
    setLoading(true);
    let query = supabase.from("palettes").select("*");

    if (collection.filter.category) {
      query = query.eq("category", collection.filter.category);
    }

    if (collection.filter.tags && collection.filter.tags.length > 0) {
      query = query.overlaps("tags", collection.filter.tags);
    }

    const { data, error } = await query.order("likes_count", { ascending: false }).limit(12);

    if (!error && data) {
      setPalettes(
        data.map((p) => ({
          id: p.id,
          name: p.name,
          colors: p.colors as string[],
          likes_count: p.likes_count,
        }))
      );
    }
    setLoading(false);
  }

  return (
    <MainLayout>
      <div className="p-6 lg:p-8 space-y-8">
        {/* Header */}
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl gradient-card-teal flex items-center justify-center">
              <FolderOpen className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-3xl font-display font-bold text-foreground">
              Collections
            </h1>
          </div>
          <p className="text-muted-foreground">
            Curated color palettes organized by theme and style
          </p>
        </div>

        {/* Collection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.map((collection, index) => (
            <button
              key={collection.id}
              onClick={() => setSelectedCollection(collection)}
              className={cn(
                "relative overflow-hidden rounded-2xl p-6 text-left transition-all duration-300",
                "hover:shadow-glow-md hover:-translate-y-1",
                "animate-fade-in-up opacity-0",
                selectedCollection?.id === collection.id
                  ? "ring-2 ring-primary"
                  : "hover:ring-2 hover:ring-primary/50"
              )}
              style={{ animationDelay: `${index * 100}ms`, animationFillMode: "forwards" }}
            >
              <div className={cn("absolute inset-0 bg-gradient-to-br", collection.gradient)} />
              <div className="absolute inset-0 bg-black/20" />
              
              <div className="relative z-10 text-white">
                <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4">
                  {collection.icon}
                </div>
                <h3 className="text-xl font-display font-bold mb-1">
                  {collection.name}
                </h3>
                <p className="text-sm text-white/80">{collection.description}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Selected Collection Palettes */}
        {selectedCollection && (
          <div className="space-y-6 animate-fade-in-up">
            <div className="flex items-center gap-3">
              <PaletteIcon className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-display font-bold text-foreground">
                {selectedCollection.name} Palettes
              </h2>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="h-48 rounded-2xl bg-muted animate-pulse" />
                ))}
              </div>
            ) : palettes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {palettes.map((palette) => (
                  <PaletteCard
                    key={palette.id}
                    id={palette.id}
                    name={palette.name}
                    colors={palette.colors}
                    likes={palette.likes_count}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-muted/50 rounded-2xl">
                <p className="text-muted-foreground">
                  No palettes found in this collection yet
                </p>
              </div>
            )}
          </div>
        )}

        {/* Prompt to select collection */}
        {!selectedCollection && (
          <div className="text-center py-12 bg-muted/50 rounded-2xl">
            <FolderOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              Select a collection to view its palettes
            </p>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
