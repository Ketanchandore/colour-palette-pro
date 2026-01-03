import { useState } from "react";
import { Wrench, Pipette, Contrast, Palette, ArrowRightLeft, Layers } from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type ActiveTool = "picker" | "contrast" | "gradient" | "converter" | "shades";

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 0, g: 0, b: 0 };
}

function rgbToHex(r: number, g: number, b: number): string {
  return (
    "#" +
    [r, g, b]
      .map((x) => {
        const hex = Math.max(0, Math.min(255, Math.round(x))).toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("")
      .toUpperCase()
  );
}

function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h = 0,
    s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

function getLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    c /= 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function getContrastRatio(hex1: string, hex2: string): number {
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);
  const l1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
  const l2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

function generateShades(hex: string): string[] {
  const { r, g, b } = hexToRgb(hex);
  const shades: string[] = [];

  for (let i = 0; i <= 10; i++) {
    const factor = i / 10;
    shades.push(
      rgbToHex(
        r + (255 - r) * (1 - factor),
        g + (255 - g) * (1 - factor),
        b + (255 - b) * (1 - factor)
      )
    );
  }

  return shades.reverse();
}

const tools = [
  { id: "picker", name: "Color Picker", icon: Pipette },
  { id: "contrast", name: "Contrast Checker", icon: Contrast },
  { id: "gradient", name: "Gradient Generator", icon: Palette },
  { id: "converter", name: "Color Converter", icon: ArrowRightLeft },
  { id: "shades", name: "Shade Generator", icon: Layers },
];

export default function Tools() {
  const [activeTool, setActiveTool] = useState<ActiveTool>("picker");
  const [color, setColor] = useState("#A05AFF");
  const [color2, setColor2] = useState("#1BCFB4");
  const [gradientAngle, setGradientAngle] = useState(135);

  const rgb = hexToRgb(color);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  const contrastRatio = getContrastRatio(color, color2);
  const shades = generateShades(color);
  const gradientCSS = `linear-gradient(${gradientAngle}deg, ${color}, ${color2})`;

  const getWCAGLevel = (ratio: number): { level: string; color: string } => {
    if (ratio >= 7) return { level: "AAA", color: "text-green-500" };
    if (ratio >= 4.5) return { level: "AA", color: "text-yellow-500" };
    if (ratio >= 3) return { level: "AA Large", color: "text-orange-500" };
    return { level: "Fail", color: "text-red-500" };
  };

  const wcag = getWCAGLevel(contrastRatio);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied!");
  };

  return (
    <MainLayout>
      <div className="p-6 lg:p-8 space-y-8">
        {/* Header */}
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl gradient-card-coral flex items-center justify-center">
              <Wrench className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-3xl font-display font-bold text-foreground">
              Color Tools
            </h1>
          </div>
          <p className="text-muted-foreground">
            Useful utilities for working with colors
          </p>
        </div>

        {/* Tool Selector */}
        <div className="flex flex-wrap gap-2">
          {tools.map((tool) => (
            <Button
              key={tool.id}
              variant={activeTool === tool.id ? "default" : "outline"}
              onClick={() => setActiveTool(tool.id as ActiveTool)}
              className={activeTool === tool.id ? "gradient-primary text-white" : ""}
            >
              <tool.icon className="w-4 h-4 mr-2" />
              {tool.name}
            </Button>
          ))}
        </div>

        {/* Tool Content */}
        <div className="bg-card rounded-2xl border border-border p-6">
          {activeTool === "picker" && (
            <div className="space-y-6">
              <h2 className="text-xl font-display font-bold">Color Picker</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <div
                    className="w-full aspect-square rounded-2xl mb-4 shadow-glow-md"
                    style={{ backgroundColor: color }}
                  />
                  <Input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value.toUpperCase())}
                    className="w-full h-12 cursor-pointer"
                  />
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>HEX</Label>
                    <div className="flex gap-2">
                      <Input value={color} readOnly />
                      <Button variant="outline" onClick={() => copyToClipboard(color)}>
                        Copy
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>RGB</Label>
                    <div className="flex gap-2">
                      <Input value={`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`} readOnly />
                      <Button
                        variant="outline"
                        onClick={() => copyToClipboard(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`)}
                      >
                        Copy
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>HSL</Label>
                    <div className="flex gap-2">
                      <Input value={`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`} readOnly />
                      <Button
                        variant="outline"
                        onClick={() => copyToClipboard(`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`)}
                      >
                        Copy
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTool === "contrast" && (
            <div className="space-y-6">
              <h2 className="text-xl font-display font-bold">Contrast Checker</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Foreground Color</Label>
                    <div className="flex gap-2">
                      <div
                        className="w-12 h-10 rounded-lg border"
                        style={{ backgroundColor: color }}
                      />
                      <Input
                        type="text"
                        value={color}
                        onChange={(e) => setColor(e.target.value.toUpperCase())}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Background Color</Label>
                    <div className="flex gap-2">
                      <div
                        className="w-12 h-10 rounded-lg border"
                        style={{ backgroundColor: color2 }}
                      />
                      <Input
                        type="text"
                        value={color2}
                        onChange={(e) => setColor2(e.target.value.toUpperCase())}
                      />
                    </div>
                  </div>
                </div>

                <div
                  className="rounded-2xl p-8 flex flex-col items-center justify-center"
                  style={{ backgroundColor: color2 }}
                >
                  <p className="text-4xl font-bold" style={{ color }}>
                    Aa
                  </p>
                  <p className="mt-2 text-sm" style={{ color }}>
                    Sample Text
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-muted rounded-xl">
                <div>
                  <p className="text-sm text-muted-foreground">Contrast Ratio</p>
                  <p className="text-2xl font-bold">{contrastRatio.toFixed(2)}:1</p>
                </div>
                <div className={cn("text-2xl font-bold", wcag.color)}>
                  {wcag.level}
                </div>
              </div>
            </div>
          )}

          {activeTool === "gradient" && (
            <div className="space-y-6">
              <h2 className="text-xl font-display font-bold">Gradient Generator</h2>
              <div
                className="w-full h-48 rounded-2xl shadow-glow-md"
                style={{ background: gradientCSS }}
              />
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label>Color 1</Label>
                  <Input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value.toUpperCase())}
                    className="h-12 cursor-pointer"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Color 2</Label>
                  <Input
                    type="color"
                    value={color2}
                    onChange={(e) => setColor2(e.target.value.toUpperCase())}
                    className="h-12 cursor-pointer"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Angle: {gradientAngle}°</Label>
                  <Slider
                    value={[gradientAngle]}
                    onValueChange={([value]) => setGradientAngle(value)}
                    min={0}
                    max={360}
                    step={1}
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Input value={gradientCSS} readOnly className="flex-1" />
                <Button variant="outline" onClick={() => copyToClipboard(gradientCSS)}>
                  Copy CSS
                </Button>
              </div>
            </div>
          )}

          {activeTool === "converter" && (
            <div className="space-y-6">
              <h2 className="text-xl font-display font-bold">Color Converter</h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Enter Color (HEX)</Label>
                  <Input
                    type="text"
                    value={color}
                    onChange={(e) => setColor(e.target.value.toUpperCase())}
                    placeholder="#A05AFF"
                  />
                </div>

                <div
                  className="w-full h-32 rounded-2xl"
                  style={{ backgroundColor: color }}
                />

                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { label: "HEX", value: color },
                    { label: "RGB", value: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` },
                    { label: "HSL", value: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` },
                    {
                      label: "RGB Values",
                      value: `R: ${rgb.r}, G: ${rgb.g}, B: ${rgb.b}`,
                    },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center justify-between p-4 bg-muted rounded-xl"
                    >
                      <div>
                        <p className="text-xs text-muted-foreground">{item.label}</p>
                        <p className="font-mono">{item.value}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(item.value)}
                      >
                        Copy
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTool === "shades" && (
            <div className="space-y-6">
              <h2 className="text-xl font-display font-bold">Shade Generator</h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Base Color</Label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      value={color}
                      onChange={(e) => setColor(e.target.value.toUpperCase())}
                      className="w-20 h-12 cursor-pointer"
                    />
                    <Input
                      type="text"
                      value={color}
                      onChange={(e) => setColor(e.target.value.toUpperCase())}
                      className="flex-1"
                    />
                  </div>
                </div>

                <div className="flex rounded-2xl overflow-hidden">
                  {shades.map((shade, i) => (
                    <button
                      key={i}
                      className="flex-1 h-24 transition-all hover:flex-[1.5] group relative"
                      style={{ backgroundColor: shade }}
                      onClick={() => copyToClipboard(shade)}
                    >
                      <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 text-white px-1 py-0.5 rounded">
                        {shade}
                      </span>
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-5 md:grid-cols-11 gap-2">
                  {shades.map((shade, i) => (
                    <button
                      key={i}
                      onClick={() => copyToClipboard(shade)}
                      className="p-2 rounded-lg bg-muted hover:bg-muted/80 text-center transition-colors"
                    >
                      <div
                        className="w-full aspect-square rounded mb-1"
                        style={{ backgroundColor: shade }}
                      />
                      <p className="text-[10px] font-mono truncate">{shade}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
