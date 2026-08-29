import React from 'react';
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
  Layers
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
    <div id="menu" className="sticky top-[69px] z-30 bg-[#0B0B0F]/95 backdrop-blur-xl border-b border-white/10 pt-3 pb-3 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
        
        {/* Main Categories Bar */}
        <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar py-1">
          <button
            onClick={() => {
              onSelectCategory('all');
              onSelectSubcategory('all');
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all shrink-0 ${
              activeCategory === 'all'
                ? 'bg-crab-600 text-white shadow-lg shadow-crab-600/30'
                : 'bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/5'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Всі страви</span>
          </button>

          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.slug;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  onSelectCategory(cat.slug);
                  onSelectSubcategory('all');
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all shrink-0 ${
                  isActive
                    ? 'bg-crab-600 text-white shadow-lg shadow-crab-600/30 scale-[1.02]'
                    : 'bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/5'
                }`}
              >
                {getCategoryIcon(cat.icon)}
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Subcategories (if current category has any) */}
        {subcategories.length > 0 && (
          <div className="flex items-center gap-1.5 overflow-x-auto hide-scrollbar py-0.5 border-t border-white/5 pt-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-1">
              Розділи:
            </span>
            <button
              onClick={() => onSelectSubcategory('all')}
              className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all shrink-0 ${
                activeSubcategory === 'all'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
            >
              Всі в категорії
            </button>
            {subcategories.map((sub) => {
              const isSubActive = activeSubcategory === sub.slug;
              return (
                <button
                  key={sub.id}
                  onClick={() => onSelectSubcategory(sub.slug)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all shrink-0 ${
                    isSubActive
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                  }`}
                >
                  {sub.name}
                </button>
              );
            })}
          </div>
        )}

        {/* Preference Filters & Sort Row */}
        <div className="flex items-center justify-between gap-3 overflow-x-auto hide-scrollbar pt-1">
          {/* Quick Filters */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => onSelectFilter(activeFilter === 'popular' ? 'none' : 'popular')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeFilter === 'popular'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold'
                  : 'bg-white/5 text-slate-400 hover:text-slate-200 border border-white/5'
              }`}
            >
              <FlameKindling className="w-3.5 h-3.5 text-amber-400" />
              <span>Хіти 🔥</span>
            </button>

            <button
              onClick={() => onSelectFilter(activeFilter === 'chef' ? 'none' : 'chef')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeFilter === 'chef'
                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 font-bold'
                  : 'bg-white/5 text-slate-400 hover:text-slate-200 border border-white/5'
              }`}
            >
              <Crown className="w-3.5 h-3.5 text-purple-400" />
              <span>Шеф рекомендує 👑</span>
            </button>

            <button
              onClick={() => onSelectFilter(activeFilter === 'spicy' ? 'none' : 'spicy')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeFilter === 'spicy'
                  ? 'bg-red-500/20 text-red-300 border border-red-500/40 font-bold'
                  : 'bg-white/5 text-slate-400 hover:text-slate-200 border border-white/5'
              }`}
            >
              <span>Гостре 🌶️</span>
            </button>

            <button
              onClick={() => onSelectFilter(activeFilter === 'veg' ? 'none' : 'veg')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeFilter === 'veg'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold'
                  : 'bg-white/5 text-slate-400 hover:text-slate-200 border border-white/5'
              }`}
            >
              <Leaf className="w-3.5 h-3.5 text-emerald-400" />
              <span>Веган 🌱</span>
            </button>
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 shrink-0">
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400 hidden sm:inline" />
            <select
              value={sortBy}
              onChange={(e) => onSelectSort(e.target.value)}
              className="bg-[#14141E] border border-white/10 text-slate-300 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-amber-400 cursor-pointer"
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
