'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';

export default function AnalysisScreen() {
    const setCurrentScreen = useAppStore((state) => state.setCurrentScreen);
    const [loadingText, setLoadingText] = useState('Analyzing your interests...');

    useEffect(() => {
        // Sequence of loading texts
        const timer1 = setTimeout(() => setLoadingText('Finding best matches nearby...'), 1500);
        const timer2 = setTimeout(() => setLoadingText('Checking compatibility...'), 3000);
        const timer3 = setTimeout(() => setCurrentScreen('match'), 4500);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
        };
    }, [setCurrentScreen]);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-slate-50 text-[#2884C1] p-8 text-center">
            <div className="relative w-32 h-32 mb-8">
                {/* Orbiting Dots Animation */}
                {[0, 1, 2].map((i) => (
                    <motion.div
                        key={i}
                        className="absolute top-0 left-0 w-full h-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear', delay: i * 0.3 }}
                    >
                        <div className="w-4 h-4 bg-[#2884C1] rounded-full mx-auto" />
                    </motion.div>
                ))}
                {/* Center Pulse */}
                <motion.div
                    className="absolute inset-0 m-auto w-16 h-16 bg-blue-100 rounded-full"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                />
            </div>

            <motion.h2
                key={loadingText}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-4xl font-semibold text-gray-700 leading-relaxed"
            >
                {loadingText}
            </motion.h2>
        </div>
    );
}
