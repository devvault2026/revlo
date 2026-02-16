import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ClerkProvider, AuthenticateWithRedirectCallback } from '@clerk/clerk-react';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import { ToastProvider } from './features/revlo-os/context/ToastContext';
import { supabase } from './lib/supabase';
import { useAppStore } from './store/appStore';
import { Loader2 } from 'lucide-react';

// Public Pages
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import TeamPage from './pages/TeamPage';
import RevloOSAppPage from './pages/RevloOSAppPage';
import ResultsPage from './pages/ResultsPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import NotFoundPage from './pages/NotFoundPage';

// Admin Pages
import AdminPage from './pages/AdminPage';
import LeadsPage from './pages/LeadsPage';
import DashboardPage from './pages/DashboardPage';
import EsdrOfferPage from './pages/EsdrOfferPage';
import EsdrPaymentPage from './pages/EsdrPaymentPage';
import AdminPaymentsPage from './pages/AdminPaymentsPage';
import IndeedBotPage from './pages/projects/IndeedBotPage';
import ScoutPage from './pages/ScoutPage';
import TakeoffAgentPage from './pages/TakeoffAgentPage';

// Components
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import PartnerAgent from './components/PartnerAgent';
import ScrollToTop from './components/ScrollToTop';


function App() {
    return (
        <AuthProvider>
            <ToastProvider>
                <NotificationProvider>
                    <Router>
                        <ScrollToTop />
                        <div className="min-h-screen flex flex-col bg-[#020408]">
                            <AnimatePresence mode="wait">
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
                                    <Route path="/offer/esdr" element={
                                        <>
                                            <Navigation />
                                            <EsdrOfferPage />
                                            <Footer />
                                        </>
                                    } />
                                    <Route path="/takeoff-agent" element={<TakeoffAgentPage />} />
                                    <Route path="/offers/esdr" element={
                                        <>
                                            <Navigation />
                                            <EsdrOfferPage />
                                            <Footer />
                                        </>
                                    } />
                                    <Route path="/projects/indeedbot" element={<IndeedBotPage />} />
                                    <Route path="/scout" element={
                                        <ProtectedRoute>
                                            <ScoutPage />
                                        </ProtectedRoute>
                                    } />
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
