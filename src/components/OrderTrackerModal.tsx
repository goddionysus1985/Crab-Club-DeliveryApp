import React, { useState, useEffect } from 'react';
import { 
  X, 
  CheckCircle2, 
  Clock, 
  ChefHat, 
  Truck, 
  PackageCheck, 
  Phone, 
  MapPin, 
  Sparkles,
  ShoppingBag,
  ArrowRight
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { RESTAURANT_INFO } from '../data/menuData';

export const OrderTrackerModal: React.FC = () => {
  const { currentOrder, isOrderTrackerOpen, setIsOrderTrackerOpen } = useCart();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [minutesLeft, setMinutesLeft] = useState<number>(42);

  useEffect(() => {
    if (isOrderTrackerOpen) {
      const timer = setInterval(() => {
        setMinutesLeft(prev => Math.max(5, prev - 1));
      }, 60000);
      return () => clearInterval(timer);
    }
  }, [isOrderTrackerOpen]);

  if (!isOrderTrackerOpen || !currentOrder) return null;

  const steps = [
    {
      id: 1,
      title: 'Прийнято рестораном',
      desc: 'Кухня отримала замовлення',
      icon: CheckCircle2,
      time: currentOrder.date
    },
    {
      id: 2,
      title: 'Шеф-кухар готує',
      desc: 'Свіжі морепродукти та випічка',
      icon: ChefHat,
      time: '+10 хв'
    },
    {
      id: 3,
      title: 'Кур\'єр у дорозі',
      desc: 'В дорозі в термобоксах',
      icon: Truck,
      time: '+25 хв'
    },
    {
      id: 4,
      title: 'Доставлено',
      desc: 'Смачного від Crab Club!',
      icon: PackageCheck,
      time: '~45 хв'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      {/* Backdrop */}
      <div 
        onClick={() => setIsOrderTrackerOpen(false)}
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
      />

      <div className="relative w-full max-w-2xl bg-[#111119] border border-white/15 rounded-3xl overflow-hidden shadow-2xl z-10 max-h-[92vh] flex flex-col my-auto animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-crab-950/60 to-[#141420]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-bold text-white">
                  Замовлення #{currentOrder.orderNumber}
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30 animate-pulse">
                  В процесі
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Оформлено о {currentOrder.date}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsOrderTrackerOpen(false)}
            aria-label="Закрити"
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6 flex-1">
          
          {/* Estimated Time Card */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-crab-600/10 to-transparent border border-amber-500/20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs text-amber-400 font-semibold uppercase tracking-wider">
                  Орієнтовний час доставки:
                </span>
                <div className="text-xl sm:text-2xl font-extrabold text-white">
                  ~ {minutesLeft} хвилин
                </div>
              </div>
            </div>

            <a
              href={`tel:${RESTAURANT_INFO.phone_raw}`}
              className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/10"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>Зв'язатись з нами</span>
            </a>
          </div>

          {/* Stepper Steps */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Етапи приготування та доставки:
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
              {steps.map((step) => {
                const Icon = step.icon;
                const isPassed = step.id <= currentStep;
                const isCurrent = step.id === currentStep;

                return (
                  <div
                    key={step.id}
                    className={`p-3 rounded-2xl border transition-all ${
                      isCurrent
                        ? 'bg-crab-600/20 border-crab-500 text-white ring-1 ring-crab-500/50 shadow-lg shadow-crab-600/20'
                        : isPassed
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                        : 'bg-white/[0.02] border-white/5 text-slate-500'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                        isCurrent
                          ? 'bg-crab-600 text-white'
                          : isPassed
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : 'bg-white/5 text-slate-500'
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-bold text-slate-400">{step.time}</span>
                    </div>

                    <div className="font-bold text-xs text-white mb-0.5">
                      {step.title}
                    </div>
                    <div className="text-[10px] text-slate-400 leading-tight">
                      {step.desc}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Interactive Demo Simulation Controls */}
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/5 text-xs text-slate-400">
              <span className="text-[11px]">Симуляція зміни статусу замовлення:</span>
              <div className="flex gap-1.5">
                {[1, 2, 3, 4].map((s) => (
                  <button
                    key={s}
                    onClick={() => setCurrentStep(s)}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
                      currentStep === s
                        ? 'bg-amber-400 text-slate-950 font-black'
                        : 'bg-white/10 hover:bg-white/20 text-slate-300'
                    }`}
                  >
                    Крок {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Ordered Dishes Preview */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <ShoppingBag className="w-4 h-4 text-amber-400" />
              <span>Склад замовлення ({currentOrder.items.length} страв):</span>
            </h3>

            <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-3 space-y-2 divide-y divide-white/5 max-h-48 overflow-y-auto">
              {currentOrder.items.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between pt-2 first:pt-0">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-10 h-10 rounded-lg object-cover bg-black/40"
                    />
                    <div>
                      <div className="text-xs font-bold text-white">{item.product.name}</div>
                      <div className="text-[10px] text-slate-400">
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
            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1">
              <span className="text-[11px] text-slate-400 font-semibold uppercase">Отримувач:</span>
              <div className="font-bold text-white">{currentOrder.customerName}</div>
              <div className="text-slate-300">{currentOrder.phone}</div>
              {currentOrder.address && (
                <div className="text-slate-400 text-[11px] pt-1">
                  📍 {currentOrder.address.city}, {currentOrder.address.street} {currentOrder.address.house}
                </div>
              )}
            </div>

            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1">
              <span className="text-[11px] text-slate-400 font-semibold uppercase">Оплата та підсумок:</span>
              <div className="flex justify-between">
                <span className="text-slate-400">Оплата:</span>
                <span className="text-white font-medium">
                  {currentOrder.paymentMethod === 'card_online' && 'Онлайн картою'}
                  {currentOrder.paymentMethod === 'card_courier' && 'Терміналом кур\'єру'}
                  {currentOrder.paymentMethod === 'cash' && 'Готівкою кур\'єру'}
                </span>
              </div>
              <div className="flex justify-between text-sm pt-1 border-t border-white/5">
                <span className="font-bold text-white">Сума:</span>
                <span className="font-display font-extrabold text-amber-400">{currentOrder.total} ₴</span>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 bg-[#0E0E15] border-t border-white/10 flex items-center justify-between">
          <div className="text-xs text-slate-400">
            Виникли питання? Ми завжди на зв'язку!
          </div>

          <a
            href={`tel:${RESTAURANT_INFO.phone_raw}`}
            className="px-5 py-2.5 rounded-xl luxury-button-ruby text-white font-bold text-xs sm:text-sm flex items-center gap-2"
          >
            <Phone className="w-4 h-4" />
            <span>{RESTAURANT_INFO.phone}</span>
          </a>
        </div>

      </div>
    </div>
  );
};
