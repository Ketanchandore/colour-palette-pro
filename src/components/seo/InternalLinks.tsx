import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export interface InternalLink {
  label: string;
  path: string;
  description: string;
}

interface InternalLinksProps {
  links: InternalLink[];
  title?: string;
}

export function InternalLinks({ links, title = "Explore More Color Tools & Resources" }: InternalLinksProps) {
  return (
    <nav className="mt-16 pt-8 border-t border-border" aria-label="Related pages">
      <h2 className="text-xl font-display font-bold text-foreground mb-6">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className="group flex items-start gap-3 p-4 rounded-xl bg-card border border-border hover:border-primary/30 hover:shadow-glow-sm transition-all duration-200"
          >
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors truncate">
                {link.label}
              </h3>
              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                {link.description}
              </p>
            </div>
            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 mt-0.5" />
          </Link>
        ))}
      </div>
    </nav>
  );
}

export default InternalLinks;
