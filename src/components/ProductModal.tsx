import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Heart, 
  Plus, 
  Minus, 
  Check, 
  Flame, 
  Leaf, 
  Crown, 
  Info 
} from 'lucide-react';
import { useCart } from '../context/CartContext';

export const ProductModal: React.FC = () => {
  const { 
    activeProductModal, 
    setActiveProductModal, 
    addToCart, 
    toggleFavorite, 
    isFavorite 
  } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, { name: string; price: number }>>({});
  const [comment, setComment] = useState('');

  const product = activeProductModal;
  const isFav = product ? isFavorite(product.id) : false;

  // Calculate extra cost from modifiers
  const extraCost = Object.values(selectedOptions).reduce((sum, opt) => sum + opt.price, 0);
  const singleUnitPrice = product ? product.price + extraCost : 0;
  const totalPrice = singleUnitPrice * quantity;

  const handleOptionToggle = (groupName: string, optionName: string, optionPrice: number) => {
    setSelectedOptions(prev => {
      const copy = { ...prev };
      if (copy[groupName]?.name === optionName) {
        delete copy[groupName];
      } else {
        copy[groupName] = { name: optionName, price: optionPrice };
      }
      return copy;
    });
  };

  const handleAddToCart = () => {
    if (!product) return;
    const formattedOptions = Object.entries(selectedOptions).map(([group, opt]) => ({
      group_name: group,
      option_name: opt.name,
      price: opt.price
    }));

    addToCart(product, quantity, formattedOptions, comment);
    setActiveProductModal(null);
  };

  return (
    <AnimatePresence>
      {product && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          {/* Backdrop with smooth blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            onClick={() => setActiveProductModal(null)}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Spring Card Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 15 }}
            transition={{ type: 'spring', damping: 26, stiffness: 320 }}
            className="relative w-full max-w-2xl bg-[#111119] border border-white/[0.12] rounded-3xl overflow-hidden shadow-2xl z-10 max-h-[90vh] flex flex-col my-auto"
          >
            {/* Close Button with Spring Tap */}
            <motion.button
              whileTap={{ scale: 0.85 }}
              onClick={() => setActiveProductModal(null)}
              aria-label="Закрити"
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-xl border border-white/10 transition-colors shadow-md"
            >
              <X className="w-5 h-5" />
            </motion.button>

            {/* Scrollable Container */}
            <div className="overflow-y-auto p-0 flex-1">
              {/* Dish Image */}
              <div className="relative aspect-video w-full bg-[#181824] overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111119] via-transparent to-black/30" />

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  {product.chef_choice && (
                    <span className="px-2.5 py-1 rounded-xl bg-purple-600/90 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-xl flex items-center gap-1 border border-white/10 shadow-md">
                      <Crown className="w-3.5 h-3.5" />
                      <span>Шеф-вибір</span>
                    </span>
                  )}
                  {product.popular && (
                    <span className="px-2.5 py-1 rounded-xl bg-amber-400 text-slate-950 text-xs font-black uppercase tracking-wider backdrop-blur-xl flex items-center gap-1 shadow-md">
                      <Flame className="w-3.5 h-3.5" />
                      <span>Хіт</span>
                    </span>
                  )}
                  {product.is_spicy && (
                    <span className="px-2.5 py-1 rounded-xl bg-red-600/90 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-xl border border-white/10 shadow-md">
                      🌶️ Гостре
                    </span>
                  )}
                  {product.is_vegetarian && (
                    <span className="px-2.5 py-1 rounded-xl bg-emerald-600/90 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-xl flex items-center gap-1 border border-white/10 shadow-md">
                      <Leaf className="w-3.5 h-3.5" />
                      <span>Веган</span>
                    </span>
                  )}
                </div>

                {/* Weight */}
                {product.weight && (
                  <div className="absolute bottom-4 left-4 px-3 py-1 rounded-xl bg-black/70 backdrop-blur-xl border border-white/10 text-white text-xs font-semibold">
                    Вага: {product.weight}
                  </div>
                )}

                {/* Favorite toggle */}
                <motion.button
                  whileTap={{ scale: 0.85 }}
                  onClick={() => toggleFavorite(product.id)}
                  aria-label="В обране"
                  className="absolute bottom-4 right-4 p-2.5 rounded-full bg-black/60 hover:bg-black/90 backdrop-blur-xl border border-white/10 text-white transition-all shadow-md"
                >
                  <Heart className={`w-5 h-5 ${isFav ? 'fill-crab-500 text-crab-500' : 'text-zinc-200'}`} />
                </motion.button>
              </div>

              {/* Details */}
              <div className="p-6 sm:p-8 space-y-6">
                <div>
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                    {product.category_name}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white mt-1 tracking-tight">
                    {product.name}
                  </h2>
                </div>

                {/* Ingredients */}
                {product.ingredients && (
                  <div className="bg-white/[0.03] rounded-2xl p-4 border border-white/[0.06]">
                    <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Info className="w-4 h-4 text-amber-400" />
                      <span>Склад та інгредієнти:</span>
                    </h4>
                    <p className="text-sm text-zinc-300 leading-relaxed font-light">
                      {product.ingredients}
                    </p>
                  </div>
                )}

                {/* Modifications (if any) */}
                {product.modifications && product.modifications.length > 0 && (
                  <div className="space-y-4">
                    {product.modifications.map((group) => (
                      <div key={group.group_id} className="space-y-2">
                        <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-wider">
                          {group.group_name}:
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {group.options.map((option) => {
                            const isSelected = selectedOptions[group.group_name]?.name === option.name;
                            return (
                              <motion.button
                                whileTap={{ scale: 0.97 }}
                                key={option.id}
                                type="button"
                                onClick={() => handleOptionToggle(group.group_name, option.name, option.price)}
                                className={`flex items-center justify-between p-3 rounded-2xl border text-xs sm:text-sm font-medium transition-all ${
                                  isSelected
                                    ? 'bg-crab-600/20 border-crab-500 text-white shadow-md'
                                    : 'bg-white/[0.03] border-white/10 text-zinc-300 hover:bg-white/[0.07]'
                                }`}
                              >
                                <div className="flex items-center gap-2">
                                  <div className={`w-4 h-4 rounded-lg border flex items-center justify-center ${
                                    isSelected ? 'bg-crab-600 border-crab-500 text-white' : 'border-white/20'
                                  }`}>
                                    {isSelected && <Check className="w-3 h-3" />}
                                  </div>
                                  <span>{option.name}</span>
                                </div>
                                <span className="text-amber-400 font-bold">
                                  {option.price > 0 ? `+${option.price} ₴` : 'Безкоштовно'}
                                </span>
                              </motion.button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Order Comment for chef */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-zinc-400">
                    Побажання для шеф-кухаря (опціонально):
                  </label>
                  <input
                    type="text"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Наприклад: без цибулі, додатковий соус окремо..."
                    className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-6 bg-[#0D0D15] border-t border-white/[0.08] flex items-center justify-between gap-4">
              {/* Quantity Stepper */}
              <div className="flex items-center bg-[#1D1D2B] border border-white/10 rounded-2xl p-1 gap-2">
                <motion.button
                  whileTap={{ scale: 0.85 }}
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  aria-label="Зменшити кількість"
                  className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/15 text-zinc-200 flex items-center justify-center transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </motion.button>
                <span className="font-bold text-sm sm:text-base text-white px-2">
                  {quantity}
                </span>
                <motion.button
                  whileTap={{ scale: 0.85 }}
                  onClick={() => setQuantity(quantity + 1)}
                  aria-label="Збільшити кількість"
                  className="w-8 h-8 rounded-xl apple-button-primary text-white flex items-center justify-center transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </motion.button>
              </div>

              {/* Add to Cart Button */}
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleAddToCart}
                className="flex-1 py-3 sm:py-3.5 px-4 sm:px-6 rounded-2xl apple-button-primary text-white font-bold text-xs sm:text-base flex items-center justify-between gap-2 shadow-xl shadow-crab-600/30 shrink-0"
              >
                <span className="truncate">
                  <span>Додати</span>
                  <span className="hidden xs:inline"> до замовлення</span>
                </span>
                <span className="font-display font-black text-amber-300 shrink-0">
                  {totalPrice} ₴
                </span>
              </motion.button>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
