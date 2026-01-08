import { useState, useMemo } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  RefreshCw, 
  Copy, 
  Plus, 
  Trash2,
  Monitor,
  Printer,
  Smartphone,
  Palette,
  AlertTriangle,
  Check
} from "lucide-react";
import { toast } from "sonner";

interface ColorSpace {
  hex: string;
  rgb: { r: number; g: number; b: number };
  hsl: { h: number; s: number; l: number };
  cmyk: { c: number; m: number; y: number; k: number };
  lab: { l: number; a: number; b: number };
}

// Color conversion functions
const hexToRgb = (hex: string): { r: number; g: number; b: number } => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : { r: 0, g: 0, b: 0 };
};

const rgbToHex = (r: number, g: number, b: number): string => {
  return "#" + [r, g, b].map(x => Math.round(x).toString(16).padStart(2, '0')).join('');
};

const rgbToHsl = (r: number, g: number, b: number): { h: number; s: number; l: number } => {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;

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
};

const rgbToCmyk = (r: number, g: number, b: number): { c: number; m: number; y: number; k: number } => {
  r /= 255; g /= 255; b /= 255;
  const k = 1 - Math.max(r, g, b);
  if (k === 1) return { c: 0, m: 0, y: 0, k: 100 };
  
  return {
    c: Math.round(((1 - r - k) / (1 - k)) * 100),
    m: Math.round(((1 - g - k) / (1 - k)) * 100),
    y: Math.round(((1 - b - k) / (1 - k)) * 100),
    k: Math.round(k * 100)
  };
};

const rgbToLab = (r: number, g: number, b: number): { l: number; a: number; b: number } => {
  // RGB to XYZ
  let rr = r / 255, gg = g / 255, bb = b / 255;
  
  rr = rr > 0.04045 ? Math.pow((rr + 0.055) / 1.055, 2.4) : rr / 12.92;
  gg = gg > 0.04045 ? Math.pow((gg + 0.055) / 1.055, 2.4) : gg / 12.92;
  bb = bb > 0.04045 ? Math.pow((bb + 0.055) / 1.055, 2.4) : bb / 12.92;
  
  const x = (rr * 0.4124 + gg * 0.3576 + bb * 0.1805) / 0.95047;
  const y = (rr * 0.2126 + gg * 0.7152 + bb * 0.0722) / 1.00000;
  const z = (rr * 0.0193 + gg * 0.1192 + bb * 0.9505) / 1.08883;
  
  const fx = x > 0.008856 ? Math.pow(x, 1/3) : (7.787 * x) + 16/116;
  const fy = y > 0.008856 ? Math.pow(y, 1/3) : (7.787 * y) + 16/116;
  const fz = z > 0.008856 ? Math.pow(z, 1/3) : (7.787 * z) + 16/116;
  
  return {
    l: Math.round((116 * fy) - 16),
    a: Math.round(500 * (fx - fy)),
    b: Math.round(200 * (fy - fz))
  };
};

const getColorSpace = (hex: string): ColorSpace => {
  const rgb = hexToRgb(hex);
  return {
    hex,
    rgb,
    hsl: rgbToHsl(rgb.r, rgb.g, rgb.b),
    cmyk: rgbToCmyk(rgb.r, rgb.g, rgb.b),
    lab: rgbToLab(rgb.r, rgb.g, rgb.b)
  };
};

// Check if color is in CMYK gamut (simplified check)
const isInCmykGamut = (rgb: { r: number; g: number; b: number }): boolean => {
  // Very saturated RGB colors may be out of CMYK gamut
  const max = Math.max(rgb.r, rgb.g, rgb.b);
  const min = Math.min(rgb.r, rgb.g, rgb.b);
  const saturation = max === 0 ? 0 : (max - min) / max;
  return saturation < 0.95 || max < 240;
};

export default function ColorSpaceConverter() {
  const [colors, setColors] = useState<string[]>(["#6366F1", "#10B981", "#F59E0B", "#EF4444"]);
  const [newColor, setNewColor] = useState("#6366F1");
  const [inputMode, setInputMode] = useState<"hex" | "rgb" | "hsl">("hex");
  const [rgbInput, setRgbInput] = useState({ r: "99", g: "102", b: "241" });
  const [hslInput, setHslInput] = useState({ h: "239", s: "84", l: "67" });

  const colorSpaces = useMemo(() => colors.map(getColorSpace), [colors]);

  const addColor = () => {
    let hex = newColor;
    
    if (inputMode === "rgb") {
      hex = rgbToHex(
        parseInt(rgbInput.r) || 0,
        parseInt(rgbInput.g) || 0,
        parseInt(rgbInput.b) || 0
      );
    } else if (inputMode === "hsl") {
      // HSL to RGB conversion
      const h = (parseInt(hslInput.h) || 0) / 360;
      const s = (parseInt(hslInput.s) || 0) / 100;
      const l = (parseInt(hslInput.l) || 0) / 100;
      
      let r, g, b;
      if (s === 0) {
        r = g = b = l;
      } else {
        const hue2rgb = (p: number, q: number, t: number) => {
          if (t < 0) t += 1;
          if (t > 1) t -= 1;
          if (t < 1/6) return p + (q - p) * 6 * t;
          if (t < 1/2) return q;
          if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
          return p;
        };
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
      }
      hex = rgbToHex(Math.round(r * 255), Math.round(g * 255), Math.round(b * 255));
    }
    
    if (!colors.includes(hex)) {
      setColors([...colors, hex]);
      toast.success("Color added");
    } else {
      toast.error("Color already in palette");
    }
  };

  const removeColor = (index: number) => {
    setColors(colors.filter((_, i) => i !== index));
  };

  const copyValue = (value: string) => {
    navigator.clipboard.writeText(value);
    toast.success("Copied!");
  };

  const exportPalette = (format: string) => {
    let content = "";
    
    switch (format) {
      case "css":
        content = `:root {\n${colorSpaces.map((c, i) => `  --color-${i + 1}: ${c.hex};`).join('\n')}\n}`;
        break;
      case "scss":
        content = colorSpaces.map((c, i) => `$color-${i + 1}: ${c.hex};`).join('\n');
        break;
      case "json":
        content = JSON.stringify({
          colors: colorSpaces.map(c => ({
            hex: c.hex,
            rgb: c.rgb,
            hsl: c.hsl,
            cmyk: c.cmyk,
            lab: c.lab
          }))
        }, null, 2);
        break;
    }
    
    navigator.clipboard.writeText(content);
    toast.success(`${format.toUpperCase()} copied to clipboard!`);
  };

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary">
            <RefreshCw className="w-4 h-4" />
            <span className="text-sm font-medium">Cross-Platform Color</span>
          </div>
          <h1 className="text-4xl font-bold">Color Space Converter</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Convert colors between sRGB, CMYK, HSL, and LAB. Ensure consistency 
            across web, print, and mobile with gamut warnings.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Color Input */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="w-5 h-5" />
                  Add Color
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Tabs value={inputMode} onValueChange={(v) => setInputMode(v as "hex" | "rgb" | "hsl")}>
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="hex">HEX</TabsTrigger>
                    <TabsTrigger value="rgb">RGB</TabsTrigger>
                    <TabsTrigger value="hsl">HSL</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="hex" className="space-y-4">
                    <div className="flex gap-2">
                      <Input
                        type="color"
                        value={newColor}
                        onChange={(e) => setNewColor(e.target.value)}
                        className="w-12 h-10 p-1 cursor-pointer"
                      />
                      <Input
                        value={newColor}
                        onChange={(e) => setNewColor(e.target.value)}
                        placeholder="#6366F1"
                      />
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="rgb" className="space-y-4">
                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <Label className="text-xs">R</Label>
                        <Input
                          type="number"
                          min="0"
                          max="255"
                          value={rgbInput.r}
                          onChange={(e) => setRgbInput({ ...rgbInput, r: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label className="text-xs">G</Label>
                        <Input
                          type="number"
                          min="0"
                          max="255"
                          value={rgbInput.g}
                          onChange={(e) => setRgbInput({ ...rgbInput, g: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label className="text-xs">B</Label>
                        <Input
                          type="number"
                          min="0"
                          max="255"
                          value={rgbInput.b}
                          onChange={(e) => setRgbInput({ ...rgbInput, b: e.target.value })}
                        />
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="hsl" className="space-y-4">
                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <Label className="text-xs">H</Label>
                        <Input
                          type="number"
                          min="0"
                          max="360"
                          value={hslInput.h}
                          onChange={(e) => setHslInput({ ...hslInput, h: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label className="text-xs">S%</Label>
                        <Input
                          type="number"
                          min="0"
                          max="100"
                          value={hslInput.s}
                          onChange={(e) => setHslInput({ ...hslInput, s: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label className="text-xs">L%</Label>
                        <Input
                          type="number"
                          min="0"
                          max="100"
                          value={hslInput.l}
                          onChange={(e) => setHslInput({ ...hslInput, l: e.target.value })}
                        />
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
                
                <Button onClick={addColor} className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Add to Palette
                </Button>
              </CardContent>
            </Card>

            {/* Export Options */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Export Palette</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start" onClick={() => exportPalette("css")}>
                  <Monitor className="w-4 h-4 mr-2" />
                  CSS Custom Properties
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => exportPalette("scss")}>
                  <Monitor className="w-4 h-4 mr-2" />
                  SCSS Variables
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => exportPalette("json")}>
                  <Smartphone className="w-4 h-4 mr-2" />
                  JSON (All Formats)
                </Button>
              </CardContent>
            </Card>

            {/* Platform Preview */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Platform Preview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <Monitor className="w-5 h-5" />
                  <div>
                    <p className="font-medium">Web (sRGB)</p>
                    <p className="text-xs text-muted-foreground">Standard display colors</p>
                  </div>
                  <Badge variant="secondary" className="ml-auto">
                    <Check className="w-3 h-3 mr-1" />
                    OK
                  </Badge>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <Printer className="w-5 h-5" />
                  <div>
                    <p className="font-medium">Print (CMYK)</p>
                    <p className="text-xs text-muted-foreground">Professional printing</p>
                  </div>
                  {colorSpaces.some(c => !isInCmykGamut(c.rgb)) ? (
                    <Badge variant="destructive" className="ml-auto">
                      <AlertTriangle className="w-3 h-3 mr-1" />
                      Gamut Warning
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="ml-auto">
                      <Check className="w-3 h-3 mr-1" />
                      OK
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <Smartphone className="w-5 h-5" />
                  <div>
                    <p className="font-medium">Mobile (P3)</p>
                    <p className="text-xs text-muted-foreground">Wide gamut displays</p>
                  </div>
                  <Badge variant="secondary" className="ml-auto">
                    <Check className="w-3 h-3 mr-1" />
                    OK
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Color List */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-semibold">Palette Colors</h2>
            
            {colorSpaces.map((color, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    {/* Color Preview */}
                    <div
                      className="w-20 h-20 rounded-xl border-2 flex-shrink-0"
                      style={{ backgroundColor: color.hex }}
                    />
                    
                    {/* Color Values */}
                    <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-3">
                      {/* HEX */}
                      <div className="space-y-1">
                        <Label className="text-xs text-muted-foreground">HEX</Label>
                        <div className="flex items-center gap-1">
                          <code className="text-sm font-mono">{color.hex.toUpperCase()}</code>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => copyValue(color.hex)}
                          >
                            <Copy className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                      
                      {/* RGB */}
                      <div className="space-y-1">
                        <Label className="text-xs text-muted-foreground">RGB</Label>
                        <div className="flex items-center gap-1">
                          <code className="text-sm font-mono">
                            {color.rgb.r}, {color.rgb.g}, {color.rgb.b}
                          </code>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => copyValue(`rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})`)}
                          >
                            <Copy className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                      
                      {/* HSL */}
                      <div className="space-y-1">
                        <Label className="text-xs text-muted-foreground">HSL</Label>
                        <div className="flex items-center gap-1">
                          <code className="text-sm font-mono">
                            {color.hsl.h}°, {color.hsl.s}%, {color.hsl.l}%
                          </code>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => copyValue(`hsl(${color.hsl.h}, ${color.hsl.s}%, ${color.hsl.l}%)`)}
                          >
                            <Copy className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                      
                      {/* CMYK */}
                      <div className="space-y-1">
                        <Label className="text-xs text-muted-foreground flex items-center gap-1">
                          CMYK
                          {!isInCmykGamut(color.rgb) && (
                            <AlertTriangle className="w-3 h-3 text-amber-500" />
                          )}
                        </Label>
                        <div className="flex items-center gap-1">
                          <code className="text-sm font-mono">
                            {color.cmyk.c}, {color.cmyk.m}, {color.cmyk.y}, {color.cmyk.k}
                          </code>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => copyValue(`cmyk(${color.cmyk.c}%, ${color.cmyk.m}%, ${color.cmyk.y}%, ${color.cmyk.k}%)`)}
                          >
                            <Copy className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                      
                      {/* LAB */}
                      <div className="space-y-1">
                        <Label className="text-xs text-muted-foreground">LAB</Label>
                        <div className="flex items-center gap-1">
                          <code className="text-sm font-mono">
                            {color.lab.l}, {color.lab.a}, {color.lab.b}
                          </code>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => copyValue(`lab(${color.lab.l} ${color.lab.a} ${color.lab.b})`)}
                          >
                            <Copy className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    {/* Delete Button */}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeColor(index)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  {/* Gamut Warning */}
                  {!isInCmykGamut(color.rgb) && (
                    <div className="mt-3 p-2 rounded bg-amber-500/10 text-amber-500 text-sm flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" />
                      This color may appear differently in print (CMYK). Consider using a less saturated alternative.
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
            
            {colors.length === 0 && (
              <Card className="p-12 text-center">
                <Palette className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
                <p className="text-muted-foreground">Add colors to see conversions</p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
