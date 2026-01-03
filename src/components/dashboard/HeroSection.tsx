import { Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FloatingColors } from "./FloatingColors";

export function HeroSection() {
  return (
    <div className="relative min-h-[400px] rounded-3xl overflow-hidden bg-gradient-to-br from-sidebar via-sidebar to-primary/20 p-8 md:p-12">
      <FloatingColors />
      
      <div className="relative z-10 max-w-2xl">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary-foreground/90 text-sm font-medium mb-6 animate-fade-in-up">
          <Sparkles className="w-4 h-4" />
          World's Best Color Palette Generator
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-4 animate-fade-in-up animation-delay-100">
          Design with
          <span className="block gradient-text">Perfect Colors</span>
        </h1>
        
        <p className="text-lg text-white/70 mb-8 max-w-lg animate-fade-in-up animation-delay-200">
          Discover millions of beautiful color palettes. Create, explore, and save your favorite color combinations for any project.
        </p>
        
        <div className="flex flex-wrap gap-4 animate-fade-in-up animation-delay-300">
          <Link to="/generator">
            <Button size="lg" className="gradient-primary text-white hover:opacity-90 shadow-glow-md">
              Start Generating
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
          <Link to="/trending">
            <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
              Browse Trending
            </Button>
          </Link>
        </div>
      </div>

      {/* Decorative Palette Preview */}
      <div className="absolute right-8 bottom-8 hidden lg:flex gap-2 animate-float">
        {["#FF6B6B", "#FEC89A", "#FFD93D", "#6BCB77", "#4D96FF"].map((color, i) => (
          <div
            key={i}
            className="w-12 h-24 rounded-xl shadow-lg transform hover:scale-105 transition-transform"
            style={{ 
              backgroundColor: color,
              transform: `rotate(${(i - 2) * 5}deg) translateY(${Math.abs(i - 2) * 8}px)`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
