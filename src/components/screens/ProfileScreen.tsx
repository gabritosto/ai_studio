import React from 'react';
import { useUserProfile, useDreams } from '../../hooks/useDreamsQuery';

interface ProfileScreenProps {
  onRestartSplash?: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ onRestartSplash }) => {
  const { data: user } = useUserProfile();
  const { data: dreams } = useDreams();

  const favoriteCount = dreams?.filter((d) => d.isFavorite).length || 0;
  const lucidCount = dreams?.filter((d) => d.lucid).length || 0;

  return (
    <div className="w-full flex-1 flex flex-col px-4 pt-4 pb-20 overflow-y-auto no-scrollbar">
      {/* Profile Header */}
      <div className="flex flex-col items-center text-center mb-5">
        <div className="w-20 h-20 rounded-full overflow-hidden border-3 border-[#dcd4fe] shadow-md mb-2.5">
          <img
            src={user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'}
            alt={user?.name || 'Federica'}
            className="w-full h-full object-cover"
          />
        </div>
        <h1 className="text-2xl font-bold text-[#47387e]">
          {user?.name || 'Federica'}
        </h1>
        <p className="text-xs text-[#6e5ba8] mt-0.5 max-w-xs">
          &ldquo;{user?.favoriteQuote || 'I sogni sono la porta segreta dell’anima.'}&rdquo;
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-2.5 mb-5">
        <div className="bg-white/80 border border-[#b8abec] rounded-2xl p-3 text-center shadow-xs">
          <span className="text-xl font-bold text-[#47387e] block">
            {dreams?.length || 24}
          </span>
          <span className="text-[10px] font-medium text-[#6e5ba8]">
            Sogni registrati
          </span>
        </div>

        <div className="bg-white/80 border border-[#b8abec] rounded-2xl p-3 text-center shadow-xs">
          <span className="text-xl font-bold text-[#f6be4f] block">
            {user?.streakDays || 7}
          </span>
          <span className="text-[10px] font-medium text-[#6e5ba8]">
            Giorni streak
          </span>
        </div>

        <div className="bg-white/80 border border-[#b8abec] rounded-2xl p-3 text-center shadow-xs">
          <span className="text-xl font-bold text-[#47387e] block">
            {lucidCount || 9}
          </span>
          <span className="text-[10px] font-medium text-[#6e5ba8]">
            Sogni lucidi
          </span>
        </div>
      </div>

      {/* Profile Sections */}
      <div className="bg-white/70 border border-[#b8abec]/70 rounded-[24px] p-4 shadow-xs space-y-3">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-[#6e5ba8]">
          Preferenze Diario
        </h2>

        <div className="flex items-center justify-between py-1.5 border-b border-[#47387e]/10">
          <span className="text-xs font-medium text-[#47387e]">Sogni Preferiti</span>
          <span className="text-[11px] font-bold bg-[#f6be4f] text-[#362569] px-2.5 py-0.5 rounded-full">
            ★ {favoriteCount}
          </span>
        </div>

        <div className="flex items-center justify-between py-1.5 border-b border-[#47387e]/10">
          <span className="text-xs font-medium text-[#47387e]">Promemoria Risveglio</span>
          <span className="text-[11px] text-[#47387e] font-semibold bg-[#dcd4fe] px-2 py-0.5 rounded-full">
            07:30
          </span>
        </div>

        <div className="flex items-center justify-between py-1.5 border-b border-[#47387e]/10">
          <span className="text-xs font-medium text-[#47387e]">Audio Diario Automatico</span>
          <span className="text-[11px] text-[#47387e] font-semibold bg-[#dcd4fe] px-2 py-0.5 rounded-full">
            Abilitato
          </span>
        </div>

        {onRestartSplash && (
          <button
            type="button"
            onClick={onRestartSplash}
            className="w-full text-center py-2 text-xs font-semibold text-[#47387e] bg-[#dcd4fe]/60 hover:bg-[#dcd4fe] rounded-xl transition-colors active:scale-95"
          >
            ✦ Rivedi Schermata Caricamento
          </button>
        )}
      </div>
    </div>
  );
};
