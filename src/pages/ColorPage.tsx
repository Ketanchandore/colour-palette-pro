import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Copy, Check, ArrowLeft, Palette, Eye, Code, Download, Share2, Heart } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { MainLayout } from '@/components/layout/MainLayout';
import SEOHead from '@/components/seo/SEOHead';
import { getColorInfo, getComplementary, getAnalogous, getTriadic, getSplitComplementary, hexToRgb, rgbToHsl } from '@/lib/colorData';
import { getContrastRatio, getWCAGLevel, getLuminance } from '@/lib/colorUtils';

const ColorPage = () => {
  const { hex } = useParams<{ hex: string }>();
  const [copiedValue, setCopiedValue] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  
  const cleanHex = (hex || 'FFFFFF').replace('#', '').toUpperCase();
  const colorInfo = getColorInfo(cleanHex);
  const rgb = colorInfo.rgb;
  const hsl = colorInfo.hsl;
  
  // Calculate CMYK
  const c = Math.round((1 - rgb.r / 255) * 100);
  const m = Math.round((1 - rgb.g / 255) * 100);
  const y = Math.round((1 - rgb.b / 255) * 100);
  const k = Math.round(Math.min(c, m, y));
  const cmyk = { c: c - k, m: m - k, y: y - k, k };
  
  // Get harmonies
  const complementary = getComplementary(cleanHex);
  const analogous = getAnalogous(cleanHex);
  const triadic = getTriadic(cleanHex);
  const splitComp = getSplitComplementary(cleanHex);
  
  // Determine text color for readability
  const whiteContrast = getContrastRatio(rgb, { r: 255, g: 255, b: 255 });
  const blackContrast = getContrastRatio(rgb, { r: 0, g: 0, b: 0 });
  const textColor = whiteContrast > blackContrast ? '#FFFFFF' : '#000000';
  
  const copyToClipboard = async (value: string, label: string) => {
    await navigator.clipboard.writeText(value);
    setCopiedValue(label);
    toast.success(`${label} copied!`);
    setTimeout(() => setCopiedValue(null), 2000);
  };
  
  const colorValues = [
    { label: 'HEX', value: `#${cleanHex}` },
    { label: 'RGB', value: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` },
    { label: 'HSL', value: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` },
    { label: 'CMYK', value: `cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)` },
  ];
  
  const codeSnippets = {
    css: `--color-primary: #${cleanHex};\n--color-primary-rgb: ${rgb.r}, ${rgb.g}, ${rgb.b};`,
    tailwind: `colors: {\n  primary: '#${cleanHex}',\n  'primary-light': '#${analogous[0]}',\n}`,
    scss: `$color-primary: #${cleanHex};\n$color-primary-rgb: rgb(${rgb.r}, ${rgb.g}, ${rgb.b});`,
    react: `const theme = {\n  primary: '#${cleanHex}',\n  primaryRgb: 'rgb(${rgb.r}, ${rgb.g}, ${rgb.b})',\n};`,
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": `${colorInfo.name} (#${cleanHex}) - Color Information`,
    "description": `Complete guide to ${colorInfo.name} color (#${cleanHex}). Get HEX, RGB, HSL, CMYK values, color psychology, matching palettes, and code snippets.`,
    "mainEntity": {
      "@type": "Thing",
      "name": colorInfo.name,
      "description": colorInfo.psychology,
      "identifier": `#${cleanHex}`,
    }
  };

  // Generate related colors (lighter/darker shades)
  const generateRelatedColors = (hex: string): string[] => {
    const rgb = hexToRgb(hex);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    const colors: string[] = [];
    
    for (let l = 10; l <= 90; l += 9) {
      const h = hsl.h;
      const s = hsl.s;
      const newL = l;
      
      const sNorm = s / 100;
      const lNorm = newL / 100;
      const a = sNorm * Math.min(lNorm, 1 - lNorm);
      const f = (n: number) => {
        const k = (n + h / 30) % 12;
        const color = lNorm - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color).toString(16).padStart(2, '0');
      };
      colors.push(`${f(0)}${f(8)}${f(4)}`.toUpperCase());
    }
    
    return colors;
  };

  // Download swatch files
  const downloadSwatch = (hex: string, format: string) => {
    if (format === 'png') {
      const canvas = document.createElement('canvas');
      canvas.width = 400;
      canvas.height = 400;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = `#${hex}`;
        ctx.fillRect(0, 0, 400, 400);
        
        ctx.fillStyle = getLuminance(rgb.r, rgb.g, rgb.b) > 0.5 ? '#000000' : '#FFFFFF';
        ctx.font = 'bold 32px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(`#${hex}`, 200, 210);
        
        const link = document.createElement('a');
        link.download = `color-${hex}.png`;
        link.href = canvas.toDataURL();
        link.click();
      }
    } else {
      toast.info(`${format.toUpperCase()} export coming soon!`);
    }
  };

  return (
    <MainLayout>
      <SEOHead 
        title={`${colorInfo.name} (#${cleanHex}) - HEX, RGB, HSL & Matching Colors | COLOUR PINE`}
        description={`${colorInfo.name} color (#${cleanHex}): ${colorInfo.psychology}. Get RGB(${rgb.r}, ${rgb.g}, ${rgb.b}), HSL, CMYK values, complementary colors, and ready-to-use code.`}
        keywords={`#${cleanHex}, ${colorInfo.name}, ${colorInfo.category} color, hex to rgb, color palette, ${cleanHex} complementary colors`}
        canonicalUrl={`https://colourpine.com/color/${cleanHex}`}
        structuredData={structuredData}
      />
      
      <div className="p-6 lg:p-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <span>/</span>
            <Link to="/colors" className="hover:text-foreground transition-colors">Colors</Link>
            <span>/</span>
            <span className="text-foreground font-medium">{colorInfo.name}</span>
          </nav>
          
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid lg:grid-cols-2 gap-8 mb-12"
          >
            {/* Color Swatch */}
            <div 
              className="aspect-square rounded-3xl shadow-2xl flex items-center justify-center relative overflow-hidden group"
              style={{ backgroundColor: `#${cleanHex}` }}
            >
              <div className="text-center z-10" style={{ color: textColor }}>
                <h1 className="text-4xl md:text-6xl font-bold mb-2">{colorInfo.name}</h1>
                <p className="text-2xl md:text-3xl opacity-80">#{cleanHex}</p>
              </div>
              
              <div className="absolute top-4 right-4 flex gap-2">
                <Button 
                  size="icon" 
                  variant="secondary"
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="backdrop-blur-sm bg-white/20 hover:bg-white/30"
                >
                  <Heart className={`h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} style={{ color: textColor }} />
                </Button>
                <Button 
                  size="icon" 
                  variant="secondary"
                  onClick={() => copyToClipboard(`https://colourpine.com/color/${cleanHex}`, 'URL')}
                  className="backdrop-blur-sm bg-white/20 hover:bg-white/30"
                >
                  <Share2 className="h-4 w-4" style={{ color: textColor }} />
                </Button>
              </div>
              
              <Badge 
                className="absolute bottom-4 left-4"
                style={{ backgroundColor: textColor === '#FFFFFF' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)', color: textColor }}
              >
                {colorInfo.category}
              </Badge>
            </div>
            
            {/* Color Information */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="h-5 w-5 text-primary" />
                    Color Values
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {colorValues.map(({ label, value }) => (
                    <div 
                      key={label}
                      className="flex items-center justify-between p-3 bg-muted rounded-lg cursor-pointer hover:bg-muted/80 transition-colors group"
                      onClick={() => copyToClipboard(value, label)}
                    >
                      <span className="font-medium">{label}</span>
                      <div className="flex items-center gap-2">
                        <code className="text-sm bg-background px-2 py-1 rounded">{value}</code>
                        {copiedValue === label ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <Copy className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="h-5 w-5 text-primary" />
                    Color Psychology
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{colorInfo.psychology}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {colorInfo.useCases.map((useCase) => (
                      <Badge key={useCase} variant="outline">{useCase}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
          
          {/* Color Harmonies */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Color Harmonies</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <HarmonyCard title="Complementary" colors={[cleanHex, ...complementary]} />
              <HarmonyCard title="Analogous" colors={[cleanHex, ...analogous]} />
              <HarmonyCard title="Triadic" colors={[cleanHex, ...triadic]} />
              <HarmonyCard title="Split Complementary" colors={[cleanHex, ...splitComp]} />
            </div>
          </section>
          
          {/* Code Snippets */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Code className="h-6 w-6 text-primary" />
              Code Snippets
            </h2>
            <Tabs defaultValue="css" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="css">CSS Variables</TabsTrigger>
                <TabsTrigger value="tailwind">Tailwind</TabsTrigger>
                <TabsTrigger value="scss">SCSS</TabsTrigger>
                <TabsTrigger value="react">React</TabsTrigger>
              </TabsList>
              {Object.entries(codeSnippets).map(([key, code]) => (
                <TabsContent key={key} value={key}>
                  <Card>
                    <CardContent className="p-4 relative">
                      <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                        <code>{code}</code>
                      </pre>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="absolute top-6 right-6"
                        onClick={() => copyToClipboard(code, key.toUpperCase())}
                      >
                        {copiedValue === key.toUpperCase() ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
          </section>
          
          {/* Accessibility Check */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Accessibility Check</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <AccessibilityCard background={cleanHex} foreground="FFFFFF" label="White Text" />
              <AccessibilityCard background={cleanHex} foreground="000000" label="Black Text" />
            </div>
          </section>
          
          {/* Related Colors */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Related Colors</h2>
            <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
              {generateRelatedColors(cleanHex).map((color) => (
                <Link 
                  key={color}
                  to={`/color/${color}`}
                  className="aspect-square rounded-lg shadow-sm hover:scale-110 transition-transform"
                  style={{ backgroundColor: `#${color}` }}
                  title={`#${color}`}
                />
              ))}
            </div>
          </section>
          
          {/* Download Section */}
          <section className="mb-12">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold mb-2">Download Color Assets</h3>
                    <p className="text-muted-foreground">Get this color in various formats for your design tools</p>
                  </div>
                  <div className="flex gap-3 flex-wrap">
                    <Button variant="outline" onClick={() => downloadSwatch(cleanHex, 'ase')}>
                      <Download className="h-4 w-4 mr-2" /> .ASE
                    </Button>
                    <Button variant="outline" onClick={() => downloadSwatch(cleanHex, 'aco')}>
                      <Download className="h-4 w-4 mr-2" /> .ACO
                    </Button>
                    <Button variant="outline" onClick={() => downloadSwatch(cleanHex, 'png')}>
                      <Download className="h-4 w-4 mr-2" /> .PNG
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
          
          {/* Back to Colors */}
        {/* Back to Colors */}
        <div className="text-center">
          <Link to="/colors">
            <Button size="lg" variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Explore More Colors
            </Button>
          </Link>
        </div>
      </div>
    </MainLayout>
  );
};

// Harmony Card Component
const HarmonyCard = ({ title, colors }: { title: string; colors: string[] }) => (
  <Card className="overflow-hidden">
    <CardHeader className="pb-2">
      <CardTitle className="text-sm">{title}</CardTitle>
    </CardHeader>
    <CardContent className="p-0">
      <div className="flex h-20">
        {colors.map((color, i) => (
          <Link
            key={`${color}-${i}`}
            to={`/color/${color}`}
            className="flex-1 relative group"
            style={{ backgroundColor: `#${color}` }}
          >
            <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30 text-white text-xs font-mono">
              #{color}
            </span>
          </Link>
        ))}
      </div>
    </CardContent>
  </Card>
);

// Accessibility Card Component
const AccessibilityCard = ({ background, foreground, label }: { background: string; foreground: string; label: string }) => {
  const bgRgb = hexToRgb(background);
  const fgRgb = hexToRgb(foreground);
  const contrast = getContrastRatio(bgRgb, fgRgb);
  const level = getWCAGLevel(contrast);
  
  const levelColors: Record<string, string> = {
    'AAA': 'bg-green-500',
    'AA': 'bg-green-400',
    'AA-Large': 'bg-yellow-500',
    'Fail': 'bg-red-500',
  };
  
  return (
    <Card>
      <CardContent className="p-4">
        <div 
          className="p-4 rounded-lg mb-4 flex items-center justify-center"
          style={{ backgroundColor: `#${background}`, color: `#${foreground}` }}
        >
          <span className="text-lg font-medium">Sample Text</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">{label}</span>
          <div className="flex items-center gap-2">
            <span className="text-sm font-mono">{contrast.toFixed(2)}:1</span>
            <Badge className={levelColors[level]}>{level}</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ColorPage;
