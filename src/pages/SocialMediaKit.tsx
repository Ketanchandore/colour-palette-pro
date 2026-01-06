import { useState, useRef } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Instagram, 
  Youtube, 
  Linkedin, 
  Twitter,
  Download,
  Palette,
  Type,
  Image as ImageIcon,
  RefreshCw
} from "lucide-react";
import { toast } from "sonner";

const defaultColors = [
  { name: "Primary", hex: "#A05AFF" },
  { name: "Secondary", hex: "#1BCFB4" },
  { name: "Accent", hex: "#4BCBEB" },
  { name: "Background", hex: "#1a1a2e" },
  { name: "Text", hex: "#FFFFFF" },
];

export default function SocialMediaKit() {
  const [colors, setColors] = useState(defaultColors);
  const [title, setTitle] = useState("Your Amazing Title Here");
  const [subtitle, setSubtitle] = useState("Add your subtitle or tagline");
  const [brandName, setBrandName] = useState("Brand Name");

  const updateColor = (index: number, hex: string) => {
    const newColors = [...colors];
    newColors[index].hex = hex;
    setColors(newColors);
  };

  const downloadTemplate = (templateId: string) => {
    toast.success(`${templateId} template - Use screenshot to save!`);
  };

  const primary = colors[0].hex;
  const secondary = colors[1].hex;
  const accent = colors[2].hex;
  const background = colors[3].hex;
  const text = colors[4].hex;

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">
            Social Media Kit
          </h1>
          <p className="text-muted-foreground mt-1">
            Create beautiful social media graphics with your color palette
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Settings Panel */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5 text-primary" />
                Customize
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Colors */}
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Colors</Label>
                {colors.map((color, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="color"
                      value={color.hex}
                      onChange={(e) => updateColor(index, e.target.value)}
                      className="w-8 h-8 rounded cursor-pointer"
                    />
                    <span className="text-xs text-muted-foreground flex-1">{color.name}</span>
                    <span className="text-xs font-mono text-muted-foreground">{color.hex}</span>
                  </div>
                ))}
              </div>

              {/* Text Content */}
              <div className="space-y-2 pt-4 border-t border-border">
                <Label className="text-xs text-muted-foreground">Content</Label>
                <div>
                  <Label className="text-xs">Brand Name</Label>
                  <Input
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="text-xs">Title</Label>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="text-xs">Subtitle</Label>
                  <Textarea
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    className="mt-1"
                    rows={2}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Templates */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="instagram">
              <TabsList className="mb-4">
                <TabsTrigger value="instagram" className="gap-2">
                  <Instagram className="w-4 h-4" />
                  Instagram
                </TabsTrigger>
                <TabsTrigger value="youtube" className="gap-2">
                  <Youtube className="w-4 h-4" />
                  YouTube
                </TabsTrigger>
                <TabsTrigger value="linkedin" className="gap-2">
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </TabsTrigger>
                <TabsTrigger value="twitter" className="gap-2">
                  <Twitter className="w-4 h-4" />
                  Twitter
                </TabsTrigger>
              </TabsList>

              {/* Instagram Templates */}
              <TabsContent value="instagram" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Instagram Post */}
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm flex items-center justify-between">
                        <span>Instagram Post (1080x1080)</span>
                        <Button 
                          size="sm" 
                          variant="ghost"
                          onClick={() => downloadTemplate("Instagram Post")}
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div 
                        className="aspect-square rounded-lg overflow-hidden flex flex-col items-center justify-center p-8 text-center"
                        style={{ 
                          background: `linear-gradient(135deg, ${primary}, ${secondary})`,
                        }}
                      >
                        <div 
                          className="w-12 h-12 rounded-xl mb-4 flex items-center justify-center"
                          style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
                        >
                          <span className="text-white font-bold text-xl">{brandName.charAt(0)}</span>
                        </div>
                        <h2 
                          className="text-xl font-bold mb-2"
                          style={{ color: text }}
                        >
                          {title}
                        </h2>
                        <p 
                          className="text-sm opacity-90"
                          style={{ color: text }}
                        >
                          {subtitle}
                        </p>
                        <div 
                          className="mt-4 px-4 py-2 rounded-full text-sm font-medium"
                          style={{ 
                            backgroundColor: "rgba(255,255,255,0.2)",
                            color: text
                          }}
                        >
                          @{brandName.toLowerCase().replace(/\s/g, "")}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Instagram Story */}
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm flex items-center justify-between">
                        <span>Instagram Story (1080x1920)</span>
                        <Button 
                          size="sm" 
                          variant="ghost"
                          onClick={() => downloadTemplate("Instagram Story")}
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div 
                        className="aspect-[9/16] max-h-[400px] rounded-lg overflow-hidden flex flex-col items-center justify-center p-6 text-center"
                        style={{ backgroundColor: background }}
                      >
                        <div 
                          className="w-16 h-16 rounded-2xl mb-6 flex items-center justify-center"
                          style={{ backgroundColor: primary }}
                        >
                          <span className="text-white font-bold text-2xl">{brandName.charAt(0)}</span>
                        </div>
                        <h2 
                          className="text-lg font-bold mb-3"
                          style={{ color: text }}
                        >
                          {title}
                        </h2>
                        <p 
                          className="text-xs opacity-80 mb-6"
                          style={{ color: text }}
                        >
                          {subtitle}
                        </p>
                        <div 
                          className="px-6 py-2 rounded-full text-xs font-medium"
                          style={{ 
                            backgroundColor: secondary,
                            color: background
                          }}
                        >
                          Swipe Up
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* YouTube Templates */}
              <TabsContent value="youtube" className="space-y-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center justify-between">
                      <span>YouTube Thumbnail (1280x720)</span>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => downloadTemplate("YouTube Thumbnail")}
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div 
                      className="aspect-video rounded-lg overflow-hidden flex items-center justify-between p-8"
                      style={{ 
                        background: `linear-gradient(135deg, ${background}, ${primary}30)`,
                      }}
                    >
                      <div className="flex-1">
                        <h2 
                          className="text-2xl font-black mb-2 uppercase"
                          style={{ color: text }}
                        >
                          {title}
                        </h2>
                        <p 
                          className="text-sm opacity-80"
                          style={{ color: text }}
                        >
                          {subtitle}
                        </p>
                      </div>
                      <div 
                        className="w-24 h-24 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: primary }}
                      >
                        <span className="text-white text-3xl">▶</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center justify-between">
                      <span>YouTube Banner (2560x1440)</span>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => downloadTemplate("YouTube Banner")}
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div 
                      className="aspect-[16/4] rounded-lg overflow-hidden flex items-center justify-center p-8"
                      style={{ 
                        background: `linear-gradient(90deg, ${primary}, ${secondary})`,
                      }}
                    >
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-3 mb-2">
                          <div 
                            className="w-10 h-10 rounded-lg flex items-center justify-center"
                            style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
                          >
                            <span className="text-white font-bold">{brandName.charAt(0)}</span>
                          </div>
                          <h2 
                            className="text-2xl font-bold"
                            style={{ color: text }}
                          >
                            {brandName}
                          </h2>
                        </div>
                        <p 
                          className="text-sm opacity-90"
                          style={{ color: text }}
                        >
                          {subtitle}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* LinkedIn Templates */}
              <TabsContent value="linkedin" className="space-y-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center justify-between">
                      <span>LinkedIn Post (1200x627)</span>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => downloadTemplate("LinkedIn Post")}
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div 
                      className="aspect-[1200/627] rounded-lg overflow-hidden flex items-center p-8"
                      style={{ backgroundColor: background }}
                    >
                      <div className="flex-1">
                        <div 
                          className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-4"
                          style={{ backgroundColor: primary, color: text }}
                        >
                          {brandName}
                        </div>
                        <h2 
                          className="text-xl font-bold mb-3"
                          style={{ color: text }}
                        >
                          {title}
                        </h2>
                        <p 
                          className="text-sm opacity-80"
                          style={{ color: text }}
                        >
                          {subtitle}
                        </p>
                      </div>
                      <div 
                        className="w-32 h-32 rounded-xl"
                        style={{ 
                          background: `linear-gradient(135deg, ${primary}, ${secondary})` 
                        }}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center justify-between">
                      <span>LinkedIn Banner (1584x396)</span>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => downloadTemplate("LinkedIn Banner")}
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div 
                      className="aspect-[1584/396] rounded-lg overflow-hidden flex items-center justify-center p-6"
                      style={{ 
                        background: `linear-gradient(90deg, ${background}, ${primary}40)`,
                      }}
                    >
                      <div className="text-center">
                        <h2 
                          className="text-xl font-bold"
                          style={{ color: text }}
                        >
                          {brandName}
                        </h2>
                        <p 
                          className="text-xs opacity-80 mt-1"
                          style={{ color: text }}
                        >
                          {subtitle}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Twitter Templates */}
              <TabsContent value="twitter" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm flex items-center justify-between">
                        <span>Twitter Post (1200x675)</span>
                        <Button 
                          size="sm" 
                          variant="ghost"
                          onClick={() => downloadTemplate("Twitter Post")}
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div 
                        className="aspect-[16/9] rounded-lg overflow-hidden flex flex-col items-center justify-center p-6 text-center"
                        style={{ 
                          background: `linear-gradient(135deg, ${primary}, ${accent})`,
                        }}
                      >
                        <h2 
                          className="text-lg font-bold mb-2"
                          style={{ color: text }}
                        >
                          {title}
                        </h2>
                        <p 
                          className="text-xs opacity-90"
                          style={{ color: text }}
                        >
                          {subtitle}
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm flex items-center justify-between">
                        <span>Twitter Header (1500x500)</span>
                        <Button 
                          size="sm" 
                          variant="ghost"
                          onClick={() => downloadTemplate("Twitter Header")}
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div 
                        className="aspect-[1500/500] rounded-lg overflow-hidden flex items-center justify-center p-4"
                        style={{ 
                          background: `linear-gradient(90deg, ${background}, ${secondary}50)`,
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-10 h-10 rounded-lg flex items-center justify-center"
                            style={{ backgroundColor: primary }}
                          >
                            <span className="text-white font-bold">{brandName.charAt(0)}</span>
                          </div>
                          <div>
                            <h2 
                              className="text-lg font-bold"
                              style={{ color: text }}
                            >
                              {brandName}
                            </h2>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Tips */}
        <Card className="bg-muted/30">
          <CardContent className="p-6">
            <h3 className="font-semibold text-foreground mb-3">Export Tips</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
              <div>
                <p className="font-medium text-foreground">Screenshot to Save</p>
                <p>Use your browser's screenshot feature or a tool like Snagit to capture templates</p>
              </div>
              <div>
                <p className="font-medium text-foreground">Customize Colors</p>
                <p>Click on any color swatch in the sidebar to change the palette</p>
              </div>
              <div>
                <p className="font-medium text-foreground">Edit Text</p>
                <p>Update the title, subtitle, and brand name to match your content</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
