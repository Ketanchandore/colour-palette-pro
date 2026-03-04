import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Palette, TrendingUp, Users, ArrowRight } from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";
import { HeroSection } from "@/components/dashboard/HeroSection";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { ColorOfTheDay } from "@/components/dashboard/ColorOfTheDay";
import { PaletteCard } from "@/components/palette/PaletteCard";
import { Button } from "@/components/ui/button";
import { InternalLinks } from "@/components/seo/InternalLinks";
import SEOHead from "@/components/seo/SEOHead";
import { supabase } from "@/integrations/supabase/client";

interface PaletteData {
  id: string;
  name: string;
  colors: string[];
  likes_count: number;
}

// Static fallback palettes so Google always sees content
const FALLBACK_PALETTES: PaletteData[] = [
  { id: "fb-1", name: "Ocean Breeze", colors: ["#0EA5E9", "#38BDF8", "#7DD3FC", "#BAE6FD", "#F0F9FF"], likes_count: 4821 },
  { id: "fb-2", name: "Sunset Glow", colors: ["#F97316", "#FB923C", "#FDBA74", "#FED7AA", "#FFF7ED"], likes_count: 3945 },
  { id: "fb-3", name: "Forest Canopy", colors: ["#16A34A", "#22C55E", "#4ADE80", "#86EFAC", "#F0FDF4"], likes_count: 3672 },
  { id: "fb-4", name: "Midnight Aurora", colors: ["#7C3AED", "#8B5CF6", "#A78BFA", "#C4B5FD", "#EDE9FE"], likes_count: 5234 },
  { id: "fb-5", name: "Rose Garden", colors: ["#E11D48", "#F43F5E", "#FB7185", "#FDA4AF", "#FFF1F2"], likes_count: 2987 },
  { id: "fb-6", name: "Arctic Frost", colors: ["#0891B2", "#06B6D4", "#22D3EE", "#67E8F9", "#ECFEFF"], likes_count: 3156 },
];

const homepageLinks = [
  { label: "Color Palette Generator", path: "/generator", description: "Generate AI-powered harmonious color palettes" },
  { label: "2026 Color Trends", path: "/trends", description: "Explore trending colors and palettes for 2026" },
  { label: "Contrast Checker", path: "/contrast-checker", description: "WCAG 2.1 AA/AAA contrast ratio validation" },
  { label: "Color Explorer", path: "/color-explorer", description: "Browse and search 50,000+ colors" },
  { label: "Frontend Developer Palettes", path: "/palettes/frontend-developer", description: "Production-ready CSS tokens and React themes" },
  { label: "HEX vs RGB vs HSL", path: "/compare/hex-vs-rgb-vs-hsl", description: "Complete color format comparison guide" },
];

export default function Index() {
  const [featuredPalettes, setFeaturedPalettes] = useState<PaletteData[]>(FALLBACK_PALETTES);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPalettes() {
      try {
        const { data, error } = await supabase
          .from("palettes")
          .select("*")
          .eq("is_featured", true)
          .order("likes_count", { ascending: false })
          .limit(6);

        if (!error && data && data.length > 0) {
          setFeaturedPalettes(
            data.map((p) => ({
              id: p.id,
              name: p.name,
              colors: p.colors as string[],
              likes_count: p.likes_count,
            }))
          );
        }
        // If error or no data, fallback palettes remain
      } catch {
        // Network error — fallback palettes already set
      }
      setLoading(false);
    }
    fetchPalettes();
  }, []);

  return (
    <MainLayout>
      <SEOHead
        title="Colour Pine — AI Color Palette Generator & Design Tool 2026"
        description="World's most advanced color palette generator with AI-powered brand analysis, WCAG accessibility checker, 50,000+ colors, and 2026 trend palettes. Free for designers & developers."
        keywords="color palette generator, ai color palette, wcag contrast checker, brand colors, 2026 color trends, design system colors, tailwind color palette"
        canonicalUrl="https://colourpine.com/"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Colour Pine",
          url: "https://colourpine.com",
          description: "AI-powered color palette generator with WCAG accessibility tools, brand analysis, and 2026 trend palettes.",
          applicationCategory: "DesignApplication",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }}
      />
      <div className="p-6 lg:p-8 space-y-8">
        {/* Hero Section */}
        <HeroSection />

        {/* Color of the Day */}
        <ColorOfTheDay />

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

        {/* Internal Links */}
        <InternalLinks links={homepageLinks} title="Explore Colour Pine Tools & Resources" />
      </div>
    </MainLayout>
  );
}
