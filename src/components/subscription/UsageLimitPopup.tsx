import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, Crown, Zap } from "lucide-react";
import { useSubscription, SUBSCRIPTION_CONFIG } from "@/hooks/useSubscription";
import { cn } from "@/lib/utils";

interface UsageLimitPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpgrade: () => void;
}

export function UsageLimitPopup({ open, onOpenChange, onUpgrade }: UsageLimitPopupProps) {
  const { tier, usage, maxUsage, remainingUsage } = useSubscription();
  const usedPercentage = maxUsage === Infinity ? 0 : ((usage?.tool_usage_count || 0) / maxUsage) * 100;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="mx-auto w-16 h-16 rounded-full bg-amber-500/10 flex items-center justify-center mb-4">
            <AlertTriangle className="w-8 h-8 text-amber-500" />
          </div>
          <DialogTitle className="text-center text-xl">
            Monthly Credits Exhausted!
          </DialogTitle>
          <DialogDescription className="text-center">
            You've used all your free credits for this month
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Usage Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Credits Used</span>
              <span className="font-medium">{usage?.tool_usage_count || 0} / {maxUsage}</span>
            </div>
            <Progress value={usedPercentage} className="h-3" />
          </div>

          {/* Options */}
          <div className="space-y-3 pt-4">
            <Button
              onClick={onUpgrade}
              className="w-full bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 text-white hover:opacity-90"
              size="lg"
            >
              <Crown className="w-5 h-5 mr-2" />
              Upgrade to Premium
            </Button>
            
            <div className="text-center text-sm text-muted-foreground">
              <p>Or wait until next month for free credits</p>
              <p className="flex items-center justify-center gap-1 mt-1">
                <Zap className="w-3 h-3" />
                Next reset in {getDaysUntilReset()} days
              </p>
            </div>
          </div>

          {/* Tier comparison */}
          <div className="grid grid-cols-3 gap-2 pt-4 border-t">
            {(['silver', 'gold', 'diamond'] as const).map((t) => (
              <div key={t} className="text-center p-2 rounded-lg bg-muted/50">
                <p className="text-xs font-medium capitalize">{t}</p>
                <p className="text-lg font-bold">
                  {SUBSCRIPTION_CONFIG[t].monthlyLimit === Infinity ? '∞' : SUBSCRIPTION_CONFIG[t].monthlyLimit}
                </p>
                <p className="text-[10px] text-muted-foreground">credits/mo</p>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function getDaysUntilReset(): number {
  const now = new Date();
  const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  return Math.ceil((nextMonth.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}
