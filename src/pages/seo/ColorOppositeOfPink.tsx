import { SEOHead } from "@/components/seo/SEOHead";
import { FAQSection } from "@/components/seo/FAQSection";
import { InternalLinks } from "@/components/seo/InternalLinks";
import { MainLayout } from "@/components/layout/MainLayout";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const opposites = [
  { pink: "#FF69B4", pinkName: "Hot Pink", opposite: "#69FFB4", oppName: "Mint Green", desc: "Vibrant and energetic pairing. Great for youth brands." },
  { pink: "#FFC0CB", pinkName: "Baby Pink", opposite: "#C0FFCB", oppName: "Pale Green", desc: "Soft and gentle. Perfect for nursery or spring designs." },
  { pink: "#FF1493", pinkName: "Deep Pink", opposite: "#14FF93", oppName: "Spring Green", desc: "Bold and electric. Maximum contrast." },
  { pink: "#DB7093", pinkName: "Pale Violet Red", opposite: "#70DB93", oppName: "Medium Aquamarine", desc: "Balanced and elegant. Works for fashion and beauty." },
  { pink: "#FFB6C1", pinkName: "Light Pink", opposite: "#B6FFC1", oppName: "Light Green", desc: "Delicate and fresh. Ideal for wedding themes." },
  { pink: "#E91E63", pinkName: "Material Pink", opposite: "#1EE963", oppName: "Material Green", desc: "Modern UI design pairing. Clean and vibrant." },
];

const faqs = [
  { question: "What is the opposite color of pink?", answer: "The opposite (complementary) color of pink is green. Specifically, hot pink (#FF69B4) is opposite mint green (#69FFB4), and baby pink (#FFC0CB) is opposite pale green (#C0FFCB). The exact shade of green depends on the shade of pink." },
  { question: "What is pink's complementary color?", answer: "Pink's complementary color is green. On the color wheel, pink (a tint of red) sits opposite green. Lighter pinks complement lighter greens, while deeper pinks like magenta complement brighter greens." },
  { question: "What color cancels out pink?", answer: "Green cancels out pink because they are complementary colors. In color correction (makeup, photo editing), a green-tinted concealer or filter neutralizes pink tones." },
  { question: "Does pink go with green?", answer: "Absolutely! Pink and green is one of the most classic and versatile color combinations in design. The key is matching intensity — pastel pink with sage green, or bold pink with emerald green." },
];

const internalLinks = [
  { label: "Pink & Green Palette", path: "/guides/pink-and-green-palette", description: "8 curated pink and green color palettes" },
  { label: "What Colors Go With Red", path: "/guides/what-colors-go-with-red", description: "Expert red color combinations" },
  { label: "Creative Color Wheel", path: "/guides/creative-color-wheel", description: "Interactive color wheel tool" },
  { label: "Color Theory Guide", path: "/glossary/color-theory", description: "Learn fundamentals of color theory" },
  { label: "Contrast Checker", path: "/contrast-checker", description: "Check WCAG contrast for your color pairs" },
  { label: "Palette Generator", path: "/generator", description: "Generate harmonious palettes" },
];

const copy = (hex: string) => { navigator.clipboard.writeText(hex); toast.success(`Copied ${hex}`); };

export default function ColorOppositeOfPink() {
  return (
    <MainLayout>
      <SEOHead
        title="Color Opposite of Pink — Complementary Colors Explained [2026]"
        description="The opposite color of pink is green. Explore 6 pink-green complementary pairs with HEX codes. Learn about pink's complementary color on the color wheel."
        keywords="color opposite of pink, opposite of pink, pink complementary color, what is opposite of pink, pink and green complementary"
        canonicalUrl="/guides/color-opposite-of-pink"
        structuredData={{ "@context": "https://schema.org", "@type": "Article", headline: "Color Opposite of Pink — Complementary Colors Explained", author: { "@type": "Organization", name: "Colour Pine" } }}
      />
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <nav className="text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-foreground">Home</Link> / <Link to="/tools" className="hover:text-foreground">Tools</Link> / <span className="text-foreground">Color Opposite of Pink</span>
        </nav>
        <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">Color Opposite of Pink</h1>
        <p className="text-lg text-muted-foreground mb-8 max-w-3xl">
          The <strong>opposite color of pink is green</strong>. On the color wheel, every shade of pink has a specific green complement. Below are 6 pink-green complementary pairs with HEX codes you can use in your designs.
        </p>

        <div className="space-y-4 mb-12">
          {opposites.map((pair) => (
            <div key={pair.pink} className="rounded-xl border border-border bg-card p-6 flex flex-col sm:flex-row gap-4 items-center">
              <div className="flex items-center gap-3">
                <button onClick={() => copy(pair.pink)} className="group text-center">
                  <div className="w-20 h-20 rounded-lg border border-border" style={{ backgroundColor: pair.pink }} />
                  <p className="text-xs font-mono text-muted-foreground mt-1 group-hover:text-foreground">{pair.pink}</p>
                  <p className="text-xs text-muted-foreground">{pair.pinkName}</p>
                </button>
                <span className="text-2xl text-muted-foreground">↔</span>
                <button onClick={() => copy(pair.opposite)} className="group text-center">
                  <div className="w-20 h-20 rounded-lg border border-border" style={{ backgroundColor: pair.opposite }} />
                  <p className="text-xs font-mono text-muted-foreground mt-1 group-hover:text-foreground">{pair.opposite}</p>
                  <p className="text-xs text-muted-foreground">{pair.oppName}</p>
                </button>
              </div>
              <p className="text-sm text-muted-foreground flex-1">{pair.desc}</p>
            </div>
          ))}
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-display font-bold text-foreground mb-4">Why Green Is the Opposite of Pink</h2>
          <div className="text-sm text-muted-foreground space-y-3">
            <p>Pink is a tint of red (red + white). On the color wheel, red's complementary color is green. Since pink retains red's hue position, its complement remains in the green family — just lighter and softer.</p>
            <p>This complementary relationship means pink and green create maximum visual contrast when placed together, making each color appear more vibrant. This is why pink flowers stand out so beautifully against green foliage in nature.</p>
          </div>
        </section>

        <FAQSection faqs={faqs} title="FAQ About the Opposite of Pink" />
        <InternalLinks links={internalLinks} />
      </div>
    </MainLayout>
  );
}
