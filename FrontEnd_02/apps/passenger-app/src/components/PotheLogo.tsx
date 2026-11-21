import React from 'react';

interface PotheLogoProps {
  size?: number;
  className?: string;
  showText?: boolean;
}

export const PotheLogo: React.FC<PotheLogoProps> = ({ size = 64, className = '', showText = false }) => {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <svg
        width={size}
        height={size * 1.15}
        viewBox="0 0 100 115"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Bus / Pin Body */}
        <path
          d="M20 20C20 8.9543 28.9543 0 40 0H60C71.0457 0 80 8.9543 80 20V58C80 64.6304 77.3661 70.9893 72.6863 75.669L50 98.3553L27.3137 75.669C22.6339 70.9893 20 64.6304 20 58V20Z"
          fill="#0F7B4F"
        />
        {/* Side Mirrors */}
        <rect x="12" y="24" width="8" height="16" rx="4" fill="#0F7B4F" />
        <rect x="80" y="24" width="8" height="16" rx="4" fill="#0F7B4F" />
        {/* Windshield */}
        <rect x="30" y="16" width="40" height="26" rx="6" fill="#FFFFFF" />
        {/* Pin Hole / Center Dot */}
        <circle cx="50" cy="62" r="8" fill="#FFFFFF" />
      </svg>
      {showText && (
        <div className="text-center mt-2">
          <div className="text-3xl font-black text-slate-900 tracking-tight leading-none">Pothe</div>
          <div className="text-2xl font-black text-slate-800 font-bengali leading-tight">পথে</div>
        </div>
      )}
    </div>
  );
};
