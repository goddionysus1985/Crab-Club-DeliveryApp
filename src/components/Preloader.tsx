import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface PreloaderProps {
  onComplete?: () => void;
}

const ORIGINAL_LOGO_URL = 'https://img.postershop.me/21253/48ff3a5a-f1f0-4892-8331-602d1b6620bb_image.png';

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Elegant intro timing (~900ms) then fade out seamlessly
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onComplete) onComplete();
    }, 900);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            scale: 1.06, 
            filter: 'blur(12px)',
            transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } 
          }}
          className="fixed inset-0 z-[9999] bg-[#07070B] flex flex-col items-center justify-center overflow-hidden select-none pointer-events-auto"
        >
          {/* Ambient Background Glows */}
          <div className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-crab-600/25 via-amber-500/15 to-transparent blur-[120px] pointer-events-none animate-pulse" />
          <div className="absolute w-[300px] h-[300px] rounded-full bg-blue-600/10 blur-[90px] -bottom-10 pointer-events-none" />

          {/* Centerpiece Logo Box */}
          <div className="relative z-10 flex flex-col items-center text-center px-6 space-y-5 max-w-sm">
            
            {/* Animated Glowing Original Logo */}
            <motion.div
              initial={{ scale: 0.82, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="relative"
            >
              {/* Pulsing Aura Behind Logo */}
              <motion.div
                animate={{
                  scale: [1, 1.25, 1],
                  opacity: [0.35, 0.75, 0.35]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  ease: 'easeInOut'
                }}
                className="absolute inset-0 rounded-full bg-gradient-to-tr from-crab-600 to-amber-500 blur-2xl -z-10"
              />

              {/* Original Crab Club Logo Image Container */}
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-gradient-to-br from-[#1A1210] via-[#24150E] to-[#100C09] border border-amber-500/35 p-4 flex items-center justify-center shadow-2xl shadow-crab-600/30 overflow-hidden">
                <img
                  src={ORIGINAL_LOGO_URL}
                  alt="CRAB CLUB Logo"
                  className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(251,146,60,0.5)] transform hover:scale-105 transition-transform"
                />
              </div>
            </motion.div>

            {/* Brand Title */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.45 }}
              className="space-y-1"
            >
              <h1 className="text-2xl sm:text-3xl font-display font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-orange-400 to-amber-300">
                CRAB CLUB
              </h1>
              <p className="text-[11px] uppercase tracking-[0.25em] font-bold text-zinc-400 flex items-center justify-center gap-1.5">
                <Sparkles className="w-3 h-3 text-amber-400 animate-spin" style={{ animationDuration: '4s' }} />
                <span>Преміум доставка • Овідіополь</span>
              </p>
            </motion.div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
