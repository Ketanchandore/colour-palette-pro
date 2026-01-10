import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Check, Crown, Star, Gem, Sparkles, Zap, ArrowRight, Shield } from "lucide-react";
import { useSubscription, SUBSCRIPTION_CONFIG, SubscriptionTier, SubscriptionDuration } from "@/hooks/useSubscription";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const tierIcons: Record<SubscriptionTier, React.ReactNode> = {
  free: <Sparkles className="w-8 h-8" />,
  silver: <Star className="w-8 h-8" />,
  gold: <Crown className="w-8 h-8" />,
  diamond: <Gem className="w-8 h-8" />,
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

export default function Subscription() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { tier: currentTier, usage, maxUsage, level, refreshSubscription, isSubscribed } = useSubscription();
  const [selectedDuration, setSelectedDuration] = useState<SubscriptionDuration>('monthly');
  const [loading, setLoading] = useState<SubscriptionTier | null>(null);

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

  const handleSubscribe = async (tier: SubscriptionTier) => {
    if (!user) {
      navigate("/auth");
      return;
    }

    setLoading(tier);
    try {
      const expiresAt = new Date();
      expiresAt.setMonth(expiresAt.getMonth() + durationMonths[selectedDuration]);

      const { error } = await supabase
        .from('subscriptions')
        .upsert({
          user_id: user.id,
          tier: tier,
          duration: selectedDuration,
          starts_at: new Date().toISOString(),
          expires_at: expiresAt.toISOString(),
          is_active: true,
        }, { onConflict: 'user_id' });

      if (error) throw error;

      toast.success(`🎉 Welcome to ${tier.charAt(0).toUpperCase() + tier.slice(1)} tier!`);
      await refreshSubscription();
    } catch (error: any) {
      toast.error("Failed to subscribe: " + error.message);
    } finally {
      setLoading(null);
    }
  };

  const usedPercentage = maxUsage === Infinity ? 0 : ((usage?.tool_usage_count || 0) / maxUsage) * 100;

  return (
    <MainLayout>
      <div className="p-6 lg:p-8 max-w-6xl space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 text-white font-medium">
            <Crown className="w-5 h-5" />
            Premium Plans
          </div>
          <h1 className="text-4xl font-display font-bold">
            Unlock Your Creative Potential
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose the perfect plan to access premium themes, advanced tools, and unlimited color palette generation
          </p>
        </div>

        {/* Current Status */}
        {user && (
          <div className="bg-card rounded-2xl border border-border p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className={cn(
                  "w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br text-white",
                  tierGradients[currentTier]
                )}>
                  {tierIcons[currentTier]}
                </div>
                <div>
                  <h3 className="font-bold text-lg">
                    {SUBSCRIPTION_CONFIG[currentTier].name} Plan
                  </h3>
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    Level {level} • {maxUsage === Infinity ? 'Unlimited' : `${usage?.tool_usage_count || 0}/${maxUsage}`} uses
                  </p>
                </div>
              </div>
              <div className="flex-1 max-w-xs">
                <div className="flex justify-between text-sm mb-1">
                  <span>Monthly Usage</span>
                  <span>{maxUsage === Infinity ? '∞' : `${100 - Math.round(usedPercentage)}% remaining`}</span>
                </div>
                <Progress value={usedPercentage} className="h-2" />
              </div>
            </div>
          </div>
        )}

        {/* Duration Selector */}
        <div className="flex flex-wrap justify-center gap-3">
          {(Object.entries(durationLabels) as [SubscriptionDuration, string][]).map(([duration, label]) => (
            <Button
              key={duration}
              variant={selectedDuration === duration ? "default" : "outline"}
              size="lg"
              onClick={() => setSelectedDuration(duration)}
              className={cn(
                "relative rounded-xl",
                selectedDuration === duration && "bg-gradient-to-r from-primary to-secondary"
              )}
            >
              {label}
              {duration !== 'monthly' && (
                <Badge className="absolute -top-2 -right-2 text-[10px] px-1.5 py-0.5 bg-emerald-500 border-0">
                  -{getDiscount('gold', duration)}%
                </Badge>
              )}
            </Button>
          ))}
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {tiers.map((tier) => {
            const config = SUBSCRIPTION_CONFIG[tier];
            const price = calculatePrice(tier, selectedDuration);
            const discount = getDiscount(tier, selectedDuration);
            const isCurrent = currentTier === tier;
            const isPopular = tier === 'gold';

            return (
              <div
                key={tier}
                className={cn(
                  "relative rounded-3xl border-2 p-8 transition-all duration-500",
                  isPopular ? "border-amber-400 scale-105 shadow-2xl shadow-amber-500/20" : "border-border hover:border-primary/50",
                  isCurrent && "ring-2 ring-primary ring-offset-2",
                  tier === 'diamond' && "overflow-hidden"
                )}
              >
                {/* Diamond sparkle effect */}
                {tier === 'diamond' && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/5 to-transparent animate-shimmer pointer-events-none" />
                )}
                
                {/* Popular badge */}
                {isPopular && (
                  <Badge className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-gradient-to-r from-amber-500 to-yellow-500 text-white text-sm border-0">
                    🔥 Most Popular
                  </Badge>
                )}

                {isCurrent && (
                  <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">
                    Current
                  </Badge>
                )}

                {/* Header */}
                <div className="flex flex-col items-center text-center mb-8">
                  <div className={cn(
                    "w-20 h-20 rounded-3xl flex items-center justify-center mb-4 bg-gradient-to-br shadow-lg",
                    tierGradients[tier],
                    tier === 'silver' && "animate-silver-glow",
                    tier === 'gold' && "animate-gold-glow",
                    tier === 'diamond' && "animate-diamond-pulse"
                  )}>
                    <span className="text-white">{tierIcons[tier]}</span>
                  </div>
                  <h3 className="text-2xl font-bold">{config.name}</h3>
                  <div className="mt-4">
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-4xl font-bold">₹{price}</span>
                      <span className="text-muted-foreground">/{durationLabels[selectedDuration]}</span>
                    </div>
                    {discount > 0 && (
                      <p className="text-sm text-emerald-500 font-medium mt-1">
                        Save {discount}% with {durationLabels[selectedDuration]}
                      </p>
                    )}
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-4 mb-8">
                  {config.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className={cn(
                        "w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0",
                        `bg-gradient-to-br ${tierGradients[tier]}`
                      )}>
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Level Badge */}
                <div className="flex justify-center mb-6">
                  <Badge variant="secondary" className="gap-1.5 px-4 py-1.5">
                    <Zap className="w-4 h-4" />
                    Level {config.level}
                  </Badge>
                </div>

                {/* Subscribe Button */}
                <Button
                  onClick={() => handleSubscribe(tier)}
                  disabled={loading !== null || isCurrent}
                  className={cn(
                    "w-full py-6 text-lg font-bold rounded-xl transition-all hover:scale-105",
                    isCurrent 
                      ? "bg-muted text-muted-foreground cursor-not-allowed" 
                      : `bg-gradient-to-r ${tierGradients[tier]} text-white shadow-lg`
                  )}
                >
                  {loading === tier ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : isCurrent ? (
                    "Current Plan"
                  ) : (
                    <>
                      Get {config.name}
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            );
          })}
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Secure Payment
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4" />
            Instant Activation
          </div>
          <div className="flex items-center gap-2">
            <ArrowRight className="w-4 h-4" />
            Cancel Anytime
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
