import React from 'react';
import { motion } from 'framer-motion';

/**
 * 🐟 Swimming Fish with Rising Micro-Bubbles
 * Used for Sushi, Rolls, Seafood & Crab categories
 */
export const SwimmingFishAnimation: React.FC<{ size?: number; className?: string }> = ({ 
  size = 18, 
  className = "" 
}) => {
  return (
    <div className={`relative inline-flex items-center justify-center select-none ${className}`} style={{ width: size + 10, height: size }}>
      {/* 🫧 Floating Micro-Bubbles */}
      <motion.span
        initial={{ y: 2, x: 2, opacity: 0, scale: 0.4 }}
        animate={{ 
          y: [-1, -12, -20], 
          x: [2, 0, 3],
          opacity: [0, 0.85, 0],
          scale: [0.4, 0.9, 0.6]
        }}
        transition={{ 
          duration: 2.2, 
          repeat: Infinity, 
          ease: 'easeOut',
          delay: 0.2
        }}
        className="absolute -top-1 right-1 w-1.5 h-1.5 rounded-full bg-cyan-300/80 pointer-events-none shadow-[0_0_4px_rgba(34,211,238,0.8)]"
      />
      <motion.span
        initial={{ y: 2, x: -1, opacity: 0, scale: 0.3 }}
        animate={{ 
          y: [0, -10, -16], 
          x: [-1, 2, -2],
          opacity: [0, 0.7, 0],
          scale: [0.3, 0.7, 0.4]
        }}
        transition={{ 
          duration: 1.8, 
          repeat: Infinity, 
          ease: 'easeOut',
          delay: 1.1
        }}
        className="absolute -top-0.5 right-2.5 w-1 h-1 rounded-full bg-sky-200/70 pointer-events-none shadow-[0_0_3px_rgba(56,189,248,0.7)]"
      />

      {/* 🐟 Smooth Swimming Fish SVG */}
      <motion.div
        animate={{
          x: [-2, 3, -1, 2, -2],
          y: [1, -2, 1.5, -1, 1],
          rotate: [-4, 5, -3, 4, -4],
        }}
        transition={{
          duration: 3.2,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="shrink-0 flex items-center justify-center"
      >
        <svg 
          width={size} 
          height={size} 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="text-cyan-400 drop-shadow-[0_0_6px_rgba(34,211,238,0.5)]"
        >
          {/* Fish Body */}
          <path d="M6.5 12c.94-3.46 4.94-6 8.5-6 3.56 0 6.06 2.54 7 6-.94 3.46-3.44 6-7 6s-7.56-2.54-8.5-6Z" />
          {/* Fish Tail */}
          <motion.path 
            d="M18 12l4-4v8l-4-4" 
            animate={{
              rotate: [-6, 6, -6],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            style={{ transformOrigin: '18px 12px' }}
          />
          {/* Fish Eye */}
          <circle cx="9.5" cy="11.5" r="1" fill="currentColor" />
          {/* Fin */}
          <path d="M12 9c.5-1 1.5-1.5 2.5-1" />
        </svg>
      </motion.div>
    </div>
  );
};

/**
 * 🌾 Swaying Golden Wheat Stalk
 * Used for Pizza, Bakery, Flour & Breakfasts
 */
export const SwayingWheatAnimation: React.FC<{ size?: number; className?: string }> = ({ 
  size = 18, 
  className = "" 
}) => {
  return (
    <div className={`relative inline-flex items-center justify-center select-none ${className}`} style={{ width: size + 4, height: size + 2 }}>
      {/* Golden Breeze Dust */}
      <motion.span
        animate={{
          x: [-4, 8, 14],
          y: [-2, -6, -10],
          opacity: [0, 0.8, 0],
          scale: [0.5, 1, 0.3]
        }}
        transition={{
          duration: 2.8,
          repeat: Infinity,
          ease: 'easeOut',
          delay: 0.4
        }}
        className="absolute top-0 right-0 w-1 h-1 rounded-full bg-amber-300 shadow-[0_0_4px_rgba(252,211,77,0.9)] pointer-events-none"
      />

      {/* Wind Swaying Wheat SVG */}
      <motion.div
        animate={{
          rotate: [-7, 9, -5, 7, -7],
          skewX: [-3, 4, -2, 3, -3]
        }}
        transition={{
          duration: 3.6,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        style={{ transformOrigin: 'bottom center' }}
        className="shrink-0 flex items-center justify-center origin-bottom"
      >
        <svg 
          width={size} 
          height={size + 2} 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="text-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.5)]"
        >
          {/* Main Stem */}
          <path d="M12 22V5" />
          {/* Wheat Grains / Spikelets */}
          <path d="M12 5c-2-1.5-3-3.5-3-5 2 0 3.5 1 4.5 3" />
          <path d="M12 9c-2.5-1-4-3-4-4.5 2 0 3.5 1 4.5 2.5" />
          <path d="M12 9c2.5-1 4-3 4-4.5-2 0-3.5 1-4.5 2.5" />
          <path d="M12 13c-2.5-1-4-3-4-4.5 2 0 3.5 1 4.5 2.5" />
          <path d="M12 13c2.5-1 4-3 4-4.5-2 0-3.5 1-4.5 2.5" />
          <path d="M12 17c-2.5-1-4-3-4-4.5 2 0 3.5 1 4.5 2.5" />
          <path d="M12 17c2.5-1 4-3 4-4.5-2 0-3.5 1-4.5 2.5" />
        </svg>
      </motion.div>
    </div>
  );
};

/**
 * 🔥 Living Flame Shimmer
 * Used for Hot dishes, Grill & WOK
 */
export const LivingFlameAnimation: React.FC<{ size?: number; className?: string }> = ({ 
  size = 18, 
  className = "" 
}) => {
  return (
    <div className={`relative inline-flex items-center justify-center select-none ${className}`} style={{ width: size, height: size }}>
      <motion.div
        animate={{
          scale: [1, 1.12, 0.96, 1.08, 1],
          rotate: [-3, 3, -2, 2, -3],
          opacity: [0.9, 1, 0.85, 1, 0.9]
        }}
        transition={{
          duration: 1.6,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="shrink-0 flex items-center justify-center origin-bottom text-rose-500 drop-shadow-[0_0_7px_rgba(244,63,94,0.6)]"
      >
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2c.5 2.5 2.5 4 4 6 1.8 2.4 2 5.5.5 8-1.7 2.8-5 3.5-7.5 2-3-1.8-3.8-5.8-1.8-8.8 1.2-1.8 2.8-3.2 3.8-5.2.3-.7.7-1.4 1-2z"/>
          <path d="M12 14c-.6 0-1.2.3-1.6.8-.7.9-.5 2.2.4 2.8 1 .7 2.4.4 3-.6.4-.7.3-1.6-.2-2.2-.4-.5-1-.8-1.6-.8z" fill="#FEF08A"/>
        </svg>
      </motion.div>
    </div>
  );
};
