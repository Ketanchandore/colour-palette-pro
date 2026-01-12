import { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Grid, List, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import SEOHead from '@/components/seo/SEOHead';
import { generateAllColorPages, getColorInfo, namedColors } from '@/lib/colorData';

const categories = ['All', 'Red', 'Orange', 'Yellow', 'Green', 'Teal', 'Blue', 'Purple', 'Pink', 'Neutral'];
const ITEMS_PER_PAGE = 200;

const ColorIndex = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [isLoading, setIsLoading] = useState(true);
  const loaderRef = useRef<HTMLDivElement>(null);
  
  const allColors = useMemo(() => {
    const colors = generateAllColorPages();
    setIsLoading(false);
    return colors.map(hex => ({ hex, ...getColorInfo(hex) }));
  }, []);
  
  const filteredColors = useMemo(() => {
    setVisibleCount(ITEMS_PER_PAGE);
    return allColors.filter(color => {
      const matchesSearch = !search || color.name.toLowerCase().includes(search.toLowerCase()) || color.hex.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === 'All' || color.category.toLowerCase() === category.toLowerCase();
      return matchesSearch && matchesCategory;
    });
  }, [allColors, search, category]);
  
  const visibleColors = useMemo(() => filteredColors.slice(0, visibleCount), [filteredColors, visibleCount]);
  const popularColors = Object.keys(namedColors).slice(0, 20);

  const loadMore = useCallback(() => {
    if (visibleCount < filteredColors.length) {
      setVisibleCount(prev => Math.min(prev + ITEMS_PER_PAGE, filteredColors.length));
    }
  }, [visibleCount, filteredColors.length]);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) loadMore();
    }, { threshold: 0.1 });
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [loadMore]);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Color Database - 50,000+ Colors",
    "numberOfItems": allColors.length,
  };

  return (
    <>
      <SEOHead title="Color Database - 50,000+ HEX Colors | COLOUR PINE" description="Browse 50,000+ colors with HEX codes, RGB, HSL values." canonicalUrl="https://colourpine.com/colors" structuredData={structuredData} />
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8 pt-24">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Color Database</h1>
            <p className="text-xl text-muted-foreground">{allColors.length.toLocaleString()}+ colors with HEX, RGB, HSL values</p>
          </motion.div>
          
          <Link to="/trends" className="block mb-12">
            <div className="rounded-2xl overflow-hidden p-6" style={{ background: 'linear-gradient(135deg, #F0EDE5 0%, #20B2AA 33%, #FF3131 66%, #8B00FF 100%)' }}>
              <Badge className="bg-white/90 text-gray-800 mb-2">✨ 2026 Trends</Badge>
              <h2 className="text-2xl font-bold text-white drop-shadow-lg">Cloud Dancer, Mermaidcore, Thermal Glow →</h2>
            </div>
          </Link>
          
          <section className="mb-12">
            <h2 className="text-xl font-semibold mb-4">Popular Colors</h2>
            <div className="flex flex-wrap gap-3">
              {popularColors.map(hex => (
                <Link key={hex} to={`/color/${hex}`}>
                  <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-muted hover:bg-muted/80 transition-colors">
                    <div className="w-5 h-5 rounded-full shadow-sm" style={{ backgroundColor: `#${hex}` }} />
                    <span className="text-sm">{getColorInfo(hex).name}</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
          
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search colors..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
            </div>
            <div className="flex gap-2">
              <Button variant={viewMode === 'grid' ? 'default' : 'outline'} size="icon" onClick={() => setViewMode('grid')}><Grid className="h-4 w-4" /></Button>
              <Button variant={viewMode === 'list' ? 'default' : 'outline'} size="icon" onClick={() => setViewMode('list')}><List className="h-4 w-4" /></Button>
            </div>
          </div>
          
          <Tabs value={category} onValueChange={setCategory} className="mb-8">
            <TabsList className="flex-wrap h-auto">{categories.map(cat => <TabsTrigger key={cat} value={cat}>{cat}</TabsTrigger>)}</TabsList>
          </Tabs>
          
          <p className="text-sm text-muted-foreground mb-6">Showing {visibleCount.toLocaleString()} of {filteredColors.length.toLocaleString()} colors</p>
          
          {isLoading ? (
            <div className="flex items-center justify-center h-96"><Loader2 className="w-8 h-8 animate-spin" /></div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-2">
              {visibleColors.map(color => (
                <Link key={color.hex} to={`/color/${color.hex}`}>
                  <div className="aspect-square rounded-lg shadow-sm relative overflow-hidden group hover:scale-110 hover:z-10 transition-transform" style={{ backgroundColor: `#${color.hex}` }}>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/50"><span className="text-white text-[10px] font-mono">#{color.hex}</span></div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {visibleColors.map(color => (
                <Link key={color.hex} to={`/color/${color.hex}`} className="flex items-center gap-4 p-4 rounded-lg bg-muted hover:bg-muted/80">
                  <div className="w-12 h-12 rounded-lg shadow-sm" style={{ backgroundColor: `#${color.hex}` }} />
                  <div className="flex-1"><h3 className="font-medium">{color.name}</h3><p className="text-sm text-muted-foreground font-mono">#{color.hex}</p></div>
                  <Badge variant="outline">{color.category}</Badge>
                </Link>
              ))}
            </div>
          )}
          
          {visibleCount < filteredColors.length && <div ref={loaderRef} className="flex justify-center py-8"><Loader2 className="w-6 h-6 animate-spin" /></div>}
        </main>
        <Footer />
      </div>
    </>
  );
};

export default ColorIndex;
