import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Copy, Download, Palette, Star, TrendingUp, Award, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import SEOHead from '@/components/seo/SEOHead';
import { toast } from 'sonner';

const CloudDancer2026 = () => {
  // Cloud Dancer palette - Pantone 11-4201
  const mainColor = {
    name: 'Cloud Dancer',
    hex: 'F0EDE5',
    pantone: '11-4201',
    rgb: { r: 240, g: 237, b: 229 },
    hsl: { h: 44, s: 26, l: 92 },
    description: 'A luminous, airy white that evokes the feeling of softness and tranquility. Cloud Dancer is Pantone\'s Color of the Year 2026, representing hope, peace, and new beginnings.'
  };

  const harmonicPalette = [
    { name: 'Cloud Dancer', hex: 'F0EDE5', role: 'Primary' },
    { name: 'Soft Stone', hex: 'D4CFC4', role: 'Secondary' },
    { name: 'Warm Sand', hex: 'C7B299', role: 'Accent' },
    { name: 'Gentle Sage', hex: 'B8C4B8', role: 'Complementary' },
    { name: 'Dusty Rose', hex: 'D4B8B8', role: 'Highlight' },
  ];

  const webPalettes = [
    {
      name: 'Minimal Luxury',
      colors: ['F0EDE5', '2C2C2C', 'C4A77D', 'FFFFFF', '8B8B8B'],
      useCase: 'High-end e-commerce, luxury brands, premium services'
    },
    {
      name: 'Organic Wellness',
      colors: ['F0EDE5', '5B7B5B', 'E8DFD0', 'A8C5A8', '3D5B3D'],
      useCase: 'Health & wellness, organic products, spa websites'
    },
    {
      name: 'Modern Corporate',
      colors: ['F0EDE5', '1A1A2E', '4A5568', 'CBD5E0', '2D3748'],
      useCase: 'Tech startups, consulting firms, SaaS platforms'
    },
    {
      name: 'Artisan Craft',
      colors: ['F0EDE5', '8B4513', 'D4A574', 'F5DEB3', '654321'],
      useCase: 'Handmade goods, bakeries, craft brands'
    },
  ];

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard`);
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Cloud Dancer - Pantone Color of the Year 2026 Complete Guide",
    "description": "Complete guide to Cloud Dancer (Pantone 11-4201), the Color of the Year 2026. Get HEX codes, RGB values, color palettes, and design inspiration.",
    "datePublished": "2026-01-01",
    "dateModified": "2026-01-11",
    "author": {
      "@type": "Organization",
      "name": "COLOUR PINE"
    },
    "publisher": {
      "@type": "Organization",
      "name": "COLOUR PINE"
    }
  };

  return (
    <>
      <SEOHead 
        title="Cloud Dancer - Pantone Color of the Year 2026 | HEX, RGB, Palettes"
        description="Complete guide to Cloud Dancer (Pantone 11-4201), the 2026 Color of the Year. Get HEX codes, RGB values, matching palettes, and web design inspiration."
        keywords="cloud dancer, pantone 2026, color of the year 2026, pantone 11-4201, soft white color, neutral color palette"
        canonicalUrl="https://colourpine.com/trends/cloud-dancer-2026"
        structuredData={structuredData}
      />
      
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-20">
          {/* Hero Section */}
          <section 
            className="relative min-h-[70vh] flex items-center justify-center overflow-hidden"
            style={{ backgroundColor: `#${mainColor.hex}` }}
          >
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-20 left-20 w-64 h-64 rounded-full blur-3xl bg-white" />
              <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full blur-3xl bg-gray-200" />
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="container mx-auto px-4 text-center relative z-10"
            >
              <Badge className="mb-6 bg-white/80 text-gray-800 backdrop-blur-sm">
                <Award className="w-3 h-3 mr-1" />
                Pantone Color of the Year 2026
              </Badge>
              
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-gray-800 mb-6">
                Cloud Dancer
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto mb-8">
                {mainColor.description}
              </p>
              
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <Button 
                  onClick={() => copyToClipboard(`#${mainColor.hex}`, 'HEX code')}
                  className="bg-gray-800 hover:bg-gray-700 text-white"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  #{mainColor.hex}
                </Button>
                <Button 
                  onClick={() => copyToClipboard(`Pantone ${mainColor.pantone}`, 'Pantone code')}
                  variant="outline"
                  className="border-gray-400 text-gray-700 hover:bg-white/50"
                >
                  Pantone {mainColor.pantone}
                </Button>
              </div>
              
              {/* Color Values */}
              <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
                <button 
                  onClick={() => copyToClipboard(`rgb(${mainColor.rgb.r}, ${mainColor.rgb.g}, ${mainColor.rgb.b})`, 'RGB')}
                  className="font-mono hover:text-gray-800 transition-colors"
                >
                  RGB({mainColor.rgb.r}, {mainColor.rgb.g}, {mainColor.rgb.b})
                </button>
                <button 
                  onClick={() => copyToClipboard(`hsl(${mainColor.hsl.h}, ${mainColor.hsl.s}%, ${mainColor.hsl.l}%)`, 'HSL')}
                  className="font-mono hover:text-gray-800 transition-colors"
                >
                  HSL({mainColor.hsl.h}, {mainColor.hsl.s}%, {mainColor.hsl.l}%)
                </button>
              </div>
            </motion.div>
          </section>
          
          {/* Harmonic Palette */}
          <section className="py-20 container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
                Harmonic Color Palette
              </h2>
              <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
                Colors that work beautifully with Cloud Dancer to create balanced, sophisticated designs.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {harmonicPalette.map((color, i) => (
                  <motion.div
                    key={color.hex}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    onClick={() => copyToClipboard(`#${color.hex}`, color.name)}
                    className="cursor-pointer group"
                  >
                    <div 
                      className="aspect-square rounded-2xl shadow-lg mb-3 transition-transform group-hover:scale-105"
                      style={{ backgroundColor: `#${color.hex}` }}
                    />
                    <h3 className="font-medium">{color.name}</h3>
                    <p className="text-sm text-muted-foreground font-mono">#{color.hex}</p>
                    <Badge variant="outline" className="mt-1 text-xs">{color.role}</Badge>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </section>
          
          {/* Web Design Palettes */}
          <section className="py-20 bg-muted/50">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
                Web Design Palettes
              </h2>
              <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
                Ready-to-use color combinations featuring Cloud Dancer for different industries and use cases.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                {webPalettes.map((palette, i) => (
                  <motion.div
                    key={palette.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Card className="h-full">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Palette className="w-5 h-5 text-primary" />
                          {palette.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex rounded-xl overflow-hidden shadow-md mb-4 h-24">
                          {palette.colors.map((hex, j) => (
                            <button
                              key={j}
                              onClick={() => copyToClipboard(`#${hex}`, 'Color')}
                              className="flex-1 hover:flex-[1.2] transition-all duration-300"
                              style={{ backgroundColor: `#${hex}` }}
                              title={`#${hex}`}
                            />
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground">{palette.useCase}</p>
                        <div className="flex flex-wrap gap-1 mt-3">
                          {palette.colors.map((hex) => (
                            <code key={hex} className="text-xs bg-muted px-2 py-1 rounded">
                              #{hex}
                            </code>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
          
          {/* Usage Tips */}
          <section className="py-20 container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              How to Use Cloud Dancer
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <Star className="w-8 h-8 text-primary mb-2" />
                  <CardTitle>As Background</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Use Cloud Dancer as a warm alternative to pure white. It creates a softer, 
                    more inviting atmosphere while maintaining excellent readability.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <TrendingUp className="w-8 h-8 text-primary mb-2" />
                  <CardTitle>In UI Design</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Perfect for card backgrounds, modal overlays, and light mode themes. 
                    Pair with dark text (#1A1A1A) for optimal accessibility.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <Sparkles className="w-8 h-8 text-primary mb-2" />
                  <CardTitle>Branding</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Ideal for brands wanting to convey elegance, purity, and sustainability. 
                    Works beautifully with gold, sage, and earth tone accents.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>
          
          {/* Related Trends */}
          <section className="py-20 bg-muted/30">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold mb-8">Explore 2026 Trends</h2>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/trends/mermaidcore-2026">
                  <Button variant="outline" size="lg">
                    Mermaidcore Aesthetic →
                  </Button>
                </Link>
                <Link to="/trends/thermal-glow-2026">
                  <Button variant="outline" size="lg">
                    Thermal Glow Palette →
                  </Button>
                </Link>
                <Link to="/colors">
                  <Button variant="outline" size="lg">
                    Browse All Colors →
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default CloudDancer2026;
