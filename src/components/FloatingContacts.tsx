import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Phone, 
  Send, 
  MessageCircle, 
  ArrowUp, 
  ShoppingBag, 
  Layers,
  ArrowRight,
  Sparkles 
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { RESTAURANT_INFO } from '../data/menuData';

const InstagramIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const TikTokIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.86 4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-2.04-.52 4.83 4.83 0 0 1-1-.87 4.73 4.73 0 0 1-.58-.87 4.87 4.87 0 0 1-.42-2.26z"/>
  </svg>
);

export const FloatingContacts: React.FC = () => {
  const { totalItemsCount, total, setIsCartOpen, setIsCheckoutOpen } = useCart();
  const [showScrollControls, setShowScrollControls] = useState(false);
  const [isFabOpen, setIsFabOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollControls(window.scrollY > 450);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToMenu = () => {
    const menuEl = document.getElementById('menu-nav');
    if (menuEl) {
      const headerEl = document.querySelector('header');
      const headerH = headerEl ? headerEl.offsetHeight : 55;
      const targetY = menuEl.getBoundingClientRect().top + window.scrollY - headerH - 5;
      window.scrollTo({ top: Math.max(0, targetY), behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* 1. Mobile Floating Sticky Bottom Cart Bar with Apple Spring */}
      <AnimatePresence>
        {totalItemsCount > 0 && (
          <div className="fixed bottom-3 inset-x-3 z-40 lg:hidden">
            <motion.div
              initial={{ opacity: 0, y: 35, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 35, scale: 0.96 }}
              transition={{ type: 'spring', damping: 24, stiffness: 320 }}
            >
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => setIsCartOpen(true)}
                className="w-full py-3.5 px-4 rounded-3xl apple-button-primary text-white font-bold text-sm shadow-2xl flex items-center justify-between border border-white/20 backdrop-blur-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="relative p-1.5 rounded-xl bg-white/20">
                    <ShoppingBag className="w-5 h-5" />
                    <motion.span
                      key={totalItemsCount}
                      initial={{ scale: 0.5 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', damping: 15, stiffness: 400 }}
                      className="absolute -top-2 -right-2 bg-amber-400 text-slate-950 text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center ring-2 ring-[#08080C]"
                    >
                      {totalItemsCount}
                    </motion.span>
                  </div>
                  <div className="text-left">
                    <span className="block text-xs text-white/80 font-normal">
                      {totalItemsCount} {totalItemsCount === 1 ? 'страва' : totalItemsCount < 5 ? 'страви' : 'страв'}
                    </span>
                    <span className="font-bold text-sm text-white">
                      Оформити замовлення
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-display font-black text-base text-amber-300">
                    {total} ₴
                  </span>
                  <div className="p-1 rounded-full bg-white/20">
                    <ArrowRight className="w-4 h-4 text-white" />
                  </div>
                </div>
              </motion.button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 4. Quick Return to Menu Pill + Floating Speed Dial */}
      <div className={`fixed right-3.5 sm:right-6 z-30 flex flex-col items-end gap-2.5 transition-all ${
        totalItemsCount > 0 ? 'bottom-20 lg:bottom-6' : 'bottom-6'
      }`}>
        {/* Quick Jump to Menu Categories Pill */}
        <AnimatePresence>
          {showScrollControls && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: 10 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.8, x: 10 }}
              transition={{ type: 'spring', damping: 22, stiffness: 300 }}
              className="flex flex-col items-end gap-2"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.92 }}
                onClick={scrollToMenu}
                aria-label="До категорій меню"
                className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-[#171724]/90 hover:bg-[#202030] text-zinc-200 hover:text-white backdrop-blur-xl border border-white/15 shadow-xl transition-colors text-xs font-bold"
              >
                <Layers className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">До меню</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.92 }}
                onClick={scrollToTop}
                aria-label="Нагору"
                className="p-2.5 rounded-2xl bg-[#171724]/90 hover:bg-[#202030] text-zinc-300 hover:text-white backdrop-blur-xl border border-white/15 shadow-xl transition-colors"
              >
                <ArrowUp className="w-4 h-4" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Messenger Icons Speed Dial */}
        <AnimatePresence>
          {isFabOpen && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.9 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              className="flex flex-col gap-2"
            >
              <a
                href={RESTAURANT_INFO.socials.telegram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram"
                className="p-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white shadow-lg border border-white/20 transition-transform hover:scale-110 flex items-center justify-center"
              >
                <Send className="w-4 h-4" />
              </a>

              {RESTAURANT_INFO.socials.tiktok && (
                <a
                  href={RESTAURANT_INFO.socials.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  className="p-3 rounded-full bg-zinc-900 hover:bg-black text-cyan-400 shadow-lg border border-white/20 transition-transform hover:scale-110 flex items-center justify-center"
                >
                  <TikTokIcon className="w-4 h-4" />
                </a>
              )}

              <a
                href={RESTAURANT_INFO.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="p-3 rounded-full bg-gradient-to-tr from-purple-600 to-pink-600 hover:opacity-90 text-white shadow-lg border border-white/20 transition-transform hover:scale-110 flex items-center justify-center"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>

              <a
                href={`tel:${RESTAURANT_INFO.phone_raw}`}
                aria-label="Дзвінок"
                className="p-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg border border-white/20 transition-transform hover:scale-110 flex items-center justify-center"
              >
                <Phone className="w-4 h-4" />
              </a>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main FAB Toggle Button */}
        <motion.button
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => setIsFabOpen(!isFabOpen)}
          aria-label="Швидкий зв'язок"
          className="p-3.5 rounded-full bg-gradient-to-tr from-crab-600 to-amber-500 text-white shadow-xl shadow-crab-600/30 border border-white/20 flex items-center justify-center"
        >
          <MessageCircle className="w-5 h-5" />
        </motion.button>
      </div>
    </>
  );
};
