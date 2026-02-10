'use client';

import { useEffect } from 'react';
import { useAppStore } from '@/store/useAppStore';

export default function FontSizeManager() {
    const { fontSizeLevel } = useAppStore();

    useEffect(() => {
        const fontSizes = [
            '14px', // Level 0: Small
            '16px', // Level 1: Normal (Default)
            '18px', // Level 2: Large
            '20px', // Level 3: Extra Large
        ];

        document.documentElement.style.fontSize = fontSizes[fontSizeLevel] || '16px';
    }, [fontSizeLevel]);

    return null;
}
