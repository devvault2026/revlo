import React from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import PromoVideo from '../components/PromoVideo';
import Results from '../components/Results';
import Manifesto from '../components/Manifesto';
import Process from '../components/Process';
import RevloOS from '../components/RevloOS';
import Services from '../components/Services';
import Projects from '../components/Projects';
import FounderOperator from '../components/FounderOperator';
import Contact from '../components/Contact';
import OpenClawIntro from '../components/OpenClawIntro';

const HomePage: React.FC = () => {
    return (
        <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Hero />
            <OpenClawIntro />
            <PromoVideo />
            <Results />
            <Manifesto />
            <Process />
            <RevloOS />
            <Services />
            <Projects />
            <FounderOperator />
            <Contact />
        </motion.main>
    );
};

export default HomePage;
