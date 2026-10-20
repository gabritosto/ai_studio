import React, { useState, useEffect } from 'react';
import { useDreamById, useSaveDream, useToggleFavorite } from '../../hooks/useDreamsQuery';
import { DreamNightSky } from '../illustrations/DreamNightSky';
import { CategoryIcon } from '../illustrations/CategoryIcons';
import { ScreenStep } from '../../types';

interface DreamCardModalProps {
  isOpen?: boolean;
  dreamId: string | null;
  onClose: () => void;
  onNavigate?: (screen: ScreenStep) => void;
}

export const DreamCardModal: React.FC<DreamCardModalProps> = ({
  isOpen = true,
  dreamId,
  onClose,
}) => {
  const { data: dream } = useDreamById(dreamId || 'dream-2026-01-09');
  const saveMutation = useSaveDream();
  const toggleFavMutation = useToggleFavorite();

  // Local state for interactive editing
  const [title, setTitle] = useState('Volando tra le stelle');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    'cat-peperoncini',
    'cat-spirale',
  ]);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [postText, setPostText] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  // Sync state when dream loads
  useEffect(() => {
    if (dream) {
      setTitle(dream.title);
      setSelectedCategories(dream.categoryIds || ['cat-peperoncini', 'cat-spirale']);
      setPostText(dream.description || '');
    } else if (dreamId?.startsWith('new-')) {
      const datePart = dreamId.replace('new-', '');
      setTitle(`Sogno del ${datePart.split('-')[2]} Gennaio`);
      setSelectedCategories(['cat-lucciole']);
      setPostText('');
    }
  }, [dream, dreamId]);

  // Audio recording timer simulation
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  // Audio player simulation
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isPlayingAudio) {
      interval = setInterval(() => {
        setAudioProgress((prev) => {
          if (prev >= 100) {
            setIsPlayingAudio(false);
            return 0;
          }
          return prev + 5;
        });
      }, 150);
    }
    return () => clearInterval(interval);
  }, [isPlayingAudio]);

  if (!isOpen) return null;

  const toggleCategory = (catId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(catId) ? prev.filter((id) => id !== catId) : [...prev, catId]
    );
  };

  const handlePost = async () => {
    const date = dream?.date || '2026-01-09';
    await saveMutation.mutateAsync({
      id: dream?.id || `dream-${date}`,
      title: title || 'Volando tra le stelle',
      date,
      description: postText || 'Fluttuavo leggera tra morbide nuvole color viola, accarezzata dalla luna crescente.',
      categoryIds: selectedCategories,
      audioDurationSeconds: isRecording ? recordingSeconds : (dream?.audioDurationSeconds || 42),
    });

    if (isRecording) {
      setIsRecording(false);
    }

    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 2500);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="dream-modal-title"
      className="absolute inset-0 z-50 bg-[#2f1f58]/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto no-scrollbar animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Toast Notification */}
      {showToast && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-60 bg-[#362569] text-white px-4 py-2 rounded-full shadow-xl text-xs font-semibold flex items-center gap-2 animate-bounce">
          <span className="text-[#f6be4f]">✦</span>
          <span>Sogno salvato con successo!</span>
        </div>
      )}

      {/* Dream Modal Card (Contained within smartphone frame) */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[360px] bg-[#dcd4fe] rounded-[30px] p-4.5 shadow-2xl border border-[#cebffe] flex flex-col gap-3.5 relative animate-in zoom-in-95 duration-200 my-auto"
      >
        {/* Card Header: Title & Close Button */}
        <div className="flex items-center justify-between">
          {isEditingTitle ? (
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={() => setIsEditingTitle(false)}
              onKeyDown={(e) => e.key === 'Enter' && setIsEditingTitle(false)}
              autoFocus
              className="text-xl font-medium text-[#47387e] bg-white/70 px-2 py-0.5 rounded-lg border border-[#47387e]/20 outline-none w-full mr-2"
            />
          ) : (
            <div
              className="flex items-center gap-2 group cursor-pointer"
              onClick={() => setIsEditingTitle(true)}
            >
              <h2 id="dream-modal-title" className="text-xl font-medium text-[#47387e] tracking-tight">
                {title}
              </h2>
              <span className="text-xs text-[#47387e]/40 opacity-0 group-hover:opacity-100 transition-opacity">
                ✎
              </span>
            </div>
          )}

          <div className="flex items-center gap-2">
            {dream?.id && (
              <button
                type="button"
                onClick={() => toggleFavMutation.mutate(dream.id)}
                title="Aggiungi ai preferiti"
                className={`text-lg transition-transform active:scale-90 ${
                  dream.isFavorite ? 'text-[#f6be4f]' : 'text-[#47387e]/40 hover:text-[#47387e]'
                }`}
              >
                ★
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              aria-label="Chiudi scheda sogno"
              className="text-[#47387e] hover:text-[#362569] p-1.5 rounded-full hover:bg-white/40 transition-all active:scale-90"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* Night Sky Illustration Container */}
        <div className="w-full bg-[#e8e2fd] border border-[#beb1ea] rounded-[24px] p-2 flex items-center justify-center overflow-hidden">
          <DreamNightSky showMascot={false} />
        </div>

        {/* Feature 1: Registra il tuo sogno */}
        <div className="bg-[#edeae5]/70 rounded-2xl p-3 border border-white/60">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-base text-[#47387e] font-normal block">
                Registra il tuo sogno
              </span>
              <span className="text-xs text-[#6e5ba8]">
                {isRecording
                  ? `Registrazione in corso... 00:${String(recordingSeconds).padStart(2, '0')}`
                  : isPlayingAudio
                  ? `Riproduzione vocale... ${Math.round(audioProgress)}%`
                  : 'Trascrizione audio e memo vocale'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* Play audio if exists */}
              {!isRecording && (
                <button
                  type="button"
                  onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                  title={isPlayingAudio ? 'Pausa' : 'Ascolta'}
                  className="w-8 h-8 rounded-full bg-[#f6be4f] text-[#47387e] flex items-center justify-center font-bold shadow-sm active:scale-90 transition-transform"
                >
                  {isPlayingAudio ? '❚❚' : '▶'}
                </button>
              )}

              {/* Mic button (Exact from Screen 4: deep purple circle with mic) */}
              <button
                type="button"
                onClick={() => {
                  if (!isRecording) {
                    setIsRecording(true);
                    setRecordingSeconds(0);
                  } else {
                    setIsRecording(false);
                  }
                }}
                aria-label="Registra memo vocale"
                className={`w-9 h-9 rounded-full flex items-center justify-center text-white shadow-sm transition-all active:scale-90 ${
                  isRecording ? 'bg-rose-500 animate-pulse' : 'bg-[#47387e] hover:bg-[#362569]'
                }`}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4"
                >
                  <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                  <line x1="12" y1="19" x2="12" y2="23" />
                  <line x1="8" y1="23" x2="16" y2="23" />
                </svg>
              </button>
            </div>
          </div>

          {/* Interactive audio progress/visualizer bar */}
          {(isRecording || isPlayingAudio) && (
            <div className="mt-2.5 pt-2 border-t border-[#47387e]/10 flex items-center gap-2">
              <div className="flex-1 bg-white/70 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-[#47387e] h-full transition-all duration-150"
                  style={{
                    width: isRecording
                      ? `${Math.min(100, (recordingSeconds / 30) * 100)}%`
                      : `${audioProgress}%`,
                  }}
                />
              </div>
              <span className="text-[10px] text-[#47387e] font-semibold">
                {isRecording ? `${recordingSeconds}s` : '0:42'}
              </span>
            </div>
          )}
        </div>

        {/* Feature 2: Categorizza il tuo sogno */}
        <div>
          <div className="flex items-center justify-between mb-2 px-1">
            <span className="text-base text-[#47387e] font-normal">
              Categorizza il tuo sogno
            </span>
            <button
              type="button"
              onClick={() => {
                setSelectedCategories((prev) =>
                  prev.length === 3
                    ? ['cat-spirale']
                    : ['cat-peperoncini', 'cat-spirale', 'cat-lucciole']
                );
              }}
              title="Aggiungi categoria"
              aria-label="Aggiungi categoria"
              className="text-[#47387e] text-xl font-bold hover:text-[#362569] transition-transform active:scale-90"
            >
              +
            </button>
          </div>

          {/* Category Icon Buttons */}
          <div className="grid grid-cols-3 gap-2.5">
            {/* Peperoncini */}
            <button
              type="button"
              onClick={() => toggleCategory('cat-peperoncini')}
              className={`aspect-square rounded-2xl flex flex-col items-center justify-center p-2 transition-all relative ${
                selectedCategories.includes('cat-peperoncini')
                  ? 'border-2 border-[#47387e] bg-white/50 shadow-sm'
                  : 'border border-[#b8abec] bg-[#ece7ff]/40 hover:bg-white/30'
              }`}
            >
              <CategoryIcon type="peperoncini" size={44} />
              <span className="text-[10px] font-medium text-[#47387e] mt-1">
                Intenso
              </span>
              {selectedCategories.includes('cat-peperoncini') && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#f6be4f]" />
              )}
            </button>

            {/* Spirale */}
            <button
              type="button"
              onClick={() => toggleCategory('cat-spirale')}
              className={`aspect-square rounded-2xl flex flex-col items-center justify-center p-2 transition-all relative ${
                selectedCategories.includes('cat-spirale')
                  ? 'border-2 border-[#47387e] bg-white/50 shadow-sm'
                  : 'border border-[#b8abec] bg-[#ece7ff]/40 hover:bg-white/30'
              }`}
            >
              <CategoryIcon type="spirale" size={44} />
              <span className="text-[10px] font-medium text-[#47387e] mt-1">
                Lucido
              </span>
              {selectedCategories.includes('cat-spirale') && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#f6be4f]" />
              )}
            </button>

            {/* Lucciole */}
            <button
              type="button"
              onClick={() => toggleCategory('cat-lucciole')}
              className={`aspect-square rounded-2xl flex flex-col items-center justify-center p-2 transition-all relative ${
                selectedCategories.includes('cat-lucciole')
                  ? 'border-2 border-[#47387e] bg-white/50 shadow-sm'
                  : 'border border-[#b8abec] bg-[#ece7ff]/40 hover:bg-white/30'
              }`}
            >
              <CategoryIcon type="lucciole" size={44} />
              <span className="text-[10px] font-medium text-[#47387e] mt-1">
                Etereo
              </span>
              {selectedCategories.includes('cat-lucciole') && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#f6be4f]" />
              )}
            </button>
          </div>
        </div>

        {/* Feature 3: Posta / Note con Freccia Su */}
        <div className="pt-1">
          <div className="flex items-center justify-between gap-3 bg-white/40 border border-[#b8abec]/80 rounded-2xl px-3.5 py-2 focus-within:bg-white/70 transition-colors">
            <input
              type="text"
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              placeholder="Posta o aggiungi una riflessione..."
              onKeyDown={(e) => {
                if (e.key === 'Enter') handlePost();
              }}
              className="flex-1 bg-transparent text-[#47387e] text-base placeholder-[#6e5ba8]/60 outline-none"
            />

            <div className="flex items-center gap-2">
              <span className="text-base text-[#47387e] font-medium select-none">
                Posta
              </span>
              <button
                type="button"
                onClick={handlePost}
                disabled={saveMutation.isPending}
                aria-label="Pubblica sogno"
                className="w-9 h-9 rounded-full bg-[#47387e] hover:bg-[#362569] text-white flex items-center justify-center shadow-sm active:scale-90 transition-transform disabled:opacity-50"
              >
                {saveMutation.isPending ? (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4"
                  >
                    <line x1="12" y1="19" x2="12" y2="5" />
                    <polyline points="5 12 12 5 19 12" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Also export as DreamCardScreen for direct compatibility
export const DreamCardScreen = DreamCardModal;
