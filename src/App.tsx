import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import { ToastProvider } from './features/revlo-os/context/ToastContext';
import { supabase } from './lib/supabase';
import { useAppStore } from './store/appStore';

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

// Components
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';


function App() {
    return (
        <AuthProvider>
            <ToastProvider>
                <NotificationProvider>
                    <Router>
                        <div className="min-h-screen flex flex-col bg-white">
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
                                    <Route path="/offer/esdr/payment" element={<EsdrPaymentPage />} />

                                    {/* Auth Routes */}
                                    <Route path="/login" element={<LoginPage />} />
                                    <Route path="/register" element={<RegisterPage />} />
                                    <Route path="/forgot-password" element={<ForgotPasswordPage />} />

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
                        </div>
                    </Router>
                </NotificationProvider>
            </ToastProvider>
        </AuthProvider>
    );
}

export default App;
