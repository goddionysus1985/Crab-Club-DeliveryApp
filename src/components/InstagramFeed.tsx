import React from 'react';
import { Sparkles, ArrowUpRight } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

export const InstagramIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

export const InstagramFeed: React.FC = () => {
  const posts = [
    {
      img: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=600&q=80',
      title: 'Преміум Філадельфія Сет'
    },
    {
      img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80',
      title: 'Неаполітанська піца з печі'
    },
    {
      img: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80',
      title: 'Суші-бургер з креветкою'
    },
    {
      img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80',
      title: 'Атмосфера та естетика Crab Club'
    },
    {
      img: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80',
      title: 'Запечені роли з сирною шапочкою'
    },
    {
      img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80',
      title: 'Хрустка 4 Сири'
    }
  ];

  return (
    <section className="py-14 sm:py-20 relative overflow-hidden bg-[#0A0A0E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-crab-600/10 border border-crab-500/25 text-crab-300 text-xs font-bold uppercase tracking-widest mb-2">
              <InstagramIcon className="w-3.5 h-3.5 text-crab-400" />
              <span>@crabclub_ua</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
              Слідкуйте за нами в Instagram
            </h2>
          </div>

          <a
            href={RESTAURANT_INFO.socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-pink-600/20 hover:opacity-90 transition-opacity"
          >
            <InstagramIcon className="w-4 h-4" />
            <span>Підписатися</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {posts.map((post, idx) => (
            <a
              key={idx}
              href={RESTAURANT_INFO.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-2xl overflow-hidden bg-[#161622] border border-white/5"
            >
              <img
                src={post.img}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-3 text-center">
                <InstagramIcon className="w-6 h-6 text-white" />
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
};
