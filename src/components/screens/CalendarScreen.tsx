import React from 'react';
import { useDreams, useUserProfile, useDreamByDate } from '../../hooks/useDreamsQuery';
import { StarMascot } from '../illustrations/StarMascot';
import { ScreenStep } from '../../types';

interface CalendarScreenProps {
  onNavigate: (screen: ScreenStep) => void;
  onOpenDream: (dreamId: string) => void;
  selectedDate: string;
  onSelectDate: (dateStr: string) => void;
}

export const CalendarScreen: React.FC<CalendarScreenProps> = ({
  onNavigate,
  onOpenDream,
  selectedDate,
  onSelectDate,
}) => {
  const { data: user } = useUserProfile();
  const { data: allDreams } = useDreams();
  const { data: activeDream } = useDreamByDate(selectedDate);

  // Month days for Gennaio (1 to 31)
  // Matching screenshot: Lun is empty for Jan 1st, so Jan 1 is Tuesday!
  const emptyLeadingDays = 1; // 1 empty slot on Monday
  const totalDays = 31;
  const daysArray = Array.from({ length: totalDays }, (_, i) => i + 1);

  const selectedDayNumber = parseInt(selectedDate.split('-')[2] || '9', 10);

  // Check if a dream exists on each day to show a subtle indicator
  const hasDreamMap = React.useMemo(() => {
    const map = new Set<number>();
    allDreams?.forEach((d) => {
      map.add(d.dayNumber);
    });
    return map;
  }, [allDreams]);

  return (
    <div className="w-full flex-1 flex flex-col px-5 pt-6 pb-24 overflow-y-auto no-scrollbar">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-medium tracking-tight text-[#47387e]">
          Calendario
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

      {/* Month Navigation */}
      <div className="flex items-center justify-center gap-6 mb-3 text-[#47387e]">
        <button
          type="button"
          aria-label="Mese precedente"
          className="p-1 hover:text-[#362569] transition-transform active:scale-90"
        >
          <span className="text-lg font-bold">&lsaquo;</span>
        </button>
        <span className="text-xl font-medium tracking-wide">Gennaio</span>
        <button
          type="button"
          aria-label="Mese successivo"
          className="p-1 hover:text-[#362569] transition-transform active:scale-90"
        >
          <span className="text-lg font-bold">&rsaquo;</span>
        </button>
      </div>

      {/* Weekday labels */}
      <div className="grid grid-cols-7 gap-1 text-center mb-2">
        {['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'].map((d) => (
          <span key={d} className="text-xs font-normal text-[#66549c] py-1">
            {d}
          </span>
        ))}
      </div>

      {/* Calendar Grid (Days 1 to 31) */}
      <div className="grid grid-cols-7 gap-y-2 gap-x-1.5 text-center mb-6">
        {/* Leading empty space for Monday */}
        {Array.from({ length: emptyLeadingDays }).map((_, i) => (
          <div key={`empty-${i}`} className="w-10 h-10 mx-auto" />
        ))}

        {daysArray.map((day) => {
          const formattedDate = `2026-01-${String(day).padStart(2, '0')}`;
          const isSelected = selectedDayNumber === day;
          const hasDream = hasDreamMap.has(day);

          return (
            <button
              key={day}
              type="button"
              onClick={() => onSelectDate(formattedDate)}
              className="group relative flex items-center justify-center p-0.5 active:scale-90 transition-transform"
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                  isSelected
                    ? 'bg-[#f6be4f] text-[#362569] font-bold shadow-md scale-105 ring-2 ring-[#f6be4f]/40'
                    : 'bg-[#dcd4fe] text-[#47387e] hover:bg-[#d0c6fd]'
                }`}
              >
                {day}
              </div>
              {/* Little dot if has dream and not selected */}
              {hasDream && !isSelected && (
                <span className="absolute bottom-1 w-1 h-1 rounded-full bg-[#f6be4f]" />
              )}
            </button>
          );
        })}
      </div>

      {/* Recorded Dream Section */}
      <div className="mb-4">
        <p className="text-base text-[#47387e] font-normal mb-2.5 px-1">
          Sogno che hai registrato il {selectedDayNumber} gennaio
        </p>

        {activeDream ? (
          <button
            type="button"
            onClick={() => onOpenDream(activeDream.id)}
            className="w-full bg-[#f6be4f] text-[#362569] font-medium rounded-2xl py-3 px-5 flex items-center justify-between shadow-sm hover:brightness-105 active:scale-[0.99] transition-all group"
          >
            <span className="text-base tracking-tight truncate mr-2">
              {activeDream.title}
            </span>
            <span className="text-lg font-bold group-hover:translate-x-1 transition-transform">
              &gt;
            </span>
          </button>
        ) : (
          <button
            type="button"
            onClick={() => {
              // Open dream modal in creation mode for this day
              onOpenDream(`new-${selectedDate}`);
            }}
            className="w-full bg-[#dcd4fe] text-[#47387e] font-medium rounded-2xl py-3 px-5 flex items-center justify-between shadow-sm hover:bg-[#d0c6fd] active:scale-[0.99] transition-all group"
          >
            <span className="text-sm tracking-tight">
              Nessun sogno salvato per oggi. Tocca per scrivere +
            </span>
            <span className="text-base font-bold group-hover:translate-x-1 transition-transform">
              +
            </span>
          </button>
        )}
      </div>

      {/* Cute Walking Star Mascot centered at bottom (Exact replica of Screen 3) */}
      <div className="flex items-center justify-center mt-2 mb-2">
        <StarMascot size={110} animate={true} />
      </div>
    </div>
  );
};
