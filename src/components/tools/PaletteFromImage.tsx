import { useState, useRef, useCallback } from "react";
import { Upload, ImageIcon, Loader2, Copy, Check, RefreshCw, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface ExtractedColor {
  hex: string;
  percentage: number;
}

export function PaletteFromImage() {
  const [image, setImage] = useState<string | null>(null);
  const [colors, setColors] = useState<ExtractedColor[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const extractColors = useCallback((imageElement: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Scale down for faster processing
    const maxSize = 100;
    const scale = Math.min(maxSize / imageElement.width, maxSize / imageElement.height);
    canvas.width = imageElement.width * scale;
    canvas.height = imageElement.height * scale;

    ctx.drawImage(imageElement, 0, 0, canvas.width, canvas.height);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;

    // Color quantization using median cut algorithm (simplified)
    const colorCounts: { [key: string]: number } = {};
    
    for (let i = 0; i < pixels.length; i += 4) {
      const r = Math.round(pixels[i] / 32) * 32;
      const g = Math.round(pixels[i + 1] / 32) * 32;
      const b = Math.round(pixels[i + 2] / 32) * 32;
      const key = `${r},${g},${b}`;
      colorCounts[key] = (colorCounts[key] || 0) + 1;
    }

    // Sort by frequency and get top colors
    const sortedColors = Object.entries(colorCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 20);

    // Filter similar colors and keep distinct ones
    const totalPixels = pixels.length / 4;
    const distinctColors: ExtractedColor[] = [];
    
    for (const [colorKey, count] of sortedColors) {
      const [r, g, b] = colorKey.split(",").map(Number);
      const hex = `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`.toUpperCase();
      
      // Check if this color is distinct enough from existing ones
      const isDistinct = distinctColors.every(existing => {
        const [er, eg, eb] = [
          parseInt(existing.hex.slice(1, 3), 16),
          parseInt(existing.hex.slice(3, 5), 16),
          parseInt(existing.hex.slice(5, 7), 16)
        ];
        const distance = Math.sqrt((r - er) ** 2 + (g - eg) ** 2 + (b - eb) ** 2);
        return distance > 60;
      });

      if (isDistinct && distinctColors.length < 6) {
        distinctColors.push({
          hex,
          percentage: Math.round((count / totalPixels) * 100)
        });
      }
    }

    setColors(distinctColors);
  }, []);

  const processImage = useCallback((file: File) => {
    setIsProcessing(true);
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setImage(result);
      
      const img = new Image();
      img.onload = () => {
        extractColors(img);
        setIsProcessing(false);
      };
      img.src = result;
    };
    
    reader.readAsDataURL(file);
  }, [extractColors]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processImage(file);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      processImage(file);
    }
  }, [processImage]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const copyColor = async (hex: string) => {
    await navigator.clipboard.writeText(hex);
    setCopiedColor(hex);
    toast.success(`Copied ${hex}`);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  const copyAllColors = async () => {
    const allColors = colors.map(c => c.hex).join(", ");
    await navigator.clipboard.writeText(allColors);
    toast.success("All colors copied!");
  };

  const reset = () => {
    setImage(null);
    setColors([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-6">
      <canvas ref={canvasRef} className="hidden" />
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {!image ? (
        <div
          className={cn(
            "relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 cursor-pointer",
            isDragging
              ? "border-primary bg-primary/5"
              : "border-border hover:border-primary/50 hover:bg-muted/50"
          )}
          onClick={() => fileInputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <div className="space-y-4">
            <div className="w-16 h-16 mx-auto rounded-2xl gradient-primary flex items-center justify-center">
              <Upload className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                Drop your image here
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                or click to browse • Supports JPG, PNG, WebP
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Image Preview */}
          <div className="relative rounded-2xl overflow-hidden border border-border/50">
            <img
              src={image}
              alt="Uploaded"
              className="w-full h-64 object-cover"
            />
            {isProcessing && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <div className="text-center text-white">
                  <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2" />
                  <p className="text-sm">Extracting colors...</p>
                </div>
              </div>
            )}
          </div>

          {/* Extracted Colors */}
          {colors.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-foreground">
                  Extracted Palette
                </h3>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={copyAllColors}>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy All
                  </Button>
                  <Button variant="outline" size="sm" onClick={reset}>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    New Image
                  </Button>
                </div>
              </div>

              {/* Color Swatches */}
              <div className="flex h-24 rounded-xl overflow-hidden shadow-md">
                {colors.map((color, index) => (
                  <button
                    key={index}
                    className="flex-1 relative group transition-all duration-200 hover:flex-[1.3]"
                    style={{ backgroundColor: color.hex }}
                    onClick={() => copyColor(color.hex)}
                  >
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
                      {copiedColor === color.hex ? (
                        <Check className="w-5 h-5 text-white" />
                      ) : (
                        <Copy className="w-5 h-5 text-white" />
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {/* Color Details */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                {colors.map((color, index) => (
                  <button
                    key={index}
                    className="group p-3 rounded-xl border border-border/50 bg-card hover:border-primary/50 transition-all text-left"
                    onClick={() => copyColor(color.hex)}
                  >
                    <div
                      className="w-full h-10 rounded-lg mb-2 shadow-sm"
                      style={{ backgroundColor: color.hex }}
                    />
                    <p className="text-xs font-mono text-foreground group-hover:text-primary transition-colors">
                      {color.hex}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {color.percentage}% of image
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
