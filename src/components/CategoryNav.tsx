import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  ChevronRight,
  X,
  Check
} from 'lucide-react';
import { Category } from '../types';
import { CATEGORIES } from '../data/menuData';
import { 
  SwimmingFishAnimation, 
  SwayingWheatAnimation, 
  LivingFlameAnimation 
} from './animations/MenuAmbientAnimations';

interface CategoryNavProps {
  categories?: Category[];
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
  categories,
  activeCategory,
  onSelectCategory,
  activeSubcategory,
  onSelectSubcategory,
  activeFilter,
  onSelectFilter,
  sortBy,
  onSelectSort,
}) => {
  const categoriesList = categories && categories.length > 0 ? categories : CATEGORIES;
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

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

  // Precise Auto-scroll active pill into center view using getBoundingClientRect
  useEffect(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const activeEl = container.querySelector(`[data-category-slug="${activeCategory}"]`) as HTMLElement;
      if (activeEl) {
        const containerRect = container.getBoundingClientRect();
        const activeRect = activeEl.getBoundingClientRect();
        const currentScroll = container.scrollLeft;
        const relativeLeft = activeRect.left - containerRect.left + currentScroll;
        const targetScroll = relativeLeft - (containerRect.width / 2) + (activeRect.width / 2);

        container.scrollTo({
          left: Math.max(0, targetScroll),
          behavior: 'smooth'
        });
        setTimeout(updateScrollArrows, 400);
      }
    }
  }, [activeCategory]);

  const handleArrowScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const amount = direction === 'left' ? -240 : 240;
      scrollContainerRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  // Enable mouse wheel horizontal scrolling over category bar
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (scrollContainerRef.current && Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      scrollContainerRef.current.scrollLeft += e.deltaY;
    }
  };

  const getCategoryIcon = (iconName?: string, slug?: string) => {
    if (slug?.includes('roli') || slug?.includes('moreprodukti') || iconName === 'Fish') {
      return <SwimmingFishAnimation size={16} />;
    }
    if (slug?.includes('pica') || slug?.includes('snidanki') || iconName === 'Pizza') {
      return <SwayingWheatAnimation size={16} />;
    }
    if (slug?.includes('garyachi') || slug?.includes('wok') || iconName === 'Flame') {
      return <LivingFlameAnimation size={16} />;
    }
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

  const currentCategoryObj = categoriesList.find(c => c.slug === activeCategory);
  const subcategories = currentCategoryObj?.subcategories || [];
  const hasActiveFilters = activeFilter !== 'none' || sortBy !== 'default';

  const resetFilters = () => {
    onSelectFilter('none');
    onSelectSort('default');
  };

  return (
    <>
      <div id="menu-nav" className="sticky top-[52px] sm:top-[66px] z-30 bg-[#08080C] sm:bg-[#08080C]/95 sm:backdrop-blur-xl py-2 sm:py-2.5 shadow-2xl border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 space-y-2">
          
          {/* Main Categories Row with Left/Right Navigation Arrows + Filter Button */}
          <div className="relative flex items-center gap-1.5">
            {/* Left Arrow Button */}
            {canScrollLeft && (
              <div className="hidden sm:flex absolute left-0 z-20 items-center pr-4 bg-gradient-to-r from-[#08080C] via-[#08080C]/90 to-transparent h-full">
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
              className="flex-1 flex items-center gap-1.5 overflow-x-auto hide-scrollbar py-0.5 scroll-smooth"
            >
              {/* All items pill */}
              <motion.button
                data-category-slug="all"
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  onSelectCategory('all');
                  onSelectSubcategory('all');
                }}
                className={`relative flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-2xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors shrink-0 ${
                  activeCategory === 'all' ? 'text-white' : 'text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.04]'
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
              {categoriesList.map((cat) => {
                const isActive = activeCategory === cat.slug;
                return (
                  <motion.button
                    key={cat.id}
                    data-category-slug={cat.slug}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      onSelectCategory(cat.slug);
                      onSelectSubcategory('all');
                    }}
                    className={`relative flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-2xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors shrink-0 ${
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
                    {getCategoryIcon(cat.icon, cat.slug)}
                    <span>{cat.name}</span>
                  </motion.button>
                );
              })}
            </div>

            {/* Right Arrow Button */}
            {canScrollRight && (
              <div className="hidden sm:flex absolute right-10 z-20 items-center pl-4 bg-gradient-to-l from-[#08080C] via-[#08080C]/90 to-transparent h-full">
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

            {/* Filter & Sort Modal Trigger Button */}
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() => setIsFilterModalOpen(true)}
              aria-label="Фільтри та сортування"
              className={`relative flex items-center gap-1 px-2.5 sm:px-3 py-2 rounded-xl sm:rounded-2xl border transition-all text-xs font-semibold shrink-0 ${
                hasActiveFilters
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-lg'
                  : 'bg-white/5 hover:bg-white/10 text-zinc-300 border-white/10'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
              <span className="hidden md:inline">Фільтри</span>
              {hasActiveFilters && (
                <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0 animate-pulse" />
              )}
            </motion.button>
          </div>

          {/* Subcategories Row (when selected category has subdivisions) */}
          {subcategories.length > 0 && (
            <div className="flex items-center gap-1.5 overflow-x-auto hide-scrollbar py-0.5 border-t border-white/[0.06] pt-1.5">
              <span className="text-[10px] sm:text-[11px] font-bold text-zinc-500 uppercase tracking-wider shrink-0 mr-1">
                Розділи:
              </span>
              <motion.button
                whileTap={{ scale: 0.94 }}
                onClick={() => onSelectSubcategory('all')}
                className={`px-2.5 sm:px-3 py-1 rounded-xl text-xs font-medium whitespace-nowrap transition-all shrink-0 ${
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
                    className={`px-2.5 sm:px-3 py-1 rounded-xl text-xs font-medium whitespace-nowrap transition-all shrink-0 ${
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

        </div>
      </div>

      {/* Filter & Sort Bottom Sheet / Modal */}
      <AnimatePresence>
        {isFilterModalOpen && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFilterModalOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 30 }}
              transition={{ type: 'spring', damping: 26, stiffness: 320 }}
              className="relative w-full max-w-lg bg-[#111119] border-t sm:border border-white/[0.12] rounded-t-[32px] sm:rounded-3xl overflow-hidden shadow-2xl z-10 mt-auto sm:my-auto max-h-[90vh] flex flex-col"
            >
              {/* Grabber on Mobile */}
              <div className="w-12 h-1.5 bg-white/20 rounded-full mx-auto mt-2.5 mb-1 sm:hidden shrink-0" />

              {/* Header */}
              <div className="p-4 sm:p-5 border-b border-white/[0.08] flex items-center justify-between bg-[#141422]">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-5 h-5 text-amber-400" />
                  <h3 className="font-display font-bold text-lg text-white">Фільтри та сортування</h3>
                </div>
                <button
                  onClick={() => setIsFilterModalOpen(false)}
                  className="p-1.5 rounded-xl text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <div className="p-4 sm:p-6 space-y-6 overflow-y-auto">
                {/* 1. Sorting */}
                <div>
                  <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3">
                    Сортування страв
                  </h4>
                  <div className="grid grid-cols-1 gap-2">
                    {[
                      { id: 'default', label: 'За замовчуванням (рекомендоване)' },
                      { id: 'price_asc', label: 'Спочатку дешевші ₴' },
                      { id: 'price_desc', label: 'Спочатку дорожчі ₴₴' },
                      { id: 'popular', label: 'За популярністю серед гостей' }
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => onSelectSort(opt.id)}
                        className={`flex items-center justify-between p-3 rounded-2xl border text-sm font-medium transition-all text-left ${
                          sortBy === opt.id
                            ? 'bg-amber-500/15 border-amber-500/40 text-amber-300'
                            : 'bg-white/[0.03] border-white/5 text-zinc-300 hover:bg-white/[0.06]'
                        }`}
                      >
                        <span>{opt.label}</span>
                        {sortBy === opt.id && <Check className="w-4 h-4 text-amber-400 shrink-0" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Special Dietary / Food Features Filters */}
                <div>
                  <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3">
                    Особливості та вподобання
                  </h4>
                  <div className="grid grid-cols-2 gap-2.5">
                    {[
                      { id: 'popular', label: 'Хіти продажів', icon: <FlameKindling className="w-4 h-4 text-amber-400" /> },
                      { id: 'chef', label: 'Вибір шефа', icon: <Crown className="w-4 h-4 text-purple-400" /> },
                      { id: 'spicy', label: 'Гострі страви', icon: <span>🌶️</span> },
                      { id: 'veg', label: 'Вегетаріанські', icon: <Leaf className="w-4 h-4 text-emerald-400" /> },
                    ].map((f) => (
                      <button
                        key={f.id}
                        onClick={() => onSelectFilter(activeFilter === f.id ? 'none' : f.id)}
                        className={`flex items-center gap-2 p-3 rounded-2xl border text-xs sm:text-sm font-semibold transition-all text-left ${
                          activeFilter === f.id
                            ? 'bg-crab-600/20 border-crab-500/40 text-white'
                            : 'bg-white/[0.03] border-white/5 text-zinc-300 hover:bg-white/[0.06]'
                        }`}
                      >
                        {f.icon}
                        <span className="truncate">{f.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="p-4 sm:p-5 border-t border-white/[0.08] bg-[#141422] flex items-center gap-3">
                {hasActiveFilters && (
                  <button
                    onClick={resetFilters}
                    className="px-4 py-3 rounded-2xl bg-white/5 hover:bg-white/10 text-xs font-bold text-zinc-300 transition-colors"
                  >
                    Скинути
                  </button>
                )}
                <button
                  onClick={() => setIsFilterModalOpen(false)}
                  className="flex-1 py-3 rounded-2xl apple-button-primary text-white font-bold text-sm text-center shadow-lg"
                >
                  Застосувати
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
