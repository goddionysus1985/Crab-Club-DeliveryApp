import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  CheckCircle2, 
  ChefHat, 
  Truck, 
  PackageCheck, 
  Phone,
  ShoppingBag,
  Store,
  Star,
  UtensilsCrossed,
  Sparkles,
  Clock
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { RESTAURANT_INFO } from '../data/menuData';
import { fetchPosterOrderStatus, getPosterClientByPhone } from '../services/posterApi';
import { 
  playOrderSuccessChime, 
  sendBrowserNotification,
  requestNotificationPermission 
} from '../services/orderNotificationService';

export const OrderTrackerModal: React.FC = () => {
  const { 
    currentOrder, 
    setCurrentOrder,
    activeOrders,
    isOrderTrackerOpen, 
    setIsOrderTrackerOpen, 
    showToast, 
    updateUserProfile,
    orderTrackingStep,
    setOrderTrackingStep,
    stepTimestamps
  } = useCart();

  // currentStep is driven by orderTrackingStep from CartContext (which resets to 1 on new orders)
  const [currentStep, setCurrentStep] = useState<number>(() => {
    if (currentOrder?.status === 'completed') return 4;
    return currentOrder?.orderTrackingStep || Math.max(orderTrackingStep || 1, 1);
  });

  const [liveServiceMode, setLiveServiceMode] = useState<number | null>(null);
  const [liveTransactionId, setLiveTransactionId] = useState<number | null>(null);

  // Sync state if global background tracker advanced or active order was switched
  useEffect(() => {
    if (currentOrder) {
      const step = currentOrder.orderTrackingStep || (currentOrder.status === 'completed' ? 4 : orderTrackingStep || 1);
      setCurrentStep(step);
    }
  }, [orderTrackingStep, currentOrder?.orderId]);

  // When modal is open, request notification permission and fetch live metadata (service mode & transaction ID)
  useEffect(() => {
    if (!isOrderTrackerOpen || !currentOrder) return;

    // Request notification permissions for order updates
    requestNotificationPermission();

    const isOrderAlreadyCompleted = currentOrder.status === 'completed';
    const orderId = currentOrder.posterIncomingOrderId || parseInt(currentOrder.orderNumber, 10);
    
    if (isOrderAlreadyCompleted) {
      setCurrentStep(4);
      return;
    }

    // One-shot metadata refresh for current modal view (polling is managed centrally by CartContext)
    if (orderId) {
      fetchPosterOrderStatus(orderId).then(liveStatus => {
        if (liveStatus) {
          if (liveStatus.service_mode) {
            setLiveServiceMode(liveStatus.service_mode);
          }
          if (liveStatus.transaction_id) {
            setLiveTransactionId(liveStatus.transaction_id);
          }
          if (liveStatus.stepIndex >= 4) {
            setCurrentStep(4);
            setOrderTrackingStep(4);
          } else if (liveStatus.stepIndex > currentStep) {
            setCurrentStep(liveStatus.stepIndex);
            setOrderTrackingStep(liveStatus.stepIndex);
          }
        }
      }).catch(() => {});
    }
  }, [isOrderTrackerOpen, currentOrder?.orderId, currentOrder?.orderNumber]);

  if (!currentOrder) return null;

  const displayOrderNumber = liveTransactionId || currentOrder.posterTransactionId || currentOrder.orderNumber;

  // Resolve exact delivery mode from live Poster API (1=dinein, 2=takeaway, 3=delivery) or local order details
  const resolvedOrderType: 'delivery' | 'takeaway' | 'dinein' = 
    (liveServiceMode === 1 ? 'dinein' : liveServiceMode === 2 ? 'takeaway' : liveServiceMode === 3 ? 'delivery' : null) ||
    currentOrder.orderType ||
    (!currentOrder.address?.street ? 'takeaway' : 'delivery');

  const isTakeaway = resolvedOrderType === 'takeaway';
  const isDineIn = resolvedOrderType === 'dinein';
  const isDelivery = resolvedOrderType === 'delivery';

  // Specific, tailored tracking steps for each order fulfillment mode
  const steps = isDineIn ? [
    {
      id: 1,
      title: 'Прийнято рестораном',
      desc: 'Замовлення надійшло в касу закладу',
      icon: CheckCircle2
    },
    {
      id: 2,
      title: 'Шеф-кухар готує',
      desc: 'Свіжі морепродукти та страви на кухні',
      icon: ChefHat
    },
    {
      id: 3,
      title: 'Подача до столу',
      desc: 'Страви готові та подаються за ваш столик',
      icon: UtensilsCrossed
    },
    {
      id: 4,
      title: 'Подано',
      desc: 'Смачного відпочинку в Crab Club!',
      icon: Sparkles
    }
  ] : isTakeaway ? [
    {
      id: 1,
      title: 'Прийнято рестораном',
      desc: 'Замовлення надійшло в касу ресторану',
      icon: CheckCircle2
    },
    {
      id: 2,
      title: 'Шеф-кухар готує',
      desc: 'Готуємо та пакуємо ваші страви',
      icon: ChefHat
    },
    {
      id: 3,
      title: 'Готово до видачі',
      desc: 'Очікує на касі: вул. Миру, 2',
      icon: ShoppingBag
    },
    {
      id: 4,
      title: 'Видано гостю',
      desc: 'Замовлення отримано. Смачного від Crab Club!',
      icon: PackageCheck
    }
  ] : [
    {
      id: 1,
      title: 'Прийнято рестораном',
      desc: 'Замовлення надійшло в касу',
      icon: CheckCircle2
    },
    {
      id: 2,
      title: 'Шеф-кухар готує',
      desc: 'Свіжі морепродукти та страви',
      icon: ChefHat
    },
    {
      id: 3,
      title: 'Кур\'єр у дорозі',
      desc: 'В дорозі в термобоксі до вашої адреси',
      icon: Truck
    },
    {
      id: 4,
      title: 'Доставлено',
      desc: 'Вручено кур\'єром. Смачного від Crab Club!',
      icon: PackageCheck
    }
  ];

  return (
    <AnimatePresence>
      {isOrderTrackerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            onClick={() => setIsOrderTrackerOpen(false)}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 15 }}
            transition={{ type: 'spring', damping: 26, stiffness: 320 }}
            className="relative w-full max-w-2xl bg-[#111119] border border-white/[0.12] rounded-3xl overflow-hidden shadow-2xl z-10 max-h-[92vh] flex flex-col my-auto"
          >
            {/* Header */}
            <div className="p-4 sm:p-6 border-b border-white/[0.08] flex items-center justify-between bg-gradient-to-r from-crab-950/60 to-[#141422]/90 backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 shadow-sm">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                    Замовлення #{displayOrderNumber}
                  </h2>
                  <p className="text-xs text-zinc-400">
                    Оформлено о {currentOrder.date}
                  </p>
                </div>
              </div>

              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOrderTrackerOpen(false)}
                aria-label="Закрити"
                className="p-2 rounded-2xl bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Multi-Order Switcher Bar (when customer has 2+ active orders) */}
            {activeOrders.length > 1 && (
              <div className="px-4 sm:px-6 py-2 bg-black/40 border-b border-white/[0.08] flex items-center gap-2 overflow-x-auto no-scrollbar">
                <span className="text-[10px] text-zinc-400 font-semibold uppercase tracking-wider shrink-0">
                  Активні ({activeOrders.length}):
                </span>
                {activeOrders.map((ord) => {
                  const isSelected = ord.orderId === currentOrder.orderId;
                  const num = ord.posterTransactionId || ord.orderNumber;
                  const step = ord.orderTrackingStep || 1;
                  const stepLabel = step === 3 ? (ord.orderType === 'delivery' ? 'У дорозі' : 'Готово') : step === 2 ? 'Кухня' : 'Прийнято';

                  return (
                    <button
                      key={ord.orderId}
                      type="button"
                      onClick={() => setCurrentOrder(ord)}
                      className={`px-2.5 py-1 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 shrink-0 border ${
                        isSelected
                          ? 'bg-rose-600 text-white border-rose-500 shadow-md shadow-rose-900/30'
                          : 'bg-white/5 text-zinc-300 hover:text-white border-white/10 hover:bg-white/10'
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-white' : 'bg-emerald-400'}`} />
                      <span>#{num} ({stepLabel})</span>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Content */}
            <div className="overflow-y-auto p-4 sm:p-6 space-y-6 flex-1">
              
              {/* Stepper Steps */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                  {isDineIn ? 'Етапи приготування та подачі:' : isTakeaway ? 'Етапи приготування та видачі:' : 'Етапи приготування та доставки:'}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
                  {steps.map((step) => {
                    const Icon = step.icon;
                    const isCompletedOrder = currentStep >= 4;
                    const isFinalStep = step.id === 4;
                    const isPassed = step.id <= currentStep;
                    const isCurrent = !isCompletedOrder && step.id === currentStep;
                    const isFinishedFinal = isCompletedOrder && isFinalStep;
                    const stepTime = stepTimestamps?.[step.id];

                    return (
                      <motion.div
                        key={step.id}
                        layout
                        className={`p-3.5 rounded-2xl border transition-all ${
                          isFinishedFinal
                            ? 'bg-emerald-500/20 border-emerald-500 text-white ring-1 ring-emerald-500/40 shadow-lg shadow-emerald-500/20'
                            : isCurrent
                            ? 'bg-crab-600/20 border-crab-500 text-white ring-1 ring-crab-500/50 shadow-lg shadow-crab-600/20'
                            : isPassed
                            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                            : 'bg-white/[0.02] border-white/[0.06] text-zinc-500'
                        }`}
                      >
                        <div className="mb-2">
                          <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                            isFinishedFinal
                              ? 'bg-emerald-500 text-slate-950 shadow-md font-black'
                              : isCurrent
                              ? 'apple-button-primary text-white shadow-md'
                              : isPassed
                              ? 'bg-emerald-500/20 text-emerald-400'
                              : 'bg-white/5 text-zinc-500'
                          }`}>
                            {isFinishedFinal ? <CheckCircle2 className="w-4 h-4 text-slate-950" /> : <Icon className="w-4 h-4" />}
                          </div>
                        </div>

                        <div className="font-bold text-xs text-white mb-0.5">
                          {step.title}
                        </div>
                        <div className="text-[10px] text-zinc-400 leading-tight">
                          {step.desc}
                        </div>

                        {/* Time label when step was reached */}
                        {isPassed && stepTime && (
                          <div className={`flex items-center gap-1 mt-1.5 text-[10px] font-semibold ${
                            isFinishedFinal ? 'text-emerald-300' : isCurrent ? 'text-crab-300' : 'text-emerald-400/80'
                          }`}>
                            <Clock className="w-2.5 h-2.5" />
                            <span>о {stepTime}</span>
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Ordered Dishes Preview */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                  <ShoppingBag className="w-4 h-4 text-amber-400" />
                  <span>Склад замовлення ({currentOrder.items.length} страв):</span>
                </h3>

                <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-3 space-y-2 divide-y divide-white/[0.06] max-h-48 overflow-y-auto">
                  {currentOrder.items.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between pt-2 first:pt-0">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-10 h-10 rounded-xl object-cover bg-black/40 shadow-sm"
                        />
                        <div>
                          <div className="text-xs font-bold text-white">{item.product.name}</div>
                          <div className="text-[10px] text-zinc-400">
                            {item.quantity} шт. {item.selectedOptions?.length ? `• ${item.selectedOptions.map(o => o.option_name).join(', ')}` : ''}
                          </div>
                        </div>
                      </div>
                      <div className="font-bold text-xs text-amber-400">
                        {item.totalPrice} ₴
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Takeaway Pickup Location Notice */}
              {isTakeaway && (
                <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200 flex items-start gap-2.5">
                  <div className="p-1.5 rounded-xl bg-amber-500/20 text-amber-400 shrink-0 mt-0.5">
                    <Store className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-white">Пункт видачі замовлення:</div>
                    <div className="text-zinc-300">вулиця Миру, 2, Овідіополь, Одеська область, 67800</div>
                    <div className="text-[10px] text-amber-400/80 pt-0.5">Назвіть касиру номер замовлення: <span className="font-bold text-white">#{displayOrderNumber}</span></div>
                  </div>
                </div>
              )}

              {/* Dine-in Table Notice */}
              {isDineIn && (
                <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-200 flex items-start gap-2.5">
                  <div className="p-1.5 rounded-xl bg-emerald-500/20 text-emerald-400 shrink-0 mt-0.5">
                    <UtensilsCrossed className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-white">Обслуговування у закладі:</div>
                    <div className="text-zinc-300">вулиця Миру, 2, Овідіополь, Одеська область, 67800</div>
                    <div className="text-[10px] text-emerald-400/80 pt-0.5">Назвіть офіціанту або на касі номер замовлення: <span className="font-bold text-white">#{displayOrderNumber}</span></div>
                  </div>
                </div>
              )}

              {/* Order Completed Rating */}
              {currentStep >= 4 && (
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-2">
                  <div className="text-sm font-bold text-white">Як вам наше обслуговування?</div>
                  <p className="text-xs text-zinc-400">Оцініть якість страв та швидкість приготування:</p>
                  <div className="flex justify-center gap-2 pt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        className="p-2 rounded-xl bg-white/5 hover:bg-amber-400/20 text-amber-400 hover:scale-110 transition-transform"
                        onClick={() => {
                          showToast(`Дякуємо за вашу оцінку (${star}/5 ⭐)!`, undefined, 'success');
                        }}
                      >
                        <Star className="w-5 h-5 fill-amber-400" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Order Meta Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-1">
                  <span className="text-[11px] text-zinc-400 font-semibold uppercase">Отримувач:</span>
                  <div className="font-bold text-white">{currentOrder.customerName}</div>
                  <div className="text-zinc-300">{currentOrder.phone}</div>
                  {isDelivery && currentOrder.address && (
                    <div className="text-zinc-400 text-[11px] pt-1">
                      📍 {currentOrder.address.city}, {currentOrder.address.street} {currentOrder.address.house}
                    </div>
                  )}
                  {isTakeaway && (
                    <div className="text-amber-400/90 text-[11px] pt-1 font-medium">
                      🏬 Самовивіз: вул. Миру, 2, Овідіополь
                    </div>
                  )}
                  {isDineIn && (
                    <div className="text-emerald-400/90 text-[11px] pt-1 font-medium">
                      🍽️ В закладі Crab Club: вул. Миру, 2
                    </div>
                  )}
                </div>

                <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-1.5">
                  <span className="text-[11px] text-zinc-400 font-semibold uppercase">Оплата та підсумок:</span>
                  
                  {/* Payment method */}
                  <div className="flex justify-between text-xs">
                    <span className="text-zinc-400">Спосіб оплати:</span>
                    <span className="text-white font-medium">
                      {currentOrder.paymentMethod === 'card_online' && 'Онлайн картою'}
                      {currentOrder.paymentMethod === 'card_courier' && (isTakeaway ? 'Карткою на касі' : isDineIn ? 'Карткою в закладі' : 'Терміналом кур\'єру')}
                      {currentOrder.paymentMethod === 'cash' && (isTakeaway ? 'Готівкою на касі' : isDineIn ? 'Готівкою в закладі' : 'Готівкою кур\'єру')}
                    </span>
                  </div>

                  {/* Dishes subtotal */}
                  <div className="flex justify-between text-xs">
                    <span className="text-zinc-400">Страви ({currentOrder.items.reduce((s,i) => s + i.quantity, 0)} шт.):</span>
                    <span className="text-white">{currentOrder.subtotal} ₴</span>
                  </div>

                  {/* Delivery fee (only for delivery orders) */}
                  {isDelivery && (
                    <div className="flex justify-between text-xs">
                      <span className="text-zinc-400">Доставка:</span>
                      <span className={currentOrder.deliveryFee === 0 ? 'text-emerald-400 font-semibold' : 'text-white'}>
                        {currentOrder.deliveryFee === 0 ? 'Безкоштовно 🎉' : `${currentOrder.deliveryFee} ₴`}
                      </span>
                    </div>
                  )}

                  {/* Discount */}
                  {Boolean(currentOrder.discount && currentOrder.discount > 0) && (
                    <div className="flex justify-between text-xs">
                      <span className="text-zinc-400">Знижка:</span>
                      <span className="text-emerald-400">−{currentOrder.discount} ₴</span>
                    </div>
                  )}

                  {/* Bonuses used */}
                  {Boolean(currentOrder.bonusUsed && currentOrder.bonusUsed > 0) && (
                    <div className="flex justify-between text-xs">
                      <span className="text-zinc-400">Бонуси списано:</span>
                      <span className="text-amber-400">−{currentOrder.bonusUsed} ₴</span>
                    </div>
                  )}

                  {/* Bonus earned */}
                  {Boolean(currentOrder.bonusEarned && currentOrder.bonusEarned > 0) && (
                    <div className="flex justify-between text-xs">
                      <span className="text-zinc-400">
                        {currentStep >= 4 ? 'Кешбек нараховано:' : 'Кешбек (після отримання):'}
                      </span>
                      <span className={currentStep >= 4 ? 'text-amber-300 font-bold' : 'text-amber-400/80 font-medium'}>
                        +{currentOrder.bonusEarned} ₴ {currentStep >= 4 ? '✓' : '(очікує)'}
                      </span>
                    </div>
                  )}

                  {/* Total */}
                  <div className="flex justify-between text-sm pt-1.5 border-t border-white/[0.08]">
                    <span className="font-bold text-white">Разом до сплати:</span>
                    <span className="font-display font-extrabold text-amber-400">{currentOrder.total} ₴</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Footer */}
            <div className="p-4 sm:p-5 bg-[#0D0D15] border-t border-white/[0.08] flex items-center justify-between">
              <div className="text-xs text-zinc-400">
                Виникли питання? Ми завжди на зв'язку!
              </div>

              <motion.a
                whileTap={{ scale: 0.95 }}
                href={`tel:${RESTAURANT_INFO.phone_raw}`}
                className="px-5 py-2.5 rounded-2xl apple-button-primary text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md"
              >
                <Phone className="w-4 h-4" />
                <span>{RESTAURANT_INFO.phone}</span>
              </motion.a>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
