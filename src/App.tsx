
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Admin pages
import AdminIndex from "./pages/admin/Index";
import UsersPage from "./pages/admin/UsersPage";
import ListingsPage from "./pages/admin/ListingsPage";
import ReviewsPage from "./pages/admin/ReviewsPage";
import NotificationsPage from "./pages/admin/NotificationsPage";
import KYCPage from "./pages/admin/KYCPage";
import SettingsPage from "./pages/admin/SettingsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminIndex />} />
          <Route path="/admin/users" element={<UsersPage />} />
          <Route path="/admin/listings" element={<ListingsPage />} />
          <Route path="/admin/reviews" element={<ReviewsPage />} />
          <Route path="/admin/notifications" element={<NotificationsPage />} />
          <Route path="/admin/kyc" element={<KYCPage />} />
          <Route path="/admin/settings" element={<SettingsPage />} />
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
