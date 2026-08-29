import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Flame, Sparkles, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/menuData';
import { ProductCard } from './ProductCard';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen } = useCart();
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
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const popularQueries = ['Філадельфія', 'Сет', 'Піца', 'Бургер', 'Лосось', 'Креветка', 'Чізкейк'];

  const filteredProducts = PRODUCTS.filter(p => {
    const q = query.toLowerCase().trim();
    const matchesQuery = !q || 
      p.name.toLowerCase().includes(q) || 
      p.ingredients.toLowerCase().includes(q) || 
      p.category_name.toLowerCase().includes(q);

    if (selectedTag === 'all') return matchesQuery;
    if (selectedTag === 'sushi') return matchesQuery && (p.category_url.includes('roli') || p.category_url.includes('seti'));
    if (selectedTag === 'pizza') return matchesQuery && p.category_url.includes('pica');
    if (selectedTag === 'food') return matchesQuery && (p.category_url.includes('crab-club-food') || p.category_url.includes('burger'));
    if (selectedTag === 'breakfast') return matchesQuery && p.category_url.includes('snidanki');
    return matchesQuery;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        onClick={() => setIsSearchOpen(false)}
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-4xl bg-[#101018] border border-white/15 rounded-3xl overflow-hidden shadow-2xl z-10 my-8 sm:my-12 animate-in zoom-in-95 duration-200">
        
        {/* Search Header */}
        <div className="p-4 sm:p-6 border-b border-white/10 flex items-center gap-3">
          <Search className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Пошук за назвою або інгредієнтом (лосось, трюфель, вугор...)"
            className="w-full bg-transparent text-base sm:text-lg text-white placeholder-slate-500 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-lg text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Popular Tags */}
        <div className="px-4 sm:px-6 py-3 bg-white/[0.02] border-b border-white/5 flex items-center gap-2 overflow-x-auto hide-scrollbar">
          <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider shrink-0 mr-1">
            Популярні запити:
          </span>
          {popularQueries.map((tag, idx) => (
            <button
              key={idx}
              onClick={() => setQuery(tag)}
              className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-amber-500/20 hover:text-amber-300 text-slate-300 text-xs font-medium transition-colors shrink-0"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Category Pills */}
        <div className="px-4 sm:px-6 py-2.5 flex items-center gap-2 overflow-x-auto hide-scrollbar border-b border-white/5">
          {[
            { id: 'all', label: 'Всі результати' },
            { id: 'sushi', label: '🍣 Роли та Сети' },
            { id: 'pizza', label: '🍕 Піца' },
            { id: 'food', label: '🍔 Бургери & WOK' },
            { id: 'breakfast', label: '☕ Сніданки' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTag(tab.id)}
              className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                selectedTag === tab.id
                  ? 'bg-crab-600 text-white font-bold'
                  : 'bg-white/5 text-slate-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Results Container */}
        <div className="p-4 sm:p-6 max-h-[60vh] overflow-y-auto">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4 text-slate-500">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-white mb-1">Нічого не знайдено</h3>
              <p className="text-sm text-slate-400 max-w-sm mx-auto">
                Спробуйте змінити пошуковий запит або перегляньте інші категорії нашого меню.
              </p>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs text-slate-400 font-semibold">
                  Знайдено страв: <strong className="text-amber-400">{filteredProducts.length}</strong>
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProducts.slice(0, 24).map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
