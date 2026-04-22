import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { resolveBreadcrumbs } from "@/lib/seo/breadcrumbs";

/**
 * Site-wide auto-injector. Mounted once at the app root. Watches the route
 * and writes a BreadcrumbList JSON-LD into <head> on every navigation.
 *
 * This guarantees every page (even ones whose SEOHead doesn't pass a
 * `breadcrumbs` prop) gets BreadcrumbList structured data for Google rich
 * snippets, without touching individual page components.
 */
const SCRIPT_ID = "structured-data-breadcrumbs-auto";
const SITE_URL = "https://colourpine.com";

export const SEOAutoBreadcrumbs = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const crumbs = resolveBreadcrumbs(pathname);
    let script = document.getElementById(SCRIPT_ID);

    if (!crumbs || crumbs.length < 2) {
      if (script) script.remove();
      return;
    }

    if (!script) {
      script = document.createElement("script");
      script.id = SCRIPT_ID;
      script.setAttribute("type", "application/ld+json");
      document.head.appendChild(script);
    }

    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: crumbs.map((c, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: c.name,
        item: c.url.startsWith("http")
          ? c.url
          : `${SITE_URL}${c.url.startsWith("/") ? "" : "/"}${c.url}`,
      })),
    });
  }, [pathname]);

  return null;
};

export default SEOAutoBreadcrumbs;
