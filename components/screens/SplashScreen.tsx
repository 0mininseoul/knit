'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';

export default function SplashScreen() {
    const setCurrentScreen = useAppStore((state) => state.setCurrentScreen);

    useEffect(() => {
        const timer = setTimeout(() => {
            setCurrentScreen('onboarding');
        }, 3000); // 3 seconds delay

        return () => clearTimeout(timer);
    }, [setCurrentScreen]);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-white text-[#2884C1]">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="text-center"
            >
                {/* Actual Logo - Increased size for better visibility */}
                <div className="w-56 h-56 mx-auto mb-4 flex items-center justify-center">
                    <img
                        src="/knit_logo.png"
                        alt="KNIT Logo"
                        className="w-full h-full object-contain scale-125"
                    />
                </div>

                <h1 className="text-5xl font-bold mb-2">KNIT</h1>
                <p className="text-xl text-gray-500">Connecting knitted hearts</p>
            </motion.div>
        </div>
    );
}
