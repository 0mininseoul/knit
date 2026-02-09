'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, MessageCircle, ChevronRight, Users } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';

export default function MeetingGuideScreen() {
    const [topicIndex, setTopicIndex] = useState(0);
    const setActiveTab = useAppStore((state) => state.setActiveTab);
    const setCurrentScreen = useAppStore((state) => state.setCurrentScreen);

    const topics = [
        "Let's talk about your favorite hometown food!",
        "What was your childhood dream?",
        "Do you prefer cats or dogs?",
    ];

    const handleNextTopic = () => {
        setTopicIndex((prev) => (prev + 1) % topics.length);
    };

    const handleBackToHome = () => {
        setCurrentScreen('home');
        setActiveTab('home');
    };

    return (
        <div className="flex flex-col h-screen bg-toss-grey-50 relative overflow-hidden">
            {/* Header */}
            <div className="px-6 pt-14 pb-4 bg-white/80 backdrop-blur-xl z-20 flex justify-between items-center sticky top-0">
                <h1 className="text-2xl font-bold text-gray-900">Meeting Guide</h1>
                <button
                    onClick={handleBackToHome}
                    className="text-base text-gray-500 font-medium px-4 py-2 bg-gray-100 rounded-full"
                >
                    Close
                </button>
            </div>

            {/* Map Background (Simulated) */}
            <div className="absolute inset-0 z-0 opacity-40 grayscale-[0.5]">
                <div className="w-full h-full bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/Map_of_Gangnam-gu%2C_Seoul.svg')] bg-cover bg-center" />
                <div className="absolute inset-0 bg-gradient-to-b from-white via-white/50 to-transparent" />
            </div>

            {/* Content Overlay */}
            <div className="z-10 flex-1 flex flex-col justify-end p-5 pb-10 space-y-4">

                {/* Status Card */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="bg-white rounded-[24px] p-5 shadow-lg border border-gray-100 flex items-center justify-between"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-2xl border border-green-100">
                            📍
                        </div>
                        <div>
                            <p className="font-bold text-gray-900 text-xl">You've Arrived!</p>
                            <p className="text-base text-gray-500">Gangnam Station Exit 10</p>
                        </div>
                    </div>
                    <div className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-base font-bold">
                        Online
                    </div>
                </motion.div>

                {/* Topic Card */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white rounded-[32px] p-6 shadow-2xl border border-gray-100"
                >
                    <div className="flex items-center gap-2 mb-4">
                        <div className="p-2 bg-blue-50 rounded-xl text-toss-blue">
                            <MessageCircle size={24} />
                        </div>
                        <span className="font-bold text-base text-toss-blue uppercase tracking-wide">Conversation Starter</span>
                    </div>

                    <AnimatePresence mode='wait'>
                        <motion.h2
                            key={topicIndex}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="text-4xl font-bold text-gray-900 leading-tight mb-8 min-h-[5rem]"
                        >
                            &quot;{topics[topicIndex]}&quot;
                        </motion.h2>
                    </AnimatePresence>

                    <button
                        onClick={handleNextTopic}
                        className="w-full bg-toss-grey-100 py-5 rounded-2xl text-2xl text-gray-700 font-semibold hover:bg-gray-200 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                    >
                        Next Topic <ChevronRight size={24} />
                    </button>
                </motion.div>

                {/* Members */}
                <div className="flex justify-center -space-x-4 pt-2">
                    {[0, 1, 2].map((i) => (
                        <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-gray-200 flex items-center justify-center text-xl shadow-sm z-10" style={{ zIndex: 10 - i }}>
                            {i === 0 ? '👤' : (i === 1 ? '👴🏻' : '👵🏻')}
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}
