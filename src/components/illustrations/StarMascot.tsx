import React from 'react';

interface StarMascotProps {
  className?: string;
  size?: number;
  animate?: boolean;
}

export const StarMascot: React.FC<StarMascotProps> = ({
  className = '',
  size = 120,
  animate = true,
}) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${
        animate ? 'animate-float-gentle' : ''
      } ${className}`}
      style={{ width: size, height: size * 1.35 }}
    >
      <svg
        viewBox="0 0 160 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-sm"
      >
        {/* Legs */}
        <g id="star-legs">
          {/* Left leg */}
          <rect
            x="52"
            y="135"
            width="22"
            height="72"
            rx="4"
            fill="#F6BE4F"
          />
          {/* Right leg */}
          <rect
            x="86"
            y="135"
            width="22"
            height="72"
            rx="4"
            fill="#F6BE4F"
          />
        </g>

        {/* Star Body */}
        {/* 5-pointed cute stylized star with rounded tips and soft waist */}
        <path
          d="M80 8 
             L99 58 
             L152 64 
             L112 102 
             L124 154 
             L80 126 
             L36 154 
             L48 102 
             L8 64 
             L61 58 Z"
          fill="#F6BE4F"
          stroke="#F6BE4F"
          strokeWidth="6"
          strokeLinejoin="round"
        />

        {/* Closed Peaceful Eyes */}
        <g id="eyes" stroke="#3E2D6B" strokeWidth="2.8" strokeLinecap="round">
          {/* Left eye arc */}
          <path d="M58 84 Q66 78 74 84" />
          {/* Left eyelashes */}
          <path d="M60 81 L57 77" strokeWidth="2.2" />
          <path d="M72 81 L75 77" strokeWidth="2.2" />

          {/* Right eye arc */}
          <path d="M86 84 Q94 78 102 84" />
          {/* Right eyelashes */}
          <path d="M88 81 L85 77" strokeWidth="2.2" />
          <path d="M100 81 L103 77" strokeWidth="2.2" />
        </g>

        {/* Gentle Happy Mouth */}
        <path
          d="M74 97 Q80 102 86 97"
          stroke="#3E2D6B"
          strokeWidth="2.8"
          strokeLinecap="round"
          fill="none"
        />

        {/* Soft Cheek Blush */}
        <circle cx="53" cy="94" r="4.5" fill="#ECA938" opacity="0.45" />
        <circle cx="107" cy="94" r="4.5" fill="#ECA938" opacity="0.45" />
      </svg>
    </div>
  );
};
