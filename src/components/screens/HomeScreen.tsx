import React from 'react';
import { useDreams, useUserProfile } from '../../hooks/useDreamsQuery';
import { DreamNightSky } from '../illustrations/DreamNightSky';
import { ScreenStep } from '../../types';

interface HomeScreenProps {
  onNavigate: (screen: ScreenStep) => void;
  onOpenDream: (dreamId: string) => void;
  onSelectDate: (dateStr: string) => void;
  selectedDate: string;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onNavigate,
  onOpenDream,
  onSelectDate,
  selectedDate,
}) => {
  const { data: user } = useUserProfile();
  const { data: dreams } = useDreams();

  // Weekdays for the calendar strip matching screenshot: Lun 7, Mar 8, Mer 9, Gio 10, Ven 11, Sab 12, Dom 13
  const weekDays = [
    { label: 'Lun', day: 7, date: '2026-01-07' },
    { label: 'Mar', day: 8, date: '2026-01-08' },
    { label: 'Mer', day: 9, date: '2026-01-09' },
    { label: 'Gio', day: 10, date: '2026-01-10' },
    { label: 'Ven', day: 11, date: '2026-01-11' },
    { label: 'Sab', day: 12, date: '2026-01-12' },
    { label: 'Dom', day: 13, date: '2026-01-13' },
  ];

  // Primary dream of today (Jan 9th)
  const todayDream = dreams?.find((d) => d.date === selectedDate) || dreams?.find((d) => d.date === '2026-01-09');

  return (
    <div className="w-full flex-1 flex flex-col px-5 pt-6 pb-24 overflow-y-auto no-scrollbar">
      {/* Top Header: Greeting & Profile Photo */}
      <div className="flex items-center justify-between mb-7">
        <h1 className="text-3xl font-medium tracking-tight text-[#47387e]">
          Ciao, {user?.name || 'Federica'}
        </h1>
        <button
          type="button"
          onClick={() => onNavigate('profilo')}
          aria-label="Apri profilo"
          className="w-13 h-13 rounded-full overflow-hidden border-2 border-white/60 shadow-sm transition-transform active:scale-95"
        >
          <img
            src={user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'}
            alt={user?.name || 'Federica'}
            className="w-full h-full object-cover"
          />
        </button>
      </div>

      {/* Section 1: Calendario */}
      <div className="mb-7">
        <div className="flex items-center justify-between mb-3 px-1">
          <h2 className="text-lg font-medium text-[#47387e]">Calendario</h2>
          <button
            type="button"
            onClick={() => onNavigate('calendario')}
            className="text-sm font-normal text-[#5a4696] hover:text-[#3e2d6b] transition-colors"
          >
            Altro
          </button>
        </div>

        {/* Weekday strip */}
        <div className="flex items-center justify-between gap-1 text-center">
          {weekDays.map((item) => {
            const isSelected = selectedDate === item.date || (!selectedDate && item.day === 9);
            return (
              <button
                key={item.day}
                type="button"
                onClick={() => {
                  onSelectDate(item.date);
                  onNavigate('calendario');
                }}
                className="flex flex-col items-center gap-2 flex-1 group transition-transform active:scale-95"
              >
                <span className="text-xs font-normal text-[#66549c] group-hover:text-[#47387e]">
                  {item.label}
                </span>
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                    isSelected
                      ? 'bg-[#f6be4f] text-[#362569] shadow-sm font-semibold scale-105'
                      : 'bg-[#dcd4fe] text-[#47387e] hover:bg-[#d0c6fd]'
                  }`}
                >
                  {item.day}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Section 2: Il tuo sogno di oggi */}
      <div className="mb-7">
        <div className="flex items-center justify-between mb-3 px-1">
          <h2 className="text-lg font-medium text-[#47387e]">Il tuo sogno di oggi</h2>
          <button
            type="button"
            onClick={() => {
              if (todayDream) onOpenDream(todayDream.id);
            }}
            className="text-sm font-normal text-[#5a4696] hover:text-[#3e2d6b] transition-colors"
          >
            Altro
          </button>
        </div>

        {/* Dream Carousel / Cards */}
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
          {/* Main Dream Card (Click to open Scheda Sogno) */}
          <div
            onClick={() => {
              if (todayDream) onOpenDream(todayDream.id);
            }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                if (todayDream) onOpenDream(todayDream.id);
              }
            }}
            aria-label={`Apri scheda sogno: ${todayDream?.title || 'Volando tra le stelle'}`}
            className="w-full bg-[#fbf9fe] border-2 border-[#b8abec] rounded-[28px] p-4 cursor-pointer hover:shadow-md transition-all group active:scale-[0.99] relative overflow-hidden"
          >
            <h3 className="text-lg font-medium text-[#47387e] mb-2 px-1 tracking-tight">
              {todayDream?.title || 'Volando tra le stelle'}
            </h3>

            {/* Illustration */}
            <div className="w-full rounded-2xl bg-transparent flex items-center justify-center">
              <DreamNightSky showMascot={true} />
            </div>

            {/* Subtle tap cue */}
            <div className="mt-1 flex items-center justify-between text-xs text-[#6e5ba8] px-1 font-medium">
              <span>9 Gennaio</span>
              <span className="flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                Tocca per aprire &rarr;
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Section 3: La tua Libreria */}
      <div className="mb-2">
        <div className="flex items-center justify-between mb-3 px-1">
          <h2 className="text-lg font-medium text-[#47387e]">La tua Libreria</h2>
          <button
            type="button"
            onClick={() => onNavigate('podcast')}
            className="text-sm font-normal text-[#5a4696] hover:text-[#3e2d6b] transition-colors"
          >
            Altro
          </button>
        </div>

        {/* Horizontal Library Cards */}
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
          {/* Preferiti */}
          <button
            type="button"
            onClick={() => {
              onNavigate('calendario');
            }}
            className="w-38 h-38 bg-[#47387e] text-white rounded-[24px] p-4 flex flex-col justify-between hover:bg-[#3c2f6d] transition-all text-left group shrink-0 active:scale-95 shadow-sm"
          >
            <div className="flex items-center gap-2">
              <span className="text-base font-semibold tracking-tight">Preferiti</span>
              <span className="text-[#f6be4f] text-lg">★</span>
            </div>
            <div className="flex justify-end">
              <span className="text-white/80 group-hover:translate-x-1 transition-transform text-lg">
                &gt;
              </span>
            </div>
          </button>

          {/* Playlist */}
          <button
            type="button"
            onClick={() => onNavigate('podcast')}
            className="w-38 h-38 bg-[#47387e] text-white rounded-[24px] p-4 flex flex-col justify-between hover:bg-[#3c2f6d] transition-all text-left group shrink-0 active:scale-95 shadow-sm"
          >
            <div className="flex items-center gap-2">
              <span className="text-base font-semibold tracking-tight">Playlist</span>
              {/* Note / Playlist icon */}
              <div className="w-5 h-5 rounded bg-[#f6be4f] text-[#47387e] flex items-center justify-center text-[10px] font-bold">
                ≡
              </div>
            </div>
            <div className="flex justify-end">
              <span className="text-white/80 group-hover:translate-x-1 transition-transform text-lg">
                &gt;
              </span>
            </div>
          </button>

          {/* Sogni Lucidi */}
          <button
            type="button"
            onClick={() => onOpenDream('dream-2026-01-09')}
            className="w-38 h-38 bg-[#47387e] text-white rounded-[24px] p-4 flex flex-col justify-between hover:bg-[#3c2f6d] transition-all text-left group shrink-0 active:scale-95 shadow-sm"
          >
            <div className="flex items-center gap-2">
              <span className="text-base font-semibold tracking-tight">Lucidi</span>
              <span className="text-[#f6be4f] text-base">✦</span>
            </div>
            <div className="flex justify-end">
              <span className="text-white/80 group-hover:translate-x-1 transition-transform text-lg">
                &gt;
              </span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
