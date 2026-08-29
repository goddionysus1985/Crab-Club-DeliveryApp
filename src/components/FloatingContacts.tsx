import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  Send, 
  MessageCircle, 
  ArrowUp, 
  ShoppingBag,
  Sparkles 
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { RESTAURANT_INFO } from '../data/menuData';

const InstagramIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

export const FloatingContacts: React.FC = () => {
  const { totalItemsCount, total, setIsCartOpen } = useCart();
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isFabOpen, setIsFabOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Mobile Floating Sticky Bottom Cart Bar (if items in cart) */}
      {totalItemsCount > 0 && (
        <div className="fixed bottom-3 inset-x-3 z-40 lg:hidden">
          <button
            onClick={() => setIsCartOpen(true)}
            className="w-full py-3.5 px-5 rounded-2xl luxury-button-ruby text-white font-bold text-sm shadow-2xl flex items-center justify-between border border-white/20 animate-in slide-in-from-bottom-4"
          >
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <ShoppingBag className="w-5 h-5" />
                <span className="absolute -top-2 -right-2 bg-amber-400 text-slate-950 text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                  {totalItemsCount}
                </span>
              </div>
              <span>Оформити замовлення</span>
            </div>

            <div className="flex items-center gap-1.5 font-display font-extrabold text-base text-amber-300">
              <span>{total} ₴</span>
            </div>
          </button>
        </div>
      )}

      {/* Floating Speed Dial on Right */}
      <div className={`fixed right-4 z-30 flex flex-col items-end gap-2.5 transition-all ${
        totalItemsCount > 0 ? 'bottom-20 lg:bottom-6' : 'bottom-6'
      }`}>
        {/* Back to top */}
        {showBackToTop && (
          <button
            onClick={scrollToTop}
            aria-label="Вгору"
            className="p-3 rounded-full bg-black/60 hover:bg-black/90 text-slate-300 hover:text-white backdrop-blur-md border border-white/10 shadow-lg transition-all"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        )}

        {/* Messenger Icons */}
        {isFabOpen && (
          <div className="flex flex-col gap-2 animate-in slide-in-from-bottom-2 duration-200">
            <a
              href={RESTAURANT_INFO.socials.telegram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Telegram"
              className="p-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white shadow-lg border border-white/20 transition-transform hover:scale-110 flex items-center justify-center"
            >
              <Send className="w-4 h-4" />
            </a>

            <a
              href={RESTAURANT_INFO.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="p-3 rounded-full bg-gradient-to-tr from-purple-600 to-pink-600 hover:opacity-90 text-white shadow-lg border border-white/20 transition-transform hover:scale-110 flex items-center justify-center"
            >
              <InstagramIcon className="w-4 h-4" />
            </a>

            <a
              href={`tel:${RESTAURANT_INFO.phone_raw}`}
              aria-label="Дзвінок"
              className="p-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg border border-white/20 transition-transform hover:scale-110 flex items-center justify-center"
            >
              <Phone className="w-4 h-4" />
            </a>
          </div>
        )}

        {/* FAB Toggle Button */}
        <button
          onClick={() => setIsFabOpen(!isFabOpen)}
          aria-label="Швидкий зв'язок"
          className="p-3.5 rounded-full bg-gradient-to-tr from-crab-600 to-amber-500 text-white shadow-xl shadow-crab-600/30 hover:scale-105 transition-all border border-white/20 flex items-center justify-center"
        >
          <MessageCircle className="w-5 h-5" />
        </button>
      </div>
    </>
  );
};
