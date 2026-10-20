import React, { useEffect, useState } from 'react';
import { StarMascot } from '../illustrations/StarMascot';

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 4;
      });
    }, 45);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      const timeout = setTimeout(() => {
        onComplete();
      }, 400);
      return () => clearTimeout(timeout);
    }
  }, [progress, onComplete]);

  return (
    <div
      onClick={onComplete}
      className="relative w-full h-full bg-[#503789] flex flex-col items-center justify-between pt-10 pb-8 px-6 text-white select-none cursor-pointer overflow-hidden transition-all duration-500"
    >
      {/* Subtle night sparkles in background */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-[18%] left-[22%] w-1.5 h-1.5 bg-[#ffd147] rounded-full animate-ping" />
        <div className="absolute top-[28%] right-[18%] w-2 h-2 bg-[#ffd147] rounded-full animate-pulse" />
        <div className="absolute bottom-[24%] left-[16%] w-1.5 h-1.5 bg-[#ffd147] rounded-full opacity-60" />
        <div className="absolute bottom-[35%] right-[25%] w-2 h-2 bg-[#ffd147] rounded-full animate-ping" />
      </div>

      {/* Top spacing */}
      <div className="w-full flex justify-end items-center pt-2">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onComplete();
          }}
          className="text-xs text-white/60 hover:text-white/90 bg-white/10 hover:bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full transition-colors font-medium tracking-wide"
        >
          Salta caricamento &rarr;
        </button>
      </div>

      {/* Center Mascot (Exact replica of Screen 1) */}
      <div className="flex flex-col items-center justify-center my-auto transform transition-transform hover:scale-105">
        <div className="relative">
          {/* Subtle warm halo glow */}
          <div className="absolute -inset-6 rounded-full bg-[#f6be4f]/20 blur-xl animate-pulse-glow" />
          <StarMascot size={130} animate={true} />
        </div>
      </div>

      {/* Bottom Loading Progress & Cue */}
      <div className="w-full max-w-[240px] flex flex-col items-center gap-3 pb-6">
        <div className="w-full bg-white/15 h-1.5 rounded-full overflow-hidden backdrop-blur-sm">
          <div
            className="bg-[#f6be4f] h-full rounded-full transition-all duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-xs text-white/70 font-medium tracking-wide flex items-center gap-1.5">
          <span>Risveglio dei ricordi...</span>
          <span className="text-[#f6be4f] font-semibold">{Math.min(100, Math.round(progress))}%</span>
        </p>
        <span className="text-[11px] text-white/40 tracking-wider">Tocca per iniziare</span>
      </div>
    </div>
  );
};
