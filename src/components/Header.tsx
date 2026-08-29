import React, { useState, useEffect } from 'react';
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
  Compass
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { RESTAURANT_INFO } from '../data/menuData';

export const Header: React.FC = () => {
  const { 
    totalItemsCount, 
    total, 
    setIsCartOpen, 
    setIsSearchOpen, 
    favorites, 
    currentOrder, 
    setIsOrderTrackerOpen 
  } = useCart();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top Luxury Announcement Bar */}
      <div className="bg-gradient-to-r from-[#900020] via-[#590014] to-[#0B0B0F] text-xs font-medium text-white/90 py-1.5 px-4 border-b border-white/10 relative z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-amber-300 font-semibold uppercase tracking-wider text-[10px] sm:text-xs">
              Онлайн замовлення відкриті
            </span>
            <span className="text-white/40 hidden md:inline">|</span>
            <span className="hidden md:inline text-white/80">
              ⚡ Безкоштовна доставка від {RESTAURANT_INFO.free_delivery_from} грн
            </span>
            <span className="text-white/40 hidden lg:inline">|</span>
            <span className="hidden lg:inline text-amber-200">
              🎁 Знижка 10% на самовивіз
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] sm:text-xs text-white/80">
            <div className="hidden sm:flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>{RESTAURANT_INFO.work_hours}</span>
            </div>
            <div className="flex items-center gap-1 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-crab-400" />
              <span className="truncate max-w-[120px] sm:max-w-none">{RESTAURANT_INFO.city}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Glass Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'glass-header py-2.5 shadow-2xl backdrop-blur-xl'
            : 'bg-[#0B0B0F]/90 backdrop-blur-md py-3.5 border-b border-white/5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <a href="#" className="flex items-center gap-3 group">
              <div className="relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-crab-600 via-crab-800 to-black p-0.5 shadow-lg shadow-crab-900/40 group-hover:scale-105 transition-transform">
                <img
                  src={RESTAURANT_INFO.logo_icon}
                  alt="Crab Club"
                  className="w-full h-full object-contain rounded-[10px] p-1"
                />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-display font-black text-lg sm:text-xl tracking-wider text-white group-hover:text-amber-400 transition-colors">
                    CRAB CLUB
                  </span>
                  <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[9px] font-bold tracking-widest bg-amber-500/10 text-amber-400 border border-amber-500/20 uppercase">
                    Premium
                  </span>
                </div>
                <span className="text-[10px] tracking-widest text-slate-400 uppercase font-medium">
                  Delivery & Restaurant
                </span>
              </div>
            </a>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-300">
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
          <div className="flex items-center gap-2 sm:gap-3">
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
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-all text-xs font-medium"
              aria-label="Пошук страви"
            >
              <Search className="w-4 h-4 text-amber-400" />
              <span className="hidden md:inline">Пошук</span>
              <kbd className="hidden md:inline-block px-1.5 py-0.5 text-[10px] bg-black/40 text-slate-400 rounded border border-white/10">
                ⌘K
              </kbd>
            </button>

            {/* Favorites Icon */}
            <a
              href="#favorites"
              className="relative p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-crab-400 transition-all"
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
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-200 hover:text-amber-400 transition-all"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden xl:inline">{RESTAURANT_INFO.phone}</span>
              <span className="xl:hidden">Дзвінок</span>
            </a>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2.5 px-3 sm:px-4 py-2 rounded-xl luxury-button-ruby text-white font-semibold text-xs sm:text-sm transition-all"
              aria-label="Відкрити кошик"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
                {totalItemsCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-amber-400 text-slate-950 text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center ring-2 ring-[#0B0B0F]">
                    {totalItemsCount}
                  </span>
                )}
              </div>
              <span className="hidden xs:inline">
                {total > 0 ? `${total} ₴` : 'Кошик'}
              </span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300"
              aria-label="Меню"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-white/10 bg-[#0E0E14] px-4 py-4 space-y-3 animate-in fade-in slide-in-from-top-4 duration-200">
            <nav className="flex flex-col space-y-2 text-sm font-medium">
              <a
                href="#menu"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg bg-white/5 text-white flex items-center justify-between"
              >
                <span>🍽️ Меню страв</span>
                <span className="text-xs text-amber-400">200+ позицій</span>
              </a>
              <a
                href="#delivery"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-white/5 text-slate-300"
              >
                🚀 Зони та умови доставки
              </a>
              <a
                href="#about"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-white/5 text-slate-300"
              >
                👑 Про ресторан Crab Club
              </a>
              <a
                href="#reviews"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-white/5 text-slate-300"
              >
                ⭐ Відгуки гостей (4.97)
              </a>
              <a
                href="#contacts"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-white/5 text-slate-300"
              >
                📍 Контакти та графік
              </a>
            </nav>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
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
