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
            <Button size="lg" variant="outline" className="border-white/30 text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm">
              Browse Trending
            </Button>
          </Link>
        </div>
      </div>

      {/* Hero Video */}
      <div className="absolute right-4 top-4 bottom-4 hidden lg:flex items-center justify-center w-[45%]">
        <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover rounded-2xl"
            src="/hero-video.mp4"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-sidebar/60 pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
