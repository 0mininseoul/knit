'use client';

import { useAppStore } from '@/store/useAppStore';
import SplashScreen from '@/components/screens/SplashScreen';
import OnboardingScreen from '@/components/screens/OnboardingScreen';
import AnalysisScreen from '@/components/screens/AnalysisScreen';
import MatchResultScreen from '@/components/screens/MatchResultScreen';
import HomeScreen from '@/components/screens/HomeScreen';
import CallScreen from '@/components/screens/CallScreen';
import MeetingGuideScreen from '@/components/screens/MeetingGuideScreen';

export default function Home() {
  const currentScreen = useAppStore((state) => state.currentScreen);

  return (
    <main className="max-w-md mx-auto bg-gray-50 min-h-screen shadow-xl overflow-hidden relative">
      {currentScreen === 'splash' && <SplashScreen />}
      {currentScreen === 'onboarding' && <OnboardingScreen />}
      {currentScreen === 'analysis' && <AnalysisScreen />}
      {currentScreen === 'match' && <MatchResultScreen />}
      {currentScreen === 'home' && <HomeScreen />}
      {currentScreen === 'call' && <CallScreen />}
      {currentScreen === 'meeting' && <MeetingGuideScreen />}
    </main>
  );
}
