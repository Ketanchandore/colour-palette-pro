import { Crown, Star, Gem, Sparkles } from "lucide-react";
import { useSubscription, SubscriptionTier, PREMIUM_THEMES } from "@/hooks/useSubscription";
import { cn } from "@/lib/utils";

const tierIcons: Record<SubscriptionTier, React.ReactNode> = {
  free: <Sparkles className="w-3.5 h-3.5" />,
  silver: <Star className="w-3.5 h-3.5" />,
  gold: <Crown className="w-3.5 h-3.5" />,
  diamond: <Gem className="w-3.5 h-3.5" />,
};

const tierStyles: Record<SubscriptionTier, string> = {
  free: "bg-muted text-muted-foreground",
  silver: "bg-gradient-to-r from-slate-300 via-gray-400 to-slate-500 text-white shadow-lg animate-pulse",
  gold: "bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 text-white shadow-lg shadow-amber-500/30",
  diamond: "bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-500 text-white shadow-lg shadow-purple-500/30 animate-shimmer",
};

interface SubscriptionBadgeProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function SubscriptionBadge({ className, showText = true, size = 'md' }: SubscriptionBadgeProps) {
  const { tier, isSubscribed, level } = useSubscription();

  if (!isSubscribed) return null;

  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs gap-1",
    md: "px-3 py-1 text-sm gap-1.5",
    lg: "px-4 py-1.5 text-base gap-2",
  };

  const theme = tier !== 'free' ? PREMIUM_THEMES[tier as keyof typeof PREMIUM_THEMES] : null;

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full font-semibold transition-all",
        tierStyles[tier],
        sizeClasses[size],
        tier === 'diamond' && "relative overflow-hidden",
        className
      )}
    >
      {tier === 'diamond' && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
      )}
      {tierIcons[tier]}
      {showText && (
        <span className="relative z-10">
          {tier.charAt(0).toUpperCase() + tier.slice(1)} • Level {level}
        </span>
      )}
    </div>
  );
}

export function PremiumIndicator() {
  const { tier, isSubscribed } = useSubscription();
  
  if (!isSubscribed) return null;

  const theme = PREMIUM_THEMES[tier as keyof typeof PREMIUM_THEMES];
  if (!theme) return null;

  return (
    <div className="relative">
      <div 
        className={cn(
          "absolute inset-0 rounded-full blur-md opacity-50",
          `bg-gradient-to-r ${theme.gradient}`
        )}
        style={{
          animation: tier === 'diamond' ? 'pulse 2s infinite' : undefined,
        }}
      />
      <div className={cn(
        "relative w-8 h-8 rounded-full flex items-center justify-center",
        `bg-gradient-to-r ${theme.gradient}`
      )}>
        {tierIcons[tier]}
      </div>
    </div>
  );
}
