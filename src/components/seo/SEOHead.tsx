import { useEffect } from 'react';

export interface BreadcrumbItem {
  name: string;
  url: string;
}

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: string;
  structuredData?: object;
  breadcrumbs?: BreadcrumbItem[];
  noindex?: boolean;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

const SITE_URL = 'https://colourpine.com';
const DEFAULT_OG = 'https://colourpine.com/og-image.jpg';

export const SEOHead = ({
  title = "Colour Pine — #1 AI Color Palette Generator & WCAG Tools 2026",
  description = "World's most advanced free color palette generator. AI brand analysis, WCAG accessibility, 50,000+ colors, Pantone converter, festival palettes & 2026 trends.",
  keywords = "color palette generator, ai color palette, wcag contrast checker, brand colors, 2026 color trends, hex to rgb, pantone to hex, color picker, color scheme generator",
  canonicalUrl,
  ogImage = DEFAULT_OG,
  ogType = "website",
  structuredData,
  breadcrumbs,
  noindex = false,
  author = "Colour Pine",
  publishedTime,
  modifiedTime,
}: SEOHeadProps) => {
  useEffect(() => {
    document.title = title;

    const setMetaByName = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('name', name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    const setMetaByProperty = (property: string, content: string) => {
      let el = document.querySelector(`meta[property="${property}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('property', property);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMetaByName('description', description);
    setMetaByName('keywords', keywords);
    setMetaByName('author', author);
    setMetaByName('robots', noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1');
    setMetaByName('googlebot', noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1');

    // Resolve canonical to absolute URL
    const absoluteCanonical = canonicalUrl
      ? (canonicalUrl.startsWith('http') ? canonicalUrl : `${SITE_URL}${canonicalUrl.startsWith('/') ? '' : '/'}${canonicalUrl}`)
      : `${SITE_URL}${window.location.pathname}`;

    // Open Graph
    setMetaByProperty('og:title', title);
    setMetaByProperty('og:description', description);
    setMetaByProperty('og:image', ogImage);
    setMetaByProperty('og:image:alt', title);
    setMetaByProperty('og:type', ogType);
    setMetaByProperty('og:url', absoluteCanonical);
    setMetaByProperty('og:site_name', 'Colour Pine');
    setMetaByProperty('og:locale', 'en_US');

    if (publishedTime) setMetaByProperty('article:published_time', publishedTime);
    if (modifiedTime) setMetaByProperty('article:modified_time', modifiedTime);

    // Twitter
    setMetaByName('twitter:card', 'summary_large_image');
    setMetaByName('twitter:title', title);
    setMetaByName('twitter:description', description);
    setMetaByName('twitter:image', ogImage);
    setMetaByName('twitter:image:alt', title);
    setMetaByName('twitter:site', '@ColourPine');

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', absoluteCanonical);

    // hreflang
    let hreflang = document.querySelector('link[rel="alternate"][hreflang="x-default"]');
    if (!hreflang) {
      hreflang = document.createElement('link');
      hreflang.setAttribute('rel', 'alternate');
      hreflang.setAttribute('hreflang', 'x-default');
      document.head.appendChild(hreflang);
    }
    hreflang.setAttribute('href', absoluteCanonical);

    // Page-specific structured data
    const pageScriptId = 'structured-data-page';
    let script = document.getElementById(pageScriptId);
    if (structuredData) {
      if (!script) {
        script = document.createElement('script');
        script.id = pageScriptId;
        script.setAttribute('type', 'application/ld+json');
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(structuredData);
    } else if (script) {
      script.remove();
    }

    // BreadcrumbList structured data
    const breadcrumbScriptId = 'structured-data-breadcrumbs';
    let breadcrumbScript = document.getElementById(breadcrumbScriptId);
    if (breadcrumbs && breadcrumbs.length > 0) {
      if (!breadcrumbScript) {
        breadcrumbScript = document.createElement('script');
        breadcrumbScript.id = breadcrumbScriptId;
        breadcrumbScript.setAttribute('type', 'application/ld+json');
        document.head.appendChild(breadcrumbScript);
      }
      breadcrumbScript.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((b, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: b.name,
          item: b.url.startsWith('http') ? b.url : `${SITE_URL}${b.url.startsWith('/') ? '' : '/'}${b.url}`,
        })),
      });
    } else if (breadcrumbScript) {
      breadcrumbScript.remove();
    }
  }, [title, description, keywords, canonicalUrl, ogImage, ogType, structuredData, breadcrumbs, noindex, author, publishedTime, modifiedTime]);

  return null;
};

export default SEOHead;
