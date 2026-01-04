import { useState, CSSProperties } from "react";
import { Copy, Check, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { SocialShareButtons } from "./SocialShareButtons";

interface PaletteCardProps {
  id: string;
  name: string;
  colors: string[];
  likes?: number;
  isFavorite?: boolean;
  onFavoriteToggle?: (id: string) => void;
  className?: string;
  style?: CSSProperties;
}

export function PaletteCard({
  id,
  name,
  colors,
  likes = 0,
  isFavorite = false,
  onFavoriteToggle,
  className,
  style,
}: PaletteCardProps) {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const copyColor = async (color: string) => {
    await navigator.clipboard.writeText(color);
    setCopiedColor(color);
    toast.success(`Copied ${color}`);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  const copyAllColors = async () => {
    await navigator.clipboard.writeText(colors.join(", "));
    toast.success("All colors copied!");
  };

  return (
    <div
      className={cn(
        "group relative bg-card rounded-2xl overflow-hidden shadow-sm border border-border/50 transition-all duration-300",
        "hover:shadow-glow-md hover:border-primary/20 hover:-translate-y-1",
        className
      )}
      style={style}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Colors */}
      <div className="flex h-32">
        {colors.map((color, index) => (
          <button
            key={index}
            className="flex-1 relative transition-all duration-200 hover:flex-[1.3] group/color"
            style={{ backgroundColor: color }}
            onClick={() => copyColor(color)}
          >
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/color:opacity-100 transition-opacity bg-black/20">
              {copiedColor === color ? (
                <Check className="w-4 h-4 text-white" />
              ) : (
                <Copy className="w-4 h-4 text-white" />
              )}
            </div>
            <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] font-mono text-white/90 opacity-0 group-hover/color:opacity-100 transition-opacity bg-black/40 px-1.5 py-0.5 rounded">
              {color}
            </span>
          </button>
        ))}
      </div>

      {/* Info */}
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-foreground truncate pr-2">{name}</h3>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2 text-muted-foreground hover:text-foreground"
              onClick={copyAllColors}
            >
              <Copy className="w-4 h-4" />
            </Button>
            <SocialShareButtons paletteName={name} colors={colors} paletteId={id} />
            {onFavoriteToggle && (
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "h-8 px-2 transition-colors",
                  isFavorite
                    ? "text-red-500 hover:text-red-600"
                    : "text-muted-foreground hover:text-red-500"
                )}
                onClick={() => onFavoriteToggle(id)}
              >
                <Heart className={cn("w-4 h-4", isFavorite && "fill-current")} />
              </Button>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
          <Heart className="w-3 h-3" />
          <span>{likes} likes</span>
        </div>
      </div>
    </div>
  );
}
