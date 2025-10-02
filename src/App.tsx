import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/providers/theme-provider";
import { SyncProvider, useSync } from "@/providers/sync-provider";
import { Layout } from "@/components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import ProducaoAnalyticsSimple from "./pages/ProducaoAnalyticsSimple";
import Funil from "./pages/Funil";
import Propostas from "./pages/Propostas";
import Statement from './pages/Statement';
import Faturas from './pages/Faturas';
import NotFound from "./pages/NotFound";
import ExtratoRanking from "./pages/ExtratoRanking";
import NetworkTest from "./pages/NetworkTest";
import WelcomeScreen from "./components/WelcomeScreen";

const queryClient = new QueryClient();

function AppContent() {
  const { lastSync, isRefreshing } = useSync();

  return (
    <HashRouter>
      <Routes>
        {/* Tela de boas-vindas sem layout */}
        <Route path="/" element={<WelcomeScreen />} />
        
        {/* Páginas com layout principal */}
        <Route path="/dashboard" element={
          <Layout lastSync={lastSync} isRefreshing={isRefreshing}>
            <Dashboard />
          </Layout>
        } />
        <Route path="/producao/analytics" element={
          <Layout lastSync={lastSync} isRefreshing={isRefreshing}>
            <ProducaoAnalyticsSimple />
          </Layout>
        } />
        <Route path="/funil" element={
          <Layout lastSync={lastSync} isRefreshing={isRefreshing}>
            <Funil />
          </Layout>
        } />
        <Route path="/propostas" element={
          <Layout lastSync={lastSync} isRefreshing={isRefreshing}>
            <Propostas />
          </Layout>
        } />
        <Route path="/extrato" element={
          <Layout lastSync={lastSync} isRefreshing={isRefreshing}>
            <Statement />
          </Layout>
        } />
        <Route path="/extrato/ranking" element={
          <Layout lastSync={lastSync} isRefreshing={isRefreshing}>
            <ExtratoRanking />
          </Layout>
        } />
        <Route path="/faturas" element={
          <Layout lastSync={lastSync} isRefreshing={isRefreshing}>
            <Faturas />
          </Layout>
        } />
        <Route path="/network-test" element={
          <Layout lastSync={lastSync} isRefreshing={isRefreshing}>
            <NetworkTest />
          </Layout>
        } />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </HashRouter>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <SyncProvider>
      <ThemeProvider defaultTheme="dark" storageKey="delta-theme">
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <AppContent />
        </TooltipProvider>
      </ThemeProvider>
    </SyncProvider>
  </QueryClientProvider>
);

export default App;
