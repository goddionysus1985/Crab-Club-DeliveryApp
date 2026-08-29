import React from 'react';
import { CheckCircle2, Info, AlertCircle, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const NotificationToast: React.FC = () => {
  const { toast, hideToast } = useCart();

  if (!toast) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-bottom-4 duration-200 pointer-events-auto">
      <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-[#151522] border border-white/20 text-white shadow-2xl backdrop-blur-xl max-w-md">
        {toast.image ? (
          <img
            src={toast.image}
            alt=""
            className="w-9 h-9 rounded-lg object-cover bg-black/40 shrink-0"
          />
        ) : (
          <div className={`p-1 rounded-full shrink-0 ${
            toast.type === 'error' ? 'text-red-400 bg-red-500/20' :
            toast.type === 'info' ? 'text-blue-400 bg-blue-500/20' :
            'text-emerald-400 bg-emerald-500/20'
          }`}>
            {toast.type === 'error' ? <AlertCircle className="w-5 h-5" /> :
             toast.type === 'info' ? <Info className="w-5 h-5" /> :
             <CheckCircle2 className="w-5 h-5" />}
          </div>
        )}

        <div className="text-xs sm:text-sm font-semibold text-slate-100 flex-1">
          {toast.text}
        </div>

        <button
          onClick={hideToast}
          className="p-1 rounded-lg text-slate-400 hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
