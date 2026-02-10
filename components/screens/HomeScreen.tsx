'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
import { Check, User, MapPin, Smile } from 'lucide-react';

export default function HomeScreen() {
    const isCheckedIn = useAppStore((state) => state.isCheckedIn);
    const checkIn = useAppStore((state) => state.checkIn);
    const groupMembers = useAppStore((state) => state.groupMembers);
    const userLocation = useAppStore((state) => state.userLocation);
    const setUserLocation = useAppStore((state) => state.setUserLocation);
    const setActiveTab = useAppStore((state) => state.setActiveTab);

    useEffect(() => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setUserLocation({
                        lat: 35.6812, // Tokyo Station area approx
                        lng: 139.7671,
                        address: 'Tokyo Innovation Base'
                    });
                },
                (error) => {
                    // Fallback if permission denied or error
                    setUserLocation({
                        lat: 35.6812,
                        lng: 139.7671,
                        address: 'Tokyo Innovation Base'
                    });
                    console.error('Error getting location:', error);
                }
            );
        } else {
            // Fallback if geolocation not supported
            setUserLocation({
                lat: 35.6812,
                lng: 139.7671,
                address: 'Tokyo Innovation Base'
            });
        }
    }, [setUserLocation]);

    const handleCheckIn = () => {
        checkIn();
    };

    return (
        <div className="h-full bg-toss-grey-50 overflow-y-auto hide-scrollbar pb-24 relative">
            {/* Header */}
            <header className="px-6 pt-14 pb-6 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-md z-10 transition-all">
                <div>
                    <motion.h1
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-4xl font-bold text-gray-900 leading-tight"
                    >
                        Sunny Days <span className="text-3xl">☀️</span>
                    </motion.h1>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="flex items-center gap-2 mt-2"
                    >
                        <MapPin size={18} className="text-gray-400" />
                        <p className="text-lg text-gray-500 font-medium">
                            {userLocation ? userLocation.address : 'Locating...'}
                        </p>
                    </motion.div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center overflow-hidden border border-gray-100 p-1">
                        <img src="/knit_logo.png" alt="KNIT Logo" className="w-full h-full object-contain scale-110" />
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border border-gray-200">
                        {/* Avatar */}
                        <span className="text-xl">👤</span>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="px-5 space-y-6">

                {/* Hero / Check-in Card */}
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center relative overflow-hidden">
                    {!isCheckedIn && (
                        <motion.div
                            className="absolute inset-0 bg-blue-50 opacity-50"
                            animate={{ opacity: [0.3, 0.6, 0.3] }}
                            transition={{ duration: 3, repeat: Infinity }}
                        />
                    )}

                    <motion.div
                        className="relative z-10 flex flex-col items-center justify-center"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                    >
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">
                            {isCheckedIn ? "You're all set!" : "How are you today?"}
                        </h2>
                        <p className="text-gray-500 text-xl mb-8">
                            {isCheckedIn ? "Waiting for others to join..." : "Check-in to let your group know."}
                        </p>

                        <motion.button
                            onClick={handleCheckIn}
                            disabled={isCheckedIn}
                            whileTap={{ scale: 0.95 }}
                            whileHover={{ scale: 1.05 }}
                            className={`w-32 h-32 rounded-3xl flex items-center justify-center shadow-lg transition-all duration-500 ${isCheckedIn
                                ? 'bg-green-500 text-white shadow-green-200'
                                : 'bg-toss-blue text-white shadow-blue-200'
                                }`}
                        >
                            {isCheckedIn ? (
                                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                                    <Check size={64} strokeWidth={3} />
                                </motion.div>
                            ) : (
                                <Smile size={64} strokeWidth={2} />
                            )}
                        </motion.button>

                        {!isCheckedIn && (
                            <p className="text-toss-blue text-lg font-semibold mt-6 animate-pulse">
                                Tap to Check-in
                            </p>
                        )}
                    </motion.div>
                </div>

                {/* Group Status */}
                <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 px-1">Group Members</h3>
                    <div className="space-y-4">
                        {groupMembers.map((member, idx) => (
                            <motion.div
                                key={member.id}
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex items-center justify-between"
                            >
                                <div className="flex items-center gap-5">
                                    <div className="relative">
                                        <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center text-3xl">
                                            {idx === 0 ? '👴🏻' : '👵🏻'}
                                        </div>
                                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center">
                                            <div className="w-4 h-4 bg-green-500 rounded-full border border-white" />
                                        </div>
                                    </div>
                                    <div>
                                        <p className="font-bold text-xl text-gray-900">{member.name}</p>
                                        <p className="text-base text-gray-400 font-medium">Online • {member.lastActive}</p>
                                    </div>
                                </div>
                                <button className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
                                    <Check size={24} />
                                </button>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Notification Toast for Call */}
            {isCheckedIn && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1, type: "spring", stiffness: 200, damping: 20 }}
                    className="fixed bottom-24 left-0 right-0 z-20 flex justify-center pointer-events-none"
                >
                    <div className="glass-panel p-5 rounded-[24px] flex items-center justify-between cursor-pointer pointer-events-auto w-[calc(100%-32px)] max-w-sm" onClick={() => setActiveTab('call')}>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white animate-pulse">
                                <span className="text-xl">📞</span>
                            </div>
                            <div>
                                <p className="font-bold text-gray-900">Group Call Active</p>
                                <p className="text-sm text-gray-500">Tap to join conversation</p>
                            </div>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                            <span className="text-gray-400">→</span>
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    );
}
