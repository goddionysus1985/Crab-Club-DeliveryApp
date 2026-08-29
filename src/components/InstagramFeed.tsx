import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Heart, MessageCircle } from 'lucide-react';
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
      img: 'https://img.postershop.me/21253/a038f8cf-e48f-4318-8f83-e18e0ba53123_image.png',
      title: 'Філадельфія Мікс Сет з норвезьким лососем',
      likes: 184,
      comments: 24
    },
    {
      img: 'https://img.postershop.me/21253/5666f7f6-da5d-4f18-a6d1-4475cb39a1d1_image.png',
      title: 'Неаполітанська піца 4 Сири з печі',
      likes: 142,
      comments: 19
    },
    {
      img: 'https://img.postershop.me/21253/a87beee2-cfa9-4a00-b6f7-41808605ee88_image.png',
      title: 'Фірмовий Сет Запечений Дракон',
      likes: 215,
      comments: 31
    },
    {
      img: 'https://img.postershop.me/21253/6315ee51-872f-4ee9-b4cb-7eeffb9f9ff4_image.png',
      title: 'Хрусткий суші-бургер з тигровою креветкою',
      likes: 167,
      comments: 22
    },
    {
      img: 'https://img.postershop.me/21253/c2805fe1-c917-43cf-be6a-05dd6052be14_image.png',
      title: 'Преміум Бургер Crab Club з соковитою яловичиною',
      likes: 198,
      comments: 28
    },
    {
      img: 'https://img.postershop.me/21253/0baefd0e-26f5-47e1-8848-00569768652c_image.png',
      title: 'WOK-локшина удон з дарами моря',
      likes: 153,
      comments: 16
    }
  ];

  return (
    <section className="py-14 sm:py-20 relative overflow-hidden bg-[#0A0A0E] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-amber-500/10 border border-pink-500/30 text-pink-300 text-xs font-bold uppercase tracking-widest mb-2">
              <InstagramIcon className="w-3.5 h-3.5 text-pink-400" />
              <span>@crab_club.ovi</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight">
              Слідкуйте за нами в Instagram
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1 font-light">
              Реальні фото страв, ексклюзивні акції та новинки ресторану в Овідіополі
            </p>
          </div>

          <motion.a
            whileTap={{ scale: 0.95 }}
            href={RESTAURANT_INFO.socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-pink-600/20 hover:opacity-95 transition-opacity shrink-0"
          >
            <InstagramIcon className="w-4 h-4" />
            <span>@crab_club.ovi</span>
            <ArrowUpRight className="w-4 h-4" />
          </motion.a>
        </div>

        {/* Real Instagram Posts Gallery Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {posts.map((post, idx) => (
            <motion.a
              key={idx}
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              href={RESTAURANT_INFO.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-3xl overflow-hidden bg-[#161622] border border-white/[0.08] shadow-lg"
            >
              <img
                src={post.img}
                alt={post.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
              />

              {/* Instagram Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3.5 text-center">
                <div className="flex justify-end">
                  <div className="p-1.5 rounded-full bg-white/20 backdrop-blur-md text-white">
                    <InstagramIcon className="w-3.5 h-3.5" />
                  </div>
                </div>

                <div>
                  <p className="text-[11px] font-semibold text-white line-clamp-2 mb-2 leading-tight">
                    {post.title}
                  </p>
                  <div className="flex items-center justify-center gap-3 text-xs font-bold text-pink-300">
                    <span className="flex items-center gap-1">
                      <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500" />
                      {post.likes}
                    </span>
                    <span className="flex items-center gap-1 text-zinc-200">
                      <MessageCircle className="w-3.5 h-3.5" />
                      {post.comments}
                    </span>
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  );
};
