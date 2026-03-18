import { useParams, Navigate, Link } from "react-router-dom";
import { SEOPageLayout } from "@/components/seo/SEOPageLayout";
import { FAQSection } from "@/components/seo/FAQSection";
import { useState } from "react";
import { toast } from "sonner";
import { Copy, Check, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const palettes: Record<string, {
  name: string;
  colors: string[];
  description: string;
  longDescription: string;
  useCases: string[];
  cssVars: string;
  faqs: { question: string; answer: string }[];
}> = {
  "classic-halloween": {
    name: "Classic Halloween",
    colors: ["#FF6600", "#1A1A2E", "#6B0F1A", "#FFD700", "#2D1B69"],
    description: "The quintessential Halloween palette — bold orange, deep black, blood red, golden yellow, and haunted purple.",
    longDescription: "The Classic Halloween palette is the gold standard of spooky design. Combining the iconic jack-o'-lantern orange (#FF6600) with the darkest midnight (#1A1A2E), this scheme captures centuries of Halloween tradition. Blood red (#6B0F1A) adds intensity, while golden yellow (#FFD700) brings the warmth of candlelight. Deep haunted purple (#2D1B69) rounds out the palette with a touch of supernatural mystery.",
    useCases: ["Halloween party invitations", "Trick-or-treat posters", "Spooky website themes", "Social media Halloween graphics", "Seasonal email campaigns"],
    cssVars: `:root {\n  --halloween-orange: #FF6600;\n  --halloween-dark: #1A1A2E;\n  --halloween-red: #6B0F1A;\n  --halloween-gold: #FFD700;\n  --halloween-purple: #2D1B69;\n}`,
    faqs: [
      { question: "What makes the Classic Halloween palette work?", answer: "The Classic Halloween palette works because it combines warm (orange, gold) and cool (purple, dark blue) tones with high contrast. Orange and black are the most recognizable Halloween colors, dating back to Celtic Samhain traditions where orange represented autumn harvest and black symbolized death." },
      { question: "How do I use #FF6600 in CSS?", answer: "Use #FF6600 as a CSS color value: `color: #FF6600;` or `background-color: #FF6600;`. In Tailwind CSS, add it to your config: `colors: { 'halloween-orange': '#FF6600' }`. It provides excellent contrast against dark backgrounds." },
      { question: "Is this palette accessible for web design?", answer: "Yes, when used correctly. #FF6600 on #1A1A2E provides a contrast ratio of 5.2:1, exceeding WCAG AA standards. #FFD700 on #1A1A2E achieves 11.3:1, perfect for body text. Avoid placing #6B0F1A on #1A1A2E as the contrast is insufficient." },
    ],
  },
  "spooky-night": {
    name: "Spooky Night",
    colors: ["#0D0D0D", "#1B1464", "#4A0E4E", "#8B0000", "#FF4500"],
    description: "A dark, eerie palette capturing the essence of a haunted midnight sky with crimson and ember accents.",
    longDescription: "Spooky Night plunges you into the darkest hours with near-black (#0D0D0D) and deep midnight blue (#1B1464). The mystic purple (#4A0E4E) creates an otherworldly atmosphere, while dark red (#8B0000) adds a sense of lurking danger. The fiery orange-red (#FF4500) acts as a dramatic accent, like embers glowing in a dark forest.",
    useCases: ["Horror movie posters", "Dark fantasy game UI", "Haunted house branding", "Gothic blog themes", "Halloween merchandise"],
    cssVars: `:root {\n  --spooky-black: #0D0D0D;\n  --spooky-midnight: #1B1464;\n  --spooky-mystic: #4A0E4E;\n  --spooky-crimson: #8B0000;\n  --spooky-ember: #FF4500;\n}`,
    faqs: [
      { question: "What mood does the Spooky Night palette create?", answer: "Spooky Night creates an intensely dark, foreboding atmosphere. The combination of near-black, midnight blue, and deep purple evokes feelings of mystery, fear, and the supernatural. The crimson and ember accents add flashes of danger and warmth, like eyes glowing in the darkness." },
      { question: "How do I maintain readability with such dark colors?", answer: "Use the lighter accent (#FF4500) sparingly for headlines and CTAs. For body text, use white (#FFFFFF) or light gray (#E0E0E0) on the dark backgrounds. The contrast ratio of white on #0D0D0D is 20.4:1, well above WCAG AAA requirements." },
      { question: "Can I use this palette for a mobile app?", answer: "Absolutely! Dark palettes reduce eye strain in low-light conditions and save battery on OLED screens. Use #0D0D0D as the primary background, #1B1464 for cards/surfaces, and #FF4500 for interactive elements and notifications." },
    ],
  },
  "gothic-halloween": {
    name: "Gothic Halloween",
    colors: ["#2C003E", "#512B58", "#900C3F", "#C70039", "#1A1A2E"],
    description: "Deep, moody tones inspired by Victorian gothic architecture and midnight masquerade balls.",
    longDescription: "The Gothic Halloween palette draws inspiration from Victorian-era aesthetics and dark romanticism. Deep imperial purple (#2C003E) forms the foundation, complemented by dusty mauve (#512B58). Rich burgundy (#900C3F) and vivid crimson (#C70039) add passionate intensity, while midnight (#1A1A2E) grounds the palette in darkness. This scheme is perfect for elegant, upscale Halloween designs.",
    useCases: ["Masquerade ball invitations", "Gothic fashion branding", "Dark romance book covers", "Upscale Halloween events", "Victorian-themed websites"],
    cssVars: `:root {\n  --gothic-imperial: #2C003E;\n  --gothic-mauve: #512B58;\n  --gothic-burgundy: #900C3F;\n  --gothic-crimson: #C70039;\n  --gothic-midnight: #1A1A2E;\n}`,
    faqs: [
      { question: "What is a gothic Halloween color palette?", answer: "A gothic Halloween color palette uses deep, rich tones like imperial purple, burgundy, and crimson against dark backgrounds. Unlike the traditional bright orange and black, gothic palettes create a more sophisticated, romantic, and mysterious aesthetic inspired by Victorian architecture, dark literature, and masquerade traditions." },
      { question: "How is gothic different from classic Halloween colors?", answer: "Classic Halloween uses bright orange, black, and green. Gothic Halloween replaces the bright tones with muted purples, rich burgundies, and deep crimsons. The result is more elegant, mature, and dramatic — think Dracula's castle rather than a pumpkin patch." },
      { question: "What fonts pair well with gothic color palettes?", answer: "Serif fonts like Playfair Display, Cormorant Garamond, and Cinzel complement gothic palettes beautifully. For body text, use clean serifs like Lora or Source Serif Pro. Decorative fonts like UnifrakturMaguntia work for headlines but use sparingly for readability." },
    ],
  },
  "pumpkin-patch": {
    name: "Pumpkin Patch",
    colors: ["#FF7518", "#E85D04", "#DC2F02", "#9D0208", "#370617"],
    description: "Warm harvest tones from golden pumpkin to deep burgundy.",
    longDescription: "Pumpkin Patch captures the warmth of an autumn harvest with a gradient from bright pumpkin orange (#FF7518) through fiery tones to deep, dark burgundy (#370617). This monochromatic warm palette creates visual cohesion and depth, perfect for seasonal designs that celebrate the cozy, rustic side of Halloween.",
    useCases: ["Autumn harvest designs", "Pumpkin carving contests", "Farm event branding", "Seasonal restaurant menus", "Fall wedding themes"],
    cssVars: `:root {\n  --pumpkin-bright: #FF7518;\n  --pumpkin-fire: #E85D04;\n  --pumpkin-flame: #DC2F02;\n  --pumpkin-dark: #9D0208;\n  --pumpkin-deep: #370617;\n}`,
    faqs: [
      { question: "What is pumpkin orange hex code?", answer: "The standard pumpkin orange hex code is #FF7518, also known as 'Pumpkin' in CSS named colors. Other popular pumpkin shades include bright orange (#FF8C00), dark pumpkin (#E85D04), and burnt pumpkin (#DC2F02)." },
      { question: "How to create a pumpkin color gradient in CSS?", answer: "Use CSS gradient: `background: linear-gradient(135deg, #FF7518, #E85D04, #DC2F02, #9D0208, #370617);`. This creates a smooth warm-to-dark gradient perfect for Halloween headers and hero sections." },
      { question: "Does this palette work for non-Halloween autumn designs?", answer: "Yes! The Pumpkin Patch palette is excellent for any autumn/fall design — Thanksgiving, harvest festivals, autumn sales, cozy café branding, or fall fashion lookbooks. The warm tones evoke comfort, nature, and seasonal change." },
    ],
  },
  "witchs-brew": {
    name: "Witch's Brew",
    colors: ["#2ECC71", "#1ABC9C", "#0D0D0D", "#6C3483", "#F39C12"],
    description: "Bubbling cauldron greens, mystical purples, and enchanting gold.",
    longDescription: "Witch's Brew conjures the image of a bubbling cauldron with vibrant emerald green (#2ECC71) and teal (#1ABC9C). The pitch-black base (#0D0D0D) represents the cauldron itself, while mystical purple (#6C3483) adds enchantment. Golden amber (#F39C12) glows like magical sparks rising from the potion.",
    useCases: ["Potion-themed party invitations", "Fantasy game interfaces", "Kids' Halloween designs", "Magic show branding", "Witch-themed merchandise"],
    cssVars: `:root {\n  --brew-emerald: #2ECC71;\n  --brew-teal: #1ABC9C;\n  --brew-cauldron: #0D0D0D;\n  --brew-mystic: #6C3483;\n  --brew-spark: #F39C12;\n}`,
    faqs: [
      { question: "Why is green associated with witches and Halloween?", answer: "Green's association with witches dates back to the portrayal of witches' skin in early films (like The Wizard of Oz's Wicked Witch). In Halloween imagery, green represents potions, poison, otherworldly creatures, and the supernatural glow of magic. It also connects to the natural world and herbalism that witchcraft traditions draw from." },
      { question: "What green hex code is best for Halloween?", answer: "The most popular Halloween green hex codes are: Emerald (#2ECC71) for a magical glow, Lime (#32CD32) for slime effects, Dark green (#013220) for eerie forests, and Neon green (#39FF14) for radioactive/toxic themes." },
      { question: "How to make a glowing effect with these colors?", answer: "In CSS, use box-shadow with the green tones: `box-shadow: 0 0 20px #2ECC71, 0 0 40px #1ABC9C;`. Add `animation: glow 2s ease-in-out infinite alternate;` for a pulsing effect. This creates a magical cauldron glow perfect for Halloween web elements." },
    ],
  },
  "haunted-mansion": {
    name: "Haunted Mansion",
    colors: ["#2C3E50", "#34495E", "#7F8C8D", "#95A5A6", "#BDC3C7"],
    description: "Ghostly grays and shadowy blues of an abandoned Victorian manor.",
    longDescription: "Haunted Mansion creates atmosphere through restraint. The palette uses shadowy blue-grays (#2C3E50, #34495E) transitioning to misty silvers (#7F8C8D, #95A5A6, #BDC3C7). This desaturated scheme evokes foggy graveyards, cobweb-covered chandeliers, and the spectral silence of abandoned estates.",
    useCases: ["Ghost story websites", "Escape room branding", "Atmospheric photography edits", "Minimalist Halloween designs", "Haunted attraction marketing"],
    cssVars: `:root {\n  --mansion-shadow: #2C3E50;\n  --mansion-dark: #34495E;\n  --mansion-stone: #7F8C8D;\n  --mansion-fog: #95A5A6;\n  --mansion-mist: #BDC3C7;\n}`,
    faqs: [
      { question: "Can a gray palette work for Halloween?", answer: "Absolutely! Gray palettes create a sophisticated, atmospheric Halloween feel. Think classic black-and-white horror films, foggy graveyards, and ghost stories. The subtlety of grays can be more unsettling than bright colors because it taps into the fear of the unknown and the barely visible." },
      { question: "How do I add color accents to this palette?", answer: "Add a single accent color for dramatic effect: blood red (#8B0000) for a haunted feel, ghostly green (#2ECC71) for supernatural elements, or candlelight gold (#FFD700) for a warm-yet-eerie touch. Keep the accent to 10% of your design for maximum impact." },
      { question: "What textures complement the Haunted Mansion palette?", answer: "Pair with grunge textures, cracked plaster, weathered wood, cobweb overlays, and fog/mist effects. In CSS, use subtle noise textures or gradient overlays. The muted tones work beautifully with film grain effects and vintage photo treatments." },
    ],
  },
  "candy-corn": {
    name: "Candy Corn",
    colors: ["#FFFFFF", "#FFF200", "#FF8C00", "#FF6600", "#FF4500"],
    description: "The iconic candy corn gradient — sweet, playful, and fun.",
    longDescription: "Candy Corn brings the sweetest side of Halloween with its cheerful gradient from white (#FFFFFF) through sunny yellow (#FFF200) and bright orange (#FF8C00, #FF6600) to fiery red-orange (#FF4500). This playful palette is perfect for family-friendly Halloween designs that celebrate fun over fright.",
    useCases: ["Kids' Halloween party invitations", "Candy store branding", "Trick-or-treat bags", "Playful Halloween social media", "Family-friendly Halloween websites"],
    cssVars: `:root {\n  --candy-white: #FFFFFF;\n  --candy-yellow: #FFF200;\n  --candy-orange: #FF8C00;\n  --candy-deep: #FF6600;\n  --candy-fire: #FF4500;\n}`,
    faqs: [
      { question: "What are the exact candy corn colors?", answer: "Real candy corn has three sections: white tip (#FFFFFF), orange middle (#FF8C00), and yellow base (#FFF200). Our palette extends this with deeper orange (#FF6600) and fiery red-orange (#FF4500) for more design versatility while keeping the sweet, recognizable candy corn aesthetic." },
      { question: "How to create a candy corn gradient in CSS?", answer: "Use: `background: linear-gradient(180deg, #FFFFFF 0%, #FFF200 25%, #FF8C00 50%, #FF6600 75%, #FF4500 100%);`. For a horizontal version, change 180deg to 90deg. This creates a smooth, sweet gradient perfect for Halloween banners." },
      { question: "Is the Candy Corn palette good for professional designs?", answer: "The Candy Corn palette is best for playful, family-oriented designs. For professional Halloween marketing, use it as an accent alongside neutral backgrounds. It works well for seasonal promotions, email headers, and social media graphics where a fun, approachable tone is desired." },
    ],
  },
  "vampire-blood": {
    name: "Vampire Blood",
    colors: ["#8B0000", "#B22222", "#DC143C", "#1A1A1A", "#2C003E"],
    description: "Rich crimson and deep black inspired by Dracula's castle.",
    longDescription: "Vampire Blood channels the dark elegance of vampire folklore with a spectrum of reds from dark red (#8B0000) through firebrick (#B22222) to vivid crimson (#DC143C). Set against near-black (#1A1A1A) and deepest purple (#2C003E), this palette drips with gothic drama and supernatural intensity.",
    useCases: ["Vampire-themed parties", "Horror brand identity", "Dark luxury products", "Gothic wedding themes", "Thriller book marketing"],
    cssVars: `:root {\n  --vampire-dark: #8B0000;\n  --vampire-fire: #B22222;\n  --vampire-crimson: #DC143C;\n  --vampire-night: #1A1A1A;\n  --vampire-shadow: #2C003E;\n}`,
    faqs: [
      { question: "What is the best red for vampire-themed designs?", answer: "Crimson (#DC143C) is the most impactful vampire red — it's vivid enough to stand out against dark backgrounds while evoking fresh blood. For a darker, more aged-blood look, use Dark Red (#8B0000). Firebrick (#B22222) works as an excellent middle ground for buttons and accents." },
      { question: "How to create a blood drip effect with CSS?", answer: "Use a combination of border-radius and gradients: create divs with `border-radius: 0 0 50% 50%` and a gradient from #DC143C to #8B0000. Animate with `transform: translateY()` and varying `animation-delay` values for a realistic dripping blood effect." },
      { question: "Does dark red pass accessibility contrast checks?", answer: "#DC143C (crimson) on #1A1A1A achieves a contrast ratio of 4.1:1, passing WCAG AA for large text but not regular text. For body text on dark backgrounds, use lighter tones like #FF6B6B or white (#FFFFFF). Always verify with a contrast checker tool." },
    ],
  },
  "skeleton-bone": {
    name: "Skeleton Bone",
    colors: ["#F5F5DC", "#FAEBD7", "#2C2C2C", "#1A1A1A", "#808080"],
    description: "Bone white and charcoal black — minimalist eerie elegance.",
    longDescription: "Skeleton Bone strips Halloween to its bare essentials with bone white (#F5F5DC) and antique white (#FAEBD7) contrasting against charcoal (#2C2C2C) and near-black (#1A1A1A). The neutral gray (#808080) bridges the two extremes, creating a sophisticated, minimalist take on Halloween that's both eerie and elegant.",
    useCases: ["Minimalist Halloween posters", "Skeleton-themed merchandise", "Dia de los Muertos designs", "Anatomical art prints", "Elegant Halloween stationery"],
    cssVars: `:root {\n  --bone-light: #F5F5DC;\n  --bone-antique: #FAEBD7;\n  --bone-charcoal: #2C2C2C;\n  --bone-dark: #1A1A1A;\n  --bone-gray: #808080;\n}`,
    faqs: [
      { question: "What hex code is bone white?", answer: "The most commonly used bone white hex codes are: Beige (#F5F5DC), Antique White (#FAEBD7), Old Lace (#FDF5E6), and Linen (#FAF0E6). For a true bone color, #F5F5DC (beige) is the closest match to actual skeletal bone color." },
      { question: "How to use a minimalist palette for Halloween?", answer: "Focus on typography and composition rather than color. Use bone whites for large text on dark backgrounds, add subtle texture overlays (paper grain, concrete), and let negative space create tension. A single accent color (like blood red) used sparingly can create dramatic impact." },
      { question: "Can this palette work for Dia de los Muertos designs?", answer: "Yes! The Skeleton Bone palette is an excellent base for Dia de los Muertos (Day of the Dead) designs. Add vibrant accent colors like marigold orange (#FF8C00), hot pink (#FF69B4), and turquoise (#40E0D0) for the traditional sugar skull aesthetic while keeping the bone tones as your foundation." },
    ],
  },
  "enchanted-forest": {
    name: "Enchanted Forest",
    colors: ["#013220", "#1B4332", "#2D6A4F", "#40916C", "#52B788"],
    description: "Deep forest greens where witches gather under the full moon.",
    longDescription: "Enchanted Forest takes you deep into a mysterious woodland with a gradient of greens from darkest pine (#013220) to vibrant sage (#52B788). This palette captures the magic of ancient forests where fairy tales and nightmares intertwine — perfect for designs that blend natural beauty with supernatural mystery.",
    useCases: ["Fantasy forest games", "Botanical horror designs", "Eco-Halloween themes", "Nature-inspired spooky designs", "Woodland creature illustrations"],
    cssVars: `:root {\n  --forest-deep: #013220;\n  --forest-pine: #1B4332;\n  --forest-emerald: #2D6A4F;\n  --forest-sage: #40916C;\n  --forest-mint: #52B788;\n}`,
    faqs: [
      { question: "What green colors work best for a spooky forest theme?", answer: "For a spooky forest, use dark greens like #013220 (dark green) and #1B4332 (deep pine) as your base. Add #2D6A4F for depth and #40916C or #52B788 as highlights representing moonlight filtering through leaves. Avoid bright neon greens unless going for a toxic/radioactive theme." },
      { question: "How to combine forest greens with other Halloween colors?", answer: "Forest greens pair beautifully with: purple (#6C3483) for a magical feel, orange (#FF6600) for traditional Halloween, bone white (#F5F5DC) for ghostly accents, and gold (#FFD700) for firefly/candlelight effects. Use green as 60% of your palette with 30% dark neutral and 10% accent." },
      { question: "What CSS effects enhance a forest palette?", answer: "Add atmosphere with: radial gradients simulating moonlight, box-shadows with green tints for a glow effect, CSS filter blur for fog/mist, and subtle green-tinted overlays. An animated gradient can simulate shifting light through tree canopies." },
    ],
  },
};

function ColorBlock({ color }: { color: string }) {
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
      className="group relative flex-1 min-h-[120px] sm:min-h-[160px] rounded-2xl overflow-hidden transition-transform hover:scale-105 shadow-lg"
      style={{ backgroundColor: color }}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
        {copied ? <Check className="w-6 h-6 text-white" /> : <Copy className="w-5 h-5 text-white mb-1" />}
        <span className="text-sm font-mono text-white font-bold">{color}</span>
      </div>
    </button>
  );
}

export default function HalloweenPaletteDetail() {
  const { slug } = useParams<{ slug: string }>();
  const palette = slug ? palettes[slug] : null;

  if (!palette) return <Navigate to="/palettes/halloween-color-palette" replace />;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${palette.name} Halloween Color Palette — Hex Codes & Design Guide`,
    description: palette.description,
    author: { "@type": "Organization", name: "Colour Pine" },
    publisher: { "@type": "Organization", name: "Colour Pine", url: "https://colourpine.com" },
    datePublished: "2026-03-18",
    mainEntityOfPage: `https://colourpine.com/palettes/halloween/${slug}`,
  };

  const internalLinks = [
    { label: "All Halloween Palettes", path: "/palettes/halloween-color-palette", description: "Browse all 10 curated Halloween color palettes" },
    { label: "Color Palette Generator", path: "/generator", description: "Create custom Halloween palette variations" },
    { label: "Contrast Checker", path: "/contrast-checker", description: "Validate WCAG accessibility for your Halloween designs" },
    { label: "Color Explorer", path: "/color-explorer", description: "Find more shades and tints for each Halloween color" },
    { label: "Code Export", path: "/code-export", description: "Export this palette as CSS, Tailwind, or SCSS tokens" },
    { label: "2026 Color Trends", path: "/trends", description: "See how Halloween colors fit into 2026 design trends" },
  ];

  return (
    <SEOPageLayout
      title={`${palette.name} Halloween Color Palette — Hex Codes & Design Guide`}
      description={`${palette.description} Copy hex codes, get CSS variables, and learn how to use the ${palette.name} color scheme in your Halloween designs.`}
      keywords={`${palette.name.toLowerCase()} color palette, halloween ${palette.name.toLowerCase()} colors, ${palette.name.toLowerCase()} hex codes, halloween color scheme, spooky ${palette.name.toLowerCase()} palette`}
      canonicalUrl={`https://colourpine.com/palettes/halloween/${slug}`}
      structuredData={structuredData}
      breadcrumbs={[
        { label: "Palettes", path: "/trending" },
        { label: "Halloween", path: "/palettes/halloween-color-palette" },
        { label: palette.name },
      ]}
      internalLinks={internalLinks}
    >
      {/* Back Link */}
      <Link to="/palettes/halloween-color-palette" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> All Halloween Palettes
      </Link>

      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
        {palette.name} Color Palette
      </h1>
      <p className="text-muted-foreground text-lg mb-8">{palette.description}</p>

      {/* Colors */}
      <div className="flex gap-3 mb-8">
        {palette.colors.map((c) => (
          <ColorBlock key={c} color={c} />
        ))}
      </div>

      {/* Hex Codes */}
      <div className="flex flex-wrap gap-2 mb-10">
        {palette.colors.map((c) => (
          <code key={c} className="text-sm bg-muted px-3 py-1.5 rounded-lg font-mono text-muted-foreground">{c}</code>
        ))}
      </div>

      {/* Description */}
      <section className="mb-10">
        <h2 className="text-2xl font-display font-bold text-foreground mb-4">About This Palette</h2>
        <p className="text-muted-foreground leading-relaxed">{palette.longDescription}</p>
      </section>

      {/* Use Cases */}
      <section className="mb-10">
        <h2 className="text-2xl font-display font-bold text-foreground mb-4">Best Use Cases</h2>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          {palette.useCases.map((uc) => (
            <li key={uc}>{uc}</li>
          ))}
        </ul>
      </section>

      {/* CSS Code */}
      <section className="mb-10">
        <h2 className="text-2xl font-display font-bold text-foreground mb-4">CSS Variables</h2>
        <pre className="bg-muted p-4 rounded-xl overflow-x-auto text-sm font-mono text-muted-foreground">
          {palette.cssVars}
        </pre>
      </section>

      {/* FAQ */}
      <FAQSection faqs={palette.faqs} />
    </SEOPageLayout>
  );
}
