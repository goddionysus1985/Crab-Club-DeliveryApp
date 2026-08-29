import React, { useState, useMemo, useEffect, useRef } from 'react';
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
import { Heart, Sparkles } from 'lucide-react';

export const App: React.FC = () => {
  const { favorites } = useCart();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeSubcategory, setActiveSubcategory] = useState<string>('all');
  const [activeFilter, setActiveFilter] = useState<string>('none');
  const [sortBy, setSortBy] = useState<string>('default');

  const isScrollingProgrammatically = useRef(false);
  const scrollTimeoutRef = useRef<number | null>(null);

  // Smooth scroll handler with offset for sticky header & nav
  const handleSelectCategory = (slug: string) => {
    setActiveCategory(slug);
    setActiveSubcategory('all');

    isScrollingProgrammatically.current = true;
    if (scrollTimeoutRef.current) {
      window.clearTimeout(scrollTimeoutRef.current);
    }

    if (slug === 'all') {
      const menuEl = document.getElementById('menu-nav');
      if (menuEl) {
        const headerEl = document.querySelector('header');
        const headerH = headerEl ? headerEl.offsetHeight : 65;
        const targetY = menuEl.getBoundingClientRect().top + window.scrollY - headerH - 10;
        window.scrollTo({ top: Math.max(0, targetY), behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      const targetSection = document.getElementById(`category-${slug}`);
      if (targetSection) {
        const headerEl = document.querySelector('header');
        const navEl = document.getElementById('menu-nav');
        const headerH = headerEl ? headerEl.offsetHeight : 65;
        const navH = navEl ? navEl.offsetHeight : 70;
        const totalOffset = headerH + navH + 12;

        const targetY = targetSection.getBoundingClientRect().top + window.scrollY - totalOffset;
        window.scrollTo({ top: Math.max(0, targetY), behavior: 'smooth' });
      }
    }

    scrollTimeoutRef.current = window.setTimeout(() => {
      isScrollingProgrammatically.current = false;
    }, 850);
  };

  const handleSelectSubcategory = (subSlug: string) => {
    setActiveSubcategory(subSlug);
    if (activeCategory !== 'all') {
      const targetSection = document.getElementById(`category-${activeCategory}`);
      if (targetSection) {
        const headerEl = document.querySelector('header');
        const navEl = document.getElementById('menu-nav');
        const headerH = headerEl ? headerEl.offsetHeight : 65;
        const navH = navEl ? navEl.offsetHeight : 70;
        const totalOffset = headerH + navH + 12;

        const targetY = targetSection.getBoundingClientRect().top + window.scrollY - totalOffset;
        window.scrollTo({ top: Math.max(0, targetY), behavior: 'smooth' });
      }
    }
  };

  // ScrollSpy based on real viewport bounding boxes
  useEffect(() => {
    const handleScroll = () => {
      if (isScrollingProgrammatically.current) return;

      const headerEl = document.querySelector('header');
      const navEl = document.getElementById('menu-nav');
      const headerH = headerEl ? headerEl.offsetHeight : 65;
      const navH = navEl ? navEl.offsetHeight : 70;
      const triggerThreshold = headerH + navH + 50;

      let currentSlug = 'all';

      // Check if user is above the menu
      if (navEl && navEl.getBoundingClientRect().top > triggerThreshold) {
        if (activeCategory !== 'all') {
          setActiveCategory('all');
        }
        return;
      }

      // Check categories from bottom to top or by distance
      for (const cat of CATEGORIES) {
        const el = document.getElementById(`category-${cat.slug}`);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= triggerThreshold + 60 && rect.bottom > triggerThreshold - 40) {
            currentSlug = cat.slug;
            break;
          }
        }
      }

      if (currentSlug !== activeCategory) {
        setActiveCategory(currentSlug);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeCategory]);

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
        onSelectCategory={handleSelectCategory}
        activeSubcategory={activeSubcategory}
        onSelectSubcategory={handleSelectSubcategory}
        activeFilter={activeFilter}
        onSelectFilter={setActiveFilter}
        sortBy={sortBy}
        onSelectSort={setSortBy}
      />

      {/* Main Menu Catalog Section */}
      <main id="menu" className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16">
        
        {/* Favorites Section (if any saved) */}
        {favoriteProducts.length > 0 && (
          <section id="favorites" className="p-6 rounded-3xl bg-gradient-to-r from-crab-950/40 via-[#13131D] to-[#13131D] border border-crab-500/20 scroll-mt-44">
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

        {/* All Categories Rendered Continuously */}
        <div className="space-y-16">
          {CATEGORIES.map(category => {
            let catProducts = PRODUCTS.filter(p => 
              p.category_url === category.slug || 
              p.parent_category_url === category.slug || 
              category.subcategories.some(s => s.slug === p.category_url)
            );

            // If subcategory is selected within this active category
            if (activeCategory === category.slug && activeSubcategory !== 'all') {
              catProducts = catProducts.filter(p => p.category_url === activeSubcategory);
            }

            const filtered = processProductsList(catProducts);
            if (filtered.length === 0) return null;

            return (
              <section
                key={category.id}
                id={`category-${category.slug}`}
                className="scroll-mt-44"
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
