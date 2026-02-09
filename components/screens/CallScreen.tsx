'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
import VoiceVisualizer from '@/components/ui/VoiceVisualizer';
import { Mic, MicOff, PhoneOff, Send, MessageCircle } from 'lucide-react';

interface Message {
    id: number;
    sender: string;
    text: string;
    isMe: boolean;
    type: 'user' | 'ai';
}

export default function CallScreen() {
    const setCurrentScreen = useAppStore((state) => state.setCurrentScreen);
    const groupMembers = useAppStore((state) => state.groupMembers);
    // const userProfile = useAppStore((state) => state.userProfile); // Unused

    const [isMuted, setIsMuted] = useState(false);
    const [showChat, setShowChat] = useState(true);
    const [activeSpeaker, setActiveSpeaker] = useState<string | null>(null); // 'user', '1', '2'
    const [messages, setMessages] = useState<Message[]>([
        { id: 1, sender: 'AI Moderator', text: 'Welcome everyone! How is the weather today?', isMe: false, type: 'ai' },
    ]);
    const [inputText, setInputText] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Simulate Conversation Flow
    useEffect(() => {
        const sequence = [
            { t: 1000, speaker: '1', text: 'Hello! It is sunny here in Tokyo.' },
            { t: 4000, speaker: '2', text: 'Hi Tanaka-san! It is cloudy in Osaka.' },
            { t: 7000, speaker: 'ai', text: 'That sounds nice. Have anyone visited a park lately?' },
        ];

        sequence.forEach(({ t, speaker, text }) => {
            setTimeout(() => {
                // Set Active Speaker for Visualizer
                setActiveSpeaker(speaker === 'ai' ? null : speaker);

                // Add Message to Chat
                const senderName = speaker === 'ai' ? 'AI Moderator' : (speaker === '1' ? groupMembers[0].name : groupMembers[1].name);
                setMessages((prev) => [
                    ...prev,
                    { id: Date.now(), sender: senderName, text, isMe: false, type: speaker === 'ai' ? 'ai' : 'user' }
                ]);

                // Reset visualizer after 3s
                setTimeout(() => setActiveSpeaker(null), 3000);
            }, t);
        });

        // Auto-end call for demo purposes after 20s? (Optional, maybe manual)
    }, [groupMembers]);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputText.trim()) return;

        setMessages((prev) => [
            ...prev,
            { id: Date.now(), sender: 'Me', text: inputText, isMe: true, type: 'user' }
        ]);
        setInputText('');
        setActiveSpeaker('user');
        setTimeout(() => setActiveSpeaker(null), 2000);
    };

    const handleEndCall = () => {
        setCurrentScreen('meeting');
    };

    return (
        <div className="flex flex-col h-screen bg-gray-900 overflow-hidden relative">

            {/* Top: 3-Way Call Grid (60% height if chat Open) */}
            <motion.div
                layout
                className={`flex-1 flex flex-col p-2 gap-2 transition-all duration-300 ${showChat ? 'h-3/5' : 'h-full'}`}
            >
                {/* User (Me) */}
                <div className={`flex-1 bg-gray-800 rounded-2xl relative overflow-hidden border-2 ${activeSpeaker === 'user' ? 'border-green-500' : 'border-transparent'}`}>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center text-4xl">👤</div>
                    </div>
                    <div className="absolute bottom-2 left-3 bg-black/50 px-2 py-1 rounded text-white text-xs flex items-center gap-2">
                        Me
                        {activeSpeaker === 'user' && <VoiceVisualizer isActive={true} color="#4CAF50" />}
                    </div>
                </div>

                {/* Others (Split Row) */}
                <div className="flex-1 flex gap-2 h-1/2">
                    {/* Member 1 */}
                    <div className={`flex-1 bg-gray-800 rounded-2xl relative overflow-hidden border-2 ${activeSpeaker === '1' ? 'border-[#2884C1]' : 'border-transparent'}`}>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center text-3xl">👴🏻</div>
                        </div>
                        <div className="absolute bottom-2 left-3 bg-black/50 px-2 py-1 rounded text-white text-xs flex items-center gap-2">
                            {groupMembers[0].name}
                            {activeSpeaker === '1' && <VoiceVisualizer isActive={true} color="#2884C1" />}
                        </div>
                    </div>

                    {/* Member 2 */}
                    <div className={`flex-1 bg-gray-800 rounded-2xl relative overflow-hidden border-2 ${activeSpeaker === '2' ? 'border-[#2884C1]' : 'border-transparent'}`}>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-3xl">👵🏻</div>
                        </div>
                        <div className="absolute bottom-2 left-3 bg-black/50 px-2 py-1 rounded text-white text-xs flex items-center gap-2">
                            {groupMembers[1].name}
                            {activeSpeaker === '2' && <VoiceVisualizer isActive={true} color="#2884C1" />}
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Control Bar (Floating) */}
            <div className="absolute top-1/2 left-0 right-0 flex justify-center gap-4 z-20 pointer-events-none transform -translate-y-1/2">
                <div className="bg-black/60 backdrop-blur-md rounded-full px-4 py-2 flex gap-4 pointer-events-auto">
                    <button
                        onClick={() => setIsMuted(!isMuted)}
                        className={`p-3 rounded-full ${isMuted ? 'bg-white text-black' : 'bg-gray-700 text-white'}`}
                    >
                        {isMuted ? <MicOff size={20} /> : <Mic size={20} />}
                    </button>
                    <button
                        onClick={handleEndCall}
                        className="p-3 rounded-full bg-red-500 text-white"
                    >
                        <PhoneOff size={20} />
                    </button>
                    <button
                        onClick={() => setShowChat(!showChat)}
                        className={`p-3 rounded-full ${showChat ? 'bg-[#2884C1] text-white' : 'bg-gray-700 text-white'}`}
                    >
                        <MessageCircle size={20} />
                    </button>
                </div>
            </div>

            {/* Bottom: Chat Area */}
            <AnimatePresence>
                {showChat && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: '40%', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="bg-white rounded-t-3xl shadow-[0_-5px_20px_rgba(0,0,0,0.1)] flex flex-col z-10"
                    >
                        {/* Chat Header */}
                        <div className="p-4 border-b flex justify-between items-center bg-gray-50 rounded-t-3xl">
                            <span className="text-lg font-bold text-gray-700">Group Chat</span>
                            <span className="text-sm text-green-600 flex items-center gap-1">
                                <span className="w-3 h-3 rounded-full bg-green-500" /> Live
                            </span>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
                            {messages.map((msg) => (
                                <div key={msg.id} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[85%] p-4 rounded-2xl text-lg ${msg.type === 'ai'
                                        ? 'bg-blue-50 border border-blue-100 text-[#2884C1]'
                                        : (msg.isMe ? 'bg-[#2884C1] text-white' : 'bg-white text-gray-800 shadow-sm')
                                        }`}>
                                        {!msg.isMe && <p className="text-xs opacity-70 mb-1">{msg.sender}</p>}
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <form onSubmit={handleSendMessage} className="p-3 bg-white border-t flex gap-2">
                            <input
                                type="text"
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                placeholder="Say something..."
                                className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2884C1]"
                            />
                            <button type="submit" className="p-2 bg-[#2884C1] rounded-full text-white">
                                <Send size={18} />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
}
