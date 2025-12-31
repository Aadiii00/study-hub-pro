import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "@/components/ScrollToTop";
import Index from "./pages/Index";
import FirstYear from "./pages/FirstYear";
import FirstYearNotes from "./pages/FirstYearNotes";
import SubjectNotes from "./pages/SubjectNotes";
import CategoryNotes from "./pages/CategoryNotes";
import BranchSubjectNotes from "./pages/BranchSubjectNotes";
import Calculator from "./pages/Calculator";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/notes/first-year" element={<FirstYear />} />
          <Route path="/notes/first-year/:scheme/:cycle" element={<FirstYearNotes />} />
          <Route path="/notes/first-year/:scheme/:cycle/:subjectCode" element={<SubjectNotes />} />
          <Route path="/notes/:category" element={<CategoryNotes />} />
          <Route path="/notes/:category/:semester/:subjectCode" element={<BranchSubjectNotes />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
