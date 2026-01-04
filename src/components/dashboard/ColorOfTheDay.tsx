import { useState, useEffect } from "react";
import { Sun, History, Brain, Copy, Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ColorInfo {
  hex: string;
  name: string;
  history: string;
  psychology: string;
  mood: string;
  pairings: string[];
}

// Pre-defined colors with rich information
const colorDatabase: ColorInfo[] = [
  {
    hex: "#A05AFF",
    name: "Electric Violet",
    history: "Violet dyes were once so expensive that only royalty could afford them. The ancient Phoenicians extracted it from sea snails.",
    psychology: "Stimulates creativity and imagination. Associated with luxury, ambition, and spiritual awareness.",
    mood: "Creative & Mystical",
    pairings: ["#1BCFB4", "#FFF5E6", "#2D1F4B"]
  },
  {
    hex: "#1BCFB4",
    name: "Caribbean Teal",
    history: "Teal emerged as a popular color in the 1990s interior design movement, symbolizing the blend of nature and technology.",
    psychology: "Promotes emotional balance and mental clarity. Known to reduce stress and create a sense of calm.",
    mood: "Balanced & Refreshing",
    pairings: ["#A05AFF", "#FF6B6B", "#FFFFFF"]
  },
  {
    hex: "#FF6B6B",
    name: "Living Coral",
    history: "Named Pantone Color of the Year 2019, this hue represents optimism and the warmth of coral reefs.",
    psychology: "Evokes warmth, comfort, and sociability. Encourages connection and playful expression.",
    mood: "Warm & Playful",
    pairings: ["#4ECDC4", "#FFFFFF", "#2C3E50"]
  },
  {
    hex: "#4BCBEB",
    name: "Electric Cyan",
    history: "Cyan became prominent in the digital age as one of the primary colors in CMYK printing and screen displays.",
    psychology: "Inspires clear thinking and open communication. Associated with innovation and futuristic visions.",
    mood: "Fresh & Innovative",
    pairings: ["#FF6B9D", "#1A1A2E", "#FFFFFF"]
  },
  {
    hex: "#F7B731",
    name: "Golden Hour",
    history: "Yellow gold has been treasured since ancient Egypt, where it symbolized the eternal and indestructible.",
    psychology: "Stimulates mental activity and generates muscle energy. Associated with happiness and optimism.",
    mood: "Energetic & Joyful",
    pairings: ["#5C6BC0", "#2D3436", "#FFFFFF"]
  },
  {
    hex: "#26DE81",
    name: "Spring Mint",
    history: "Green has been the symbol of nature and renewal since ancient times, representing growth and harmony.",
    psychology: "The most restful color for the human eye. Promotes balance, harmony, and environmental awareness.",
    mood: "Harmonious & Natural",
    pairings: ["#9B59B6", "#34495E", "#ECEFF1"]
  },
  {
    hex: "#5758BB",
    name: "Iris Purple",
    history: "Named after the Greek goddess of the rainbow, iris purple has been associated with wisdom since ancient Greece.",
    psychology: "Combines the stability of blue with the energy of red. Encourages deep contemplation and artistic expression.",
    mood: "Thoughtful & Artistic",
    pairings: ["#F39C12", "#ECF0F1", "#2C3E50"]
  }
];

export function ColorOfTheDay() {
  const [colorInfo, setColorInfo] = useState<ColorInfo | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Use the day of the year to consistently show the same color each day
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    const colorIndex = dayOfYear % colorDatabase.length;
    setColorInfo(colorDatabase[colorIndex]);
  }, []);

  const copyColor = async () => {
    if (!colorInfo) return;
    await navigator.clipboard.writeText(colorInfo.hex);
    setCopied(true);
    toast.success(`Copied ${colorInfo.hex}`);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!colorInfo) return null;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-card">
      {/* Color Header */}
      <div 
        className="relative h-40 flex items-center justify-center"
        style={{ backgroundColor: colorInfo.hex }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
        <div className="relative z-10 text-center text-white">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sun className="w-6 h-6 animate-pulse-glow" />
            <span className="text-sm font-medium uppercase tracking-wider opacity-90">Color of the Day</span>
          </div>
          <h3 className="text-3xl font-display font-bold">{colorInfo.name}</h3>
          <button
            onClick={copyColor}
            className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 hover:bg-white/30 transition-colors text-sm font-mono"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {colorInfo.hex}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Mood Badge */}
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-primary">{colorInfo.mood}</span>
        </div>

        {/* History Section */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-muted-foreground">
            <History className="w-4 h-4" />
            <h4 className="text-sm font-semibold uppercase tracking-wide">Historical Context</h4>
          </div>
          <p className="text-sm text-foreground/80 leading-relaxed">
            {colorInfo.history}
          </p>
        </div>

        {/* Psychology Section */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Brain className="w-4 h-4" />
            <h4 className="text-sm font-semibold uppercase tracking-wide">Color Psychology</h4>
          </div>
          <p className="text-sm text-foreground/80 leading-relaxed">
            {colorInfo.psychology}
          </p>
        </div>

        {/* Suggested Pairings */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Perfect Pairings
          </h4>
          <div className="flex gap-2">
            {colorInfo.pairings.map((pairing, index) => (
              <button
                key={index}
                className="group relative w-10 h-10 rounded-lg shadow-sm border border-border/50 transition-transform hover:scale-110"
                style={{ backgroundColor: pairing }}
                onClick={async () => {
                  await navigator.clipboard.writeText(pairing);
                  toast.success(`Copied ${pairing}`);
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-lg bg-black/30">
                  <Copy className="w-3 h-3 text-white" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
