import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";

// Pages
import WelcomeScreen from "./pages/WelcomeScreen";
import SignupScreen from "./pages/SignupScreen";
import LoginScreen from "./pages/LoginScreen";
import PersonalInfoScreen from "./pages/PersonalInfoScreen";
import FinancialAwarenessScreen from "./pages/FinancialAwarenessScreen";
import BudgetAllocationScreen from "./pages/BudgetAllocationScreen";
import GameModeScreen from "./pages/GameModeScreen";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Welcome & Auth */}
            <Route path="/" element={<WelcomeScreen />} />
            <Route path="/signup" element={<SignupScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            
            {/* Onboarding */}
            <Route path="/personal-info" element={<PersonalInfoScreen />} />
            <Route path="/financial-awareness" element={<FinancialAwarenessScreen />} />
            <Route path="/budget-allocation" element={<BudgetAllocationScreen />} />
            
            {/* Game Modes */}
            <Route path="/blind-mode" element={<GameModeScreen mode="blind" />} />
            <Route path="/learning-mode" element={<GameModeScreen mode="learning" />} />
            <Route path="/aware-mode" element={<GameModeScreen mode="aware" />} />
            <Route path="/results" element={<GameModeScreen mode="results" />} />
            
            {/* Fallback */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
