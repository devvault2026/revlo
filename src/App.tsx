import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ClerkProvider, AuthenticateWithRedirectCallback } from '@clerk/clerk-react';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import { ToastProvider } from './features/revlo-os/context/ToastContext';
import { supabase } from './lib/supabase';
import { useAppStore } from './store/appStore';
import { Loader2 } from 'lucide-react';

// Components (always loaded)
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import PartnerAgent from './components/PartnerAgent';
import ScrollToTop from './components/ScrollToTop';

// Lazy-loaded pages - CRITICAL path (fast initial load)
const HomePage = React.lazy(() => import('./pages/HomePage'));

// Lazy-loaded pages - secondary pages
const ServicesPage = React.lazy(() => import('./pages/ServicesPage'));
const TeamPage = React.lazy(() => import('./pages/TeamPage'));
const RevloOSAppPage = React.lazy(() => import('./pages/RevloOSAppPage'));
const ResultsPage = React.lazy(() => import('./pages/ResultsPage'));
const ContactPage = React.lazy(() => import('./pages/ContactPage'));
const LoginPage = React.lazy(() => import('./pages/LoginPage'));
const RegisterPage = React.lazy(() => import('./pages/RegisterPage'));
const ForgotPasswordPage = React.lazy(() => import('./pages/ForgotPasswordPage'));
const NotFoundPage = React.lazy(() => import('./pages/NotFoundPage'));
const DemoPage = React.lazy(() => import('./pages/DemoPage'));
const CareersPage = React.lazy(() => import('./pages/CareersPage'));

// Lazy-loaded admin/project pages
const AdminPage = React.lazy(() => import('./pages/AdminPage'));
const LeadsPage = React.lazy(() => import('./pages/LeadsPage'));
const DashboardPage = React.lazy(() => import('./pages/DashboardPage'));
const EsdrOfferPage = React.lazy(() => import('./pages/EsdrOfferPage'));
const EsdrPaymentPage = React.lazy(() => import('./pages/EsdrPaymentPage'));
const AdminPaymentsPage = React.lazy(() => import('./pages/AdminPaymentsPage'));
const IndeedBotPage = React.lazy(() => import('./pages/projects/IndeedBotPage'));
const EsdrLivingPage = React.lazy(() => import('./pages/projects/EsdrLivingPage'));
const ScaleWithJarydPage = React.lazy(() => import('./pages/projects/ScaleWithJarydPage'));
const SnowblowrPage = React.lazy(() => import('./pages/projects/SnowblowrPage'));
const ScoutPage = React.lazy(() => import('./pages/ScoutPage'));
const TakeoffAgentPage = React.lazy(() => import('./pages/TakeoffAgentPage'));
const EliteDevelopmentPage = React.lazy(() => import('./pages/EliteDevelopmentPage'));
const OpenClawPage = React.lazy(() => import('./pages/OpenClawPage'));
const GHLAutomationPage = React.lazy(() => import('./pages/GHLAutomationPage'));
const RoofingPage = React.lazy(() => import('./pages/RoofingPage'));
const WebsitesPage = React.lazy(() => import('./pages/WebsitesPage'));
const BlogPage = React.lazy(() => import('./pages/BlogPage'));
const BlogPostPage = React.lazy(() => import('./pages/BlogPostPage'));

// Loading fallback component
const PageLoader = () => (
  <div className="h-screen w-screen flex flex-col items-center justify-center bg-[#020408] relative">
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px]" />
    </div>
    <div className="relative z-10 flex flex-col items-center gap-4">
      <Loader2 className="w-6 h-6 animate-spin text-purple-500" />
      <p className="text-xs text-slate-400">Loading...</p>
    </div>
  </div>
);

function App() {
    return (
        <AuthProvider>
            <ToastProvider>
                <NotificationProvider>
                    <Router>
                        <ScrollToTop />
                        <div className="min-h-screen flex flex-col bg-[#020408]">
                            <AnimatePresence mode="wait">
                                <Suspense fallback={<PageLoader />}>
                                    <Routes>
                                        {/* Public Routes with Navigation & Footer */}
                                        <Route path="/" element={
                                            <>
                                                <Navigation />
                                                <HomePage />
                                                <Footer />
                                            </>
                                        } />
                                        <Route path="/services" element={
                                            <>
                                                <Navigation />
                                                <ServicesPage />
                                                <Footer />
                                            </>
                                        } />
                                        <Route path="/team" element={
                                            <>
                                                <Navigation />
                                                <TeamPage />
                                                <Footer />
                                            </>
                                        } />
                                        <Route path="/revlo-os" element={
                                            <ProtectedRoute>
                                                <RevloOSAppPage />
                                            </ProtectedRoute>
                                        } />
                                        <Route path="/results" element={
                                            <>
                                                <Navigation />
                                                <ResultsPage />
                                                <Footer />
                                            </>
                                        } />
                                        <Route path="/contact" element={
                                            <>
                                                <Navigation />
                                                <ContactPage />
                                                <Footer />
                                            </>
                                        } />
                                        <Route path="/careers" element={
                                            <>
                                                <Navigation />
                                                <CareersPage />
                                                <Footer />
                                            </>
                                        } />
                                        <Route path="/offer/esdr" element={
                                            <>
                                                <Navigation />
                                                <EsdrOfferPage />
                                                <Footer />
                                            </>
                                        } />
                                        <Route path="/takeoff-agent" element={<TakeoffAgentPage />} />
                                        <Route path="/elite-development" element={<EliteDevelopmentPage />} />
                                        <Route path="/openclaw" element={<OpenClawPage />} />
                                        <Route path="/ghl-automation" element={<GHLAutomationPage />} />
                                        <Route path="/roofing" element={<RoofingPage />} />
                                        <Route path="/websites" element={<WebsitesPage />} />
                                        <Route path="/blog" element={
                                            <>
                                                <Navigation />
                                                <BlogPage />
                                                <Footer />
                                            </>
                                        } />
                                        <Route path="/blog/:slug" element={<BlogPostPage />} />
                                        <Route path="/offers/esdr" element={
                                            <>
                                                <Navigation />
                                                <EsdrOfferPage />
                                                <Footer />
                                            </>
                                        } />
                                        <Route path="/projects/indeedbot" element={<IndeedBotPage />} />
                                        <Route path="/projects/esdr-living" element={<EsdrLivingPage />} />
                                        <Route path="/projects/scale-with-jaryd" element={<ScaleWithJarydPage />} />
                                        <Route path="/projects/snowblowr" element={<SnowblowrPage />} />
                                        <Route path="/scout" element={
                                            <ProtectedRoute>
                                                <ScoutPage />
                                            </ProtectedRoute>
                                        } />
                                        <Route path="/demo/:slug" element={<DemoPage />} />
                                        <Route path="/offer/esdr/payment" element={<EsdrPaymentPage />} />
                                        <Route path="/offers/esdr/payment" element={<EsdrPaymentPage />} />

                                        {/* Auth Routes */}
                                        <Route path="/login" element={<LoginPage />} />
                                        <Route path="/register" element={<RegisterPage />} />
                                        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                                        <Route path="/sso-callback" element={
                                            <div className="h-screen w-screen flex flex-col items-center justify-center bg-[#020408] relative">
                                                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px]" />
                                                </div>
                                                <div className="relative z-10 flex flex-col items-center gap-12">
                                                    <div className="relative group">
                                                        <div className="absolute -inset-4 bg-purple-600/20 rounded-full blur-2xl animate-pulse" />
                                                        <img src="/logo.png" className="w-20 h-20 relative z-10 brightness-0 invert" alt="Revlo" />
                                                    </div>
                                                    <div className="flex flex-col items-center gap-4 text-center">
                                                        <div className="flex items-center gap-2">
                                                            <Loader2 className="w-4 h-4 animate-spin text-purple-500" />
                                                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Syncing Intelligence Profile</span>
                                                        </div>
                                                        <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">Bridging secure satellite link... Please standby.</p>
                                                    </div>
                                                </div>
                                                <AuthenticateWithRedirectCallback signUpForceRedirectUrl="/revlo-os" signInForceRedirectUrl="/revlo-os" />
                                            </div>
                                        } />

                                        {/* Payments Admin (Custom Auth) */}
                                        <Route path="/admin/payments" element={<AdminPaymentsPage />} />

                                        {/* Admin Routes (Protected) */}
                                        <Route path="/admin" element={
                                            <ProtectedRoute requiredRole="super_admin">
                                                <AdminPage />
                                            </ProtectedRoute>
                                        } />
                                        <Route path="/admin/leads" element={
                                            <ProtectedRoute requiredRole="super_admin">
                                                <LeadsPage />
                                            </ProtectedRoute>
                                        } />
                                        <Route path="/admin/campaigns" element={
                                            <ProtectedRoute requiredRole="super_admin">
                                                <AdminPage />
                                            </ProtectedRoute>
                                        } />
                                        <Route path="/admin/analytics" element={
                                            <ProtectedRoute requiredRole="super_admin">
                                                <AdminPage />
                                            </ProtectedRoute>
                                        } />
                                        <Route path="/admin/settings" element={
                                            <ProtectedRoute requiredRole="super_admin">
                                                <AdminPage />
                                            </ProtectedRoute>
                                        } />

                                        {/* Client Dashboard (Protected) */}
                                        <Route path="/dashboard" element={
                                            <ProtectedRoute>
                                                <DashboardPage />
                                            </ProtectedRoute>
                                        } />

                                        {/* Catch-all 404 Route */}
                                        <Route path="*" element={<NotFoundPage />} />
                                    </Routes>
                                </Suspense>
                            </AnimatePresence>
                            <PartnerAgent />
                        </div>
                    </Router>
                </NotificationProvider>
            </ToastProvider>
        </AuthProvider>
    );
}

export default App;
