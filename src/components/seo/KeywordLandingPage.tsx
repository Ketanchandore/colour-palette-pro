import { Link } from "react-router-dom";
import { Copy } from "lucide-react";
import { toast } from "sonner";
import { MainLayout } from "@/components/layout/MainLayout";
import SEOHead from "@/components/seo/SEOHead";
import { FAQSection } from "@/components/seo/FAQSection";
import { InternalLinks } from "@/components/seo/InternalLinks";

interface PaletteSpec {
  name: string;
  description: string;
  colors: string[];
}

interface KeywordLandingProps {
  title: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  canonicalPath: string;
  h1: string;
  intro: string;
  longIntro: string;
  palettes: PaletteSpec[];
  whyMatters: string[];
  howToUse: { title: string; body: string }[];
  faqs: { question: string; answer: string }[];
  relatedLinks: { label: string; path: string; description: string }[];
  breadcrumbLabel: string;
}

export function KeywordLandingPage(props: KeywordLandingProps) {
  const {
    title, metaTitle, metaDescription, keywords, canonicalPath, h1, intro, longIntro,
    palettes, whyMatters, howToUse, faqs, relatedLinks, breadcrumbLabel,
  } = props;

  const copyHex = (hex: string) => {
    navigator.clipboard.writeText(hex);
    toast.success(`Copied ${hex}`);
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: title,
    description: metaDescription,
    url: `https://colourpine.com${canonicalPath}`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: palettes.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "CreativeWork",
          name: p.name,
          description: p.description,
          keywords: p.colors.join(", "),
        },
      })),
    },
  };

  return (
    <MainLayout>
      <SEOHead
        title={metaTitle}
        description={metaDescription}
        keywords={keywords}
        canonicalUrl={canonicalPath}
        structuredData={structuredData}
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Color Palettes", url: "/palettes/festival" },
          { name: breadcrumbLabel, url: canonicalPath },
        ]}
      />
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-foreground">Home</Link> /{" "}
          <Link to="/palettes/festival" className="hover:text-foreground">Palettes</Link> /{" "}
          <span className="text-foreground">{breadcrumbLabel}</span>
        </nav>

        <header className="mb-10">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">{h1}</h1>
          <p className="text-lg text-muted-foreground max-w-3xl">{intro}</p>
        </header>

        <article className="space-y-12">
          <section>
            <p className="text-foreground/90 leading-relaxed max-w-3xl">{longIntro}</p>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-6">
              {palettes.length}+ Curated Palettes — Copy HEX Codes Instantly
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {palettes.map((p) => (
                <div key={p.name} className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="flex h-32">
                    {p.colors.map((c) => (
                      <button
                        key={c}
                        onClick={() => copyHex(c)}
                        className="flex-1 group relative"
                        style={{ backgroundColor: c }}
                        aria-label={`Copy ${c}`}
                      >
                        <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 text-white text-xs font-mono">
                          {c}
                        </span>
                      </button>
                    ))}
                  </div>
                  <div className="p-4">
                    <h3 className="font-display font-bold text-foreground mb-1">{p.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{p.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {p.colors.map((c) => (
                        <button
                          key={c}
                          onClick={() => copyHex(c)}
                          className="text-xs font-mono px-2 py-1 bg-muted rounded hover:bg-muted/70 flex items-center gap-1"
                        >
                          {c} <Copy className="w-3 h-3" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4">Why This Color Palette Matters</h2>
            <ul className="space-y-3">
              {whyMatters.map((m, i) => (
                <li key={i} className="flex gap-3 text-foreground/90">
                  <span className="text-primary font-bold">✦</span>
                  <span>{m}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-6">How to Use These Colors</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {howToUse.map((h, i) => (
                <div key={i} className="bg-card border border-border rounded-xl p-5">
                  <h3 className="font-display font-bold text-foreground mb-2">{h.title}</h3>
                  <p className="text-sm text-muted-foreground">{h.body}</p>
                </div>
              ))}
            </div>
          </section>

          <FAQSection faqs={faqs} title={`${breadcrumbLabel} FAQ`} />
          <InternalLinks links={relatedLinks} title="Related Color Resources" />
        </article>
      </div>
    </MainLayout>
  );
}

export default KeywordLandingPage;
