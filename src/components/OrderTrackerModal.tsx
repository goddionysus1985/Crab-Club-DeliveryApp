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
  UtensilsCrossed
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { RESTAURANT_INFO } from '../data/menuData';
import { fetchPosterOrderStatus, getPosterClientByPhone } from '../services/posterApi';

// Pleasant Web Audio API melodic chime for status changes
function playOrderSuccessChime() {
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const now = ctx.currentTime;

    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(523.25, now); // C5
    osc1.frequency.exponentialRampToValueAtTime(1046.5, now + 0.15); // C6
    gain1.gain.setValueAtTime(0.15, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.45);

    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(659.25, now + 0.1); // E5
    osc2.frequency.exponentialRampToValueAtTime(1318.5, now + 0.25); // E6
    gain2.gain.setValueAtTime(0.12, now + 0.1);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + 0.1);
    osc2.stop(now + 0.6);

    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate([100, 50, 150]);
    }
  } catch {}
}

// Native Web Browser Push / Desktop Notification
function sendBrowserNotification(title: string, body: string) {
  try {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      if (Notification.permission === 'granted') {
        new Notification(title, {
          body,
          icon: 'https://img.postershop.me/21253/48ff3a5a-f1f0-4892-8331-602d1b6620bb_image.png'
        });
      }
    }
  } catch {}
}

export const OrderTrackerModal: React.FC = () => {
  const { currentOrder, isOrderTrackerOpen, setIsOrderTrackerOpen, showToast, updateUserProfile } = useCart();
  const [currentStep, setCurrentStep] = useState<number>(1);

  useEffect(() => {
    if (!isOrderTrackerOpen || !currentOrder) return;

    // Request notification permissions for background order updates
    if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'default') {
      try {
        Notification.requestPermission();
      } catch {}
    }

    let previousStep = currentStep;
    let isCompleted = false;
    let pollCount = 0;
    let timeoutId: any = null;

    // Check live Poster POS status
    const pollStatus = async () => {
      // Don't poll if order is already completed
      if (isCompleted) return;

      const orderId = currentOrder.posterIncomingOrderId || parseInt(currentOrder.orderNumber, 10);
      if (orderId) {
        pollCount++;
        const liveStatus = await fetchPosterOrderStatus(orderId);
        if (liveStatus) {
          if (liveStatus.stepIndex > previousStep) {
            playOrderSuccessChime();
            showToast(`Статус оновлено: ${liveStatus.statusName}`, undefined, 'success');
            sendBrowserNotification('🦀 Crab Club Delivery', `Замовлення #${currentOrder.orderNumber}: ${liveStatus.statusName}`);
            
            // If order completed and paid in Poster, refresh real bonus balance from Poster CRM
            if (liveStatus.stepIndex === 4 && currentOrder.phone) {
              const cleanPhone = currentOrder.phone.replace(/\D/g, '');
              getPosterClientByPhone(cleanPhone).then(client => {
                if (client && client.bonus !== undefined) {
                  updateUserProfile({ bonusBalance: client.bonus });
                }
              });
            }

            previousStep = liveStatus.stepIndex;
          }
          setCurrentStep(liveStatus.stepIndex);
          if (liveStatus.stepIndex === 4) {
            isCompleted = true; // Terminate polling
            return;
          }
        }
      }

      scheduleNextPoll();
    };

    const scheduleNextPoll = () => {
      if (isCompleted) return;
      // Gentle progressive interval: 5s initially, 10s after 1 min, 15s after 3 mins
      const delay = pollCount < 12 ? 5000 : pollCount < 30 ? 10000 : 15000;
      timeoutId = setTimeout(pollStatus, delay);
    };

    pollStatus();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isOrderTrackerOpen, currentOrder]);

  if (!currentOrder) return null;

  const isTakeaway = currentOrder.orderType === 'takeaway';
  const isDineIn = currentOrder.orderType === 'dinein';

  const steps = [
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
      title: isDineIn ? 'Подача страви' : isTakeaway ? 'Очікує на касі' : 'Кур\'єр у дорозі',
      desc: isDineIn ? 'Страва подається за столик' : isTakeaway ? 'Завітайте до закладу та заберіть' : 'В дорозі в термобоксах',
      icon: isDineIn ? UtensilsCrossed : isTakeaway ? ShoppingBag : Truck
    },
    {
      id: 4,
      title: isDineIn ? 'Подано' : isTakeaway ? 'Видано' : 'Доставлено',
      desc: 'Смачного від Crab Club!',
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
                    Замовлення #{currentOrder.orderNumber}
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
                    const isPassed = step.id <= currentStep;
                    const isCurrent = step.id === currentStep;

                    return (
                      <motion.div
                        key={step.id}
                        layout
                        className={`p-3.5 rounded-2xl border transition-all ${
                          isCurrent
                            ? 'bg-crab-600/20 border-crab-500 text-white ring-1 ring-crab-500/50 shadow-lg shadow-crab-600/20'
                            : isPassed
                            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                            : 'bg-white/[0.02] border-white/[0.06] text-zinc-500'
                        }`}
                      >
                        <div className="mb-2">
                          <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                            isCurrent
                              ? 'apple-button-primary text-white shadow-md'
                              : isPassed
                              ? 'bg-emerald-500/20 text-emerald-400'
                              : 'bg-white/5 text-zinc-500'
                          }`}>
                            <Icon className="w-4 h-4" />
                          </div>
                        </div>

                        <div className="font-bold text-xs text-white mb-0.5">
                          {step.title}
                        </div>
                        <div className="text-[10px] text-zinc-400 leading-tight">
                          {step.desc}
                        </div>
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
                    <div className="text-zinc-300">{RESTAURANT_INFO.address}</div>
                    <div className="text-[10px] text-amber-400/80 pt-0.5">Назвіть касиру номер замовлення: <span className="font-bold text-white">#{currentOrder.orderNumber}</span></div>
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
                  {currentOrder.address && (
                    <div className="text-zinc-400 text-[11px] pt-1">
                      📍 {currentOrder.address.city}, {currentOrder.address.street} {currentOrder.address.house}
                    </div>
                  )}
                </div>

                <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-1">
                  <span className="text-[11px] text-zinc-400 font-semibold uppercase">Оплата та підсумок:</span>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Оплата:</span>
                    <span className="text-white font-medium">
                      {currentOrder.paymentMethod === 'card_online' && 'Онлайн картою'}
                      {currentOrder.paymentMethod === 'card_courier' && (currentOrder.orderType === 'takeaway' ? 'Карткою на касі' : 'Терміналом кур\'єру')}
                      {currentOrder.paymentMethod === 'cash' && (currentOrder.orderType === 'takeaway' ? 'Готівкою на касі' : 'Готівкою кур\'єру')}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm pt-1 border-t border-white/[0.06]">
                    <span className="font-bold text-white">Сума:</span>
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
