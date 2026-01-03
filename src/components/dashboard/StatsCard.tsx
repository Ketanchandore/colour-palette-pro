import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  gradient: "purple" | "teal" | "coral";
  delay?: number;
}

export function StatsCard({ title, value, icon, gradient, delay = 0 }: StatsCardProps) {
  const gradientClasses = {
    purple: "gradient-card-purple",
    teal: "gradient-card-teal",
    coral: "gradient-card-coral",
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl p-6 text-white shadow-glow-md",
        "animate-fade-in-up opacity-0",
        gradientClasses[gradient]
      )}
      style={{ animationDelay: `${delay}ms`, animationFillMode: "forwards" }}
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="relative z-10">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-white/80 font-medium">{title}</p>
            <p className="text-3xl font-bold mt-1">{value}</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
            {icon}
          </div>
        </div>
      </div>
    </div>
  );
}
