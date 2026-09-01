import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  CheckCircle2, 
  Clock, 
  ChefHat, 
  Truck, 
  PackageCheck, 
  Phone, 
  Sparkles,
  ShoppingBag
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { RESTAURANT_INFO } from '../data/menuData';
import { fetchPosterOrderStatus } from '../services/posterApi';

export const OrderTrackerModal: React.FC = () => {
  const { currentOrder, isOrderTrackerOpen, setIsOrderTrackerOpen } = useCart();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [minutesLeft, setMinutesLeft] = useState<number>(40);
  const [lastSyncText, setLastSyncText] = useState<string>('Онлайн-синхронізація з кухнею');

  useEffect(() => {
    if (!isOrderTrackerOpen || !currentOrder) return;

    // Check live Poster POS status
    const pollStatus = async () => {
      const orderId = currentOrder.posterIncomingOrderId || parseInt(currentOrder.orderNumber, 10);
      if (orderId) {
        const liveStatus = await fetchPosterOrderStatus(orderId);
        if (liveStatus) {
          setCurrentStep(liveStatus.stepIndex);
          setLastSyncText(`Каса: ${liveStatus.statusName}`);
          if (liveStatus.stepIndex === 1) setMinutesLeft(35);
          else if (liveStatus.stepIndex === 2) setMinutesLeft(20);
          else if (liveStatus.stepIndex === 3) setMinutesLeft(10);
          else if (liveStatus.stepIndex === 4) setMinutesLeft(0);
        }
      }
    };

    pollStatus();
    const interval = setInterval(pollStatus, 5000); // Poll every 5s for live POS updates

    const timer = setInterval(() => {
      setMinutesLeft(prev => Math.max(0, prev - 1));
    }, 60000);

    return () => {
      clearInterval(interval);
      clearInterval(timer);
    };
  }, [isOrderTrackerOpen, currentOrder]);

  if (!currentOrder) return null;

  const isTakeaway = currentOrder.orderType === 'takeaway';

  const steps = [
    {
      id: 1,
      title: 'Прийнято рестораном',
      desc: 'Замовлення надійшло в касу',
      icon: CheckCircle2,
      time: currentOrder.date
    },
    {
      id: 2,
      title: 'Шеф-кухар готує',
      desc: 'Свіжі морепродукти та страви',
      icon: ChefHat,
      time: '+10 хв'
    },
    {
      id: 3,
      title: isTakeaway ? 'Очікує на касі' : 'Кур\'єр у дорозі',
      desc: isTakeaway ? 'Завітайте до закладу та заберіть' : 'В дорозі в термобоксах',
      icon: isTakeaway ? ShoppingBag : Truck,
      time: '+20 хв'
    },
    {
      id: 4,
      title: isTakeaway ? 'Видано' : 'Доставлено',
      desc: 'Смачного від Crab Club!',
      icon: PackageCheck,
      time: isTakeaway ? 'Готово' : '~35 хв'
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
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                      Замовлення #{currentOrder.orderNumber}
                    </h2>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30 animate-pulse">
                      Live з каси
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400">
                    Оформлено о {currentOrder.date} • <span className="text-emerald-400 font-medium">{lastSyncText}</span>
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
              
              {/* Estimated Time Card */}
              <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-amber-500/10 via-crab-600/10 to-transparent border border-amber-500/20 flex items-center justify-between shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-inner">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs text-amber-400 font-semibold uppercase tracking-wider">
                      {isTakeaway ? 'Орієнтовний час приготування:' : 'Орієнтовний час доставки:'}
                    </span>
                    <div className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                      {currentStep >= 4 ? 'Готово!' : `~ ${minutesLeft} хвилин`}
                    </div>
                  </div>
                </div>

                <a
                  href={`tel:${RESTAURANT_INFO.phone_raw}`}
                  className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-2xl apple-button-secondary text-white text-xs font-semibold"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  <span>Зв'язатись</span>
                </a>
              </div>

              {/* Stepper Steps */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                  {isTakeaway ? 'Етапи приготування та видачі:' : 'Етапи приготування та доставки:'}
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
                        <div className="flex items-center justify-between mb-2">
                          <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                            isCurrent
                              ? 'apple-button-primary text-white shadow-md'
                              : isPassed
                              ? 'bg-emerald-500/20 text-emerald-400'
                              : 'bg-white/5 text-zinc-500'
                          }`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <span className="text-[10px] font-bold text-zinc-400">{step.time}</span>
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
