import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/menuData';
import { ProductCard } from './ProductCard';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, catalogProducts, catalogCategories } = useCart();
  const [query, setQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setSelectedTag('all');
    }
  }, [isSearchOpen]);

  // Dynamic search suggestions from live Poster menu
  const popularQueries = React.useMemo(() => {
    return catalogProducts.slice(0, 6).map(p => p.name);
  }, [catalogProducts]);

  const filteredProducts = catalogProducts.filter(p => {
    const q = query.toLowerCase().trim();
    const matchesQuery = !q || 
      p.name.toLowerCase().includes(q) || 
      (p.ingredients && p.ingredients.toLowerCase().includes(q)) || 
      p.category_name.toLowerCase().includes(q);

    if (selectedTag === 'all') return matchesQuery;
    return matchesQuery && (p.category_url === selectedTag || p.parent_category_url === selectedTag);
  });

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-3 sm:p-6 overflow-y-auto">
          {/* Backdrop with spring blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            onClick={() => setIsSearchOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Search Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: -20 }}
            transition={{ type: 'spring', damping: 26, stiffness: 320 }}
            className="relative w-full max-w-4xl bg-[#101018] border border-white/[0.12] rounded-3xl overflow-hidden shadow-2xl z-10 my-8 sm:my-12"
          >
            {/* Search Header */}
            <div className="p-4 sm:p-6 border-b border-white/[0.08] flex items-center gap-3 bg-[#13131F]/80 backdrop-blur-xl">
              <Search className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Пошук страви, напою чи інгредієнта..."
                className="w-full bg-transparent text-base sm:text-lg text-white placeholder-zinc-500 focus:outline-none"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="p-1 rounded-xl text-zinc-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsSearchOpen(false)}
                className="p-2 rounded-2xl bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Popular Tags */}
            {popularQueries.length > 0 && (
              <div className="px-4 sm:px-6 py-3 bg-white/[0.02] border-b border-white/[0.04] flex items-center gap-2 overflow-x-auto hide-scrollbar">
                <span className="text-xs text-zinc-400 font-semibold uppercase tracking-wider shrink-0 mr-1">
                  Популярні:
                </span>
                {popularQueries.map((tag, idx) => (
                  <motion.button
                    key={idx}
                    whileTap={{ scale: 0.93 }}
                    onClick={() => setQuery(tag)}
                    className="px-3 py-1 rounded-xl bg-white/5 hover:bg-amber-500/20 hover:text-amber-300 text-zinc-300 text-xs font-medium transition-colors shrink-0"
                  >
                    {tag}
                  </motion.button>
                ))}
              </div>
            )}

            {/* Category Pills */}
            <div className="px-4 sm:px-6 py-2.5 flex items-center gap-2 overflow-x-auto hide-scrollbar border-b border-white/[0.04]">
              <motion.button
                whileTap={{ scale: 0.94 }}
                onClick={() => setSelectedTag('all')}
                className={`px-3 py-1 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                  selectedTag === 'all'
                    ? 'bg-crab-600 text-white font-bold shadow-md'
                    : 'bg-white/5 text-zinc-400 hover:text-white'
                }`}
              >
                Всі результати
              </motion.button>
              {catalogCategories.map((cat) => (
                <motion.button
                  key={cat.id}
                  whileTap={{ scale: 0.94 }}
                  onClick={() => setSelectedTag(cat.slug)}
                  className={`px-3 py-1 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                    selectedTag === cat.slug
                      ? 'bg-crab-600 text-white font-bold shadow-md'
                      : 'bg-white/5 text-zinc-400 hover:text-white'
                  }`}
                >
                  {cat.name}
                </motion.button>
              ))}
            </div>

            {/* Results Container */}
            <div className="p-4 sm:p-6 max-h-[60vh] overflow-y-auto">
              {filteredProducts.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4 text-zinc-500">
                    <Search className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">Нічого не знайдено</h3>
                  <p className="text-sm text-zinc-400 max-w-sm mx-auto font-light">
                    Спробуйте змінити пошуковий запит або перегляньте інші розділи нашого меню.
                  </p>
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs text-zinc-400 font-semibold">
                      Знайдено страв: <strong className="text-amber-400">{filteredProducts.length}</strong>
                    </span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-4">
                    {filteredProducts.slice(0, 24).map(product => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </div>
              )}
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
