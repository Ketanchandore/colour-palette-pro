import { useState } from "react";
import { Sparkles, Wand2, Copy, RefreshCw, Loader2 } from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface ColorPalette {
  palette_name: string;
  colors: string[];
  description: string;
  use_cases: string[];
}

const promptSuggestions = [
  "A calming spa website",
  "Bold and energetic fitness brand",
  "Elegant luxury fashion",
  "Playful children's app",
  "Professional corporate identity",
  "Cozy coffee shop vibes",
  "Modern tech startup",
  "Vintage retro aesthetic",
];

export default function AIColorSuggestions() {
  const [prompt, setPrompt] = useState("");
  const [baseColor, setBaseColor] = useState("#A05AFF");
  const [palette, setPalette] = useState<ColorPalette | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<ColorPalette[]>([]);

  const generatePalette = async () => {
    if (!prompt.trim() && !baseColor) {
      toast.error("Please enter a prompt or select a base color");
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("ai-color-suggestions", {
        body: { prompt, baseColor },
      });

      if (error) {
        if (error.message?.includes("429")) {
          toast.error("Rate limit exceeded. Please try again later.");
        } else if (error.message?.includes("402")) {
          toast.error("AI credits exhausted. Please add more credits.");
        } else {
          throw error;
        }
        return;
      }

      if (data.error) {
        toast.error(data.error);
        return;
      }

      setPalette(data);
      setHistory((prev) => [data, ...prev].slice(0, 5));
      toast.success("Palette generated!");
    } catch (error) {
      console.error("Error generating palette:", error);
      toast.error("Failed to generate palette. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const copyColor = (color: string) => {
    navigator.clipboard.writeText(color);
    toast.success(`Copied ${color}`);
  };

  const copyAllColors = () => {
    if (!palette) return;
    navigator.clipboard.writeText(palette.colors.join(", "));
    toast.success("All colors copied!");
  };

  const copyCSS = () => {
    if (!palette) return;
    const css = palette.colors
      .map((color, i) => `--color-${i + 1}: ${color};`)
      .join("\n");
    navigator.clipboard.writeText(`:root {\n${css}\n}`);
    toast.success("CSS variables copied!");
  };

  return (
    <MainLayout>
      <div className="p-6 lg:p-8 space-y-8">
        {/* Header */}
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl gradient-card-cyan flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-3xl font-display font-bold text-foreground">
              AI Color Suggestions
            </h1>
          </div>
          <p className="text-muted-foreground">
            Let AI create the perfect color palette for your project
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Panel */}
          <div className="space-y-6">
            <div className="bg-card rounded-2xl border border-border p-6 space-y-6">
              <div className="space-y-2">
                <Label>Describe your project</Label>
                <Textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="E.g., A modern healthcare app with a calming, trustworthy feel..."
                  className="min-h-[120px] resize-none"
                />
              </div>

              <div className="space-y-2">
                <Label>Quick Prompts</Label>
                <div className="flex flex-wrap gap-2">
                  {promptSuggestions.map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => setPrompt(suggestion)}
                      className="px-3 py-1.5 text-sm bg-muted hover:bg-muted/80 rounded-full transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Base Color (Optional)</Label>
                <div className="flex gap-3">
                  <Input
                    type="color"
                    value={baseColor}
                    onChange={(e) => setBaseColor(e.target.value)}
                    className="w-20 h-12 cursor-pointer"
                  />
                  <Input
                    type="text"
                    value={baseColor}
                    onChange={(e) => setBaseColor(e.target.value)}
                    className="flex-1 font-mono"
                  />
                </div>
              </div>

              <Button
                onClick={generatePalette}
                disabled={isLoading}
                className="w-full gradient-primary text-white"
                size="lg"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-4 h-4 mr-2" />
                    Generate Palette
                  </>
                )}
              </Button>
            </div>

            {/* History */}
            {history.length > 0 && (
              <div className="bg-card rounded-2xl border border-border p-6">
                <h3 className="text-lg font-semibold mb-4">Recent Palettes</h3>
                <div className="space-y-3">
                  {history.map((p, i) => (
                    <button
                      key={i}
                      onClick={() => setPalette(p)}
                      className="w-full flex items-center gap-3 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors text-left"
                    >
                      <div className="flex rounded-lg overflow-hidden">
                        {p.colors.slice(0, 5).map((c, j) => (
                          <div
                            key={j}
                            className="w-6 h-8"
                            style={{ backgroundColor: c }}
                          />
                        ))}
                      </div>
                      <span className="text-sm truncate">{p.palette_name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Result Panel */}
          <div className="bg-card rounded-2xl border border-border p-6 space-y-6">
            {palette ? (
              <>
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-display font-bold">
                    {palette.palette_name}
                  </h2>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={copyAllColors}>
                      <Copy className="w-4 h-4 mr-1" />
                      HEX
                    </Button>
                    <Button variant="outline" size="sm" onClick={copyCSS}>
                      <Copy className="w-4 h-4 mr-1" />
                      CSS
                    </Button>
                  </div>
                </div>

                {/* Color Preview */}
                <div className="flex rounded-2xl overflow-hidden h-32">
                  {palette.colors.map((color, i) => (
                    <button
                      key={i}
                      className="flex-1 hover:flex-[1.5] transition-all relative group"
                      style={{ backgroundColor: color }}
                      onClick={() => copyColor(color)}
                    >
                      <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 text-white px-2 py-1 rounded">
                        {color}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Color List */}
                <div className="grid grid-cols-5 gap-2">
                  {palette.colors.map((color, i) => (
                    <button
                      key={i}
                      onClick={() => copyColor(color)}
                      className="flex flex-col items-center gap-2 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <div
                        className="w-full aspect-square rounded-lg"
                        style={{ backgroundColor: color }}
                      />
                      <span className="text-xs font-mono">{color}</span>
                    </button>
                  ))}
                </div>

                {/* Description */}
                <div>
                  <h3 className="font-semibold mb-2">Why it works</h3>
                  <p className="text-muted-foreground">{palette.description}</p>
                </div>

                {/* Use Cases */}
                <div>
                  <h3 className="font-semibold mb-2">Best for</h3>
                  <div className="flex flex-wrap gap-2">
                    {palette.use_cases.map((useCase, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm"
                      >
                        {useCase}
                      </span>
                    ))}
                  </div>
                </div>

                <Button
                  variant="outline"
                  onClick={generatePalette}
                  disabled={isLoading}
                  className="w-full"
                >
                  <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
                  Regenerate
                </Button>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
                <Sparkles className="w-16 h-16 mb-4 opacity-30" />
                <p className="text-lg font-medium mb-2">No palette yet</p>
                <p className="text-sm text-center">
                  Describe your project and let AI create<br />the perfect color palette for you
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
