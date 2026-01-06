import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Search, 
  Loader2, 
  Copy, 
  Check, 
  Sparkles,
  Brain,
  Lightbulb,
  Building2,
  Utensils,
  Heart,
  Zap,
  Leaf,
  Music
} from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface MoodPalette {
  name: string;
  colors: { hex: string; name: string }[];
  psychology: string;
  useCases: string[];
}

const quickSearches = [
  { icon: Building2, label: "Trustworthy Bank", query: "professional trustworthy banking financial" },
  { icon: Utensils, label: "Cozy Café", query: "warm cozy coffee shop cafe organic" },
  { icon: Heart, label: "Romantic Wedding", query: "romantic elegant wedding love soft" },
  { icon: Zap, label: "Tech Startup", query: "modern innovative tech startup futuristic" },
  { icon: Leaf, label: "Eco Friendly", query: "nature eco friendly green sustainable organic" },
  { icon: Music, label: "Music Festival", query: "vibrant energetic music festival fun bold" },
];

export default function MoodAISearch() {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<MoodPalette[]>([]);
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const searchPalettes = async (searchQuery?: string) => {
    const searchText = searchQuery || query;
    if (!searchText.trim()) {
      toast.error("Please enter a mood or industry");
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("mood-ai-search", {
        body: { query: searchText },
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

      setResults(data.palettes || []);
      toast.success(`Found ${data.palettes?.length || 0} palettes!`);
    } catch (error) {
      console.error("Error searching:", error);
      toast.error("Failed to search. Please try again.");
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

  const copyPalette = (palette: MoodPalette) => {
    const colors = palette.colors.map(c => c.hex).join(", ");
    navigator.clipboard.writeText(colors);
    toast.success("Palette copied!");
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">
            Mood & Industry AI Search
          </h1>
          <p className="text-muted-foreground mt-1">
            Describe your project's mood or industry and get AI-powered color suggestions
          </p>
        </div>

        {/* Search */}
        <Card>
          <CardContent className="p-6">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Try Luxury perfume brand or Childrens educational app"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="pl-10"
                  onKeyDown={(e) => e.key === "Enter" && searchPalettes()}
                />
              </div>
              <Button 
                onClick={() => searchPalettes()} 
                disabled={isLoading}
                className="gradient-primary text-white"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Thinking...
                  </>
                ) : (
                  <>
                    <Brain className="w-4 h-4 mr-2" />
                    Generate
                  </>
                )}
              </Button>
            </div>

            {/* Quick Searches */}
            <div className="mt-4">
              <p className="text-sm text-muted-foreground mb-3">Quick searches:</p>
              <div className="flex flex-wrap gap-2">
                {quickSearches.map((item) => (
                  <Button
                    key={item.label}
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setQuery(item.query);
                      searchPalettes(item.query);
                    }}
                    className="gap-2"
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        {results.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {results.map((palette, index) => (
              <Card key={index} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-primary" />
                      {palette.name}
                    </span>
                    <Button variant="ghost" size="sm" onClick={() => copyPalette(palette)}>
                      <Copy className="w-4 h-4 mr-1" />
                      Copy All
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Color Swatches */}
                  <div className="flex gap-1">
                    {palette.colors.map((color, i) => (
                      <div 
                        key={i} 
                        className="flex-1 group cursor-pointer"
                        onClick={() => copyColor(color.hex)}
                      >
                        <div 
                          className="h-20 rounded-lg transition-transform group-hover:scale-105"
                          style={{ backgroundColor: color.hex }}
                        />
                        <div className="mt-2 text-center">
                          <p className="text-xs font-mono text-muted-foreground flex items-center justify-center gap-1">
                            {color.hex}
                            {copiedColor === color.hex ? (
                              <Check className="w-3 h-3 text-green-500" />
                            ) : (
                              <Copy className="w-3 h-3 opacity-0 group-hover:opacity-100" />
                            )}
                          </p>
                          <p className="text-[10px] text-muted-foreground truncate">
                            {color.name}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Psychology Note */}
                  <div className="p-3 rounded-lg bg-primary/5 border border-primary/10">
                    <div className="flex items-start gap-2">
                      <Lightbulb className="w-4 h-4 text-primary mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-foreground">Color Psychology</p>
                        <p className="text-sm text-muted-foreground">{palette.psychology}</p>
                      </div>
                    </div>
                  </div>

                  {/* Use Cases */}
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">Best for:</p>
                    <div className="flex flex-wrap gap-1">
                      {palette.useCases.map((useCase, i) => (
                        <span 
                          key={i}
                          className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground"
                        >
                          {useCase}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && results.length === 0 && (
          <Card className="bg-muted/30">
            <CardContent className="p-12 text-center">
              <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                AI-Powered Color Discovery
              </h3>
              <p className="text-muted-foreground max-w-md mx-auto mb-6">
                Describe your project's mood, industry, or target audience. Our AI will generate 
                perfectly matched color palettes with psychological insights.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto text-sm">
                <div className="p-3 rounded-lg bg-card border">
                  <p className="font-medium text-foreground">Industries</p>
                  <p className="text-muted-foreground text-xs">Banking, Healthcare, E-commerce</p>
                </div>
                <div className="p-3 rounded-lg bg-card border">
                  <p className="font-medium text-foreground">Moods</p>
                  <p className="text-muted-foreground text-xs">Calm, Energetic, Professional</p>
                </div>
                <div className="p-3 rounded-lg bg-card border">
                  <p className="font-medium text-foreground">Styles</p>
                  <p className="text-muted-foreground text-xs">Minimalist, Bold, Vintage</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </MainLayout>
  );
}
