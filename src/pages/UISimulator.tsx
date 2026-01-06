import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { 
  Monitor, 
  Smartphone, 
  LayoutDashboard, 
  Moon, 
  Sun, 
  Copy, 
  Check,
  Plus,
  Trash2,
  RefreshCw
} from "lucide-react";
import { toast } from "sonner";

const defaultPalette = [
  { name: "Primary", hex: "#A05AFF" },
  { name: "Secondary", hex: "#1BCFB4" },
  { name: "Accent", hex: "#4BCBEB" },
  { name: "Background", hex: "#FAFAFA" },
  { name: "Text", hex: "#1a1a2e" },
];

export default function UISimulator() {
  const [colors, setColors] = useState(defaultPalette);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState("landing");

  const updateColor = (index: number, hex: string) => {
    const newColors = [...colors];
    newColors[index].hex = hex;
    setColors(newColors);
  };

  const copyColor = (hex: string, index: number) => {
    navigator.clipboard.writeText(hex);
    setCopiedIndex(index);
    toast.success(`Copied ${hex}`);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const resetPalette = () => {
    setColors(defaultPalette);
    toast.success("Palette reset to default");
  };

  // Dynamic styles based on palette
  const primary = colors[0].hex;
  const secondary = colors[1].hex;
  const accent = colors[2].hex;
  const background = isDarkMode ? "#1a1a2e" : colors[3].hex;
  const text = isDarkMode ? "#FAFAFA" : colors[4].hex;
  const cardBg = isDarkMode ? "#2a2a4e" : "#FFFFFF";

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground">
              UI Simulator
            </h1>
            <p className="text-muted-foreground mt-1">
              Preview your color palette on real UI components instantly
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Sun className="w-4 h-4 text-muted-foreground" />
              <Switch
                checked={isDarkMode}
                onCheckedChange={setIsDarkMode}
              />
              <Moon className="w-4 h-4 text-muted-foreground" />
            </div>
            <Button variant="outline" onClick={resetPalette}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Color Palette Editor */}
          <Card className="lg:col-span-1">
            <CardContent className="p-4 space-y-4">
              <h3 className="font-semibold text-foreground">Your Palette</h3>
              {colors.map((color, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-lg border border-border cursor-pointer"
                    style={{ backgroundColor: color.hex }}
                    onClick={() => copyColor(color.hex, index)}
                  />
                  <div className="flex-1">
                    <Label className="text-xs text-muted-foreground">{color.name}</Label>
                    <Input
                      type="text"
                      value={color.hex}
                      onChange={(e) => updateColor(index, e.target.value)}
                      className="h-8 text-sm font-mono"
                    />
                  </div>
                  <input
                    type="color"
                    value={color.hex}
                    onChange={(e) => updateColor(index, e.target.value)}
                    className="w-8 h-8 rounded cursor-pointer border-0"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => copyColor(color.hex, index)}
                  >
                    {copiedIndex === index ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Preview Area */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="landing" className="gap-2">
                  <Monitor className="w-4 h-4" />
                  Landing Page
                </TabsTrigger>
                <TabsTrigger value="mobile" className="gap-2">
                  <Smartphone className="w-4 h-4" />
                  Mobile App
                </TabsTrigger>
                <TabsTrigger value="dashboard" className="gap-2">
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </TabsTrigger>
              </TabsList>

              {/* Landing Page Preview */}
              <TabsContent value="landing">
                <div 
                  className="rounded-xl border overflow-hidden"
                  style={{ backgroundColor: background }}
                >
                  {/* Navbar */}
                  <div 
                    className="flex items-center justify-between px-6 py-4 border-b"
                    style={{ borderColor: isDarkMode ? "#3a3a5e" : "#e5e5e5" }}
                  >
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-8 h-8 rounded-lg"
                        style={{ backgroundColor: primary }}
                      />
                      <span className="font-bold" style={{ color: text }}>Brand</span>
                    </div>
                    <div className="flex items-center gap-6">
                      {["Features", "Pricing", "About"].map((item) => (
                        <span 
                          key={item} 
                          className="text-sm cursor-pointer hover:opacity-80"
                          style={{ color: text }}
                        >
                          {item}
                        </span>
                      ))}
                      <button
                        className="px-4 py-2 rounded-lg text-sm font-medium text-white"
                        style={{ backgroundColor: primary }}
                      >
                        Get Started
                      </button>
                    </div>
                  </div>

                  {/* Hero Section */}
                  <div className="px-6 py-16 text-center">
                    <h1 
                      className="text-4xl font-bold mb-4"
                      style={{ color: text }}
                    >
                      Build Something <span style={{ color: primary }}>Amazing</span>
                    </h1>
                    <p 
                      className="text-lg mb-8 max-w-2xl mx-auto"
                      style={{ color: isDarkMode ? "#aaa" : "#666" }}
                    >
                      Create beautiful, modern websites with our powerful platform. 
                      See how your colors look in a real context.
                    </p>
                    <div className="flex items-center justify-center gap-4">
                      <button
                        className="px-6 py-3 rounded-lg font-medium text-white"
                        style={{ backgroundColor: primary }}
                      >
                        Start Free Trial
                      </button>
                      <button
                        className="px-6 py-3 rounded-lg font-medium border-2"
                        style={{ borderColor: secondary, color: secondary }}
                      >
                        Learn More
                      </button>
                    </div>
                  </div>

                  {/* Feature Cards */}
                  <div className="px-6 pb-8 grid grid-cols-3 gap-4">
                    {["Fast", "Secure", "Scalable"].map((feature, i) => (
                      <div
                        key={feature}
                        className="p-6 rounded-xl"
                        style={{ backgroundColor: cardBg }}
                      >
                        <div 
                          className="w-12 h-12 rounded-lg mb-4 flex items-center justify-center"
                          style={{ backgroundColor: [primary, secondary, accent][i] + "20" }}
                        >
                          <div 
                            className="w-6 h-6 rounded"
                            style={{ backgroundColor: [primary, secondary, accent][i] }}
                          />
                        </div>
                        <h3 
                          className="font-semibold mb-2"
                          style={{ color: text }}
                        >
                          {feature}
                        </h3>
                        <p 
                          className="text-sm"
                          style={{ color: isDarkMode ? "#aaa" : "#666" }}
                        >
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* Mobile App Preview */}
              <TabsContent value="mobile">
                <div className="flex justify-center">
                  <div 
                    className="w-[320px] h-[640px] rounded-[40px] border-4 border-gray-800 overflow-hidden"
                    style={{ backgroundColor: background }}
                  >
                    {/* Status Bar */}
                    <div 
                      className="flex items-center justify-between px-6 py-2"
                      style={{ backgroundColor: primary }}
                    >
                      <span className="text-white text-xs">9:41</span>
                      <div className="flex gap-1">
                        <div className="w-4 h-2 bg-white/80 rounded-sm" />
                        <div className="w-4 h-2 bg-white/80 rounded-sm" />
                        <div className="w-6 h-3 bg-white rounded-sm" />
                      </div>
                    </div>

                    {/* App Header */}
                    <div 
                      className="px-4 py-3"
                      style={{ backgroundColor: primary }}
                    >
                      <h2 className="text-white font-semibold text-lg">My App</h2>
                      <p className="text-white/70 text-sm">Welcome back, User</p>
                    </div>

                    {/* Content */}
                    <div className="p-4 space-y-4">
                      {/* Stats Card */}
                      <div 
                        className="p-4 rounded-xl"
                        style={{ backgroundColor: cardBg }}
                      >
                        <div className="flex justify-between items-center mb-3">
                          <span style={{ color: isDarkMode ? "#aaa" : "#666" }} className="text-sm">
                            Balance
                          </span>
                          <div 
                            className="w-8 h-8 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: secondary + "20" }}
                          >
                            <div 
                              className="w-4 h-4 rounded-full"
                              style={{ backgroundColor: secondary }}
                            />
                          </div>
                        </div>
                        <div style={{ color: text }} className="text-2xl font-bold">
                          $12,450.00
                        </div>
                      </div>

                      {/* Quick Actions */}
                      <div className="grid grid-cols-4 gap-2">
                        {["Send", "Request", "Cards", "More"].map((action, i) => (
                          <div key={action} className="text-center">
                            <div 
                              className="w-12 h-12 rounded-xl mx-auto mb-1 flex items-center justify-center"
                              style={{ backgroundColor: [primary, secondary, accent, primary][i] + "20" }}
                            >
                              <div 
                                className="w-5 h-5 rounded"
                                style={{ backgroundColor: [primary, secondary, accent, primary][i] }}
                              />
                            </div>
                            <span 
                              className="text-xs"
                              style={{ color: isDarkMode ? "#aaa" : "#666" }}
                            >
                              {action}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Transaction List */}
                      <div 
                        className="rounded-xl overflow-hidden"
                        style={{ backgroundColor: cardBg }}
                      >
                        <div className="p-3 border-b" style={{ borderColor: isDarkMode ? "#3a3a5e" : "#f0f0f0" }}>
                          <span style={{ color: text }} className="font-medium text-sm">
                            Recent Transactions
                          </span>
                        </div>
                        {[
                          { name: "Netflix", amount: "-$15.99" },
                          { name: "Salary", amount: "+$3,500.00" },
                          { name: "Amazon", amount: "-$89.00" },
                        ].map((tx, i) => (
                          <div 
                            key={i} 
                            className="flex items-center justify-between p-3 border-b last:border-0"
                            style={{ borderColor: isDarkMode ? "#3a3a5e" : "#f0f0f0" }}
                          >
                            <div className="flex items-center gap-3">
                              <div 
                                className="w-10 h-10 rounded-full"
                                style={{ backgroundColor: [primary, secondary, accent][i] + "30" }}
                              />
                              <span style={{ color: text }} className="text-sm font-medium">
                                {tx.name}
                              </span>
                            </div>
                            <span 
                              className="font-semibold text-sm"
                              style={{ color: tx.amount.startsWith("+") ? secondary : text }}
                            >
                              {tx.amount}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Nav */}
                    <div 
                      className="absolute bottom-0 left-0 right-0 flex justify-around py-4 border-t"
                      style={{ 
                        backgroundColor: cardBg,
                        borderColor: isDarkMode ? "#3a3a5e" : "#f0f0f0"
                      }}
                    >
                      {["Home", "Search", "Cards", "Profile"].map((item, i) => (
                        <div key={item} className="flex flex-col items-center gap-1">
                          <div 
                            className="w-6 h-6 rounded"
                            style={{ backgroundColor: i === 0 ? primary : (isDarkMode ? "#555" : "#ccc") }}
                          />
                          <span 
                            className="text-[10px]"
                            style={{ color: i === 0 ? primary : (isDarkMode ? "#aaa" : "#666") }}
                          >
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Dashboard Preview */}
              <TabsContent value="dashboard">
                <div 
                  className="rounded-xl border overflow-hidden"
                  style={{ backgroundColor: background }}
                >
                  <div className="flex">
                    {/* Sidebar */}
                    <div 
                      className="w-48 min-h-[500px] p-4"
                      style={{ backgroundColor: isDarkMode ? "#1a1a2e" : "#f8f8f8" }}
                    >
                      <div className="flex items-center gap-2 mb-6">
                        <div 
                          className="w-8 h-8 rounded-lg"
                          style={{ backgroundColor: primary }}
                        />
                        <span className="font-bold" style={{ color: text }}>Dashboard</span>
                      </div>
                      {["Overview", "Analytics", "Projects", "Team", "Settings"].map((item, i) => (
                        <div 
                          key={item}
                          className="flex items-center gap-3 px-3 py-2 rounded-lg mb-1 cursor-pointer"
                          style={{ 
                            backgroundColor: i === 0 ? primary + "20" : "transparent",
                            color: i === 0 ? primary : (isDarkMode ? "#aaa" : "#666")
                          }}
                        >
                          <div 
                            className="w-4 h-4 rounded"
                            style={{ backgroundColor: i === 0 ? primary : (isDarkMode ? "#555" : "#ccc") }}
                          />
                          <span className="text-sm font-medium">{item}</span>
                        </div>
                      ))}
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 p-6">
                      <h2 className="text-xl font-bold mb-6" style={{ color: text }}>
                        Overview
                      </h2>

                      {/* Stats Grid */}
                      <div className="grid grid-cols-4 gap-4 mb-6">
                        {[
                          { label: "Total Revenue", value: "$45,231", color: primary },
                          { label: "Subscriptions", value: "+2350", color: secondary },
                          { label: "Sales", value: "+12,234", color: accent },
                          { label: "Active Now", value: "573", color: primary },
                        ].map((stat, i) => (
                          <div 
                            key={i}
                            className="p-4 rounded-xl"
                            style={{ backgroundColor: cardBg }}
                          >
                            <p 
                              className="text-sm mb-1"
                              style={{ color: isDarkMode ? "#aaa" : "#666" }}
                            >
                              {stat.label}
                            </p>
                            <p 
                              className="text-2xl font-bold"
                              style={{ color: text }}
                            >
                              {stat.value}
                            </p>
                            <div 
                              className="w-full h-1 rounded-full mt-2"
                              style={{ backgroundColor: stat.color + "30" }}
                            >
                              <div 
                                className="h-full rounded-full"
                                style={{ 
                                  backgroundColor: stat.color,
                                  width: `${60 + i * 10}%`
                                }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Table */}
                      <div 
                        className="rounded-xl overflow-hidden"
                        style={{ backgroundColor: cardBg }}
                      >
                        <div className="p-4 border-b" style={{ borderColor: isDarkMode ? "#3a3a5e" : "#f0f0f0" }}>
                          <span style={{ color: text }} className="font-semibold">
                            Recent Orders
                          </span>
                        </div>
                        <table className="w-full">
                          <thead>
                            <tr style={{ borderColor: isDarkMode ? "#3a3a5e" : "#f0f0f0" }} className="border-b">
                              <th className="text-left p-3 text-sm" style={{ color: isDarkMode ? "#aaa" : "#666" }}>Order</th>
                              <th className="text-left p-3 text-sm" style={{ color: isDarkMode ? "#aaa" : "#666" }}>Status</th>
                              <th className="text-left p-3 text-sm" style={{ color: isDarkMode ? "#aaa" : "#666" }}>Customer</th>
                              <th className="text-right p-3 text-sm" style={{ color: isDarkMode ? "#aaa" : "#666" }}>Amount</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              { order: "#3210", status: "Paid", customer: "John Doe", amount: "$250.00" },
                              { order: "#3209", status: "Pending", customer: "Jane Smith", amount: "$150.00" },
                              { order: "#3208", status: "Paid", customer: "Bob Wilson", amount: "$350.00" },
                            ].map((row, i) => (
                              <tr key={i} style={{ borderColor: isDarkMode ? "#3a3a5e" : "#f0f0f0" }} className="border-b last:border-0">
                                <td className="p-3 text-sm" style={{ color: text }}>{row.order}</td>
                                <td className="p-3">
                                  <span 
                                    className="px-2 py-1 rounded-full text-xs font-medium"
                                    style={{ 
                                      backgroundColor: row.status === "Paid" ? secondary + "20" : accent + "20",
                                      color: row.status === "Paid" ? secondary : accent
                                    }}
                                  >
                                    {row.status}
                                  </span>
                                </td>
                                <td className="p-3 text-sm" style={{ color: text }}>{row.customer}</td>
                                <td className="p-3 text-sm text-right" style={{ color: text }}>{row.amount}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
