import React, { useState } from 'react';
import { 
  Truck, 
  Clock, 
  MapPin, 
  Sparkles, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  ShieldCheck, 
  PhoneCall 
} from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

export const DeliveryZones: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Який середній час доставки замовлення?',
      a: 'По смт. Овідіополь доставка зазвичай займає 35-45 хвилин. У прилеглі населені пункти (Роксолани, Калаглія) — 45-60 хвилин залежно від завантаження кухні та погодних умов.'
    },
    {
      q: 'Як отримати безкоштовну доставку?',
      a: `Для смт. Овідіополь безкоштовна доставка діє при замовленні від ${RESTAURANT_INFO.free_delivery_from} грн. Також діє постійна знижка 10% на всі замовлення у разі самовивозу!`
    },
    {
      q: 'Як зберігається температура гарячих та холодних страв?',
      a: 'Ми використовуємо професійні термосумки з окремими тепловими відсіками: гаряча піца та бургери залишаються гарячими, а суші та холодні закуски зберігаються при оптимальній прохолодній температурі.'
    },
    {
      q: 'Які способи оплати доступні?',
      a: 'Ви можете сплатити замовлення онлайн на сайті банківською карткою через Apple Pay / Google Pay, готівкою кур\'єру при отриманні або банківською карткою через термінал кур\'єра.'
    }
  ];

  return (
    <section id="delivery" className="py-16 sm:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-crab-600/10 border border-crab-500/25 text-crab-300 text-xs font-bold uppercase tracking-widest mb-3">
            <Truck className="w-3.5 h-3.5 text-crab-400" />
            <span>Швидко & Гаряче</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
            Зони та умови доставки
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-400 font-light">
            Доставляємо ваші улюблені страви щодня з 10:00 до 22:00
          </p>
        </div>

        {/* Zones Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {RESTAURANT_INFO.delivery_zones.map((zone, idx) => (
            <div
              key={idx}
              className="glass-card p-6 sm:p-7 rounded-3xl border border-white/10 relative overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-crab-600/20 border border-crab-500/30 flex items-center justify-center text-crab-400">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <h3 className="font-bold text-lg text-white">{zone.zone}</h3>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-amber-400">
                    {zone.time}
                  </span>
                </div>

                <div className="space-y-2.5 text-xs sm:text-sm text-slate-300 mt-4">
                  <div className="flex justify-between py-1.5 border-b border-white/5">
                    <span className="text-slate-400">Мінімальне замовлення:</span>
                    <span className="font-bold text-white">{zone.min}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-white/5">
                    <span className="text-slate-400">Безкоштовна доставка:</span>
                    <span className="font-bold text-emerald-400">від {zone.free_from}</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-slate-400">Вартість доставки до порогу:</span>
                    <span className="font-semibold text-white">70 ₴</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-2 text-xs text-slate-400">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>Графік: {RESTAURANT_INFO.work_hours}</span>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto mt-12">
          <h3 className="text-xl font-bold text-white text-center mb-6 flex items-center justify-center gap-2">
            <HelpCircle className="w-5 h-5 text-amber-400" />
            <span>Часті запитання про доставку</span>
          </h3>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-white/[0.03] border border-white/5 overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 text-sm sm:text-base font-semibold text-white hover:text-amber-400 transition-colors"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-amber-400 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />}
                  </button>
                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-slate-400 leading-relaxed font-light border-t border-white/5 pt-3">
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
