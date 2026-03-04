import { useState } from "react";
import { Copy, Check, Sun } from "lucide-react";
import { toast } from "sonner";

// Deterministic "daily" color based on date seed
function getDailyColor(): { hex: string; name: string; description: string } {
  const today = new Date();
  const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  
  const colors = [
    { hex: "#6366F1", name: "Indigo Dream", description: "A calming yet bold indigo perfect for creative interfaces and modern dashboards." },
    { hex: "#EC4899", name: "Pink Punch", description: "Energetic and playful pink that adds personality to any design." },
    { hex: "#14B8A6", name: "Teal Tide", description: "Fresh and natural teal inspired by tropical ocean waters." },
    { hex: "#F59E0B", name: "Amber Glow", description: "Warm amber that evokes sunset warmth and premium feel." },
    { hex: "#8B5CF6", name: "Violet Mist", description: "Ethereal violet ideal for creative portfolios and luxury branding." },
    { hex: "#EF4444", name: "Crimson Fire", description: "Bold crimson that demands attention — perfect for CTAs and alerts." },
    { hex: "#10B981", name: "Emerald Oasis", description: "Refreshing green symbolizing growth, health, and sustainability." },
    { hex: "#3B82F6", name: "Sky Canvas", description: "Classic blue that builds trust and stability in any interface." },
    { hex: "#F97316", name: "Tangerine Burst", description: "Vibrant orange radiating energy and enthusiasm." },
    { hex: "#06B6D4", name: "Cyan Spark", description: "Electric cyan for tech-forward brands and futuristic designs." },
    { hex: "#A855F7", name: "Purple Haze", description: "Mystical purple blending creativity with sophistication." },
    { hex: "#84CC16", name: "Lime Zest", description: "Fresh lime green bursting with vitality and youthful energy." },
    { hex: "#E11D48", name: "Rose Ruby", description: "Deep rose with ruby undertones — romantic yet powerful." },
    { hex: "#0EA5E9", name: "Ocean Blue", description: "Serene ocean blue that brings calm and clarity to layouts." },
    { hex: "#D946EF", name: "Fuchsia Pop", description: "Eye-catching fuchsia for brands that dare to be different." },
    { hex: "#22C55E", name: "Mint Fresh", description: "Clean mint green that signals success and positive actions." },
    { hex: "#7C3AED", name: "Deep Violet", description: "Rich violet conveying luxury, creativity, and innovation." },
    { hex: "#F43F5E", name: "Coral Kiss", description: "Warm coral bridging the gap between pink and red — versatile and trendy." },
    { hex: "#0891B2", name: "Deep Teal", description: "Sophisticated teal for professional and elegant designs." },
    { hex: "#CA8A04", name: "Gold Rush", description: "Rich gold for premium branding and luxury interfaces." },
    { hex: "#DC2626", name: "Scarlet Edge", description: "Intense scarlet that creates urgency and visual impact." },
    { hex: "#2563EB", name: "Royal Blue", description: "Commanding royal blue for authoritative, trustworthy designs." },
    { hex: "#059669", name: "Forest Deep", description: "Deep forest green grounding designs with natural stability." },
    { hex: "#DB2777", name: "Magenta Rush", description: "Bold magenta for fashion-forward and creative brands." },
    { hex: "#7DD3FC", name: "Baby Blue", description: "Soft baby blue adding gentle warmth and approachability." },
    { hex: "#FB923C", name: "Peach Glow", description: "Soft peach bringing warmth without overwhelming the palette." },
    { hex: "#34D399", name: "Seafoam", description: "Gentle seafoam green inspired by calm coastal waters." },
    { hex: "#C084FC", name: "Lavender Dream", description: "Dreamy lavender for wellness, beauty, and mindfulness brands." },
    { hex: "#FACC15", name: "Sunshine", description: "Bright sunshine yellow spreading optimism and happiness." },
    { hex: "#4F46E5", name: "Electric Indigo", description: "Bold electric indigo for cutting-edge tech and SaaS brands." },
    { hex: "#BE185D", name: "Berry Bliss", description: "Deep berry for rich, elegant, and feminine designs." },
  ];
  
  return colors[seed % colors.length];
}

function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}

export function ColorOfTheDay() {
  const [copied, setCopied] = useState(false);
  const daily = getDailyColor();
  const rgb = hexToRgb(daily.hex);
  const isLight = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000 > 128;

  const copyColor = async () => {
    await navigator.clipboard.writeText(daily.hex);
    setCopied(true);
    toast.success(`Copied ${daily.hex}`);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      className="relative rounded-2xl p-6 overflow-hidden transition-all duration-300 hover:shadow-glow-md cursor-pointer group"
      style={{ backgroundColor: daily.hex }}
      onClick={copyColor}
    >
      <div className={`relative z-10 ${isLight ? "text-gray-900" : "text-white"}`}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Sun className="w-5 h-5" />
            <span className="text-sm font-medium opacity-80">Color of the Day</span>
          </div>
          <button className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isLight ? "bg-black/10 hover:bg-black/20" : "bg-white/10 hover:bg-white/20"}`}>
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
        <h3 className="text-2xl font-display font-bold mb-1">{daily.name}</h3>
        <p className="font-mono text-sm opacity-80 mb-2">{daily.hex} • rgb({rgb.r}, {rgb.g}, {rgb.b})</p>
        <p className={`text-sm leading-relaxed ${isLight ? "text-gray-700" : "text-white/70"}`}>{daily.description}</p>
      </div>
      
      {/* Decorative circles */}
      <div className={`absolute -right-6 -top-6 w-32 h-32 rounded-full ${isLight ? "bg-black/5" : "bg-white/5"} group-hover:scale-110 transition-transform duration-500`} />
      <div className={`absolute -right-2 -bottom-8 w-24 h-24 rounded-full ${isLight ? "bg-black/5" : "bg-white/5"} group-hover:scale-110 transition-transform duration-700`} />
    </div>
  );
}
