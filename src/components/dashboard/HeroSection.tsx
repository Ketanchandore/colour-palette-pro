import { Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FloatingColors } from "./FloatingColors";

export function HeroSection() {
  return (
    <div className="relative min-h-[400px] rounded-3xl overflow-hidden bg-gradient-to-br from-sidebar via-sidebar to-primary/20">
      {/* Background video - mobile only (subtle) */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover opacity-40 lg:hidden"
        src="/hero-video.mp4"
      />
      
      <FloatingColors />
      
      {/* Right side video - desktop only, full brightness, absolutely positioned */}
      <div className="hidden lg:block absolute top-0 right-0 w-1/2 h-full z-[1]">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
          src="/hero-video.mp4"
        />
        {/* Gradient overlay for smooth blend with left content */}
        <div className="absolute inset-0 bg-gradient-to-r from-sidebar via-sidebar/60 to-transparent" />
      </div>

      <div className="relative z-10 p-8 md:p-12 flex flex-col lg:flex-row items-center gap-8">
        {/* Left content */}
        <div className="max-w-2xl lg:w-1/2 flex-shrink-0">
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
      </div>
    </div>
  );
}
