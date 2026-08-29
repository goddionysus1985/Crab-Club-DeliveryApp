import React, { useState } from 'react';
import { 
  X, 
  Truck, 
  Store, 
  CreditCard, 
  Banknote, 
  Smartphone, 
  Clock, 
  MapPin, 
  User, 
  Phone, 
  CheckCircle, 
  Sparkles, 
  UtensilsCrossed,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '../context/CartContext';
import { RESTAURANT_INFO } from '../data/menuData';
import { OrderDetails } from '../types';

export const CheckoutModal: React.FC = () => {
  const {
    cart,
    isCheckoutOpen,
    setIsCheckoutOpen,
    clearCart,
    subtotal,
    discount,
    deliveryFee,
    total,
    orderType,
    setOrderType,
    promoCode,
    setCurrentOrder,
    setIsOrderTrackerOpen,
    showToast
  } = useCart();

  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  
  // Delivery address fields
  const [city, setCity] = useState('смт. Овідіополь');
  const [street, setStreet] = useState('');
  const [house, setHouse] = useState('');
  const [apartment, setApartment] = useState('');
  const [floor, setFloor] = useState('');
  const [doorphone, setDoorphone] = useState('');

  // Time & payment
  const [deliveryTimeType, setDeliveryTimeType] = useState<'asap' | 'scheduled'>('asap');
  const [scheduledTime, setScheduledTime] = useState('18:00');
  const [paymentMethod, setPaymentMethod] = useState<'card_online' | 'card_courier' | 'cash'>('card_online');
  const [cashChangeFrom, setCashChangeFrom] = useState('');
  const [cutleryCount, setCutleryCount] = useState(2);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isCheckoutOpen) return null;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerName.trim()) {
      showToast('Будь ласка, вкажіть ваше ім\'я', undefined, 'error');
      return;
    }

    if (!phone.trim() || phone.length < 10) {
      showToast('Вкажіть коректний номер телефону', undefined, 'error');
      return;
    }

    if (orderType === 'delivery' && (!street.trim() || !house.trim())) {
      showToast('Вкажіть вулицю та номер будинку для доставки', undefined, 'error');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const orderNumber = Math.floor(1000 + Math.random() * 9000).toString();
      const orderId = `CRAB-${Date.now()}`;

      const newOrder: OrderDetails = {
        orderId,
        orderNumber,
        date: new Date().toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' }),
        customerName,
        phone,
        orderType,
        address: orderType === 'delivery' ? {
          city,
          street,
          house,
          apartment,
          floor,
          doorphone
        } : undefined,
        deliveryTimeType,
        scheduledTime: deliveryTimeType === 'scheduled' ? scheduledTime : undefined,
        paymentMethod,
        cashChangeFrom: paymentMethod === 'cash' ? cashChangeFrom : undefined,
        cutleryCount,
        comment,
        items: [...cart],
        subtotal,
        discount,
        deliveryFee,
        total,
        promoCode: promoCode || undefined,
        status: 'received'
      };

      // Confetti celebration
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#E11D48', '#F59E0B', '#10B981', '#FFFFFF']
        });
      } catch {
        // ignore
      }

      setCurrentOrder(newOrder);
      clearCart();
      setIsSubmitting(false);
      setIsCheckoutOpen(false);
      setIsOrderTrackerOpen(true);
      showToast(`🎉 Замовлення #${orderNumber} успішно прийнято!`, undefined, 'success');
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      {/* Backdrop */}
      <div 
        onClick={() => setIsCheckoutOpen(false)}
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
      />

      <div className="relative w-full max-w-3xl bg-[#111119] border border-white/15 rounded-3xl overflow-hidden shadow-2xl z-10 max-h-[92vh] flex flex-col my-auto animate-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-6 border-b border-white/10 flex items-center justify-between bg-[#141420]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-crab-600/20 border border-crab-500/30 text-crab-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">Оформлення замовлення</h2>
              <p className="text-xs text-slate-400">Швидка доставка з ресторану Crab Club</p>
            </div>
          </div>

          <button
            onClick={() => setIsCheckoutOpen(false)}
            aria-label="Закрити"
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Content */}
        <form onSubmit={handleSubmitOrder} className="overflow-y-auto p-4 sm:p-6 space-y-6 flex-1">
          
          {/* Order Type Toggle */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Спосіб отримання:
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setOrderType('delivery')}
                className={`p-3.5 rounded-2xl border flex items-center gap-3 transition-all ${
                  orderType === 'delivery'
                    ? 'bg-crab-600/20 border-crab-500 text-white shadow-md'
                    : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                }`}
              >
                <div className={`p-2 rounded-xl ${orderType === 'delivery' ? 'bg-crab-600 text-white' : 'bg-white/5'}`}>
                  <Truck className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <div className="font-bold text-sm">Доставка кур'єром</div>
                  <div className="text-[11px] text-slate-400">45-60 хв • Овідіополь та регіон</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setOrderType('takeaway')}
                className={`p-3.5 rounded-2xl border flex items-center gap-3 transition-all relative ${
                  orderType === 'takeaway'
                    ? 'bg-crab-600/20 border-crab-500 text-white shadow-md'
                    : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                }`}
              >
                <div className={`p-2 rounded-xl ${orderType === 'takeaway' ? 'bg-crab-600 text-white' : 'bg-white/5'}`}>
                  <Store className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <div className="font-bold text-sm flex items-center gap-1.5">
                    <span>Самовивіз</span>
                    <span className="px-1.5 py-0.5 rounded bg-amber-400 text-slate-950 text-[10px] font-extrabold">
                      -10%
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400">смт. Овідіополь</div>
                </div>
              </button>
            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <User className="w-4 h-4 text-amber-400" />
              <span>Контактні дані:</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] text-slate-400">Ваше ім'я *</label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Олександр"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] text-slate-400">Номер телефону *</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+380 (__) ___ __ __"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>
          </div>

          {/* Delivery Address (if Delivery selected) */}
          {orderType === 'delivery' && (
            <div className="space-y-3 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-crab-400" />
                <span>Адреса доставки:</span>
              </h3>

              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-[11px] text-slate-400">Населений пункт</label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-[#1A1A26] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400 cursor-pointer"
                  >
                    <option value="смт. Овідіополь">смт. Овідіополь (Центр / Доставка від 300 грн)</option>
                    <option value="с. Роксолани">с. Роксолани</option>
                    <option value="с. Калаглія">с. Калаглія</option>
                    <option value="с. Миколаївка">с. Миколаївка</option>
                    <option value="Інший населений пункт">Інший населений пункт (уточнити у оператора)</option>
                  </select>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="col-span-2 space-y-1">
                    <label className="text-[11px] text-slate-400">Вулиця *</label>
                    <input
                      type="text"
                      required
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                      placeholder="вул. Шевченка"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] text-slate-400">Будинок *</label>
                    <input
                      type="text"
                      required
                      value={house}
                      onChange={(e) => setHouse(e.target.value)}
                      placeholder="12/A"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] text-slate-400">Квартира</label>
                    <input
                      type="text"
                      value={apartment}
                      onChange={(e) => setApartment(e.target.value)}
                      placeholder="45"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] text-slate-400">Поверх</label>
                    <input
                      type="text"
                      value={floor}
                      onChange={(e) => setFloor(e.target.value)}
                      placeholder="3"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] text-slate-400">Домофон</label>
                    <input
                      type="text"
                      value={doorphone}
                      onChange={(e) => setDoorphone(e.target.value)}
                      placeholder="45"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Time Picker */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>Час доставки:</span>
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setDeliveryTimeType('asap')}
                className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                  deliveryTimeType === 'asap'
                    ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                    : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                }`}
              >
                <span>🚀 Якнайшвидше (~45-60 хв)</span>
              </button>

              <button
                type="button"
                onClick={() => setDeliveryTimeType('scheduled')}
                className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                  deliveryTimeType === 'scheduled'
                    ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                    : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                }`}
              >
                <span>🕒 На точний час</span>
              </button>
            </div>

            {deliveryTimeType === 'scheduled' && (
              <div className="pt-2">
                <input
                  type="time"
                  value={scheduledTime}
                  onChange={(e) => setScheduledTime(e.target.value)}
                  className="bg-[#1A1A26] border border-white/15 rounded-xl px-4 py-2 text-sm text-white focus:outline-none"
                />
              </div>
            )}
          </div>

          {/* Payment Method */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <CreditCard className="w-4 h-4 text-emerald-400" />
              <span>Спосіб оплати:</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => setPaymentMethod('card_online')}
                className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition-all text-center ${
                  paymentMethod === 'card_online'
                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                    : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                }`}
              >
                <Smartphone className="w-5 h-5 text-emerald-400" />
                <span>Оплата онлайн</span>
                <span className="text-[10px] text-slate-400 font-normal">Apple Pay / Google Pay / Картка</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('card_courier')}
                className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition-all text-center ${
                  paymentMethod === 'card_courier'
                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                    : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                }`}
              >
                <CreditCard className="w-5 h-5 text-amber-400" />
                <span>Терміналом кур'єру</span>
                <span className="text-[10px] text-slate-400 font-normal">При отриманні</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('cash')}
                className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition-all text-center ${
                  paymentMethod === 'cash'
                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                    : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                }`}
              >
                <Banknote className="w-5 h-5 text-purple-400" />
                <span>Готівкою кур'єру</span>
                <span className="text-[10px] text-slate-400 font-normal">При отриманні</span>
              </button>
            </div>

            {paymentMethod === 'cash' && (
              <div className="pt-2">
                <label className="text-[11px] text-slate-400">Потрібна решта з купюри:</label>
                <input
                  type="text"
                  value={cashChangeFrom}
                  onChange={(e) => setCashChangeFrom(e.target.value)}
                  placeholder="Наприклад: з 1000 грн або без решти"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none"
                />
              </div>
            )}
          </div>

          {/* Cutlery Count & Comments */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-white/5">
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-400 flex items-center gap-1">
                <UtensilsCrossed className="w-3.5 h-3.5 text-amber-400" />
                <span>Кількість приборів / паличок:</span>
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5, 6].map(num => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setCutleryCount(num)}
                    className={`w-8 h-8 rounded-xl text-xs font-bold transition-all ${
                      cutleryCount === num
                        ? 'bg-crab-600 text-white shadow-sm'
                        : 'bg-white/5 text-slate-400 hover:text-white'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-400">Коментар до замовлення:</label>
              <input
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Код дверей, передзвонити за 5 хв..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none"
              />
            </div>
          </div>

        </form>

        {/* Modal Footer */}
        <div className="p-4 sm:p-6 bg-[#0E0E15] border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left w-full sm:w-auto">
            <div className="text-xs text-slate-400">До сплати:</div>
            <div className="font-display font-extrabold text-2xl text-amber-300">
              {total} ₴
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setIsCheckoutOpen(false)}
              className="px-5 py-3 rounded-2xl bg-white/5 hover:bg-white/10 text-slate-300 text-sm font-semibold transition-all"
            >
              Назад
            </button>

            <button
              type="button"
              disabled={isSubmitting}
              onClick={handleSubmitOrder}
              className="flex-1 sm:flex-none px-8 py-3.5 rounded-2xl luxury-button-ruby text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-crab-600/30 transition-all disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Оформлення...</span>
              ) : (
                <>
                  <span>Підтвердити замовлення</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
