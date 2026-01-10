import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Crown, Star, Gem, Sparkles, Zap, Lock } from "lucide-react";
import { useSubscription, SUBSCRIPTION_CONFIG, SubscriptionTier, SubscriptionDuration } from "@/hooks/useSubscription";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface SubscriptionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const tierIcons: Record<SubscriptionTier, React.ReactNode> = {
  free: <Sparkles className="w-6 h-6" />,
  silver: <Star className="w-6 h-6" />,
  gold: <Crown className="w-6 h-6" />,
  diamond: <Gem className="w-6 h-6" />,
};

const tierGradients: Record<SubscriptionTier, string> = {
  free: "from-gray-400 to-gray-600",
  silver: "from-slate-300 via-gray-400 to-slate-500",
  gold: "from-yellow-400 via-amber-500 to-yellow-600",
  diamond: "from-cyan-300 via-blue-400 to-purple-500",
};

const durationLabels: Record<SubscriptionDuration, string> = {
  monthly: "1 Month",
  quarterly: "3 Months",
  biannual: "6 Months",
  annual: "12 Months",
};

const durationMonths: Record<SubscriptionDuration, number> = {
  monthly: 1,
  quarterly: 3,
  biannual: 6,
  annual: 12,
};

export function SubscriptionModal({ open, onOpenChange }: SubscriptionModalProps) {
  const { user } = useAuth();
  const { tier: currentTier, refreshSubscription } = useSubscription();
  const [selectedTier, setSelectedTier] = useState<SubscriptionTier>('silver');
  const [selectedDuration, setSelectedDuration] = useState<SubscriptionDuration>('monthly');
  const [loading, setLoading] = useState(false);

  const tiers: SubscriptionTier[] = ['silver', 'gold', 'diamond'];

  const calculatePrice = (tier: SubscriptionTier, duration: SubscriptionDuration) => {
    const config = SUBSCRIPTION_CONFIG[tier];
    if (tier === 'free') return 0;
    
    const basePrice = (config.price || 0) * durationMonths[duration];
    const discount = 'discount' in config ? (config.discount as Record<string, number>)?.[duration] || 0 : 0;
    const discountedPrice = basePrice * (1 - discount / 100);
    return Math.round(discountedPrice);
  };

  const getDiscount = (tier: SubscriptionTier, duration: SubscriptionDuration) => {
    if (tier === 'free' || duration === 'monthly') return 0;
    const config = SUBSCRIPTION_CONFIG[tier];
    return 'discount' in config ? (config.discount as Record<string, number>)?.[duration] || 0 : 0;
  };

  const handleSubscribe = async () => {
    if (!user) {
      toast.error("Please login to subscribe");
      return;
    }

    setLoading(true);
    try {
      // Calculate expiry date
      const expiresAt = new Date();
      expiresAt.setMonth(expiresAt.getMonth() + durationMonths[selectedDuration]);

      // For demo, directly create subscription (Razorpay integration would go here)
      const { error } = await supabase
        .from('subscriptions')
        .upsert({
          user_id: user.id,
          tier: selectedTier,
          duration: selectedDuration,
          starts_at: new Date().toISOString(),
          expires_at: expiresAt.toISOString(),
          is_active: true,
        }, { onConflict: 'user_id' });

      if (error) throw error;

      toast.success(`🎉 Welcome to ${selectedTier.charAt(0).toUpperCase() + selectedTier.slice(1)} tier!`);
      await refreshSubscription();
      onOpenChange(false);
    } catch (error: any) {
      toast.error("Failed to subscribe: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Crown className="w-6 h-6 text-amber-500" />
            Upgrade to Premium
          </DialogTitle>
          <DialogDescription>
            Unlock premium themes, advanced tools, and unlimited access
          </DialogDescription>
        </DialogHeader>

        {/* Duration Selector */}
        <div className="flex flex-wrap justify-center gap-2 my-4">
          {(Object.entries(durationLabels) as [SubscriptionDuration, string][]).map(([duration, label]) => (
            <Button
              key={duration}
              variant={selectedDuration === duration ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedDuration(duration)}
              className={cn(
                "relative",
                selectedDuration === duration && "bg-gradient-to-r from-primary to-secondary"
              )}
            >
              {label}
              {duration !== 'monthly' && (
                <Badge className="absolute -top-2 -right-2 text-[10px] px-1 py-0 bg-emerald-500">
                  -{getDiscount('gold', duration)}%
                </Badge>
              )}
            </Button>
          ))}
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-4 my-6">
          {tiers.map((tier) => {
            const config = SUBSCRIPTION_CONFIG[tier];
            const price = calculatePrice(tier, selectedDuration);
            const discount = getDiscount(tier, selectedDuration);
            const isSelected = selectedTier === tier;
            const isCurrent = currentTier === tier;

            return (
              <div
                key={tier}
                onClick={() => !isCurrent && setSelectedTier(tier)}
                className={cn(
                  "relative rounded-2xl border-2 p-6 cursor-pointer transition-all duration-300",
                  isSelected ? "border-primary scale-105 shadow-xl" : "border-border hover:border-primary/50",
                  isCurrent && "opacity-50 cursor-not-allowed",
                  tier === 'diamond' && "overflow-hidden"
                )}
              >
                {/* Diamond sparkle effect */}
                {tier === 'diamond' && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/10 to-transparent animate-shimmer" />
                )}
                
                {/* Popular badge */}
                {tier === 'gold' && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 to-yellow-500 text-white">
                    Most Popular
                  </Badge>
                )}

                {/* Header */}
                <div className="flex flex-col items-center text-center mb-6">
                  <div className={cn(
                    "w-16 h-16 rounded-2xl flex items-center justify-center mb-4 bg-gradient-to-br",
                    tierGradients[tier]
                  )}>
                    <span className="text-white">{tierIcons[tier]}</span>
                  </div>
                  <h3 className="text-xl font-bold">{config.name}</h3>
                  <div className="mt-2">
                    <span className="text-3xl font-bold">₹{price}</span>
                    <span className="text-muted-foreground">/{durationLabels[selectedDuration]}</span>
                    {discount > 0 && (
                      <div className="text-sm text-emerald-500 font-medium">
                        Save {discount}%
                      </div>
                    )}
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-6">
                  {config.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Level Badge */}
                <div className="flex justify-center mb-4">
                  <Badge variant="secondary" className="gap-1">
                    <Zap className="w-3 h-3" />
                    Level {config.level}
                  </Badge>
                </div>

                {isCurrent && (
                  <div className="text-center text-sm text-muted-foreground">
                    Current Plan
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Subscribe Button */}
        <div className="flex justify-center">
          <Button
            size="lg"
            onClick={handleSubscribe}
            disabled={loading || currentTier === selectedTier}
            className={cn(
              "px-8 py-6 text-lg font-bold rounded-xl bg-gradient-to-r text-white shadow-lg transition-all hover:scale-105",
              tierGradients[selectedTier]
            )}
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Lock className="w-5 h-5 mr-2" />
                Subscribe for ₹{calculatePrice(selectedTier, selectedDuration)}
              </>
            )}
          </Button>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-4">
          Secure payment powered by Razorpay • Cancel anytime • No hidden fees
        </p>
      </DialogContent>
    </Dialog>
  );
}
