import React from 'react';

export const SynapseLogo = ({ className = "h-8 w-auto", showText = true, textSize = "text-xl" }) => {
  return (
    <div className="flex items-center gap-2.5 select-none cursor-pointer">
      <div className="relative flex items-center justify-center">
        <svg
          className={className}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="synapseGradComp" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b6cf6" />
              <stop offset="100%" stopColor="#1d3cb4" />
            </linearGradient>
            <linearGradient id="accentGradComp" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#3b6cf6" />
            </linearGradient>
          </defs>
          <rect x="10" y="10" width="80" height="80" rx="22" fill="url(#synapseGradComp)" />
          <path d="M30 35 L50 25 L70 35 L70 65 L50 75 L30 65 Z" stroke="white" strokeWidth="3" strokeLinejoin="round" opacity="0.3"/>
          <path d="M30 35 L50 50 L70 35" stroke="url(#accentGradComp)" strokeWidth="4.5" strokeLinecap="round"/>
          <path d="M50 50 L50 75" stroke="url(#accentGradComp)" strokeWidth="4.5" strokeLinecap="round"/>
          <circle cx="50" cy="25" r="5" fill="#38bdf8" />
          <circle cx="30" cy="35" r="4" fill="#ffffff" />
          <circle cx="70" cy="35" r="4" fill="#ffffff" />
          <circle cx="50" cy="50" r="6" fill="#ffffff" />
          <circle cx="30" cy="65" r="4" fill="#ffffff" />
          <circle cx="70" cy="65" r="4" fill="#ffffff" />
          <circle cx="50" cy="75" r="5" fill="#38bdf8" />
        </svg>
      </div>
      {showText && (
        <span className={`font-extrabold tracking-tight ${textSize} text-slate-900 dark:text-white flex items-center`}>
          Synapse<span className="text-brand-600 dark:text-brand-400 ml-0.5">CV</span>
        </span>
      )}
    </div>
  );
};
