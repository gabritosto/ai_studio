import React from 'react';
import { ScreenStep } from '../types';

interface BottomNavProps {
  currentScreen: ScreenStep;
  onNavigate: (screen: ScreenStep) => void;
  onOpenSearch: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentScreen,
  onNavigate,
  onOpenSearch,
}) => {
  return (
    <div className="w-full max-w-[375px] mx-auto px-3.5 pb-1 pt-1 flex items-center justify-between gap-2.5 pointer-events-auto">
      {/* Main Nav Capsule */}
      <nav
        aria-label="Navigazione principale"
        className="flex-1 bg-[#dcd4fe] shadow-md shadow-[#47387e]/5 rounded-full px-3 py-1.5 flex items-center justify-around backdrop-blur-sm"
      >
        {/* Home */}
        <button
          type="button"
          onClick={() => onNavigate('home')}
          className={`flex flex-col items-center justify-center transition-all duration-200 group relative ${
            currentScreen === 'home' ? 'text-[#362569] scale-105' : 'text-[#5d4d91] hover:text-[#362569] opacity-80'
          }`}
        >
          <div className="w-6 h-6 flex items-center justify-center">
            <svg
              viewBox="0 0 24 24"
              fill={currentScreen === 'home' ? 'currentColor' : 'none'}
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </div>
          <span className="text-[10px] font-medium tracking-tight mt-0.5">Home</span>
        </button>

        {/* Podcast */}
        <button
          type="button"
          onClick={() => onNavigate('podcast')}
          className={`flex flex-col items-center justify-center transition-all duration-200 group ${
            currentScreen === 'podcast' ? 'text-[#362569] scale-105' : 'text-[#5d4d91] hover:text-[#362569] opacity-80'
          }`}
        >
          <div className="w-6 h-6 flex items-center justify-center">
            {/* Waveform bars icon */}
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              className="w-5 h-5"
            >
              <line x1="4" y1="9" x2="4" y2="15" />
              <line x1="8" y1="6" x2="8" y2="18" />
              <line x1="12" y1="3" x2="12" y2="21" />
              <line x1="16" y1="7" x2="16" y2="17" />
              <line x1="20" y1="10" x2="20" y2="14" />
            </svg>
          </div>
          <span className="text-[10px] font-medium tracking-tight mt-0.5">Podcast</span>
        </button>

        {/* Profilo */}
        <button
          type="button"
          onClick={() => onNavigate('profilo')}
          className={`flex flex-col items-center justify-center transition-all duration-200 group ${
            currentScreen === 'profilo' ? 'text-[#362569] scale-105' : 'text-[#5d4d91] hover:text-[#362569] opacity-80'
          }`}
        >
          <div className="w-6 h-6 flex items-center justify-center">
            <svg
              viewBox="0 0 24 24"
              fill={currentScreen === 'profilo' ? 'currentColor' : 'none'}
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <span className="text-[10px] font-medium tracking-tight mt-0.5">Profilo</span>
        </button>

        {/* Calendario */}
        <button
          type="button"
          onClick={() => onNavigate('calendario')}
          className={`flex flex-col items-center justify-center transition-all duration-200 group ${
            currentScreen === 'calendario' ? 'text-[#362569] scale-105' : 'text-[#5d4d91] hover:text-[#362569] opacity-80'
          }`}
        >
          <div className="w-6 h-6 flex items-center justify-center">
            {/* Calendar with star icon matching screenshot */}
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <rect x="3" y="4" width="18" height="18" rx="3" ry="3" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
              {/* Star inside */}
              <polygon
                points="12 12.2 13 14.3 15.2 14.5 13.5 16 14 18.2 12 17 10 18.2 10.5 16 8.8 14.5 11 14.3"
                fill="currentColor"
                stroke="none"
              />
            </svg>
          </div>
          <span className="text-[10px] font-medium tracking-tight mt-0.5">Calendario</span>
        </button>
      </nav>

      {/* Floating Action Button (Search / Quick Access) */}
      <button
        type="button"
        onClick={onOpenSearch}
        title="Cerca nei sogni"
        aria-label="Cerca nei sogni"
        className="w-11 h-11 rounded-full bg-[#dcd4fe] text-[#47387e] flex items-center justify-center shadow-md shadow-[#47387e]/10 hover:bg-[#cfc3fd] active:scale-95 transition-transform shrink-0"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <circle cx="11" cy="11" r="7" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </button>
    </div>
  );
};
