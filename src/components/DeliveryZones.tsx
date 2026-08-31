import React, { useState } from 'react';
import { 
  Truck, 
  Clock, 
  MapPin, 
  Sparkles, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  ShieldCheck 
} from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

export const DeliveryZones: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: 'Який середній час доставки?',
      a: 'По центру Овідіополя доставка зазвичай займає 30-45 хвилин. У прилеглі села та райони — 40-60 хвилин залежно від завантаження кухні.'
    },
    {
      q: 'Як отримати безкоштовну доставку?',
      a: 'Безкоштовна доставка активується автоматично (по Центру — від 500 грн, по Овідіополю — від 1000 грн, по селах — від 2700 грн). На самовивіз діє постійна знижка -10%!'
    },
    {
      q: 'Як зберігається температура гарячих страв?',
      a: 'Ми використовуємо професійні термосумки: піца та бургери доїжджають гарячими, а роли — свіжими та охолодженими.'
    },
    {
      q: 'Способи оплати?',
      a: 'Онлайн на сайті (Apple Pay / Google Pay / Monobank / картка), готівкою кур\'єру або терміналом при отриманні.'
    }
  ];

  return (
    <section id="delivery" className="py-10 sm:py-16 relative overflow-hidden bg-[#0A0A10]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Compact Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-crab-600/15 border border-crab-500/30 text-crab-300 text-[11px] font-bold uppercase tracking-wider mb-2">
            <Truck className="w-3.5 h-3.5 text-crab-400" />
            <span>Тарифи доставки</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight">
            Зони та розцінки доставки
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm text-zinc-400 font-light">
            Швидка доставка щодня з 10:00 до 22:00 (у неділю з 11:00)
          </p>
        </div>

        {/* Ultra-Compact Zones Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
          {RESTAURANT_INFO.delivery_zones.map((zone) => (
            <div
              key={zone.id}
              className="apple-card p-3.5 sm:p-4 rounded-2xl border border-white/[0.08] hover:border-crab-500/30 transition-all flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-7 h-7 rounded-xl bg-crab-600/20 border border-crab-500/30 flex items-center justify-center text-crab-400 shrink-0">
                    <MapPin className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-sm text-white truncate">{zone.zone}</h3>
                    <p className="text-[10px] text-zinc-400 truncate">{zone.description}</p>
                  </div>
                </div>

                <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-semibold text-amber-400 shrink-0">
                  ⏱️ {zone.time}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/[0.06] text-xs">
                <div className="bg-white/[0.02] p-1.5 rounded-xl border border-white/[0.04]">
                  <span className="text-[10px] text-zinc-400 block">Доставка:</span>
                  <span className="font-bold text-white text-sm">{zone.price} ₴</span>
                </div>
                <div className="bg-emerald-500/[0.05] p-1.5 rounded-xl border border-emerald-500/20">
                  <span className="text-[10px] text-zinc-400 block">Безкоштовно:</span>
                  <span className="font-bold text-emerald-400 text-xs">від {zone.freeFromAmount} ₴</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Compact FAQ Accordion */}
        <div className="max-w-2xl mx-auto">
          <div className="space-y-2">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl bg-white/[0.02] border border-white/[0.06] overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-3 sm:p-3.5 text-left flex items-center justify-between gap-3 text-xs sm:text-sm font-semibold text-white hover:text-amber-400 transition-colors"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp className="w-3.5 h-3.5 text-amber-400 shrink-0" /> : <ChevronDown className="w-3.5 h-3.5 text-zinc-400 shrink-0" />}
                  </button>

                  {isOpen && (
                    <div className="px-3 pb-3 sm:px-3.5 sm:pb-3.5 text-xs text-zinc-300 leading-relaxed font-light border-t border-white/5 pt-2">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
