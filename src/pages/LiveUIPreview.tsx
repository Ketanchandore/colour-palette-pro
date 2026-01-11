import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { 
  Copy, 
  Check, 
  Monitor, 
  Smartphone, 
  Tablet,
  RefreshCw,
  Download,
  Share2,
  Palette,
  Lock
} from "lucide-react";
import { useSubscription } from "@/hooks/useSubscription";
import { LockedFeatureOverlay } from "@/components/subscription/LockedFeatureOverlay";

const defaultPalette = {
  primary: "#A05AFF",
  secondary: "#1BCFB4",
  accent: "#4BCBEB",
  background: "#FAFAFA",
  text: "#1A1A2E"
};

interface ColorPalette {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
}

export default function LiveUIPreview() {
  const [colors, setColors] = useState<ColorPalette>(defaultPalette);
  const [previewDevice, setPreviewDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [copiedValue, setCopiedValue] = useState<string | null>(null);
  const { canUseAdvancedTools } = useSubscription();

  const updateColor = (key: keyof ColorPalette, value: string) => {
    setColors(prev => ({ ...prev, [key]: value }));
  };

  const randomizeColors = () => {
    const randomHex = () => "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0");
    setColors({
      primary: randomHex(),
      secondary: randomHex(),
      accent: randomHex(),
      background: "#" + (Math.random() > 0.5 ? "FAFAFA" : "1A1A2E"),
      text: "#" + (Math.random() > 0.5 ? "1A1A2E" : "FAFAFA")
    });
  };

  const copyPalette = () => {
    const css = Object.entries(colors)
      .map(([key, value]) => `--color-${key}: ${value};`)
      .join("\n");
    navigator.clipboard.writeText(css);
    toast({
      title: "Palette Copied!",
      description: "CSS variables copied to clipboard"
    });
  };

  const getDeviceWidth = () => {
    switch (previewDevice) {
      case "mobile": return "max-w-[375px]";
      case "tablet": return "max-w-[768px]";
      default: return "max-w-full";
    }
  };

  const getContrastColor = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5 ? "#000000" : "#FFFFFF";
  };

  if (!canUseAdvancedTools) {
    return (
      <MainLayout>
        <div className="p-4 lg:p-8 min-h-screen">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary mb-4">
                <Monitor className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl lg:text-4xl font-display font-bold mb-2">
                Live UI Preview
              </h1>
              <p className="text-muted-foreground text-lg">
                See your palette on real landing page mockups
              </p>
            </div>
            
            <LockedFeatureOverlay feature="Live UI Preview" />
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="p-4 lg:p-8 min-h-screen">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl lg:text-3xl font-display font-bold mb-2">Live UI Preview</h1>
            <p className="text-muted-foreground">See your color palette applied to real UI mockups instantly</p>
          </div>

          <div className="grid lg:grid-cols-[320px_1fr] gap-6">
            {/* Color Controls */}
            <Card className="p-6 h-fit space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold flex items-center gap-2">
                  <Palette className="w-5 h-5 text-primary" />
                  Your Palette
                </h2>
                <Button variant="ghost" size="icon" onClick={randomizeColors}>
                  <RefreshCw className="w-4 h-4" />
                </Button>
              </div>

              {Object.entries(colors).map(([key, value]) => (
                <div key={key} className="space-y-2">
                  <Label className="capitalize text-sm">{key}</Label>
                  <div className="flex gap-2">
                    <div 
                      className="w-10 h-10 rounded-lg border cursor-pointer transition-transform hover:scale-105"
                      style={{ backgroundColor: value }}
                    />
                    <Input
                      type="text"
                      value={value}
                      onChange={(e) => updateColor(key as keyof ColorPalette, e.target.value)}
                      className="font-mono"
                    />
                    <Input
                      type="color"
                      value={value}
                      onChange={(e) => updateColor(key as keyof ColorPalette, e.target.value)}
                      className="w-10 h-10 p-1 cursor-pointer"
                    />
                  </div>
                </div>
              ))}

              <div className="flex gap-2 pt-4">
                <Button onClick={copyPalette} className="flex-1">
                  <Copy className="w-4 h-4 mr-2" /> Copy CSS
                </Button>
                <Button variant="outline" onClick={() => setColors(defaultPalette)}>
                  Reset
                </Button>
              </div>
            </Card>

            {/* Preview Area */}
            <div className="space-y-4">
              {/* Device Selector */}
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <Button 
                    variant={previewDevice === "desktop" ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setPreviewDevice("desktop")}
                  >
                    <Monitor className="w-4 h-4 mr-2" /> Desktop
                  </Button>
                  <Button 
                    variant={previewDevice === "tablet" ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setPreviewDevice("tablet")}
                  >
                    <Tablet className="w-4 h-4 mr-2" /> Tablet
                  </Button>
                  <Button 
                    variant={previewDevice === "mobile" ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setPreviewDevice("mobile")}
                  >
                    <Smartphone className="w-4 h-4 mr-2" /> Mobile
                  </Button>
                </div>
                <Button variant="outline" size="sm">
                  <Share2 className="w-4 h-4 mr-2" /> Share
                </Button>
              </div>

              {/* Preview Templates */}
              <Tabs defaultValue="landing" className="w-full">
                <TabsList className="mb-4">
                  <TabsTrigger value="landing">Landing Page</TabsTrigger>
                  <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                  <TabsTrigger value="mobile-app">Mobile App</TabsTrigger>
                </TabsList>

                <TabsContent value="landing">
                  <Card className={`overflow-hidden mx-auto transition-all ${getDeviceWidth()}`}>
                    {/* Landing Page Mockup */}
                    <div style={{ backgroundColor: colors.background, color: colors.text }}>
                      {/* Nav */}
                      <nav className="p-4 flex items-center justify-between border-b" style={{ borderColor: colors.primary + "20" }}>
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg" style={{ backgroundColor: colors.primary }} />
                          <span className="font-bold">Brand</span>
                        </div>
                        <div className="hidden sm:flex gap-4 text-sm">
                          <span>Features</span>
                          <span>Pricing</span>
                          <span>About</span>
                        </div>
                        <button 
                          className="px-4 py-2 rounded-lg text-sm font-medium"
                          style={{ backgroundColor: colors.primary, color: getContrastColor(colors.primary) }}
                        >
                          Get Started
                        </button>
                      </nav>

                      {/* Hero */}
                      <div className="p-8 lg:p-16 text-center">
                        <Badge 
                          className="mb-4"
                          style={{ backgroundColor: colors.secondary + "20", color: colors.secondary }}
                        >
                          ✨ New Feature
                        </Badge>
                        <h1 className="text-3xl lg:text-5xl font-bold mb-4">
                          Build Something
                          <span style={{ color: colors.primary }}> Amazing</span>
                        </h1>
                        <p className="text-lg opacity-70 max-w-2xl mx-auto mb-8">
                          Create stunning designs with our intuitive platform. 
                          No design skills required.
                        </p>
                        <div className="flex gap-4 justify-center flex-wrap">
                          <button 
                            className="px-6 py-3 rounded-xl font-medium"
                            style={{ backgroundColor: colors.primary, color: getContrastColor(colors.primary) }}
                          >
                            Start Free Trial
                          </button>
                          <button 
                            className="px-6 py-3 rounded-xl font-medium border-2"
                            style={{ borderColor: colors.accent, color: colors.accent }}
                          >
                            Watch Demo
                          </button>
                        </div>
                      </div>

                      {/* Features */}
                      <div className="p-8 grid sm:grid-cols-3 gap-6">
                        {["Fast", "Secure", "Scalable"].map((feature, i) => (
                          <div 
                            key={feature}
                            className="p-6 rounded-xl"
                            style={{ backgroundColor: [colors.primary, colors.secondary, colors.accent][i] + "15" }}
                          >
                            <div 
                              className="w-12 h-12 rounded-lg mb-4"
                              style={{ backgroundColor: [colors.primary, colors.secondary, colors.accent][i] }}
                            />
                            <h3 className="font-semibold mb-2">{feature}</h3>
                            <p className="text-sm opacity-70">
                              Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card>
                </TabsContent>

                <TabsContent value="dashboard">
                  <Card className={`overflow-hidden mx-auto transition-all ${getDeviceWidth()}`}>
                    <div style={{ backgroundColor: colors.background, color: colors.text }} className="min-h-[500px]">
                      {/* Dashboard Header */}
                      <div className="p-4 border-b flex items-center justify-between" style={{ borderColor: colors.primary + "20" }}>
                        <span className="font-bold">Dashboard</span>
                        <div className="flex gap-2">
                          <div className="w-8 h-8 rounded-full" style={{ backgroundColor: colors.secondary }} />
                        </div>
                      </div>

                      <div className="p-6 grid sm:grid-cols-3 gap-4">
                        {[
                          { label: "Revenue", value: "$45,231" },
                          { label: "Users", value: "2,345" },
                          { label: "Orders", value: "1,234" }
                        ].map((stat, i) => (
                          <div 
                            key={stat.label}
                            className="p-4 rounded-xl"
                            style={{ backgroundColor: [colors.primary, colors.secondary, colors.accent][i] + "15" }}
                          >
                            <p className="text-sm opacity-70">{stat.label}</p>
                            <p className="text-2xl font-bold" style={{ color: [colors.primary, colors.secondary, colors.accent][i] }}>
                              {stat.value}
                            </p>
                          </div>
                        ))}
                      </div>

                      {/* Chart Placeholder */}
                      <div className="mx-6 p-6 rounded-xl border" style={{ borderColor: colors.primary + "20" }}>
                        <div className="flex gap-2 items-end h-32">
                          {[60, 80, 40, 90, 70, 50, 85].map((h, i) => (
                            <div 
                              key={i}
                              className="flex-1 rounded-t transition-all hover:opacity-80"
                              style={{ 
                                height: `${h}%`, 
                                backgroundColor: i % 2 === 0 ? colors.primary : colors.secondary 
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>
                </TabsContent>

                <TabsContent value="mobile-app">
                  <Card className="overflow-hidden mx-auto max-w-[375px]">
                    <div style={{ backgroundColor: colors.background, color: colors.text }} className="min-h-[600px]">
                      {/* Mobile Header */}
                      <div className="p-4 text-center border-b" style={{ borderColor: colors.primary + "20" }}>
                        <span className="font-bold">My App</span>
                      </div>

                      {/* Mobile Content */}
                      <div className="p-4 space-y-4">
                        <div 
                          className="p-6 rounded-2xl"
                          style={{ 
                            background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                            color: getContrastColor(colors.primary)
                          }}
                        >
                          <p className="text-sm opacity-80">Balance</p>
                          <p className="text-3xl font-bold">$12,450</p>
                        </div>

                        <div className="grid grid-cols-4 gap-2">
                          {["Send", "Receive", "Top Up", "More"].map((action, i) => (
                            <div key={action} className="text-center">
                              <div 
                                className="w-12 h-12 mx-auto rounded-xl mb-1"
                                style={{ backgroundColor: [colors.primary, colors.secondary, colors.accent, colors.primary][i] + "20" }}
                              />
                              <span className="text-xs">{action}</span>
                            </div>
                          ))}
                        </div>

                        <div className="space-y-2">
                          <p className="font-semibold">Recent</p>
                          {["Coffee Shop", "Groceries", "Subscription"].map((item, i) => (
                            <div key={item} className="flex items-center justify-between p-3 rounded-xl" style={{ backgroundColor: colors.primary + "10" }}>
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full" style={{ backgroundColor: colors.secondary }} />
                                <span>{item}</span>
                              </div>
                              <span className="font-medium">-${[4.50, 52.30, 9.99][i]}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Mobile Nav */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 border-t flex justify-around" style={{ borderColor: colors.primary + "20", backgroundColor: colors.background }}>
                        {["🏠", "📊", "💳", "👤"].map((icon, i) => (
                          <div 
                            key={i} 
                            className="text-2xl p-2 rounded-xl"
                            style={{ backgroundColor: i === 0 ? colors.primary + "20" : "transparent" }}
                          >
                            {icon}
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
