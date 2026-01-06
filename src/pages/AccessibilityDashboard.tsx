import { useState, useMemo } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Eye, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle,
  Wand2,
  Copy,
  RefreshCw,
  Info,
  Contrast
} from "lucide-react";
import { toast } from "sonner";

// Color blindness simulation matrices
const colorBlindnessTypes = {
  protanopia: [0.567, 0.433, 0, 0.558, 0.442, 0, 0, 0.242, 0.758],
  deuteranopia: [0.625, 0.375, 0, 0.7, 0.3, 0, 0, 0.3, 0.7],
  tritanopia: [0.95, 0.05, 0, 0, 0.433, 0.567, 0, 0.475, 0.525],
  achromatopsia: [0.299, 0.587, 0.114, 0.299, 0.587, 0.114, 0.299, 0.587, 0.114],
};

// Calculate relative luminance
function getLuminance(hex: string): number {
  const rgb = hexToRgb(hex);
  if (!rgb) return 0;
  const [r, g, b] = [rgb.r, rgb.g, rgb.b].map((c) => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

// Calculate contrast ratio
function getContrastRatio(hex1: string, hex2: string): number {
  const lum1 = getLuminance(hex1);
  const lum2 = getLuminance(hex2);
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  return (lighter + 0.05) / (darker + 0.05);
}

// Convert hex to RGB
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

// Convert RGB to hex
function rgbToHex(r: number, g: number, b: number): string {
  return "#" + [r, g, b].map((x) => {
    const hex = Math.round(Math.max(0, Math.min(255, x))).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  }).join("");
}

// Simulate color blindness
function simulateColorBlindness(hex: string, type: keyof typeof colorBlindnessTypes): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  
  const matrix = colorBlindnessTypes[type];
  const r = rgb.r * matrix[0] + rgb.g * matrix[1] + rgb.b * matrix[2];
  const g = rgb.r * matrix[3] + rgb.g * matrix[4] + rgb.b * matrix[5];
  const b = rgb.r * matrix[6] + rgb.g * matrix[7] + rgb.b * matrix[8];
  
  return rgbToHex(r, g, b);
}

// Auto-fix contrast by adjusting lightness
function autoFixContrast(foreground: string, background: string, minRatio: number = 4.5): string {
  let fgRgb = hexToRgb(foreground);
  const bgRgb = hexToRgb(background);
  if (!fgRgb || !bgRgb) return foreground;

  const bgLum = getLuminance(background);
  const needsDarker = bgLum > 0.5;

  let attempts = 0;
  while (getContrastRatio(rgbToHex(fgRgb.r, fgRgb.g, fgRgb.b), background) < minRatio && attempts < 50) {
    if (needsDarker) {
      fgRgb.r = Math.max(0, fgRgb.r - 5);
      fgRgb.g = Math.max(0, fgRgb.g - 5);
      fgRgb.b = Math.max(0, fgRgb.b - 5);
    } else {
      fgRgb.r = Math.min(255, fgRgb.r + 5);
      fgRgb.g = Math.min(255, fgRgb.g + 5);
      fgRgb.b = Math.min(255, fgRgb.b + 5);
    }
    attempts++;
  }

  return rgbToHex(fgRgb.r, fgRgb.g, fgRgb.b);
}

export default function AccessibilityDashboard() {
  const [textColor, setTextColor] = useState("#1a1a2e");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [palette, setPalette] = useState([
    "#A05AFF", "#1BCFB4", "#4BCBEB", "#FF6B6B", "#1a1a2e"
  ]);
  const [newColor, setNewColor] = useState("#A05AFF");

  const contrastRatio = useMemo(() => 
    getContrastRatio(textColor, bgColor), 
    [textColor, bgColor]
  );

  const wcagAA = contrastRatio >= 4.5;
  const wcagAAA = contrastRatio >= 7;
  const wcagLargeAA = contrastRatio >= 3;

  const handleAutoFix = () => {
    const fixed = autoFixContrast(textColor, bgColor);
    setTextColor(fixed);
    toast.success("Contrast auto-fixed!");
  };

  const addColor = () => {
    if (!palette.includes(newColor)) {
      setPalette([...palette, newColor]);
      toast.success("Color added to palette");
    }
  };

  const removeColor = (index: number) => {
    setPalette(palette.filter((_, i) => i !== index));
  };

  const copyColor = (hex: string) => {
    navigator.clipboard.writeText(hex);
    toast.success(`Copied ${hex}`);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">
            Accessibility Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Check WCAG compliance, simulate color blindness, and auto-fix contrast issues
          </p>
        </div>

        {/* Info Banner */}
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-4 flex items-start gap-3">
            <Info className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <p className="font-medium text-foreground">Why Accessibility Matters</p>
              <p className="text-sm text-muted-foreground">
                WCAG compliance ensures your designs are readable by everyone, including people with visual impairments. 
                It's also a legal requirement in many countries.
              </p>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="contrast" className="space-y-6">
          <TabsList>
            <TabsTrigger value="contrast" className="gap-2">
              <Contrast className="w-4 h-4" />
              Contrast Checker
            </TabsTrigger>
            <TabsTrigger value="blindness" className="gap-2">
              <Eye className="w-4 h-4" />
              Color Blindness
            </TabsTrigger>
          </TabsList>

          {/* Contrast Checker */}
          <TabsContent value="contrast" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Color Inputs */}
              <Card>
                <CardHeader>
                  <CardTitle>Color Selection</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Text Color</Label>
                    <div className="flex gap-2">
                      <div 
                        className="w-12 h-10 rounded-lg border border-border"
                        style={{ backgroundColor: textColor }}
                      />
                      <Input
                        value={textColor}
                        onChange={(e) => setTextColor(e.target.value)}
                        className="font-mono flex-1"
                      />
                      <input
                        type="color"
                        value={textColor}
                        onChange={(e) => setTextColor(e.target.value)}
                        className="w-10 h-10 rounded cursor-pointer"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Background Color</Label>
                    <div className="flex gap-2">
                      <div 
                        className="w-12 h-10 rounded-lg border border-border"
                        style={{ backgroundColor: bgColor }}
                      />
                      <Input
                        value={bgColor}
                        onChange={(e) => setBgColor(e.target.value)}
                        className="font-mono flex-1"
                      />
                      <input
                        type="color"
                        value={bgColor}
                        onChange={(e) => setBgColor(e.target.value)}
                        className="w-10 h-10 rounded cursor-pointer"
                      />
                    </div>
                  </div>

                  <Button 
                    onClick={() => {
                      const temp = textColor;
                      setTextColor(bgColor);
                      setBgColor(temp);
                    }}
                    variant="outline"
                    className="w-full"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Swap Colors
                  </Button>
                </CardContent>
              </Card>

              {/* Results */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Contrast Ratio</span>
                    <span className={`text-2xl font-bold ${wcagAA ? 'text-green-500' : 'text-red-500'}`}>
                      {contrastRatio.toFixed(2)}:1
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* WCAG Levels */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-2">
                        {wcagAAA ? (
                          <CheckCircle2 className="w-5 h-5 text-green-500" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-500" />
                        )}
                        <span className="font-medium">WCAG AAA</span>
                      </div>
                      <span className="text-sm text-muted-foreground">7:1 ratio</span>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-2">
                        {wcagAA ? (
                          <CheckCircle2 className="w-5 h-5 text-green-500" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-500" />
                        )}
                        <span className="font-medium">WCAG AA (Normal)</span>
                      </div>
                      <span className="text-sm text-muted-foreground">4.5:1 ratio</span>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-2">
                        {wcagLargeAA ? (
                          <CheckCircle2 className="w-5 h-5 text-green-500" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-500" />
                        )}
                        <span className="font-medium">WCAG AA (Large)</span>
                      </div>
                      <span className="text-sm text-muted-foreground">3:1 ratio</span>
                    </div>
                  </div>

                  {/* Auto Fix Button */}
                  {!wcagAA && (
                    <Button onClick={handleAutoFix} className="w-full gradient-primary text-white">
                      <Wand2 className="w-4 h-4 mr-2" />
                      Magic Fix - Auto Adjust Contrast
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Preview */}
            <Card>
              <CardHeader>
                <CardTitle>Live Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div 
                  className="p-8 rounded-xl"
                  style={{ backgroundColor: bgColor }}
                >
                  <h2 
                    className="text-3xl font-bold mb-4"
                    style={{ color: textColor }}
                  >
                    The Quick Brown Fox
                  </h2>
                  <p 
                    className="text-lg mb-4"
                    style={{ color: textColor }}
                  >
                    Jumps over the lazy dog. This is how your text will look with the selected color combination.
                  </p>
                  <p 
                    className="text-sm"
                    style={{ color: textColor }}
                  >
                    Small text is harder to read. Make sure you have sufficient contrast for accessibility.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Color Blindness Simulator */}
          <TabsContent value="blindness" className="space-y-6">
            {/* Palette Input */}
            <Card>
              <CardHeader>
                <CardTitle>Your Palette</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3 mb-4">
                  {palette.map((color, i) => (
                    <div key={i} className="relative group">
                      <div 
                        className="w-16 h-16 rounded-lg border border-border cursor-pointer shadow-sm"
                        style={{ backgroundColor: color }}
                        onClick={() => copyColor(color)}
                      />
                      <button
                        onClick={() => removeColor(i)}
                        className="absolute -top-2 -right-2 w-5 h-5 bg-destructive text-white rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        ×
                      </button>
                      <p className="text-xs text-center mt-1 font-mono text-muted-foreground">
                        {color}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    value={newColor}
                    onChange={(e) => setNewColor(e.target.value)}
                    placeholder="#000000"
                    className="font-mono"
                  />
                  <input
                    type="color"
                    value={newColor}
                    onChange={(e) => setNewColor(e.target.value)}
                    className="w-10 h-10 rounded cursor-pointer"
                  />
                  <Button onClick={addColor}>Add</Button>
                </div>
              </CardContent>
            </Card>

            {/* Simulations */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(colorBlindnessTypes).map(([type, _]) => (
                <Card key={type}>
                  <CardHeader>
                    <CardTitle className="capitalize flex items-center gap-2">
                      <Eye className="w-5 h-5" />
                      {type}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2 mb-4">
                      {palette.map((color, i) => (
                        <div key={i} className="flex-1">
                          <div 
                            className="h-12 rounded-lg border border-border"
                            style={{ 
                              backgroundColor: simulateColorBlindness(
                                color, 
                                type as keyof typeof colorBlindnessTypes
                              ) 
                            }}
                          />
                          <p className="text-[10px] text-center mt-1 font-mono text-muted-foreground">
                            {simulateColorBlindness(color, type as keyof typeof colorBlindnessTypes)}
                          </p>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {type === "protanopia" && "Reduced sensitivity to red light (1% of males)"}
                      {type === "deuteranopia" && "Reduced sensitivity to green light (6% of males)"}
                      {type === "tritanopia" && "Reduced sensitivity to blue light (rare)"}
                      {type === "achromatopsia" && "Complete color blindness (very rare)"}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Conflict Detection */}
            <Card className="border-yellow-500/30 bg-yellow-500/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-500" />
                  Potential Issues
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  {palette.length >= 2 && (() => {
                    const issues: string[] = [];
                    for (let i = 0; i < palette.length; i++) {
                      for (let j = i + 1; j < palette.length; j++) {
                        Object.entries(colorBlindnessTypes).forEach(([type, _]) => {
                          const sim1 = simulateColorBlindness(palette[i], type as keyof typeof colorBlindnessTypes);
                          const sim2 = simulateColorBlindness(palette[j], type as keyof typeof colorBlindnessTypes);
                          const contrast = getContrastRatio(sim1, sim2);
                          if (contrast < 2) {
                            issues.push(
                              `${palette[i]} and ${palette[j]} may look similar for people with ${type}`
                            );
                          }
                        });
                      }
                    }
                    return issues.slice(0, 5).map((issue, i) => (
                      <li key={i} className="text-muted-foreground">• {issue}</li>
                    ));
                  })()}
                </ul>
                {palette.length < 2 && (
                  <p className="text-muted-foreground">Add at least 2 colors to check for conflicts</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
