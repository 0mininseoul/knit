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
                {/* Placeholder for Logo */}
                <div className="w-32 h-32 bg-[#2884C1] rounded-full mx-auto mb-6 flex items-center justify-center">
                    <span className="text-white text-5xl font-bold">K</span>
                </div>

                <h1 className="text-5xl font-bold mb-2">KNIT</h1>
                <p className="text-xl text-gray-500">Connecting knitted hearts</p>
            </motion.div>
        </div>
    );
}
