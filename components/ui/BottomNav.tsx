'use client';

import React from 'react';
import { useAppStore } from '@/store/useAppStore';
import { Home, Phone, Settings } from 'lucide-react';
import { motion } from 'framer-motion';

export default function BottomNav() {
    const { activeTab, setActiveTab } = useAppStore();

    const tabs = [
        { id: 'home', label: 'Home', icon: Home },
        { id: 'call', label: 'Call', icon: Phone },
        { id: 'settings', label: 'Settings', icon: Settings },
    ] as const;

    return (
        <div className="absolute bottom-0 w-full bg-white/80 backdrop-blur-xl border-t border-gray-100 pb-safe pt-2 px-6 safe-area-pb z-50">
            <div className="flex justify-between items-center h-16">
                {tabs.map((tab) => {
                    const isActive = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className="flex flex-col items-center justify-center w-full space-y-1 relative"
                        >
                            <div className={`relative p-1 transition-all duration-300 ${isActive ? 'text-toss-blue' : 'text-gray-400'}`}>
                                <tab.icon size={26} strokeWidth={isActive ? 2.5 : 2} />
                                {isActive && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute -top-2 right-0 w-1.5 h-1.5 bg-red-500 rounded-full"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                    />
                                )}
                            </div>
                            <span className={`text-[11px] font-medium transition-colors duration-300 ${isActive ? 'text-toss-blue' : 'text-gray-400'}`}>
                                {tab.label}
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
