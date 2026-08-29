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
  Truck, 
  Store, 
  Tag, 
  Check 
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { PRODUCTS, RESTAURANT_INFO } from '../data/menuData';

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
    discount,
    deliveryFee,
    total,
    freeDeliveryThreshold,
    amountNeededForFreeDelivery,
    freeDeliveryProgress,
    orderType,
    setOrderType,
    promoCode,
    promoMessage,
    applyPromoCode,
    removePromoCode,
    addToCart,
  } = useCart();

  const [inputPromo, setInputPromo] = useState('');

  // Find drinks and desserts for upsell
  const upsellProducts = PRODUCTS.filter(p => 
    (p.category_url.includes('napoyi') || p.category_url.includes('deserti')) &&
    !cart.some(item => item.product.id === p.id)
  ).slice(0, 4);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputPromo.trim()) {
      applyPromoCode(inputPromo);
    }
  };

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
            className="fixed inset-0 bg-black/75 backdrop-blur-md"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
            {/* Apple Spring Slide-Over Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="w-screen max-w-md bg-[#0F0F17] border-l border-white/10 shadow-2xl flex flex-col"
            >
              {/* Header */}
              <div className="p-4 sm:p-5 border-b border-white/[0.08] flex items-center justify-between bg-[#12121D]/80 backdrop-blur-xl">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-2xl bg-crab-600/20 border border-crab-500/30 text-crab-400">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white tracking-tight">Ваш кошик</h2>
                    <p className="text-xs text-zinc-400">
                      {cart.length > 0 ? `${cart.reduce((s, i) => s + i.quantity, 0)} позицій у замовленні` : 'Кошик порожній'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  {cart.length > 0 && (
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={clearCart}
                      className="p-2 text-zinc-400 hover:text-red-400 hover:bg-white/5 rounded-2xl transition-colors"
                      title="Очистити кошик"
                    >
                      <Trash2 className="w-4 h-4" />
                    </motion.button>
                  )}
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsCartOpen(false)}
                    className="p-2 rounded-2xl bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white transition-colors border border-white/5"
                  >
                    <X className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>

              {/* Delivery / Takeaway Switcher (Apple Segmented Bar) */}
              <div className="p-4 bg-white/[0.02] border-b border-white/[0.06]">
                <div className="grid grid-cols-2 gap-1.5 bg-[#171724] p-1 rounded-2xl border border-white/[0.06] relative">
                  <button
                    type="button"
                    onClick={() => setOrderType('delivery')}
                    className={`relative flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold transition-colors z-10 ${
                      orderType === 'delivery' ? 'text-white' : 'text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    {orderType === 'delivery' && (
                      <motion.div
                        layoutId="orderTypePill"
                        className="absolute inset-0 bg-gradient-to-r from-crab-600 to-crab-700 rounded-xl shadow-md -z-10"
                        transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                      />
                    )}
                    <Truck className="w-4 h-4" />
                    <span>Доставка</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setOrderType('takeaway')}
                    className={`relative flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold transition-colors z-10 ${
                      orderType === 'takeaway' ? 'text-white' : 'text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    {orderType === 'takeaway' && (
                      <motion.div
                        layoutId="orderTypePill"
                        className="absolute inset-0 bg-gradient-to-r from-crab-600 to-crab-700 rounded-xl shadow-md -z-10"
                        transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                      />
                    )}
                    <Store className="w-4 h-4" />
                    <span>Самовивіз</span>
                    <span className="px-1.5 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[9px] font-black">
                      -10%
                    </span>
                  </button>
                </div>

                {/* Free Delivery Bar */}
                {orderType === 'delivery' && (
                  <div className="mt-3 bg-[#171726] rounded-2xl p-3 border border-white/[0.06]">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="font-semibold text-zinc-300 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                        <span>
                          {amountNeededForFreeDelivery > 0
                            ? `Додайте ще ${amountNeededForFreeDelivery} ₴ для безкоштовної доставки`
                            : '🎉 Безкоштовна доставка активна!'}
                        </span>
                      </span>
                      <span className="text-[11px] text-amber-400 font-bold">
                        {freeDeliveryProgress}%
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-amber-400 to-emerald-400 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${freeDeliveryProgress}%` }}
                        transition={{ type: 'spring', damping: 20, stiffness: 200 }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Cart Items List */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {cart.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4 text-zinc-500">
                      <ShoppingBag className="w-10 h-10" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-1">Ваш кошик порожній</h3>
                    <p className="text-xs text-zinc-400 max-w-xs mx-auto mb-6 font-light">
                      Оберіть найсмачніші суші, піцу або авторські страви з нашого преміум-меню.
                    </p>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsCartOpen(false)}
                      className="px-6 py-2.5 rounded-2xl apple-button-primary text-white text-xs font-bold"
                    >
                      Перейти до меню
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
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                        className="apple-card p-3.5 rounded-2xl flex gap-3 items-center group relative"
                      >
                        {/* Image */}
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-16 h-16 rounded-xl object-cover bg-[#1A1A26] shrink-0 shadow-sm"
                        />

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-xs sm:text-sm text-white truncate mb-0.5">
                            {item.product.name}
                          </h4>

                          {/* Modifiers List */}
                          {item.selectedOptions && item.selectedOptions.length > 0 && (
                            <div className="text-[11px] text-amber-300 font-medium truncate mb-1">
                              + {item.selectedOptions.map(o => o.option_name).join(', ')}
                            </div>
                          )}

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
                  <div className="pt-4 border-t border-white/[0.06]">
                    <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>Рекомендуємо додати:</span>
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {upsellProducts.map(prod => (
                        <div
                          key={prod.id}
                          className="p-2.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center gap-2"
                        >
                          <img
                            src={prod.image}
                            alt={prod.name}
                            className="w-10 h-10 rounded-xl object-cover bg-black/40 shrink-0 shadow-sm"
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
                            className="p-1.5 rounded-xl apple-button-primary text-white shrink-0 shadow-sm"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </motion.button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Footer & Checkout */}
              {cart.length > 0 && (
                <div className="p-4 sm:p-5 bg-[#0C0C14] border-t border-white/[0.08] space-y-4">
                  {/* Promo Code Box */}
                  {promoCode ? (
                    <div className="flex items-center justify-between p-2.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-400">
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4" />
                        <span>Промокод <strong>{promoCode}</strong> застосовано!</span>
                      </div>
                      <button
                        onClick={removePromoCode}
                        className="text-zinc-400 hover:text-white"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyPromo} className="flex gap-2">
                      <div className="relative flex-1">
                        <Tag className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={inputPromo}
                          onChange={(e) => setInputPromo(e.target.value)}
                          placeholder="Промокод (CRABCLUB)"
                          className="w-full bg-white/[0.04] border border-white/10 rounded-2xl pl-8 pr-3 py-2 text-xs text-white placeholder-zinc-500 uppercase focus:outline-none focus:border-amber-400"
                        />
                      </div>
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        className="px-3.5 py-2 rounded-2xl apple-button-secondary text-white text-xs font-semibold"
                      >
                        Застосувати
                      </motion.button>
                    </form>
                  )}

                  {/* Price Details */}
                  <div className="space-y-1.5 text-xs text-zinc-300 border-t border-white/[0.06] pt-3">
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Сума замовлення:</span>
                      <span className="font-semibold text-white">{subtotal} ₴</span>
                    </div>

                    {discount > 0 && (
                      <div className="flex justify-between text-emerald-400 font-semibold">
                        <span>Знижка {orderType === 'takeaway' ? '(самовивіз 10%)' : ''}:</span>
                        <span>-{discount} ₴</span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span className="text-zinc-400">Доставка:</span>
                      <span className="font-semibold text-white">
                        {deliveryFee === 0 ? (
                          <span className="text-emerald-400 font-bold">Безкоштовно</span>
                        ) : (
                          `${deliveryFee} ₴`
                        )}
                      </span>
                    </div>

                    <div className="flex justify-between items-baseline pt-2 border-t border-white/10 text-sm">
                      <span className="font-bold text-white">Разом до сплати:</span>
                      <span className="font-display font-extrabold text-xl text-amber-300 tracking-tight">
                        {total} ₴
                      </span>
                    </div>
                  </div>

                  {/* Primary CTA */}
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={handleProceedToCheckout}
                    className="w-full py-3.5 px-6 rounded-2xl apple-button-primary text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-xl shadow-crab-600/30"
                  >
                    <span>Оформити замовлення</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              )}

            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
