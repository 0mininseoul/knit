import { create } from 'zustand';

type Screen = 'splash' | 'onboarding' | 'analysis' | 'match' | 'home' | 'call' | 'meeting';

interface AppState {
  currentScreen: Screen;
  setCurrentScreen: (screen: Screen) => void;

  // Fake User Data
  userProfile: {
    name: string;
    age: number | null;
    interests: string[];
  };
  updateUserProfile: (data: Partial<AppState['userProfile']>) => void;

  // Fake Group Data
  groupMembers: {
    id: string;
    name: string;
    age: number;
    image: string;
    status: 'online' | 'offline';
    lastActive: string;
  }[];

  // App Logic State
  isCheckedIn: boolean;
  checkIn: () => void;

  userLocation: { lat: number; lng: number; address?: string } | null;
  setUserLocation: (location: { lat: number; lng: number; address?: string }) => void;
}

export const useAppStore = create<AppState>((set) => ({
  currentScreen: 'splash',
  setCurrentScreen: (screen) => set({ currentScreen: screen }),

  userProfile: {
    name: 'Me',
    age: null,
    interests: [],
  },
  updateUserProfile: (data) =>
    set((state) => ({ userProfile: { ...state.userProfile, ...data } })),

  groupMembers: [
    {
      id: '1',
      name: 'Tanaka',
      age: 72,
      image: '/avatars/tanaka.jpg', // Placeholder
      status: 'online',
      lastActive: '10:00 AM',
    },
    {
      id: '2',
      name: 'Sato',
      age: 70,
      image: '/avatars/sato.jpg', // Placeholder
      status: 'online',
      lastActive: '10:05 AM',
    },
  ],

  isCheckedIn: false,
  checkIn: () => set({ isCheckedIn: true }),

  userLocation: null,
  setUserLocation: (location) => set({ userLocation: location }),
}));
