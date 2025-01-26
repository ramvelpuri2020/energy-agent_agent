import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Navigation } from "./components/Navigation";
import Index from "./pages/Index";
import SignIn from "./pages/SignIn";
import { Dashboard } from "./components/Dashboard";
import { Marketplace } from "./components/Marketplace";
import { UserSurvey } from "./components/UserSurvey";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/survey" element={<UserSurvey />} />
            <Route
              path="/dashboard"
              element={
                <>
                  <Navigation />
                  <Dashboard />
                </>
              }
            />
            <Route
              path="/marketplace"
              element={
                <>
                  <Navigation />
                  <Marketplace />
                </>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;