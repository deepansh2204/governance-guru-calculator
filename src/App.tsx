
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import GovMetrics from "./pages/GovMetrics";
import EnvMetrics from "./pages/EnvMetrics";
import SocMetrics from "./pages/SocMetrics";
import FullESG from "./pages/FullESG";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/governance" element={<GovMetrics />} />
          <Route path="/environmental" element={<EnvMetrics />} />
          <Route path="/social" element={<SocMetrics />} />
          <Route path="/full-esg" element={<FullESG />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
