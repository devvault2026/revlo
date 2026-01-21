import React from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Team from '../components/Team';
import RevloOS from '../components/RevloOS';
import Results from '../components/Results';
import Contact from '../components/Contact';

const HomePage: React.FC = () => {
    return (
        <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Hero />
            <Services />
            <Team />
            <RevloOS />
            <Results />
            <Contact />
        </motion.main>
    );
};

export default HomePage;
