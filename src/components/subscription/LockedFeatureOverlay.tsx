import { useState } from "react";
import { Lock, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SubscriptionModal } from "./SubscriptionModal";

interface LockedFeatureOverlayProps {
  onUnlock?: () => void;
  tier?: 'silver' | 'gold' | 'diamond';
  feature?: string;
  className?: string;
}

export function LockedFeatureOverlay({ onUnlock, tier = 'silver', feature, className }: LockedFeatureOverlayProps) {
  const [showModal, setShowModal] = useState(false);

  const tierLabels = {
    silver: 'Silver',
    gold: 'Gold', 
    diamond: 'Diamond',
  };

  const tierGradients = {
    silver: 'from-slate-300 via-gray-400 to-slate-500',
    gold: 'from-yellow-400 via-amber-500 to-yellow-600',
    diamond: 'from-cyan-300 via-blue-400 to-purple-500',
  };

  const handleUnlock = () => {
    if (onUnlock) {
      onUnlock();
    } else {
      setShowModal(true);
    }
  };

  return (
    <>
      <div className={cn(
        "relative z-10 flex flex-col items-center justify-center p-8 rounded-2xl border-2 border-dashed border-primary/30 bg-muted/50",
        className
      )}>
        <div className="text-center space-y-4 max-w-sm">
          <div className={cn(
            "w-20 h-20 mx-auto rounded-2xl flex items-center justify-center bg-gradient-to-br shadow-lg",
            tierGradients[tier]
          )}>
            <Lock className="w-10 h-10 text-white" />
          </div>
          
          <div>
            <h3 className="text-xl font-bold">{feature || "Premium Feature"}</h3>
            <p className="text-sm text-muted-foreground mt-2">
              This advanced tool requires a {tierLabels[tier]} subscription or higher
            </p>
          </div>

          <Button
            onClick={handleUnlock}
            className={cn(
              "bg-gradient-to-r text-white hover:opacity-90 shadow-lg",
              tierGradients[tier]
            )}
            size="lg"
          >
            <Crown className="w-4 h-4 mr-2" />
            Unlock with {tierLabels[tier]}
          </Button>

          <p className="text-xs text-muted-foreground">
            Starting at just ₹49/month
          </p>
        </div>
      </div>
      <SubscriptionModal open={showModal} onOpenChange={setShowModal} />
    </>
  );
}
