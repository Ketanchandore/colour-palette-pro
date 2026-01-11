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
  Sparkles
} from "lucide-react";
import { useSubscription } from "@/hooks/useSubscription";
import { LockedFeatureOverlay } from "@/components/subscription/LockedFeatureOverlay";

// Color conversion utilities
const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : { r: 0, g: 0, b: 0 };
};

const rgbToHsl = (r: number, g: number, b: number) => {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
};

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

// Generate complementary colors
const getComplementary = (hex: string): string => {
  const rgb = hexToRgb(hex);
  const comp = {
    r: 255 - rgb.r,
    g: 255 - rgb.g,
    b: 255 - rgb.b
  };
  return `#${comp.r.toString(16).padStart(2, '0')}${comp.g.toString(16).padStart(2, '0')}${comp.b.toString(16).padStart(2, '0')}`;
};

// Generate triadic colors
const getTriadic = (hex: string): string[] => {
  const rgb = hexToRgb(hex);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  
  const hslToHex = (h: number, s: number, l: number) => {
    s /= 100;
    l /= 100;
    const a = s * Math.min(l, 1 - l);
    const f = (n: number) => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  };
  
  return [
    hslToHex((hsl.h + 120) % 360, hsl.s, hsl.l),
    hslToHex((hsl.h + 240) % 360, hsl.s, hsl.l)
  ];
};

// Generate analogous colors
const getAnalogous = (hex: string): string[] => {
  const rgb = hexToRgb(hex);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  
  const hslToHex = (h: number, s: number, l: number) => {
    s /= 100;
    l /= 100;
    const a = s * Math.min(l, 1 - l);
    const f = (n: number) => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  };
  
  return [
    hslToHex((hsl.h + 30) % 360, hsl.s, hsl.l),
    hslToHex((hsl.h - 30 + 360) % 360, hsl.s, hsl.l)
  ];
};

// Get color name approximation
const getColorName = (hex: string): string => {
  const rgb = hexToRgb(hex);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  
  if (hsl.s < 10) {
    if (hsl.l < 15) return "Black";
    if (hsl.l < 35) return "Dark Gray";
    if (hsl.l < 65) return "Gray";
    if (hsl.l < 85) return "Light Gray";
    return "White";
  }
  
  const hueNames = [
    { min: 0, max: 15, name: "Red" },
    { min: 15, max: 45, name: "Orange" },
    { min: 45, max: 75, name: "Yellow" },
    { min: 75, max: 150, name: "Green" },
    { min: 150, max: 195, name: "Cyan" },
    { min: 195, max: 255, name: "Blue" },
    { min: 255, max: 285, name: "Purple" },
    { min: 285, max: 330, name: "Pink" },
    { min: 330, max: 360, name: "Red" }
  ];
  
  let baseName = "Color";
  for (const range of hueNames) {
    if (hsl.h >= range.min && hsl.h < range.max) {
      baseName = range.name;
      break;
    }
  }
  
  if (hsl.l < 30) return `Dark ${baseName}`;
  if (hsl.l > 70) return `Light ${baseName}`;
  if (hsl.s < 40) return `Muted ${baseName}`;
  if (hsl.s > 80) return `Vivid ${baseName}`;
  
  return baseName;
};

// Popular colors for search
const popularColors = [
  { hex: "#FF5733", name: "Tangerine" },
  { hex: "#3498DB", name: "Ocean Blue" },
  { hex: "#2ECC71", name: "Emerald" },
  { hex: "#9B59B6", name: "Amethyst" },
  { hex: "#F1C40F", name: "Sunflower" },
  { hex: "#E91E63", name: "Pink" },
  { hex: "#00BCD4", name: "Cyan" },
  { hex: "#FF9800", name: "Orange" },
  { hex: "#607D8B", name: "Blue Gray" },
  { hex: "#8BC34A", name: "Light Green" },
  { hex: "#FFFFFF", name: "White" },
  { hex: "#000000", name: "Black" },
];

export default function ColorExplorer() {
  const { hex } = useParams<{ hex: string }>();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedValue, setCopiedValue] = useState<string | null>(null);
  const { canUseAdvancedTools } = useSubscription();

  const color = hex ? `#${hex.toUpperCase()}` : "#A05AFF";
  const isValidHex = /^#[0-9A-F]{6}$/i.test(color);

  const colorData = useMemo(() => {
    if (!isValidHex) return null;
    
    const rgb = hexToRgb(color);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    const cmyk = rgbToCmyk(rgb.r, rgb.g, rgb.b);
    const complementary = getComplementary(color);
    const triadic = getTriadic(color);
    const analogous = getAnalogous(color);
    const name = getColorName(color);
    
    return { rgb, hsl, cmyk, complementary, triadic, analogous, name };
  }, [color, isValidHex]);

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
                50,000+ color pages with conversions, palettes & more
              </p>
            </div>
            
            <LockedFeatureOverlay feature="Hex Color Explorer" />
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="p-4 lg:p-8 min-h-screen">
        <div className="max-w-6xl mx-auto">
          {/* Header & Search */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-6">
              <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-2xl lg:text-3xl font-display font-bold">Color Explorer</h1>
                <p className="text-muted-foreground">50,000+ colors with instant conversions</p>
              </div>
            </div>

            {/* Search Bar */}
            <div className="flex gap-2 max-w-md">
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

          {/* Color Display */}
          {colorData && isValidHex ? (
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
                      <h2 className="text-3xl font-bold mb-2">{colorData.name}</h2>
                      <p className="text-xl font-mono text-primary">{color}</p>
                    </div>

                    {/* Format Buttons */}
                    <div className="space-y-3">
                      <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">
                        Click to Copy
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        <CopyButton value={color} label="Hex" format={`HEX: ${color}`} />
                        <CopyButton 
                          value={`rgb(${colorData.rgb.r}, ${colorData.rgb.g}, ${colorData.rgb.b})`} 
                          label="RGB"
                          format={`RGB: ${colorData.rgb.r}, ${colorData.rgb.g}, ${colorData.rgb.b}`}
                        />
                        <CopyButton 
                          value={`hsl(${colorData.hsl.h}, ${colorData.hsl.s}%, ${colorData.hsl.l}%)`} 
                          label="HSL"
                          format={`HSL: ${colorData.hsl.h}°, ${colorData.hsl.s}%, ${colorData.hsl.l}%`}
                        />
                        <CopyButton 
                          value={`cmyk(${colorData.cmyk.c}%, ${colorData.cmyk.m}%, ${colorData.cmyk.y}%, ${colorData.cmyk.k}%)`} 
                          label="CMYK"
                          format={`CMYK: ${colorData.cmyk.c}, ${colorData.cmyk.m}, ${colorData.cmyk.y}, ${colorData.cmyk.k}`}
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

                    {/* Share Button */}
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
                    </div>
                  </div>
                </div>
              </Card>

              {/* Color Palettes */}
              <div className="grid md:grid-cols-3 gap-6">
                {/* Complementary */}
                <Card className="p-6">
                  <h3 className="font-semibold mb-4">Complementary</h3>
                  <div className="flex gap-2">
                    <Link 
                      to={`/color/${color.slice(1)}`}
                      className="flex-1 h-20 rounded-lg transition-transform hover:scale-105"
                      style={{ backgroundColor: color }}
                    />
                    <Link 
                      to={`/color/${colorData.complementary.slice(1)}`}
                      className="flex-1 h-20 rounded-lg transition-transform hover:scale-105"
                      style={{ backgroundColor: colorData.complementary }}
                    />
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full mt-3"
                    onClick={() => copyToClipboard(`${color}, ${colorData.complementary}`, "Palette")}
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
                      className="flex-1 h-20 rounded-lg transition-transform hover:scale-105"
                      style={{ backgroundColor: color }}
                    />
                    {colorData.triadic.map((c, i) => (
                      <Link 
                        key={i}
                        to={`/color/${c.slice(1)}`}
                        className="flex-1 h-20 rounded-lg transition-transform hover:scale-105"
                        style={{ backgroundColor: c }}
                      />
                    ))}
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full mt-3"
                    onClick={() => copyToClipboard(`${color}, ${colorData.triadic.join(", ")}`, "Palette")}
                  >
                    <Copy className="w-3 h-3 mr-2" /> Copy Palette
                  </Button>
                </Card>

                {/* Analogous */}
                <Card className="p-6">
                  <h3 className="font-semibold mb-4">Analogous</h3>
                  <div className="flex gap-2">
                    <Link 
                      to={`/color/${colorData.analogous[1].slice(1)}`}
                      className="flex-1 h-20 rounded-lg transition-transform hover:scale-105"
                      style={{ backgroundColor: colorData.analogous[1] }}
                    />
                    <Link 
                      to={`/color/${color.slice(1)}`}
                      className="flex-1 h-20 rounded-lg transition-transform hover:scale-105"
                      style={{ backgroundColor: color }}
                    />
                    <Link 
                      to={`/color/${colorData.analogous[0].slice(1)}`}
                      className="flex-1 h-20 rounded-lg transition-transform hover:scale-105"
                      style={{ backgroundColor: colorData.analogous[0] }}
                    />
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full mt-3"
                    onClick={() => copyToClipboard(`${colorData.analogous[1]}, ${color}, ${colorData.analogous[0]}`, "Palette")}
                  >
                    <Copy className="w-3 h-3 mr-2" /> Copy Palette
                  </Button>
                </Card>
              </div>

              {/* SEO Content */}
              <Card className="p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  About {colorData.name} ({color})
                </h3>
                <div className="prose prose-sm max-w-none text-muted-foreground">
                  <p>
                    {colorData.name} ({color}) is a beautiful color with RGB values of {colorData.rgb.r}, {colorData.rgb.g}, {colorData.rgb.b}. 
                    In the HSL color space, it has a hue of {colorData.hsl.h}°, saturation of {colorData.hsl.s}%, and lightness of {colorData.hsl.l}%.
                  </p>
                  <p className="mt-3">
                    This color pairs well with its complementary shade {colorData.complementary} for high contrast designs, 
                    or use the analogous colors {colorData.analogous.join(" and ")} for a harmonious look.
                  </p>
                </div>
              </Card>
            </div>
          ) : (
            /* Popular Colors Grid */
            <div>
              <h2 className="text-xl font-semibold mb-4">Popular Colors</h2>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
                {popularColors.map((c) => (
                  <Link
                    key={c.hex}
                    to={`/color/${c.hex.slice(1)}`}
                    className="group"
                  >
                    <div 
                      className="aspect-square rounded-xl transition-all group-hover:scale-105 group-hover:shadow-lg"
                      style={{ backgroundColor: c.hex }}
                    />
                    <p className="text-center text-sm mt-2 font-medium truncate">{c.name}</p>
                    <p className="text-center text-xs text-muted-foreground">{c.hex}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
