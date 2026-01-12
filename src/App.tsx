import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { SubscriptionProvider } from "@/hooks/useSubscription";
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
import UISimulator from "./pages/UISimulator";
import URLBrandExtractor from "./pages/URLBrandExtractor";
import AccessibilityDashboard from "./pages/AccessibilityDashboard";
import CodeExport from "./pages/CodeExport";
import MoodAISearch from "./pages/MoodAISearch";
import BrandArchitect from "./pages/BrandArchitect";
import SocialMediaKit from "./pages/SocialMediaKit";
import AIConstraintGenerator from "./pages/AIConstraintGenerator";
import DataVizStudio from "./pages/DataVizStudio";
import ProjectWorkspace from "./pages/ProjectWorkspace";
import ColorSpaceConverter from "./pages/ColorSpaceConverter";
import Subscription from "./pages/Subscription";
import ColorExplorer from "./pages/ColorExplorer";
import LiveUIPreview from "./pages/LiveUIPreview";
import ContrastChecker from "./pages/ContrastChecker";
import ColorIndex from "./pages/ColorIndex";
import ColorPage from "./pages/ColorPage";
import TrendsIndex from "./pages/TrendsIndex";
import CloudDancer2026 from "./pages/CloudDancer2026";
import Mermaidcore2026 from "./pages/Mermaidcore2026";
import ThermalGlow2026 from "./pages/ThermalGlow2026";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <SubscriptionProvider>
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
              <Route path="/subscription" element={<Subscription />} />
              <Route path="/image-extractor" element={<ImageColorExtractor />} />
              <Route path="/ai-suggestions" element={<AIColorSuggestions />} />
              <Route path="/brand-colors" element={<BrandColors />} />
              <Route path="/blindness-simulator" element={<ColorBlindnessSimulator />} />
              <Route path="/ui-simulator" element={<UISimulator />} />
              <Route path="/url-extractor" element={<URLBrandExtractor />} />
              <Route path="/accessibility" element={<AccessibilityDashboard />} />
              <Route path="/code-export" element={<CodeExport />} />
              <Route path="/mood-search" element={<MoodAISearch />} />
              <Route path="/brand-architect" element={<BrandArchitect />} />
              <Route path="/social-kit" element={<SocialMediaKit />} />
              <Route path="/ai-constraint-generator" element={<AIConstraintGenerator />} />
              <Route path="/data-viz-studio" element={<DataVizStudio />} />
              <Route path="/project-workspace" element={<ProjectWorkspace />} />
              <Route path="/color-space-converter" element={<ColorSpaceConverter />} />
              <Route path="/color/:hex" element={<ColorPage />} />
              <Route path="/color-explorer" element={<ColorExplorer />} />
              <Route path="/colors" element={<ColorIndex />} />
              <Route path="/live-preview" element={<LiveUIPreview />} />
              <Route path="/contrast-checker" element={<ContrastChecker />} />
              <Route path="/trends" element={<TrendsIndex />} />
              <Route path="/trends/cloud-dancer-2026" element={<CloudDancer2026 />} />
              <Route path="/trends/mermaidcore-2026" element={<Mermaidcore2026 />} />
              <Route path="/trends/thermal-glow-2026" element={<ThermalGlow2026 />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </SubscriptionProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
