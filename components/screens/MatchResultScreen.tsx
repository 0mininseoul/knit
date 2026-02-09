'use client';

import { motion } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
import { User, Users, MapPin } from 'lucide-react';

export default function MatchResultScreen() {
    const setCurrentScreen = useAppStore((state) => state.setCurrentScreen);
    const groupMembers = useAppStore((state) => state.groupMembers);
    const userProfile = useAppStore((state) => state.userProfile);

    return (
        <div className="flex flex-col h-[100dvh] bg-[#F2F4F6] overflow-hidden relative">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-200/30 rounded-full blur-[80px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-200/30 rounded-full blur-[80px]" />
            </div>

            <div className="flex-1 flex flex-col items-center px-6 pt-6 pb-6 z-10 w-full max-w-md mx-auto justify-between">

                {/* Header Section */}
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-center space-y-3 mt-4"
                >
                    <div className="inline-block bg-blue-50 text-toss-blue px-4 py-1.5 rounded-full text-sm font-bold border border-blue-100/50 shadow-sm">
                        ✨ 98% Compatibility
                    </div>
                    <h1 className="text-[28px] leading-tight font-bold text-gray-900">
                        We found your<br />
                        <span className="text-toss-blue">Knitting Circle!</span>
                    </h1>
                </motion.div>

                {/* Triangle Connections */}
                <div className="relative w-full h-[220px] flex items-center justify-center my-2">
                    {/* Connection Lines */}
                    <svg className="absolute inset-0 w-full h-full -z-10 pointer-events-none overflow-visible">
                        <defs>
                            <linearGradient id="lineSafe" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#E5E8EB" />
                                <stop offset="50%" stopColor="#B0B8C1" />
                                <stop offset="100%" stopColor="#E5E8EB" />
                            </linearGradient>
                        </defs>
                        <motion.path
                            d="M50% 15% L20% 85%"
                            stroke="url(#lineSafe)"
                            strokeWidth="2"
                            strokeDasharray="6 6"
                            fill="none"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                            vectorEffect="non-scaling-stroke"
                        />
                        <motion.path
                            d="M50% 15% L80% 85%"
                            stroke="url(#lineSafe)"
                            strokeWidth="2"
                            strokeDasharray="6 6"
                            fill="none"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                            vectorEffect="non-scaling-stroke"
                        />
                        <motion.path
                            d="M20% 85% L80% 85%"
                            stroke="url(#lineSafe)"
                            strokeWidth="2"
                            strokeDasharray="6 6"
                            fill="none"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                            vectorEffect="non-scaling-stroke"
                        />
                    </svg>

                    {/* Main User (Top) */}
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                        className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center"
                    >
                        <div className="w-[72px] h-[72px] rounded-full bg-white border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.08)] flex items-center justify-center relative p-1">
                            <div className="w-full h-full rounded-full bg-blue-50 flex items-center justify-center overflow-hidden">
                                <User className="w-8 h-8 text-toss-blue" />
                            </div>
                            <div className="absolute -bottom-1 -right-1 bg-toss-blue text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white">
                                ME
                            </div>
                        </div>
                        <span className="mt-2 text-sm font-bold text-gray-800">{userProfile.name}</span>
                    </motion.div>

                    {/* Member 1 (Bottom Left) */}
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                        className="absolute bottom-0 left-[10%] flex flex-col items-center"
                    >
                        <div className="w-[64px] h-[64px] rounded-full bg-white border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.08)] flex items-center justify-center p-1">
                            <div className="w-full h-full rounded-full bg-orange-50 flex items-center justify-center text-2xl">
                                👴🏻
                            </div>
                        </div>
                        <span className="mt-2 text-sm font-bold text-gray-800">{groupMembers[0]?.name || 'Member 1'}</span>
                        <div className="text-[10px] bg-white/80 px-2 py-0.5 rounded-full text-gray-500 font-medium mt-0.5 border border-gray-100">
                            Fishing
                        </div>
                    </motion.div>

                    {/* Member 2 (Bottom Right) */}
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
                        className="absolute bottom-0 right-[10%] flex flex-col items-center"
                    >
                        <div className="w-[64px] h-[64px] rounded-full bg-white border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.08)] flex items-center justify-center p-1">
                            <div className="w-full h-full rounded-full bg-green-50 flex items-center justify-center text-2xl">
                                👵🏻
                            </div>
                        </div>
                        <span className="mt-2 text-sm font-bold text-gray-800">{groupMembers[1]?.name || 'Member 2'}</span>
                        <div className="text-[10px] bg-white/80 px-2 py-0.5 rounded-full text-gray-500 font-medium mt-0.5 border border-gray-100">
                            Cooking
                        </div>
                    </motion.div>
                </div>

                {/* Map Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="w-full bg-white/70 backdrop-blur-xl rounded-[24px] border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden my-2"
                >
                    <div className="p-3.5 px-5 flex items-center gap-3 border-b border-gray-100/50">
                        <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center">
                            <MapPin className="w-4 h-4 text-red-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="text-sm font-bold text-gray-800 truncate">Meeting Point</h3>
                            <p className="text-xs text-gray-500 truncate">Tokyo Innovation Base</p>
                        </div>
                    </div>
                    <div className="h-[100px] w-full bg-gray-100 relative">
                        <iframe
                            width="100%"
                            height="100%"
                            style={{ border: 0, opacity: 0.9 }}
                            loading="lazy"
                            allowFullScreen
                            referrerPolicy="no-referrer-when-downgrade"
                            src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyC7czVqz95lb8o6o6t_77j4AN9ElQ2-RcU&q=Tokyo+Innovation+Base,3+Chome-8-3+Marunouchi,+Chiyoda+City,+Tokyo`}
                        ></iframe>
                    </div>
                </motion.div>

                {/* Action Button */}
                <motion.button
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => setCurrentScreen('home')}
                    className="w-full bg-toss-blue text-white py-4 rounded-[20px] text-l font-bold shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 mt-2 group relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    <Users className="w-5 h-5" />
                    <span className="relative">Start Connecting</span>
                </motion.button>
            </div>
        </div>
    );
}
