import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Copy, Palette, Flame, Thermometer, Zap, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import SEOHead from '@/components/seo/SEOHead';
import { toast } from 'sonner';

const ThermalGlow2026 = () => {
  const mainPalette = [
    { name: 'Hot Magenta', hex: 'FF00FF', temp: 'Extreme Heat' },
    { name: 'Electric Red', hex: 'FF3131', temp: 'Very Hot' },
    { name: 'Blazing Orange', hex: 'FF8C00', temp: 'Hot' },
    { name: 'Solar Yellow', hex: 'FFD700', temp: 'Warm' },
    { name: 'Cool Green', hex: '32CD32', temp: 'Neutral' },
    { name: 'Ice Blue', hex: '00BFFF', temp: 'Cool' },
    { name: 'Deep Purple', hex: '8B00FF', temp: 'Cold' },
    { name: 'Void Black', hex: '1A0033', temp: 'Coldest' },
  ];

  const thermalGradients = [
    {
      name: 'Full Spectrum',
      css: 'linear-gradient(135deg, #1A0033 0%, #8B00FF 15%, #00BFFF 30%, #32CD32 45%, #FFD700 60%, #FF8C00 75%, #FF3131 90%, #FF00FF 100%)',
      description: 'Complete thermal imaging spectrum from coldest to hottest'
    },
    {
      name: 'Heat Wave',
      css: 'linear-gradient(180deg, #FF00FF 0%, #FF3131 33%, #FF8C00 66%, #FFD700 100%)',
      description: 'Hot zone gradient for intensity and energy'
    },
    {
      name: 'Cool to Warm',
      css: 'linear-gradient(90deg, #1A0033 0%, #8B00FF 25%, #FF8C00 75%, #FF00FF 100%)',
      description: 'Dramatic temperature shift for data visualization'
    },
  ];

  const useCases = [
    {
      title: 'Tech & Innovation',
      description: 'AI dashboards, data visualization, tech startups',
      icon: Zap,
    },
    {
      title: 'Gaming & Esports',
      description: 'Game UI, streaming overlays, team branding',
      icon: Flame,
    },
    {
      title: 'Energy & Sustainability',
      description: 'Heat maps, energy monitoring, climate apps',
      icon: Thermometer,
    },
    {
      title: 'Fitness & Performance',
      description: 'Workout apps, intensity tracking, sports branding',
      icon: Sun,
    },
  ];

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard`);
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Thermal Glow 2026 - Infrared Color Palette Trend",
    "description": "Explore the Thermal Glow aesthetic for 2026. High-contrast infrared colors with purples, reds, oranges inspired by thermal imaging.",
    "datePublished": "2026-01-01",
    "dateModified": "2026-01-11",
    "author": { "@type": "Organization", "name": "COLOUR PINE" }
  };

  return (
    <>
      <SEOHead 
        title="Thermal Glow 2026 - Infrared Heat Map Color Palette | COLOUR PINE"
        description="Explore the Thermal Glow trend for 2026. Get high-contrast infrared colors with purples, reds, oranges inspired by thermal imaging technology."
        keywords="thermal glow, infrared colors, heat map palette, neon colors 2026, tech color palette, data visualization colors"
        canonicalUrl="https://colourpine.com/trends/thermal-glow-2026"
        structuredData={structuredData}
      />
      
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-20">
          {/* Hero Section */}
          <section 
            className="relative min-h-[80vh] flex items-center justify-center overflow-hidden"
            style={{ 
              background: 'linear-gradient(135deg, #1A0033 0%, #8B00FF 20%, #FF3131 50%, #FF8C00 70%, #FFD700 85%, #FF00FF 100%)'
            }}
          >
            {/* Animated heat particles */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(30)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    width: Math.random() * 8 + 4,
                    height: Math.random() * 8 + 4,
                    left: `${Math.random() * 100}%`,
                    bottom: -20,
                    background: ['#FF00FF', '#FF3131', '#FF8C00', '#FFD700'][Math.floor(Math.random() * 4)],
                    boxShadow: '0 0 10px currentColor',
                  }}
                  animate={{
                    y: [0, -600],
                    opacity: [0, 1, 0],
                    scale: [1, 0.5],
                  }}
                  transition={{
                    duration: Math.random() * 3 + 2,
                    repeat: Infinity,
                    delay: Math.random() * 3,
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
              <Badge className="mb-6 bg-black/30 text-white backdrop-blur-sm border-white/30">
                <Flame className="w-3 h-3 mr-1" />
                2026 Visual Trend
              </Badge>
              
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 drop-shadow-lg"
                style={{ textShadow: '0 0 40px rgba(255,49,49,0.5)' }}
              >
                Thermal Glow
              </h1>
              
              <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto mb-8 drop-shadow">
                High-contrast, heat-map inspired visuals with dramatic purples, 
                reds, and oranges straight from infrared imaging technology.
              </p>
              
              <div className="flex flex-wrap justify-center gap-2">
                {mainPalette.slice(0, 5).map((color) => (
                  <Button
                    key={color.hex}
                    onClick={() => copyToClipboard(`#${color.hex}`, color.name)}
                    className="backdrop-blur-sm border border-white/30"
                    style={{ 
                      backgroundColor: `#${color.hex}`,
                      color: color.hex === 'FFD700' || color.hex === '32CD32' ? '#000' : '#fff',
                      boxShadow: `0 0 20px #${color.hex}80`
                    }}
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    #{color.hex}
                  </Button>
                ))}
              </div>
            </motion.div>
          </section>
          
          {/* Thermal Scale */}
          <section className="py-20 container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
                Thermal Color Scale
              </h2>
              <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
                From cold void black to scorching hot magenta - the complete thermal imaging palette.
              </p>
              
              {/* Continuous gradient bar */}
              <div 
                className="h-16 rounded-2xl mb-8 shadow-lg"
                style={{ 
                  background: 'linear-gradient(90deg, #1A0033, #8B00FF, #00BFFF, #32CD32, #FFD700, #FF8C00, #FF3131, #FF00FF)'
                }}
              />
              
              <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
                {mainPalette.map((color, i) => (
                  <motion.div
                    key={color.hex}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => copyToClipboard(`#${color.hex}`, color.name)}
                    className="cursor-pointer group text-center"
                  >
                    <div 
                      className="aspect-square rounded-xl shadow-lg mb-2 transition-all group-hover:scale-110 relative"
                      style={{ 
                        backgroundColor: `#${color.hex}`,
                        boxShadow: `0 4px 20px #${color.hex}60`
                      }}
                    />
                    <h3 className="font-medium text-xs">{color.name}</h3>
                    <p className="text-[10px] text-muted-foreground font-mono">#{color.hex}</p>
                    <Badge variant="outline" className="mt-1 text-[10px] px-1">{color.temp}</Badge>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </section>
          
          {/* Gradients */}
          <section className="py-20 bg-[#0a0a0a]">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-white">
                Thermal Gradients
              </h2>
              <p className="text-gray-400 text-center max-w-2xl mx-auto mb-12">
                Ready-to-use CSS gradients that bring the thermal imaging aesthetic to your designs.
              </p>
              
              <div className="space-y-8">
                {thermalGradients.map((gradient, i) => (
                  <motion.div
                    key={gradient.name}
                    initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="bg-gray-900 rounded-2xl overflow-hidden"
                  >
                    <div 
                      className="h-32 cursor-pointer hover:h-40 transition-all"
                      style={{ background: gradient.css }}
                      onClick={() => copyToClipboard(gradient.css, 'Gradient CSS')}
                    />
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-2">{gradient.name}</h3>
                      <p className="text-gray-400 mb-4">{gradient.description}</p>
                      <code className="text-xs bg-black/50 px-3 py-2 rounded block overflow-x-auto text-green-400">
                        background: {gradient.css};
                      </code>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
          
          {/* Use Cases */}
          <section className="py-20 container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Perfect For
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
                  <Card className="h-full text-center hover:shadow-lg transition-shadow border-2 hover:border-primary/50">
                    <CardHeader>
                      <div 
                        className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                        style={{ 
                          background: 'linear-gradient(135deg, #FF3131, #FF8C00)',
                          boxShadow: '0 0 30px rgba(255,49,49,0.4)'
                        }}
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
          
          {/* CSS Variables */}
          <section className="py-20 bg-muted/50">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-8">Quick CSS Setup</h2>
              <Card className="max-w-2xl mx-auto">
                <CardContent className="p-6">
                  <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`:root {
  --thermal-coldest: #1A0033;
  --thermal-cold: #8B00FF;
  --thermal-cool: #00BFFF;
  --thermal-neutral: #32CD32;
  --thermal-warm: #FFD700;
  --thermal-hot: #FF8C00;
  --thermal-very-hot: #FF3131;
  --thermal-extreme: #FF00FF;
}`}
                  </pre>
                  <Button 
                    onClick={() => copyToClipboard(`:root {
  --thermal-coldest: #1A0033;
  --thermal-cold: #8B00FF;
  --thermal-cool: #00BFFF;
  --thermal-neutral: #32CD32;
  --thermal-warm: #FFD700;
  --thermal-hot: #FF8C00;
  --thermal-very-hot: #FF3131;
  --thermal-extreme: #FF00FF;
}`, 'CSS Variables')}
                    className="mt-4 w-full"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy CSS Variables
                  </Button>
                </CardContent>
              </Card>
            </div>
          </section>
          
          {/* Related Trends */}
          <section className="py-20" style={{ background: 'linear-gradient(135deg, #1A0033, #8B00FF)' }}>
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold mb-8 text-white">Explore More 2026 Trends</h2>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/trends/cloud-dancer-2026">
                  <Button variant="secondary" size="lg">
                    Cloud Dancer 2026 →
                  </Button>
                </Link>
                <Link to="/trends/mermaidcore-2026">
                  <Button variant="secondary" size="lg">
                    Mermaidcore →
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

export default ThermalGlow2026;
