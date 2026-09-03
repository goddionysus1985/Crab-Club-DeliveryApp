import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  ShieldCheck, 
  CreditCard, 
  Smartphone, 
  QrCode, 
  CheckCircle2, 
  Lock, 
  ArrowRight,
  Sparkles,
  ExternalLink,
  Receipt
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '../context/CartContext';
import { 
  detectCardType, 
  formatCardNumber, 
  formatExpDate, 
  validateCardNumber, 
  validateExpDate,
  generateMonobankQrData
} from '../utils/payment';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (paymentId: string) => void;
  amount: number;
  orderNumber: string;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  amount,
  orderNumber,
}) => {
  const [method, setMethod] = useState<'apple_pay' | 'monobank' | 'card'>('apple_pay');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExp, setCardExp] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const cardType = detectCardType(cardNumber);
  const monobankData = generateMonobankQrData(amount, orderNumber);

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardNumber(formatCardNumber(e.target.value));
    setErrorMessage('');
  };

  const handleExpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardExp(formatExpDate(e.target.value));
    setErrorMessage('');
  };

  const handlePay = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMessage('');

    if (method === 'card') {
      const rawCard = cardNumber.replace(/\s/g, '');
      if (rawCard.length < 16) {
        setErrorMessage('Вкажіть повний 16-значний номер картки');
        return;
      }
      if (!validateExpDate(cardExp)) {
        setErrorMessage('Недійсний термін дії картки (MM/YY)');
        return;
      }
      if (cardCvv.length < 3) {
        setErrorMessage('Вкажіть 3 цифри CVV коду');
        return;
      }
    }

    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.55 },
          colors: ['#10B981', '#F59E0B', '#E11D48', '#FFFFFF']
        });
      } catch {
        // ignore
      }
      const paymentId = `PAY-${Date.now()}`;
      onSuccess(paymentId);
    }, 1200);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 15 }}
            transition={{ type: 'spring', damping: 26, stiffness: 320 }}
            className="relative w-full max-w-lg bg-[#111119] border border-white/[0.12] rounded-3xl overflow-hidden shadow-2xl z-10 my-auto"
          >
            {/* Header */}
            <div className="p-4 sm:p-5 border-b border-white/[0.08] flex items-center justify-between bg-[#141422]/90 backdrop-blur-xl">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                    Безпечна онлайн-оплата
                  </h2>
                  <p className="text-[11px] text-zinc-400">Замовлення #{orderNumber} • Crab Club</p>
                </div>
              </div>

              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                aria-label="Закрити"
                className="p-2 rounded-2xl bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10"
              >
                <X className="w-4 h-4" />
              </motion.button>
            </div>

            {/* Total Amount Pill */}
            <div className="p-4 bg-gradient-to-r from-emerald-500/10 via-[#181828] to-crab-950/20 border-b border-white/[0.06] flex items-center justify-between">
              <div>
                <span className="text-xs text-zinc-400 font-medium">Сума до сплати:</span>
                <div className="text-2xl font-display font-black text-white tracking-tight">
                  {amount} <span className="text-emerald-400 text-lg">₴</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-black/40 border border-white/10 text-[10px] text-zinc-300">
                <Lock className="w-3 h-3 text-emerald-400" />
                <span>256-bit SSL</span>
              </div>
            </div>

            {/* Payment Method Selector (Apple Segmented Bar) */}
            <div className="p-4 space-y-4">
              <div className="grid grid-cols-3 gap-1.5 bg-[#171724] p-1 rounded-2xl border border-white/[0.06]">
                <button
                  type="button"
                  onClick={() => { setMethod('apple_pay'); setErrorMessage(''); }}
                  className={`relative flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold transition-colors z-10 ${
                    method === 'apple_pay' ? 'text-white' : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  {method === 'apple_pay' && (
                    <motion.div
                      layoutId="payMethodPill"
                      className="absolute inset-0 bg-white/15 rounded-xl shadow-md -z-10"
                      transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                    />
                  )}
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>Apple / GPay</span>
                </button>

                <button
                  type="button"
                  onClick={() => { setMethod('monobank'); setErrorMessage(''); }}
                  className={`relative flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold transition-colors z-10 ${
                    method === 'monobank' ? 'text-white' : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  {method === 'monobank' && (
                    <motion.div
                      layoutId="payMethodPill"
                      className="absolute inset-0 bg-black text-white border border-white/20 rounded-xl shadow-md -z-10"
                      transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                    />
                  )}
                  <span className="text-sm font-black text-white">mono</span>
                </button>

                <button
                  type="button"
                  onClick={() => { setMethod('card'); setErrorMessage(''); }}
                  className={`relative flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold transition-colors z-10 ${
                    method === 'card' ? 'text-white' : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  {method === 'card' && (
                    <motion.div
                      layoutId="payMethodPill"
                      className="absolute inset-0 bg-gradient-to-r from-crab-600 to-crab-700 rounded-xl shadow-md -z-10"
                      transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                    />
                  )}
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>Картка</span>
                </button>
              </div>

              {/* Method 1: Apple Pay & Google Pay */}
              {method === 'apple_pay' && (
                <div className="space-y-4 py-2">
                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-center space-y-3">
                    <p className="text-xs text-zinc-300 font-light">
                      Миттєва оплата в 1 дотик через Face ID / Touch ID або Google Pay
                    </p>

                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      disabled={isProcessing}
                      onClick={() => handlePay()}
                      className="w-full py-3.5 px-6 rounded-2xl bg-white text-black font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-xl hover:bg-zinc-100 transition-colors"
                    >
                      <Smartphone className="w-5 h-5" />
                      <span>{isProcessing ? 'Обробка Face ID...' : `Оплатити ${amount} ₴`}</span>
                    </motion.button>
                  </div>
                </div>
              )}

              {/* Method 2: Monobank Pay & QR */}
              {method === 'monobank' && (
                <div className="space-y-4 py-1 text-center">
                  <div className="p-4 rounded-2xl bg-black border border-white/10 space-y-3">
                    <div className="text-xs font-bold text-zinc-300">
                      Скануйте QR-код або перейдіть у застосунок Monobank:
                    </div>

                    <div className="w-40 h-40 bg-white p-2 rounded-2xl mx-auto shadow-xl flex items-center justify-center">
                      <img
                        src={monobankData.qrUrl}
                        alt="Monobank QR"
                        className="w-full h-full object-contain"
                      />
                    </div>

                    <div className="flex gap-2 pt-1">
                      <motion.button
                        whileTap={{ scale: 0.96 }}
                        onClick={() => handlePay()}
                        className="flex-1 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-bold shadow-md"
                      >
                        {isProcessing ? 'Перевірка оплати...' : 'Я оплатив у Monobank'}
                      </motion.button>
                    </div>
                  </div>
                </div>
              )}

              {/* Method 3: Card Form */}
              {method === 'card' && (
                <form onSubmit={handlePay} className="space-y-3">
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <label htmlFor="payment-card-number" className="text-[11px] text-zinc-400 font-medium">Номер картки:</label>
                      <span className="text-[10px] uppercase font-bold text-amber-400">
                        {cardType === 'visa' && '💳 Visa'}
                        {cardType === 'mastercard' && '💳 Mastercard'}
                        {cardType === 'prostir' && '💳 Простір'}
                      </span>
                    </div>
                    <div className="relative">
                      <CreditCard className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        id="payment-card-number"
                        name="cardnumber"
                        autoComplete="cc-number"
                        aria-label="Номер банківської картки"
                        type="text"
                        required
                        maxLength={19}
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                        placeholder="4441 •••• •••• ••••"
                        className="w-full bg-white/[0.04] border border-white/10 rounded-2xl pl-9 pr-3 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label htmlFor="payment-card-exp" className="text-[11px] text-zinc-400 font-medium">Термін дії:</label>
                      <input
                        id="payment-card-exp"
                        name="cc-exp"
                        autoComplete="cc-exp"
                        aria-label="Термін дії картки"
                        type="text"
                        required
                        maxLength={5}
                        value={cardExp}
                        onChange={handleExpChange}
                        placeholder="MM/YY"
                        className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-3 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 font-mono text-center"
                      />
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="payment-card-cvv" className="text-[11px] text-zinc-400 font-medium">CVV / CVC:</label>
                      <input
                        id="payment-card-cvv"
                        name="cc-csc"
                        autoComplete="cc-csc"
                        aria-label="Код безпеки CVV"
                        type="password"
                        required
                        maxLength={3}
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
                        placeholder="•••"
                        className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-3 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 font-mono text-center"
                      />
                    </div>
                  </div>

                  {errorMessage && (
                    <div className="text-xs text-red-400 font-medium text-center bg-red-500/10 p-2 rounded-xl border border-red-500/20">
                      {errorMessage}
                    </div>
                  )}

                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    type="submit"
                    disabled={isProcessing}
                    className="w-full py-3.5 px-6 rounded-2xl apple-button-primary text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-xl shadow-crab-600/30 transition-all mt-2"
                  >
                    {isProcessing ? (
                      <span>Обробка платежу...</span>
                    ) : (
                      <>
                        <span>Оплатити {amount} ₴</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </div>

            {/* Footer Trust Guarantee */}
            <div className="p-3.5 bg-[#0A0A10] border-t border-white/[0.06] flex items-center justify-center gap-4 text-[10px] text-zinc-500">
              <span>🔒 Захищено WayForPay & LiqPay</span>
              <span>•</span>
              <span>🛡️ Стандарт безпеки PCI DSS</span>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
