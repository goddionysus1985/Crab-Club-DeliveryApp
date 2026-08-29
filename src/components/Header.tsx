import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Phone, 
  Search, 
  ShoppingBag, 
  Heart, 
  Clock, 
  MapPin, 
  Menu as MenuIcon, 
  X, 
  Sparkles,
  Compass,
  RotateCcw,
  Moon,
  User
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { RESTAURANT_INFO } from '../data/menuData';
import { getRestaurantScheduleStatus } from '../utils/workHours';

export const Header: React.FC = () => {
  const { 
    totalItemsCount, 
    total, 
    setIsCartOpen, 
    setIsSearchOpen, 
    favorites, 
    currentOrder, 
    setIsOrderTrackerOpen,
    orderHistory,
    userProfile,
    setIsProfileOpen
  } = useCart();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scheduleStatus, setScheduleStatus] = useState(getRestaurantScheduleStatus);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Recheck schedule status every minute
    const scheduleInterval = setInterval(() => {
      setScheduleStatus(getRestaurantScheduleStatus());
    }, 60000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(scheduleInterval);
    };
  }, []);

  return (
    <>
      {/* Top Luxury Announcement Bar with Dynamic Live Work Hours Status */}
      <div className={`text-xs font-medium text-white/90 py-1 px-3 sm:px-4 border-b border-white/10 relative z-50 transition-colors ${
        scheduleStatus.badgeType === 'closed' 
          ? 'bg-[#150D1E]' 
          : scheduleStatus.badgeType === 'closing_soon'
          ? 'bg-[#2A1608]'
          : 'bg-[#120508]'
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
            {scheduleStatus.badgeType === 'open' && (
              <span className="flex h-2 w-2 relative shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            )}
            {scheduleStatus.badgeType === 'closing_soon' && (
              <span className="flex h-2 w-2 relative shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
            )}
            {scheduleStatus.badgeType === 'closed' && (
              <Moon className="w-3 h-3 text-purple-400 shrink-0" />
            )}

            <span className={`font-semibold uppercase tracking-wider text-[9px] sm:text-xs truncate ${
              scheduleStatus.badgeType === 'closed'
                ? 'text-purple-300'
                : scheduleStatus.badgeType === 'closing_soon'
                ? 'text-amber-300'
                : 'text-amber-300'
            }`}>
              {scheduleStatus.statusText}
            </span>
            <span className="text-white/40 hidden md:inline">|</span>
            <span className="hidden md:inline text-white/80 text-xs">
              ⚡ Безкоштовна доставка від {RESTAURANT_INFO.free_delivery_from} грн
            </span>
            <span className="text-white/40 hidden lg:inline">|</span>
            <span className="hidden lg:inline text-amber-200 text-xs">
              🎁 Знижка 10% на самовивіз
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 text-[10px] sm:text-xs text-white/80 shrink-0">
            <div className="hidden sm:flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>{RESTAURANT_INFO.work_hours}</span>
            </div>
            <div className="flex items-center gap-1 text-slate-300">
              <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-crab-400" />
              <span>{RESTAURANT_INFO.city}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header - Fully Opaque on Mobile, Glass on Desktop */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 bg-[#08080C] sm:bg-[#08080C]/95 sm:backdrop-blur-xl ${
          isScrolled
            ? 'py-2 sm:py-2.5 shadow-2xl border-b border-white/10'
            : 'py-2.5 sm:py-3.5 border-b border-white/[0.08]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo & Brand */}
          <div className="flex items-center gap-2 sm:gap-3">
            <a href="#" className="flex items-center gap-2 sm:gap-3 group">
              <div className="relative flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-crab-600 via-crab-800 to-black p-0.5 shadow-lg shadow-crab-900/40 group-hover:scale-105 transition-transform shrink-0">
                <img
                  src={RESTAURANT_INFO.logo_icon}
                  alt="Crab Club"
                  className="w-full h-full object-contain rounded-[10px] p-0.5 sm:p-1"
                />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <span className="font-display font-black text-base sm:text-xl tracking-wider text-white group-hover:text-amber-400 transition-colors whitespace-nowrap">
                    CRAB CLUB
                  </span>
                  <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[9px] font-bold tracking-widest bg-amber-500/10 text-amber-400 border border-amber-500/20 uppercase">
                    Premium
                  </span>
                </div>
                <span className="text-[9px] sm:text-[10px] tracking-widest text-zinc-400 uppercase font-medium whitespace-nowrap">
                  Delivery & Restaurant
                </span>
              </div>
            </a>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-zinc-300">
            <a href="#menu" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
              <span>Меню</span>
            </a>
            <a href="#delivery" className="hover:text-amber-400 transition-colors">
              Доставка
            </a>
            <a href="#about" className="hover:text-amber-400 transition-colors">
              Про нас
            </a>
            <a href="#reviews" className="hover:text-amber-400 transition-colors">
              Відгуки
            </a>
            <a href="#contacts" className="hover:text-amber-400 transition-colors">
              Контакти
            </a>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            {/* Active order tracker pill if order exists */}
            {currentOrder && (
              <button
                onClick={() => setIsOrderTrackerOpen(true)}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold hover:bg-emerald-500/20 transition-all animate-pulse"
                title="Відстежити поточне замовлення"
              >
                <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
                <span>Замовлення #{currentOrder.orderNumber}</span>
              </button>
            )}

            {/* Quick Search */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-1.5 p-2 sm:px-3 sm:py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white transition-all text-xs font-medium"
              aria-label="Пошук страви"
            >
              <Search className="w-4 h-4 text-amber-400" />
              <span className="hidden md:inline">Пошук</span>
              <kbd className="hidden md:inline-block px-1.5 py-0.5 text-[10px] bg-black/40 text-zinc-400 rounded border border-white/10">
                ⌘K
              </kbd>
            </button>

            {/* Personal Account / Profile Button */}
            <button
              onClick={() => setIsProfileOpen(true)}
              className="relative p-2 sm:px-3 sm:py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-amber-400 transition-all flex items-center gap-1.5"
              aria-label="Особистий кабінет"
              title="Особистий кабінет та історія замовлень"
            >
              <User className="w-4 h-4 text-amber-400" />
              <span className="hidden xl:inline text-xs font-medium text-zinc-300 hover:text-white max-w-[85px] truncate">
                {userProfile.name || 'Кабінет'}
              </span>
              {orderHistory.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-amber-500 text-slate-950 text-[10px] font-bold flex items-center justify-center ring-2 ring-[#0B0B0F]">
                  {orderHistory.length}
                </span>
              )}
            </button>

            {/* Favorites Icon */}
            <a
              href="#favorites"
              className="relative p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-crab-400 transition-all"
              aria-label="Улюблені страви"
            >
              <Heart className={`w-4 h-4 ${favorites.length > 0 ? 'fill-crab-500 text-crab-500' : ''}`} />
              {favorites.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-crab-600 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-[#0B0B0F]">
                  {favorites.length}
                </span>
              )}
            </a>

            {/* Phone Call Quick Link */}
            <a
              href={`tel:${RESTAURANT_INFO.phone_raw}`}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-zinc-200 hover:text-amber-400 transition-all"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden xl:inline">{RESTAURANT_INFO.phone}</span>
              <span className="xl:hidden">Дзвінок</span>
            </a>

            {/* Cart Button with Spring Bounce Animation on Add */}
            <motion.button
              key={totalItemsCount}
              initial={{ scale: 1 }}
              animate={totalItemsCount > 0 ? { scale: [1, 1.15, 0.95, 1.04, 1] } : {}}
              transition={{ duration: 0.35 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl apple-button-primary text-white font-semibold text-xs sm:text-sm transition-all shadow-md"
              aria-label="Відкрити кошик"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
                {totalItemsCount > 0 && (
                  <motion.span
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', damping: 15, stiffness: 400 }}
                    className="absolute -top-2 -right-2 bg-amber-400 text-slate-950 text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center ring-2 ring-[#0B0B0F]"
                  >
                    {totalItemsCount}
                  </motion.span>
                )}
              </div>
              <span className="hidden xs:inline">
                {total > 0 ? `${total} ₴` : 'Кошик'}
              </span>
            </motion.button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300"
              aria-label="Меню"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-white/10 bg-[#08080C] px-4 py-4 space-y-3 animate-in fade-in slide-in-from-top-4 duration-200">
            <nav className="flex flex-col space-y-2 text-sm font-medium">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsProfileOpen(true);
                }}
                className="px-3.5 py-3 rounded-2xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 flex items-center justify-between text-left border border-amber-500/25"
              >
                <div className="flex items-center gap-2.5">
                  <User className="w-4 h-4 text-amber-400" />
                  <div>
                    <span className="font-bold block text-white text-sm">Особистий кабінет</span>
                    <span className="text-[11px] text-amber-300/80 font-normal">
                      {userProfile.name ? `Гість: ${userProfile.name}` : 'Історія замовлень та мої дані'}
                    </span>
                  </div>
                </div>
                {orderHistory.length > 0 && (
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500 text-slate-950 font-black">
                    {orderHistory.length}
                  </span>
                )}
              </button>

              <a
                href="#menu"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-2xl bg-white/[0.04] text-white flex items-center justify-between border border-white/5"
              >
                <span>🍽️ Меню страв</span>
                <span className="text-xs text-amber-400 font-bold">200+ позицій</span>
              </a>

              <a
                href="#delivery"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-2xl hover:bg-white/5 text-zinc-300"
              >
                🚀 Зони та умови доставки
              </a>
              <a
                href="#about"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-2xl hover:bg-white/5 text-zinc-300"
              >
                👑 Про ресторан Crab Club
              </a>
              <a
                href="#reviews"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-2xl hover:bg-white/5 text-zinc-300"
              >
                ⭐ Відгуки гостей (4.97)
              </a>
              <a
                href="#contacts"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-2xl hover:bg-white/5 text-zinc-300"
              >
                📍 Контакти та графік
              </a>
            </nav>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-zinc-400">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>{RESTAURANT_INFO.work_hours}</span>
              </div>
              <a
                href={`tel:${RESTAURANT_INFO.phone_raw}`}
                className="text-amber-400 font-bold flex items-center gap-1"
              >
                <Phone className="w-3.5 h-3.5" />
                {RESTAURANT_INFO.phone}
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
