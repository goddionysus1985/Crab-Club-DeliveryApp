import React from 'react';
import { 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  Sparkles, 
  Heart,
  ShieldCheck
} from 'lucide-react';
import { RESTAURANT_INFO, CATEGORIES } from '../data/menuData';

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

interface FooterProps {
  onSelectCategory?: (slug: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory }) => {
  const handleCategoryClick = (slug: string) => {
    if (onSelectCategory) {
      onSelectCategory(slug);
    } else {
      const el = document.getElementById(`category-${slug}`) || document.getElementById('menu-nav');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer id="contacts" className="bg-[#07070A] border-t border-white/10 text-slate-400 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-12">
          
          {/* Col 1: Brand Info (2 cols wide on desktop) */}
          <div className="lg:col-span-2 space-y-4">
            <a href="#" className="flex items-center gap-3">
              <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-crab-600 to-black p-0.5 border border-crab-500/30">
                <img
                  src={RESTAURANT_INFO.logo_icon}
                  alt="Crab Club"
                  className="w-full h-full object-contain p-1 rounded-[10px]"
                />
              </div>
              <div>
                <span className="font-display font-black text-xl tracking-wider text-white">
                  CRAB CLUB
                </span>
                <div className="text-[10px] text-amber-400 font-bold uppercase tracking-widest">
                  Premium Delivery
                </div>
              </div>
            </a>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light max-w-sm">
              Гастрономічний ресторан доставки преміум-рівня в смт. Овідіополь. Свіжі суші-сети, хрустка піца з печі, wok-локшина та авторські страви.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={RESTAURANT_INFO.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-pink-600/30 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>

              {RESTAURANT_INFO.socials.tiktok && (
                <a
                  href={RESTAURANT_INFO.socials.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-white/5 hover:bg-cyan-500/30 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
                  aria-label="TikTok"
                >
                  <TikTokIcon className="w-4 h-4" />
                </a>
              )}

              <a
                href={RESTAURANT_INFO.socials.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-blue-600/30 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
                aria-label="Telegram"
              >
                <Send className="w-4 h-4" />
              </a>

              <a
                href={`tel:${RESTAURANT_INFO.phone_raw}`}
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-emerald-600/30 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
                aria-label="Телефон"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Menu Categories */}
          <div>
            <h4 className="font-bold text-sm text-white uppercase tracking-wider mb-4">
              Категорії меню
            </h4>
            <ul className="space-y-2 text-xs">
              {CATEGORIES.slice(0, 6).map((cat) => (
                <li key={cat.id}>
                  <button
                    type="button"
                    onClick={() => handleCategoryClick(cat.slug)}
                    className="hover:text-amber-400 text-left transition-colors cursor-pointer"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: More Categories */}
          <div>
            <h4 className="font-bold text-sm text-white uppercase tracking-wider mb-4">
              Також у меню
            </h4>
            <ul className="space-y-2 text-xs">
              {CATEGORIES.slice(6).map((cat) => (
                <li key={cat.id}>
                  <button
                    type="button"
                    onClick={() => handleCategoryClick(cat.slug)}
                    className="hover:text-amber-400 text-left transition-colors cursor-pointer"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contacts & Schedule */}
          <div>
            <h4 className="font-bold text-sm text-white uppercase tracking-wider mb-4">
              Контакти
            </h4>
            <div className="space-y-3 text-xs">
              <a
                href={`tel:${RESTAURANT_INFO.phone_raw}`}
                className="flex items-center gap-2 text-white font-bold hover:text-amber-400 transition-colors text-sm"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                <span>{RESTAURANT_INFO.phone}</span>
              </a>

              <div className="flex items-start gap-2 text-slate-400">
                <MapPin className="w-4 h-4 text-crab-400 shrink-0 mt-0.5" />
                <span>{RESTAURANT_INFO.address}</span>
              </div>

              <div className="flex items-center gap-2 text-slate-400">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{RESTAURANT_INFO.work_hours}</span>
              </div>

              <div className="pt-2 flex items-center gap-2 text-[11px] text-slate-500">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Оплата онлайн / Термінал / Готівка</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Disclaimer */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} CRAB CLUB. Всі права захищено. Преміум доставка їжі в смт. Овідіополь.
          </div>

          <div className="flex items-center gap-1">
            <span>Зроблено з любов'ю до смачної їжі</span>
            <Heart className="w-3.5 h-3.5 fill-crab-600 text-crab-600" />
          </div>
        </div>

      </div>
    </footer>
  );
};
