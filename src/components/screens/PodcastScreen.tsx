import React, { useState } from 'react';
import { useUserProfile } from '../../hooks/useDreamsQuery';

export const PodcastScreen: React.FC = () => {
  const { data: user } = useUserProfile();
  const [playingId, setPlayingId] = useState<string | null>('pod-1');

  const episodes = [
    {
      id: 'pod-1',
      title: 'Viaggio tra le Onde Theta',
      author: 'Guida al rilassamento notturno',
      duration: '24 min',
      category: 'Frequenze',
      color: '#47387e',
    },
    {
      id: 'pod-2',
      title: 'Come ricordare i sogni al risveglio',
      author: 'Dott.ssa Laura Merini',
      duration: '18 min',
      category: 'Tecniche Oniriche',
      color: '#47387e',
    },
    {
      id: 'pod-3',
      title: 'Il linguaggio simbolico dell’Acqua',
      author: 'Archetipi e Significati',
      duration: '31 min',
      category: 'Simbologia',
      color: '#47387e',
    },
    {
      id: 'pod-4',
      title: 'Paesaggi Sonori: Pioggia tra le Stelle',
      author: 'Suoni della Notte',
      duration: '45 min',
      category: 'Sonno Profondo',
      color: '#47387e',
    },
  ];

  return (
    <div className="w-full flex-1 flex flex-col px-5 pt-6 pb-24 overflow-y-auto no-scrollbar">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-medium tracking-tight text-[#47387e]">
            Podcast
          </h1>
          <p className="text-xs text-[#6e5ba8] mt-0.5">
            Suoni e storie per accompagnare il tuo riposo
          </p>
        </div>
        <div className="w-13 h-13 rounded-full overflow-hidden border-2 border-white/60 shadow-sm">
          <img
            src={user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'}
            alt={user?.name || 'Federica'}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Featured Episode Banner */}
      <div className="bg-[#47387e] text-white rounded-[28px] p-5 mb-6 shadow-md relative overflow-hidden">
        <div className="absolute right-[-10px] bottom-[-20px] opacity-15 text-8xl font-black select-none pointer-events-none">
          ♫
        </div>
        <span className="text-[11px] bg-[#f6be4f] text-[#362569] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider inline-block mb-3">
          In Primo Piano
        </span>
        <h2 className="text-xl font-bold mb-1">Volando verso il sonno profondo</h2>
        <p className="text-xs text-white/70 mb-4">
          Una meditazione guidata con campane tibetane e suoni celesti
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-white/60">35 min • Audio 8D</span>
          <button
            type="button"
            onClick={() => setPlayingId(playingId === 'featured' ? null : 'featured')}
            className="px-4 py-2 bg-[#f6be4f] hover:brightness-105 text-[#362569] text-xs font-bold rounded-full flex items-center gap-1.5 shadow-sm active:scale-95 transition-transform"
          >
            <span>{playingId === 'featured' ? '❚❚ Pausa' : '▶ Ascolta ora'}</span>
          </button>
        </div>
      </div>

      {/* Episodes List */}
      <div className="space-y-3">
        <h3 className="text-base font-semibold text-[#47387e] px-1">
          Episodi consigliati per te
        </h3>

        {episodes.map((ep) => {
          const isPlaying = playingId === ep.id;
          return (
            <div
              key={ep.id}
              onClick={() => setPlayingId(isPlaying ? null : ep.id)}
              className="bg-white/70 hover:bg-white border border-[#b8abec]/70 rounded-2xl p-4 flex items-center justify-between transition-all cursor-pointer group active:scale-[0.99]"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center font-bold text-sm transition-all ${
                    isPlaying
                      ? 'bg-[#f6be4f] text-[#362569] scale-105 shadow-sm'
                      : 'bg-[#dcd4fe] text-[#47387e] group-hover:bg-[#cfc3fd]'
                  }`}
                >
                  {isPlaying ? '❚❚' : '▶'}
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#47387e]">
                    {ep.title}
                  </h4>
                  <p className="text-xs text-[#6e5ba8]">
                    {ep.author} • {ep.duration}
                  </p>
                </div>
              </div>

              <span className="text-[10px] bg-[#ece7ff] text-[#47387e] font-medium px-2.5 py-1 rounded-full">
                {ep.category}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
