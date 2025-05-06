
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";

import DashboardLayout from "./components/layout/DashboardLayout";
import Index from "./pages/Index";
import Security from "./pages/Security";
import JobPosts from "./pages/JobPosts";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <DashboardLayout>
                  <Index />
                </DashboardLayout>
              }
            />
            <Route
              path="/security"
              element={
                <DashboardLayout>
                  <Security />
                </DashboardLayout>
              }
            />
            <Route
              path="/job-posts"
              element={
                <DashboardLayout>
                  <JobPosts />
                </DashboardLayout>
              }
            />
            <Route
              path="/settings"
              element={
                <DashboardLayout>
                  <Settings />
                </DashboardLayout>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </Provider>
);

export default App;
