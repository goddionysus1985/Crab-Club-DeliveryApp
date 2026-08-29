import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Coffee, 
  Sparkles, 
  Salad, 
  Flame, 
  Soup, 
  Utensils, 
  Fish, 
  Pizza, 
  Sandwich, 
  Cake, 
  GlassWater,
  SlidersHorizontal,
  FlameKindling,
  Crown,
  Leaf,
  Layers,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Category } from '../types';
import { CATEGORIES } from '../data/menuData';

interface CategoryNavProps {
  activeCategory: string;
  onSelectCategory: (slug: string) => void;
  activeSubcategory: string;
  onSelectSubcategory: (slug: string) => void;
  activeFilter: string;
  onSelectFilter: (filter: string) => void;
  sortBy: string;
  onSelectSort: (sort: string) => void;
}

export const CategoryNav: React.FC<CategoryNavProps> = ({
  activeCategory,
  onSelectCategory,
  activeSubcategory,
  onSelectSubcategory,
  activeFilter,
  onSelectFilter,
  sortBy,
  onSelectSort,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const activeBtnRef = useRef<HTMLButtonElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Check scroll position to show/hide arrows and fade gradients
  const updateScrollArrows = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    updateScrollArrows();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', updateScrollArrows, { passive: true });
      window.addEventListener('resize', updateScrollArrows, { passive: true });
      return () => {
        container.removeEventListener('scroll', updateScrollArrows);
        window.removeEventListener('resize', updateScrollArrows);
      };
    }
  }, []);

  // Auto-scroll active pill into view in horizontal container
  useEffect(() => {
    if (activeBtnRef.current && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const btn = activeBtnRef.current;
      const btnLeft = btn.offsetLeft;
      const btnWidth = btn.offsetWidth;
      const containerWidth = container.offsetWidth;
      const scrollTarget = btnLeft - (containerWidth / 2) + (btnWidth / 2);

      container.scrollTo({
        left: Math.max(0, scrollTarget),
        behavior: 'smooth'
      });
      setTimeout(updateScrollArrows, 350);
    }
  }, [activeCategory]);

  const handleArrowScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const amount = direction === 'left' ? -260 : 260;
      scrollContainerRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  // Enable mouse wheel horizontal scrolling over category bar
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (scrollContainerRef.current && Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      scrollContainerRef.current.scrollLeft += e.deltaY;
    }
  };

  const getCategoryIcon = (iconName?: string) => {
    switch (iconName) {
      case 'Coffee': return <Coffee className="w-4 h-4" />;
      case 'Sparkles': return <Sparkles className="w-4 h-4" />;
      case 'Salad': return <Salad className="w-4 h-4" />;
      case 'Flame': return <Flame className="w-4 h-4" />;
      case 'Soup': return <Soup className="w-4 h-4" />;
      case 'Fish': return <Fish className="w-4 h-4" />;
      case 'Pizza': return <Pizza className="w-4 h-4" />;
      case 'Sandwich': return <Sandwich className="w-4 h-4" />;
      case 'Cake': return <Cake className="w-4 h-4" />;
      case 'GlassWater': return <GlassWater className="w-4 h-4" />;
      default: return <Utensils className="w-4 h-4" />;
    }
  };

  const currentCategoryObj = CATEGORIES.find(c => c.slug === activeCategory);
  const subcategories = currentCategoryObj?.subcategories || [];

  return (
    <div id="menu-nav" className="sticky top-[58px] sm:top-[66px] z-30 apple-glass-nav py-2.5 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-2.5">
        
        {/* Main Categories Row with Left/Right Navigation Arrows */}
        <div className="relative flex items-center">
          {/* Left Arrow Button */}
          {canScrollLeft && (
            <div className="absolute left-0 z-20 flex items-center pr-4 bg-gradient-to-r from-[#08080C] via-[#08080C]/90 to-transparent h-full">
              <motion.button
                whileTap={{ scale: 0.88 }}
                onClick={() => handleArrowScroll('left')}
                aria-label="Прокрутити ліворуч"
                className="w-8 h-8 rounded-full bg-[#181824] hover:bg-[#222234] border border-white/15 text-white flex items-center justify-center shadow-lg transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </motion.button>
            </div>
          )}

          {/* Main Horizontal Categories Bar */}
          <div 
            ref={scrollContainerRef}
            onWheel={handleWheel}
            className="flex-1 flex items-center gap-1.5 overflow-x-auto hide-scrollbar py-1 scroll-smooth cursor-grab active:cursor-grabbing"
          >
            {/* All items pill */}
            <motion.button
              ref={activeCategory === 'all' ? activeBtnRef : null}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                onSelectCategory('all');
                onSelectSubcategory('all');
              }}
              className={`relative flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-2xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors shrink-0 ${
                activeCategory === 'all' ? 'text-white' : 'text-zinc-400 hover:text-zinc-100'
              }`}
            >
              {activeCategory === 'all' && (
                <motion.div
                  layoutId="activeCategoryPill"
                  className="absolute inset-0 bg-gradient-to-r from-crab-600 to-crab-700 rounded-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),0_4px_16px_rgba(225,29,72,0.35)] -z-10"
                  transition={{ type: 'spring', damping: 25, stiffness: 320 }}
                />
              )}
              <Layers className="w-4 h-4" />
              <span>Всі страви</span>
            </motion.button>

            {/* Categories pills */}
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.slug;
              return (
                <motion.button
                  key={cat.id}
                  ref={isActive ? activeBtnRef : null}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    onSelectCategory(cat.slug);
                    onSelectSubcategory('all');
                  }}
                  className={`relative flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-2xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors shrink-0 ${
                    isActive ? 'text-white' : 'text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.04]'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeCategoryPill"
                      className="absolute inset-0 bg-gradient-to-r from-crab-600 to-crab-700 rounded-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),0_4px_16px_rgba(225,29,72,0.35)] -z-10"
                      transition={{ type: 'spring', damping: 25, stiffness: 320 }}
                    />
                  )}
                  {getCategoryIcon(cat.icon)}
                  <span>{cat.name}</span>
                </motion.button>
              );
            })}
          </div>

          {/* Right Arrow Button */}
          {canScrollRight && (
            <div className="absolute right-0 z-20 flex items-center pl-4 bg-gradient-to-l from-[#08080C] via-[#08080C]/90 to-transparent h-full">
              <motion.button
                whileTap={{ scale: 0.88 }}
                onClick={() => handleArrowScroll('right')}
                aria-label="Прокрутити праворуч"
                className="w-8 h-8 rounded-full bg-[#181824] hover:bg-[#222234] border border-white/15 text-white flex items-center justify-center shadow-lg transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            </div>
          )}
        </div>

        {/* Subcategories (if current category has any) */}
        {subcategories.length > 0 && (
          <div className="flex items-center gap-1.5 overflow-x-auto hide-scrollbar py-0.5 border-t border-white/[0.06] pt-2">
            <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider shrink-0 mr-1">
              Розділи:
            </span>
            <motion.button
              whileTap={{ scale: 0.94 }}
              onClick={() => onSelectSubcategory('all')}
              className={`px-3 py-1 rounded-xl text-xs font-medium whitespace-nowrap transition-all shrink-0 ${
                activeSubcategory === 'all'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04]'
              }`}
            >
              Всі в розділі
            </motion.button>
            {subcategories.map((sub) => {
              const isSubActive = activeSubcategory === sub.slug;
              return (
                <motion.button
                  key={sub.id}
                  whileTap={{ scale: 0.94 }}
                  onClick={() => onSelectSubcategory(sub.slug)}
                  className={`px-3 py-1 rounded-xl text-xs font-medium whitespace-nowrap transition-all shrink-0 ${
                    isSubActive
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold'
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04]'
                  }`}
                >
                  {sub.name}
                </motion.button>
              );
            })}
          </div>
        )}

        {/* Preference Filters & Sort Row */}
        <div className="flex items-center justify-between gap-3 overflow-x-auto hide-scrollbar pt-0.5">
          {/* Quick Filters */}
          <div className="flex items-center gap-2 shrink-0">
            <motion.button
              whileTap={{ scale: 0.93 }}
              onClick={() => onSelectFilter(activeFilter === 'popular' ? 'none' : 'popular')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                activeFilter === 'popular'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold'
                  : 'bg-white/[0.04] text-zinc-400 hover:text-zinc-200 border border-white/[0.06]'
              }`}
            >
              <FlameKindling className="w-3.5 h-3.5 text-amber-400" />
              <span>Хіти 🔥</span>
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.93 }}
              onClick={() => onSelectFilter(activeFilter === 'chef' ? 'none' : 'chef')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                activeFilter === 'chef'
                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 font-bold'
                  : 'bg-white/[0.04] text-zinc-400 hover:text-zinc-200 border border-white/[0.06]'
              }`}
            >
              <Crown className="w-3.5 h-3.5 text-purple-400" />
              <span>Шеф рекомендує 👑</span>
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.93 }}
              onClick={() => onSelectFilter(activeFilter === 'spicy' ? 'none' : 'spicy')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                activeFilter === 'spicy'
                  ? 'bg-red-500/20 text-red-300 border border-red-500/40 font-bold'
                  : 'bg-white/[0.04] text-zinc-400 hover:text-zinc-200 border border-white/[0.06]'
              }`}
            >
              <span>Гостре 🌶️</span>
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.93 }}
              onClick={() => onSelectFilter(activeFilter === 'veg' ? 'none' : 'veg')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                activeFilter === 'veg'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold'
                  : 'bg-white/[0.04] text-zinc-400 hover:text-zinc-200 border border-white/[0.06]'
              }`}
            >
              <Leaf className="w-3.5 h-3.5 text-emerald-400" />
              <span>Веган 🌱</span>
            </motion.button>
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 shrink-0">
            <SlidersHorizontal className="w-3.5 h-3.5 text-zinc-500 hidden sm:inline" />
            <select
              value={sortBy}
              onChange={(e) => onSelectSort(e.target.value)}
              className="bg-[#12121A] border border-white/10 text-zinc-300 rounded-xl px-2.5 py-1.5 text-xs focus:outline-none focus:border-amber-400 cursor-pointer shadow-inner"
            >
              <option value="default">За замовчуванням</option>
              <option value="price_asc">Спочатку дешевші</option>
              <option value="price_desc">Спочатку дорожчі</option>
              <option value="popular">За популярністю</option>
            </select>
          </div>
        </div>

      </div>
    </div>
  );
};
