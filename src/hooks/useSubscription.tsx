import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export type SubscriptionTier = 'free' | 'silver' | 'gold' | 'diamond';
export type SubscriptionDuration = 'monthly' | 'quarterly' | 'biannual' | 'annual';

interface Subscription {
  id: string;
  tier: SubscriptionTier;
  duration: SubscriptionDuration;
  starts_at: string;
  expires_at: string;
  is_active: boolean;
}

interface UsageTracking {
  tool_usage_count: number;
  month_year: string;
}

interface SubscriptionContextType {
  subscription: Subscription | null;
  usage: UsageTracking | null;
  loading: boolean;
  tier: SubscriptionTier;
  isSubscribed: boolean;
  isPremium: boolean;
  level: number;
  remainingUsage: number;
  maxUsage: number;
  canUseAdvancedTools: boolean;
  checkAndIncrementUsage: () => Promise<boolean>;
  refreshSubscription: () => Promise<void>;
}

// Subscription tier configuration
export const SUBSCRIPTION_CONFIG = {
  free: {
    name: 'Free',
    price: 0,
    monthlyLimit: 10,
    level: 4,
    features: ['Basic color tools', 'Limited usage', 'Community support'],
    advancedToolsAccess: false,
  },
  silver: {
    name: 'Silver',
    price: 49,
    monthlyLimit: 50,
    level: 3,
    features: ['Silver Theme', 'All free features', '50 uses/month', 'Priority support', 'Basic advanced tools'],
    advancedToolsAccess: true,
    discount: { quarterly: 5, biannual: 10, annual: 15 },
  },
  gold: {
    name: 'Gold',
    price: 79,
    monthlyLimit: 200,
    level: 2,
    features: ['Gold Theme', 'All Silver features', '200 uses/month', 'Premium support', 'All advanced tools'],
    advancedToolsAccess: true,
    discount: { quarterly: 10, biannual: 15, annual: 20 },
  },
  diamond: {
    name: 'Diamond',
    price: 99,
    monthlyLimit: Infinity,
    level: 1,
    features: ['Diamond Theme', 'All Gold features', 'Unlimited uses', 'VIP support', 'Early access features'],
    advancedToolsAccess: true,
    discount: { quarterly: 15, biannual: 20, annual: 30 },
  },
};

// Premium themes for each tier
export const PREMIUM_THEMES = {
  silver: {
    id: 'silver',
    name: 'Silver Elite',
    description: 'Elegant metallic elegance',
    gradient: 'from-slate-300 via-gray-400 to-slate-500',
    accentGradient: 'from-slate-400 to-gray-600',
    glowColor: 'rgba(148, 163, 184, 0.4)',
    borderColor: 'border-slate-400',
    animation: 'silver-shimmer',
    cssVars: {
      '--theme-primary': '215 16% 47%',
      '--theme-accent': '215 20% 65%',
      '--theme-glow': '215 16% 55%',
    },
  },
  gold: {
    id: 'gold',
    name: 'Golden Luxe',
    description: 'Royal gold magnificence',
    gradient: 'from-yellow-400 via-amber-500 to-yellow-600',
    accentGradient: 'from-amber-400 to-yellow-600',
    glowColor: 'rgba(251, 191, 36, 0.4)',
    borderColor: 'border-amber-400',
    animation: 'gold-glow',
    cssVars: {
      '--theme-primary': '43 96% 56%',
      '--theme-accent': '38 92% 50%',
      '--theme-glow': '45 93% 58%',
    },
  },
  diamond: {
    id: 'diamond',
    name: 'Diamond Supreme',
    description: 'World-class brilliance',
    gradient: 'from-cyan-300 via-blue-400 to-purple-500',
    accentGradient: 'from-cyan-400 via-blue-500 to-purple-600',
    glowColor: 'rgba(139, 92, 246, 0.4)',
    borderColor: 'border-purple-400',
    animation: 'diamond-sparkle',
    cssVars: {
      '--theme-primary': '256 83% 66%',
      '--theme-accent': '192 82% 67%',
      '--theme-glow': '280 85% 65%',
    },
  },
};

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export function SubscriptionProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [usage, setUsage] = useState<UsageTracking | null>(null);
  const [loading, setLoading] = useState(true);

  const getCurrentMonthYear = () => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  };

  const fetchSubscription = useCallback(async () => {
    if (!user) {
      setSubscription(null);
      setUsage(null);
      setLoading(false);
      return;
    }

    try {
      // Fetch subscription
      const { data: subData } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_active', true)
        .maybeSingle();

      if (subData) {
        // Check if subscription is expired
        const isExpired = new Date(subData.expires_at) < new Date();
        if (isExpired) {
          // Deactivate expired subscription
          await supabase
            .from('subscriptions')
            .update({ is_active: false })
            .eq('id', subData.id);
          setSubscription(null);
        } else {
          setSubscription({
            id: subData.id,
            tier: subData.tier as SubscriptionTier,
            duration: subData.duration as SubscriptionDuration,
            starts_at: subData.starts_at,
            expires_at: subData.expires_at,
            is_active: subData.is_active,
          });
        }
      } else {
        setSubscription(null);
      }

      // Fetch or create usage tracking
      const monthYear = getCurrentMonthYear();
      const { data: usageData, error: usageError } = await supabase
        .from('usage_tracking')
        .select('*')
        .eq('user_id', user.id)
        .eq('month_year', monthYear)
        .maybeSingle();

      if (usageData) {
        setUsage({
          tool_usage_count: usageData.tool_usage_count,
          month_year: usageData.month_year,
        });
      } else if (!usageError || usageError.code === 'PGRST116') {
        // Create new usage record for this month
        const { data: newUsage } = await supabase
          .from('usage_tracking')
          .insert({ user_id: user.id, month_year: monthYear, tool_usage_count: 0 })
          .select()
          .single();
        
        if (newUsage) {
          setUsage({
            tool_usage_count: newUsage.tool_usage_count,
            month_year: newUsage.month_year,
          });
        }
      }
    } catch (error) {
      console.error('Error fetching subscription:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchSubscription();
  }, [fetchSubscription]);

  const tier: SubscriptionTier = subscription?.tier || 'free';
  const config = SUBSCRIPTION_CONFIG[tier];
  const isSubscribed = tier !== 'free';
  const isPremium = tier === 'gold' || tier === 'diamond';
  const level = config.level;
  const maxUsage = config.monthlyLimit;
  const remainingUsage = Math.max(0, maxUsage - (usage?.tool_usage_count || 0));
  const canUseAdvancedTools = config.advancedToolsAccess;

  const checkAndIncrementUsage = async (): Promise<boolean> => {
    if (!user) return false;
    
    // Unlimited for diamond
    if (tier === 'diamond') return true;
    
    const currentUsage = usage?.tool_usage_count || 0;
    if (currentUsage >= maxUsage) {
      return false;
    }

    // Increment usage
    const monthYear = getCurrentMonthYear();
    await supabase
      .from('usage_tracking')
      .upsert({
        user_id: user.id,
        month_year: monthYear,
        tool_usage_count: currentUsage + 1,
      }, { onConflict: 'user_id,month_year' });

    setUsage(prev => prev ? { ...prev, tool_usage_count: currentUsage + 1 } : null);
    return true;
  };

  const refreshSubscription = async () => {
    setLoading(true);
    await fetchSubscription();
  };

  return (
    <SubscriptionContext.Provider
      value={{
        subscription,
        usage,
        loading,
        tier,
        isSubscribed,
        isPremium,
        level,
        remainingUsage,
        maxUsage,
        canUseAdvancedTools,
        checkAndIncrementUsage,
        refreshSubscription,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscription() {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error("useSubscription must be used within a SubscriptionProvider");
  }
  return context;
}
