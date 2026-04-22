import { KeywordLandingPage } from "@/components/seo/KeywordLandingPage";

export default function DarkModeColorPalettes() {
  return (
    <KeywordLandingPage
      title="Dark Mode Color Palettes"
      metaTitle="Dark Mode Color Palettes — 12+ HEX Codes for UI & Web [Free 2026]"
      metaDescription="12+ professional dark mode color palettes with HEX codes. WCAG-tested dark UI themes for dashboards, apps, websites. Material, Nord, Dracula & more dark themes."
      keywords="dark mode color palette, dark theme colors, dark ui palette, dark mode hex codes, dark dashboard palette, material dark theme, dracula theme, nord theme, dark website colors, OLED dark palette"
      canonicalPath="/palettes/dark-mode-color-palettes"
      breadcrumbLabel="Dark Mode Color Palettes"
      h1="Dark Mode Color Palettes — Professional UI Themes with HEX Codes"
      intro="Build beautiful dark interfaces with these 12+ curated dark mode palettes. Each is WCAG-tested for accessibility and includes background, surface, primary, and text HEX codes ready for your design system."
      longIntro="Dark mode is no longer optional — it's expected. Studies show 80%+ of users prefer dark themes for productivity apps, code editors, and late-night browsing. A great dark palette isn't just inverted light mode — it requires careful attention to surface elevation, contrast ratios, and accent color saturation. Below are battle-tested dark palettes used by leading apps, developer tools, and design systems. Copy any HEX code instantly."
      palettes={[
        { name: "GitHub Dark", description: "Clean, professional — used by GitHub's official dark theme.", colors: ["#0D1117", "#161B22", "#30363D", "#58A6FF", "#C9D1D9"] },
        { name: "Dracula", description: "Iconic developer theme with vibrant accents.", colors: ["#282A36", "#44475A", "#F8F8F2", "#BD93F9", "#FF79C6"] },
        { name: "Nord", description: "Arctic-inspired, calming dark palette.", colors: ["#2E3440", "#3B4252", "#4C566A", "#88C0D0", "#ECEFF4"] },
        { name: "Material Dark", description: "Google Material Design 3 dark theme.", colors: ["#121212", "#1E1E1E", "#2C2C2C", "#BB86FC", "#E1E1E1"] },
        { name: "Tokyo Night", description: "Trendy purple-black palette for editors.", colors: ["#1A1B26", "#24283B", "#414868", "#7AA2F7", "#A9B1D6"] },
        { name: "Catppuccin Mocha", description: "Soothing pastel-on-dark for IDEs.", colors: ["#1E1E2E", "#313244", "#45475A", "#CBA6F7", "#CDD6F4"] },
        { name: "OLED True Black", description: "Pure black for OLED battery savings.", colors: ["#000000", "#0A0A0A", "#1A1A1A", "#3B82F6", "#FFFFFF"] },
        { name: "Solarized Dark", description: "Scientifically-designed for reduced eye strain.", colors: ["#002B36", "#073642", "#586E75", "#268BD2", "#839496"] },
        { name: "Monokai Pro", description: "Premium developer theme with warm accents.", colors: ["#2D2A2E", "#403E41", "#5B595C", "#FF6188", "#FCFCFA"] },
        { name: "Cyberpunk Neon", description: "High-contrast neon for futuristic UIs.", colors: ["#0F0F23", "#1A1A2E", "#16213E", "#FF0080", "#00FFFF"] },
        { name: "Forest Night", description: "Deep green-black for nature apps.", colors: ["#0B1F1A", "#163832", "#1F4E45", "#4ADE80", "#D1FAE5"] },
        { name: "Charcoal Coral", description: "Warm dark palette with coral accent.", colors: ["#1C1B1F", "#2D2C30", "#48464C", "#FF7F50", "#F5F5F4"] },
      ]}
      whyMatters={[
        "Dark mode reduces eye strain in low-light conditions and saves battery on OLED displays (up to 60% power savings).",
        "Users spend 30%+ more time on apps with well-designed dark themes — proven by Twitter, YouTube, and Slack analytics.",
        "Dark mode is a top accessibility request — required by users with photosensitivity, migraines, or visual impairments.",
        "A great dark palette differentiates your product — most teams ship a poor dark mode by simply inverting colors.",
      ]}
      howToUse={[
        { title: "Surface Elevation", body: "Use 3-4 dark shades for layering: background, card surface, elevated card, modal. Each layer should be 3-5% lighter than the one below." },
        { title: "Text Hierarchy", body: "Primary text: 87% white opacity. Secondary: 60%. Disabled: 38%. Avoid pure white (#FFFFFF) — it causes halation on dark backgrounds." },
        { title: "Accent Colors", body: "Desaturate accent colors by 20-30% for dark mode. Bright saturated colors vibrate on dark backgrounds and cause eye strain." },
        { title: "WCAG Contrast", body: "Maintain 4.5:1 minimum for body text (AA) and 7:1 for AAA. Always test with our Contrast Checker before shipping." },
      ]}
      faqs={[
        { question: "What is the best dark mode color?", answer: "There's no single 'best' — it depends on your brand. For developer tools, GitHub Dark (#0D1117) and Dracula (#282A36) are industry standards. For consumer apps, Material Dark (#121212) is widely tested. For OLED battery savings, pure black (#000000) wins." },
        { question: "Should I use pure black for dark mode?", answer: "Pure black (#000000) is best for OLED screens (saves battery) and high-contrast needs. However, dark gray (#121212-#1A1A1A) is gentler on the eyes and matches Material Design recommendations for most apps." },
        { question: "How do I create a dark mode palette?", answer: "Start with a near-black background (#0F0F0F-#1A1A1A), add 2-3 elevated surfaces (each 3-5% lighter), pick a desaturated accent color, and use off-white text (#E0E0E0 or 87% opacity). Always test WCAG contrast." },
        { question: "Is dark mode better for eyes?", answer: "Dark mode reduces eye strain in low-light environments and is preferred by users with photosensitivity. However, in bright environments, dark mode can actually cause more strain. Best practice: offer both light and dark modes with auto-switching." },
      ]}
      relatedLinks={[
        { label: "WCAG Contrast Checker", path: "/contrast-checker", description: "Validate dark mode accessibility" },
        { label: "Frontend Developer Palettes", path: "/palettes/frontend-developer", description: "Production-ready CSS tokens" },
        { label: "UI Designer Palettes", path: "/palettes/ui-designer", description: "Curated palettes for dashboards" },
        { label: "Pastel Palettes", path: "/palettes/pastel-color-palettes", description: "The opposite — soft light palettes" },
        { label: "Color Palette Generator", path: "/generator", description: "Generate custom dark themes" },
        { label: "Code Export", path: "/code-export", description: "Export palettes as CSS, Tailwind, SCSS" },
      ]}
    />
  );
}
