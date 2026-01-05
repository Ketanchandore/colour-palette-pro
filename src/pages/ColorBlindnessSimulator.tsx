import { useState, useMemo } from "react";
import { Eye, EyeOff, Copy, Upload, Info } from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

type ColorBlindnessType = "normal" | "protanopia" | "deuteranopia" | "tritanopia" | "achromatopsia";

interface SimulationType {
  id: ColorBlindnessType;
  name: string;
  description: string;
  percentage: string;
}

const simulationTypes: SimulationType[] = [
  { id: "normal", name: "Normal Vision", description: "How most people see colors", percentage: "~92%" },
  { id: "protanopia", name: "Protanopia", description: "Red-blind (no red cones)", percentage: "~1% of men" },
  { id: "deuteranopia", name: "Deuteranopia", description: "Green-blind (no green cones)", percentage: "~6% of men" },
  { id: "tritanopia", name: "Tritanopia", description: "Blue-blind (no blue cones)", percentage: "~0.01%" },
  { id: "achromatopsia", name: "Achromatopsia", description: "Complete color blindness", percentage: "~0.003%" },
];

// Color blindness simulation matrices
function simulateColorBlindness(hex: string, type: ColorBlindnessType): string {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;

  let simR: number, simG: number, simB: number;

  switch (type) {
    case "protanopia":
      simR = 0.567 * r + 0.433 * g + 0.0 * b;
      simG = 0.558 * r + 0.442 * g + 0.0 * b;
      simB = 0.0 * r + 0.242 * g + 0.758 * b;
      break;
    case "deuteranopia":
      simR = 0.625 * r + 0.375 * g + 0.0 * b;
      simG = 0.7 * r + 0.3 * g + 0.0 * b;
      simB = 0.0 * r + 0.3 * g + 0.7 * b;
      break;
    case "tritanopia":
      simR = 0.95 * r + 0.05 * g + 0.0 * b;
      simG = 0.0 * r + 0.433 * g + 0.567 * b;
      simB = 0.0 * r + 0.475 * g + 0.525 * b;
      break;
    case "achromatopsia":
      const gray = 0.299 * r + 0.587 * g + 0.114 * b;
      simR = simG = simB = gray;
      break;
    default:
      simR = r;
      simG = g;
      simB = b;
  }

  const toHex = (n: number) => {
    const val = Math.round(Math.max(0, Math.min(1, n)) * 255);
    return val.toString(16).padStart(2, "0");
  };

  return `#${toHex(simR)}${toHex(simG)}${toHex(simB)}`.toUpperCase();
}

const defaultPalette = ["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF", "#00FFFF"];

export default function ColorBlindnessSimulator() {
  const [colors, setColors] = useState<string[]>(defaultPalette);
  const [activeType, setActiveType] = useState<ColorBlindnessType>("protanopia");
  const [newColor, setNewColor] = useState("#A05AFF");

  const simulatedColors = useMemo(() => {
    return colors.map((color) => ({
      original: color,
      simulated: simulateColorBlindness(color, activeType),
    }));
  }, [colors, activeType]);

  const addColor = () => {
    if (colors.length >= 10) {
      toast.error("Maximum 10 colors allowed");
      return;
    }
    if (colors.includes(newColor.toUpperCase())) {
      toast.error("Color already exists");
      return;
    }
    setColors([...colors, newColor.toUpperCase()]);
    toast.success("Color added!");
  };

  const removeColor = (index: number) => {
    setColors(colors.filter((_, i) => i !== index));
  };

  const copyColor = (color: string) => {
    navigator.clipboard.writeText(color);
    toast.success(`Copied ${color}`);
  };

  const resetPalette = () => {
    setColors(defaultPalette);
    toast.success("Palette reset!");
  };

  return (
    <MainLayout>
      <div className="p-6 lg:p-8 space-y-8">
        {/* Header */}
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl gradient-card-coral flex items-center justify-center">
              <Eye className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-3xl font-display font-bold text-foreground">
              Color Blindness Simulator
            </h1>
          </div>
          <p className="text-muted-foreground">
            Check how your colors appear to people with different types of color vision deficiency
          </p>
        </div>

        {/* Info Banner */}
        <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 flex gap-3">
          <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-medium text-foreground mb-1">Why accessibility matters</p>
            <p className="text-muted-foreground">
              About 8% of men and 0.5% of women have some form of color vision deficiency. 
              Testing your designs ensures everyone can use your product effectively.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Color Input */}
          <div className="space-y-6">
            <div className="bg-card rounded-2xl border border-border p-6 space-y-4">
              <h2 className="font-display font-bold text-lg">Your Palette</h2>

              <div className="flex gap-2">
                <Input
                  type="color"
                  value={newColor}
                  onChange={(e) => setNewColor(e.target.value)}
                  className="w-16 h-10 cursor-pointer"
                />
                <Input
                  value={newColor}
                  onChange={(e) => setNewColor(e.target.value)}
                  className="flex-1 font-mono"
                />
                <Button onClick={addColor} size="sm">Add</Button>
              </div>

              <div className="space-y-2">
                {colors.map((color, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-2 rounded-lg bg-muted/50 group"
                  >
                    <div
                      className="w-10 h-10 rounded-lg shadow-sm"
                      style={{ backgroundColor: color }}
                    />
                    <span className="font-mono flex-1">{color}</span>
                    <button
                      onClick={() => copyColor(color)}
                      className="p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => removeColor(i)}
                      className="p-1.5 text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>

              <Button variant="outline" size="sm" onClick={resetPalette} className="w-full">
                Reset to Default
              </Button>
            </div>

            {/* Simulation Types */}
            <div className="bg-card rounded-2xl border border-border p-6 space-y-4">
              <h2 className="font-display font-bold text-lg">Simulation Type</h2>
              <div className="space-y-2">
                {simulationTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setActiveType(type.id)}
                    className={`w-full text-left p-3 rounded-xl transition-colors ${
                      activeType === type.id
                        ? "bg-primary/10 border border-primary/30"
                        : "bg-muted/50 hover:bg-muted"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{type.name}</span>
                      <span className="text-xs text-muted-foreground">{type.percentage}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{type.description}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Comparison View */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-card rounded-2xl border border-border p-6">
              <h2 className="font-display font-bold text-lg mb-6">Side-by-Side Comparison</h2>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Original */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Eye className="w-4 h-4" />
                    <h3 className="font-semibold">Normal Vision</h3>
                  </div>
                  <div className="flex rounded-xl overflow-hidden h-24">
                    {colors.map((color, i) => (
                      <div
                        key={i}
                        className="flex-1"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>

                {/* Simulated */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <EyeOff className="w-4 h-4" />
                    <h3 className="font-semibold">
                      {simulationTypes.find((t) => t.id === activeType)?.name}
                    </h3>
                  </div>
                  <div className="flex rounded-xl overflow-hidden h-24">
                    {simulatedColors.map((item, i) => (
                      <div
                        key={i}
                        className="flex-1"
                        style={{ backgroundColor: item.simulated }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Comparison */}
            <div className="bg-card rounded-2xl border border-border p-6">
              <h2 className="font-display font-bold text-lg mb-6">Detailed Color Changes</h2>
              
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                {simulatedColors.map((item, i) => (
                  <div key={i} className="bg-muted/30 rounded-xl p-4">
                    <div className="flex gap-3 mb-3">
                      <div className="space-y-1">
                        <div
                          className="w-12 h-12 rounded-lg shadow-sm"
                          style={{ backgroundColor: item.original }}
                        />
                        <p className="text-[10px] text-center text-muted-foreground">Original</p>
                      </div>
                      <div className="flex items-center text-muted-foreground">→</div>
                      <div className="space-y-1">
                        <div
                          className="w-12 h-12 rounded-lg shadow-sm"
                          style={{ backgroundColor: item.simulated }}
                        />
                        <p className="text-[10px] text-center text-muted-foreground">Simulated</p>
                      </div>
                    </div>
                    <div className="space-y-1 text-xs">
                      <button
                        onClick={() => copyColor(item.original)}
                        className="flex items-center justify-between w-full p-1.5 rounded bg-muted/50 hover:bg-muted"
                      >
                        <span className="font-mono">{item.original}</span>
                        <Copy className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => copyColor(item.simulated)}
                        className="flex items-center justify-between w-full p-1.5 rounded bg-muted/50 hover:bg-muted"
                      >
                        <span className="font-mono">{item.simulated}</span>
                        <Copy className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tips */}
            <div className="bg-card rounded-2xl border border-border p-6">
              <h2 className="font-display font-bold text-lg mb-4">Accessibility Tips</h2>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  Don't rely solely on color to convey information - use icons, patterns, or text labels
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  Ensure sufficient contrast between foreground and background colors (WCAG AA: 4.5:1)
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  Avoid red-green color combinations as the primary way to differentiate elements
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  Use blue-orange or blue-yellow combinations which are safer for most color blind users
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
