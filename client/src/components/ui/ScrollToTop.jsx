import React, { useState, useEffect, useRef } from 'react';
import { ArrowUp } from 'lucide-react';

export const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const circleRef = useRef(null);

  const radius = 20;
  const circumference = radius * 2 * Math.PI;

  useEffect(() => {
    let ticking = false;

    const updateScrollProgress = () => {
      const totalScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      
      // Update visibility using React state (only changes when crossing the 300px threshold)
      if (totalScroll > 300 && !isVisible) {
        setIsVisible(true);
      } else if (totalScroll <= 300 && isVisible) {
        setIsVisible(false);
      }

      // Directly update the SVG circle for buttery smooth 60fps animation without React re-renders
      if (circleRef.current && windowHeight > 0) {
        const scrollPercent = totalScroll / windowHeight;
        const strokeDashoffset = circumference - (scrollPercent * circumference);
        circleRef.current.style.strokeDashoffset = Math.max(0, strokeDashoffset).toString();
      }

      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollProgress);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initialize progress on mount
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isVisible, circumference]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 z-50 p-1.5 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-xl border border-slate-200 dark:border-slate-800 transition-all duration-500 transform hover:scale-110 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-indigo-500 group ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0 pointer-events-none'
      }`}
      aria-label="Scroll to top"
    >
      <div className="relative flex items-center justify-center w-12 h-12">
        {/* Background Circle */}
        <svg className="absolute w-full h-full transform -rotate-90 text-slate-200 dark:text-slate-800" viewBox="0 0 44 44">
          <circle
            cx="22"
            cy="22"
            r={radius}
            strokeWidth="3"
            stroke="currentColor"
            fill="transparent"
          />
        </svg>
        {/* Progress Circle */}
        <svg className="absolute w-full h-full transform -rotate-90 text-indigo-500 dark:text-indigo-400" viewBox="0 0 44 44">
          <circle
            ref={circleRef}
            cx="22"
            cy="22"
            r={radius}
            strokeWidth="3"
            stroke="currentColor"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={circumference}
            strokeLinecap="round"
            // Removed CSS transition here so that the JS requestAnimationFrame drives it perfectly
            style={{ transition: 'none' }}
          />
        </svg>
        {/* Arrow Icon */}
        <ArrowUp className="w-5 h-5 text-slate-600 dark:text-slate-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors z-10" />
      </div>
    </button>
  );
};
