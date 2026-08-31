import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface PreloaderProps {
  onComplete?: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Smooth progress simulation (0 to 100% in ~1.1s)
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsLoaded(true);
            if (onComplete) onComplete();
          }, 250);
          return 100;
        }
        // Organic easing step
        const increment = Math.floor(Math.random() * 18) + 12;
        return Math.min(100, prev + increment);
      });
    }, 90);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            scale: 1.05, 
            filter: 'blur(12px)',
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } 
          }}
          className="fixed inset-0 z-[9999] bg-[#07070B] flex flex-col items-center justify-center overflow-hidden select-none pointer-events-auto"
        >
          {/* Ambient Background Glows */}
          <div className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-crab-600/25 via-amber-500/15 to-transparent blur-[120px] pointer-events-none animate-pulse" />
          <div className="absolute w-[300px] h-[300px] rounded-full bg-blue-600/10 blur-[90px] -bottom-10 pointer-events-none" />

          {/* Centerpiece Logo Box */}
          <div className="relative z-10 flex flex-col items-center text-center px-6 space-y-6 max-w-sm">
            
            {/* Animated Glowing Crab Icon */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="relative"
            >
              {/* Pulsing Aura */}
              <motion.div
                animate={{
                  scale: [1, 1.25, 1],
                  opacity: [0.4, 0.8, 0.4]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2.2,
                  ease: 'easeInOut'
                }}
                className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-crab-600 to-amber-500 blur-2xl -z-10"
              />

              {/* Crab Emblem Card */}
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-br from-[#1E1412] via-[#2A1810] to-[#120D0A] border border-amber-500/40 p-4 flex items-center justify-center shadow-2xl shadow-crab-600/30">
                <svg
                  viewBox="0 0 100 100"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full drop-shadow-[0_0_15px_rgba(255,100,50,0.6)]"
                >
                  {/* Crab Body */}
                  <ellipse cx="50" cy="54" rx="22" ry="17" fill="url(#crab-grad)" />
                  <ellipse cx="50" cy="54" rx="20" ry="15" stroke="#FDBA74" strokeWidth="1" strokeOpacity="0.4" />
                  
                  {/* Shell Texture Accent */}
                  <path d="M42 48Q50 44 58 48" stroke="#FED7AA" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M44 55Q50 52 56 55" stroke="#FED7AA" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />

                  {/* Left Big Claw */}
                  <path
                    d="M32 46C24 38 18 36 12 42C8 46 10 54 18 56C24 58 28 52 32 46Z"
                    fill="url(#crab-claw)"
                  />
                  <path
                    d="M12 42C14 36 20 34 24 36"
                    stroke="#FFEDD5"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />

                  {/* Right Big Claw */}
                  <path
                    d="M68 46C76 38 82 36 88 42C92 46 90 54 82 56C76 58 72 52 68 46Z"
                    fill="url(#crab-claw)"
                  />
                  <path
                    d="M88 42C86 36 80 34 76 36"
                    stroke="#FFEDD5"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />

                  {/* Walking Legs Left */}
                  <path d="M30 58C22 62 18 70 20 78" stroke="#EA580C" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M35 62C28 68 26 76 30 84" stroke="#EA580C" strokeWidth="2.2" strokeLinecap="round" />
                  <path d="M40 65C36 72 36 80 42 86" stroke="#EA580C" strokeWidth="2" strokeLinecap="round" />

                  {/* Walking Legs Right */}
                  <path d="M70 58C78 62 82 70 80 78" stroke="#EA580C" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M65 62C72 68 74 76 70 84" stroke="#EA580C" strokeWidth="2.2" strokeLinecap="round" />
                  <path d="M60 65C64 72 64 80 58 86" stroke="#EA580C" strokeWidth="2" strokeLinecap="round" />

                  {/* Cute Glowing Eyes */}
                  <circle cx="43" cy="38" r="3.5" fill="#FFFFFF" />
                  <circle cx="44" cy="38" r="1.8" fill="#18181B" />
                  <circle cx="57" cy="38" r="3.5" fill="#FFFFFF" />
                  <circle cx="56" cy="38" r="1.8" fill="#18181B" />

                  {/* Eye Stalks */}
                  <path d="M43 45L43 41" stroke="#EA580C" strokeWidth="2" />
                  <path d="M57 45L57 41" stroke="#EA580C" strokeWidth="2" />

                  {/* Gradients */}
                  <defs>
                    <linearGradient id="crab-grad" x1="28" y1="37" x2="72" y2="71" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#F97316" />
                      <stop offset="0.6" stopColor="#EA580C" />
                      <stop offset="1" stopColor="#C2410C" />
                    </linearGradient>
                    <linearGradient id="crab-claw" x1="10" y1="35" x2="35" y2="60" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#FB923C" />
                      <stop offset="1" stopColor="#DC2626" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </motion.div>

            {/* Brand Title */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
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

            {/* Glowing Golden Progress Bar */}
            <div className="w-48 sm:w-56 space-y-2 pt-2">
              <div className="h-1.5 w-full bg-white/[0.08] rounded-full overflow-hidden p-0.5 border border-white/5">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-crab-600 via-amber-400 to-yellow-300 shadow-[0_0_12px_rgba(251,146,60,0.8)]"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: 'easeOut' }}
                />
              </div>
              <div className="flex justify-between items-center text-[10px] font-mono text-zinc-400">
                <span className="tracking-wider">Ініціалізація меню</span>
                <span className="font-bold text-amber-400">{progress}%</span>
              </div>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
