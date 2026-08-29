import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Clock, 
  RotateCcw, 
  ShoppingBag, 
  CheckCircle2, 
  ChevronRight, 
  Calendar,
  UtensilsCrossed
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { OrderDetails } from '../types';

export const OrderHistoryModal: React.FC = () => {
  const { 
    isOrderHistoryOpen, 
    setIsOrderHistoryOpen, 
    orderHistory, 
    repeatOrder,
    setCurrentOrder,
    setIsOrderTrackerOpen
  } = useCart();

  return (
    <AnimatePresence>
      {isOrderHistoryOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOrderHistoryOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 15 }}
            transition={{ type: 'spring', damping: 26, stiffness: 320 }}
            className="relative w-full max-w-xl bg-[#111119] border border-white/[0.12] rounded-3xl overflow-hidden shadow-2xl z-10 my-auto max-h-[85vh] flex flex-col"
          >
            {/* Header */}
            <div className="p-4 sm:p-5 border-b border-white/[0.08] flex items-center justify-between bg-[#141422]/90 backdrop-blur-xl shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="p-2.5 rounded-2xl bg-amber-500/20 border border-amber-500/30 text-amber-400">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                    Історія замовлень
                  </h2>
                  <p className="text-[11px] text-zinc-400">Ваші попередні замовлення в Crab Club</p>
                </div>
              </div>

              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOrderHistoryOpen(false)}
                aria-label="Закрити"
                className="p-2 rounded-2xl bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10"
              >
                <X className="w-4 h-4" />
              </motion.button>
            </div>

            {/* Content List */}
            <div className="overflow-y-auto p-4 sm:p-5 space-y-3 flex-1">
              {orderHistory.length === 0 ? (
                <div className="text-center py-12 space-y-3">
                  <div className="w-16 h-16 rounded-3xl bg-white/[0.03] border border-white/10 flex items-center justify-center mx-auto text-zinc-500">
                    <UtensilsCrossed className="w-8 h-8" />
                  </div>
                  <h3 className="text-base font-bold text-white">Історія замовлень порожня</h3>
                  <p className="text-xs text-zinc-400 max-w-xs mx-auto font-light">
                    Оформіть ваше перше замовлення, і воно з'явиться тут для швидкого повтору в 1 клік!
                  </p>
                </div>
              ) : (
                orderHistory.map((order: OrderDetails) => (
                  <div
                    key={order.orderId}
                    className="p-4 rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.08] transition-all space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-lg bg-crab-600/20 text-crab-300 font-bold text-xs border border-crab-500/30">
                          #{order.orderNumber}
                        </span>
                        <span className="text-xs text-zinc-400 flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-zinc-500" />
                          {order.date}
                        </span>
                      </div>

                      <span className="font-display font-black text-base text-white tracking-tight">
                        {order.total} <span className="text-amber-400 text-xs font-semibold">₴</span>
                      </span>
                    </div>

                    {/* Dishes snippet */}
                    <div className="text-xs text-zinc-300 line-clamp-2 leading-relaxed font-light">
                      {order.items.map(i => `${i.product.name} (${i.quantity} шт)`).join(' • ')}
                    </div>

                    {/* Actions */}
                    <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setCurrentOrder(order);
                          setIsOrderHistoryOpen(false);
                          setIsOrderTrackerOpen(true);
                        }}
                        className="text-xs text-zinc-400 hover:text-white flex items-center gap-1 transition-colors"
                      >
                        <span>Деталі чека</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>

                      <motion.button
                        whileTap={{ scale: 0.94 }}
                        onClick={() => repeatOrder(order)}
                        className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl apple-button-primary text-white text-xs font-bold shadow-md"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Повторити замовлення</span>
                      </motion.button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer summary */}
            {orderHistory.length > 0 && (
              <div className="p-3 bg-[#0A0A10] border-t border-white/[0.06] text-center text-[11px] text-zinc-500 shrink-0">
                Збережено останні {orderHistory.length} замовлень у вашому особистому профілі
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
