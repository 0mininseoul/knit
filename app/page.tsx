'use client';

import { useAppStore } from '@/store/useAppStore';
import SplashScreen from '@/components/screens/SplashScreen';
import OnboardingScreen from '@/components/screens/OnboardingScreen';
import AnalysisScreen from '@/components/screens/AnalysisScreen';
import MatchResultScreen from '@/components/screens/MatchResultScreen';
import HomeScreen from '@/components/screens/HomeScreen';
import CallScreen from '@/components/screens/CallScreen';
import MeetingGuideScreen from '@/components/screens/MeetingGuideScreen';
import SettingsScreen from '@/components/screens/SettingsScreen';
import BottomNav from '@/components/ui/BottomNav';

export default function Home() {
  const currentScreen = useAppStore((state) => state.currentScreen);
  const activeTab = useAppStore((state) => state.activeTab);

  return (
    <main className="max-w-md mx-auto bg-toss-grey-50 min-h-screen shadow-xl overflow-hidden relative">
      {currentScreen === 'splash' && <SplashScreen />}
      {currentScreen === 'onboarding' && <OnboardingScreen />}
      {currentScreen === 'analysis' && <AnalysisScreen />}
      {currentScreen === 'match' && <MatchResultScreen />}

      {/* Main App Flow with Tabs */}
      {currentScreen === 'home' && (
        <div className="h-full flex flex-col">
          <div className="flex-1 overflow-hidden relative">
            {activeTab === 'home' && <HomeScreen />}
            {activeTab === 'call' && <CallScreen />}
            {activeTab === 'settings' && <SettingsScreen />}
          </div>
          <BottomNav />
        </div>
      )}

      {currentScreen === 'meeting' && <MeetingGuideScreen />}
    </main>
  );
}
