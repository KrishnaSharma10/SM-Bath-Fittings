// src/AnimatedRoutes.jsx
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import Home from './pages/Home';
import About from './pages/About';
import Collection from './pages/Collection';
import Contact from './pages/Contact';
import CollectionGrid from './components/grids/CollectionGrid';

const pageAnimation = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -30 },
    transition: { duration: 0.5 },
};

const AnimatedRoutes = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route
                    path="/"
                    element={
                        <motion.div {...pageAnimation}>
                            <Home />
                        </motion.div>
                    }
                />
                <Route
                    path="/about"
                    element={
                        <motion.div {...pageAnimation}>
                            <About />
                        </motion.div>
                    }
                />
                <Route
                    path="/collection"
                    element={
                        <motion.div {...pageAnimation}>
                            <Collection />
                        </motion.div>
                    }
                />
                <Route
                    path="/contactus"
                    element={
                        <motion.div {...pageAnimation}>
                            <Contact />
                        </motion.div>
                    }
                />
                <Route
                    path="/collection/:title/:categoryId"
                    element={
                        <motion.div {...pageAnimation}>
                            <CollectionGrid />
                        </motion.div>
                    }
                />
            </Routes>
        </AnimatePresence>
    );
};

export default AnimatedRoutes;
