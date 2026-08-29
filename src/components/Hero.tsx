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

  return (
    <section className="relative overflow-hidden pt-3 sm:pt-4 pb-8 sm:pb-16 lg:pb-20">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-crab-900/20 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-amber-500/10 blur-[100px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Main Hero Slider Banner */}
        <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-[#12121B] group">
          <div className="relative min-h-[460px] sm:min-h-[480px] lg:min-h-[520px] flex items-center">
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
                  <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-[#0B0B0F] via-[#0B0B0F]/85 sm:via-[#0B0B0F]/75 to-transparent sm:to-black/30" />
                  <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#0B0B0F]/40 to-[#0B0B0F]/90" />
                </div>

                {/* Content Overlay */}
                <div className="relative z-20 max-w-2xl px-5 sm:px-12 py-6 sm:py-10 pb-20 sm:pb-10 flex flex-col items-start w-full">
                  {banner.badge && (
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-3 backdrop-blur-md">
                      <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400" />
                      <span>{banner.badge}</span>
                    </div>
                  )}

                  <h1 className="text-2xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight text-white leading-tight mb-3 sm:mb-4">
                    {banner.title}
                  </h1>

                  <p className="text-xs sm:text-base lg:text-lg text-zinc-300 font-normal leading-relaxed mb-5 sm:mb-8 max-w-xl line-clamp-3 sm:line-clamp-none">
                    {banner.subtitle}
                  </p>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-4 w-full sm:w-auto max-w-xs sm:max-w-none">
                    <a
                      href={banner.link || '#menu'}
                      className="px-5 py-3 sm:px-6 sm:py-3.5 rounded-2xl apple-button-primary text-white font-bold text-xs sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-crab-600/30"
                    >
                      <span>{banner.ctaText || 'Замовити зараз'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>

                    <a
                      href={`tel:${RESTAURANT_INFO.phone_raw}`}
                      className="px-4 py-2.5 sm:px-5 sm:py-3.5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 text-white font-semibold text-xs sm:text-base flex items-center justify-center gap-2 backdrop-blur-md transition-all"
                    >
                      <PhoneCall className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
                      <span>{RESTAURANT_INFO.phone}</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Slider Controls */}
          <div className="absolute bottom-3.5 right-3.5 sm:bottom-6 sm:right-6 z-30 flex items-center gap-2 sm:gap-3 bg-black/40 sm:bg-transparent backdrop-blur-md sm:backdrop-blur-none px-2.5 py-1.5 sm:p-0 rounded-full border border-white/10 sm:border-0 shadow-lg">
            <button
              onClick={prevSlide}
              aria-label="Попередній слайд"
              className="p-1.5 sm:p-2.5 rounded-full bg-black/60 hover:bg-black/80 border border-white/10 text-white backdrop-blur-md transition-all"
            >
              <ChevronLeft className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
            </button>
            <div className="flex items-center gap-1 sm:gap-1.5 px-1 sm:px-2">
              {BANNERS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  aria-label={`Слайд ${i + 1}`}
                  className={`h-1.5 sm:h-2 rounded-full transition-all ${
                    i === currentSlide ? 'w-5 sm:w-8 bg-amber-400' : 'w-1.5 sm:w-2 bg-white/30 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={nextSlide}
              aria-label="Наступний слайд"
              className="p-1.5 sm:p-2.5 rounded-full bg-black/60 hover:bg-black/80 border border-white/10 text-white backdrop-blur-md transition-all"
            >
              <ChevronRight className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* Live Trust Metrics Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 mt-4 sm:mt-6">
          <div className="apple-card p-3.5 sm:p-4 rounded-2xl flex items-center gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
              <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-amber-400" />
            </div>
            <div>
              <div className="text-sm sm:text-lg font-bold text-white flex items-center gap-1">
                <span>4.97</span>
                <span className="text-[10px] sm:text-xs text-amber-400 font-normal">/ 5</span>
              </div>
              <p className="text-[10px] sm:text-xs text-zinc-400">850+ відгуків гостей</p>
            </div>
          </div>

          <div className="apple-card p-3.5 sm:p-4 rounded-2xl flex items-center gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-crab-500/10 border border-crab-500/20 flex items-center justify-center text-crab-400 shrink-0">
              <Truck className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <div className="text-sm sm:text-lg font-bold text-white">45–60 хв</div>
              <p className="text-[10px] sm:text-xs text-zinc-400">Швидка доставка</p>
            </div>
          </div>

          <div className="apple-card p-3.5 sm:p-4 rounded-2xl flex items-center gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <div className="text-sm sm:text-lg font-bold text-white">від 700 ₴</div>
              <p className="text-[10px] sm:text-xs text-zinc-400">Безкоштовна доставка</p>
            </div>
          </div>

          <div className="apple-card p-3.5 sm:p-4 rounded-2xl flex items-center gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
              <Award className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <div className="text-sm sm:text-lg font-bold text-white">-10%</div>
              <p className="text-[10px] sm:text-xs text-zinc-400">Знижка на самовивіз</p>
            </div>
          </div>
        </div>

        {/* Restaurant Advantages Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-3 sm:mt-4">
          {RESTAURANT_INFO.features.map((feature, idx) => (
            <div
              key={idx}
              className="p-3.5 sm:p-4 rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 transition-all duration-300"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-2 h-2 rounded-full bg-crab-500"></span>
                <h3 className="font-bold text-xs sm:text-sm text-zinc-200">{feature.title}</h3>
              </div>
              <p className="text-[11px] sm:text-xs text-zinc-400 leading-relaxed font-light">{feature.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
