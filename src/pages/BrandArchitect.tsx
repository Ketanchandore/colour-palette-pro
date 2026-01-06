import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Palette, 
  Type, 
  MousePointer,
  Sparkles,
  Copy,
  Check,
  RefreshCw,
  Download,
  Loader2
} from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface BrandIdentity {
  colors: { name: string; hex: string; usage: string }[];
  fonts: { type: string; name: string; googleFontsUrl: string }[];
  buttonStyle: { borderRadius: string; shadow: boolean; style: string };
  logoText: string;
}

const defaultColors = [
  { name: "Primary", hex: "#A05AFF", usage: "Main brand color, CTAs" },
  { name: "Secondary", hex: "#1BCFB4", usage: "Accents, highlights" },
  { name: "Background", hex: "#FAFAFA", usage: "Page backgrounds" },
  { name: "Text", hex: "#1a1a2e", usage: "Body text" },
  { name: "Muted", hex: "#6B7280", usage: "Secondary text" },
];

export default function BrandArchitect() {
  const [brandName, setBrandName] = useState("My Brand");
  const [industry, setIndustry] = useState("");
  const [colors, setColors] = useState(defaultColors);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  
  const [fonts, setFonts] = useState([
    { type: "Heading", name: "Plus Jakarta Sans", googleFontsUrl: "https://fonts.google.com/specimen/Plus+Jakarta+Sans" },
    { type: "Body", name: "Inter", googleFontsUrl: "https://fonts.google.com/specimen/Inter" },
  ]);
  
  const [buttonStyle, setButtonStyle] = useState({
    borderRadius: "8px",
    shadow: true,
    style: "solid"
  });

  const generateBrand = async () => {
    if (!industry.trim()) {
      toast.error("Please enter your industry or describe your brand");
      return;
    }

    setIsGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke("brand-architect", {
        body: { industry, brandName },
      });

      if (error) throw error;

      if (data.error) {
        if (data.error.includes("Rate limit")) {
          toast.error("Rate limit reached. Please try again later.");
        } else {
          toast.error(data.error);
        }
        return;
      }

      if (data.colors) setColors(data.colors);
      if (data.fonts) setFonts(data.fonts);
      if (data.buttonStyle) setButtonStyle(data.buttonStyle);
      
      toast.success("Brand identity generated!");
    } catch (error) {
      console.error("Error generating brand:", error);
      toast.error("Failed to generate. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const copyColor = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(hex);
    toast.success(`Copied ${hex}`);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  const updateColor = (index: number, hex: string) => {
    const newColors = [...colors];
    newColors[index].hex = hex;
    setColors(newColors);
  };

  const exportBrandKit = () => {
    const brandKit = {
      name: brandName,
      colors,
      fonts,
      buttonStyle,
    };
    const json = JSON.stringify(brandKit, null, 2);
    navigator.clipboard.writeText(json);
    toast.success("Brand kit copied as JSON!");
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">
            AI Brand Architect
          </h1>
          <p className="text-muted-foreground mt-1">
            Generate complete brand identity with colors, fonts, and button styles
          </p>
        </div>

        {/* Brand Input */}
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>Brand Name</Label>
                <Input
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  placeholder="Your brand name"
                />
              </div>
              <div className="md:col-span-2">
                <Label>Industry / Description</Label>
                <div className="flex gap-2">
                  <Input
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    placeholder="e.g., Luxury fashion boutique, Tech startup, Organic bakery"
                  />
                  <Button 
                    onClick={generateBrand} 
                    disabled={isGenerating}
                    className="gradient-primary text-white whitespace-nowrap"
                  >
                    {isGenerating ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 mr-2" />
                        Generate
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Color Palette */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5 text-primary" />
                Color Palette
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {colors.map((color, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <div 
                    className="w-12 h-12 rounded-lg border border-border shadow-sm cursor-pointer"
                    style={{ backgroundColor: color.hex }}
                    onClick={() => copyColor(color.hex)}
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground">{color.name}</span>
                      <span className="text-xs font-mono text-muted-foreground">{color.hex}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{color.usage}</p>
                  </div>
                  <input
                    type="color"
                    value={color.hex}
                    onChange={(e) => updateColor(index, e.target.value)}
                    className="w-8 h-8 rounded cursor-pointer"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => copyColor(color.hex)}
                  >
                    {copiedColor === color.hex ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Typography */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Type className="w-5 h-5 text-secondary" />
                Typography
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {fonts.map((font, index) => (
                <div key={index} className="p-4 rounded-lg bg-muted/30">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
                    {font.type}
                  </p>
                  <p 
                    className="text-2xl font-bold text-foreground"
                    style={{ fontFamily: font.name }}
                  >
                    {font.name}
                  </p>
                  <p 
                    className="text-sm text-muted-foreground mt-2"
                    style={{ fontFamily: font.name }}
                  >
                    The quick brown fox jumps over the lazy dog.
                  </p>
                  <a 
                    href={font.googleFontsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-2 text-xs text-primary hover:underline"
                  >
                    Get from Google Fonts →
                  </a>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Button Styles & Logo Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Button Styles */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MousePointer className="w-5 h-5 text-accent" />
                Button Styles
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {/* Primary Button */}
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Primary</p>
                  <button
                    className="w-full py-3 px-6 font-medium text-white transition-all"
                    style={{
                      backgroundColor: colors[0]?.hex,
                      borderRadius: buttonStyle.borderRadius,
                      boxShadow: buttonStyle.shadow ? `0 4px 14px ${colors[0]?.hex}40` : "none"
                    }}
                  >
                    Get Started
                  </button>
                </div>
                
                {/* Secondary Button */}
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Secondary</p>
                  <button
                    className="w-full py-3 px-6 font-medium border-2 transition-all"
                    style={{
                      backgroundColor: "transparent",
                      color: colors[0]?.hex,
                      borderColor: colors[0]?.hex,
                      borderRadius: buttonStyle.borderRadius,
                    }}
                  >
                    Learn More
                  </button>
                </div>
              </div>

              {/* Button Customization */}
              <div className="pt-4 border-t border-border space-y-3">
                <div>
                  <Label className="text-xs">Border Radius</Label>
                  <div className="flex gap-2 mt-1">
                    {["4px", "8px", "12px", "9999px"].map((radius) => (
                      <button
                        key={radius}
                        onClick={() => setButtonStyle({ ...buttonStyle, borderRadius: radius })}
                        className={`px-3 py-1 text-xs rounded border ${
                          buttonStyle.borderRadius === radius 
                            ? "border-primary bg-primary/10 text-primary" 
                            : "border-border text-muted-foreground"
                        }`}
                      >
                        {radius === "9999px" ? "Pill" : radius}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Logo Preview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                Logo Concept
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div 
                className="p-8 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: colors[3]?.hex || "#1a1a2e" }}
              >
                <div className="text-center">
                  <div 
                    className="w-16 h-16 rounded-xl mx-auto mb-4 flex items-center justify-center"
                    style={{ backgroundColor: colors[0]?.hex }}
                  >
                    <span 
                      className="text-2xl font-bold"
                      style={{ color: "#ffffff" }}
                    >
                      {brandName.charAt(0)}
                    </span>
                  </div>
                  <h2 
                    className="text-2xl font-bold"
                    style={{ 
                      color: colors[2]?.hex || "#FAFAFA",
                      fontFamily: fonts[0]?.name
                    }}
                  >
                    {brandName}
                  </h2>
                  <p 
                    className="text-sm mt-1"
                    style={{ 
                      color: colors[4]?.hex || "#6B7280",
                      fontFamily: fonts[1]?.name
                    }}
                  >
                    {industry || "Your tagline here"}
                  </p>
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => {
                    // Download as image would require canvas
                    toast.info("Logo concept preview only");
                  }}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export Logo
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={exportBrandKit}
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Brand Kit
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Full Preview */}
        <Card>
          <CardHeader>
            <CardTitle>Full Brand Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div 
              className="rounded-xl overflow-hidden"
              style={{ backgroundColor: colors[2]?.hex || "#FAFAFA" }}
            >
              {/* Sample Navbar */}
              <div 
                className="flex items-center justify-between px-6 py-4 border-b"
                style={{ borderColor: colors[4]?.hex + "30" }}
              >
                <div className="flex items-center gap-2">
                  <div 
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: colors[0]?.hex }}
                  >
                    <span className="text-white font-bold text-sm">{brandName.charAt(0)}</span>
                  </div>
                  <span 
                    className="font-bold"
                    style={{ color: colors[3]?.hex, fontFamily: fonts[0]?.name }}
                  >
                    {brandName}
                  </span>
                </div>
                <button
                  className="px-4 py-2 text-sm font-medium text-white"
                  style={{ 
                    backgroundColor: colors[0]?.hex,
                    borderRadius: buttonStyle.borderRadius
                  }}
                >
                  Get Started
                </button>
              </div>

              {/* Sample Content */}
              <div className="p-8 text-center">
                <h1 
                  className="text-3xl font-bold mb-4"
                  style={{ color: colors[3]?.hex, fontFamily: fonts[0]?.name }}
                >
                  Welcome to <span style={{ color: colors[0]?.hex }}>{brandName}</span>
                </h1>
                <p 
                  className="text-lg mb-6 max-w-xl mx-auto"
                  style={{ color: colors[4]?.hex, fontFamily: fonts[1]?.name }}
                >
                  Experience the future of {industry || "innovation"}. 
                  We're here to transform the way you work.
                </p>
                <div className="flex justify-center gap-4">
                  <button
                    className="px-6 py-3 font-medium text-white"
                    style={{ 
                      backgroundColor: colors[0]?.hex,
                      borderRadius: buttonStyle.borderRadius,
                      boxShadow: buttonStyle.shadow ? `0 4px 14px ${colors[0]?.hex}40` : "none"
                    }}
                  >
                    Start Free Trial
                  </button>
                  <button
                    className="px-6 py-3 font-medium border-2"
                    style={{ 
                      color: colors[1]?.hex,
                      borderColor: colors[1]?.hex,
                      borderRadius: buttonStyle.borderRadius
                    }}
                  >
                    Watch Demo
                  </button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
