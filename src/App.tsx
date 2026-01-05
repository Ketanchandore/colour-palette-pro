import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Generator from "./pages/Generator";
import Trending from "./pages/Trending";
import Collections from "./pages/Collections";
import Tools from "./pages/Tools";
import Favorites from "./pages/Favorites";
import Profile from "./pages/Profile";
import ImageColorExtractor from "./pages/ImageColorExtractor";
import AIColorSuggestions from "./pages/AIColorSuggestions";
import BrandColors from "./pages/BrandColors";
import ColorBlindnessSimulator from "./pages/ColorBlindnessSimulator";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/generator" element={<Generator />} />
            <Route path="/trending" element={<Trending />} />
            <Route path="/collections" element={<Collections />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/image-extractor" element={<ImageColorExtractor />} />
            <Route path="/ai-suggestions" element={<AIColorSuggestions />} />
            <Route path="/brand-colors" element={<BrandColors />} />
            <Route path="/blindness-simulator" element={<ColorBlindnessSimulator />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
