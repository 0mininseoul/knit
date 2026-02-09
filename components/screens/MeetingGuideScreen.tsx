'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, MessageCircle, ChevronRight } from 'lucide-react';

export default function MeetingGuideScreen() {
    const [topicIndex, setTopicIndex] = useState(0);

    const topics = [
        "Let's talk about your favorite hometown food!",
        "What was your childhood dream?",
        "Do you prefer cats or dogs?",
    ];

    const handleNextTopic = () => {
        setTopicIndex((prev) => (prev + 1) % topics.length);
    };

    return (
        <div className="flex flex-col h-screen bg-gray-100 relative">

            {/* Map Background (Simulated) */}
            <div className="absolute inset-0 bg-blue-50 opacity-50 z-0">
                {/* Simple Map Grid Pattern */}
                <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

                {/* Map Pins */}
                <div className="absolute top-1/3 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
                    <MapPin className="text-red-500 w-8 h-8 drop-shadow-md animate-bounce" />
                    <div className="bg-white px-2 py-1 rounded shadow text-xs font-bold mt-1">Meeting Point</div>
                </div>
            </div>

            {/* Content Overlay */}
            <div className="z-10 flex flex-col justify-end h-full p-6 pb-12 pointer-events-none">

                {/* Header */}
                <div className="absolute top-12 left-6 right-6 flex justify-between items-center pointer-events-auto">
                    <div className="bg-white/90 backdrop-blur rounded-xl p-4 shadow-lg flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-2xl">🤖</div>
                        <div>
                            <p className="text-sm text-gray-500">AI Moderator</p>
                            <p className="font-bold text-xl text-gray-800">Offline Mode</p>
                        </div>
                    </div>
                </div>

                {/* Topic Card */}
                <div className="pointer-events-auto">
                    <AnimatePresence mode='wait'>
                        <motion.div
                            key={topicIndex}
                            initial={{ x: 50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -50, opacity: 0 }}
                            className="bg-white rounded-3xl p-6 shadow-2xl border-2 border-[#2884C1]"
                        >
                            <div className="flex items-center gap-2 mb-3 text-[#2884C1]">
                                <MessageCircle size={24} />
                                <span className="font-bold text-base uppercase tracking-wider">Conversation Starter</span>
                            </div>
                            <h2 className="text-3xl font-bold text-gray-800 leading-tight mb-6">
                                &quot;{topics[topicIndex]}&quot;
                            </h2>

                            <button
                                onClick={handleNextTopic}
                                className="w-full bg-gray-50 py-4 rounded-xl text-xl text-gray-600 font-medium hover:bg-gray-100 active:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                            >
                                Next Topic <ChevronRight size={24} />
                            </button>
                        </motion.div>
                    </AnimatePresence>
                </div>

            </div>
        </div>
    );
}
