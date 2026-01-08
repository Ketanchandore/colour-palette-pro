import { useState, useMemo } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  PieChart, 
  LineChart, 
  Copy, 
  Plus, 
  Trash2,
  Palette,
  Eye,
  Shuffle,
  Download
} from "lucide-react";
import { toast } from "sonner";

interface DataVizColor {
  hex: string;
  name: string;
  semantic?: string;
}

const defaultPalette: DataVizColor[] = [
  { hex: "#6366F1", name: "Primary", semantic: "neutral" },
  { hex: "#10B981", name: "Positive", semantic: "positive" },
  { hex: "#F59E0B", name: "Warning", semantic: "warning" },
  { hex: "#EF4444", name: "Negative", semantic: "negative" },
  { hex: "#8B5CF6", name: "Accent", semantic: "neutral" },
  { hex: "#06B6D4", name: "Info", semantic: "neutral" },
];

const palettePresets = {
  categorical: [
    "#6366F1", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#06B6D4", "#EC4899", "#84CC16"
  ],
  sequential: [
    "#EEF2FF", "#C7D2FE", "#A5B4FC", "#818CF8", "#6366F1", "#4F46E5", "#4338CA", "#3730A3"
  ],
  diverging: [
    "#DC2626", "#F87171", "#FCA5A5", "#FEE2E2", "#DCFCE7", "#86EFAC", "#22C55E", "#16A34A"
  ],
};

// Simulate color blindness
const simulateColorBlindness = (hex: string, type: string): string => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  let newR = r, newG = g, newB = b;

  switch (type) {
    case "protanopia":
      newR = 0.567 * r + 0.433 * g;
      newG = 0.558 * r + 0.442 * g;
      newB = 0.242 * g + 0.758 * b;
      break;
    case "deuteranopia":
      newR = 0.625 * r + 0.375 * g;
      newG = 0.7 * r + 0.3 * g;
      newB = 0.3 * g + 0.7 * b;
      break;
  }

  const toHex = (n: number) => Math.round(Math.min(255, Math.max(0, n))).toString(16).padStart(2, "0");
  return `#${toHex(newR)}${toHex(newG)}${toHex(newB)}`;
};

// Check if two colors are distinguishable
const getColorDistance = (hex1: string, hex2: string): number => {
  const r1 = parseInt(hex1.slice(1, 3), 16);
  const g1 = parseInt(hex1.slice(3, 5), 16);
  const b1 = parseInt(hex1.slice(5, 7), 16);
  const r2 = parseInt(hex2.slice(1, 3), 16);
  const g2 = parseInt(hex2.slice(3, 5), 16);
  const b2 = parseInt(hex2.slice(5, 7), 16);
  
  return Math.sqrt(Math.pow(r1 - r2, 2) + Math.pow(g1 - g2, 2) + Math.pow(b1 - b2, 2));
};

export default function DataVizStudio() {
  const [palette, setPalette] = useState<DataVizColor[]>(defaultPalette);
  const [newColor, setNewColor] = useState("#6366F1");
  const [colorBlindnessType, setColorBlindnessType] = useState("none");

  // Sample data for charts
  const sampleData = [
    { name: "Jan", value: 400, value2: 240 },
    { name: "Feb", value: 300, value2: 139 },
    { name: "Mar", value: 200, value2: 980 },
    { name: "Apr", value: 278, value2: 390 },
    { name: "May", value: 189, value2: 480 },
    { name: "Jun", value: 239, value2: 380 },
  ];

  const pieData = [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
    { name: "Group C", value: 200 },
    { name: "Group D", value: 150 },
    { name: "Group E", value: 100 },
  ];

  // Check accessibility issues
  const accessibilityIssues = useMemo(() => {
    const issues: string[] = [];
    
    for (let i = 0; i < palette.length; i++) {
      for (let j = i + 1; j < palette.length; j++) {
        const distance = getColorDistance(palette[i].hex, palette[j].hex);
        if (distance < 100) {
          issues.push(`${palette[i].name} and ${palette[j].name} may be hard to distinguish`);
        }
        
        // Check in colorblind mode
        const sim1 = simulateColorBlindness(palette[i].hex, "protanopia");
        const sim2 = simulateColorBlindness(palette[j].hex, "protanopia");
        const simDistance = getColorDistance(sim1, sim2);
        if (simDistance < 50) {
          issues.push(`${palette[i].name} and ${palette[j].name} look similar for protanopia`);
        }
      }
    }
    
    return issues;
  }, [palette]);

  const addColor = () => {
    if (palette.length < 12) {
      setPalette([...palette, { hex: newColor, name: `Color ${palette.length + 1}`, semantic: "neutral" }]);
      toast.success("Color added");
    } else {
      toast.error("Maximum 12 colors allowed");
    }
  };

  const removeColor = (index: number) => {
    setPalette(palette.filter((_, i) => i !== index));
  };

  const updateColor = (index: number, hex: string) => {
    const newPalette = [...palette];
    newPalette[index] = { ...newPalette[index], hex };
    setPalette(newPalette);
  };

  const updateSemantic = (index: number, semantic: string) => {
    const newPalette = [...palette];
    newPalette[index] = { ...newPalette[index], semantic };
    setPalette(newPalette);
  };

  const applyPreset = (preset: keyof typeof palettePresets) => {
    setPalette(palettePresets[preset].map((hex, i) => ({
      hex,
      name: `${preset.charAt(0).toUpperCase() + preset.slice(1)} ${i + 1}`,
      semantic: "neutral"
    })));
    toast.success(`Applied ${preset} preset`);
  };

  const shuffleColors = () => {
    const shuffled = [...palette].sort(() => Math.random() - 0.5);
    setPalette(shuffled);
  };

  const copyPalette = () => {
    navigator.clipboard.writeText(palette.map(c => c.hex).join(", "));
    toast.success("Palette copied!");
  };

  const exportAsJSON = () => {
    const json = JSON.stringify({
      name: "Data Visualization Palette",
      colors: palette.map(c => ({
        hex: c.hex,
        name: c.name,
        semantic: c.semantic
      }))
    }, null, 2);
    
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "dataviz-palette.json";
    a.click();
    toast.success("Palette exported!");
  };

  const displayColors = colorBlindnessType === "none" 
    ? palette 
    : palette.map(c => ({ ...c, hex: simulateColorBlindness(c.hex, colorBlindnessType) }));

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary">
            <BarChart3 className="w-4 h-4" />
            <span className="text-sm font-medium">Data Visualization</span>
          </div>
          <h1 className="text-4xl font-bold">Data Viz Palette Studio</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Create colorblind-safe, perceptually uniform palettes for charts and dashboards.
            Define semantic rules and preview on real chart types.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Palette Editor */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="w-5 h-5" />
                  Palette Editor
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Presets */}
                <div className="space-y-2">
                  <Label>Quick Presets</Label>
                  <div className="flex flex-wrap gap-2">
                    <Button size="sm" variant="outline" onClick={() => applyPreset("categorical")}>
                      Categorical
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => applyPreset("sequential")}>
                      Sequential
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => applyPreset("diverging")}>
                      Diverging
                    </Button>
                  </div>
                </div>

                {/* Add Color */}
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
                    className="flex-1"
                  />
                  <Button onClick={addColor} size="icon">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                {/* Color List */}
                <div className="space-y-2 max-h-[400px] overflow-y-auto">
                  {palette.map((color, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 rounded-lg bg-muted/50">
                      <Input
                        type="color"
                        value={color.hex}
                        onChange={(e) => updateColor(index, e.target.value)}
                        className="w-10 h-8 p-0 cursor-pointer border-0"
                      />
                      <Input
                        value={color.name}
                        onChange={(e) => {
                          const newPalette = [...palette];
                          newPalette[index] = { ...newPalette[index], name: e.target.value };
                          setPalette(newPalette);
                        }}
                        className="flex-1 h-8"
                      />
                      <select
                        value={color.semantic}
                        onChange={(e) => updateSemantic(index, e.target.value)}
                        className="h-8 px-2 rounded border text-xs bg-background"
                      >
                        <option value="neutral">Neutral</option>
                        <option value="positive">Positive</option>
                        <option value="negative">Negative</option>
                        <option value="warning">Warning</option>
                      </select>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => removeColor(index)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1" onClick={shuffleColors}>
                    <Shuffle className="w-4 h-4 mr-2" />
                    Shuffle
                  </Button>
                  <Button variant="outline" className="flex-1" onClick={copyPalette}>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                  <Button variant="outline" className="flex-1" onClick={exportAsJSON}>
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Accessibility Check */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Accessibility Check
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Colorblind Simulation</Label>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      size="sm"
                      variant={colorBlindnessType === "none" ? "default" : "outline"}
                      onClick={() => setColorBlindnessType("none")}
                    >
                      Normal
                    </Button>
                    <Button
                      size="sm"
                      variant={colorBlindnessType === "protanopia" ? "default" : "outline"}
                      onClick={() => setColorBlindnessType("protanopia")}
                    >
                      Protanopia
                    </Button>
                    <Button
                      size="sm"
                      variant={colorBlindnessType === "deuteranopia" ? "default" : "outline"}
                      onClick={() => setColorBlindnessType("deuteranopia")}
                    >
                      Deuteranopia
                    </Button>
                  </div>
                </div>

                {accessibilityIssues.length > 0 ? (
                  <div className="space-y-2">
                    <Label className="text-destructive">⚠️ Potential Issues</Label>
                    {accessibilityIssues.map((issue, i) => (
                      <p key={i} className="text-sm text-muted-foreground">{issue}</p>
                    ))}
                  </div>
                ) : (
                  <div className="p-3 rounded-lg bg-green-500/10 text-green-500 text-sm">
                    ✓ All colors appear distinguishable
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Chart Previews */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="bar" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="bar" className="gap-2">
                  <BarChart3 className="w-4 h-4" />
                  Bar Chart
                </TabsTrigger>
                <TabsTrigger value="pie" className="gap-2">
                  <PieChart className="w-4 h-4" />
                  Pie Chart
                </TabsTrigger>
                <TabsTrigger value="line" className="gap-2">
                  <LineChart className="w-4 h-4" />
                  Line Chart
                </TabsTrigger>
              </TabsList>

              <TabsContent value="bar">
                <Card>
                  <CardHeader>
                    <CardTitle>Bar Chart Preview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-end justify-around gap-4 p-4 bg-muted/30 rounded-lg">
                      {sampleData.map((item, i) => (
                        <div key={i} className="flex flex-col items-center gap-2">
                          <div className="flex gap-1">
                            <div
                              className="w-8 rounded-t transition-all"
                              style={{
                                height: `${item.value / 5}px`,
                                backgroundColor: displayColors[0]?.hex || "#6366F1"
                              }}
                            />
                            <div
                              className="w-8 rounded-t transition-all"
                              style={{
                                height: `${item.value2 / 5}px`,
                                backgroundColor: displayColors[1]?.hex || "#10B981"
                              }}
                            />
                          </div>
                          <span className="text-xs text-muted-foreground">{item.name}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-center gap-4 mt-4">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-4 h-4 rounded"
                          style={{ backgroundColor: displayColors[0]?.hex }}
                        />
                        <span className="text-sm">Series A</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div
                          className="w-4 h-4 rounded"
                          style={{ backgroundColor: displayColors[1]?.hex }}
                        />
                        <span className="text-sm">Series B</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="pie">
                <Card>
                  <CardHeader>
                    <CardTitle>Pie Chart Preview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-center gap-8">
                      {/* Simple CSS Pie Chart */}
                      <div className="relative w-48 h-48">
                        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                          {pieData.map((_, i) => {
                            const total = pieData.reduce((sum, d) => sum + d.value, 0);
                            const startAngle = pieData.slice(0, i).reduce((sum, d) => sum + (d.value / total) * 360, 0);
                            const angle = (pieData[i].value / total) * 360;
                            const largeArc = angle > 180 ? 1 : 0;
                            const startRad = (startAngle * Math.PI) / 180;
                            const endRad = ((startAngle + angle) * Math.PI) / 180;
                            const x1 = 50 + 40 * Math.cos(startRad);
                            const y1 = 50 + 40 * Math.sin(startRad);
                            const x2 = 50 + 40 * Math.cos(endRad);
                            const y2 = 50 + 40 * Math.sin(endRad);

                            return (
                              <path
                                key={i}
                                d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArc} 1 ${x2} ${y2} Z`}
                                fill={displayColors[i]?.hex || "#666"}
                                className="transition-all hover:opacity-80"
                              />
                            );
                          })}
                        </svg>
                      </div>
                      {/* Legend */}
                      <div className="space-y-2">
                        {pieData.map((item, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <div
                              className="w-4 h-4 rounded"
                              style={{ backgroundColor: displayColors[i]?.hex }}
                            />
                            <span className="text-sm">{item.name}</span>
                            <Badge variant="secondary" className="ml-2">
                              {item.value}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="line">
                <Card>
                  <CardHeader>
                    <CardTitle>Line Chart Preview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 p-4 bg-muted/30 rounded-lg relative">
                      <svg viewBox="0 0 300 150" className="w-full h-full">
                        {/* Grid lines */}
                        {[0, 1, 2, 3].map((i) => (
                          <line
                            key={i}
                            x1="0"
                            y1={i * 37.5}
                            x2="300"
                            y2={i * 37.5}
                            stroke="currentColor"
                            strokeOpacity="0.1"
                          />
                        ))}
                        {/* Line 1 */}
                        <polyline
                          fill="none"
                          stroke={displayColors[0]?.hex || "#6366F1"}
                          strokeWidth="3"
                          points={sampleData.map((d, i) => `${i * 50 + 25},${150 - d.value / 7}`).join(" ")}
                        />
                        {/* Line 2 */}
                        <polyline
                          fill="none"
                          stroke={displayColors[1]?.hex || "#10B981"}
                          strokeWidth="3"
                          points={sampleData.map((d, i) => `${i * 50 + 25},${150 - d.value2 / 7}`).join(" ")}
                        />
                        {/* Dots */}
                        {sampleData.map((d, i) => (
                          <g key={i}>
                            <circle
                              cx={i * 50 + 25}
                              cy={150 - d.value / 7}
                              r="4"
                              fill={displayColors[0]?.hex || "#6366F1"}
                            />
                            <circle
                              cx={i * 50 + 25}
                              cy={150 - d.value2 / 7}
                              r="4"
                              fill={displayColors[1]?.hex || "#10B981"}
                            />
                          </g>
                        ))}
                      </svg>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Dashboard Preview */}
            <Card>
              <CardHeader>
                <CardTitle>Dashboard Context Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-4 p-4 bg-muted/30 rounded-lg">
                  {displayColors.slice(0, 4).map((color, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-lg text-white"
                      style={{ backgroundColor: color.hex }}
                    >
                      <p className="text-2xl font-bold">{(i + 1) * 234}</p>
                      <p className="text-sm opacity-80">{color.name}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
