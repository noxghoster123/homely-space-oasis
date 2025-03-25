
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Properties from "./pages/Properties";
import PropertyDetail from "./pages/PropertyDetail";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Contact from "./pages/Contact";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import AgencyList from "./pages/agencies/AgencyList";
import AgencyDetail from "./pages/agencies/AgencyDetail";
import AgentProfile from "./pages/agents/AgentProfile";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProperties from "./pages/admin/AdminProperties";
import AdminAgencies from "./pages/admin/AdminAgencies";
import AdminAgents from "./pages/admin/AdminAgents";
import AdminSubscriptions from "./pages/admin/AdminSubscriptions";
import AdminAnalytics from "./pages/admin/AdminAnalytics";
import UserProfile from "./pages/user/UserProfile";
import AgentCalendar from "./pages/agents/AgentCalendar";
import UserMessages from "./pages/user/UserMessages";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Index />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/properties/:id" element={<PropertyDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/agencies" element={<AgencyList />} />
          <Route path="/agencies/:id" element={<AgencyDetail />} />
          
          {/* User routes */}
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/messages" element={<UserMessages />} />
          
          {/* Agent routes */}
          <Route path="/agent/profile/:id" element={<AgentProfile />} />
          <Route path="/agent/calendar" element={<AgentCalendar />} />
          
          {/* Admin routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/properties" element={<AdminProperties />} />
          <Route path="/admin/agencies" element={<AdminAgencies />} />
          <Route path="/admin/agents" element={<AdminAgents />} />
          <Route path="/admin/subscriptions" element={<AdminSubscriptions />} />
          <Route path="/admin/analytics" element={<AdminAnalytics />} />
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
        <Sonner />
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
