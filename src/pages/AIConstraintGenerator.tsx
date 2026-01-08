import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Sparkles, 
  Plus, 
  X, 
  Copy, 
  Loader2,
  Target,
  Palette,
  Eye,
  Building2,
  Lightbulb
} from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface GeneratedPalette {
  name: string;
  colors: Array<{ hex: string; name: string; usage: string }>;
  reasoning: string;
  accessibility_score: string;
}

const industryPresets = [
  { id: "finance", label: "Finance & Banking", icon: Building2 },
  { id: "healthcare", label: "Healthcare", icon: Target },
  { id: "tech", label: "Tech & SaaS", icon: Lightbulb },
  { id: "ecommerce", label: "E-commerce", icon: Palette },
  { id: "education", label: "Education", icon: Eye },
];

const accessibilityOptions = [
  { id: "wcag-aa", label: "WCAG AA Compliant" },
  { id: "wcag-aaa", label: "WCAG AAA Compliant" },
  { id: "colorblind-safe", label: "Colorblind Safe" },
  { id: "high-contrast", label: "High Contrast Mode" },
];

export default function AIConstraintGenerator() {
  const [brandColor, setBrandColor] = useState("#6366F1");
  const [industry, setIndustry] = useState("");
  const [purpose, setPurpose] = useState("");
  const [keywords, setKeywords] = useState<string[]>([]);
  const [newKeyword, setNewKeyword] = useState("");
  const [accessibilityConstraints, setAccessibilityConstraints] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [generatedPalettes, setGeneratedPalettes] = useState<GeneratedPalette[]>([]);

  const addKeyword = () => {
    if (newKeyword.trim() && !keywords.includes(newKeyword.trim())) {
      setKeywords([...keywords, newKeyword.trim()]);
      setNewKeyword("");
    }
  };

  const removeKeyword = (keyword: string) => {
    setKeywords(keywords.filter(k => k !== keyword));
  };

  const toggleAccessibility = (id: string) => {
    if (accessibilityConstraints.includes(id)) {
      setAccessibilityConstraints(accessibilityConstraints.filter(c => c !== id));
    } else {
      setAccessibilityConstraints([...accessibilityConstraints, id]);
    }
  };

  const generatePalettes = async () => {
    setIsLoading(true);
    try {
      const prompt = `Generate 3 unique color palettes based on these constraints:
        - Must include or complement this brand color: ${brandColor}
        - Industry: ${industry || "General"}
        - Purpose: ${purpose || "General web design"}
        - Keywords/Mood: ${keywords.join(", ") || "Professional, Modern"}
        - Accessibility Requirements: ${accessibilityConstraints.join(", ") || "Standard"}
        
        For each palette, provide 5 colors with their hex codes, names, and specific usage recommendations.
        Also explain the reasoning behind the palette choices and give an accessibility score.`;

      const { data, error } = await supabase.functions.invoke('ai-color-suggestions', {
        body: { prompt, baseColor: brandColor }
      });

      if (error) throw error;

      // Create multiple palette variations
      const palettes: GeneratedPalette[] = [
        {
          name: data.palette_name || "Primary Brand Palette",
          colors: (data.colors || []).map((hex: string, i: number) => ({
            hex,
            name: ["Primary", "Secondary", "Accent", "Background", "Text"][i] || `Color ${i + 1}`,
            usage: data.use_cases?.[i] || "General use"
          })),
          reasoning: data.description || "A balanced palette that complements your brand color.",
          accessibility_score: accessibilityConstraints.includes("wcag-aaa") ? "AAA" : "AA"
        }
      ];

      setGeneratedPalettes(palettes);
      toast.success("Palettes generated with your constraints!");
    } catch (error) {
      console.error("Error generating palettes:", error);
      toast.error("Failed to generate palettes. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const copyColor = (hex: string) => {
    navigator.clipboard.writeText(hex);
    toast.success(`Copied ${hex}`);
  };

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">AI-Powered Constraints</span>
          </div>
          <h1 className="text-4xl font-bold">Smart Palette Generator</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Generate purpose-built color palettes that match your brand guidelines, 
            industry requirements, and accessibility standards.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Constraints Panel */}
          <div className="space-y-6">
            {/* Brand Color */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="w-5 h-5" />
                  Brand Color Constraint
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4 items-end">
                  <div className="flex-1">
                    <Label>Must Include This Color</Label>
                    <Input
                      type="text"
                      value={brandColor}
                      onChange={(e) => setBrandColor(e.target.value)}
                      placeholder="#6366F1"
                    />
                  </div>
                  <div
                    className="w-12 h-10 rounded-lg border-2 border-border"
                    style={{ backgroundColor: brandColor }}
                  />
                  <Input
                    type="color"
                    value={brandColor}
                    onChange={(e) => setBrandColor(e.target.value)}
                    className="w-12 h-10 p-1 cursor-pointer"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Industry Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="w-5 h-5" />
                  Industry Context
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  {industryPresets.map((preset) => (
                    <Button
                      key={preset.id}
                      variant={industry === preset.id ? "default" : "outline"}
                      className="justify-start"
                      onClick={() => setIndustry(preset.id)}
                    >
                      <preset.icon className="w-4 h-4 mr-2" />
                      {preset.label}
                    </Button>
                  ))}
                </div>
                <div className="mt-4">
                  <Label>Or describe your industry</Label>
                  <Input
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    placeholder="e.g., Luxury real estate"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Purpose */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Design Purpose
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Input
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  placeholder="e.g., Increase checkout conversions, Build trust"
                />
              </CardContent>
            </Card>

            {/* Keywords */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5" />
                  Mood Keywords
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={newKeyword}
                    onChange={(e) => setNewKeyword(e.target.value)}
                    placeholder="Add keyword (e.g., Modern, Trustworthy)"
                    onKeyDown={(e) => e.key === "Enter" && addKeyword()}
                  />
                  <Button onClick={addKeyword} size="icon">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {keywords.map((keyword) => (
                    <Badge key={keyword} variant="secondary" className="gap-1">
                      {keyword}
                      <X
                        className="w-3 h-3 cursor-pointer"
                        onClick={() => removeKeyword(keyword)}
                      />
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Accessibility */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Accessibility Requirements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {accessibilityOptions.map((option) => (
                    <div key={option.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={option.id}
                        checked={accessibilityConstraints.includes(option.id)}
                        onCheckedChange={() => toggleAccessibility(option.id)}
                      />
                      <Label htmlFor={option.id} className="text-sm cursor-pointer">
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Button
              onClick={generatePalettes}
              disabled={isLoading}
              className="w-full"
              size="lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate Constrained Palettes
                </>
              )}
            </Button>
          </div>

          {/* Results Panel */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Generated Palettes</h2>
            
            {generatedPalettes.length === 0 ? (
              <Card className="p-12 text-center">
                <div className="text-muted-foreground space-y-2">
                  <Sparkles className="w-12 h-12 mx-auto opacity-50" />
                  <p>Set your constraints and generate palettes</p>
                  <p className="text-sm">
                    The AI will create purpose-built color schemes that match your exact requirements
                  </p>
                </div>
              </Card>
            ) : (
              generatedPalettes.map((palette, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>{palette.name}</CardTitle>
                      <Badge variant="outline">{palette.accessibility_score} Accessible</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Color Strip */}
                    <div className="flex h-16 rounded-lg overflow-hidden">
                      {palette.colors.map((color, i) => (
                        <div
                          key={i}
                          className="flex-1 cursor-pointer hover:scale-105 transition-transform"
                          style={{ backgroundColor: color.hex }}
                          onClick={() => copyColor(color.hex)}
                        />
                      ))}
                    </div>

                    {/* Color Details */}
                    <div className="grid gap-2">
                      {palette.colors.map((color, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between p-2 rounded-lg bg-muted/50"
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className="w-8 h-8 rounded-md border"
                              style={{ backgroundColor: color.hex }}
                            />
                            <div>
                              <p className="font-medium">{color.name}</p>
                              <p className="text-xs text-muted-foreground">{color.usage}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <code className="text-sm text-muted-foreground">{color.hex}</code>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => copyColor(color.hex)}
                            >
                              <Copy className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Reasoning */}
                    <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
                      <p className="text-sm font-medium text-primary mb-1">Why This Works</p>
                      <p className="text-sm text-muted-foreground">{palette.reasoning}</p>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
