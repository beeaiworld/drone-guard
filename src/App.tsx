import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ResetPassword from "./pages/auth/ResetPassword";
import NotFound from "./pages/NotFound";
import DroneMapPage from "./pages/DroneMapPage";
import Security from "./pages/Security";
import Alerts from "./pages/Alerts";
import AlertCategories from "./pages/AlertCategories";
import AlertNotifications from "./pages/AlertNotifications";
import Settings from "./pages/Settings";
import CommandCenter from "./pages/CommandCenter";
import SensorTamperingSimulation from "./pages/SensorTamperingSimulation";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary">
        <Toaster />
        <Sonner />
        <Router>
          <Routes>
            <Route path="/auth" element={<Navigate to="/auth/login" replace />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/register" element={<Register />} />
            <Route path="/auth/reset-password" element={<ResetPassword />} />
            <Route path="/" element={<Index />} />
            <Route path="/map" element={<DroneMapPage />} />
            <Route path="/security" element={<Security />} />
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/alerts/categories" element={<AlertCategories />} />
            <Route path="/alerts/notifications" element={<AlertNotifications />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/command-center" element={<CommandCenter />} />
            <Route path="/sensor-tampering" element={<SensorTamperingSimulation />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </div>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
