import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { TrendingUp, Sparkles, Waves, Flame, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { MainLayout } from '@/components/layout/MainLayout';
import SEOHead from '@/components/seo/SEOHead';

const trends2026 = [
  {
    id: 'cloud-dancer-2026',
    name: 'Cloud Dancer',
    subtitle: 'Pantone Color of the Year 2026',
    description: 'A luminous, airy white that evokes softness and tranquility. The official Pantone Color of the Year 2026.',
    gradient: 'linear-gradient(135deg, #F0EDE5 0%, #D4CFC4 50%, #C7B299 100%)',
    colors: ['F0EDE5', 'D4CFC4', 'C7B299', 'B8C4B8'],
    icon: Award,
    badge: 'Official 2026',
  },
  {
    id: 'mermaidcore-2026',
    name: 'Mermaidcore',
    subtitle: 'Iridescent Ocean Aesthetic',
    description: 'Shimmering teals, pearlescent purples, and glittering silvers inspired by ocean mythology.',
    gradient: 'linear-gradient(135deg, #0D4F5C 0%, #20B2AA 30%, #98E4D9 50%, #9966CC 100%)',
    colors: ['0D4F5C', '20B2AA', '98E4D9', '9966CC'],
    icon: Waves,
    badge: 'Trending',
  },
  {
    id: 'thermal-glow-2026',
    name: 'Thermal Glow',
    subtitle: 'Infrared Heat Map Aesthetic',
    description: 'High-contrast purples, reds, and oranges inspired by thermal imaging technology.',
    gradient: 'linear-gradient(135deg, #1A0033 0%, #8B00FF 25%, #FF3131 50%, #FF8C00 75%, #FFD700 100%)',
    colors: ['1A0033', '8B00FF', 'FF3131', 'FF8C00'],
    icon: Flame,
    badge: 'Hot',
  },
];

const TrendsIndex = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "2026 Color Trends - COLOUR PINE",
    "description": "Explore the hottest color trends for 2026 including Pantone Color of the Year, Mermaidcore, and Thermal Glow aesthetics.",
    "numberOfItems": trends2026.length,
  };

  return (
    <MainLayout>
      <SEOHead 
        title="2026 Color Trends - Pantone, Mermaidcore, Thermal Glow | COLOUR PINE"
        description="Discover the hottest color trends for 2026. Explore Cloud Dancer (Pantone 2026), Mermaidcore iridescent palettes, and Thermal Glow infrared aesthetics."
        keywords="2026 color trends, pantone 2026, cloud dancer, mermaidcore, thermal glow, color palette trends"
        canonicalUrl="https://colourpine.com/trends"
        structuredData={structuredData}
      />
      
      <div className="p-6 lg:p-8">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <Badge className="mb-4">
            <TrendingUp className="w-3 h-3 mr-1" />
            Updated for 2026
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            2026 Color Trends
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Stay ahead with the most influential color palettes and aesthetics 
            defining design in 2026. From Pantone's official picks to viral social media trends.
          </p>
        </motion.div>
        
        {/* Trend Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {trends2026.map((trend, i) => (
            <motion.div
              key={trend.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
            >
              <Link to={`/trends/${trend.id}`}>
                <Card className="h-full overflow-hidden group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  {/* Gradient Header */}
                  <div 
                    className="h-48 relative"
                    style={{ background: trend.gradient }}
                  >
                    <Badge className="absolute top-4 left-4 bg-white/90 text-gray-800">
                      <trend.icon className="w-3 h-3 mr-1" />
                      {trend.badge}
                    </Badge>
                    
                    {/* Color swatches */}
                    <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                      {trend.colors.map((hex) => (
                        <div
                          key={hex}
                          className="w-8 h-8 rounded-full shadow-lg border-2 border-white/50"
                          style={{ backgroundColor: `#${hex}` }}
                          title={`#${hex}`}
                        />
                      ))}
                    </div>
                  </div>
                  
                  <CardHeader>
                    <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                      {trend.name}
                    </CardTitle>
                    <CardDescription className="text-sm font-medium text-primary">
                      {trend.subtitle}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      {trend.description}
                    </p>
                    <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      Explore Palette →
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
        
        {/* Additional Trends Coming Soon */}
        <div className="rounded-2xl bg-muted/50 p-12 text-center mb-16">
          <Sparkles className="w-12 h-12 mx-auto mb-4 text-primary" />
          <h2 className="text-3xl font-bold mb-4">More Trends Coming</h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            We're constantly tracking emerging color trends. Stay tuned for 
            Walnut Retro, Bio-Luminescent, and more aesthetic guides.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Badge variant="outline" className="px-4 py-2">Walnut Retro</Badge>
            <Badge variant="outline" className="px-4 py-2">Bio-Luminescent</Badge>
            <Badge variant="outline" className="px-4 py-2">Holographic Bloom</Badge>
            <Badge variant="outline" className="px-4 py-2">Jelly Mint</Badge>
            <Badge variant="outline" className="px-4 py-2">Sunwashed Earth</Badge>
          </div>
        </div>
        
        {/* CTA */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6">Explore All Colors</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Browse our database of 50,000+ colors with HEX codes, RGB values, 
            and matching palettes.
          </p>
          <Link to="/colors">
            <Button size="lg">
              Browse Color Database →
            </Button>
          </Link>
        </div>
      </div>
    </MainLayout>
  );
};

export default TrendsIndex;
