import { useState } from "react";
import { Building2, Search, Copy, ExternalLink } from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface Brand {
  name: string;
  category: string;
  colors: { name: string; hex: string }[];
  website?: string;
}

const brands: Brand[] = [
  {
    name: "Google",
    category: "Tech",
    colors: [
      { name: "Blue", hex: "#4285F4" },
      { name: "Red", hex: "#EA4335" },
      { name: "Yellow", hex: "#FBBC05" },
      { name: "Green", hex: "#34A853" },
    ],
    website: "google.com",
  },
  {
    name: "Facebook",
    category: "Social",
    colors: [
      { name: "Blue", hex: "#1877F2" },
      { name: "Messenger", hex: "#0084FF" },
    ],
    website: "facebook.com",
  },
  {
    name: "Instagram",
    category: "Social",
    colors: [
      { name: "Purple", hex: "#833AB4" },
      { name: "Pink", hex: "#E1306C" },
      { name: "Orange", hex: "#F77737" },
      { name: "Yellow", hex: "#FCAF45" },
    ],
    website: "instagram.com",
  },
  {
    name: "Twitter/X",
    category: "Social",
    colors: [
      { name: "Black", hex: "#000000" },
      { name: "Blue (Legacy)", hex: "#1DA1F2" },
    ],
    website: "x.com",
  },
  {
    name: "Spotify",
    category: "Music",
    colors: [
      { name: "Green", hex: "#1DB954" },
      { name: "Black", hex: "#191414" },
    ],
    website: "spotify.com",
  },
  {
    name: "Netflix",
    category: "Entertainment",
    colors: [
      { name: "Red", hex: "#E50914" },
      { name: "Black", hex: "#000000" },
    ],
    website: "netflix.com",
  },
  {
    name: "Apple",
    category: "Tech",
    colors: [
      { name: "Black", hex: "#000000" },
      { name: "Gray", hex: "#86868B" },
      { name: "Silver", hex: "#A2AAAD" },
    ],
    website: "apple.com",
  },
  {
    name: "Microsoft",
    category: "Tech",
    colors: [
      { name: "Red", hex: "#F25022" },
      { name: "Green", hex: "#7FBA00" },
      { name: "Blue", hex: "#00A4EF" },
      { name: "Yellow", hex: "#FFB900" },
    ],
    website: "microsoft.com",
  },
  {
    name: "Amazon",
    category: "E-commerce",
    colors: [
      { name: "Orange", hex: "#FF9900" },
      { name: "Blue", hex: "#232F3E" },
    ],
    website: "amazon.com",
  },
  {
    name: "YouTube",
    category: "Entertainment",
    colors: [
      { name: "Red", hex: "#FF0000" },
      { name: "Black", hex: "#282828" },
    ],
    website: "youtube.com",
  },
  {
    name: "LinkedIn",
    category: "Professional",
    colors: [
      { name: "Blue", hex: "#0A66C2" },
      { name: "White", hex: "#FFFFFF" },
    ],
    website: "linkedin.com",
  },
  {
    name: "Slack",
    category: "Productivity",
    colors: [
      { name: "Purple", hex: "#4A154B" },
      { name: "Blue", hex: "#36C5F0" },
      { name: "Green", hex: "#2EB67D" },
      { name: "Yellow", hex: "#ECB22E" },
      { name: "Red", hex: "#E01E5A" },
    ],
    website: "slack.com",
  },
  {
    name: "Figma",
    category: "Design",
    colors: [
      { name: "Red", hex: "#F24E1E" },
      { name: "Orange", hex: "#FF7262" },
      { name: "Purple", hex: "#A259FF" },
      { name: "Blue", hex: "#1ABCFE" },
      { name: "Green", hex: "#0ACF83" },
    ],
    website: "figma.com",
  },
  {
    name: "Dribbble",
    category: "Design",
    colors: [
      { name: "Pink", hex: "#EA4C89" },
    ],
    website: "dribbble.com",
  },
  {
    name: "Airbnb",
    category: "Travel",
    colors: [
      { name: "Rausch", hex: "#FF5A5F" },
      { name: "Babu", hex: "#00A699" },
      { name: "Arches", hex: "#FC642D" },
      { name: "Hof", hex: "#484848" },
    ],
    website: "airbnb.com",
  },
  {
    name: "Uber",
    category: "Transport",
    colors: [
      { name: "Black", hex: "#000000" },
      { name: "White", hex: "#FFFFFF" },
    ],
    website: "uber.com",
  },
  {
    name: "TikTok",
    category: "Social",
    colors: [
      { name: "Red", hex: "#FE2C55" },
      { name: "Cyan", hex: "#25F4EE" },
      { name: "Black", hex: "#000000" },
    ],
    website: "tiktok.com",
  },
  {
    name: "Discord",
    category: "Social",
    colors: [
      { name: "Blurple", hex: "#5865F2" },
      { name: "Green", hex: "#57F287" },
      { name: "Yellow", hex: "#FEE75C" },
      { name: "Red", hex: "#ED4245" },
    ],
    website: "discord.com",
  },
  {
    name: "Stripe",
    category: "Fintech",
    colors: [
      { name: "Purple", hex: "#635BFF" },
      { name: "Cyan", hex: "#00D4FF" },
    ],
    website: "stripe.com",
  },
  {
    name: "PayPal",
    category: "Fintech",
    colors: [
      { name: "Blue", hex: "#003087" },
      { name: "Light Blue", hex: "#009CDE" },
    ],
    website: "paypal.com",
  },
  {
    name: "Shopify",
    category: "E-commerce",
    colors: [
      { name: "Green", hex: "#96BF48" },
      { name: "Dark", hex: "#5E8E3E" },
    ],
    website: "shopify.com",
  },
  {
    name: "Twitch",
    category: "Entertainment",
    colors: [
      { name: "Purple", hex: "#9146FF" },
    ],
    website: "twitch.tv",
  },
  {
    name: "Pinterest",
    category: "Social",
    colors: [
      { name: "Red", hex: "#E60023" },
    ],
    website: "pinterest.com",
  },
  {
    name: "WhatsApp",
    category: "Social",
    colors: [
      { name: "Green", hex: "#25D366" },
      { name: "Teal", hex: "#128C7E" },
    ],
    website: "whatsapp.com",
  },
];

const categories = ["All", ...new Set(brands.map((b) => b.category))];

export default function BrandColors() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredBrands = brands.filter((brand) => {
    const matchesSearch = brand.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === "All" || brand.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const copyColor = (hex: string, brandName: string) => {
    navigator.clipboard.writeText(hex);
    toast.success(`Copied ${brandName} ${hex}`);
  };

  const copyAllBrandColors = (brand: Brand) => {
    const colors = brand.colors.map((c) => c.hex).join(", ");
    navigator.clipboard.writeText(colors);
    toast.success(`Copied all ${brand.name} colors!`);
  };

  return (
    <MainLayout>
      <div className="p-6 lg:p-8 space-y-8">
        {/* Header */}
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl gradient-card-teal flex items-center justify-center">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-3xl font-display font-bold text-foreground">
              Brand Colors Library
            </h1>
          </div>
          <p className="text-muted-foreground">
            Color palettes from the world's most iconic brands
          </p>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search brands..."
              className="pl-10"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Brands Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBrands.map((brand) => (
            <div
              key={brand.name}
              className="bg-card rounded-2xl border border-border overflow-hidden group hover:border-primary/30 transition-colors"
            >
              {/* Color Bar */}
              <div className="flex h-20">
                {brand.colors.map((color, i) => (
                  <button
                    key={i}
                    className="flex-1 hover:flex-[1.5] transition-all relative"
                    style={{ backgroundColor: color.hex }}
                    onClick={() => copyColor(color.hex, brand.name)}
                    title={`${color.name}: ${color.hex}`}
                  >
                    <span className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <Copy className="w-4 h-4 text-white drop-shadow-lg" />
                    </span>
                  </button>
                ))}
              </div>

              {/* Info */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-display font-bold text-lg">{brand.name}</h3>
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                    {brand.category}
                  </span>
                </div>

                {/* Color Pills */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {brand.colors.map((color, i) => (
                    <button
                      key={i}
                      onClick={() => copyColor(color.hex, brand.name)}
                      className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-muted/50 hover:bg-muted transition-colors text-xs"
                    >
                      <div
                        className="w-3 h-3 rounded-sm"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span className="font-mono">{color.hex}</span>
                    </button>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-2 border-t border-border">
                  <button
                    onClick={() => copyAllBrandColors(brand)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    Copy All
                  </button>
                  {brand.website && (
                    <a
                      href={`https://${brand.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Website
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredBrands.length === 0 && (
          <div className="text-center py-16">
            <Building2 className="w-16 h-16 mx-auto mb-4 text-muted-foreground/30" />
            <p className="text-lg font-medium text-muted-foreground">No brands found</p>
            <p className="text-sm text-muted-foreground">Try a different search term</p>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
