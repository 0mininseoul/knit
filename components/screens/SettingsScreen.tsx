'use client';

import React from 'react';
import { useAppStore } from '@/store/useAppStore';
import { ChevronRight, Bell, Lock, HelpCircle, LogOut } from 'lucide-react';

export default function SettingsScreen() {
    const { userProfile } = useAppStore();

    const settingsItems = [
        { icon: Bell, label: 'Notifications', value: 'On' },
        { icon: Lock, label: 'Privacy & Security' },
        { icon: HelpCircle, label: 'Help & Support' },
    ];

    return (
        <div className="h-full bg-toss-grey-50 pt-16 pb-24 overflow-y-auto hide-scrollbar">
            <div className="px-5 mb-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-6">Settings</h1>

                {/* Profile Card */}
                <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 mb-6 flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden">
                        {/* Avatar placeholder */}
                        <div className="w-full h-full bg-gradient-to-tr from-blue-100 to-purple-100" />
                    </div>
                    <div className="flex-1">
                        <h2 className="text-lg font-bold text-gray-900">{userProfile.name}</h2>
                        <p className="text-sm text-gray-500">Edit Profile</p>
                    </div>
                    <ChevronRight className="text-gray-300" />
                </div>

                {/* Settings List */}
                <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100">
                    {settingsItems.map((item, index) => (
                        <div
                            key={index}
                            className={`flex items-center justify-between p-5 hover:bg-gray-50 active:bg-gray-100 transition-colors cursor-pointer ${index !== settingsItems.length - 1 ? 'border-b border-gray-50' : ''}`}
                        >
                            <div className="flex items-center space-x-3">
                                <item.icon className="text-gray-600" size={22} />
                                <span className="text-base font-medium text-gray-800">{item.label}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                {item.value && <span className="text-toss-blue font-medium text-sm">{item.value}</span>}
                                <ChevronRight className="text-gray-300" size={20} />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Logout Button */}
                <button className="w-full mt-6 bg-white rounded-2xl p-4 text-red-500 font-semibold text-center hover:bg-red-50 transition-colors shadow-sm border border-gray-100">
                    Log Out
                </button>

                <p className="text-center text-gray-400 text-xs mt-8">Version 1.0.0</p>
            </div>
        </div>
    );
}
