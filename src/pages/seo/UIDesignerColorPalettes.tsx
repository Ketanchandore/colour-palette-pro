import { MainLayout } from "@/components/layout/MainLayout";
import { SEOHead } from "@/components/seo/SEOHead";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { Link } from "react-router-dom";
import { 
  Palette, 
  Download, 
  Copy, 
  Check, 
  Sparkles, 
  Layers, 
  Monitor, 
  Smartphone,
  ArrowRight,
  Zap,
  Target,
  Eye
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

// Curated UI Designer Palettes
const uiDesignerPalettes = [
  {
    name: "Modern SaaS Dashboard",
    description: "Clean, professional palette perfect for B2B dashboards and admin panels",
    colors: ["#1E293B", "#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#F8FAFC"],
    useCase: "Admin dashboards, analytics platforms, enterprise software",
    accessibility: "WCAG AA compliant"
  },
  {
    name: "Minimal E-commerce",
    description: "Sophisticated neutral palette with strategic accent for conversion optimization",
    colors: ["#18181B", "#71717A", "#F4F4F5", "#2563EB", "#DC2626", "#FAFAFA"],
    useCase: "Online stores, product catalogs, checkout flows",
    accessibility: "High contrast ratios"
  },
  {
    name: "Creative Portfolio",
    description: "Bold, expressive palette for designers and creative professionals",
    colors: ["#0F172A", "#8B5CF6", "#EC4899", "#06B6D4", "#F97316", "#FAFAF9"],
    useCase: "Portfolio sites, creative agencies, design studios",
    accessibility: "Optimized for visual impact"
  },
  {
    name: "HealthTech Interface",
    description: "Calming, trustworthy palette designed for healthcare and wellness apps",
    colors: ["#134E4A", "#14B8A6", "#5EEAD4", "#F0FDFA", "#0EA5E9", "#FFFFFF"],
    useCase: "Medical apps, wellness platforms, telemedicine",
    accessibility: "Meets healthcare accessibility standards"
  },
  {
    name: "FinTech Professional",
    description: "Trust-inspiring palette for banking, finance, and investment platforms",
    colors: ["#1E3A5F", "#2563EB", "#059669", "#FBBF24", "#1F2937", "#F9FAFB"],
    useCase: "Banking apps, trading platforms, financial dashboards",
    accessibility: "WCAG AAA for critical elements"
  },
  {
    name: "Social Media Vibrant",
    description: "Energetic, engaging palette for social platforms and community apps",
    colors: ["#7C3AED", "#EC4899", "#F59E0B", "#10B981", "#3B82F6", "#FFFFFF"],
    useCase: "Social networks, messaging apps, community platforms",
    accessibility: "Optimized for engagement"
  }
];

// Component for color swatch with copy functionality
function ColorSwatch({ color }: { color: string }) {
  const [copied, setCopied] = useState(false);

  const copyColor = async () => {
    await navigator.clipboard.writeText(color);
    setCopied(true);
    toast.success(`Copied ${color}`);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      className="group relative cursor-pointer transition-transform hover:scale-105"
      onClick={copyColor}
    >
      <div 
        className="w-12 h-12 rounded-lg shadow-md border border-border/50"
        style={{ backgroundColor: color }}
      />
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 rounded-lg">
        {copied ? (
          <Check className="w-4 h-4 text-white" />
        ) : (
          <Copy className="w-4 h-4 text-white" />
        )}
      </div>
      <p className="text-[10px] font-mono text-muted-foreground mt-1 text-center">
        {color}
      </p>
    </div>
  );
}

export default function UIDesignerColorPalettes() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Color Palette Templates for UI Designers | Free HEX Downloads",
    "description": "Download curated color palettes optimized for UI design. Professional HEX color schemes for dashboards, e-commerce, mobile apps, and more.",
    "author": {
      "@type": "Organization",
      "name": "Colour Pine"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Colour Pine",
      "logo": {
        "@type": "ImageObject",
        "url": "https://colourpine.com/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://colourpine.com/palettes/ui-designer"
    },
    "datePublished": "2024-01-15",
    "dateModified": new Date().toISOString().split('T')[0]
  };

  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What makes a good UI color palette?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A good UI color palette includes a primary brand color, secondary accent colors, neutral grays for text and backgrounds, semantic colors for success/warning/error states, and maintains WCAG accessibility standards with sufficient contrast ratios."
        }
      },
      {
        "@type": "Question",
        "name": "How many colors should a UI palette have?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Most effective UI palettes contain 5-8 colors: 1-2 primary colors, 2-3 secondary/accent colors, 3-4 neutral shades, and semantic colors for states. This provides enough variety without overwhelming the interface."
        }
      },
      {
        "@type": "Question",
        "name": "How do I ensure my UI colors are accessible?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Use a contrast checker tool to verify text-to-background contrast ratios meet WCAG guidelines: 4.5:1 for normal text and 3:1 for large text. Test your palette with color blindness simulators and avoid conveying information through color alone."
        }
      },
      {
        "@type": "Question",
        "name": "Can I use these palettes in Figma or Tailwind CSS?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! All palettes on Colour Pine can be exported in multiple formats including Figma-ready swatches, Tailwind CSS configuration, CSS custom properties, and JSON. Use the Code Export tool to generate code for your preferred framework."
        }
      },
      {
        "@type": "Question",
        "name": "What's the best palette for dark mode UI?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "For dark mode, start with deep gray or navy backgrounds (#0F172A, #1E293B), use lighter text (#F8FAFC, #E2E8F0), and reduce saturation of accent colors by 10-20%. Ensure your primary actions still stand out with sufficient luminance contrast."
        }
      }
    ]
  };

  return (
    <MainLayout>
      <SEOHead
        title="Color Palette Templates for UI Designers | Free HEX Downloads - Colour Pine"
        description="Download 50+ curated color palettes optimized for UI design. Professional HEX color schemes for dashboards, e-commerce, mobile apps with WCAG accessibility. Free templates for Figma & Tailwind."
        keywords="UI color palette, UI design colors, HEX color palette, dashboard color scheme, app color palette, WCAG accessible colors, Figma colors, Tailwind CSS colors"
        canonicalUrl="https://colourpine.com/palettes/ui-designer"
        ogType="article"
        structuredData={structuredData}
      />

      <div className="p-6 lg:p-8 max-w-6xl mx-auto space-y-12">
        {/* Hero Section */}
        <header className="text-center space-y-6">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Badge variant="secondary" className="text-sm">
              <Palette className="w-3 h-3 mr-1" />
              Templates Playbook
            </Badge>
            <Badge variant="outline" className="text-sm">
              UI Design
            </Badge>
          </div>

          <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground leading-tight">
            Color Palette Templates for UI Designers
          </h1>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Download professionally curated color palettes designed specifically for user interface design. 
            Each palette includes HEX codes, accessibility ratings, and practical implementation guidance 
            for dashboards, mobile apps, e-commerce, and more.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link to="/generator">
              <Button size="lg" className="gradient-primary text-white">
                <Sparkles className="w-4 h-4 mr-2" />
                Generate Custom Palette
              </Button>
            </Link>
            <Link to="/code-export">
              <Button size="lg" variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export for Development
              </Button>
            </Link>
          </div>
        </header>

        {/* Section 1: Why UI Designers Need Specialized Palettes */}
        <section className="space-y-6">
          <h2 className="text-3xl font-display font-bold text-foreground">
            Why UI Designers Need Specialized Color Palettes
          </h2>

          <div className="prose prose-lg max-w-none text-muted-foreground">
            <p>
              User interface design demands more than aesthetic appeal—it requires strategic color selection 
              that guides user behavior, communicates hierarchy, and ensures accessibility across diverse 
              devices and user needs. Unlike graphic design or branding work, UI color palettes must function 
              within interactive systems where every color choice impacts usability.
            </p>

            <p>
              A well-constructed UI palette addresses multiple simultaneous requirements: establishing visual 
              hierarchy through contrast, communicating system states (success, warning, error), maintaining 
              brand consistency, and meeting WCAG accessibility standards. These constraints make generic 
              color palettes inadequate for serious interface work.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <Card className="bg-card border-border">
              <CardHeader>
                <Target className="w-8 h-8 text-primary mb-2" />
                <CardTitle className="text-lg">Hierarchy & Focus</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                UI palettes establish clear visual hierarchy, guiding users to primary actions 
                while keeping secondary elements appropriately subdued.
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <Eye className="w-8 h-8 text-primary mb-2" />
                <CardTitle className="text-lg">Accessibility Built-In</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Every palette includes contrast ratios tested against WCAG 2.1 guidelines, 
                ensuring your interfaces work for all users.
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <Zap className="w-8 h-8 text-primary mb-2" />
                <CardTitle className="text-lg">Production-Ready</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Export directly to Tailwind CSS, CSS variables, Figma, or JSON—no manual 
                conversion required.
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Section 2: Curated Palette Downloads */}
        <section className="space-y-6">
          <h2 className="text-3xl font-display font-bold text-foreground">
            Download Curated UI Color Palettes
          </h2>

          <p className="text-lg text-muted-foreground">
            Each palette below has been designed for specific UI contexts. Click any color to copy its 
            HEX code, or use the export tools to download the complete palette in your preferred format.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {uiDesignerPalettes.map((palette, idx) => (
              <Card key={idx} className="bg-card border-border hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl mb-2">{palette.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{palette.description}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {palette.accessibility}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2 flex-wrap">
                    {palette.colors.map((color, colorIdx) => (
                      <ColorSwatch key={colorIdx} color={color} />
                    ))}
                  </div>
                  <div className="pt-2 border-t border-border">
                    <p className="text-xs text-muted-foreground">
                      <strong>Best for:</strong> {palette.useCase}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Section 3: How to Apply These Palettes */}
        <section className="space-y-6">
          <h2 className="text-3xl font-display font-bold text-foreground">
            How to Apply UI Color Palettes in Your Projects
          </h2>

          <div className="prose prose-lg max-w-none text-muted-foreground">
            <p>
              Downloading a palette is just the first step. Effective implementation requires understanding 
              how each color serves a specific purpose within your interface architecture. Here's a systematic 
              approach to applying your chosen palette:
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mt-6">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">1</span>
                Establish Your Color Hierarchy
              </h3>
              <p className="text-muted-foreground pl-10">
                Assign the darkest neutral as your primary text color. Reserve your most saturated 
                color for primary CTAs only—overusing it dilutes its impact. Secondary actions 
                should use outline styles or muted variants.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">2</span>
                Define Semantic Colors
              </h3>
              <p className="text-muted-foreground pl-10">
                Map specific colors to system states: green for success, yellow/amber for warnings, 
                red for errors, blue for informational messages. Consistency in these assignments 
                builds user trust and reduces cognitive load.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">3</span>
                Generate Tints and Shades
              </h3>
              <p className="text-muted-foreground pl-10">
                Each base color needs 5-10 variants for hover states, disabled states, backgrounds, 
                and borders. Use our <Link to="/generator" className="text-primary hover:underline">Palette Generator</Link> to 
                automatically create harmonious variations.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">4</span>
                Test Across Contexts
              </h3>
              <p className="text-muted-foreground pl-10">
                Preview your palette on actual UI components using our <Link to="/live-preview" className="text-primary hover:underline">Live UI Preview</Link> tool. 
                Test in both light and dark modes, and verify contrast with our <Link to="/contrast-checker" className="text-primary hover:underline">Contrast Checker</Link>.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: Device-Specific Considerations */}
        <section className="space-y-6 bg-muted/30 rounded-2xl p-8">
          <h2 className="text-3xl font-display font-bold text-foreground">
            Color Considerations for Different Platforms
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Monitor className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-semibold">Desktop & Web Applications</h3>
              </div>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-4 h-4 mt-1 text-primary" />
                  <span>Higher color accuracy on calibrated monitors allows for subtle gradients and complex palettes</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-4 h-4 mt-1 text-primary" />
                  <span>Larger screens support more simultaneous colors without overwhelming users</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-4 h-4 mt-1 text-primary" />
                  <span>Consider enterprise environments with older monitors—test at reduced color depth</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-4 h-4 mt-1 text-primary" />
                  <span>Dark mode is increasingly expected—design with both modes from the start</span>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Smartphone className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-semibold">Mobile Applications</h3>
              </div>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-4 h-4 mt-1 text-primary" />
                  <span>OLED screens display true blacks—take advantage for power efficiency and visual punch</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-4 h-4 mt-1 text-primary" />
                  <span>Outdoor usage requires higher contrast ratios than desktop standards</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-4 h-4 mt-1 text-primary" />
                  <span>Touch targets need color differentiation visible in peripheral vision</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-4 h-4 mt-1 text-primary" />
                  <span>Follow iOS and Android system color conventions for native feel</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 5: Industry-Specific Guidance */}
        <section className="space-y-6">
          <h2 className="text-3xl font-display font-bold text-foreground">
            Industry-Specific Color Palette Guidelines
          </h2>

          <div className="prose prose-lg max-w-none text-muted-foreground">
            <p>
              Different industries have established color conventions that shape user expectations. 
              While creativity has its place, deviating too far from industry norms can create 
              cognitive friction and reduce trust.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <Layers className="w-6 h-6 text-primary mb-2" />
                <CardTitle>FinTech & Banking</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <p><strong>Primary:</strong> Navy, deep blue, forest green</p>
                <p><strong>Avoid:</strong> Bright reds (panic association), neon colors</p>
                <p><strong>Key principle:</strong> Stability and trust through conservative palettes</p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <Layers className="w-6 h-6 text-primary mb-2" />
                <CardTitle>HealthTech & Medical</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <p><strong>Primary:</strong> Teal, calm blues, soft greens</p>
                <p><strong>Avoid:</strong> Aggressive oranges, dark moody tones</p>
                <p><strong>Key principle:</strong> Calm, clinical cleanliness with warmth</p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <Layers className="w-6 h-6 text-primary mb-2" />
                <CardTitle>SaaS & Productivity</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <p><strong>Primary:</strong> Purple, blue, neutral grays</p>
                <p><strong>Avoid:</strong> Overly playful palettes for B2B tools</p>
                <p><strong>Key principle:</strong> Professional efficiency with modern appeal</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Section 6: Export & Integration */}
        <section className="space-y-6">
          <h2 className="text-3xl font-display font-bold text-foreground">
            Export Your Palette for Development
          </h2>

          <p className="text-lg text-muted-foreground">
            Once you've selected or generated your perfect UI palette, export it in the format 
            your development workflow requires:
          </p>

          <div className="grid md:grid-cols-4 gap-4 mt-6">
            <Link to="/code-export">
              <Card className="bg-card border-border hover:border-primary/50 transition-colors cursor-pointer h-full">
                <CardContent className="pt-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-primary/10 flex items-center justify-center">
                    <span className="font-mono text-primary font-bold">CSS</span>
                  </div>
                  <h3 className="font-semibold mb-1">CSS Variables</h3>
                  <p className="text-xs text-muted-foreground">Custom properties for vanilla CSS</p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/code-export">
              <Card className="bg-card border-border hover:border-primary/50 transition-colors cursor-pointer h-full">
                <CardContent className="pt-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-primary/10 flex items-center justify-center">
                    <span className="font-mono text-primary font-bold text-xs">TW</span>
                  </div>
                  <h3 className="font-semibold mb-1">Tailwind CSS</h3>
                  <p className="text-xs text-muted-foreground">Ready for tailwind.config.js</p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/code-export">
              <Card className="bg-card border-border hover:border-primary/50 transition-colors cursor-pointer h-full">
                <CardContent className="pt-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-primary/10 flex items-center justify-center">
                    <span className="font-mono text-primary font-bold text-xs">{ }</span>
                  </div>
                  <h3 className="font-semibold mb-1">JSON</h3>
                  <p className="text-xs text-muted-foreground">Universal data format</p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/code-export">
              <Card className="bg-card border-border hover:border-primary/50 transition-colors cursor-pointer h-full">
                <CardContent className="pt-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-primary/10 flex items-center justify-center">
                    <span className="font-mono text-primary font-bold text-xs">SCSS</span>
                  </div>
                  <h3 className="font-semibold mb-1">SASS/SCSS</h3>
                  <p className="text-xs text-muted-foreground">Variables and mixins</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </section>

        {/* Section 7: FAQs */}
        <section className="space-y-6">
          <h2 className="text-3xl font-display font-bold text-foreground">
            Frequently Asked Questions
          </h2>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-left">
                What makes a good UI color palette?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                A good UI color palette includes a primary brand color, secondary accent colors, 
                neutral grays for text and backgrounds, semantic colors for success/warning/error states, 
                and maintains WCAG accessibility standards with sufficient contrast ratios. The palette 
                should create clear visual hierarchy and guide users toward primary actions while keeping 
                secondary elements appropriately subdued.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger className="text-left">
                How many colors should a UI palette have?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Most effective UI palettes contain 5-8 base colors: 1-2 primary colors, 2-3 secondary/accent 
                colors, 3-4 neutral shades, and semantic colors for states. Each base color typically expands 
                into 5-10 tints and shades for different use cases (hover states, disabled states, backgrounds). 
                This provides enough variety without overwhelming the interface.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger className="text-left">
                How do I ensure my UI colors are accessible?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Use a <Link to="/contrast-checker" className="text-primary hover:underline">contrast checker tool</Link> to 
                verify text-to-background contrast ratios meet WCAG guidelines: 4.5:1 for normal text (under 18px) 
                and 3:1 for large text (18px+ or 14px bold). Test your palette with 
                our <Link to="/blindness-simulator" className="text-primary hover:underline">color blindness simulator</Link> and 
                avoid conveying critical information through color alone—always pair with icons or text labels.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger className="text-left">
                Can I use these palettes in Figma or Tailwind CSS?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Yes! All palettes on Colour Pine can be exported in multiple formats including Figma-ready 
                swatches, Tailwind CSS configuration, CSS custom properties, SASS variables, and JSON. 
                Use our <Link to="/code-export" className="text-primary hover:underline">Code Export tool</Link> to 
                generate production-ready code for your preferred framework. For Figma, you can copy HEX 
                values directly or use plugins that import JSON color definitions.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger className="text-left">
                What's the best palette for dark mode UI?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                For dark mode, start with deep gray or navy backgrounds (#0F172A, #1E293B rather than pure black), 
                use lighter text colors (#F8FAFC, #E2E8F0) instead of pure white to reduce eye strain, and reduce 
                saturation of accent colors by 10-20% to prevent visual vibration. Ensure your primary action 
                colors still stand out with sufficient luminance contrast. Use our <Link to="/live-preview" className="text-primary hover:underline">Live UI Preview</Link> to 
                test your palette in dark mode context.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        {/* Call to Action */}
        <section className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-2xl p-8 text-center space-y-6">
          <h2 className="text-3xl font-display font-bold text-foreground">
            Ready to Create Your Perfect UI Palette?
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Start with our AI-powered palette generator to create custom color schemes tailored 
            to your specific project requirements, or explore our curated collections for instant inspiration.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/generator">
              <Button size="lg" className="gradient-primary text-white">
                <Sparkles className="w-4 h-4 mr-2" />
                Generate Custom Palette
              </Button>
            </Link>
            <Link to="/trending">
              <Button size="lg" variant="outline">
                Explore Trending Palettes
              </Button>
            </Link>
          </div>
        </section>

        {/* Internal Linking Footer */}
        <section className="border-t border-border pt-8 space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Related Resources</h3>
          <div className="flex flex-wrap gap-3">
            <Link to="/colors">
              <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">
                Color Database (50,000+ colors)
              </Badge>
            </Link>
            <Link to="/contrast-checker">
              <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">
                Contrast Checker
              </Badge>
            </Link>
            <Link to="/accessibility">
              <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">
                Accessibility Dashboard
              </Badge>
            </Link>
            <Link to="/blindness-simulator">
              <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">
                Color Blindness Simulator
              </Badge>
            </Link>
            <Link to="/trends">
              <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">
                2026 Color Trends
              </Badge>
            </Link>
          </div>
        </section>
      </div>

      {/* JSON-LD for FAQs */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />
    </MainLayout>
  );
}
