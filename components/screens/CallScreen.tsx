'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
import VoiceVisualizer from '@/components/ui/VoiceVisualizer';
import { Mic, MicOff, PhoneOff, Send, MessageCircle, MoreHorizontal } from 'lucide-react';

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
    const setActiveTab = useAppStore((state) => state.setActiveTab);

    const [isMuted, setIsMuted] = useState(false);
    const [showChat, setShowChat] = useState(false); // Default hidden for cleaner look
    const [activeSpeaker, setActiveSpeaker] = useState<string | null>(null);
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
    }, [messages, showChat]);

    // Simulate Conversation Flow
    useEffect(() => {
        const sequence = [
            { t: 1000, speaker: '1', text: 'Hello! It is sunny here in Tokyo.' },
            { t: 4000, speaker: '2', text: 'Hi Tanaka-san! It is cloudy in Osaka.' },
            { t: 7000, speaker: 'ai', text: 'That sounds nice. Have anyone visited a park lately?' },
        ];

        sequence.forEach(({ t, speaker, text }) => {
            setTimeout(() => {
                setActiveSpeaker(speaker === 'ai' ? null : speaker);
                const senderName = speaker === 'ai' ? 'AI Moderator' : (speaker === '1' ? groupMembers[0].name : groupMembers[1].name);
                setMessages((prev) => [
                    ...prev,
                    { id: Date.now(), sender: senderName, text, isMe: false, type: speaker === 'ai' ? 'ai' : 'user' }
                ]);
                setTimeout(() => setActiveSpeaker(null), 3000);
            }, t);
        });
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
        // Just go back to home tab or show meeting guide?
        // User requested "Navigation bar to enter". So end call might just leave the call view.
        // Let's make it go to 'meeting' guide if that was the "End" flow, or just back to Home tab.
        // But the original code went to 'meeting'. Let's keep that logic for "Ending" the session permanently.
        // Or maybe just switch tab to 'home'.
        // Let's ask: "After checking greeting, immediately group call NO."
        // So manual entry.
        // I'll assume "End Call" means leaving the group for now, maybe back to home or meeting end screen.
        setCurrentScreen('meeting');
    };

    return (
        <div className="h-full bg-toss-grey-50 flex flex-col pt-4 pb-20 px-4 overflow-hidden relative">
            {/* Header */}
            <div className="flex justify-between items-center mb-4 px-2">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Group Call</h2>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-sm text-toss-blue font-medium">Live • 03:12</span>
                    </div>
                </div>
                <button className="p-2 bg-white rounded-full text-gray-400 shadow-sm">
                    <MoreHorizontal size={24} />
                </button>
            </div>

            {/* Main Call Grid */}
            <motion.div
                layout
                className={`flex-1 grid grid-cols-2 grid-rows-2 gap-3 mb-20 transition-all duration-500 ${showChat ? 'h-1/2' : 'h-full'}`}
            >
                {/* Me */}
                <motion.div layout className={`bg-white rounded-[24px] shadow-sm relative overflow-hidden border transition-colors duration-300 col-span-2 row-span-1 ${activeSpeaker === 'user' ? 'border-toss-blue ring-2 ring-toss-blue/20' : 'border-gray-100'}`}>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center text-4xl shadow-inner mb-2">👤</div>
                        <p className="text-gray-900 font-semibold">Me</p>
                    </div>
                    {activeSpeaker === 'user' && (
                        <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                            <VoiceVisualizer isActive={true} color="#0064FF" />
                        </div>
                    )}
                </motion.div>

                {/* Member 1 */}
                <motion.div layout className={`bg-white rounded-[24px] shadow-sm relative overflow-hidden border transition-colors duration-300 ${activeSpeaker === '1' ? 'border-toss-blue ring-2 ring-toss-blue/20' : 'border-gray-100'}`}>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-orange-50 flex items-center justify-center text-3xl shadow-inner mb-2">👴🏻</div>
                        <p className="text-gray-700 font-medium text-sm">{groupMembers[0].name}</p>
                    </div>
                    {activeSpeaker === '1' && (
                        <div className="absolute bottom-3 left-0 right-0 flex justify-center scale-75">
                            <VoiceVisualizer isActive={true} color="#0064FF" />
                        </div>
                    )}
                </motion.div>

                {/* Member 2 */}
                <motion.div layout className={`bg-white rounded-[24px] shadow-sm relative overflow-hidden border transition-colors duration-300 ${activeSpeaker === '2' ? 'border-toss-blue ring-2 ring-toss-blue/20' : 'border-gray-100'}`}>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center text-3xl shadow-inner mb-2">👵🏻</div>
                        <p className="text-gray-700 font-medium text-sm">{groupMembers[1].name}</p>
                    </div>
                    {activeSpeaker === '2' && (
                        <div className="absolute bottom-3 left-0 right-0 flex justify-center scale-75">
                            <VoiceVisualizer isActive={true} color="#0064FF" />
                        </div>
                    )}
                </motion.div>
            </motion.div>

            {/* Floating Controls */}
            <div className="absolute top-[45%] left-0 right-0 flex justify-center gap-6 z-30 pointer-events-none">
                {/*  Push down slightly if chat is open, or keep centered? 
                      Let's fix it to bottom area if chat is closed, or middle if chat is open.
                      Actually, simpler to have it at bottom fixed if chat is hidden.
                 */}
            </div>
            <div className={`absolute left-0 right-0 flex justify-center gap-4 z-40 transition-all duration-500 ${showChat ? 'bottom-[42%]' : 'bottom-28'}`}>
                <div className="bg-white/90 backdrop-blur-xl rounded-full px-6 py-3 flex gap-6 shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/50">
                    <button
                        onClick={() => setIsMuted(!isMuted)}
                        className={`p-3 rounded-full transition-colors ${isMuted ? 'bg-gray-100 text-gray-400' : 'bg-gray-900 text-white shadow-lg'}`}
                    >
                        {isMuted ? <MicOff size={22} /> : <Mic size={22} />}
                    </button>
                    <button
                        onClick={handleEndCall}
                        className="p-3 rounded-full bg-red-500 text-white shadow-lg shadow-red-200 hover:bg-red-600 transition-colors"
                    >
                        <PhoneOff size={24} />
                    </button>
                    <button
                        onClick={() => setShowChat(!showChat)}
                        className={`p-3 rounded-full transition-colors ${showChat ? 'bg-toss-blue text-white shadow-lg shadow-blue-200' : 'bg-gray-100 text-gray-600'}`}
                    >
                        <MessageCircle size={22} />
                    </button>
                </div>
            </div>

            {/* Chat Sheet */}
            <AnimatePresence>
                {showChat && (
                    <motion.div
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '100%' }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="absolute bottom-0 left-0 right-0 h-[40%] bg-white rounded-t-[32px] shadow-[0_-10px_40px_rgba(0,0,0,0.1)] flex flex-col z-30 pb-safe"
                    >
                        <div className="w-full flex justify-center pt-3 pb-1 cursor-pointer" onClick={() => setShowChat(false)}>
                            <div className="w-12 h-1.5 bg-gray-200 rounded-full" />
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 space-y-3">
                            {messages.map((msg) => (
                                <div key={msg.id} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[85%] px-4 py-2.5 rounded-[20px] text-[15px] leading-relaxed ${msg.type === 'ai'
                                            ? 'bg-blue-50 text-toss-blue border border-blue-100 rounded-tl-none'
                                            : (msg.isMe
                                                ? 'bg-toss-blue text-white rounded-tr-none'
                                                : 'bg-gray-100 text-gray-800 rounded-tl-none')
                                        }`}>
                                        {!msg.isMe && <p className="text-[11px] opacity-70 mb-1 font-semibold">{msg.sender}</p>}
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-gray-100 flex gap-2 pb-6">
                            <input
                                type="text"
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                placeholder="Message..."
                                className="flex-1 bg-gray-100 rounded-full px-5 py-3 text-[15px] focus:outline-none focus:ring-2 focus:ring-toss-blue/50 transition-all placeholder:text-gray-400"
                            />
                            <button type="submit" className="p-3 bg-toss-blue rounded-full text-white shadow-md disabled:opacity-50" disabled={!inputText.trim()}>
                                <Send size={18} />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
