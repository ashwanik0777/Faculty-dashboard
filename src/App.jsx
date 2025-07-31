import { useState } from "react";
// import { Toaster } from "../src/components/ui/toaster";
import { Toaster as Sonner } from "sonner";
// import { TooltipProvider } from "../src/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import FacultyLogin from "./pages/FacultyLogin";
import FacultyDashboard from "./pages/FacultyDashboard";
import NotFound from "./pages/NotFound";
import UnderDevLogin from "./components/underdevelopmentLogin";

const queryClient = new QueryClient();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  if (!isLoggedIn) {
    return <UnderDevLogin onLogin={handleLogin} />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      
        
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/faculty-login" element={<FacultyLogin />} />
            <Route path="/faculty-dashboard" element={<FacultyDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      
    </QueryClientProvider>
  );
};

export default App;