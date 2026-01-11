import { useState, useMemo } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { 
  Check, 
  X, 
  Copy, 
  RefreshCw,
  Eye,
  AlertTriangle,
  Lock,
  Sparkles
} from "lucide-react";
import { useSubscription } from "@/hooks/useSubscription";
import { LockedFeatureOverlay } from "@/components/subscription/LockedFeatureOverlay";

// Calculate relative luminance
const getLuminance = (hex: string): number => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return 0;
  
  const [r, g, b] = [
    parseInt(result[1], 16) / 255,
    parseInt(result[2], 16) / 255,
    parseInt(result[3], 16) / 255
  ].map(c => c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
  
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

// Calculate contrast ratio
const getContrastRatio = (hex1: string, hex2: string): number => {
  const l1 = getLuminance(hex1);
  const l2 = getLuminance(hex2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
};

// WCAG levels
const getWCAGLevel = (ratio: number, isLargeText: boolean) => {
  if (isLargeText) {
    if (ratio >= 4.5) return { level: "AAA", passed: true };
    if (ratio >= 3) return { level: "AA", passed: true };
    return { level: "Fail", passed: false };
  } else {
    if (ratio >= 7) return { level: "AAA", passed: true };
    if (ratio >= 4.5) return { level: "AA", passed: true };
    return { level: "Fail", passed: false };
  }
};

// Suggest better colors
const suggestBetterColor = (foreground: string, background: string, targetRatio: number = 4.5): string => {
  const bgLum = getLuminance(background);
  const fgLum = getLuminance(foreground);
  
  // Parse foreground color
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(foreground);
  if (!result) return foreground;
  
  let [r, g, b] = [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16)
  ];
  
  // Determine if we need to go lighter or darker
  const shouldGoLighter = bgLum < 0.5;
  const step = shouldGoLighter ? 10 : -10;
  
  // Adjust color until we hit target ratio
  for (let i = 0; i < 25; i++) {
    r = Math.max(0, Math.min(255, r + step));
    g = Math.max(0, Math.min(255, g + step));
    b = Math.max(0, Math.min(255, b + step));
    
    const newHex = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    if (getContrastRatio(newHex, background) >= targetRatio) {
      return newHex;
    }
  }
  
  return shouldGoLighter ? "#FFFFFF" : "#000000";
};

export default function ContrastChecker() {
  const [foreground, setForeground] = useState("#A05AFF");
  const [background, setBackground] = useState("#FFFFFF");
  const { canUseAdvancedTools } = useSubscription();

  const contrastRatio = useMemo(() => {
    return getContrastRatio(foreground, background);
  }, [foreground, background]);

  const normalText = useMemo(() => getWCAGLevel(contrastRatio, false), [contrastRatio]);
  const largeText = useMemo(() => getWCAGLevel(contrastRatio, true), [contrastRatio]);
  const graphicsUI = useMemo(() => {
    return { level: contrastRatio >= 3 ? "Pass" : "Fail", passed: contrastRatio >= 3 };
  }, [contrastRatio]);

  const suggestedForeground = useMemo(() => {
    if (contrastRatio >= 4.5) return null;
    return suggestBetterColor(foreground, background);
  }, [foreground, background, contrastRatio]);

  const swapColors = () => {
    const temp = foreground;
    setForeground(background);
    setBackground(temp);
  };

  const copyResults = () => {
    const text = `Contrast Ratio: ${contrastRatio.toFixed(2)}:1
Foreground: ${foreground}
Background: ${background}
Normal Text: WCAG ${normalText.level}
Large Text: WCAG ${largeText.level}
UI Components: ${graphicsUI.level}`;
    navigator.clipboard.writeText(text);
    toast({ title: "Copied!", description: "Results copied to clipboard" });
  };

  if (!canUseAdvancedTools) {
    return (
      <MainLayout>
        <div className="p-4 lg:p-8 min-h-screen">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary mb-4">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl lg:text-4xl font-display font-bold mb-2">
                Color Contrast Checker
              </h1>
              <p className="text-muted-foreground text-lg">
                WCAG accessibility compliance tool
              </p>
            </div>
            
            <LockedFeatureOverlay feature="Color Contrast Checker" />
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="p-4 lg:p-8 min-h-screen">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary mb-4">
              <Eye className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl lg:text-3xl font-display font-bold mb-2">Color Contrast Checker</h1>
            <p className="text-muted-foreground">Check WCAG 2.1 accessibility compliance for your color combinations</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Color Inputs */}
            <Card className="p-6 space-y-6">
              <div className="space-y-4">
                <div>
                  <Label className="mb-2 block">Foreground (Text) Color</Label>
                  <div className="flex gap-2">
                    <div 
                      className="w-12 h-12 rounded-lg border-2 cursor-pointer flex-shrink-0"
                      style={{ backgroundColor: foreground }}
                    />
                    <Input
                      value={foreground}
                      onChange={(e) => setForeground(e.target.value)}
                      className="font-mono"
                      placeholder="#000000"
                    />
                    <Input
                      type="color"
                      value={foreground}
                      onChange={(e) => setForeground(e.target.value)}
                      className="w-12 h-12 p-1 cursor-pointer"
                    />
                  </div>
                </div>

                <div className="flex justify-center">
                  <Button variant="outline" size="icon" onClick={swapColors}>
                    <RefreshCw className="w-4 h-4" />
                  </Button>
                </div>

                <div>
                  <Label className="mb-2 block">Background Color</Label>
                  <div className="flex gap-2">
                    <div 
                      className="w-12 h-12 rounded-lg border-2 cursor-pointer flex-shrink-0"
                      style={{ backgroundColor: background }}
                    />
                    <Input
                      value={background}
                      onChange={(e) => setBackground(e.target.value)}
                      className="font-mono"
                      placeholder="#FFFFFF"
                    />
                    <Input
                      type="color"
                      value={background}
                      onChange={(e) => setBackground(e.target.value)}
                      className="w-12 h-12 p-1 cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Preview */}
              <div 
                className="p-8 rounded-xl text-center space-y-4"
                style={{ backgroundColor: background }}
              >
                <p 
                  className="text-3xl font-bold"
                  style={{ color: foreground }}
                >
                  Sample Text
                </p>
                <p 
                  className="text-lg"
                  style={{ color: foreground }}
                >
                  This is how your text will look
                </p>
                <p 
                  className="text-sm"
                  style={{ color: foreground }}
                >
                  Small text is harder to read with low contrast
                </p>
                <button
                  className="px-6 py-2 rounded-lg font-medium border-2"
                  style={{ 
                    borderColor: foreground, 
                    color: foreground 
                  }}
                >
                  Button Example
                </button>
              </div>
            </Card>

            {/* Results */}
            <div className="space-y-6">
              {/* Contrast Ratio */}
              <Card className="p-6">
                <div className="text-center mb-6">
                  <p className="text-sm text-muted-foreground mb-2">Contrast Ratio</p>
                  <p className={`text-5xl font-bold ${contrastRatio >= 4.5 ? 'text-green-500' : contrastRatio >= 3 ? 'text-yellow-500' : 'text-red-500'}`}>
                    {contrastRatio.toFixed(2)}:1
                  </p>
                </div>

                {/* WCAG Results */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                    <div>
                      <p className="font-medium">Normal Text</p>
                      <p className="text-sm text-muted-foreground">14px regular / 18px bold</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={normalText.passed ? "default" : "destructive"}>
                        {normalText.level}
                      </Badge>
                      {normalText.passed ? (
                        <Check className="w-5 h-5 text-green-500" />
                      ) : (
                        <X className="w-5 h-5 text-red-500" />
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                    <div>
                      <p className="font-medium">Large Text</p>
                      <p className="text-sm text-muted-foreground">18px+ regular / 14px+ bold</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={largeText.passed ? "default" : "destructive"}>
                        {largeText.level}
                      </Badge>
                      {largeText.passed ? (
                        <Check className="w-5 h-5 text-green-500" />
                      ) : (
                        <X className="w-5 h-5 text-red-500" />
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                    <div>
                      <p className="font-medium">UI Components</p>
                      <p className="text-sm text-muted-foreground">Icons, borders, controls</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={graphicsUI.passed ? "default" : "destructive"}>
                        {graphicsUI.level}
                      </Badge>
                      {graphicsUI.passed ? (
                        <Check className="w-5 h-5 text-green-500" />
                      ) : (
                        <X className="w-5 h-5 text-red-500" />
                      )}
                    </div>
                  </div>
                </div>

                <Button onClick={copyResults} className="w-full mt-4">
                  <Copy className="w-4 h-4 mr-2" /> Copy Results
                </Button>
              </Card>

              {/* Suggestions */}
              {suggestedForeground && (
                <Card className="p-6 border-amber-200 bg-amber-50/50 dark:bg-amber-950/20">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <h3 className="font-semibold mb-2">Accessibility Suggestion</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Your current combination doesn't meet WCAG AA standards. 
                        Try this suggested color instead:
                      </p>
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-12 h-12 rounded-lg border"
                          style={{ backgroundColor: suggestedForeground }}
                        />
                        <div>
                          <p className="font-mono font-medium">{suggestedForeground.toUpperCase()}</p>
                          <p className="text-sm text-muted-foreground">
                            Ratio: {getContrastRatio(suggestedForeground, background).toFixed(2)}:1
                          </p>
                        </div>
                        <Button 
                          size="sm"
                          onClick={() => setForeground(suggestedForeground)}
                        >
                          Apply
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              )}

              {/* WCAG Info */}
              <Card className="p-6">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  WCAG 2.1 Guidelines
                </h3>
                <div className="text-sm text-muted-foreground space-y-2">
                  <p><strong>Level AA:</strong> Minimum 4.5:1 for normal text, 3:1 for large text</p>
                  <p><strong>Level AAA:</strong> Enhanced 7:1 for normal text, 4.5:1 for large text</p>
                  <p><strong>UI Components:</strong> Minimum 3:1 for graphical objects and controls</p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
