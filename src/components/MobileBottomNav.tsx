import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  UtensilsCrossed, 
  Search, 
  ShoppingBag, 
  Heart, 
  User, 
  Sparkles 
} from 'lucide-react';
import { useCart } from '../context/CartContext';

export const MobileBottomNav: React.FC = () => {
  const { 
    totalItemsCount, 
    total,
    setIsCartOpen, 
    setIsSearchOpen, 
    setIsProfileOpen, 
    favorites,
    userProfile
  } = useCart();

  const scrollToMenu = () => {
    const anchor = document.getElementById('menu-top-anchor') || document.getElementById('menu-nav');
    if (anchor) {
      const headerEl = document.querySelector('header');
      const headerH = headerEl ? headerEl.offsetHeight : 55;
      const targetY = anchor.getBoundingClientRect().top + window.scrollY - headerH;
      window.scrollTo({ top: Math.max(0, targetY), behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <nav 
      aria-label="Мобільна навігація"
      className="fixed bottom-0 inset-x-0 z-40 lg:hidden bg-[#0D0D17]/95 backdrop-blur-2xl border-t border-white/[0.08] shadow-[0_-10px_30px_rgba(0,0,0,0.6)] px-2 pt-1.5 pb-safe select-none"
    >
      <div className="grid grid-cols-5 items-center max-w-md mx-auto">
        
        {/* 1. Menu Tab */}
        <motion.button
          whileTap={{ scale: 0.88 }}
          onClick={scrollToMenu}
          className="flex flex-col items-center justify-center py-1.5 text-zinc-400 hover:text-white transition-colors relative"
        >
          <div className="p-1 rounded-xl">
            <UtensilsCrossed className="w-5 h-5 text-crab-400" />
          </div>
          <span className="text-[10px] font-semibold tracking-tight text-zinc-300 mt-0.5">
            Меню
          </span>
        </motion.button>

        {/* 2. Search Tab */}
        <motion.button
          whileTap={{ scale: 0.88 }}
          onClick={() => setIsSearchOpen(true)}
          className="flex flex-col items-center justify-center py-1.5 text-zinc-400 hover:text-white transition-colors relative"
        >
          <div className="p-1 rounded-xl">
            <Search className="w-5 h-5 text-zinc-300" />
          </div>
          <span className="text-[10px] font-semibold tracking-tight text-zinc-300 mt-0.5">
            Пошук
          </span>
        </motion.button>

        {/* 3. Central Cart Tab with Live Counter */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsCartOpen(true)}
          className="flex flex-col items-center justify-center -mt-3 relative"
        >
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg transition-transform ${
            totalItemsCount > 0 
              ? 'apple-button-primary text-white shadow-crab-600/40 scale-105' 
              : 'bg-white/10 text-zinc-300 border border-white/10'
          }`}>
            <ShoppingBag className="w-5 h-5" />
            <AnimatePresence>
              {totalItemsCount > 0 && (
                <motion.span
                  key={totalItemsCount}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ type: 'spring', damping: 15, stiffness: 450 }}
                  className="absolute -top-1 -right-1 bg-amber-400 text-slate-950 text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-md ring-2 ring-[#0D0D17]"
                >
                  {totalItemsCount}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
          <span className="text-[10px] font-bold tracking-tight text-white mt-1">
            {totalItemsCount > 0 ? `${total} ₴` : 'Кошик'}
          </span>
        </motion.button>

        {/* 4. Favorites Tab */}
        <motion.button
          whileTap={{ scale: 0.88 }}
          onClick={() => setIsProfileOpen(true)}
          className="flex flex-col items-center justify-center py-1.5 text-zinc-400 hover:text-white transition-colors relative"
        >
          <div className="p-1 rounded-xl relative">
            <Heart className={`w-5 h-5 ${favorites.length > 0 ? 'text-crab-400 fill-crab-500/30' : 'text-zinc-300'}`} />
            {favorites.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-crab-500 text-white text-[9px] font-black w-3.5 h-3.5 rounded-full flex items-center justify-center">
                {favorites.length}
              </span>
            )}
          </div>
          <span className="text-[10px] font-semibold tracking-tight text-zinc-300 mt-0.5">
            Обране
          </span>
        </motion.button>

        {/* 5. Profile Tab with Bonus preview */}
        <motion.button
          whileTap={{ scale: 0.88 }}
          onClick={() => setIsProfileOpen(true)}
          className="flex flex-col items-center justify-center py-1.5 text-zinc-400 hover:text-white transition-colors relative"
        >
          <div className="p-1 rounded-xl relative">
            <User className="w-5 h-5 text-zinc-300" />
            {userProfile.bonusBalance > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-amber-500 text-slate-950 text-[8px] font-black px-1 rounded-full flex items-center gap-0.5 shadow-sm">
                <Sparkles className="w-2 h-2" />
                {userProfile.bonusBalance}
              </span>
            )}
          </div>
          <span className="text-[10px] font-semibold tracking-tight text-zinc-300 mt-0.5">
            Кабінет
          </span>
        </motion.button>

      </div>
    </nav>
  );
};
