import React, { useState } from 'react';
import { useDreams } from '../../hooks/useDreamsQuery';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectDream: (dreamId: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectDream,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: dreams } = useDreams();

  if (!isOpen) return null;

  const filteredDreams = (dreams || []).filter((d) => {
    const q = searchTerm.toLowerCase();
    return (
      d.title.toLowerCase().includes(q) ||
      d.description.toLowerCase().includes(q) ||
      d.tags.some((t) => t.toLowerCase().includes(q))
    );
  });

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="search-modal-title"
      className="absolute inset-0 z-50 bg-[#362569]/70 backdrop-blur-xs flex items-center justify-center p-3.5"
    >
      <div className="w-full max-w-[360px] bg-[#edebe5] rounded-[28px] p-5 shadow-2xl border border-white/60 flex flex-col max-h-[82vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 id="search-modal-title" className="text-xl font-medium text-[#47387e]">
            Cerca nei tuoi sogni
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Chiudi ricerca"
            className="w-8 h-8 rounded-full bg-[#dcd4fe] text-[#47387e] flex items-center justify-center hover:bg-[#cfc3fd] transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Input */}
        <div className="relative mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cerca per titolo, emozione o parola..."
            autoFocus
            className="w-full bg-white/80 border border-[#b8abec] rounded-2xl py-3 pl-10 pr-4 text-sm text-[#47387e] placeholder-[#6e5ba8]/60 outline-none focus:ring-2 focus:ring-[#f6be4f]"
          />
          <span className="absolute left-3.5 top-3.5 text-[#6e5ba8]">🔍</span>
        </div>

        {/* Dream list results */}
        <div className="flex-1 overflow-y-auto no-scrollbar space-y-2.5 pr-1">
          {filteredDreams.length > 0 ? (
            filteredDreams.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  onSelectDream(item.id);
                  onClose();
                }}
                className="w-full text-left bg-white/70 hover:bg-white p-3.5 rounded-2xl border border-[#b8abec]/60 transition-all flex items-center justify-between group active:scale-[0.99]"
              >
                <div>
                  <h3 className="text-sm font-semibold text-[#47387e] group-hover:text-[#362569]">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#6e5ba8] line-clamp-1 mt-0.5">
                    {item.description}
                  </p>
                  <div className="flex gap-1.5 mt-1.5">
                    <span className="text-[10px] bg-[#dcd4fe] text-[#47387e] px-2 py-0.5 rounded-full font-medium">
                      {item.dayNumber} {item.monthName}
                    </span>
                    {item.isFavorite && (
                      <span className="text-[10px] bg-[#f6be4f]/30 text-[#47387e] px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                        ★ Preferito
                      </span>
                    )}
                  </div>
                </div>
                <span className="text-base text-[#47387e] group-hover:translate-x-1 transition-transform ml-2">
                  &gt;
                </span>
              </button>
            ))
          ) : (
            <div className="text-center py-8 text-sm text-[#6e5ba8]">
              Nessun sogno trovato per &ldquo;{searchTerm}&rdquo;
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
