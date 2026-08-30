import React from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, Sparkles, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const QuickReorderBanner: React.FC = () => {
  const { orderHistory, addOrderItemsToCart, setIsCartOpen, showToast } = useCart();

  if (!orderHistory || orderHistory.length === 0) return null;

  const lastOrder = orderHistory[0];

  const handleReorder = () => {
    addOrderItemsToCart(lastOrder);
    setIsCartOpen(true);
    showToast(`🎉 Страви із замовлення #${lastOrder.orderNumber} додано в кошик!`, undefined, 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 mt-2 mb-4">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-3 sm:p-3.5 rounded-2xl bg-gradient-to-r from-crab-950/60 via-[#161624] to-[#161624] border border-crab-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-crab-600/20 border border-crab-500/30 text-crab-400 flex items-center justify-center shrink-0">
            <RotateCcw className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white">
                Бажаєте повторити ваше останнє замовлення #{lastOrder.orderNumber}?
              </span>
              <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold uppercase hidden xs:inline">
                {lastOrder.total} ₴
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 font-light truncate max-w-md mt-0.5">
              {lastOrder.items.map(i => `${i.product.name} (x${i.quantity})`).join(', ')}
            </p>
          </div>
        </div>

        <motion.button
          whileTap={{ scale: 0.94 }}
          onClick={handleReorder}
          className="px-4 py-2 rounded-xl apple-button-primary text-white text-xs font-bold flex items-center justify-center gap-1.5 shrink-0 shadow-md shadow-crab-600/30"
        >
          <span>Повторити в 1 клік</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </motion.button>
      </motion.div>
    </div>
  );
};
