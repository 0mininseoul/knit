'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
import { Check, User } from 'lucide-react';

export default function HomeScreen() {
    const setCurrentScreen = useAppStore((state) => state.setCurrentScreen);
    const isCheckedIn = useAppStore((state) => state.isCheckedIn);
    const checkIn = useAppStore((state) => state.checkIn);
    const groupMembers = useAppStore((state) => state.groupMembers);
    const userLocation = useAppStore((state) => state.userLocation);
    const setUserLocation = useAppStore((state) => state.setUserLocation);

    useEffect(() => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    // For demo simplicity, we just use lat/lng. 
                    // In a real app, we'd use a geocoding API to get the address.
                    // Here we'll just mock a simplified address based on coordinates or random.
                    const { latitude, longitude } = position.coords;
                    setUserLocation({
                        lat: latitude,
                        lng: longitude,
                        address: 'Seoul, Gangnam-gu' // Mock address for MVP
                    });
                },
                (error) => {
                    console.error('Error getting location:', error);
                }
            );
        }
    }, [setUserLocation]);

    const handleCheckIn = () => {
        checkIn();
        // Simulate incoming call after 3 seconds of checking in
        setTimeout(() => {
            setCurrentScreen('call');
        }, 3000);
    };

    return (
        <div className="flex flex-col h-screen bg-gray-50 relative overflow-hidden">
            {/* Header */}
            <header className="bg-white p-4 pt-12 shadow-sm flex items-center justify-between z-10">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Sunny Days ☀️</h1>
                    <p className="text-sm text-gray-500">
                        {userLocation ? `📍 ${userLocation.address}` : 'Finding location...'}
                    </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <User className="text-[#2884C1] w-8 h-8" />
                </div>
            </header>

            {/* Main Content */}
            <div className="flex-1 flex flex-col items-center justify-center space-y-8 p-6">

                {/* Check-in Button (Hero) */}
                <div className="relative">
                    {!isCheckedIn && (
                        <motion.div
                            className="absolute inset-0 bg-blue-300 rounded-full opacity-30"
                            animate={{ scale: [1, 1.5, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                    )}

                    <motion.button
                        onClick={handleCheckIn}
                        disabled={isCheckedIn}
                        whileTap={{ scale: 0.95 }}
                        className={`relative w-48 h-48 rounded-full flex flex-col items-center justify-center shadow-2xl transition-all ${isCheckedIn ? 'bg-green-500' : 'bg-[#2884C1]'
                            }`}
                    >
                        {isCheckedIn ? (
                            <>
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                >
                                    <Check className="w-20 h-20 text-white mb-2" />
                                    <span className="text-white font-bold text-2xl">Checked-in!</span>
                                </motion.div>
                                {/* Confetti Effect would go here */}
                            </>
                        ) : (
                            <>
                                <span className="text-5xl mb-3">👋</span>
                                <span className="text-white font-bold text-2xl">I&apos;m Good!</span>
                                <span className="text-blue-100 text-base mt-2">Tap to check-in</span>
                            </>
                        )}
                    </motion.button>
                </div>

                {/* Status List */}
                <div className="w-full max-w-xs bg-white rounded-2xl p-4 shadow-sm space-y-3">
                    <h3 className="text-base font-semibold text-gray-500 mb-2">Group Status</h3>
                    {groupMembers.map((member, idx) => (
                        <div key={member.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-2xl">
                                    {idx === 0 ? '👴🏻' : '👵🏻'}
                                </div>
                                <div>
                                    <p className="font-bold text-lg text-gray-800">{member.name}</p>
                                    <p className="text-sm text-green-600 flex items-center gap-1">
                                        <span className="w-2 h-2 rounded-full bg-green-500" />
                                        Online
                                    </p>
                                </div>
                            </div>
                            <div className="text-right">
                                <span className="text-sm text-gray-400 block">{member.lastActive}</span>
                                <Check className="w-5 h-5 text-green-500 ml-auto" />
                            </div>
                        </div>
                    ))}
                </div>

            </div>

            {/* Toast Notification (Simulated Incoming Call) */}
            {isCheckedIn && (
                <motion.div
                    initial={{ y: 100 }}
                    animate={{ y: 0 }}
                    transition={{ delay: 2.5 }}
                    className="absolute bottom-6 left-6 right-6 bg-[#2884C1] text-white p-5 rounded-2xl shadow-2xl flex items-center justify-between z-50"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center animate-pulse">
                            <span className="text-2xl">📞</span>
                        </div>
                        <div>
                            <p className="font-bold text-xl">Group Call Started</p>
                            <p className="text-sm text-blue-100">Connecting...</p>
                        </div>
                    </div>
                </motion.div>
            )}

        </div>
    );
}
