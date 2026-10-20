import React from 'react';

interface DreamNightSkyProps {
  className?: string;
  showMascot?: boolean;
}

export const DreamNightSky: React.FC<DreamNightSkyProps> = ({
  className = '',
  showMascot = true,
}) => {
  return (
    <div className={`relative w-full aspect-[16/10] flex items-center justify-center overflow-hidden ${className}`}>
      <svg
        viewBox="0 0 320 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-h-[220px]"
      >
        {/* Decorative Golden Stars (Sparkles) */}
        {/* Top Left Star */}
        <path
          d="M60 48 L63 56 L71 59 L63 62 L60 70 L57 62 L49 59 L57 56 Z"
          fill="#F6BE4F"
        />
        {/* Top Right Star */}
        <path
          d="M236 46 L239 53 L246 56 L239 59 L236 66 L233 59 L226 56 L233 53 Z"
          fill="#F6BE4F"
        />
        {/* Bottom Small Star */}
        <path
          d="M198 160 L200 165 L205 167 L200 169 L198 174 L196 169 L191 167 L196 165 Z"
          fill="#F6BE4F"
        />
        {/* Tiny Star near Moon */}
        <path
          d="M156 182 L157.5 186 L161 187 L157.5 188.5 L156 192 L154.5 188.5 L151 187 L154.5 186 Z"
          fill="#F6BE4F"
        />

        {/* Crescent Moon */}
        <g id="moon">
          <path
            d="M88 126
               C76 112 70 85 86 62
               C98 44 116 38 128 37
               C110 45 100 62 102 83
               C104 104 120 120 142 124
               C122 133 100 134 88 126 Z"
            fill="#F6BE4F"
          />
        </g>

        {/* Deep Purple Dream Cloud */}
        {/* Multi-lobed stylized silhouette in #47387E */}
        <path
          d="M48 140 
             C36 140 28 132 30 120 
             C32 110 40 102 52 102 
             C56 90 68 80 84 82 
             C94 72 112 68 128 76 
             C136 68 152 64 166 72 
             C176 68 190 70 198 80 
             C210 78 224 88 226 102 
             C238 106 248 116 244 130 
             C242 140 230 144 220 144 
             L54 144 
             C48 144 48 140 48 140 Z"
          fill="#47387E"
        />

        {/* Lower Cloud Extension */}
        <path
          d="M34 140
             C24 140 20 148 24 156
             C28 164 38 168 52 168
             L130 168
             C136 168 142 162 136 156
             C130 150 120 148 108 148
             L60 148
             C46 148 38 144 34 140 Z"
          fill="#47387E"
        />

        {/* The Star Mascot (embedded on right side) */}
        {showMascot && (
          <g id="mini-star-mascot" transform="translate(162, 106) scale(0.68)">
            {/* Legs */}
            <rect x="52" y="132" width="20" height="64" rx="4" fill="#F6BE4F" />
            <rect x="84" y="132" width="20" height="64" rx="4" fill="#F6BE4F" />

            {/* Star Body */}
            <path
              d="M78 12 
                 L96 60 
                 L146 66 
                 L108 102 
                 L120 150 
                 L78 124 
                 L36 150 
                 L48 102 
                 L10 66 
                 L60 60 Z"
              fill="#F6BE4F"
              stroke="#F6BE4F"
              strokeWidth="5"
              strokeLinejoin="round"
            />

            {/* Peaceful Eyes */}
            <path
              d="M58 84 Q65 79 72 84"
              stroke="#3E2D6B"
              strokeWidth="2.6"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M84 84 Q91 79 98 84"
              stroke="#3E2D6B"
              strokeWidth="2.6"
              strokeLinecap="round"
              fill="none"
            />

            {/* Smile */}
            <path
              d="M74 96 Q78 100 82 96"
              stroke="#3E2D6B"
              strokeWidth="2.6"
              strokeLinecap="round"
              fill="none"
            />
          </g>
        )}
      </svg>
    </div>
  );
};
