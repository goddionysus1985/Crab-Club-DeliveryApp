import React from 'react';
import { Sparkles, Award, ShieldCheck, HeartHandshake, Flame, Fish, Wheat } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

export const StorySection: React.FC = () => {
  return (
    <section id="about" className="py-16 sm:py-24 relative overflow-hidden bg-[#0C0C12] border-t border-b border-white/5">
      {/* Glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-crab-900/15 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-amber-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-300 text-xs font-bold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Гастрономічна філософія</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
            Чому жителі Овідіополя обирають <span className="ruby-gradient-text">CRAB CLUB</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-400 leading-relaxed font-light">
            Ми створили концепцію преміального ресторану доставки, де кожна страва готується за найвищими стандартами шеф-кухаря: від відбору норвезького лосося до крафтової випічки тіста для піци.
          </p>
        </div>

        {/* 3 Main Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          
          {/* Pillar 1 */}
          <div className="glass-card p-6 sm:p-8 rounded-3xl relative group overflow-hidden border border-white/10">
            <div className="w-14 h-14 rounded-2xl bg-crab-600/20 border border-crab-500/30 flex items-center justify-center text-crab-400 mb-6 group-hover:scale-110 transition-transform">
              <Fish className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">
              100% Охолоджена риба та морепродукти
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed font-light">
              Жодної повторної заморозки. Лише свіжий норвезький лосось преміум-градації, справжній камчатський краб, соковиті тигрові креветки та добірний вугор у соусі унагі.
            </p>
            <div className="mt-6 pt-6 border-t border-white/5 flex items-center gap-2 text-xs font-semibold text-amber-400">
              <Award className="w-4 h-4" />
              <span>Сертифікований контроль якості</span>
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="glass-card p-6 sm:p-8 rounded-3xl relative group overflow-hidden border border-white/10">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-6 group-hover:scale-110 transition-transform">
              <Wheat className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">
              Автентичне ферментоване тісто
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed font-light">
              Наша піца готується на авторському тісті з 48-годинною холодною ферментацією з італійського борошна Caputo. Це робить скоринку неймовірно легкою, хрусткою та повітряною.
            </p>
            <div className="mt-6 pt-6 border-t border-white/5 flex items-center gap-2 text-xs font-semibold text-amber-400">
              <Flame className="w-4 h-4" />
              <span>Справжній неаполітанський смак</span>
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="glass-card p-6 sm:p-8 rounded-3xl relative group overflow-hidden border border-white/10">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">
              Преміальна еко-упаковка & Термобокси
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed font-light">
              Гарячі страви доїжджають з пилу-жару, а суші зберігають ідеальну прохолоду та свіжість. Естетична чорно-золота упаковка робить кожне замовлення справжнім святом.
            </p>
            <div className="mt-6 pt-6 border-t border-white/5 flex items-center gap-2 text-xs font-semibold text-amber-400">
              <HeartHandshake className="w-4 h-4" />
              <span>Дбайлива подача кожної деталі</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
