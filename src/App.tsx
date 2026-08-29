import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CategoryNav } from './components/CategoryNav';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { SearchModal } from './components/SearchModal';
import { OrderTrackerModal } from './components/OrderTrackerModal';
import { StorySection } from './components/StorySection';
import { DeliveryZones } from './components/DeliveryZones';
import { ReviewsSection } from './components/ReviewsSection';
import { InstagramFeed } from './components/InstagramFeed';
import { Footer } from './components/Footer';
import { FloatingContacts } from './components/FloatingContacts';
import { NotificationToast } from './components/NotificationToast';
import { CATEGORIES, PRODUCTS } from './data/menuData';
import { useCart } from './context/CartContext';
import { Product } from './types';
import { Sparkles, Heart, Flame, Layers } from 'lucide-react';

export const App: React.FC = () => {
  const { favorites } = useCart();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeSubcategory, setActiveSubcategory] = useState<string>('all');
  const [activeFilter, setActiveFilter] = useState<string>('none');
  const [sortBy, setSortBy] = useState<string>('default');

  // Filter & Sort helper
  const processProductsList = (list: Product[]) => {
    let result = [...list];

    // Preference filters
    if (activeFilter === 'popular') {
      result = result.filter(p => p.popular);
    } else if (activeFilter === 'chef') {
      result = result.filter(p => p.chef_choice);
    } else if (activeFilter === 'spicy') {
      result = result.filter(p => p.is_spicy);
    } else if (activeFilter === 'veg') {
      result = result.filter(p => p.is_vegetarian);
    }

    // Sort
    if (sortBy === 'price_asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price_desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'popular') {
      result.sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0));
    }

    return result;
  };

  // Get favorite products
  const favoriteProducts = useMemo(() => {
    return PRODUCTS.filter(p => favorites.includes(p.id));
  }, [favorites]);

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0B0F] text-slate-100 selection:bg-crab-600 selection:text-white">
      {/* Header */}
      <Header />

      {/* Main Hero Slider */}
      <Hero />

      {/* Category Navigation Bar */}
      <CategoryNav
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        activeSubcategory={activeSubcategory}
        onSelectSubcategory={setActiveSubcategory}
        activeFilter={activeFilter}
        onSelectFilter={setActiveFilter}
        sortBy={sortBy}
        onSelectSort={setSortBy}
      />

      {/* Main Menu Catalog Section */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16">
        
        {/* Favorites Section (if any saved) */}
        {favoriteProducts.length > 0 && activeCategory === 'all' && (
          <section id="favorites" className="p-6 rounded-3xl bg-gradient-to-r from-crab-950/40 via-[#13131D] to-[#13131D] border border-crab-500/20">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-crab-600/20 text-crab-400">
                  <Heart className="w-5 h-5 fill-crab-500" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-display font-extrabold text-white">
                    Ваші улюблені страви ({favoriteProducts.length})
                  </h2>
                  <p className="text-xs text-slate-400">Швидкий доступ до ваших обраних позицій</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {favoriteProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}

        {/* View Mode 1: Specific Category Selected */}
        {activeCategory !== 'all' ? (
          <section className="space-y-6">
            {(() => {
              const currentCat = CATEGORIES.find(c => c.slug === activeCategory);
              if (!currentCat) return null;

              let catProducts = PRODUCTS.filter(p => {
                const matchesCat = p.category_url === currentCat.slug || 
                  p.parent_category_url === currentCat.slug || 
                  currentCat.subcategories.some(s => s.slug === p.category_url);

                if (!matchesCat) return false;

                if (activeSubcategory !== 'all') {
                  return p.category_url === activeSubcategory;
                }
                return true;
              });

              const filtered = processProductsList(catProducts);

              return (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-crab-600"></span>
                        <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
                          {currentCat.name}
                        </h2>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-400 mt-1">
                        Знайдено: {filtered.length} страв
                      </p>
                    </div>
                  </div>

                  {filtered.length === 0 ? (
                    <div className="text-center py-16 bg-white/[0.02] rounded-3xl border border-white/5">
                      <p className="text-slate-400 text-sm">У цьому розділі немає страв за обраними фільтрами</p>
                      <button
                        onClick={() => { setActiveFilter('none'); setActiveSubcategory('all'); }}
                        className="mt-3 text-xs text-amber-400 underline font-semibold"
                      >
                        Скинути фільтри
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                      {filtered.map(product => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                    </div>
                  )}
                </div>
              );
            })()}
          </section>
        ) : (
          /* View Mode 2: All Categories Stacked with Sections */
          <div className="space-y-16">
            {CATEGORIES.map(category => {
              const catProducts = PRODUCTS.filter(p => 
                p.category_url === category.slug || 
                p.parent_category_url === category.slug || 
                category.subcategories.some(s => s.slug === p.category_url)
              );

              const filtered = processProductsList(catProducts);
              if (filtered.length === 0) return null;

              return (
                <section
                  key={category.id}
                  id={`category-${category.slug}`}
                  className="scroll-mt-36"
                >
                  {/* Category Header */}
                  <div className="flex items-end justify-between border-b border-white/10 pb-4 mb-6">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="w-2.5 h-2.5 rounded-full bg-crab-600"></span>
                        <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                          Розділ меню
                        </span>
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
                        {category.name}
                      </h2>
                    </div>

                    <span className="text-xs text-slate-400 font-medium">
                      {filtered.length} позицій
                    </span>
                  </div>

                  {/* Products Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                    {filtered.map(product => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        )}

      </main>

      {/* Story & Gastronomy Philosophy */}
      <StorySection />

      {/* Delivery Zones & FAQ */}
      <DeliveryZones />

      {/* Guest Reviews */}
      <ReviewsSection />

      {/* Instagram Aesthetic Gallery */}
      <InstagramFeed />

      {/* Footer */}
      <Footer />

      {/* Floating Speed Dials & Contacts */}
      <FloatingContacts />

      {/* Modals & Drawers */}
      <CartDrawer />
      <CheckoutModal />
      <ProductModal />
      <SearchModal />
      <OrderTrackerModal />
      <NotificationToast />

    </div>
  );
};
