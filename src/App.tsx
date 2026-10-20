import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ScreenStep } from './types';
import { SplashScreen } from './components/screens/SplashScreen';
import { HomeScreen } from './components/screens/HomeScreen';
import { CalendarScreen } from './components/screens/CalendarScreen';
import { DreamCardScreen } from './components/screens/DreamCardScreen';
import { PodcastScreen } from './components/screens/PodcastScreen';
import { ProfileScreen } from './components/screens/ProfileScreen';
import { BottomNav } from './components/Navigation';
import { SearchModal } from './components/modals/SearchModal';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
    },
  },
});

function AppContent() {
  const [currentScreen, setCurrentScreen] = useState<ScreenStep>('caricamento');
  const [selectedDreamId, setSelectedDreamId] = useState<string>('dream-2026-01-09');
  const [selectedDate, setSelectedDate] = useState<string>('2026-01-09');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDreamModalOpen, setIsDreamModalOpen] = useState(false);

  const handleOpenDream = (dreamId: string) => {
    setSelectedDreamId(dreamId);
    setIsDreamModalOpen(true);
  };

  const handleSelectDate = (dateStr: string) => {
    setSelectedDate(dateStr);
  };

  return (
    <div className="min-h-screen w-full bg-[#181424] flex items-center justify-center p-0 sm:p-4 select-none overflow-hidden">
      {/* iPhone 13 mini Chassis (Exact dimensions: 375pt x 812pt) */}
      <div className="w-full max-w-[375px] h-[100dvh] sm:h-[812px] sm:max-h-[812px] bg-[#edebe5] text-[#47387e] sm:rounded-[48px] sm:border-[10px] sm:border-[#2b253b] sm:shadow-[0_25px_70px_rgba(0,0,0,0.65),0_0_0_1px_rgba(255,255,255,0.08)] relative overflow-hidden flex flex-col justify-between">
        
        {/* iPhone 13 mini Compact Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[140px] h-[25px] bg-[#2b253b] rounded-b-[18px] z-50 flex items-center justify-center pointer-events-none">
          {/* Speaker grill */}
          <div className="w-10 h-1 bg-[#161220] rounded-full mr-2" />
          {/* Front camera lens */}
          <div className="w-2.5 h-2.5 rounded-full bg-[#161220] border border-[#3e3553]/60 flex items-center justify-center">
            <div className="w-1 h-1 rounded-full bg-[#3b4c74]/80" />
          </div>
        </div>

        {/* iPhone 13 mini Status Bar */}
        {currentScreen !== 'caricamento' && (
          <div className="w-full px-6 pt-2 pb-0.5 flex items-center justify-between text-xs text-[#47387e] font-semibold select-none z-40 shrink-0">
            <span className="text-[12px] tracking-tight pl-0.5 font-bold">09:41</span>
            
            {/* Right status icons: Cellular, WiFi, Battery */}
            <div className="flex items-center gap-1.5 text-[11px] pr-0.5">
              {/* Cellular Signal */}
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <rect x="2" y="16" width="3" height="6" rx="0.5" />
                <rect x="7" y="12" width="3" height="10" rx="0.5" />
                <rect x="12" y="8" width="3" height="14" rx="0.5" />
                <rect x="17" y="4" width="3" height="18" rx="0.5" />
              </svg>
              {/* WiFi */}
              <svg className="w-3.5 h-3.5 fill-none stroke-current" strokeWidth="2.5" strokeLinecap="round" viewBox="0 0 24 24">
                <path d="M5 12.55a11 11 0 0 1 14.08 0" />
                <path d="M1.42 9a16 16 0 0 1 21.16 0" />
                <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
                <circle cx="12" cy="20" r="1" className="fill-current" />
              </svg>
              {/* Battery */}
              <div className="w-5 h-2.5 rounded-[3px] border border-current p-[1px] flex items-center">
                <div className="h-full w-full bg-current rounded-[1px]" />
              </div>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden relative">
          {currentScreen === 'caricamento' && (
            <SplashScreen
              onComplete={() => {
                setCurrentScreen('home');
              }}
            />
          )}

          {currentScreen === 'home' && (
            <HomeScreen
              onNavigate={(screen) => {
                setIsDreamModalOpen(false);
                setCurrentScreen(screen);
              }}
              onOpenDream={handleOpenDream}
              onSelectDate={handleSelectDate}
              selectedDate={selectedDate}
            />
          )}

          {currentScreen === 'calendario' && (
            <CalendarScreen
              onNavigate={(screen) => {
                setIsDreamModalOpen(false);
                setCurrentScreen(screen);
              }}
              onOpenDream={handleOpenDream}
              selectedDate={selectedDate}
              onSelectDate={handleSelectDate}
            />
          )}

          {currentScreen === 'scheda_sogno' && !isDreamModalOpen && (
            <HomeScreen
              onNavigate={setCurrentScreen}
              onOpenDream={handleOpenDream}
              onSelectDate={handleSelectDate}
              selectedDate={selectedDate}
            />
          )}

          {currentScreen === 'podcast' && <PodcastScreen />}

          {currentScreen === 'profilo' && <ProfileScreen onRestartSplash={() => setCurrentScreen('caricamento')} />}
        </div>

        {/* Bottom Navigation Bar: Hidden on splash and hidden when Dream Modal is open */}
        {currentScreen !== 'caricamento' && !isDreamModalOpen && (
          <div className="sticky bottom-0 z-30 w-full bg-gradient-to-t from-[#edebe5] via-[#edebe5]/95 to-transparent pt-1">
            <BottomNav
              currentScreen={currentScreen}
              onNavigate={(screen) => {
                setIsDreamModalOpen(false);
                setCurrentScreen(screen);
              }}
              onOpenSearch={() => setIsSearchOpen(true)}
            />
          </div>
        )}

        {/* iOS Home Indicator Bar */}
        <div className="w-full pb-2 pt-1 flex items-center justify-center shrink-0 z-40 pointer-events-none">
          <div className="w-32 h-1 bg-[#47387e]/25 rounded-full" />
        </div>

        {/* Scheda Sogno Modal: Strictly confined INSIDE the iPhone 13 mini frame */}
        <DreamCardScreen
          isOpen={isDreamModalOpen}
          dreamId={selectedDreamId}
          onClose={() => setIsDreamModalOpen(false)}
          onNavigate={(screen) => {
            setIsDreamModalOpen(false);
            setCurrentScreen(screen);
          }}
        />

        {/* Global Search Dialog: Confined inside iPhone 13 mini frame */}
        <SearchModal
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          onSelectDream={handleOpenDream}
        />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}
