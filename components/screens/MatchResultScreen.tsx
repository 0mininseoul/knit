'use client';

import { motion } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
import { User, Users } from 'lucide-react';

export default function MatchResultScreen() {
    const setCurrentScreen = useAppStore((state) => state.setCurrentScreen);
    const groupMembers = useAppStore((state) => state.groupMembers);
    const userProfile = useAppStore((state) => state.userProfile);

    return (
        <div className="flex flex-col items-center justify-between h-screen bg-white p-6 pt-12 pb-8">

            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-center space-y-2"
            >
                <div className="inline-block bg-yellow-100 text-yellow-800 px-4 py-1 rounded-full text-lg font-bold mb-2">
                    ✨ 98% Compatibility
                </div>
                <h1 className="text-3xl font-bold text-gray-900 leading-tight">We found your<br />Knitting Circle!</h1>
            </motion.div>

            {/* Triangle Layout for 3 People */}
            <div className="relative w-full max-w-xs h-80 flex items-center justify-center">
                {/* User (Top) */}
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="absolute top-0 transform -translate-x-1/2 left-1/2 flex flex-col items-center"
                >
                    <div className="w-24 h-24 rounded-full bg-blue-100 border-4 border-white shadow-lg flex items-center justify-center overflow-hidden">
                        <User className="w-12 h-12 text-[#2884C1]" />
                    </div>
                    <span className="mt-2 font-bold text-lg text-gray-800">{userProfile.name}</span>
                </motion.div>

                {/* Member 1 (Bottom Left) */}
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="absolute bottom-10 left-0 flex flex-col items-center"
                >
                    <div className="w-20 h-20 rounded-full bg-orange-100 border-4 border-white shadow-lg flex items-center justify-center overflow-hidden">
                        <span className="text-3xl">👴🏻</span>
                    </div>
                    <span className="mt-2 font-bold text-gray-700">{groupMembers[0].name}</span>
                    <span className="text-sm font-medium text-gray-500">Fishing, Travel</span>
                </motion.div>

                {/* Member 2 (Bottom Right) */}
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.9 }}
                    className="absolute bottom-10 right-0 flex flex-col items-center"
                >
                    <div className="w-20 h-20 rounded-full bg-green-100 border-4 border-white shadow-lg flex items-center justify-center overflow-hidden">
                        <span className="text-3xl">👵🏻</span>
                    </div>
                    <span className="mt-2 font-bold text-gray-700">{groupMembers[1].name}</span>
                    <span className="text-sm font-medium text-gray-500">Cooking, Garden</span>
                </motion.div>

                {/* Connection Lines (SVG) - Animated */}
                <svg className="absolute inset-0 w-full h-full -z-10 pointer-events-none">
                    <motion.path
                        d="M160 80 L60 200"
                        stroke="#E5E7EB"
                        strokeWidth="2"
                        strokeDasharray="10 10"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ delay: 1, duration: 0.5 }}
                    />
                    <motion.path
                        d="M160 80 L260 200"
                        stroke="#E5E7EB"
                        strokeWidth="2"
                        strokeDasharray="10 10"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ delay: 1, duration: 0.5 }}
                    />
                    <motion.path
                        d="M60 200 L260 200"
                        stroke="#E5E7EB"
                        strokeWidth="2"
                        strokeDasharray="10 10"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ delay: 1, duration: 0.5 }}
                    />
                </svg>
            </div>

            <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.5 }}
                onClick={() => setCurrentScreen('home')}
                className="w-full max-w-xs bg-[#2884C1] text-white py-4 rounded-xl text-2xl font-bold shadow-blue-200 shadow-xl active:scale-95 transition-transform flex items-center justify-center gap-2"
            >
                <Users className="w-8 h-8" />
                Start Connecting
            </motion.button>
        </div>
    );
}
