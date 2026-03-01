import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";
import SEOHead from "@/components/seo/SEOHead";
import { InternalLinks, InternalLink } from "@/components/seo/InternalLinks";

interface Breadcrumb {
  label: string;
  path?: string;
}

interface SEOPageLayoutProps {
  children: ReactNode;
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  structuredData?: object;
  breadcrumbs: Breadcrumb[];
  internalLinks: InternalLink[];
}

export function SEOPageLayout({
  children,
  title,
  description,
  keywords,
  canonicalUrl,
  ogImage,
  structuredData,
  breadcrumbs,
  internalLinks,
}: SEOPageLayoutProps) {
  return (
    <MainLayout>
      <SEOHead
        title={title}
        description={description}
        keywords={keywords}
        canonicalUrl={canonicalUrl}
        ogImage={ogImage}
        structuredData={structuredData}
      />

      <div className="p-6 lg:p-8 max-w-5xl mx-auto">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-1 text-sm text-muted-foreground flex-wrap">
            <li>
              <Link to="/" className="hover:text-foreground transition-colors">
                Home
              </Link>
            </li>
            {breadcrumbs.map((crumb, index) => (
              <li key={index} className="flex items-center gap-1">
                <ChevronRight className="w-3 h-3" />
                {crumb.path ? (
                  <Link to={crumb.path} className="hover:text-foreground transition-colors">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-foreground font-medium">{crumb.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>

        {/* Page Content */}
        <article className="prose-custom">
          {children}
        </article>

        {/* Internal Links Footer */}
        <InternalLinks links={internalLinks} />
      </div>
    </MainLayout>
  );
}

export default SEOPageLayout;
