import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus, Heart, Flame, Crown, Leaf, Eye } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCardComponent: React.FC<ProductCardProps> = ({ product }) => {
  const { 
    addToCart, 
    updateQuantity, 
    cart, 
    toggleFavorite, 
    isFavorite, 
    setActiveProductModal 
  } = useCart();

  const isFav = isFavorite(product.id);
  const hasModifiers = product.modifications && product.modifications.length > 0;

  // Find in cart
  const cartItem = cart.find(item => item.product.id === product.id && (!item.selectedOptions || item.selectedOptions.length === 0));
  const quantityInCart = cartItem ? cartItem.quantity : 0;

  const handleAddClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasModifiers) {
      setActiveProductModal(product);
    } else {
      addToCart(product, 1);
    }
  };

  const handleIncrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (cartItem) {
      updateQuantity(cartItem.id, cartItem.quantity + 1);
    } else {
      addToCart(product, 1);
    }
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (cartItem) {
      updateQuantity(cartItem.id, cartItem.quantity - 1);
    }
  };

  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', damping: 25, stiffness: 350 }}
      onClick={() => setActiveProductModal(product)}
      className="apple-card apple-card-hover rounded-2xl sm:rounded-3xl overflow-hidden flex flex-col justify-between cursor-pointer group relative cv-auto touch-manipulation"
    >
      {/* Image Container with Badges */}
      <div className="relative aspect-square w-full overflow-hidden bg-[#14141E]">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          decoding="async"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://img.postershop.me/21253/9bda5f7a-ec24-4f25-8d03-a2fe71732418_image.png';
          }}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Dark subtle overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E16] via-transparent to-black/20 opacity-90" />

        {/* Favorite Button with Spring Tap */}
        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(product.id);
          }}
          aria-label="В обране"
          className="absolute top-2 right-2 sm:top-3 sm:right-3 p-1.5 sm:p-2 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-xl border border-white/10 text-white transition-colors z-10 shadow-md"
        >
          <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isFav ? 'fill-crab-500 text-crab-500' : 'text-zinc-300'}`} />
        </motion.button>

        {/* Badges Container */}
        <div className="absolute top-2 left-2 sm:top-3 sm:left-3 flex flex-col gap-1 z-10">
          {product.chef_choice && (
            <span className="inline-flex items-center gap-0.5 sm:gap-1 px-1.5 py-0.5 rounded-md sm:rounded-lg bg-purple-600/90 text-white text-[8px] sm:text-[10px] font-extrabold uppercase tracking-wider backdrop-blur-xl shadow-md border border-white/10">
              <Crown className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              <span>Шеф</span>
            </span>
          )}

          {product.popular && (
            <span className="inline-flex items-center gap-0.5 sm:gap-1 px-1.5 py-0.5 rounded-md sm:rounded-lg bg-amber-400 text-slate-950 text-[8px] sm:text-[10px] font-black uppercase tracking-wider backdrop-blur-xl shadow-md">
              <Flame className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              <span>Хіт</span>
            </span>
          )}

          {product.is_spicy && (
            <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md sm:rounded-lg bg-red-600/90 text-white text-[8px] sm:text-[10px] font-bold uppercase tracking-wider backdrop-blur-xl shadow-md border border-white/10">
              <span>🌶️</span>
            </span>
          )}

          {product.is_vegetarian && (
            <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md sm:rounded-lg bg-emerald-600/90 text-white text-[8px] sm:text-[10px] font-bold uppercase tracking-wider backdrop-blur-xl shadow-md border border-white/10">
              <Leaf className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
            </span>
          )}
        </div>

        {/* Weight Tag */}
        {product.weight && (
          <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 px-2 py-0.5 rounded-md sm:rounded-lg bg-black/60 backdrop-blur-xl border border-white/10 text-zinc-300 text-[9px] sm:text-[11px] font-medium tracking-wide">
            {product.weight}
          </div>
        )}

        {/* Quick View Hover Icon */}
        <div className="hidden sm:block absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-white/20 backdrop-blur-xl p-1.5 rounded-xl text-white shadow-md">
          <Eye className="w-4 h-4" />
        </div>
      </div>

      {/* Product Info */}
      <div className="p-2.5 sm:p-4 flex flex-col flex-1 justify-between">
        <div>
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="text-[9px] sm:text-[11px] font-semibold text-zinc-400 uppercase tracking-wider truncate">
              {product.category_name}
            </span>
            {hasModifiers && (
              <span className="text-[8px] sm:text-[10px] text-amber-300 bg-amber-500/10 px-1 py-0.5 rounded border border-amber-500/20 shrink-0 font-medium">
                Опції
              </span>
            )}
          </div>

          <h3 className="font-bold text-xs sm:text-base text-zinc-100 group-hover:text-amber-300 transition-colors line-clamp-1 mb-1">
            {product.name}
          </h3>

          {product.ingredients && (
            <p className="text-[11px] text-zinc-400 line-clamp-2 leading-relaxed mb-2 font-light hidden sm:block">
              {product.ingredients}
            </p>
          )}
        </div>

        {/* Price & Action Button */}
        <div className="pt-2 sm:pt-3 border-t border-white/[0.06] flex items-center justify-between gap-1 sm:gap-2 mt-auto">
          <div className="flex flex-col">
            <span className="text-sm sm:text-xl font-display font-extrabold text-white tracking-tight">
              {product.price} <span className="text-xs sm:text-sm font-semibold text-amber-400">₴</span>
            </span>
          </div>

          {quantityInCart > 0 && !hasModifiers ? (
            <div
              onClick={(e) => e.stopPropagation()}
              className="flex items-center bg-[#1D1D2B] border border-white/10 rounded-xl sm:rounded-2xl p-0.5 sm:p-1 gap-0.5 sm:gap-1 shadow-inner"
            >
              <motion.button
                whileTap={{ scale: 0.85 }}
                onClick={handleDecrement}
                aria-label="Зменшити"
                className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg sm:rounded-xl bg-white/5 hover:bg-white/15 text-zinc-200 flex items-center justify-center transition-colors"
              >
                <Minus className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </motion.button>
              <span className="font-bold text-xs sm:text-sm text-white px-1 min-w-[16px] text-center">
                {quantityInCart}
              </span>
              <motion.button
                whileTap={{ scale: 0.85 }}
                onClick={handleIncrement}
                aria-label="Збільшити"
                className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg sm:rounded-xl apple-button-primary text-white flex items-center justify-center transition-colors"
              >
                <Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </motion.button>
            </div>
          ) : (
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={handleAddClick}
              aria-label="Додати до кошика"
              className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl text-[11px] sm:text-sm font-bold shadow-md transition-all ${
                hasModifiers
                  ? 'apple-button-secondary text-white'
                  : 'apple-button-primary text-white'
              }`}
            >
              <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>{hasModifiers ? 'Опції' : '+'}</span>
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export const ProductCard = memo(ProductCardComponent);
