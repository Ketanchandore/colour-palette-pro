import { KeywordLandingPage } from "@/components/seo/KeywordLandingPage";

export default function PastelColorPalettes() {
  return (
    <KeywordLandingPage
      title="Pastel Color Palettes"
      metaTitle="Pastel Color Palettes — 12+ Soft Aesthetic HEX Codes [Free 2026]"
      metaDescription="12+ dreamy pastel color palettes with HEX codes. Soft pinks, mint greens, lavender, baby blue & peach. Perfect for branding, web design, illustrations & social media."
      keywords="pastel color palette, pastel colors, soft color palette, aesthetic color palette, pastel hex codes, pastel pink, pastel blue, pastel green, baby colors, kawaii color palette"
      canonicalPath="/palettes/pastel-color-palettes"
      breadcrumbLabel="Pastel Color Palettes"
      h1="Pastel Color Palettes — Soft, Dreamy & Aesthetic HEX Codes"
      intro="Pastel palettes bring a calm, dreamy aesthetic to any project. Browse 12+ curated soft color schemes with copyable HEX codes for branding, illustrations, web design, and social media."
      longIntro="Pastel colors are created by mixing pure hues with white, producing soft, low-saturation shades that feel calm, gentle, and approachable. They're a favorite for kids' brands, beauty packaging, wellness apps, springtime designs, and anything aiming for a soft aesthetic. Below are professionally curated pastel palettes — each with copyable HEX codes ready for Figma, Tailwind, or your design tool of choice."
      palettes={[
        { name: "Cotton Candy", description: "Sweet pink and blue for kids brands and bakeries.", colors: ["#FFD1DC", "#FFB6C1", "#B0E0E6", "#ADD8E6", "#E6E6FA"] },
        { name: "Mint & Peach", description: "Fresh, summery palette for wellness and food brands.", colors: ["#B8E6D3", "#D0F0E0", "#FFDAB9", "#FFE5CC", "#FFC8A2"] },
        { name: "Lavender Dream", description: "Calming purple tones for spa and beauty.", colors: ["#E6E6FA", "#D8BFD8", "#DDA0DD", "#C8A2C8", "#B19CD9"] },
        { name: "Baby Macaron", description: "French pastry palette — sweet and elegant.", colors: ["#FFDFD3", "#FEC8D8", "#D0F4DE", "#A0E7E5", "#FBE7C6"] },
        { name: "Sky & Sand", description: "Soft beach palette for travel and lifestyle.", colors: ["#C6E2E9", "#A7D7E5", "#F4D8B5", "#F2C7A5", "#E8AC7E"] },
        { name: "Spring Bloom", description: "Fresh florals for spring campaigns.", colors: ["#FFCBA4", "#FFE5B4", "#C5E384", "#A8E6CF", "#FFAAA5"] },
        { name: "Cloud Nine", description: "Airy palette for wellness apps and meditation.", colors: ["#F0F8FF", "#E6F2FF", "#D6EAF8", "#FFF0F5", "#FAF0E6"] },
        { name: "Pistachio & Rose", description: "Modern pastel for beauty and stationery.", colors: ["#BFD8B8", "#D5EAD8", "#F8C8DC", "#FFD6E0", "#E8F4D9"] },
        { name: "Buttercream", description: "Warm yellow pastels for food and bakery brands.", colors: ["#FFF8DC", "#FFFACD", "#FAFAD2", "#F0E68C", "#EEE8AA"] },
        { name: "Coral Reef", description: "Tropical pastels for summer collections.", colors: ["#FFB6A3", "#FFC9B6", "#FFE0CC", "#B8E6D9", "#A0D9D9"] },
        { name: "Powder Sky", description: "Soft blues for tech, wellness, and minimalist brands.", colors: ["#B0E0E6", "#AFEEEE", "#E0FFFF", "#F0FFFF", "#87CEEB"] },
        { name: "Vintage Pastel", description: "Muted, dusty pastels for retro and editorial designs.", colors: ["#E8C5A0", "#D4A5A5", "#A5C9CA", "#C9A5A5", "#E0C8B0"] },
      ]}
      whyMatters={[
        "Pastel palettes evoke calm, comfort, and approachability — ideal for wellness, beauty, kids, and food brands.",
        "Soft tones reduce visual fatigue, making them excellent for long-read websites and meditation apps.",
        "Pastels photograph beautifully on social media — Instagram and Pinterest feeds with pastel branding get higher engagement.",
        "Combining pastels with one bold accent creates striking, modern designs that still feel gentle.",
      ]}
      howToUse={[
        { title: "Branding & Logos", body: "Use a single pastel as your primary brand color, paired with a neutral (cream, off-white) and one darker tone for text and contrast." },
        { title: "Web & UI Design", body: "Pastel backgrounds with darker accent text work well for landing pages. Be careful with WCAG contrast — always check accessibility." },
        { title: "Social Media Graphics", body: "Pastel palettes are perfect for Instagram carousels, Pinterest pins, and TikTok thumbnails. Use 2-3 pastels per post for cohesion." },
        { title: "Illustrations & Print", body: "Pastels print beautifully on matte paper. Great for greeting cards, wedding invitations, and children's book illustrations." },
      ]}
      faqs={[
        { question: "What are pastel colors?", answer: "Pastel colors are pale, soft shades created by mixing pure hues with white. They have low saturation and high lightness, giving them a soft, gentle, and calming appearance. Common pastels include baby pink, mint green, lavender, peach, and powder blue." },
        { question: "Are pastel colors good for branding?", answer: "Yes — pastels work beautifully for brands targeting wellness, beauty, kids, food, hospitality, and lifestyle. They convey approachability, calmness, and femininity. However, they can feel less authoritative for finance or tech brands." },
        { question: "What colors go well with pastels?", answer: "Pastels pair wonderfully with: other pastels (multi-pastel palettes), neutrals (cream, beige, gray), one bold accent (deep navy, charcoal, or burgundy), and metallics (rose gold, soft gold, silver) for luxury feel." },
        { question: "How do I make pastel colors accessible?", answer: "Pastels often fail WCAG contrast on their own. Always pair pastel backgrounds with darker text (charcoal, navy) and use our WCAG Contrast Checker to validate AA/AAA compliance." },
      ]}
      relatedLinks={[
        { label: "WCAG Contrast Checker", path: "/contrast-checker", description: "Test pastel palette accessibility" },
        { label: "Wedding Color Palettes", path: "/palettes/wedding-color-palettes", description: "Pastel palettes perfect for weddings" },
        { label: "Dark Mode Palettes", path: "/palettes/dark-mode-color-palettes", description: "The opposite — bold dark palettes" },
        { label: "Color Palette Generator", path: "/generator", description: "Generate custom pastel palettes" },
        { label: "Pink and Green Palette", path: "/guides/pink-and-green-palette", description: "Classic pastel pink + green combos" },
        { label: "Festival Palettes", path: "/palettes/festival", description: "Easter, spring & pastel festivals" },
      ]}
    />
  );
}
