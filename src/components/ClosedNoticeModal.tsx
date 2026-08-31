import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Clock, Phone, ArrowRight, Sparkles, X, Calendar } from 'lucide-react';
import { getRestaurantScheduleStatus } from '../utils/workHours';
import { RESTAURANT_INFO } from '../data/menuData';

export const ClosedNoticeModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const scheduleStatus = getRestaurantScheduleStatus();

  useEffect(() => {
    // If restaurant is currently closed (before 10:00 or after 22:00 Kyiv time)
    if (!scheduleStatus.isOpen) {
      const dismissed = sessionStorage.getItem('crabclub_closed_dismissed');
      if (!dismissed) {
        // Short delay so page mounts smoothly first
        const timer = setTimeout(() => {
          setIsOpen(true);
        }, 600);
        return () => clearTimeout(timer);
      }
    }
  }, [scheduleStatus.isOpen]);

  const handleDismiss = () => {
    sessionStorage.setItem('crabclub_closed_dismissed', 'true');
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleDismiss}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 30 }}
            transition={{ type: 'spring', damping: 26, stiffness: 320 }}
            className="relative w-full max-w-lg bg-[#111119] border-t sm:border border-purple-500/30 rounded-t-[32px] sm:rounded-3xl overflow-hidden shadow-2xl z-10 mt-auto sm:my-auto p-5 sm:p-7 text-center space-y-5"
          >
            {/* Grabber on Mobile */}
            <div className="w-12 h-1.5 bg-white/20 rounded-full mx-auto -mt-2 mb-2 sm:hidden shrink-0" />

            {/* Close Icon */}
            <button
              onClick={handleDismiss}
              aria-label="Закрити"
              className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Glow Icon Header */}
            <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-gradient-to-br from-purple-600/30 via-purple-900/20 to-transparent border border-purple-500/40 text-purple-300 shadow-xl shadow-purple-900/40">
              <Moon className="w-8 h-8 text-purple-300 animate-pulse" />
              <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-amber-400 ring-2 ring-[#111119]" />
            </div>

            {/* Title & Description */}
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-[11px] sm:text-xs font-bold uppercase tracking-widest">
                <Clock className="w-3.5 h-3.5 text-purple-400" />
                <span>Пн–Сб: 10:00–22:00 • Нд: 11:00–22:00</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-display font-extrabold text-white tracking-tight">
                Зараз ресторан зачинено
              </h2>

              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-light max-w-md mx-auto">
                Ми відпочиваємо та готуємо найсвіжіші інгредієнти. Але ви можете <strong className="text-amber-400 font-semibold">сформувати замовлення вже зараз</strong> — ми з радістю приготуємо та доставимо його <strong className="text-purple-300 font-semibold">{scheduleStatus.nextOpenTimeText.toLowerCase()}</strong>!
              </p>
            </div>

            {/* Benefits of Pre-ordering */}
            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] text-left grid grid-cols-2 gap-2 text-[11px] sm:text-xs text-zinc-300">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Знижка -10% на самовивіз</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Доставка на точний час</span>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-1">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleDismiss}
                className="w-full py-3.5 px-5 rounded-2xl apple-button-primary text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xl shadow-crab-600/30"
              >
                <span>Переглянути меню та обрати страви</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
