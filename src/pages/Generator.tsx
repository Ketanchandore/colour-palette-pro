import { useState, useCallback } from "react";
import { RefreshCw, Lock, Unlock, Copy, Download, Save, Check } from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type HarmonyMode = "random" | "complementary" | "analogous" | "triadic" | "split";

interface ColorState {
  hex: string;
  locked: boolean;
}

function generateRandomColor(): string {
  const hue = Math.floor(Math.random() * 360);
  const saturation = 60 + Math.floor(Math.random() * 30);
  const lightness = 45 + Math.floor(Math.random() * 25);
  return hslToHex(hue, saturation, lightness);
}

function hslToHex(h: number, s: number, l: number): string {
  s /= 100;
  l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`.toUpperCase();
}

function hexToHsl(hex: string): { h: number; s: number; l: number } {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
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
}

function generateHarmonyPalette(baseColor: string, mode: HarmonyMode): string[] {
  if (mode === "random") {
    return Array(5).fill(null).map(() => generateRandomColor());
  }

  const { h, s, l } = hexToHsl(baseColor);
  
  switch (mode) {
    case "complementary":
      return [
        hslToHex(h, s, l),
        hslToHex((h + 30) % 360, s, l + 10),
        hslToHex((h + 180) % 360, s, l),
        hslToHex((h + 210) % 360, s, l + 10),
        hslToHex((h + 180) % 360, s - 20, l - 10),
      ];
    case "analogous":
      return [
        hslToHex((h - 30 + 360) % 360, s, l),
        hslToHex((h - 15 + 360) % 360, s, l + 5),
        hslToHex(h, s, l),
        hslToHex((h + 15) % 360, s, l + 5),
        hslToHex((h + 30) % 360, s, l),
      ];
    case "triadic":
      return [
        hslToHex(h, s, l),
        hslToHex((h + 60) % 360, s - 10, l + 10),
        hslToHex((h + 120) % 360, s, l),
        hslToHex((h + 180) % 360, s - 10, l + 10),
        hslToHex((h + 240) % 360, s, l),
      ];
    case "split":
      return [
        hslToHex(h, s, l),
        hslToHex((h + 150) % 360, s, l),
        hslToHex((h + 180) % 360, s - 20, l + 15),
        hslToHex((h + 210) % 360, s, l),
        hslToHex((h + 30) % 360, s - 10, l + 10),
      ];
    default:
      return Array(5).fill(null).map(() => generateRandomColor());
  }
}

export default function Generator() {
  const { user } = useAuth();
  const [colors, setColors] = useState<ColorState[]>(() =>
    Array(5).fill(null).map(() => ({ hex: generateRandomColor(), locked: false }))
  );
  const [harmonyMode, setHarmonyMode] = useState<HarmonyMode>("random");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);

  const generateNewPalette = useCallback(() => {
    const baseColor = colors[0].locked ? colors[0].hex : generateRandomColor();
    const newColors = generateHarmonyPalette(baseColor, harmonyMode);
    
    setColors((prev) =>
      prev.map((color, index) =>
        color.locked ? color : { hex: newColors[index], locked: false }
      )
    );
  }, [colors, harmonyMode]);

  const toggleLock = (index: number) => {
    setColors((prev) =>
      prev.map((color, i) =>
        i === index ? { ...color, locked: !color.locked } : color
      )
    );
  };

  const copyColor = async (hex: string, index: number) => {
    await navigator.clipboard.writeText(hex);
    setCopiedIndex(index);
    toast.success(`Copied ${hex}`);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const copyAllColors = async () => {
    const allColors = colors.map((c) => c.hex).join(", ");
    await navigator.clipboard.writeText(allColors);
    toast.success("All colors copied!");
  };

  const exportAsCSS = () => {
    const css = colors
      .map((c, i) => `--color-${i + 1}: ${c.hex};`)
      .join("\n");
    navigator.clipboard.writeText(`:root {\n${css}\n}`);
    toast.success("CSS variables copied!");
  };

  const savePalette = async () => {
    if (!user) {
      toast.error("Please sign in to save palettes");
      return;
    }

    setSaving(true);
    try {
      const { error } = await supabase.from("palettes").insert({
        name: `Palette ${new Date().toLocaleDateString()}`,
        colors: colors.map((c) => c.hex),
        created_by: user.id,
      });

      if (error) throw error;
      toast.success("Palette saved!");
    } catch (error) {
      toast.error("Failed to save palette");
    } finally {
      setSaving(false);
    }
  };

  return (
    <MainLayout>
      <div className="p-6 lg:p-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground">
              Palette Generator
            </h1>
            <p className="text-muted-foreground mt-1">
              Press space or click generate for new colors
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Select
              value={harmonyMode}
              onValueChange={(value) => setHarmonyMode(value as HarmonyMode)}
            >
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Harmony" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="random">Random</SelectItem>
                <SelectItem value="complementary">Complementary</SelectItem>
                <SelectItem value="analogous">Analogous</SelectItem>
                <SelectItem value="triadic">Triadic</SelectItem>
                <SelectItem value="split">Split</SelectItem>
              </SelectContent>
            </Select>

            <Button
              onClick={generateNewPalette}
              className="gradient-primary text-white hover:opacity-90"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Generate
            </Button>
          </div>
        </div>

        {/* Color Strips */}
        <div className="flex h-[400px] rounded-3xl overflow-hidden shadow-glow-lg">
          {colors.map((color, index) => (
            <div
              key={index}
              className="flex-1 relative group transition-all duration-300 hover:flex-[1.5] cursor-pointer"
              style={{ backgroundColor: color.hex }}
              onClick={() => copyColor(color.hex, index)}
            >
              {/* Controls Overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                <div className="flex flex-col items-center gap-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLock(index);
                    }}
                    className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
                  >
                    {color.locked ? (
                      <Lock className="w-5 h-5 text-white" />
                    ) : (
                      <Unlock className="w-5 h-5 text-white" />
                    )}
                  </button>

                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    {copiedIndex === index ? (
                      <Check className="w-5 h-5 text-white" />
                    ) : (
                      <Copy className="w-5 h-5 text-white" />
                    )}
                  </div>
                </div>
              </div>

              {/* Color Info */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center">
                <p className="text-white font-mono font-bold text-lg drop-shadow-lg">
                  {color.hex}
                </p>
                {color.locked && (
                  <Lock className="w-4 h-4 text-white mx-auto mt-2" />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex flex-wrap justify-center gap-3">
          <Button variant="outline" onClick={copyAllColors}>
            <Copy className="w-4 h-4 mr-2" />
            Copy All
          </Button>
          <Button variant="outline" onClick={exportAsCSS}>
            <Download className="w-4 h-4 mr-2" />
            Export CSS
          </Button>
          <Button
            onClick={savePalette}
            disabled={saving}
            className="gradient-primary text-white hover:opacity-90"
          >
            <Save className="w-4 h-4 mr-2" />
            {saving ? "Saving..." : "Save Palette"}
          </Button>
        </div>

        {/* Color Details */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {colors.map((color, index) => (
            <div
              key={index}
              className="bg-card rounded-xl p-4 border border-border"
            >
              <div
                className="w-full h-16 rounded-lg mb-3"
                style={{ backgroundColor: color.hex }}
              />
              <p className="font-mono text-sm font-medium">{color.hex}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {(() => {
                  const { h, s, l } = hexToHsl(color.hex);
                  return `HSL(${h}, ${s}%, ${l}%)`;
                })()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
