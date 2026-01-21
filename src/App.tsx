import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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

// Admin Pages
import AdminPage from './pages/AdminPage';
import LeadsPage from './pages/LeadsPage';
import DashboardPage from './pages/DashboardPage';

// Components
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Wrapper component to handle auth state initialization
const AuthInitializer = () => {
    const setUser = useAppStore((state) => state.setUser);

    useEffect(() => {
        // Check active session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null);
        });

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        return () => subscription.unsubscribe();
    }, [setUser]);

    return null;
};

function App() {
    return (
        <Router>
            <AuthInitializer />
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
                            <>
                                <RevloOSAppPage />
                            </>
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

                        {/* Auth Routes */}
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />

                        {/* Admin Routes (Protected) */}
                        <Route path="/admin" element={
                            <ProtectedRoute>
                                <AdminPage />
                            </ProtectedRoute>
                        } />
                        <Route path="/admin/leads" element={
                            <ProtectedRoute>
                                <LeadsPage />
                            </ProtectedRoute>
                        } />
                        <Route path="/admin/campaigns" element={
                            <ProtectedRoute>
                                <AdminPage />
                            </ProtectedRoute>
                        } />
                        <Route path="/admin/analytics" element={
                            <ProtectedRoute>
                                <AdminPage />
                            </ProtectedRoute>
                        } />
                        <Route path="/admin/settings" element={
                            <ProtectedRoute>
                                <AdminPage />
                            </ProtectedRoute>
                        } />

                        {/* Client Dashboard (Protected) */}
                        <Route path="/dashboard" element={
                            <ProtectedRoute>
                                <DashboardPage />
                            </ProtectedRoute>
                        } />
                    </Routes>
                </AnimatePresence>
            </div>
        </Router>
    );
}

export default App;
