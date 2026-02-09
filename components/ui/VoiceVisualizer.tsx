'use client';

import { motion } from 'framer-motion';

interface VoiceVisualizerProps {
    isActive: boolean;
    color?: string; // Hex color
}

export default function VoiceVisualizer({ isActive, color = '#2884C1' }: VoiceVisualizerProps) {
    // 5 bars for the visualizer
    const bars = [1, 2, 3, 4, 5];

    return (
        <div className="flex items-center justify-center gap-1 h-12">
            {bars.map((bar) => (
                <motion.div
                    key={bar}
                    className="w-2 rounded-full"
                    style={{ backgroundColor: color }}
                    animate={
                        isActive
                            ? {
                                height: [10, 32, 10],
                                transition: {
                                    duration: 0.8,
                                    repeat: Infinity,
                                    repeatType: 'reverse',
                                    delay: bar * 0.1,
                                },
                            }
                            : { height: 4 }
                    }
                />
            ))}
        </div>
    );
}
