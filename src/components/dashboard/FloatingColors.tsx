import { cn } from "@/lib/utils";

const floatingColors = [
  { color: "#A05AFF", size: 120, top: "10%", left: "5%", delay: 0 },
  { color: "#1BCFB4", size: 80, top: "20%", right: "10%", delay: 1 },
  { color: "#4BCBEB", size: 60, top: "60%", left: "15%", delay: 2 },
  { color: "#FE9496", size: 100, bottom: "20%", right: "5%", delay: 3 },
  { color: "#9E58FF", size: 70, top: "40%", right: "25%", delay: 4 },
  { color: "#FFD93D", size: 50, bottom: "30%", left: "30%", delay: 5 },
];

export function FloatingColors() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {floatingColors.map((item, index) => (
        <div
          key={index}
          className={cn(
            "absolute rounded-full opacity-20 blur-3xl animate-float",
          )}
          style={{
            width: item.size,
            height: item.size,
            backgroundColor: item.color,
            top: item.top,
            left: item.left,
            right: item.right,
            bottom: item.bottom,
            animationDelay: `${item.delay * 0.5}s`,
          }}
        />
      ))}
    </div>
  );
}
