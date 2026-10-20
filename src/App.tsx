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
  const [isMobileFrame, setIsMobileFrame] = useState(true);
  const [isDreamModalOpen, setIsDreamModalOpen] = useState(false);

  // Screen steps definition matching user's numbered screenshots
  const steps: { id: ScreenStep; label: string; number: number }[] = [
    { id: 'caricamento', label: '1. Caricamento', number: 1 },
    { id: 'home', label: '2. Home', number: 2 },
    { id: 'calendario', label: '3. Calendario', number: 3 },
    { id: 'scheda_sogno', label: '4. Scheda Sogno', number: 4 },
  ];

  const handleOpenDream = (dreamId: string) => {
    setSelectedDreamId(dreamId);
    setIsDreamModalOpen(true);
  };

  const handleSelectDate = (dateStr: string) => {
    setSelectedDate(dateStr);
  };

  return (
    <div className="min-h-screen bg-[#e4e1d8] flex flex-col items-center justify-start text-[#47387e] font-sans antialiased selection:bg-[#f6be4f]/40 relative">
      {/* Interactive Top Step Controller - Strict adherence to screenshot order */}
      <header className="w-full max-w-4xl px-4 pt-3 pb-2 flex flex-wrap items-center justify-between gap-3 text-xs z-30">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#f6be4f] animate-pulse" />
          <span className="font-bold tracking-tight text-[#47387e]">Sogni Prototype</span>
          <span className="text-[11px] text-[#6e5ba8] hidden sm:inline">
            (Segui i 4 screenshot in sequenza)
          </span>
        </div>

        {/* Step Buttons 1, 2, 3, 4 */}
        <div className="flex items-center gap-1.5 bg-white/70 p-1 rounded-full border border-[#b8abec]/70 shadow-xs">
          {steps.map((s) => {
            const isActive =
              s.id === 'scheda_sogno'
                ? isDreamModalOpen
                : currentScreen === s.id && !isDreamModalOpen;

            return (
              <button
                key={s.id}
                type="button"
                onClick={() => {
                  if (s.id === 'scheda_sogno') {
                    setSelectedDreamId('dream-2026-01-09');
                    setIsDreamModalOpen(true);
                  } else {
                    setIsDreamModalOpen(false);
                    setCurrentScreen(s.id);
                  }
                }}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-[#47387e] text-white shadow-xs'
                    : 'text-[#6e5ba8] hover:text-[#47387e] hover:bg-white/60'
                }`}
              >
                {s.label}
              </button>
            );
          })}
        </div>

        {/* Mobile / Fullscreen layout toggle */}
        <div className="flex items-center gap-1 bg-white/70 p-1 rounded-full border border-[#b8abec]/70">
          <button
            type="button"
            onClick={() => setIsMobileFrame(true)}
            title="Vista Cornice Smartphone"
            className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-colors ${
              isMobileFrame ? 'bg-[#dcd4fe] text-[#47387e] font-bold' : 'text-[#6e5ba8]'
            }`}
          >
            📱 Mobile
          </button>
          <button
            type="button"
            onClick={() => setIsMobileFrame(false)}
            title="Vista Fluida Ampia"
            className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-colors ${
              !isMobileFrame ? 'bg-[#dcd4fe] text-[#47387e] font-bold' : 'text-[#6e5ba8]'
            }`}
          >
            💻 Fluida
          </button>
        </div>
      </header>

      {/* Main App Container */}
      <main className="w-full flex-1 flex items-center justify-center p-0 sm:p-4 mb-4">
        <div
          className={`relative transition-all duration-300 overflow-hidden flex flex-col justify-between ${
            isMobileFrame
              ? 'w-full max-w-[395px] h-[835px] max-h-[92vh] rounded-[44px] shadow-2xl border-[9px] border-[#31254f] bg-[#edebe5]'
              : 'w-full max-w-2xl min-h-[750px] rounded-3xl shadow-lg border border-[#b8abec]/80 bg-[#edebe5]'
          }`}
        >
          {/* Simulated Mobile Status Bar (when mobile frame is enabled and not in splash) */}
          {isMobileFrame && currentScreen !== 'caricamento' && (
            <div className="w-full px-7 pt-3 pb-1 flex items-center justify-between text-xs text-[#47387e] font-semibold select-none z-20 shrink-0">
              <span>09:41</span>
              {/* Dynamic Island / Speaker notch simulation */}
              <div className="w-20 h-4 bg-[#31254f] rounded-full" />
              <div className="flex items-center gap-1 text-[11px]">
                <span>5G</span>
                <span>100%</span>
              </div>
            </div>
          )}

          {/* Render Active Screen */}
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

            {currentScreen === 'profilo' && <ProfileScreen />}

          </div>

          {/* Bottom Navigation Bar: Hidden on splash AND hidden when Dream Modal is open */}
          {currentScreen !== 'caricamento' && !isDreamModalOpen && (
            <div className="sticky bottom-0 z-30 w-full bg-gradient-to-t from-[#edebe5] via-[#edebe5]/90 to-transparent pt-2">
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

          {/* Scheda Sogno Modal: Strictly confined INSIDE the smartphone frame */}
          <DreamCardScreen
            isOpen={isDreamModalOpen}
            dreamId={selectedDreamId}
            onClose={() => setIsDreamModalOpen(false)}
            onNavigate={(screen) => {
              setIsDreamModalOpen(false);
              setCurrentScreen(screen);
            }}
          />

          {/* Global Search Dialog: Confined inside smartphone frame */}
          <SearchModal
            isOpen={isSearchOpen}
            onClose={() => setIsSearchOpen(false)}
            onSelectDream={handleOpenDream}
          />
        </div>
      </main>
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
