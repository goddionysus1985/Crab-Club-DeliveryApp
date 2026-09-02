import React from 'react';
import { CheckCircle2, Info, AlertCircle, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const NotificationToast: React.FC = () => {
  const { toast, hideToast } = useCart();

  if (!toast) return null;

  return (
    <div className="fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-[100] animate-in fade-in slide-in-from-top-4 duration-200 pointer-events-auto w-[calc(100%-2rem)] max-w-sm sm:max-w-md">
      <div className="flex items-center gap-3 px-4 py-2.5 sm:py-3 rounded-2xl bg-[#151522]/95 border border-white/20 text-white shadow-2xl backdrop-blur-2xl">
        {toast.image ? (
          <img
            src={toast.image}
            alt=""
            className="w-10 h-10 rounded-xl object-cover bg-black/40 shrink-0 border border-white/10"
          />
        ) : (
          <div className={`p-1.5 rounded-xl shrink-0 ${
            toast.type === 'error' ? 'text-rose-400 bg-rose-500/20' :
            toast.type === 'info' ? 'text-blue-400 bg-blue-500/20' :
            'text-emerald-400 bg-emerald-500/20'
          }`}>
            {toast.type === 'error' ? <AlertCircle className="w-5 h-5" /> :
             toast.type === 'info' ? <Info className="w-5 h-5" /> :
             <CheckCircle2 className="w-5 h-5" />}
          </div>
        )}

        <div className="text-xs sm:text-sm font-semibold text-zinc-100 flex-1 min-w-0 line-clamp-2">
          {toast.text}
        </div>

        <button
          onClick={hideToast}
          aria-label="Закрити"
          className="p-1.5 rounded-xl text-zinc-400 hover:text-white hover:bg-white/10 transition-colors shrink-0"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
