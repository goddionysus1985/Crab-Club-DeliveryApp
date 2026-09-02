import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  ShoppingBag, 
  Plus, 
  Minus, 
  Trash2, 
  Sparkles, 
  ArrowRight,
  SlidersHorizontal
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { getRestaurantScheduleStatus } from '../utils/workHours';
import { validateCartAvailability } from '../services/posterApi';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    setIsCheckoutOpen,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal,
    addToCart,
    isMinOrderReached,
    minOrderRemaining,
    showToast,
    catalogProducts,
    openEditCartItem
  } = useCart();

  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const scheduleStatus = getRestaurantScheduleStatus();

  // Find drinks and desserts for upsell from active catalog
  const upsellProducts = catalogProducts.filter(p => 
    (p.category_url.includes('napoyi') || p.category_url.includes('deserti') || p.category_url.includes('vypichka') || p.category_name.toLowerCase().includes('напо') || p.category_name.toLowerCase().includes('випіч')) &&
    !cart.some(item => item.product.id === p.id)
  ).slice(0, 4);

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop with spring fade */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 320 }}
              className="w-screen max-w-md bg-[#0E0E16] text-white shadow-2xl flex flex-col justify-between border-l border-white/[0.08]"
            >
              {/* Header */}
              <div className="p-4 sm:p-5 border-b border-white/[0.08] bg-[#12121D]/90 backdrop-blur-xl shrink-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-crab-600/20 border border-crab-500/30 text-crab-400 flex items-center justify-center">
                      <ShoppingBag className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                        Ваш кошик
                      </h2>
                      <p className="text-xs text-zinc-400">
                        {cart.length > 0 ? `${cart.reduce((s, i) => s + i.quantity, 0)} позицій у замовленні` : 'Кошик порожній'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {cart.length > 0 && (
                      <button
                        onClick={() => setShowClearConfirm(true)}
                        aria-label="Очистити кошик"
                        className="p-2 rounded-xl text-zinc-400 hover:text-red-400 hover:bg-white/5 transition-colors"
                        title="Очистити кошик"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}

                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setIsCartOpen(false)}
                      aria-label="Закрити"
                      className="p-2 rounded-2xl bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Scrollable Cart Items List */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4 my-auto">
                    <div className="w-20 h-20 rounded-3xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-zinc-500 shadow-inner">
                      <ShoppingBag className="w-9 h-9" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-lg font-bold text-white">
                        Ваш кошик порожній
                      </h3>
                      <p className="text-xs text-zinc-400 max-w-xs font-light">
                        Оберіть найсмачніші роли, неаполітанську піцу чи авторські страви у нашому меню.
                      </p>
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsCartOpen(false)}
                      className="px-6 py-3 rounded-2xl apple-button-primary text-white text-xs font-bold shadow-lg shadow-crab-600/30"
                    >
                      Переглянути меню
                    </motion.button>
                  </div>
                ) : (
                  <AnimatePresence initial={false}>
                    {cart.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="p-3 sm:p-3.5 rounded-2xl bg-[#14141F] border border-white/[0.07] flex items-center gap-3 relative group shadow-sm hover:border-white/15 transition-all"
                      >
                        {/* Product Image */}
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-16 h-16 rounded-xl object-cover bg-black/40 shrink-0 border border-white/10"
                        />

                        {/* Info & Modifiers */}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-display font-bold text-xs sm:text-sm text-white truncate">
                            {item.product.name}
                          </h4>

                          {/* Selected options tags */}
                          {item.selectedOptions && item.selectedOptions.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-0.5">
                              {item.selectedOptions.map((opt, i) => (
                                <span
                                  key={i}
                                  className="px-1.5 py-0.2 rounded bg-white/5 border border-white/10 text-[10px] text-zinc-300 font-light truncate"
                                >
                                  {opt.option_name} {opt.price > 0 ? `(+${opt.price} ₴)` : ''}
                                </span>
                              ))}
                            </div>
                          )}

                          {/* Modifiers edit button if product supports modifications */}
                          {(() => {
                            const fullProd = catalogProducts.find(p => p.id === item.product.id) || item.product;
                            const hasMods = fullProd.modifications && fullProd.modifications.length > 0;
                            if (!hasMods) return null;
                            const hasSelected = item.selectedOptions && item.selectedOptions.length > 0;
                            return (
                              <button
                                type="button"
                                onClick={() => openEditCartItem(item)}
                                className="mt-1.5 px-2 py-0.5 rounded-lg bg-rose-600/15 hover:bg-rose-600/25 text-rose-300 hover:text-rose-200 text-[11px] font-semibold border border-rose-500/25 flex items-center gap-1 transition-colors w-fit"
                              >
                                <SlidersHorizontal className="w-3 h-3 text-rose-400" />
                                <span>{hasSelected ? 'Змінити модифікатори' : '+ Додати модифікатори'}</span>
                              </button>
                            );
                          })()}

                          <div className="flex items-center justify-between mt-2">
                            <span className="font-display font-extrabold text-sm sm:text-base text-white">
                              {item.totalPrice} ₴
                            </span>

                            {/* Stepper with Spring Haptics */}
                            <div className="flex items-center bg-[#202030] border border-white/10 rounded-2xl p-0.5 gap-1">
                              <motion.button
                                whileTap={{ scale: 0.85 }}
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="w-6 h-6 rounded-xl bg-white/5 hover:bg-white/15 text-zinc-300 flex items-center justify-center transition-colors"
                              >
                                <Minus className="w-3 h-3" />
                              </motion.button>
                              <span className="font-bold text-xs text-white px-1.5 min-w-[18px] text-center">
                                {item.quantity}
                              </span>
                              <motion.button
                                whileTap={{ scale: 0.85 }}
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-6 h-6 rounded-xl apple-button-primary text-white flex items-center justify-center transition-colors"
                              >
                                <Plus className="w-3 h-3" />
                              </motion.button>
                            </div>
                          </div>
                        </div>

                        {/* Remove Button */}
                        <motion.button
                          whileTap={{ scale: 0.85 }}
                          onClick={() => removeFromCart(item.id)}
                          className="opacity-0 group-hover:opacity-100 p-1.5 text-zinc-400 hover:text-red-400 rounded-xl hover:bg-white/5 transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </motion.button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                )}

                {/* Upsell Recommendations */}
                {cart.length > 0 && upsellProducts.length > 0 && (
                  <div className="pt-3 border-t border-white/[0.06]">
                    <h4 className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>Рекомендуємо додати:</span>
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {upsellProducts.map(prod => (
                        <div
                          key={prod.id}
                          className="p-2 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center gap-2"
                        >
                          <img
                            src={prod.image}
                            alt={prod.name}
                            className="w-9 h-9 rounded-xl object-cover bg-black/40 shrink-0 shadow-sm"
                          />
                          <div className="min-w-0 flex-1">
                            <div className="font-semibold text-[11px] text-white truncate">
                              {prod.name}
                            </div>
                            <div className="text-[10px] text-amber-400 font-bold">
                              {prod.price} ₴
                            </div>
                          </div>
                          <motion.button
                            whileTap={{ scale: 0.85 }}
                            onClick={() => addToCart(prod, 1)}
                            className="p-1 rounded-lg apple-button-primary text-white shrink-0 shadow-sm"
                          >
                            <Plus className="w-3 h-3" />
                          </motion.button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Ultra-Compact Bottom Sticky Checkout Bar */}
              {cart.length > 0 && (
                <div className="p-3.5 sm:p-4 bg-[#0A0A10] border-t border-white/[0.08] shrink-0 space-y-2">
                  {/* Minimum Order Warning if subtotal < 300 */}
                  {!isMinOrderReached && (
                    <div className="p-2 rounded-xl bg-red-500/15 border border-red-500/30 text-red-300 text-[11px] flex items-center justify-between">
                      <span>Мінімальне замовлення — 300 ₴:</span>
                      <span className="font-bold text-white">додайте ще на {minOrderRemaining} ₴</span>
                    </div>
                  )}

                  {/* 1-Line Total Summary & CTA Button */}
                  <div className="flex items-center gap-3">
                    <div className="min-w-0 pr-1">
                      <span className="text-[10px] text-zinc-400 uppercase tracking-wider block font-semibold">
                        Сума страв:
                      </span>
                      <div className="font-display font-black text-xl sm:text-2xl text-amber-300 tracking-tight leading-none">
                        {subtotal} <span className="text-sm font-bold text-white">₴</span>
                      </div>
                    </div>

                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      disabled={!isMinOrderReached}
                      onClick={handleProceedToCheckout}
                      className="flex-1 py-3 px-4 rounded-2xl apple-button-primary text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-xl shadow-crab-600/30 disabled:opacity-40 disabled:pointer-events-none"
                    >
                      <span className="truncate">
                        {!isMinOrderReached
                          ? `Ще на ${minOrderRemaining} ₴`
                          : scheduleStatus.isOpen
                          ? 'Перейти до оформлення'
                          : 'Передзамовлення'}
                      </span>
                      <ArrowRight className="w-4 h-4 shrink-0" />
                    </motion.button>
                  </div>
                </div>
              )}

              {/* Clear Cart Confirmation Dialog */}
              <AnimatePresence>
                {showClearConfirm && (
                  <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: 10 }}
                      transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                      className="w-full max-w-xs bg-[#161622] border border-white/[0.12] rounded-3xl p-5 shadow-2xl text-center space-y-4"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-red-500/15 border border-red-500/30 text-red-400 flex items-center justify-center mx-auto shadow-md">
                        <Trash2 className="w-6 h-6" />
                      </div>

                      <div>
                        <h3 className="text-base font-bold text-white mb-1">
                          Очистити кошик?
                        </h3>
                        <p className="text-xs text-zinc-400 leading-relaxed font-light">
                          Всі вибрані страви будуть видалені з вашого замовлення.
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-2 pt-1">
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          type="button"
                          onClick={() => setShowClearConfirm(false)}
                          className="py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 text-xs font-semibold border border-white/10"
                        >
                          Скасувати
                        </motion.button>

                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          type="button"
                          onClick={() => {
                            clearCart();
                            setShowClearConfirm(false);
                          }}
                          className="py-2.5 px-3 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-lg shadow-red-600/30"
                        >
                          Очистити
                        </motion.button>
                      </div>
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>

            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
