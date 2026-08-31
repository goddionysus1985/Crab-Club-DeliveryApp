import React from 'react';
import { Sparkles, Award, ShieldCheck, HeartHandshake, Flame, Fish, Wheat } from 'lucide-react';

export const StorySection: React.FC = () => {
  const pillars = [
    {
      icon: Fish,
      iconBg: 'bg-crab-600/20 border-crab-500/30 text-crab-400',
      title: '100% Охолоджена риба',
      desc: 'Свіжий норвезький лосось, справжній краб, тигрові креветки та вугор без повторної заморозки.',
      badge: 'Контроль якості',
      badgeIcon: Award
    },
    {
      icon: Wheat,
      iconBg: 'bg-amber-500/20 border-amber-500/30 text-amber-400',
      title: 'Ферментоване тісто 48г',
      desc: 'Авторська неаполітанська піца з борошна Caputo: легка, хрустка та повітряна скоринка.',
      badge: 'Смак Італії',
      badgeIcon: Flame
    },
    {
      icon: ShieldCheck,
      iconBg: 'bg-emerald-500/20 border-emerald-500/30 text-emerald-400',
      title: 'Термобокси & Еко-подача',
      desc: 'Гаряча піца доїжджає гарячою, роли — свіжими та охолодженими у фірмовому пакуванні.',
      badge: 'Дбайлива доставка',
      badgeIcon: HeartHandshake
    }
  ];

  return (
    <section id="about" className="py-10 sm:py-14 relative overflow-hidden bg-[#0A0A10] border-t border-b border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Compact Header */}
        <div className="text-center max-w-2xl mx-auto mb-7">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-300 text-[11px] font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Стандарти якості</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight">
            Чому обирають <span className="ruby-gradient-text">CRAB CLUB</span>
          </h2>
        </div>

        {/* Ultra-Compact 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            const BadgeIcon = item.badgeIcon;
            return (
              <div 
                key={idx}
                className="apple-card p-4 sm:p-5 rounded-2xl border border-white/[0.08] flex flex-col justify-between hover:border-white/20 transition-all"
              >
                <div>
                  <div className="flex items-center gap-3 mb-2.5">
                    <div className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 ${item.iconBg}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-white leading-tight">
                      {item.title}
                    </h3>
                  </div>

                  <p className="text-xs text-zinc-400 leading-relaxed font-light">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-white/[0.06] flex items-center gap-1.5 text-[11px] font-medium text-amber-400">
                  <BadgeIcon className="w-3.5 h-3.5" />
                  <span>{item.badge}</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
