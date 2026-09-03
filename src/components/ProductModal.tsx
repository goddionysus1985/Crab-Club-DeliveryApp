import React, { useState, useEffect } from 'react';
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
    editingCartItem,
    setEditingCartItem,
    updateCartItem,
    addToCart, 
    toggleFavorite, 
    isFavorite,
    isProductStopped 
  } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, { group: string; name: string; price: number }>>({});

  const product = activeProductModal;
  const isFav = product ? isFavorite(product.id) : false;
  const isStopped = product && isProductStopped ? isProductStopped(product.id) : false;
  const isEditMode = Boolean(editingCartItem && product && editingCartItem.product.id === product.id);

  // Initialize modifiers & quantity when opening product modal
  useEffect(() => {
    if (activeProductModal) {
      if (editingCartItem && editingCartItem.product.id === activeProductModal.id) {
        // Pre-populate with current modifiers from cart item
        const initialOpts: Record<string, { group: string; name: string; price: number }> = {};
        editingCartItem.selectedOptions?.forEach(opt => {
          initialOpts[`${opt.group_name}__${opt.option_name}`] = {
            group: opt.group_name,
            name: opt.option_name,
            price: opt.price
          };
        });
        setSelectedOptions(initialOpts);
        setQuantity(editingCartItem.quantity || 1);
      } else {
        setQuantity(1);
        setSelectedOptions({});
      }
    }
  }, [activeProductModal, editingCartItem]);

  // Calculate extra cost from modifiers
  const extraCost = Object.values(selectedOptions).reduce((sum, opt) => sum + opt.price, 0);
  const singleUnitPrice = product ? product.price + extraCost : 0;
  const totalPrice = singleUnitPrice * quantity;

  const handleOptionToggle = (groupName: string, optionName: string, optionPrice: number, maxAllowed: number = 99) => {
    const key = `${groupName}__${optionName}`;
    setSelectedOptions(prev => {
      const copy = { ...prev };
      if (copy[key]) {
        delete copy[key];
      } else {
        if (maxAllowed === 1) {
          // If single-select group (radio), remove previous selection in this group
          Object.keys(copy).forEach(k => {
            if (copy[k].group === groupName) delete copy[k];
          });
        }
        copy[key] = { group: groupName, name: optionName, price: optionPrice };
      }
      return copy;
    });
  };

  const handleClose = () => {
    setActiveProductModal(null);
    setEditingCartItem(null);
  };

  const handleSaveOrAddToCart = () => {
    if (!product) return;
    const formattedOptions = Object.values(selectedOptions).map(opt => ({
      group_name: opt.group,
      option_name: opt.name,
      price: opt.price
    }));

    if (isEditMode && editingCartItem) {
      updateCartItem(editingCartItem.id, formattedOptions, undefined, quantity);
    } else {
      addToCart(product, quantity, formattedOptions);
    }
    handleClose();
  };

  return (
    <AnimatePresence>
      {product && (
        <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-y-auto">
          {/* Backdrop with smooth blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Spring Card / Bottom Sheet */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 30 }}
            transition={{ type: 'spring', damping: 26, stiffness: 320 }}
            className="relative w-full max-w-2xl bg-[#111119] border-t sm:border border-white/[0.12] rounded-t-[32px] sm:rounded-3xl overflow-hidden shadow-2xl z-10 max-h-[92vh] sm:max-h-[90vh] flex flex-col mt-auto sm:my-auto"
          >
            {/* iOS Grabber Indicator on Mobile */}
            <div className="w-12 h-1.5 bg-white/20 rounded-full mx-auto mt-2.5 mb-1 sm:hidden shrink-0" />

            {/* Close Button with Spring Tap */}
            <motion.button
              whileTap={{ scale: 0.85 }}
              onClick={handleClose}
              aria-label="Закрити"
              className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-xl border border-white/10 transition-colors shadow-md"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
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
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                      {product.category_name}
                    </span>
                    {isEditMode && (
                      <span className="px-2 py-0.5 rounded-lg bg-rose-600/30 border border-rose-500/40 text-rose-200 text-[10px] font-bold flex items-center gap-1">
                        <span>✏️</span>
                        <span>Редагування модифікаторів</span>
                      </span>
                    )}
                  </div>
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
                      <div key={`group-${group.group_id}`} className="space-y-2">
                        <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-wider">
                          {group.group_name}:
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {group.options.map((option, optIdx) => {
                            const isSelected = Boolean(
                              selectedOptions[`${group.group_name}__${option.name}`] || 
                              selectedOptions[group.group_name]?.name === option.name
                            );
                            return (
                              <motion.button
                                whileTap={{ scale: 0.97 }}
                                key={`opt-${group.group_id}-${option.id || optIdx}-${option.name}`}
                                type="button"
                                onClick={() => handleOptionToggle(group.group_name, option.name, option.price, group.max || 99)}
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
                                  <span className="font-medium text-white">{option.name}</span>
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
              {isStopped ? (
                <button
                  type="button"
                  disabled
                  className="flex-1 py-3 sm:py-3.5 px-4 sm:px-6 rounded-2xl bg-white/5 border border-white/10 text-zinc-500 font-bold text-xs sm:text-base cursor-not-allowed text-center"
                >
                  ⛔ Страва тимчасово на стопі
                </button>
              ) : (
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSaveOrAddToCart}
                  className="flex-1 py-3 sm:py-3.5 px-4 sm:px-6 rounded-2xl apple-button-primary text-white font-bold text-xs sm:text-base flex items-center justify-between gap-2 shadow-xl shadow-crab-600/30 shrink-0"
                >
                  <span className="truncate flex items-center gap-1.5">
                    {isEditMode ? (
                      <>
                        <span>Зберегти зміни</span>
                        <span className="hidden xs:inline text-rose-200 text-xs font-normal">у страві</span>
                      </>
                    ) : (
                      <>
                        <span>Додати</span>
                        <span className="hidden xs:inline"> до замовлення</span>
                      </>
                    )}
                  </span>
                  <span className="font-display font-black text-amber-300 shrink-0">
                    {totalPrice} ₴
                  </span>
                </motion.button>
              )}
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
