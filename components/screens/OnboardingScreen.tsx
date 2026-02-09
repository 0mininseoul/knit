'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
import VoiceVisualizer from '@/components/ui/VoiceVisualizer';
import { Mic, CheckCircle2 } from 'lucide-react';

export default function OnboardingScreen() {
    const setCurrentScreen = useAppStore((state) => state.setCurrentScreen);
    const updateUserProfile = useAppStore((state) => state.updateUserProfile);

    const [step, setStep] = useState(0); // 0: Greeting, 1: Listening, 2: Processing, 3: Completed
    const [transcript, setTranscript] = useState('');

    // Fake Scenario Script
    useEffect(() => {
        let timeout: NodeJS.Timeout;

        if (step === 0) {
            // Step 0: AI Speaking (Simulated delay)
            timeout = setTimeout(() => {
                setStep(1); // Switch to listening
            }, 3000);
        } else if (step === 1) {
            // Step 1: User Speaking (Simulating input)
            timeout = setTimeout(() => {
                setTranscript("I enjoy gardening and cooking. I'm 72 years old.");
                setStep(2); // Switch to processing
            }, 3000);
        } else if (step === 2) {
            // Step 2: Processing & Profile Update
            timeout = setTimeout(() => {
                updateUserProfile({
                    name: 'Tanaka',
                    age: 72,
                    interests: ['Gardening', 'Cooking'],
                });
                setStep(3); // Completed
            }, 2000);
        } else if (step === 3) {
            // Step 3: Transition to next screen
            timeout = setTimeout(() => {
                setCurrentScreen('analysis');
            }, 2000);
        }

        return () => clearTimeout(timeout);
    }, [step, setCurrentScreen, updateUserProfile]);

    return (
        <div className="flex flex-col items-center justify-between h-screen bg-white p-6 relative overflow-hidden">
            {/* Top Graphic */}
            <div className="w-full flex justify-center mt-12">
                <div className="w-40 h-40 rounded-full bg-blue-50 flex items-center justify-center border-4 border-[#2884C1]/10 p-2 overflow-hidden">
                    <img src="/logo.png" alt="KNIT Logo" className="w-full h-full object-contain scale-125" />
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col items-center justify-center w-full max-w-xs text-center space-y-8">

                {/* State: AI Speaking */}
                {step === 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="space-y-6"
                    >
                        <h2 className="text-3xl font-bold text-[#2884C1]">AI Assistant</h2>
                        <p className="text-2xl text-gray-700 leading-relaxed">
                            &quot;Hello! I&apos;m here to help you find friends. Tell me what you enjoy doing?&quot;
                        </p>
                        <VoiceVisualizer isActive={true} color="#2884C1" />
                    </motion.div>
                )}

                {/* State: User Speaking */}
                {step === 1 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-4"
                    >
                        <h2 className="text-3xl font-bold text-green-600">Listening...</h2>
                        <div className="p-4 bg-green-50 rounded-full inline-block">
                            <Mic className="w-10 h-10 text-green-600" />
                        </div>
                        <VoiceVisualizer isActive={true} color="#4CAF50" />
                    </motion.div>
                )}

                {/* State: Processing */}
                {step === 2 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-4"
                    >
                        <h2 className="text-3xl font-bold text-gray-500">Creating Profile...</h2>
                        <p className="text-2xl font-medium text-gray-800">&quot;{transcript}&quot;</p>
                        <div className="animate-spin rounded-full h-10 w-10 border-b-4 border-[#2884C1] mx-auto" />
                    </motion.div>
                )}

                {/* State: Completed */}
                {step === 3 && (
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="space-y-4"
                    >
                        <CheckCircle2 className="w-24 h-24 text-green-500 mx-auto" />
                        <h2 className="text-4xl font-bold text-gray-800">Profile Ready!</h2>
                    </motion.div>
                )}
            </div>

            {/* Progress Indicator */}
            <div className="w-full mb-8">
                <div className="h-1 bg-gray-200 rounded-full w-full">
                    <motion.div
                        className="h-full bg-[#2884C1] rounded-full"
                        initial={{ width: '0%' }}
                        animate={{ width: `${(step + 1) * 25}%` }}
                        transition={{ duration: 0.5 }}
                    />
                </div>
            </div>
        </div>
    );
}
