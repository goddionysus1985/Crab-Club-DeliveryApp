import React, { useState } from 'react';
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
  Check, 
  AlertCircle 
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

  if (!isCartOpen) return null;

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
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={() => setIsCartOpen(false)}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#101018] border-l border-white/10 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-crab-600/20 border border-crab-500/30 text-crab-400">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">Ваш кошик</h2>
                <p className="text-xs text-slate-400">
                  {cart.length > 0 ? `${cart.reduce((s, i) => s + i.quantity, 0)} позицій у замовленні` : 'Кошик порожній'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {cart.length > 0 && (
                <button
                  onClick={clearCart}
                  className="p-2 text-slate-400 hover:text-red-400 hover:bg-white/5 rounded-xl transition-colors"
                  title="Очистити кошик"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Delivery / Takeaway Switcher */}
          <div className="p-4 bg-white/[0.02] border-b border-white/5">
            <div className="grid grid-cols-2 gap-2 bg-[#171722] p-1 rounded-2xl border border-white/5">
              <button
                type="button"
                onClick={() => setOrderType('delivery')}
                className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  orderType === 'delivery'
                    ? 'bg-crab-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Truck className="w-4 h-4" />
                <span>Доставка</span>
              </button>

              <button
                type="button"
                onClick={() => setOrderType('takeaway')}
                className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all relative ${
                  orderType === 'takeaway'
                    ? 'bg-crab-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Store className="w-4 h-4" />
                <span>Самовивіз</span>
                <span className="absolute -top-1.5 -right-1 px-1.5 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[9px] font-black">
                  -10%
                </span>
              </button>
            </div>

            {/* Free Delivery Bar (only for delivery) */}
            {orderType === 'delivery' && (
              <div className="mt-3 bg-[#171724] rounded-xl p-3 border border-white/5">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-semibold text-slate-300 flex items-center gap-1">
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
                  <div
                    className="h-full bg-gradient-to-r from-amber-400 to-emerald-400 rounded-full transition-all duration-500"
                    style={{ width: `${freeDeliveryProgress}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {cart.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4 text-slate-500">
                  <ShoppingBag className="w-10 h-10" />
                </div>
                <h3 className="text-lg font-bold text-white mb-1">Ваш кошик порожній</h3>
                <p className="text-xs text-slate-400 max-w-xs mx-auto mb-6">
                  Оберіть найсмачніші суші, піцу або авторські страви з нашого преміум-меню.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-2.5 rounded-xl luxury-button-ruby text-white text-xs font-bold"
                >
                  Перейти до меню
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="glass-card p-3.5 rounded-2xl flex gap-3 items-center group relative border border-white/5"
                >
                  {/* Image */}
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 rounded-xl object-cover bg-[#1A1A26] shrink-0"
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

                      {/* Stepper */}
                      <div className="flex items-center bg-[#252535] border border-white/10 rounded-xl p-0.5 gap-1">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-6 h-6 rounded-lg bg-white/5 hover:bg-white/15 text-slate-300 flex items-center justify-center transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-bold text-xs text-white px-1.5">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 rounded-lg luxury-button-ruby text-white flex items-center justify-center transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="opacity-0 group-hover:opacity-100 p-1.5 text-slate-400 hover:text-red-400 rounded-lg hover:bg-white/5 transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}

            {/* Upsell Recommendations */}
            {cart.length > 0 && upsellProducts.length > 0 && (
              <div className="pt-4 border-t border-white/5">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Рекомендуємо додати:</span>
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {upsellProducts.map(prod => (
                    <div
                      key={prod.id}
                      className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 flex items-center gap-2"
                    >
                      <img
                        src={prod.image}
                        alt={prod.name}
                        className="w-10 h-10 rounded-lg object-cover bg-black/40 shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="font-semibold text-[11px] text-white truncate">
                          {prod.name}
                        </div>
                        <div className="text-[10px] text-amber-400 font-bold">
                          {prod.price} ₴
                        </div>
                      </div>
                      <button
                        onClick={() => addToCart(prod, 1)}
                        className="p-1.5 rounded-lg luxury-button-ruby text-white shrink-0"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer & Checkout */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 bg-[#0E0E15] border-t border-white/10 space-y-4">
              {/* Promo Code Box */}
              {promoCode ? (
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-400">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    <span>Промокод <strong>{promoCode}</strong> застосовано!</span>
                  </div>
                  <button
                    onClick={removePromoCode}
                    className="text-slate-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={inputPromo}
                      onChange={(e) => setInputPromo(e.target.value)}
                      placeholder="Промокод (наприклад: CRABCLUB)"
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-8 pr-3 py-2 text-xs text-white placeholder-slate-500 uppercase focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-white text-xs font-semibold"
                  >
                    Застосувати
                  </button>
                </form>
              )}

              {/* Price Details */}
              <div className="space-y-1.5 text-xs text-slate-300 border-t border-white/5 pt-3">
                <div className="flex justify-between">
                  <span>Сума замовлення:</span>
                  <span className="font-semibold text-white">{subtotal} ₴</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-semibold">
                    <span>Знижка {orderType === 'takeaway' ? '(самовивіз 10%)' : ''}:</span>
                    <span>-{discount} ₴</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Доставка:</span>
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
                  <span className="font-display font-extrabold text-xl text-amber-300">
                    {total} ₴
                  </span>
                </div>
              </div>

              {/* Primary CTA */}
              <button
                onClick={handleProceedToCheckout}
                className="w-full py-3.5 px-6 rounded-2xl luxury-button-ruby text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-crab-600/30"
              >
                <span>Оформити замовлення</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
