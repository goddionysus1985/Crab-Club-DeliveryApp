import React from 'react';
import { Plus, Minus, Heart, Sparkles, Flame, Crown, Leaf, Eye } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
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
    <div
      onClick={() => setActiveProductModal(product)}
      className="glass-card glass-card-hover rounded-2xl overflow-hidden flex flex-col justify-between cursor-pointer group relative"
    >
      {/* Image Container with Badges */}
      <div className="relative aspect-square w-full overflow-hidden bg-[#161622]">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
          onError={(e) => {
            // fallback if poster cdn fails
            (e.target as HTMLElement).style.opacity = '0.7';
          }}
        />

        {/* Dark overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#12121A] via-transparent to-transparent opacity-80" />

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(product.id);
          }}
          aria-label="В обране"
          className="absolute top-3 right-3 p-2 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md border border-white/10 text-white transition-all duration-200 z-10"
        >
          <Heart className={`w-4 h-4 ${isFav ? 'fill-crab-500 text-crab-500' : 'text-slate-300'}`} />
        </button>

        {/* Badges Container */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.chef_choice && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-purple-600/90 text-white text-[10px] font-extrabold uppercase tracking-wider backdrop-blur-md shadow-sm">
              <Crown className="w-3 h-3" />
              <span>Шеф</span>
            </span>
          )}

          {product.popular && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-500/90 text-slate-950 text-[10px] font-black uppercase tracking-wider backdrop-blur-md shadow-sm">
              <Flame className="w-3 h-3" />
              <span>Хіт</span>
            </span>
          )}

          {product.is_spicy && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-red-600/90 text-white text-[10px] font-bold uppercase tracking-wider backdrop-blur-md">
              <span>🌶️ Гостре</span>
            </span>
          )}

          {product.is_vegetarian && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-600/90 text-white text-[10px] font-bold uppercase tracking-wider backdrop-blur-md">
              <Leaf className="w-3 h-3" />
              <span>Веган</span>
            </span>
          )}
        </div>

        {/* Weight Tag */}
        {product.weight && (
          <div className="absolute bottom-3 left-3 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md border border-white/10 text-slate-300 text-[11px] font-medium">
            {product.weight}
          </div>
        )}

        {/* Quick View Hover Icon */}
        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-white/20 backdrop-blur-md p-1.5 rounded-lg text-white">
          <Eye className="w-4 h-4" />
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
        <div>
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider truncate">
              {product.category_name}
            </span>
            {hasModifiers && (
              <span className="text-[10px] text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20 shrink-0 font-medium">
                Опції
              </span>
            )}
          </div>

          <h3 className="font-bold text-sm sm:text-base text-white group-hover:text-amber-300 transition-colors line-clamp-1 mb-1.5">
            {product.name}
          </h3>

          {product.ingredients && (
            <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-3">
              {product.ingredients}
            </p>
          )}
        </div>

        {/* Price & Action Button */}
        <div className="pt-3 border-t border-white/5 flex items-center justify-between gap-2 mt-auto">
          <div className="flex flex-col">
            <span className="text-lg sm:text-xl font-display font-extrabold text-white">
              {product.price} <span className="text-sm font-semibold text-amber-400">₴</span>
            </span>
          </div>

          {quantityInCart > 0 && !hasModifiers ? (
            <div
              onClick={(e) => e.stopPropagation()}
              className="flex items-center bg-[#252535] border border-white/10 rounded-xl p-1 gap-1.5"
            >
              <button
                onClick={handleDecrement}
                aria-label="Зменшити"
                className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/15 text-slate-200 flex items-center justify-center transition-colors"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="font-bold text-xs sm:text-sm text-white px-1">
                {quantityInCart}
              </span>
              <button
                onClick={handleIncrement}
                aria-label="Збільшити"
                className="w-7 h-7 rounded-lg luxury-button-ruby text-white flex items-center justify-center transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={handleAddClick}
              aria-label="Додати до кошика"
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                hasModifiers
                  ? 'bg-white/10 hover:bg-white/20 text-white border border-white/15'
                  : 'luxury-button-ruby text-white'
              }`}
            >
              <Plus className="w-4 h-4" />
              <span>{hasModifiers ? 'Обрати' : 'У кошик'}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
