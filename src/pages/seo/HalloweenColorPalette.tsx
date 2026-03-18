import { SEOPageLayout } from "@/components/seo/SEOPageLayout";
import { FAQSection } from "@/components/seo/FAQSection";
import { Link } from "react-router-dom";
import { Check, Palette, Eye } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const halloweenPalettes = [
  {
    name: "Classic Halloween",
    slug: "classic-halloween",
    colors: ["#FF6600", "#1A1A2E", "#6B0F1A", "#FFD700", "#2D1B69"],
    description: "The quintessential Halloween palette — bold orange, deep black, blood red, golden yellow, and haunted purple.",
  },
  {
    name: "Spooky Night",
    slug: "spooky-night",
    colors: ["#0D0D0D", "#1B1464", "#4A0E4E", "#8B0000", "#FF4500"],
    description: "A dark, eerie palette capturing the essence of a haunted midnight sky with crimson and ember accents.",
  },
  {
    name: "Gothic Halloween",
    slug: "gothic-halloween",
    colors: ["#2C003E", "#512B58", "#900C3F", "#C70039", "#1A1A2E"],
    description: "Deep, moody tones inspired by Victorian gothic architecture and midnight masquerade balls.",
  },
  {
    name: "Pumpkin Patch",
    slug: "pumpkin-patch",
    colors: ["#FF7518", "#E85D04", "#DC2F02", "#9D0208", "#370617"],
    description: "Warm harvest tones from golden pumpkin to deep burgundy — perfect for autumn-themed Halloween designs.",
  },
  {
    name: "Witch's Brew",
    slug: "witchs-brew",
    colors: ["#2ECC71", "#1ABC9C", "#0D0D0D", "#6C3483", "#F39C12"],
    description: "Bubbling cauldron greens, mystical purples, and enchanting gold — a magical Halloween color scheme.",
  },
  {
    name: "Haunted Mansion",
    slug: "haunted-mansion",
    colors: ["#2C3E50", "#34495E", "#7F8C8D", "#95A5A6", "#BDC3C7"],
    description: "Ghostly grays and shadowy blues that evoke the atmosphere of an abandoned Victorian manor.",
  },
  {
    name: "Candy Corn",
    slug: "candy-corn",
    colors: ["#FFFFFF", "#FFF200", "#FF8C00", "#FF6600", "#FF4500"],
    description: "The iconic candy corn gradient — sweet, playful, and instantly recognizable Halloween colors.",
  },
  {
    name: "Vampire Blood",
    slug: "vampire-blood",
    colors: ["#8B0000", "#B22222", "#DC143C", "#1A1A1A", "#2C003E"],
    description: "Rich crimson and deep black palette inspired by Dracula's castle and vampire folklore.",
  },
  {
    name: "Skeleton Bone",
    slug: "skeleton-bone",
    colors: ["#F5F5DC", "#FAEBD7", "#2C2C2C", "#1A1A1A", "#808080"],
    description: "Bone white and charcoal black — a minimalist Halloween palette with an eerie elegance.",
  },
  {
    name: "Enchanted Forest",
    slug: "enchanted-forest",
    colors: ["#013220", "#1B4332", "#2D6A4F", "#40916C", "#52B788"],
    description: "Deep forest greens that evoke a mysterious woodland where witches gather under the full moon.",
  },
];

function ColorSwatch({ color, name }: { color: string; name: string }) {
  const [copied, setCopied] = useState(false);

  const copyColor = () => {
    navigator.clipboard.writeText(color);
    setCopied(true);
    toast.success(`Copied ${color}`);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      onClick={copyColor}
      className="group flex-1 min-w-[60px] h-24 sm:h-32 rounded-xl relative overflow-hidden transition-transform hover:scale-105 shadow-md"
      style={{ backgroundColor: color }}
      title={`Copy ${color}`}
    >
      <div className="absolute inset-0 flex items-end justify-center pb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
        {copied ? (
          <Check className="w-4 h-4 text-white" />
        ) : (
          <span className="text-xs font-mono text-white font-bold">{color}</span>
        )}
      </div>
    </button>
  );
}

const faqs = [
  {
    question: "What are the best Halloween color palettes for 2026?",
    answer: "The top Halloween color palettes for 2026 include classic combinations of orange (#FF6600) and black (#1A1A2E), gothic purples (#2C003E, #512B58), spooky greens (#2ECC71), and vampire reds (#8B0000, #DC143C). Modern Halloween designs also incorporate midnight blue, bone white, and enchanted forest greens for a fresh take on traditional spooky aesthetics."
  },
  {
    question: "What colors are traditionally associated with Halloween?",
    answer: "Traditional Halloween colors include orange (representing pumpkins and autumn harvest), black (symbolizing death and darkness), purple (for mystery and magic), green (for witchcraft and potions), red (for blood and vampires), and yellow/gold (for candlelight and jack-o'-lanterns). These colors have been associated with Halloween since the Celtic festival of Samhain."
  },
  {
    question: "How do I use Halloween colors in web design?",
    answer: "To use Halloween colors in web design: 1) Start with a dark background (#1A1A2E or #0D0D0D) for a spooky atmosphere. 2) Use orange (#FF6600) or red (#DC143C) as accent colors for CTAs and highlights. 3) Add purple (#6C3483) for secondary elements. 4) Ensure WCAG contrast ratios are met — use our Contrast Checker tool. 5) Balance dark tones with lighter accents like bone white (#F5F5DC) or gold (#FFD700) for readability."
  },
  {
    question: "Can I use spooky color palettes for non-Halloween designs?",
    answer: "Absolutely! Spooky color palettes work great for horror-themed games, dark fantasy branding, gothic fashion websites, escape room businesses, haunted attraction marketing, thriller book covers, and moody photography portfolios. The deep, dramatic tones create visual impact year-round."
  },
  {
    question: "What is the hex code for Halloween orange?",
    answer: "The most popular hex code for Halloween orange is #FF6600 (also called safety orange). Other Halloween orange variations include pumpkin orange (#FF7518), burnt orange (#E85D04), and dark orange (#FF8C00). These hex values create the warm, autumnal tones synonymous with jack-o'-lanterns and harvest festivals."
  },
  {
    question: "How many colors should a Halloween palette have?",
    answer: "A well-balanced Halloween palette typically has 3-5 colors. Start with 2 dominant colors (e.g., black and orange), add 1-2 supporting colors (purple, green, or red), and include 1 accent color (gold, bone white, or blood red). This 60-30-10 color distribution rule ensures visual harmony while maintaining the spooky Halloween vibe."
  },
];

const internalLinks = [
  { label: "Color Palette Generator", path: "/generator", description: "Create custom Halloween palettes with our AI generator" },
  { label: "Contrast Checker", path: "/contrast-checker", description: "Ensure your spooky designs meet WCAG accessibility standards" },
  { label: "Color Explorer", path: "/color-explorer", description: "Browse 50,000+ colors including Halloween shades" },
  { label: "2026 Color Trends", path: "/trends", description: "Explore trending colors and seasonal palettes for 2026" },
  { label: "UI Designer Palettes", path: "/palettes/ui-designer", description: "Professional color palettes for digital design" },
  { label: "HEX vs RGB vs HSL", path: "/compare/hex-vs-rgb-vs-hsl", description: "Convert Halloween hex codes to any format" },
];

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "10 Best Halloween Color Palettes for 2026 — Spooky, Gothic & Classic Schemes",
  "description": "Curated collection of 10 stunning Halloween color palettes with hex codes. Includes classic orange & black, gothic, spooky, vampire, and enchanted forest color schemes for designers.",
  "author": { "@type": "Organization", "name": "Colour Pine" },
  "publisher": { "@type": "Organization", "name": "Colour Pine", "url": "https://colourpine.com" },
  "datePublished": "2026-03-18",
  "dateModified": "2026-03-18",
  "mainEntityOfPage": "https://colourpine.com/palettes/halloween-color-palette",
};

export default function HalloweenColorPalette() {
  return (
    <SEOPageLayout
      title="10 Best Halloween Color Palettes 2026 — Spooky Hex Codes & Schemes"
      description="Curated Halloween color palettes with hex codes. Classic orange & black, gothic purple, spooky green, vampire red, and more. Free to copy & use in your designs."
      keywords="halloween color palette, halloween colors, spooky color palette, halloween color schemes, gothic halloween colors, halloween hex codes, spooky color palettes, halloween palette, halloween color palettes, pumpkin color palette"
      canonicalUrl="https://colourpine.com/palettes/halloween-color-palette"
      structuredData={structuredData}
      breadcrumbs={[
        { label: "Palettes", path: "/trending" },
        { label: "Halloween Color Palette" },
      ]}
      internalLinks={internalLinks}
    >
      {/* Hero */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-purple-900 flex items-center justify-center shadow-lg">
            <Palette className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">
              Halloween Color Palettes
            </h1>
            <p className="text-muted-foreground text-sm">10 Spooky & Gothic Schemes with Hex Codes</p>
          </div>
        </div>
        <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl">
          Explore our curated collection of <strong>Halloween color palettes</strong> featuring classic orange & black, 
          gothic purples, spooky greens, and vampire reds. Each palette includes <strong>hex codes</strong> ready to 
          copy and use in your designs, websites, social media graphics, and party decorations. Whether you're designing 
          a haunted house flyer or a spooky website, these <strong>Halloween color schemes</strong> will set the perfect mood.
        </p>
      </div>

      {/* Palette Grid */}
      <div className="space-y-8 mb-12">
        {halloweenPalettes.map((palette, index) => (
          <section key={palette.slug} className="group">
            <div className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xl font-display font-bold text-foreground">
                  {index + 1}. {palette.name}
                </h2>
                <Link
                  to={`/palettes/halloween/${palette.slug}`}
                  className="text-sm text-primary hover:underline flex items-center gap-1"
                >
                  <Eye className="w-4 h-4" /> View Details
                </Link>
              </div>
              <p className="text-muted-foreground text-sm mb-4">{palette.description}</p>
              <div className="flex gap-2 sm:gap-3">
                {palette.colors.map((color) => (
                  <ColorSwatch key={color} color={color} name={palette.name} />
                ))}
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {palette.colors.map((color) => (
                  <code key={color} className="text-xs bg-muted px-2 py-1 rounded font-mono text-muted-foreground">
                    {color}
                  </code>
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* Content Section for SEO */}
      <section className="mb-12 prose-custom max-w-none">
        <h2 className="text-2xl font-display font-bold text-foreground mb-4">
          How to Choose the Perfect Halloween Color Scheme
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Choosing the right <strong>Halloween color palette</strong> depends on the mood you want to create. 
          For a classic, family-friendly vibe, go with the traditional orange and black combination. For a more 
          sophisticated and eerie atmosphere, gothic palettes with deep purples and midnight blues work beautifully. 
          If you're designing for a younger audience, brighter palettes like Candy Corn or Witch's Brew add a 
          fun, playful touch.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-4">
          When using <strong>spooky color palettes</strong> in digital design, always check contrast ratios for 
          accessibility. Dark backgrounds require light text with sufficient contrast — use our{" "}
          <Link to="/contrast-checker" className="text-primary hover:underline">Contrast Checker</Link>{" "}
          to validate your color combinations meet WCAG 2.1 AA standards.
        </p>
        <h3 className="text-xl font-display font-semibold text-foreground mb-3 mt-6">
          Halloween Color Psychology
        </h3>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Halloween colors carry deep psychological associations. <strong>Orange</strong> evokes warmth, energy, 
          and the autumn harvest season. <strong>Black</strong> represents mystery, death, and the unknown. 
          <strong>Purple</strong> symbolizes magic, royalty, and the supernatural. <strong>Green</strong> connects 
          to witchcraft, potions, and otherworldly creatures. <strong>Red</strong> triggers emotions of danger, 
          blood, and intensity — making it perfect for vampire and horror themes.
        </p>
        <h3 className="text-xl font-display font-semibold text-foreground mb-3 mt-6">
          Using Halloween Palettes in Web Design
        </h3>
        <p className="text-muted-foreground leading-relaxed">
          To implement these <strong>Halloween color schemes</strong> in your website, use our{" "}
          <Link to="/code-export" className="text-primary hover:underline">Code Export</Link> tool to generate 
          CSS variables, Tailwind config, or SCSS tokens. You can also use the{" "}
          <Link to="/generator" className="text-primary hover:underline">Palette Generator</Link> to create 
          custom variations based on these Halloween palettes. Each hex code above is click-to-copy for 
          instant use in your design tools like Figma, Sketch, or Adobe XD.
        </p>
      </section>

      {/* FAQ */}
      <FAQSection faqs={faqs} />
    </SEOPageLayout>
  );
}
