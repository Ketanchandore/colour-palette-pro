import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

interface PinterestButtonProps {
  imageUrl?: string;
  description: string;
  url?: string;
  className?: string;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
}

export function PinterestButton({ 
  imageUrl,
  description, 
  url = window.location.href,
  className = "",
  variant = "outline",
  size = "sm"
}: PinterestButtonProps) {
  const handlePin = () => {
    // Generate a placeholder image URL if not provided
    const image = imageUrl || generatePlaceholderImage(description);
    
    const pinterestUrl = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&media=${encodeURIComponent(image)}&description=${encodeURIComponent(description)}`;
    
    window.open(pinterestUrl, '_blank', 'width=750,height=600');
    
    toast({
      title: "Pinterest",
      description: "Opening Pinterest to save this palette"
    });
  };

  return (
    <Button 
      variant={variant} 
      size={size}
      onClick={handlePin}
      className={`bg-[#E60023] hover:bg-[#C8102E] text-white border-0 ${className}`}
    >
      <svg 
        className="w-4 h-4 mr-2" 
        viewBox="0 0 24 24" 
        fill="currentColor"
      >
        <path d="M12 0a12 12 0 0 0-4.373 23.178c-.07-.937-.133-2.377.028-3.401.147-.926.949-3.928.949-3.928s-.242-.484-.242-1.2c0-1.124.652-1.963 1.463-1.963.69 0 1.023.518 1.023 1.14 0 .694-.442 1.732-.67 2.694-.19.804.404 1.46 1.198 1.46 1.44 0 2.544-1.518 2.544-3.707 0-1.938-1.394-3.293-3.386-3.293-2.307 0-3.661 1.73-3.661 3.518 0 .697.268 1.444.603 1.85.066.08.076.15.056.232-.061.256-.198.804-.225.916-.035.147-.116.178-.267.107-1-.465-1.625-1.926-1.625-3.1 0-2.523 1.833-4.84 5.286-4.84 2.775 0 4.932 1.977 4.932 4.62 0 2.757-1.739 4.976-4.151 4.976-.811 0-1.573-.421-1.834-.919l-.5 1.903c-.18.695-.668 1.566-.994 2.097A12 12 0 1 0 12 0z"/>
      </svg>
      Pin It
    </Button>
  );
}

// Generate a placeholder image URL for palettes
function generatePlaceholderImage(description: string): string {
  // Using a placeholder service that generates images
  const colors = extractColorsFromDescription(description);
  if (colors.length > 0) {
    // Create a simple gradient placeholder
    return `https://via.placeholder.com/800x600/${colors[0].slice(1)}/${colors[colors.length - 1]?.slice(1) || 'FFFFFF'}?text=Color+Palette`;
  }
  return `https://via.placeholder.com/800x600/A05AFF/FFFFFF?text=Color+Palette`;
}

function extractColorsFromDescription(description: string): string[] {
  const hexPattern = /#[0-9A-Fa-f]{6}/g;
  return description.match(hexPattern) || [];
}

// Social Share Component for multiple platforms
interface SocialShareProps {
  title: string;
  url?: string;
  colors?: string[];
}

export function SocialShare({ title, url = window.location.href, colors = [] }: SocialShareProps) {
  const shareText = `Check out this color palette: ${title} ${colors.join(", ")}`;
  
  const shareToTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, '_blank', 'width=600,height=400');
  };

  const shareToLinkedIn = () => {
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
    window.open(linkedInUrl, '_blank', 'width=600,height=400');
  };

  const shareToFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(facebookUrl, '_blank', 'width=600,height=400');
  };

  const copyLink = () => {
    navigator.clipboard.writeText(url);
    toast({
      title: "Link Copied!",
      description: "Share this palette with others"
    });
  };

  return (
    <div className="flex gap-2 flex-wrap">
      <PinterestButton 
        description={shareText}
        url={url}
      />
      
      <Button variant="outline" size="sm" onClick={shareToTwitter} className="bg-[#1DA1F2] hover:bg-[#1a8cd8] text-white border-0">
        <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
        Tweet
      </Button>
      
      <Button variant="outline" size="sm" onClick={shareToLinkedIn} className="bg-[#0A66C2] hover:bg-[#004182] text-white border-0">
        <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
        LinkedIn
      </Button>
      
      <Button variant="outline" size="sm" onClick={copyLink}>
        <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
        </svg>
        Copy Link
      </Button>
    </div>
  );
}
