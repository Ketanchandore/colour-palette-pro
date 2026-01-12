import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Copy, Palette, Waves, Sparkles, Gem, Shell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import SEOHead from '@/components/seo/SEOHead';
import { toast } from 'sonner';

const Mermaidcore2026 = () => {
  const mainPalette = [
    { name: 'Deep Ocean', hex: '0D4F5C', role: 'Primary' },
    { name: 'Iridescent Teal', hex: '20B2AA', role: 'Secondary' },
    { name: 'Pearl Shimmer', hex: 'E8F4F8', role: 'Background' },
    { name: 'Amethyst Violet', hex: '9966CC', role: 'Accent' },
    { name: 'Coral Pink', hex: 'FF7F7F', role: 'Highlight' },
    { name: 'Sea Foam', hex: '98E4D9', role: 'Tertiary' },
  ];

  const gradients = [
    {
      name: 'Ocean Depths',
      css: 'linear-gradient(135deg, #0D4F5C 0%, #20B2AA 50%, #98E4D9 100%)',
      colors: ['0D4F5C', '20B2AA', '98E4D9']
    },
    {
      name: 'Pearl Iridescence',
      css: 'linear-gradient(135deg, #E8F4F8 0%, #D8BFD8 50%, #9966CC 100%)',
      colors: ['E8F4F8', 'D8BFD8', '9966CC']
    },
    {
      name: 'Sunset Waters',
      css: 'linear-gradient(180deg, #FF7F7F 0%, #20B2AA 50%, #0D4F5C 100%)',
      colors: ['FF7F7F', '20B2AA', '0D4F5C']
    },
  ];

  const useCases = [
    {
      title: 'Fashion & Beauty',
      description: 'Swimwear, cosmetics, nail art, and jewelry brands',
      icon: Gem,
    },
    {
      title: 'Digital Products',
      description: 'Gaming apps, fantasy themes, wellness platforms',
      icon: Sparkles,
    },
    {
      title: 'Events & Weddings',
      description: 'Beach weddings, tropical events, summer parties',
      icon: Shell,
    },
    {
      title: 'Social Media',
      description: 'Instagram aesthetics, TikTok visuals, Pinterest boards',
      icon: Waves,
    },
  ];

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard`);
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Mermaidcore Aesthetic 2026 - Complete Color Palette Guide",
    "description": "Explore the Mermaidcore aesthetic trend for 2026. Get iridescent teals, pearl purples, and shimmering violet color codes for your designs.",
    "datePublished": "2026-01-01",
    "dateModified": "2026-01-11",
    "author": { "@type": "Organization", "name": "COLOUR PINE" }
  };

  return (
    <>
      <SEOHead 
        title="Mermaidcore 2026 - Iridescent Teal & Pearl Palette | COLOUR PINE"
        description="Explore the Mermaidcore aesthetic trend for 2026. Get iridescent teals, pearl shimmer, and amethyst violet color codes with HEX, RGB values."
        keywords="mermaidcore, mermaid aesthetic, iridescent colors, teal palette, pearl colors, ocean aesthetic 2026"
        canonicalUrl="https://colourpine.com/trends/mermaidcore-2026"
        structuredData={structuredData}
      />
      
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-20">
          {/* Hero Section */}
          <section 
            className="relative min-h-[80vh] flex items-center justify-center overflow-hidden"
            style={{ 
              background: 'linear-gradient(135deg, #0D4F5C 0%, #20B2AA 30%, #98E4D9 50%, #9966CC 70%, #E8F4F8 100%)'
            }}
          >
            {/* Animated bubbles */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full bg-white/20 backdrop-blur-sm"
                  style={{
                    width: Math.random() * 60 + 20,
                    height: Math.random() * 60 + 20,
                    left: `${Math.random() * 100}%`,
                    bottom: -100,
                  }}
                  animate={{
                    y: [0, -800],
                    opacity: [0, 0.8, 0],
                  }}
                  transition={{
                    duration: Math.random() * 10 + 10,
                    repeat: Infinity,
                    delay: Math.random() * 5,
                    ease: 'easeOut',
                  }}
                />
              ))}
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="container mx-auto px-4 text-center relative z-10"
            >
              <Badge className="mb-6 bg-white/20 text-white backdrop-blur-sm border-white/30">
                <Waves className="w-3 h-3 mr-1" />
                2026 Aesthetic Trend
              </Badge>
              
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 drop-shadow-lg">
                Mermaidcore
              </h1>
              
              <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto mb-8 drop-shadow">
                Embrace the shimmering mystery of the ocean with iridescent teals, 
                pearlescent purples, and glittery silvers.
              </p>
              
              <div className="flex flex-wrap justify-center gap-3">
                {mainPalette.slice(0, 4).map((color) => (
                  <Button
                    key={color.hex}
                    onClick={() => copyToClipboard(`#${color.hex}`, color.name)}
                    className="backdrop-blur-sm border border-white/30"
                    style={{ 
                      backgroundColor: `#${color.hex}40`,
                      color: parseInt(color.hex.slice(0, 2), 16) > 128 ? '#000' : '#fff'
                    }}
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    #{color.hex}
                  </Button>
                ))}
              </div>
            </motion.div>
          </section>
          
          {/* Color Palette */}
          <section className="py-20 container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
                Mermaidcore Color Palette
              </h2>
              <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
                The essential colors that define the Mermaidcore aesthetic - from deep ocean depths to shimmering pearl surfaces.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {mainPalette.map((color, i) => (
                  <motion.div
                    key={color.hex}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    onClick={() => copyToClipboard(`#${color.hex}`, color.name)}
                    className="cursor-pointer group"
                  >
                    <div 
                      className="aspect-square rounded-2xl shadow-lg mb-3 transition-all group-hover:scale-105 group-hover:shadow-xl relative overflow-hidden"
                      style={{ backgroundColor: `#${color.hex}` }}
                    >
                      {/* Shimmer effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <h3 className="font-medium text-sm">{color.name}</h3>
                    <p className="text-xs text-muted-foreground font-mono">#{color.hex}</p>
                    <Badge variant="outline" className="mt-1 text-xs">{color.role}</Badge>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </section>
          
          {/* Gradients */}
          <section className="py-20 bg-muted/50">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
                Mermaidcore Gradients
              </h2>
              <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
                Stunning gradient combinations that capture the iridescent quality of mermaid scales.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6">
                {gradients.map((gradient, i) => (
                  <motion.div
                    key={gradient.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Card className="overflow-hidden h-full">
                      <div 
                        className="h-40 cursor-pointer hover:scale-105 transition-transform"
                        style={{ background: gradient.css }}
                        onClick={() => copyToClipboard(gradient.css, 'Gradient CSS')}
                      />
                      <CardHeader>
                        <CardTitle className="text-lg">{gradient.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex gap-2 mb-3">
                          {gradient.colors.map((hex) => (
                            <button
                              key={hex}
                              onClick={() => copyToClipboard(`#${hex}`, 'Color')}
                              className="w-8 h-8 rounded-full shadow-sm hover:scale-110 transition-transform"
                              style={{ backgroundColor: `#${hex}` }}
                              title={`#${hex}`}
                            />
                          ))}
                        </div>
                        <code className="text-xs bg-muted px-2 py-1 rounded block overflow-x-auto">
                          {gradient.css}
                        </code>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
          
          {/* Use Cases */}
          <section className="py-20 container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Where to Use Mermaidcore
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {useCases.map((useCase, i) => (
                <motion.div
                  key={useCase.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="h-full text-center hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div 
                        className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                        style={{ background: 'linear-gradient(135deg, #20B2AA, #9966CC)' }}
                      >
                        <useCase.icon className="w-8 h-8 text-white" />
                      </div>
                      <CardTitle>{useCase.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{useCase.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </section>
          
          {/* Related Trends */}
          <section className="py-20 bg-gradient-to-r from-[#0D4F5C] to-[#9966CC]">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold mb-8 text-white">Explore More 2026 Trends</h2>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/trends/cloud-dancer-2026">
                  <Button variant="secondary" size="lg">
                    Cloud Dancer 2026 →
                  </Button>
                </Link>
                <Link to="/trends/thermal-glow-2026">
                  <Button variant="secondary" size="lg">
                    Thermal Glow →
                  </Button>
                </Link>
                <Link to="/colors">
                  <Button variant="secondary" size="lg">
                    All Colors →
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

export default Mermaidcore2026;
