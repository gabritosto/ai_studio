import React from 'react';

interface CategoryIconProps {
  type: 'peperoncini' | 'spirale' | 'lucciole';
  className?: string;
  size?: number;
}

export const CategoryIcon: React.FC<CategoryIconProps> = ({
  type,
  className = '',
  size = 48,
}) => {
  if (type === 'peperoncini') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        {/* Left Chili */}
        <path
          d="M20 18 C14 26 12 36 22 46 C24 48 26 47 25 45 C18 36 21 28 26 22 Z"
          fill="#47387E"
        />
        <circle cx="21" cy="18" r="2.2" fill="#F6BE4F" />

        {/* Center-Bottom Curved Chili */}
        <path
          d="M25 48 C34 49 42 42 45 32 C45 30 43 31 41 33 C34 40 28 42 22 46 Z"
          fill="#47387E"
        />
        <circle cx="22" cy="48" r="2.2" fill="#F6BE4F" />

        {/* Right Standing Chili */}
        <path
          d="M34 16 C42 18 46 28 41 38 C40 40 42 39 44 36 C48 26 44 18 36 15 Z"
          fill="#47387E"
        />
        <circle cx="35" cy="16" r="2.2" fill="#F6BE4F" />
      </svg>
    );
  }

  if (type === 'spirale') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        {/* Hypnotic Swirl in #47387E */}
        <path
          d="M32 32
             m -3, 0
             a 3,3 0 0,1 6,0
             a 6,6 0 0,1 -12,0
             a 9,9 0 0,1 18,0
             a 12,12 0 0,1 -24,0
             a 15,15 0 0,1 30,0
             a 18,18 0 0,1 -36,0"
          stroke="#47387E"
          strokeWidth="3.2"
          strokeLinecap="round"
          fill="none"
        />
        {/* Center Golden Core */}
        <circle cx="32" cy="32" r="3" fill="#F6BE4F" />
      </svg>
    );
  }

  // Lucciole / Swarm of glowing droplets
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Cluster of glowing purple droplets with tiny yellow tips */}
      <g fill="#47387E">
        <ellipse cx="20" cy="22" rx="4" ry="2.2" transform="rotate(-15 20 22)" />
        <ellipse cx="32" cy="18" rx="4.5" ry="2.4" transform="rotate(5 32 18)" />
        <ellipse cx="44" cy="23" rx="4" ry="2.2" transform="rotate(25 44 23)" />

        <ellipse cx="16" cy="32" rx="4.2" ry="2.2" transform="rotate(-30 16 32)" />
        <ellipse cx="28" cy="29" rx="4.5" ry="2.4" transform="rotate(-5 28 29)" />
        <ellipse cx="38" cy="28" rx="4.5" ry="2.4" transform="rotate(15 38 28)" />
        <ellipse cx="48" cy="33" rx="4.2" ry="2.2" transform="rotate(20 48 33)" />

        <ellipse cx="22" cy="40" rx="4.5" ry="2.4" transform="rotate(-20 22 40)" />
        <ellipse cx="33" cy="38" rx="4.8" ry="2.5" transform="rotate(0 33 38)" />
        <ellipse cx="43" cy="42" rx="4.5" ry="2.4" transform="rotate(25 43 42)" />

        <ellipse cx="24" cy="48" rx="3.5" ry="2" transform="rotate(-10 24 48)" />
        <ellipse cx="35" cy="47" rx="3.8" ry="2.2" transform="rotate(10 35 47)" />
      </g>
      {/* Golden tips */}
      <g fill="#F6BE4F">
        <circle cx="23" cy="21" r="1.3" />
        <circle cx="36" cy="18" r="1.3" />
        <circle cx="47" cy="24" r="1.3" />
        <circle cx="19" cy="30" r="1.3" />
        <circle cx="32" cy="28" r="1.3" />
        <circle cx="42" cy="29" r="1.3" />
        <circle cx="51" cy="34" r="1.3" />
        <circle cx="26" cy="39" r="1.3" />
        <circle cx="37" cy="38" r="1.3" />
        <circle cx="46" cy="43" r="1.3" />
      </g>
    </svg>
  );
};
