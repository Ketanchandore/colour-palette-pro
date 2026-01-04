import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Palette, TrendingUp, Users, ArrowRight } from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";
import { HeroSection } from "@/components/dashboard/HeroSection";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { ColorOfTheDay } from "@/components/dashboard/ColorOfTheDay";
import { PaletteCard } from "@/components/palette/PaletteCard";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

interface Palette {
  id: string;
  name: string;
  colors: string[];
  likes_count: number;
}

export default function Index() {
  const [featuredPalettes, setFeaturedPalettes] = useState<Palette[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPalettes() {
      const { data, error } = await supabase
        .from("palettes")
        .select("*")
        .eq("is_featured", true)
        .order("likes_count", { ascending: false })
        .limit(6);

      if (!error && data) {
        setFeaturedPalettes(
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
    fetchPalettes();
  }, []);

  return (
    <MainLayout>
      <div className="p-6 lg:p-8 space-y-8">
        {/* Hero Section */}
        <HeroSection />

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatsCard
            title="Total Palettes"
            value="12,847"
            icon={<Palette className="w-6 h-6" />}
            gradient="purple"
            delay={0}
          />
          <StatsCard
            title="Generated Today"
            value="1,234"
            icon={<TrendingUp className="w-6 h-6" />}
            gradient="teal"
            delay={100}
          />
          <StatsCard
            title="Active Users"
            value="5,678"
            icon={<Users className="w-6 h-6" />}
            gradient="coral"
            delay={200}
          />
        </div>

        {/* Color of the Day */}
        <ColorOfTheDay />

        {/* Featured Palettes */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-display font-bold text-foreground">
                Featured Palettes
              </h2>
              <p className="text-muted-foreground mt-1">
                Hand-picked color combinations for your inspiration
              </p>
            </div>
            <Link to="/trending">
              <Button variant="ghost" className="text-primary hover:text-primary/80">
                View All
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-48 rounded-2xl bg-muted animate-pulse"
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredPalettes.map((palette, index) => (
                <PaletteCard
                  key={palette.id}
                  id={palette.id}
                  name={palette.name}
                  colors={palette.colors}
                  likes={palette.likes_count}
                  className="animate-fade-in-up opacity-0"
                  style={{ animationDelay: `${index * 100}ms`, animationFillMode: "forwards" } as React.CSSProperties}
                />
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            to="/generator"
            className="group relative overflow-hidden rounded-2xl p-8 bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-glow-md"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors" />
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center mb-4 shadow-glow-sm">
                <Palette className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-display font-bold text-foreground mb-2">
                Generate Palettes
              </h3>
              <p className="text-muted-foreground">
                Create unique color combinations with our smart palette generator
              </p>
            </div>
          </Link>

          <Link
            to="/collections"
            className="group relative overflow-hidden rounded-2xl p-8 bg-card border border-border hover:border-secondary/30 transition-all duration-300 hover:shadow-glow-md"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-secondary/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-secondary/10 transition-colors" />
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl gradient-card-teal flex items-center justify-center mb-4 shadow-glow-sm">
                <TrendingUp className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-display font-bold text-foreground mb-2">
                Explore Collections
              </h3>
              <p className="text-muted-foreground">
                Browse curated collections for every mood and style
              </p>
            </div>
          </Link>
        </div>
      </div>
    </MainLayout>
  );
}
