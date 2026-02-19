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
import { Helmet } from 'react-helmet-async';

const HomePage: React.FC = () => {
    return (
        <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Helmet>
                <title>REVLO | ELITE AI DEVELOPMENT LAB: 12X SPEED, 100% OWNERSHIP</title>
                <meta name="description" content="Deploy the unimaginable. Revlo builds the autonomous infrastructure and neural systems that help brands acquire attention and scale without human friction." />

                {/* Open Graph / Facebook */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://www.wearerevlo.com/" />
                <meta property="og:title" content="REVLO | ELITE AI DEVELOPMENT LAB: 12X SPEED, 100% OWNERSHIP" />
                <meta property="og:description" content="Deploy the unimaginable. Revlo builds the autonomous infrastructure and neural systems that help brands acquire attention and scale without human friction." />
                <meta property="og:image" content="https://res.cloudinary.com/dpfapm0tl/image/upload/v1771435259/ChatGPT_Image_Feb_18_2026_12_20_07_PM_xujfpp.png" />

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="REVLO | ELITE AI DEVELOPMENT LAB: 12X SPEED, 100% OWNERSHIP" />
                <meta name="twitter:description" content="Deploy the unimaginable. Revlo builds the autonomous infrastructure and neural systems that help brands acquire attention and scale without human friction." />
                <meta name="twitter:image" content="https://res.cloudinary.com/dpfapm0tl/image/upload/v1771435259/ChatGPT_Image_Feb_18_2026_12_20_07_PM_xujfpp.png" />
            </Helmet>
            <Hero />
            <OpenClawIntro />
            <Services />
            <RevloOS />
            <Results />
            <Manifesto />
            <PromoVideo />
            <Process />
            <Projects />
            <FounderOperator />
            <Contact />
        </motion.main>
    );
};

export default HomePage;
