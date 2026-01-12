import { useState, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { 
  Copy, 
  Check, 
  Search, 
  Heart, 
  Share2, 
  ArrowLeft,
  Palette,
  Code,
  Eye,
  Lock,
  Sparkles,
  Grid3X3,
  Lightbulb,
  Target,
  Layers
} from "lucide-react";
import { useSubscription } from "@/hooks/useSubscription";
import { LockedFeatureOverlay } from "@/components/subscription/LockedFeatureOverlay";
import { PinterestButton } from "@/components/social/PinterestButton";
import {
  getColorInfo,
  generateAllColorPages,
  namedColors,
  hexToRgb,
  rgbToHsl,
  hslToHex,
  getComplementary,
  getAnalogous,
  getTriadic,
  getSplitComplementary,
  ColorInfo
} from "@/lib/colorData";

// CMYK conversion
const rgbToCmyk = (r: number, g: number, b: number) => {
  const rNorm = r / 255, gNorm = g / 255, bNorm = b / 255;
  const k = 1 - Math.max(rNorm, gNorm, bNorm);
  if (k === 1) return { c: 0, m: 0, y: 0, k: 100 };
  return {
    c: Math.round((1 - rNorm - k) / (1 - k) * 100),
    m: Math.round((1 - gNorm - k) / (1 - k) * 100),
    y: Math.round((1 - bNorm - k) / (1 - k) * 100),
    k: Math.round(k * 100)
  };
};

// Get popular colors from named colors database
const getPopularColors = () => {
  const popular = [
    'FF5733', '3498DB', '2ECC71', '9B59B6', 'F1C40F', 
    'E91E63', '00BCD4', 'FF9800', '607D8B', '8BC34A',
    'FFFFFF', '000000', 'A05AFF', '1BCFB4', 'F5F5F5',
    '0D9488', 'FF6B6B', '3A86FF', 'D946EF', '14B8A6'
  ];
  
  return popular.map(hex => {
    const info = getColorInfo(hex);
    return { hex: `#${hex}`, name: info.name };
  });
};

// Get trending 2026 colors
const getTrending2026Colors = () => {
  const trending = [
    'F5F5F5', // Cloud Dancer - Pantone 2026
    '0D9488', // Transformative Teal - WGSN 2026
    '14B8A6', // Jelly Mint
    '5EEAD5', // Mermaidcore Aqua
    'A78BFB', // Pearlescent Purple
    'EF4445', // Thermal Red
    'C4B5FD', // Digital Lavender
    'FF5733', // Tangerine Disco
    '5D4037', // Walnut Retro
    'D8A7B1', // Grown-up Pink
    '7DD3FC', // Holographic Blue
    'FCA5A5', // Frosted Coral
  ];
  
  return trending.map(hex => {
    const info = getColorInfo(hex);
    return { hex: `#${hex}`, name: info.name, category: info.category };
  });
};

// Get colors by category
const getColorsByCategory = (category: string, limit: number = 12) => {
  const colors = Object.entries(namedColors)
    .filter(([_, data]) => data.category === category)
    .slice(0, limit)
    .map(([hex, data]) => ({
      hex: `#${hex}`,
      name: data.name,
      psychology: data.psychology
    }));
  return colors;
};

// Get all categories
const getAllCategories = () => {
  const categories = new Set<string>();
  Object.values(namedColors).forEach(data => categories.add(data.category));
  return Array.from(categories);
};

export default function ColorExplorer() {
  const { hex } = useParams<{ hex: string }>();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedValue, setCopiedValue] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { canUseAdvancedTools } = useSubscription();

  const color = hex ? `#${hex.toUpperCase()}` : null;
  const isValidHex = color ? /^#[0-9A-F]{6}$/i.test(color) : false;

  // Get comprehensive color info from our database
  const colorInfo = useMemo(() => {
    if (!isValidHex || !color) return null;
    const info = getColorInfo(color);
    const cmyk = rgbToCmyk(info.rgb.r, info.rgb.g, info.rgb.b);
    return { ...info, cmyk };
  }, [color, isValidHex]);

  // Get colors for display
  const popularColors = useMemo(() => getPopularColors(), []);
  const trending2026 = useMemo(() => getTrending2026Colors(), []);
  const categories = useMemo(() => getAllCategories(), []);
  const categoryColors = useMemo(() => 
    selectedCategory ? getColorsByCategory(selectedCategory, 16) : [],
    [selectedCategory]
  );

  // Total colors count
  const totalColors = useMemo(() => generateAllColorPages().length, []);

  const copyToClipboard = (value: string, label: string) => {
    navigator.clipboard.writeText(value);
    setCopiedValue(value);
    toast({
      title: "Copied!",
      description: `${label} copied to clipboard`,
    });
    setTimeout(() => setCopiedValue(null), 2000);
  };

  const handleSearch = () => {
    let searchHex = searchQuery.trim();
    if (searchHex.startsWith("#")) {
      searchHex = searchHex.slice(1);
    }
    if (/^[0-9A-F]{6}$/i.test(searchHex)) {
      navigate(`/color/${searchHex.toLowerCase()}`);
    } else {
      toast({
        title: "Invalid Hex Code",
        description: "Please enter a valid 6-character hex code",
        variant: "destructive"
      });
    }
  };

  const CopyButton = ({ value, label, format }: { value: string; label: string; format: string }) => (
    <Button
      variant="outline"
      size="sm"
      onClick={() => copyToClipboard(value, label)}
      className="flex items-center gap-2 hover:bg-primary/10 transition-all"
    >
      {copiedValue === value ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
      <span className="font-mono text-sm">{format}</span>
    </Button>
  );

  if (!canUseAdvancedTools) {
    return (
      <MainLayout>
        <div className="p-4 lg:p-8 min-h-screen">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary mb-4">
                <Palette className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl lg:text-4xl font-display font-bold mb-2">
                Hex Color Explorer
              </h1>
              <p className="text-muted-foreground text-lg">
                {totalColors.toLocaleString()}+ color pages with conversions, palettes & more
              </p>
            </div>
            
            <LockedFeatureOverlay feature="Hex Color Explorer" />
          </div>
        </div>
      </MainLayout>
    );
  }

  // If viewing a specific color
  if (colorInfo && isValidHex && color) {
    return (
      <MainLayout>
        <div className="p-4 lg:p-8 min-h-screen">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
              <Button variant="ghost" size="icon" onClick={() => navigate('/color-explorer')}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-2xl lg:text-3xl font-display font-bold">{colorInfo.name}</h1>
                <p className="text-muted-foreground font-mono">{color}</p>
              </div>
            </div>

            <div className="space-y-8 animate-fade-in-up">
              {/* Main Color Card */}
              <Card className="overflow-hidden">
                <div className="grid lg:grid-cols-2">
                  {/* Color Preview */}
                  <div 
                    className="h-64 lg:h-auto lg:min-h-[400px] flex items-center justify-center relative group"
                    style={{ backgroundColor: color }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                      <Button 
                        size="lg"
                        onClick={() => copyToClipboard(color, "Hex")}
                        className="bg-white/90 text-black hover:bg-white"
                      >
                        {copiedValue === color ? <Check className="mr-2" /> : <Copy className="mr-2" />}
                        Copy {color}
                      </Button>
                    </div>
                  </div>

                  {/* Color Info */}
                  <div className="p-6 lg:p-8 space-y-6">
                    <div>
                      <Badge variant="secondary" className="mb-2">{colorInfo.category}</Badge>
                      <h2 className="text-3xl font-bold mb-2">{colorInfo.name}</h2>
                      <p className="text-xl font-mono text-primary">{color}</p>
                    </div>

                    {/* Psychology */}
                    <div className="p-4 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-2 mb-2">
                        <Lightbulb className="w-4 h-4 text-yellow-500" />
                        <span className="font-semibold text-sm">Color Psychology</span>
                      </div>
                      <p className="text-muted-foreground text-sm">{colorInfo.psychology}</p>
                    </div>

                    {/* Format Buttons */}
                    <div className="space-y-3">
                      <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">
                        Click to Copy
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        <CopyButton value={color} label="Hex" format={`HEX: ${color}`} />
                        <CopyButton 
                          value={`rgb(${colorInfo.rgb.r}, ${colorInfo.rgb.g}, ${colorInfo.rgb.b})`} 
                          label="RGB"
                          format={`RGB: ${colorInfo.rgb.r}, ${colorInfo.rgb.g}, ${colorInfo.rgb.b}`}
                        />
                        <CopyButton 
                          value={`hsl(${colorInfo.hsl.h}, ${colorInfo.hsl.s}%, ${colorInfo.hsl.l}%)`} 
                          label="HSL"
                          format={`HSL: ${colorInfo.hsl.h}°, ${colorInfo.hsl.s}%, ${colorInfo.hsl.l}%`}
                        />
                        <CopyButton 
                          value={`cmyk(${colorInfo.cmyk.c}%, ${colorInfo.cmyk.m}%, ${colorInfo.cmyk.y}%, ${colorInfo.cmyk.k}%)`} 
                          label="CMYK"
                          format={`CMYK: ${colorInfo.cmyk.c}, ${colorInfo.cmyk.m}, ${colorInfo.cmyk.y}, ${colorInfo.cmyk.k}`}
                        />
                      </div>
                    </div>

                    {/* Tailwind CSS */}
                    <div className="space-y-3">
                      <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                        <Code className="w-4 h-4" /> Tailwind CSS
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        <CopyButton 
                          value={`bg-[${color}]`} 
                          label="Tailwind BG"
                          format={`bg-[${color}]`}
                        />
                        <CopyButton 
                          value={`text-[${color}]`} 
                          label="Tailwind Text"
                          format={`text-[${color}]`}
                        />
                        <CopyButton 
                          value={`border-[${color}]`} 
                          label="Tailwind Border"
                          format={`border-[${color}]`}
                        />
                      </div>
                    </div>

                    {/* Share Buttons */}
                    <div className="flex gap-2 pt-4">
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          navigator.clipboard.writeText(window.location.href);
                          toast({ title: "Link copied!", description: "Share this color with others" });
                        }}
                      >
                        <Share2 className="w-4 h-4 mr-2" /> Share Color
                      </Button>
                      <PinterestButton 
                        imageUrl={`https://via.placeholder.com/800x600/${color.slice(1)}/${color.slice(1)}`}
                        description={`${colorInfo.name} (${color}) - ${colorInfo.psychology}`}
                        url={window.location.href}
                      />
                    </div>
                  </div>
                </div>
              </Card>

              {/* Use Cases */}
              <Card className="p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  Best Use Cases
                </h3>
                <div className="flex flex-wrap gap-2">
                  {colorInfo.useCases.map((useCase, i) => (
                    <Badge key={i} variant="outline" className="py-1 px-3">
                      {useCase}
                    </Badge>
                  ))}
                </div>
              </Card>

              {/* Color Palettes */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Complementary */}
                <Card className="p-6">
                  <h3 className="font-semibold mb-4">Complementary</h3>
                  <div className="flex gap-2">
                    <Link 
                      to={`/color/${color.slice(1)}`}
                      className="flex-1 h-16 rounded-lg transition-transform hover:scale-105"
                      style={{ backgroundColor: color }}
                    />
                    {colorInfo.complementary.map((c, i) => (
                      <Link 
                        key={i}
                        to={`/color/${c}`}
                        className="flex-1 h-16 rounded-lg transition-transform hover:scale-105"
                        style={{ backgroundColor: `#${c}` }}
                      />
                    ))}
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full mt-3"
                    onClick={() => copyToClipboard(`${color}, #${colorInfo.complementary.join(", #")}`, "Palette")}
                  >
                    <Copy className="w-3 h-3 mr-2" /> Copy Palette
                  </Button>
                </Card>

                {/* Triadic */}
                <Card className="p-6">
                  <h3 className="font-semibold mb-4">Triadic</h3>
                  <div className="flex gap-2">
                    <Link 
                      to={`/color/${color.slice(1)}`}
                      className="flex-1 h-16 rounded-lg transition-transform hover:scale-105"
                      style={{ backgroundColor: color }}
                    />
                    {colorInfo.triadic.map((c, i) => (
                      <Link 
                        key={i}
                        to={`/color/${c}`}
                        className="flex-1 h-16 rounded-lg transition-transform hover:scale-105"
                        style={{ backgroundColor: `#${c}` }}
                      />
                    ))}
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full mt-3"
                    onClick={() => copyToClipboard(`${color}, #${colorInfo.triadic.join(", #")}`, "Palette")}
                  >
                    <Copy className="w-3 h-3 mr-2" /> Copy Palette
                  </Button>
                </Card>

                {/* Analogous */}
                <Card className="p-6">
                  <h3 className="font-semibold mb-4">Analogous</h3>
                  <div className="flex gap-2">
                    {colorInfo.analogous.map((c, i) => (
                      <Link 
                        key={i}
                        to={`/color/${c}`}
                        className="flex-1 h-16 rounded-lg transition-transform hover:scale-105"
                        style={{ backgroundColor: `#${c}` }}
                      />
                    ))}
                    <Link 
                      to={`/color/${color.slice(1)}`}
                      className="flex-1 h-16 rounded-lg transition-transform hover:scale-105"
                      style={{ backgroundColor: color }}
                    />
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full mt-3"
                    onClick={() => copyToClipboard(`#${colorInfo.analogous.join(", #")}, ${color}`, "Palette")}
                  >
                    <Copy className="w-3 h-3 mr-2" /> Copy Palette
                  </Button>
                </Card>

                {/* Split Complementary */}
                <Card className="p-6">
                  <h3 className="font-semibold mb-4">Split Complementary</h3>
                  <div className="flex gap-2">
                    <Link 
                      to={`/color/${color.slice(1)}`}
                      className="flex-1 h-16 rounded-lg transition-transform hover:scale-105"
                      style={{ backgroundColor: color }}
                    />
                    {getSplitComplementary(color).map((c, i) => (
                      <Link 
                        key={i}
                        to={`/color/${c}`}
                        className="flex-1 h-16 rounded-lg transition-transform hover:scale-105"
                        style={{ backgroundColor: `#${c}` }}
                      />
                    ))}
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full mt-3"
                    onClick={() => copyToClipboard(`${color}, #${getSplitComplementary(color).join(", #")}`, "Palette")}
                  >
                    <Copy className="w-3 h-3 mr-2" /> Copy Palette
                  </Button>
                </Card>
              </div>

              {/* SEO Content */}
              <Card className="p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  About {colorInfo.name} ({color})
                </h3>
                <div className="prose prose-sm max-w-none text-muted-foreground space-y-4">
                  <p>
                    <strong>{colorInfo.name}</strong> ({color}) is a {colorInfo.category} color with RGB values of 
                    R: {colorInfo.rgb.r}, G: {colorInfo.rgb.g}, B: {colorInfo.rgb.b}. In the HSL color space, 
                    it has a hue of {colorInfo.hsl.h}°, saturation of {colorInfo.hsl.s}%, and lightness of {colorInfo.hsl.l}%.
                  </p>
                  <p>
                    <strong>Psychology:</strong> {colorInfo.psychology}. This makes it ideal for {colorInfo.useCases.slice(0, 3).join(", ")} and more.
                  </p>
                  <p>
                    For high contrast designs, pair this color with its complementary shade #{colorInfo.complementary[0]}. 
                    For a harmonious look, use the analogous colors #{colorInfo.analogous.join(" and #")}.
                  </p>
                </div>
              </Card>

              {/* Related Colors */}
              <div>
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Layers className="w-5 h-5" />
                  Related {colorInfo.category} Colors
                </h2>
                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
                  {getColorsByCategory(colorInfo.category, 16).map((c) => (
                    <Link
                      key={c.hex}
                      to={`/color/${c.hex.slice(1)}`}
                      className="group"
                    >
                      <div 
                        className="aspect-square rounded-lg transition-all group-hover:scale-105 group-hover:shadow-lg"
                        style={{ backgroundColor: c.hex }}
                      />
                      <p className="text-center text-xs mt-1 font-medium truncate">{c.name}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  // Main explorer page (no specific color selected)
  return (
    <MainLayout>
      <div className="p-4 lg:p-8 min-h-screen">
        <div className="max-w-6xl mx-auto">
          {/* Header & Search */}
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary mb-4">
              <Palette className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl lg:text-4xl font-display font-bold mb-2">Color Explorer</h1>
            <p className="text-muted-foreground text-lg mb-6">
              {totalColors.toLocaleString()}+ colors with instant conversions
            </p>

            {/* Search Bar */}
            <div className="flex gap-2 max-w-md mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Enter hex code (e.g., FF5733)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  className="pl-10"
                />
              </div>
              <Button onClick={handleSearch} className="gradient-primary text-white">
                Search
              </Button>
            </div>
          </div>

          {/* 2026 Trending Colors */}
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-yellow-500" />
              <h2 className="text-xl font-semibold">2026 Trending Colors</h2>
              <Badge variant="secondary">New</Badge>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
              {trending2026.map((c) => (
                <Link
                  key={c.hex}
                  to={`/color/${c.hex.slice(1)}`}
                  className="group"
                >
                  <div 
                    className="aspect-square rounded-xl transition-all group-hover:scale-105 group-hover:shadow-lg relative overflow-hidden"
                    style={{ backgroundColor: c.hex }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-center text-sm mt-2 font-medium truncate">{c.name}</p>
                  <p className="text-center text-xs text-muted-foreground">{c.hex}</p>
                </Link>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div className="mb-10">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Grid3X3 className="w-5 h-5" />
              Browse by Category
            </h2>
            <div className="flex flex-wrap gap-2 mb-6">
              {categories.map((cat) => (
                <Button
                  key={cat}
                  variant={selectedCategory === cat ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                  className="capitalize"
                >
                  {cat}
                </Button>
              ))}
            </div>
            
            {selectedCategory && categoryColors.length > 0 && (
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3 animate-fade-in">
                {categoryColors.map((c) => (
                  <Link
                    key={c.hex}
                    to={`/color/${c.hex.slice(1)}`}
                    className="group"
                  >
                    <div 
                      className="aspect-square rounded-lg transition-all group-hover:scale-105 group-hover:shadow-lg"
                      style={{ backgroundColor: c.hex }}
                    />
                    <p className="text-center text-xs mt-1 font-medium truncate">{c.name}</p>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Popular Colors */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Popular Colors</h2>
            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-10 gap-4">
              {popularColors.map((c) => (
                <Link
                  key={c.hex}
                  to={`/color/${c.hex.slice(1)}`}
                  className="group"
                >
                  <div 
                    className="aspect-square rounded-xl transition-all group-hover:scale-105 group-hover:shadow-lg border border-border/50"
                    style={{ backgroundColor: c.hex }}
                  />
                  <p className="text-center text-xs mt-2 font-medium truncate">{c.name}</p>
                  <p className="text-center text-xs text-muted-foreground">{c.hex}</p>
                </Link>
              ))}
            </div>
          </div>

          {/* Stats Card */}
          <Card className="mt-10 p-6 bg-gradient-to-r from-primary/10 to-secondary/10">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-2">{totalColors.toLocaleString()}+ Color Pages</h3>
              <p className="text-muted-foreground">
                Each color page includes HEX, RGB, HSL, CMYK conversions, Tailwind CSS classes, 
                color psychology, use cases, and 4 different palette harmonies.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
