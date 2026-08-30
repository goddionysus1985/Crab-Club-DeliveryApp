import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  ChevronRight, 
  ChevronLeft, 
  Star, 
  Clock, 
  ShieldCheck, 
  Flame, 
  Truck, 
  Award,
  ArrowRight,
  PhoneCall
} from 'lucide-react';
import { BANNERS, RESTAURANT_INFO } from '../data/menuData';

export const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % BANNERS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % BANNERS.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + BANNERS.length) % BANNERS.length);

  const scrollToMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    const anchor = document.getElementById('menu-top-anchor') || document.getElementById('menu-nav');
    if (anchor) {
      const headerEl = document.querySelector('header');
      const headerH = headerEl ? headerEl.offsetHeight : 55;
      const targetY = anchor.getBoundingClientRect().top + window.scrollY - headerH;
      window.scrollTo({ top: Math.max(0, targetY), behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden pt-2 sm:pt-4 pb-2 sm:pb-8 lg:pb-12">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-crab-900/20 blur-[130px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Main Hero Slider Banner - Ultra sleek on mobile (170px), rich on desktop (480px) */}
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-[#12121B] group">
          <div className="relative min-h-[175px] sm:min-h-[340px] lg:min-h-[440px] flex items-center">
            {BANNERS.map((banner, index) => (
              <div
                key={banner.id}
                className={`absolute inset-0 transition-all duration-700 ease-out flex items-center ${
                  index === currentSlide
                    ? 'opacity-100 scale-100 z-10'
                    : 'opacity-0 scale-105 pointer-events-none z-0'
                }`}
              >
                {/* Background Image with Dark Gradient Overlays */}
                <div className="absolute inset-0">
                  <img
                    src={banner.image}
                    alt={banner.title}
                    className="w-full h-full object-cover object-center scale-105 group-hover:scale-100 transition-transform duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-[#0B0B0F]/95 via-[#0B0B0F]/75 to-transparent sm:to-black/30" />
                  <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#0B0B0F]/30 to-[#0B0B0F]/80" />
                </div>

                {/* Content Overlay */}
                <div className="relative z-20 max-w-2xl px-4 sm:px-12 py-3 sm:py-8 flex flex-col items-start w-full">
                  {banner.badge && (
                    <div className="inline-flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[9px] sm:text-xs font-bold uppercase tracking-widest mb-1.5 sm:mb-3 backdrop-blur-md">
                      <Sparkles className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-amber-400" />
                      <span>{banner.badge}</span>
                    </div>
                  )}

                  <h1 className="text-base sm:text-3xl lg:text-4xl font-display font-extrabold tracking-tight text-white leading-tight mb-1 sm:mb-3 line-clamp-2 sm:line-clamp-none max-w-md sm:max-w-none">
                    {banner.title}
                  </h1>

                  <p className="text-[11px] sm:text-sm lg:text-base text-zinc-300 font-normal leading-relaxed mb-3 sm:mb-6 max-w-xl line-clamp-1 sm:line-clamp-none hidden xs:block sm:block">
                    {banner.subtitle}
                  </p>

                  <div className="flex items-center gap-2 sm:gap-4 mt-auto sm:mt-0">
                    <button
                      onClick={scrollToMenu}
                      className="px-3.5 py-1.5 sm:px-6 sm:py-3 rounded-xl sm:rounded-2xl apple-button-primary text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-lg shadow-crab-600/30"
                    >
                      <span>{banner.ctaText || 'До меню'}</span>
                      <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </button>

                    <a
                      href={`tel:${RESTAURANT_INFO.phone_raw}`}
                      className="hidden sm:flex px-4 py-2.5 sm:px-5 sm:py-3 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 text-white font-semibold text-xs sm:text-sm items-center justify-center gap-2 backdrop-blur-md transition-all"
                    >
                      <PhoneCall className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
                      <span>{RESTAURANT_INFO.phone}</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Slider Dots Indicator */}
          <div className="absolute bottom-2.5 right-3 sm:bottom-5 sm:right-6 z-30 flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-2 py-1 rounded-full border border-white/10 shadow-lg">
            <button
              onClick={prevSlide}
              aria-label="Попередній слайд"
              className="p-1 rounded-full text-white/80 hover:text-white transition-colors"
            >
              <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
            <div className="flex items-center gap-1 px-1">
              {BANNERS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  aria-label={`Слайд ${i + 1}`}
                  className={`h-1 sm:h-1.5 rounded-full transition-all ${
                    i === currentSlide ? 'w-4 sm:w-6 bg-amber-400' : 'w-1 sm:w-1.5 bg-white/40'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={nextSlide}
              aria-label="Наступний слайд"
              className="p-1 rounded-full text-white/80 hover:text-white transition-colors"
            >
              <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
          </div>
        </div>

        {/* Live Trust Metrics: Horizontal swipeable chips on mobile (36px), 4 cards on desktop */}
        <div className="flex sm:grid sm:grid-cols-4 gap-2 sm:gap-4 mt-2.5 sm:mt-4 overflow-x-auto hide-scrollbar pb-1 sm:pb-0 select-none">
          <div className="apple-card px-3 py-1.5 sm:p-3.5 rounded-xl sm:rounded-2xl flex items-center gap-2 sm:gap-3 shrink-0 whitespace-nowrap">
            <div className="w-6 h-6 sm:w-9 sm:h-9 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
              <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-amber-400" />
            </div>
            <div>
              <div className="text-xs sm:text-base font-bold text-white flex items-center gap-1">
                <span>4.97</span>
                <span className="text-[9px] sm:text-xs text-amber-400 font-normal">★ 850+ відгуків</span>
              </div>
            </div>
          </div>

          <div className="apple-card px-3 py-1.5 sm:p-3.5 rounded-xl sm:rounded-2xl flex items-center gap-2 sm:gap-3 shrink-0 whitespace-nowrap">
            <div className="w-6 h-6 sm:w-9 sm:h-9 rounded-lg bg-crab-500/10 border border-crab-500/20 flex items-center justify-center text-crab-400 shrink-0">
              <Truck className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
            <div>
              <div className="text-xs sm:text-base font-bold text-white">45–60 хв</div>
              <p className="text-[9px] sm:text-xs text-zinc-400 hidden sm:block">Швидка доставка</p>
            </div>
          </div>

          <div className="apple-card px-3 py-1.5 sm:p-3.5 rounded-xl sm:rounded-2xl flex items-center gap-2 sm:gap-3 shrink-0 whitespace-nowrap">
            <div className="w-6 h-6 sm:w-9 sm:h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
            <div>
              <div className="text-xs sm:text-base font-bold text-emerald-400">від 500 ₴ 0 ₴</div>
              <p className="text-[9px] sm:text-xs text-zinc-400 hidden sm:block">Безкоштовна доставка</p>
            </div>
          </div>

          <div className="apple-card px-3 py-1.5 sm:p-3.5 rounded-xl sm:rounded-2xl flex items-center gap-2 sm:gap-3 shrink-0 whitespace-nowrap">
            <div className="w-6 h-6 sm:w-9 sm:h-9 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
              <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
            <div>
              <div className="text-xs sm:text-base font-bold text-amber-300">-10% Самовивіз</div>
              <p className="text-[9px] sm:text-xs text-zinc-400 hidden sm:block">Знижка на самовивіз</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
