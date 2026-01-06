import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Globe, 
  Copy, 
  Check, 
  Loader2, 
  Palette, 
  Type, 
  MousePointer,
  Download,
  ExternalLink,
  Sparkles
} from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface BrandKit {
  colors: { name: string; hex: string }[];
  fonts: { type: string; name: string; fallback: string }[];
  buttonStyles: { type: string; style: string }[];
  siteName: string;
}

export default function URLBrandExtractor() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [brandKit, setBrandKit] = useState<BrandKit | null>(null);
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const extractBrand = async () => {
    if (!url) {
      toast.error("Please enter a URL");
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("url-brand-extractor", {
        body: { url },
      });

      if (error) throw error;

      if (data.error) {
        if (data.error.includes("Rate limit")) {
          toast.error("Rate limit reached. Please try again later.");
        } else if (data.error.includes("Payment required")) {
          toast.error("Service limit reached. Please try again later.");
        } else {
          toast.error(data.error);
        }
        return;
      }

      setBrandKit(data);
      toast.success("Brand kit extracted successfully!");
    } catch (error) {
      console.error("Error extracting brand:", error);
      toast.error("Failed to extract brand. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const copyColor = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(hex);
    toast.success(`Copied ${hex}`);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  const copyAllColors = () => {
    if (!brandKit) return;
    const colorString = brandKit.colors.map(c => c.hex).join(", ");
    navigator.clipboard.writeText(colorString);
    toast.success("All colors copied!");
  };

  const copyCSS = () => {
    if (!brandKit) return;
    const css = `:root {
${brandKit.colors.map((c, i) => `  --color-${c.name.toLowerCase().replace(/\s+/g, '-')}: ${c.hex};`).join('\n')}
  
  /* Typography */
${brandKit.fonts.map(f => `  --font-${f.type.toLowerCase()}: '${f.name}', ${f.fallback};`).join('\n')}
}`;
    navigator.clipboard.writeText(css);
    toast.success("CSS variables copied!");
  };

  // Popular brand examples
  const popularBrands = [
    { name: "Stripe", url: "stripe.com" },
    { name: "Spotify", url: "spotify.com" },
    { name: "Airbnb", url: "airbnb.com" },
    { name: "Notion", url: "notion.so" },
    { name: "Linear", url: "linear.app" },
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">
            URL Brand Extractor
          </h1>
          <p className="text-muted-foreground mt-1">
            Extract colors, fonts, and styles from any website
          </p>
        </div>

        {/* URL Input */}
        <Card>
          <CardContent className="p-6">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Enter website URL (e.g., stripe.com)"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="pl-10"
                  onKeyDown={(e) => e.key === "Enter" && extractBrand()}
                />
              </div>
              <Button 
                onClick={extractBrand} 
                disabled={isLoading}
                className="gradient-primary text-white"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Extracting...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Extract Brand
                  </>
                )}
              </Button>
            </div>

            {/* Popular Examples */}
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="text-sm text-muted-foreground">Try:</span>
              {popularBrands.map((brand) => (
                <button
                  key={brand.name}
                  onClick={() => setUrl(brand.url)}
                  className="text-sm px-3 py-1 rounded-full bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {brand.name}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        {brandKit && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Colors */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Palette className="w-5 h-5 text-primary" />
                  Colors
                </CardTitle>
                <Button variant="ghost" size="sm" onClick={copyAllColors}>
                  <Copy className="w-4 h-4 mr-1" />
                  Copy All
                </Button>
              </CardHeader>
              <CardContent className="space-y-3">
                {brandKit.colors.map((color, i) => (
                  <div 
                    key={i}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                    onClick={() => copyColor(color.hex)}
                  >
                    <div 
                      className="w-12 h-12 rounded-lg border border-border shadow-sm"
                      style={{ backgroundColor: color.hex }}
                    />
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{color.name}</p>
                      <p className="text-sm text-muted-foreground font-mono">{color.hex}</p>
                    </div>
                    {copiedColor === color.hex ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4 text-muted-foreground" />
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Fonts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Type className="w-5 h-5 text-secondary" />
                  Typography
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {brandKit.fonts.map((font, i) => (
                  <div key={i} className="p-4 rounded-lg bg-muted/50">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                      {font.type}
                    </p>
                    <p className="text-xl font-bold text-foreground" style={{ fontFamily: font.name }}>
                      {font.name}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Fallback: {font.fallback}
                    </p>
                    <a 
                      href={`https://fonts.google.com/?query=${encodeURIComponent(font.name)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-primary hover:underline mt-2"
                    >
                      Find on Google Fonts <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Button Styles */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MousePointer className="w-5 h-5 text-accent" />
                  Button Styles
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {brandKit.buttonStyles.map((btn, i) => (
                  <div key={i} className="space-y-2">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">
                      {btn.type}
                    </p>
                    <button
                      className="w-full py-3 px-6 rounded-lg font-medium transition-all"
                      style={{
                        backgroundColor: btn.type === "Primary" ? brandKit.colors[0]?.hex : "transparent",
                        color: btn.type === "Primary" ? "#fff" : brandKit.colors[0]?.hex,
                        border: btn.type !== "Primary" ? `2px solid ${brandKit.colors[0]?.hex}` : "none",
                        borderRadius: btn.style === "rounded" ? "9999px" : "8px"
                      }}
                    >
                      {btn.type} Button
                    </button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Export Options */}
        {brandKit && (
          <Card>
            <CardHeader>
              <CardTitle>Export Brand Kit</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" onClick={copyCSS}>
                  <Download className="w-4 h-4 mr-2" />
                  CSS Variables
                </Button>
                <Button variant="outline" onClick={() => {
                  const json = JSON.stringify(brandKit, null, 2);
                  navigator.clipboard.writeText(json);
                  toast.success("JSON copied!");
                }}>
                  <Download className="w-4 h-4 mr-2" />
                  JSON
                </Button>
                <Button variant="outline" onClick={() => {
                  const tailwind = `// tailwind.config.js colors
colors: {
${brandKit.colors.map(c => `  '${c.name.toLowerCase().replace(/\s+/g, '-')}': '${c.hex}',`).join('\n')}
}`;
                  navigator.clipboard.writeText(tailwind);
                  toast.success("Tailwind config copied!");
                }}>
                  <Download className="w-4 h-4 mr-2" />
                  Tailwind
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Info Section */}
        {!brandKit && !isLoading && (
          <Card className="bg-muted/30">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Extract Any Website's Brand
              </h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Enter a website URL above to extract its color palette, typography, 
                and button styles. Perfect for inspiration or recreating successful designs.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </MainLayout>
  );
}
