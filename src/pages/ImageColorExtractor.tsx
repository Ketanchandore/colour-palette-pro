import { useState, useRef, useCallback } from "react";
import { ImageIcon, Upload, Copy, Palette } from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

function rgbToHex(r: number, g: number, b: number): string {
  return "#" + [r, g, b].map(x => {
    const hex = x.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  }).join("").toUpperCase();
}

function getColorName(hex: string): string {
  const colors: Record<string, string> = {
    "#FF0000": "Red", "#00FF00": "Lime", "#0000FF": "Blue",
    "#FFFF00": "Yellow", "#FF00FF": "Magenta", "#00FFFF": "Cyan",
    "#000000": "Black", "#FFFFFF": "White", "#808080": "Gray",
    "#800000": "Maroon", "#808000": "Olive", "#008000": "Green",
    "#800080": "Purple", "#008080": "Teal", "#000080": "Navy",
    "#FFA500": "Orange", "#FFC0CB": "Pink", "#A52A2A": "Brown",
  };
  return colors[hex] || "Custom";
}

export default function ImageColorExtractor() {
  const [image, setImage] = useState<string | null>(null);
  const [colors, setColors] = useState<string[]>([]);
  const [isExtracting, setIsExtracting] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const extractColors = useCallback((imageUrl: string) => {
    setIsExtracting(true);
    const img = new Image();
    img.crossOrigin = "anonymous";
    
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      
      // Resize for performance
      const maxSize = 100;
      const scale = Math.min(maxSize / img.width, maxSize / img.height);
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;
      
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imageData.data;
      
      // Color quantization using k-means like approach
      const colorMap: Record<string, number> = {};
      
      for (let i = 0; i < pixels.length; i += 4) {
        const r = Math.round(pixels[i] / 16) * 16;
        const g = Math.round(pixels[i + 1] / 16) * 16;
        const b = Math.round(pixels[i + 2] / 16) * 16;
        const hex = rgbToHex(r, g, b);
        colorMap[hex] = (colorMap[hex] || 0) + 1;
      }
      
      // Get top 8 colors sorted by frequency
      const sortedColors = Object.entries(colorMap)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 8)
        .map(([hex]) => hex);
      
      setColors(sortedColors);
      setIsExtracting(false);
      toast.success("Colors extracted successfully!");
    };
    
    img.onerror = () => {
      setIsExtracting(false);
      toast.error("Failed to load image");
    };
    
    img.src = imageUrl;
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setImage(result);
      extractColors(result);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setImage(result);
        extractColors(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const copyColor = (color: string) => {
    navigator.clipboard.writeText(color);
    toast.success(`Copied ${color}`);
  };

  const copyAllColors = () => {
    navigator.clipboard.writeText(colors.join(", "));
    toast.success("All colors copied!");
  };

  return (
    <MainLayout>
      <div className="p-6 lg:p-8 space-y-8">
        {/* Header */}
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
              <ImageIcon className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-3xl font-display font-bold text-foreground">
              Image Color Extractor
            </h1>
          </div>
          <p className="text-muted-foreground">
            Upload any image and extract its dominant color palette instantly
          </p>
        </div>

        <canvas ref={canvasRef} className="hidden" />

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Area */}
          <div
            className="border-2 border-dashed border-border rounded-2xl p-8 flex flex-col items-center justify-center min-h-[400px] bg-card hover:border-primary/50 transition-colors cursor-pointer"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            
            {image ? (
              <img
                src={image}
                alt="Uploaded"
                className="max-w-full max-h-[350px] rounded-xl object-contain"
              />
            ) : (
              <>
                <div className="w-20 h-20 rounded-2xl bg-muted flex items-center justify-center mb-4">
                  <Upload className="w-10 h-10 text-muted-foreground" />
                </div>
                <p className="text-lg font-medium text-foreground mb-2">
                  Drop an image here
                </p>
                <p className="text-sm text-muted-foreground">
                  or click to browse files
                </p>
              </>
            )}
          </div>

          {/* Colors Panel */}
          <div className="bg-card rounded-2xl border border-border p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-display font-bold flex items-center gap-2">
                <Palette className="w-5 h-5" />
                Extracted Colors
              </h2>
              {colors.length > 0 && (
                <Button variant="outline" size="sm" onClick={copyAllColors}>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy All
                </Button>
              )}
            </div>

            {isExtracting ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
              </div>
            ) : colors.length > 0 ? (
              <div className="space-y-3">
                {colors.map((color, i) => (
                  <button
                    key={i}
                    onClick={() => copyColor(color)}
                    className="w-full flex items-center gap-4 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors group"
                  >
                    <div
                      className="w-12 h-12 rounded-lg shadow-md"
                      style={{ backgroundColor: color }}
                    />
                    <div className="flex-1 text-left">
                      <p className="font-mono font-medium">{color}</p>
                      <p className="text-sm text-muted-foreground">{getColorName(color)}</p>
                    </div>
                    <Copy className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <ImageIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Upload an image to extract colors</p>
              </div>
            )}

            {colors.length > 0 && (
              <div>
                <p className="text-sm text-muted-foreground mb-3">Preview Palette</p>
                <div className="flex rounded-xl overflow-hidden h-16">
                  {colors.map((color, i) => (
                    <div
                      key={i}
                      className="flex-1 cursor-pointer hover:flex-[1.5] transition-all"
                      style={{ backgroundColor: color }}
                      onClick={() => copyColor(color)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
