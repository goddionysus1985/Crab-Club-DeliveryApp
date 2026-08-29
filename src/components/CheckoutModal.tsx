import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  Sparkles, 
  UtensilsCrossed,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '../context/CartContext';
import { OrderDetails } from '../types';
import { 
  validateCustomerName, 
  validateAndFormatPhone, 
  cleanRawText, 
  securityRateLimiter 
} from '../utils/security';
import { PaymentModal } from './PaymentModal';
import { sendOrderToPoster } from '../services/posterApi';
import { getRestaurantScheduleStatus } from '../utils/workHours';

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
    userProfile,
    showToast
  } = useCart();

  const scheduleStatus = getRestaurantScheduleStatus();

  const [customerName, setCustomerName] = useState(userProfile.name || '');
  const [phone, setPhone] = useState(userProfile.phone || '');
  
  // Delivery address fields
  const [city, setCity] = useState(userProfile.city || 'смт. Овідіополь');
  const [street, setStreet] = useState(userProfile.street || '');
  const [house, setHouse] = useState(userProfile.house || '');
  const [apartment, setApartment] = useState(userProfile.apartment || '');
  const [floor, setFloor] = useState(userProfile.floor || '');
  const [doorphone, setDoorphone] = useState(userProfile.doorphone || '');

  // Keep fields synced with userProfile if modified in profile modal
  useEffect(() => {
    if (userProfile.name && !customerName) setCustomerName(userProfile.name);
    if (userProfile.phone && !phone) setPhone(userProfile.phone);
    if (userProfile.street && !street) setStreet(userProfile.street);
    if (userProfile.house && !house) setHouse(userProfile.house);
    if (userProfile.apartment && !apartment) setApartment(userProfile.apartment);
  }, [userProfile]);

  // Time & payment: if restaurant closed, default to scheduled
  const [deliveryTimeType, setDeliveryTimeType] = useState<'asap' | 'scheduled'>(scheduleStatus.isOpen ? 'asap' : 'scheduled');
  const [scheduledTime, setScheduledTime] = useState(scheduleStatus.isOpen ? '18:00' : '11:00');
  const [paymentMethod, setPaymentMethod] = useState<'card_online' | 'card_courier' | 'cash'>('card_online');
  const [cashChangeFrom, setCashChangeFrom] = useState('');
  const [cutleryCount, setCutleryCount] = useState(2);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOnlinePayOpen, setIsOnlinePayOpen] = useState(false);
  const [pendingOrderDetails, setPendingOrderDetails] = useState<OrderDetails | null>(null);

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (cart.length === 0) {
      showToast('Кошик порожній', undefined, 'error');
      return;
    }

    // Rate limiting: prevent rapid double-clicks or bot spam (max 3 orders per 2 minutes)
    if (!securityRateLimiter.isAllowed('submit_order', 3, 120000)) {
      const cooldown = securityRateLimiter.getRemainingCooldownSeconds('submit_order', 120000);
      showToast(`Зачекайте ${cooldown} сек перед наступним замовленням`, undefined, 'error');
      return;
    }

    // Strict Name Validation
    const nameValidation = validateCustomerName(customerName);
    if (!nameValidation.isValid) {
      showToast(nameValidation.error || 'Вкажіть коректне ім\'я', undefined, 'error');
      return;
    }

    // Strict Phone Validation
    const phoneValidation = validateAndFormatPhone(phone);
    if (!phoneValidation.isValid) {
      showToast('Вкажіть дійсний номер телефону (наприклад: 068 692 13 78)', undefined, 'error');
      return;
    }

    // Address Sanitization
    const sanitizedStreet = cleanRawText(street, 100);
    const sanitizedHouse = cleanRawText(house, 20);
    const sanitizedApartment = cleanRawText(apartment, 10);
    const sanitizedFloor = cleanRawText(floor, 10);
    const sanitizedDoorphone = cleanRawText(doorphone, 10);
    const sanitizedComment = cleanRawText(comment, 300);
    const sanitizedChange = cleanRawText(cashChangeFrom, 50);

    const completeOrder = (order: OrderDetails) => {
      // Send order to Poster POS (or prepare in simulation mode)
      sendOrderToPoster(order).catch(err => console.warn('[Poster POS]', err));

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

      setCurrentOrder(order);
      clearCart();
      setIsSubmitting(false);
      setIsCheckoutOpen(false);
      setIsOrderTrackerOpen(true);
      showToast(`🎉 Замовлення #${order.orderNumber} успішно прийнято!`, undefined, 'success');
    };

    const handleOnlinePaymentSuccess = (paymentId: string) => {
      if (pendingOrderDetails) {
        completeOrder(pendingOrderDetails);
        setIsOnlinePayOpen(false);
        setPendingOrderDetails(null);
      }
    };

    setIsSubmitting(true);

    setTimeout(() => {
      const orderNumber = Math.floor(1000 + Math.random() * 9000).toString();
      const orderId = `CRAB-${Date.now()}`;

      const newOrder: OrderDetails = {
        orderId,
        orderNumber,
        date: new Date().toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' }),
        customerName: nameValidation.sanitized,
        phone: phoneValidation.formatted,
        orderType,
        address: orderType === 'delivery' ? {
          city: cleanRawText(city, 50),
          street: sanitizedStreet,
          house: sanitizedHouse,
          apartment: sanitizedApartment || undefined,
          floor: sanitizedFloor || undefined,
          doorphone: sanitizedDoorphone || undefined
        } : undefined,
        deliveryTimeType,
        scheduledTime: deliveryTimeType === 'scheduled' ? scheduledTime : undefined,
        paymentMethod,
        cashChangeFrom: paymentMethod === 'cash' ? sanitizedChange || undefined : undefined,
        cutleryCount: Math.max(1, Math.min(10, cutleryCount)),
        comment: sanitizedComment || undefined,
        items: [...cart],
        subtotal,
        discount,
        deliveryFee,
        total,
        promoCode: promoCode || undefined,
        status: 'received'
      };

      if (paymentMethod === 'card_online') {
        setPendingOrderDetails(newOrder);
        setIsSubmitting(false);
        setIsOnlinePayOpen(true);
      } else {
        completeOrder(newOrder);
      }
    }, 700);
  };

  return (
    <AnimatePresence>
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            onClick={() => setIsCheckoutOpen(false)}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 15 }}
            transition={{ type: 'spring', damping: 26, stiffness: 320 }}
            className="relative w-full max-w-3xl bg-[#111119] border border-white/[0.12] rounded-3xl overflow-hidden shadow-2xl z-10 max-h-[92vh] flex flex-col my-auto"
          >
            {/* Modal Header */}
            <div className="p-4 sm:p-6 border-b border-white/[0.08] flex items-center justify-between bg-[#141422]/90 backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-crab-600/20 border border-crab-500/30 text-crab-400 shadow-sm">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">Оформлення замовлення</h2>
                  <p className="text-xs text-zinc-400">Швидка доставка з ресторану Crab Club</p>
                </div>
              </div>

              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsCheckoutOpen(false)}
                aria-label="Закрити"
                className="p-2 rounded-2xl bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Scrollable Form Content */}
            <form onSubmit={handleSubmitOrder} className="overflow-y-auto p-4 sm:p-6 space-y-6 flex-1">
              
              {/* Order Type Toggle */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider">
                  Спосіб отримання:
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    type="button"
                    onClick={() => setOrderType('delivery')}
                    className={`p-3.5 rounded-2xl border flex items-center gap-3 transition-all ${
                      orderType === 'delivery'
                        ? 'bg-crab-600/20 border-crab-500 text-white shadow-md'
                        : 'bg-white/[0.03] border-white/10 text-zinc-400 hover:text-white'
                    }`}
                  >
                    <div className={`p-2.5 rounded-xl ${orderType === 'delivery' ? 'bg-crab-600 text-white' : 'bg-white/5'}`}>
                      <Truck className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-sm">Доставка кур'єром</div>
                      <div className="text-[11px] text-zinc-400">45-60 хв • Овідіополь та регіон</div>
                    </div>
                  </motion.button>

                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    type="button"
                    onClick={() => setOrderType('takeaway')}
                    className={`p-3.5 rounded-2xl border flex items-center gap-3 transition-all relative ${
                      orderType === 'takeaway'
                        ? 'bg-crab-600/20 border-crab-500 text-white shadow-md'
                        : 'bg-white/[0.03] border-white/10 text-zinc-400 hover:text-white'
                    }`}
                  >
                    <div className={`p-2.5 rounded-xl ${orderType === 'takeaway' ? 'bg-crab-600 text-white' : 'bg-white/5'}`}>
                      <Store className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-sm flex items-center gap-1.5">
                        <span>Самовивіз</span>
                        <span className="px-1.5 py-0.5 rounded-md bg-amber-400 text-slate-950 text-[10px] font-extrabold">
                          -10%
                        </span>
                      </div>
                      <div className="text-[11px] text-zinc-400">смт. Овідіополь</div>
                    </div>
                  </motion.button>
                </div>
              </div>

              {/* Contact Details */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
                  <User className="w-4 h-4 text-amber-400" />
                  <span>Контактні дані:</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] text-zinc-400">Ваше ім'я *</label>
                    <input
                      type="text"
                      required
                      maxLength={50}
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Олександр"
                      className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] text-zinc-400">Номер телефону *</label>
                    <input
                      type="tel"
                      required
                      maxLength={20}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+380 (__) ___ __ __"
                      className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>
              </div>

              {/* Delivery Address */}
              {orderType === 'delivery' && (
                <div className="space-y-3 p-4 rounded-3xl bg-white/[0.02] border border-white/[0.06]">
                  <h3 className="text-xs font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-crab-400" />
                    <span>Адреса доставки:</span>
                  </h3>

                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-[11px] text-zinc-400">Населений пункт</label>
                      <select
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full bg-[#181826] border border-white/10 rounded-2xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400 cursor-pointer shadow-inner"
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
                        <label className="text-[11px] text-zinc-400">Вулиця *</label>
                        <input
                          type="text"
                          required
                          maxLength={100}
                          value={street}
                          onChange={(e) => setStreet(e.target.value)}
                          placeholder="вул. Шевченка"
                          className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] text-zinc-400">Будинок *</label>
                        <input
                          type="text"
                          required
                          maxLength={20}
                          value={house}
                          onChange={(e) => setHouse(e.target.value)}
                          placeholder="12/A"
                          className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div className="space-y-1">
                        <label className="text-[11px] text-zinc-400">Квартира</label>
                        <input
                          type="text"
                          maxLength={10}
                          value={apartment}
                          onChange={(e) => setApartment(e.target.value)}
                          placeholder="45"
                          className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-3 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] text-zinc-400">Поверх</label>
                        <input
                          type="text"
                          maxLength={10}
                          value={floor}
                          onChange={(e) => setFloor(e.target.value)}
                          placeholder="3"
                          className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-3 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] text-zinc-400">Домофон</label>
                        <input
                          type="text"
                          maxLength={10}
                          value={doorphone}
                          onChange={(e) => setDoorphone(e.target.value)}
                          placeholder="45"
                          className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-3 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Time Picker */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span>Час доставки / приготування:</span>
                </h3>

                {!scheduleStatus.isOpen && (
                  <div className="p-3.5 rounded-2xl bg-purple-500/10 border border-purple-500/30 text-purple-200 text-xs flex items-start gap-2.5">
                    <span className="text-sm shrink-0">🌙</span>
                    <div className="leading-relaxed">
                      <span className="font-bold text-white">Ресторан зараз відпочиває (графік: 10:00–22:00).</span>
                      <p className="text-[11px] text-purple-300 mt-0.5">
                        Ваше передзамовлення буде передано на кухню та приготовлено першим {scheduleStatus.nextOpenTimeText.toLowerCase()}!
                      </p>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3">
                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    type="button"
                    disabled={!scheduleStatus.isOpen}
                    onClick={() => setDeliveryTimeType('asap')}
                    className={`p-3 rounded-2xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                      deliveryTimeType === 'asap'
                        ? 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-md'
                        : 'bg-white/[0.03] border-white/10 text-zinc-400 hover:text-white disabled:opacity-40 disabled:pointer-events-none'
                    }`}
                  >
                    <span>🚀 Якнайшвидше (~45-60 хв)</span>
                  </motion.button>

                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    type="button"
                    onClick={() => setDeliveryTimeType('scheduled')}
                    className={`p-3 rounded-2xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                      deliveryTimeType === 'scheduled'
                        ? 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-md'
                        : 'bg-white/[0.03] border-white/10 text-zinc-400 hover:text-white'
                    }`}
                  >
                    <span>🕒 {scheduleStatus.isOpen ? 'На точний час' : 'Передзамовлення на час'}</span>
                  </motion.button>
                </div>

                {deliveryTimeType === 'scheduled' && (
                  <div className="pt-2 flex items-center gap-3">
                    <label className="text-xs text-zinc-400">Оберіть час:</label>
                    <input
                      type="time"
                      value={scheduledTime}
                      min="10:00"
                      max="22:00"
                      onChange={(e) => setScheduledTime(e.target.value)}
                      className="bg-[#181826] border border-white/15 rounded-2xl px-4 py-2 text-sm text-white focus:outline-none"
                    />
                  </div>
                )}
              </div>

              {/* Payment Method */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
                  <CreditCard className="w-4 h-4 text-emerald-400" />
                  <span>Спосіб оплати:</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    type="button"
                    onClick={() => setPaymentMethod('card_online')}
                    className={`p-3 rounded-2xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition-all text-center ${
                      paymentMethod === 'card_online'
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 shadow-md'
                        : 'bg-white/[0.03] border-white/10 text-zinc-400 hover:text-white'
                    }`}
                  >
                    <Smartphone className="w-5 h-5 text-emerald-400" />
                    <span>Оплата онлайн</span>
                    <span className="text-[10px] text-zinc-400 font-normal">Apple Pay / Google Pay / Картка</span>
                  </motion.button>

                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    type="button"
                    onClick={() => setPaymentMethod('card_courier')}
                    className={`p-3 rounded-2xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition-all text-center ${
                      paymentMethod === 'card_courier'
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 shadow-md'
                        : 'bg-white/[0.03] border-white/10 text-zinc-400 hover:text-white'
                    }`}
                  >
                    <CreditCard className="w-5 h-5 text-amber-400" />
                    <span>Терміналом кур'єру</span>
                    <span className="text-[10px] text-zinc-400 font-normal">При отриманні</span>
                  </motion.button>

                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    type="button"
                    onClick={() => setPaymentMethod('cash')}
                    className={`p-3 rounded-2xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition-all text-center ${
                      paymentMethod === 'cash'
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 shadow-md'
                        : 'bg-white/[0.03] border-white/10 text-zinc-400 hover:text-white'
                    }`}
                  >
                    <Banknote className="w-5 h-5 text-purple-400" />
                    <span>Готівкою кур'єру</span>
                    <span className="text-[10px] text-zinc-400 font-normal">При отриманні</span>
                  </motion.button>
                </div>

                {paymentMethod === 'cash' && (
                  <div className="pt-2">
                    <label className="text-[11px] text-zinc-400">Потрібна решта з купюри:</label>
                    <input
                      type="text"
                      maxLength={50}
                      value={cashChangeFrom}
                      onChange={(e) => setCashChangeFrom(e.target.value)}
                      placeholder="Наприклад: з 1000 грн або без решти"
                      className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-4 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none"
                    />
                  </div>
                )}
              </div>

              {/* Cutlery Count & Comments */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-white/[0.06]">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-zinc-400 flex items-center gap-1">
                    <UtensilsCrossed className="w-3.5 h-3.5 text-amber-400" />
                    <span>Кількість приборів:</span>
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5, 6].map(num => (
                      <motion.button
                        key={num}
                        whileTap={{ scale: 0.85 }}
                        type="button"
                        onClick={() => setCutleryCount(num)}
                        className={`w-8 h-8 rounded-2xl text-xs font-bold transition-all ${
                          cutleryCount === num
                            ? 'apple-button-primary text-white shadow-md'
                            : 'bg-white/5 text-zinc-400 hover:text-white'
                        }`}
                      >
                        {num}
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-zinc-400">Коментар до замовлення:</label>
                  <input
                    type="text"
                    maxLength={250}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Код дверей, передзвонити за 5 хв..."
                    className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none"
                  />
                </div>
              </div>

            </form>

            {/* Modal Footer */}
            <div className="p-4 sm:p-6 bg-[#0D0D15] border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-left w-full sm:w-auto">
                <div className="text-xs text-zinc-400">До сплати:</div>
                <div className="font-display font-extrabold text-2xl text-amber-300 tracking-tight">
                  {total} ₴
                </div>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={() => setIsCheckoutOpen(false)}
                  className="px-5 py-3 rounded-2xl apple-button-secondary text-zinc-300 text-sm font-semibold"
                >
                  Назад
                </motion.button>

                <motion.button
                  whileTap={{ scale: 0.97 }}
                  type="button"
                  disabled={isSubmitting}
                  onClick={handleSubmitOrder}
                  className="flex-1 sm:flex-none px-8 py-3.5 rounded-2xl apple-button-primary text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-xl shadow-crab-600/30 transition-all disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Оформлення...</span>
                  ) : (
                    <>
                      <span>Підтвердити замовлення</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </motion.button>
              </div>
            </div>

          </motion.div>
        </div>
      )}

      {/* Online Payment Modal (Monobank / Apple Pay / Cards) */}
      <PaymentModal
        isOpen={isOnlinePayOpen}
        onClose={() => setIsOnlinePayOpen(false)}
        onSuccess={(paymentId) => {
          if (pendingOrderDetails) {
            const finalOrder: OrderDetails = {
              ...pendingOrderDetails,
              status: 'received'
            };
            // Confetti
            try {
              confetti({
                particleCount: 90,
                spread: 75,
                origin: { y: 0.55 },
                colors: ['#10B981', '#F59E0B', '#E11D48', '#FFFFFF']
              });
            } catch {
              // ignore
            }
            setCurrentOrder(finalOrder);
            clearCart();
            setIsOnlinePayOpen(false);
            setIsCheckoutOpen(false);
            setIsOrderTrackerOpen(true);
            showToast(`💳 Оплата успішна! Замовлення #${finalOrder.orderNumber} прийнято!`, undefined, 'success');
          }
        }}
        amount={total}
        orderNumber={pendingOrderDetails?.orderNumber || '0000'}
      />
    </AnimatePresence>
  );
};
