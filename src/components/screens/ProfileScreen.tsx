import React from 'react';
import { useUserProfile, useDreams } from '../../hooks/useDreamsQuery';

export const ProfileScreen: React.FC = () => {
  const { data: user } = useUserProfile();
  const { data: dreams } = useDreams();

  const favoriteCount = dreams?.filter((d) => d.isFavorite).length || 0;
  const lucidCount = dreams?.filter((d) => d.lucid).length || 0;

  return (
    <div className="w-full flex-1 flex flex-col px-5 pt-6 pb-24 overflow-y-auto no-scrollbar">
      {/* Profile Header */}
      <div className="flex flex-col items-center text-center mb-6">
        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-[#dcd4fe] shadow-md mb-3">
          <img
            src={user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'}
            alt={user?.name || 'Federica'}
            className="w-full h-full object-cover"
          />
        </div>
        <h1 className="text-2xl font-bold text-[#47387e]">
          {user?.name || 'Federica'}
        </h1>
        <p className="text-xs text-[#6e5ba8] mt-1 max-w-xs">
          &ldquo;{user?.favoriteQuote || 'I sogni sono la porta segreta dell’anima.'}&rdquo;
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-white/80 border border-[#b8abec] rounded-2xl p-3.5 text-center shadow-sm">
          <span className="text-2xl font-bold text-[#47387e] block">
            {dreams?.length || 24}
          </span>
          <span className="text-[11px] font-medium text-[#6e5ba8]">
            Sogni registrati
          </span>
        </div>

        <div className="bg-white/80 border border-[#b8abec] rounded-2xl p-3.5 text-center shadow-sm">
          <span className="text-2xl font-bold text-[#f6be4f] block">
            {user?.streakDays || 7}
          </span>
          <span className="text-[11px] font-medium text-[#6e5ba8]">
            Giorni di streak
          </span>
        </div>

        <div className="bg-white/80 border border-[#b8abec] rounded-2xl p-3.5 text-center shadow-sm">
          <span className="text-2xl font-bold text-[#47387e] block">
            {lucidCount || 9}
          </span>
          <span className="text-[11px] font-medium text-[#6e5ba8]">
            Sogni lucidi
          </span>
        </div>
      </div>

      {/* Profile Sections */}
      <div className="bg-white/70 border border-[#b8abec]/70 rounded-[28px] p-5 shadow-sm space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-[#6e5ba8]">
          Preferenze Diario
        </h2>

        <div className="flex items-center justify-between py-2 border-b border-[#47387e]/10">
          <span className="text-sm font-medium text-[#47387e]">Sogni Preferiti</span>
          <span className="text-xs font-bold bg-[#f6be4f] text-[#362569] px-2.5 py-1 rounded-full">
            ★ {favoriteCount}
          </span>
        </div>

        <div className="flex items-center justify-between py-2 border-b border-[#47387e]/10">
          <span className="text-sm font-medium text-[#47387e]">Notifiche Promemoria Risveglio</span>
          <span className="text-xs text-[#47387e] font-semibold bg-[#dcd4fe] px-2.5 py-1 rounded-full">
            07:30 Attivo
          </span>
        </div>

        <div className="flex items-center justify-between py-2">
          <span className="text-sm font-medium text-[#47387e]">Audio Diario Automatico</span>
          <span className="text-xs text-[#47387e] font-semibold bg-[#dcd4fe] px-2.5 py-1 rounded-full">
            Abilitato
          </span>
        </div>
      </div>
    </div>
  );
};
