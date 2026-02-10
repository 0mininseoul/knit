'use client';

import React from 'react';
import { useAppStore } from '@/store/useAppStore';

export default function FontSizeSlider() {
    const { fontSizeLevel, setFontSizeLevel } = useAppStore();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFontSizeLevel(Number(e.target.value));
    };

    return (
        <div className="w-full">
            <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-500">A</span>
                <span className="text-xl font-bold text-gray-900">A</span>
            </div>
            <input
                type="range"
                min="0"
                max="3"
                step="1"
                value={fontSizeLevel}
                onChange={handleChange}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-toss-blue"
            />
            <div className="flex justify-between mt-1">
                <span className="text-xs text-gray-400">Small</span>
                <span className="text-xs text-gray-400">Normal</span>
                <span className="text-xs text-gray-400">Large</span>
                <span className="text-xs text-gray-400">Extra Large</span>
            </div>
        </div>
    );
}
