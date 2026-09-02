import React, { useState, useEffect, useRef } from 'react';
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
  ArrowRight,
  Info,
  Moon,
  ChevronDown,
  Check,
  ShoppingBag,
  SlidersHorizontal
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
import { PRODUCTS } from '../data/menuData';
import { searchOvidiopolStreets } from '../data/ovidiopolStreets';
import { sendOrderToPoster, getPosterClientByPhone, deductPosterClientBonus } from '../services/posterApi';
import { getRestaurantScheduleStatus } from '../utils/workHours';

export const CheckoutModal: React.FC = () => {
  const {
    cart,
    addToCart,
    isCheckoutOpen,
    setIsCheckoutOpen,
    clearCart,
    subtotal,
    discount,
    cashbackEarned,
    orderType,
    setOrderType,
    promoCode,
    setCurrentOrder,
    setIsOrderTrackerOpen,
    userProfile,
    updateUserProfile,
    showToast,
    catalogProducts,
    openEditCartItem
  } = useCart();

  const scheduleStatus = getRestaurantScheduleStatus();

  const [customerName, setCustomerName] = useState(userProfile.name || '');
  const [phone, setPhone] = useState(userProfile.phone || '');
  
  // Delivery address fields
  const [city, setCity] = useState(userProfile.city || 'смт. Овідіополь (Центр)');
  const [street, setStreet] = useState(userProfile.street || '');
  const [house, setHouse] = useState(userProfile.house || '');
  const [apartment, setApartment] = useState(userProfile.apartment || '');
  const [floor, setFloor] = useState(userProfile.floor || '');
  const [doorphone, setDoorphone] = useState(userProfile.doorphone || '');
  
  const hasSavedProfileAddress = Boolean(userProfile.street && userProfile.street.trim() && userProfile.house && userProfile.house.trim());
  const [useSavedAddress, setUseSavedAddress] = useState(hasSavedProfileAddress);

  // Smart street autocomplete & collapsible private sector address fields
  const houseInputRef = useRef<HTMLInputElement>(null);
  const streetContainerRef = useRef<HTMLDivElement>(null);
  const [showStreetSuggestions, setShowStreetSuggestions] = useState(false);
  const [showExtraAddressFields, setShowExtraAddressFields] = useState<boolean>(() => {
    return Boolean(userProfile.apartment || userProfile.floor || userProfile.doorphone);
  });

  const streetSuggestions = searchOvidiopolStreets(street);

  // Close street suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (streetContainerRef.current && !streetContainerRef.current.contains(e.target as Node)) {
        setShowStreetSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Initialize fields with permanent profile address whenever checkout opens
  useEffect(() => {
    if (isCheckoutOpen) {
      if (userProfile.name) setCustomerName(userProfile.name);
      if (userProfile.phone) setPhone(userProfile.phone);
      if (userProfile.city) setCity(userProfile.city);
      if (userProfile.street) setStreet(userProfile.street);
      if (userProfile.house) setHouse(userProfile.house);
      if (userProfile.apartment) setApartment(userProfile.apartment);
      if (userProfile.floor) setFloor(userProfile.floor);
      if (userProfile.doorphone) setDoorphone(userProfile.doorphone);
      if (userProfile.street && userProfile.house) {
        setUseSavedAddress(true);
      }
      if (userProfile.apartment || userProfile.floor || userProfile.doorphone) {
        setShowExtraAddressFields(true);
      }
    }
  }, [isCheckoutOpen, userProfile]);

  // Sync real-time Poster CRM bonus balance when valid phone is entered
  useEffect(() => {
    const clean = phone.replace(/\D/g, '');
    if (clean.length >= 10) {
      getPosterClientByPhone(clean).then(client => {
        if (client && client.bonus !== undefined) {
          updateUserProfile({ bonusBalance: client.bonus });
        }
      });
    }
  }, [phone]);

  // Bonus Points & Cashback
  const [useBonuses, setUseBonuses] = useState(false);
  const availableBonuses = userProfile.bonusBalance || 0;
  const bonusDeductible = useBonuses ? Math.min(availableBonuses, Math.max(0, subtotal - discount)) : 0;

  // Time & payment: if restaurant closed, default to scheduled
  const [deliveryTimeType, setDeliveryTimeType] = useState<'asap' | 'scheduled'>(scheduleStatus.isOpen ? 'asap' : 'scheduled');
  const [scheduledTime, setScheduledTime] = useState(scheduleStatus.isOpen ? '18:00' : '11:00');
  const [paymentMethod, setPaymentMethod] = useState<'card_online' | 'card_courier' | 'cash'>('cash');
  const [cashChangeFrom, setCashChangeFrom] = useState('');
  const [cutleryCount, setCutleryCount] = useState(1);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOnlinePayOpen, setIsOnlinePayOpen] = useState(false);
  const [pendingOrderDetails, setPendingOrderDetails] = useState<OrderDetails | null>(null);
  const [isTimeDropdownOpen, setIsTimeDropdownOpen] = useState(false);
  const [isPaymentDropdownOpen, setIsPaymentDropdownOpen] = useState(false);

  // Exact Official Delivery Zone Tariff Calculator
  const getZoneDeliveryDetails = (selectedCity: string, sub: number) => {
    if (orderType === 'takeaway') {
      return { fee: 0, threshold: 0, isFree: true, zoneName: 'Самовивіз', basePrice: 0 };
    }
    if (orderType === 'dinein') {
      return { fee: 0, threshold: 0, isFree: true, zoneName: 'В закладі', basePrice: 0 };
    }
    if (selectedCity.includes('Центр')) {
      const isFree = sub >= 500;
      return { fee: isFree ? 0 : 50, threshold: 500, isFree, zoneName: 'Центр', basePrice: 50 };
    }
    if (selectedCity.includes('Росток')) {
      const isFree = sub >= 1700;
      return { fee: isFree ? 0 : 200, threshold: 1700, isFree, zoneName: 'Росток', basePrice: 200 };
    }
    if (selectedCity.includes('Сусідні села') || selectedCity.includes('Роксолани') || selectedCity.includes('Калаглія') || selectedCity.includes('Миколаївка')) {
      const isFree = sub >= 2700;
      return { fee: isFree ? 0 : 300, threshold: 2700, isFree, zoneName: 'Сусідні села', basePrice: 300 };
    }
    if (selectedCity.includes('За межами')) {
      const isFree = sub >= 3700;
      return { fee: isFree ? 0 : 500, threshold: 3700, isFree, zoneName: 'За межами сусідніх сел', basePrice: 500 };
    }
    // Default: Овідіополь (100 грн, free from 1000 грн)
    const isFree = sub >= 1000;
    return { fee: isFree ? 0 : 100, threshold: 1000, isFree, zoneName: 'Овідіополь', basePrice: 100 };
  };

  const zoneDetails = getZoneDeliveryDetails(city, subtotal);
  const finalDeliveryFee = zoneDetails.fee;
  const finalTotal = Math.max(0, subtotal - discount - bonusDeductible + finalDeliveryFee);

  const completeOrder = async (order: OrderDetails) => {
    let finalOrder = { ...order };
    try {
      const res = await sendOrderToPoster(order);
      if (res && res.posterIncomingOrderId) {
        finalOrder.posterIncomingOrderId = res.posterIncomingOrderId;
        if (res.posterTransactionId) {
          finalOrder.posterTransactionId = res.posterTransactionId;
          finalOrder.orderNumber = String(res.posterTransactionId);
        } else {
          finalOrder.orderNumber = String(res.posterIncomingOrderId);
        }
      }
    } catch (err) {
      console.warn('[Poster POS]', err);
    }

    // Deduct bonuses in CRM if used
    if (order.bonusUsed && order.bonusUsed > 0 && order.phone) {
      const cleanPhone = order.phone.replace(/\D/g, '');
      getPosterClientByPhone(cleanPhone).then(client => {
        if (client?.client_id) {
          deductPosterClientBonus(client.client_id, order.bonusUsed || 0);
        }
      });
    }

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

    setCurrentOrder(finalOrder);
    clearCart();
    setIsSubmitting(false);
    setIsOnlinePayOpen(false);
    setPendingOrderDetails(null);
    setIsCheckoutOpen(false);
    setIsOrderTrackerOpen(true);
    showToast(`🎉 Замовлення #${finalOrder.orderNumber} успішно прийнято!`, undefined, 'success');
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (cart.length === 0) {
      showToast('Кошик порожній', undefined, 'error');
      return;
    }

    if (subtotal < 300) {
      showToast('Мінімальна сума замовлення — 300 грн', undefined, 'error');
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

    const activeStreet = (useSavedAddress && userProfile.street) ? userProfile.street : street;
    const activeHouse = (useSavedAddress && userProfile.house) ? userProfile.house : house;
    const activeCity = (useSavedAddress && userProfile.city) ? userProfile.city : city;
    const activeApartment = (useSavedAddress && userProfile.apartment) ? userProfile.apartment : apartment;
    const activeFloor = (useSavedAddress && userProfile.floor) ? userProfile.floor : floor;
    const activeDoorphone = (useSavedAddress && userProfile.doorphone) ? userProfile.doorphone : doorphone;

    // Address Sanitization & Strict Validation
    const sanitizedStreet = cleanRawText(activeStreet, 100);
    const sanitizedHouse = cleanRawText(activeHouse, 20);
    const sanitizedApartment = cleanRawText(activeApartment, 10);
    const sanitizedFloor = cleanRawText(activeFloor, 10);
    const sanitizedDoorphone = cleanRawText(activeDoorphone, 10);
    const sanitizedComment = cleanRawText(comment, 300);
    const sanitizedChange = cleanRawText(cashChangeFrom, 50);

    if (orderType === 'delivery') {
      if (!sanitizedStreet || sanitizedStreet.trim().length < 2) {
        showToast('Вкажіть вулицю для доставки', undefined, 'error');
        return;
      }
      if (!sanitizedHouse || sanitizedHouse.trim().length === 0) {
        showToast('Вкажіть номер будинку для доставки', undefined, 'error');
        return;
      }
    }

    setIsSubmitting(true);

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
        city: cleanRawText(activeCity, 50),
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
      deliveryFee: finalDeliveryFee,
      total: finalTotal,
      promoCode: promoCode || undefined,
      bonusUsed: useBonuses ? bonusDeductible : 0,
      bonusEarned: cashbackEarned,
      status: 'received'
    };

    // Save profile contact & address for future orders
    updateUserProfile({
      name: nameValidation.sanitized,
      phone: phoneValidation.formatted,
      ...(orderType === 'delivery' ? {
        city: cleanRawText(activeCity, 50),
        street: sanitizedStreet,
        house: sanitizedHouse,
        apartment: sanitizedApartment || '',
        floor: sanitizedFloor || '',
        doorphone: sanitizedDoorphone || ''
      } : {})
    });

    if (paymentMethod === 'card_online') {
      setPendingOrderDetails(newOrder);
      setIsSubmitting(false);
      setIsOnlinePayOpen(true);
    } else {
      completeOrder(newOrder);
    }
  };

  return (
    <AnimatePresence>
      {isCheckoutOpen && (
        <div key="checkout-modal-root" className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-y-auto">
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
            initial={{ opacity: 0, scale: 0.96, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 30 }}
            transition={{ type: 'spring', damping: 26, stiffness: 320 }}
            className="relative w-full max-w-lg bg-[#12121A] border-t sm:border border-white/[0.12] rounded-t-[32px] sm:rounded-3xl overflow-hidden shadow-2xl z-10 max-h-[94vh] sm:max-h-[92vh] flex flex-col mt-auto sm:my-auto"
          >
            {/* iOS Grabber Indicator on Mobile */}
            <div className="w-12 h-1.5 bg-white/20 rounded-full mx-auto mt-2.5 mb-1 sm:hidden shrink-0" />

            {/* Modal Header */}
            <div className="px-5 py-4 border-b border-white/[0.08] flex items-center justify-between bg-[#151522]/90 backdrop-blur-xl">
              <button
                type="button"
                onClick={() => setIsCheckoutOpen(false)}
                className="p-1.5 -ml-1 text-zinc-400 hover:text-white transition-colors"
                title="Назад"
              >
                <span className="text-xl leading-none text-rose-500 font-bold">←</span>
              </button>

              <h2 className="text-base sm:text-lg font-bold text-white tracking-tight text-center">
                Замовлення
              </h2>

              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsCheckoutOpen(false)}
                className="p-1.5 -mr-1 text-zinc-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Scrollable Form Body */}
            <form onSubmit={handleSubmitOrder} className="p-4 sm:p-5 overflow-y-auto space-y-4 flex-1">
              
              {/* Contact Inputs */}
              <div className="space-y-2">
                <div className="relative">
                  <User className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    maxLength={50}
                    placeholder="Ваше ім'я"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-[#181824] border border-white/[0.08] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-rose-700"
                  />
                </div>

                <div className="relative">
                  <span className="text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2 text-sm">📞</span>
                  <input
                    type="tel"
                    required
                    maxLength={20}
                    placeholder="Номер телефону"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#181824] border border-white/[0.08] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-rose-700"
                  />
                </div>
              </div>

              {/* Delivery Section */}
              <div className="space-y-2.5 pt-1">
                <label className="text-xs font-bold text-zinc-300">Доставлення</label>
                
                {/* Delivery Type Segmented Tabs */}
                <div className="grid grid-cols-3 gap-1 bg-[#181824] p-1 rounded-xl border border-white/[0.06]">
                  <button
                    type="button"
                    onClick={() => setOrderType('delivery')}
                    className={`py-2 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                      orderType === 'delivery'
                        ? 'bg-[#9f1239] text-white shadow-md'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    <Truck className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">Доставлення</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setOrderType('takeaway')}
                    className={`py-2 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                      orderType === 'takeaway'
                        ? 'bg-[#9f1239] text-white shadow-md'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    <Store className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">Самовивіз</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setOrderType('dinein')}
                    className={`py-2 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                      orderType === 'dinein'
                        ? 'bg-[#9f1239] text-white shadow-md'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    <UtensilsCrossed className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">В закладі</span>
                  </button>
                </div>

                {/* Delivery Address Card & Selector */}
                {orderType === 'delivery' && (
                  <div className="space-y-2">
                    {hasSavedProfileAddress && useSavedAddress ? (
                      /* Saved Address Card (Matching Target Screenshot) */
                      <div className="p-3.5 rounded-xl bg-[#181824] border border-white/[0.08] flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3 min-w-0">
                          <MapPin className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
                          <div className="min-w-0">
                            <div className="text-sm font-semibold text-white truncate">
                              {userProfile.street ? `${userProfile.street} вулиця, ${userProfile.house}` : 'Збережена адреса'}
                            </div>
                            <div className="text-xs text-zinc-400 mt-0.5 truncate">
                              {[
                                userProfile.apartment ? `${userProfile.apartment} під'їзд/кв` : '',
                                userProfile.floor ? `${userProfile.floor} поверх` : '',
                                userProfile.city || city
                              ].filter(Boolean).join(' • ')}
                            </div>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => setUseSavedAddress(false)}
                          className="text-xs text-rose-400 hover:text-rose-300 font-medium shrink-0 pt-0.5"
                        >
                          Інша адреса
                        </button>
                      </div>
                    ) : (
                      /* Manual / Custom Address Fields */
                      <div className="p-3.5 rounded-xl bg-[#181824] border border-white/[0.08] space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-zinc-300">Вкажіть адресу доставки:</span>
                          {hasSavedProfileAddress && (
                            <button
                              type="button"
                              onClick={() => setUseSavedAddress(true)}
                              className="text-xs text-rose-400 hover:text-rose-300 font-medium"
                            >
                              Збережена адреса
                            </button>
                          )}
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11px] text-zinc-400">Зона доставки:</label>
                          <select
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="w-full bg-[#12121A] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-700 cursor-pointer"
                          >
                            <option value="смт. Овідіополь (Центр)">Центр (Овідіополь) — 50 ₴ (безкоштовно від 500 ₴)</option>
                            <option value="смт. Овідіополь (інші райони)">Овідіополь (інші райони) — 100 ₴ (безкоштовно від 1000 ₴)</option>
                            <option value="Масив Росток">Росток — 200 ₴ (безкоштовно від 1700 ₴)</option>
                            <option value="Сусідні села (Роксолани, Калаглія, Миколаївка...)">Сусідні села — 300 ₴ (безкоштовно від 2700 ₴)</option>
                            <option value="За межами сусідніх сел">За межами сусідніх сел — 500 ₴ (безкоштовно від 3700 ₴)</option>
                          </select>
                        </div>

                        <div className="grid grid-cols-3 gap-2">
                          <div ref={streetContainerRef} className="col-span-2 space-y-1 relative">
                            <input
                              type="text"
                              required
                              placeholder="Вулиця *"
                              maxLength={100}
                              value={street}
                              onChange={(e) => {
                                setStreet(e.target.value);
                                setShowStreetSuggestions(true);
                              }}
                              onFocus={() => setShowStreetSuggestions(true)}
                              className="w-full bg-[#12121A] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-700"
                            />

                            {/* Smart Street Autocomplete Dropdown */}
                            <AnimatePresence>
                              {showStreetSuggestions && streetSuggestions.length > 0 && (
                                <motion.div
                                  initial={{ opacity: 0, y: -4 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -4 }}
                                  transition={{ duration: 0.15 }}
                                  className="absolute left-0 right-0 top-full mt-1 z-50 bg-[#161622] border border-white/15 rounded-xl shadow-2xl py-1 backdrop-blur-xl overflow-hidden"
                                >
                                  <div className="px-3 py-1 text-[10px] uppercase font-bold text-zinc-400 tracking-wider flex items-center justify-between border-b border-white/5">
                                    <span>Вулиці Овідіополя</span>
                                    <span className="text-[9px] text-zinc-500 font-normal">швидкий вибір</span>
                                  </div>
                                  {streetSuggestions.map((item, idx) => (
                                    <button
                                      key={idx}
                                      type="button"
                                      onMouseDown={(e) => {
                                        e.preventDefault();
                                        setStreet(item);
                                        setShowStreetSuggestions(false);
                                        setTimeout(() => houseInputRef.current?.focus(), 50);
                                      }}
                                      className="w-full px-3 py-2 text-left text-xs text-zinc-200 hover:bg-rose-600/25 hover:text-white flex items-center justify-between transition-colors cursor-pointer"
                                    >
                                      <span className="font-medium truncate">{item}</span>
                                      <span className="text-[10px] text-zinc-500">смт. Овідіополь</span>
                                    </button>
                                  ))}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>

                          <div className="space-y-1">
                            <input
                              ref={houseInputRef}
                              type="text"
                              required
                              placeholder="Будинок *"
                              maxLength={20}
                              value={house}
                              onChange={(e) => setHouse(e.target.value)}
                              className="w-full bg-[#12121A] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-700"
                            />
                          </div>
                        </div>

                        {/* Collapsible Apartment / Floor / Doorphone for Private Sector vs Multi-story */}
                        {!showExtraAddressFields ? (
                          <button
                            type="button"
                            onClick={() => setShowExtraAddressFields(true)}
                            className="text-[11px] text-zinc-400 hover:text-rose-300 flex items-center gap-1.5 transition-colors py-1 cursor-pointer"
                          >
                            <span className="font-medium text-rose-400">+ Квартира, поверх, домофон</span>
                            <span className="text-[10px] text-zinc-500 font-light">(для багатоквартирних будинків)</span>
                          </button>
                        ) : (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="space-y-1.5 pt-1"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] text-zinc-400 uppercase tracking-wider font-semibold">
                                Квартира / Поверх / Домофон:
                              </span>
                              <button
                                type="button"
                                onClick={() => setShowExtraAddressFields(false)}
                                className="text-[10px] text-zinc-500 hover:text-zinc-300 cursor-pointer"
                              >
                                Сховати
                              </button>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                              <input
                                type="text"
                                placeholder="Під'їзд/Кв"
                                maxLength={10}
                                value={apartment}
                                onChange={(e) => setApartment(e.target.value)}
                                className="w-full bg-[#12121A] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                              />
                              <input
                                type="text"
                                placeholder="Поверх"
                                maxLength={10}
                                value={floor}
                                onChange={(e) => setFloor(e.target.value)}
                                className="w-full bg-[#12121A] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                              />
                              <input
                                type="text"
                                placeholder="Домофон"
                                maxLength={10}
                                value={doorphone}
                                onChange={(e) => setDoorphone(e.target.value)}
                                className="w-full bg-[#12121A] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                              />
                            </div>
                          </motion.div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* Takeaway / Dine-in Address Cards */}
                {orderType === 'takeaway' && (
                  <div className="p-3.5 rounded-xl bg-[#181824] border border-white/[0.08] flex items-center gap-3">
                    <Store className="w-4 h-4 text-emerald-400 shrink-0" />
                    <div className="min-w-0">
                      <div className="text-xs font-semibold text-white">Самовивіз з ресторану Crab Club</div>
                      <div className="text-[11px] text-zinc-400">вулиця Миру, 2, Овідіополь, Одеська область, 67800</div>
                    </div>
                  </div>
                )}

                {orderType === 'dinein' && (
                  <div className="p-3.5 rounded-xl bg-[#181824] border border-white/[0.08] flex items-center gap-3">
                    <UtensilsCrossed className="w-4 h-4 text-amber-400 shrink-0" />
                    <div className="min-w-0">
                      <div className="text-xs font-semibold text-white">В закладі Crab Club</div>
                      <div className="text-[11px] text-zinc-400">вулиця Миру, 2, Овідіополь, Одеська область, 67800</div>
                    </div>
                  </div>
                )}

                {/* Custom Time Selector (Available for Delivery, Takeaway, and Dine-in) */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => {
                      setIsTimeDropdownOpen(!isTimeDropdownOpen);
                      setIsPaymentDropdownOpen(false);
                    }}
                    className="w-full p-3 rounded-xl bg-[#181824] hover:bg-[#1f1f2e] border border-white/[0.08] flex items-center justify-between gap-3 text-left transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5 text-xs text-zinc-200 min-w-0">
                      <Clock className="w-4 h-4 text-rose-400 shrink-0" />
                      <span className="font-medium truncate">
                        {deliveryTimeType === 'asap'
                          ? (orderType === 'delivery'
                              ? 'Доставити якнайшвидше'
                              : 'Приготувати якнайшвидше')
                          : (orderType === 'delivery'
                              ? `Доставити на час: ${scheduledTime}`
                              : orderType === 'takeaway'
                              ? `Самовивіз на час: ${scheduledTime}`
                              : `В закладі на час: ${scheduledTime}`)}
                      </span>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-zinc-400 shrink-0 transition-transform duration-200 ${isTimeDropdownOpen ? 'rotate-180 text-rose-400' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {isTimeDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -6, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -6, scale: 0.98 }}
                        transition={{ duration: 0.15 }}
                        className="absolute left-0 right-0 top-full mt-1.5 z-40 bg-[#161622] border border-white/10 rounded-2xl p-2.5 shadow-2xl backdrop-blur-2xl space-y-2"
                      >
                        <button
                          type="button"
                          onClick={() => {
                            setDeliveryTimeType('asap');
                            setIsTimeDropdownOpen(false);
                          }}
                          className={`w-full px-3 py-2.5 rounded-xl text-xs flex items-center justify-between transition-all ${
                            deliveryTimeType === 'asap'
                              ? 'bg-[#9f1239] text-white font-semibold shadow-sm'
                              : 'text-zinc-300 hover:bg-white/5 hover:text-white'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span>
                              {orderType === 'delivery'
                                ? '🚀 Доставити якнайшвидше'
                                : '⚡ Приготувати якнайшвидше'}
                            </span>
                          </div>
                          {deliveryTimeType === 'asap' && <Check className="w-4 h-4 text-white" />}
                        </button>

                        <div className="pt-2 border-t border-white/[0.06] px-1">
                          <div className="text-[11px] text-zinc-400 font-medium mb-1.5">
                            {orderType === 'delivery' ? 'Або обрати час доставки:' : 'Або обрати час замовлення:'}
                          </div>
                          <div className="grid grid-cols-4 gap-1.5">
                            {['12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00'].map(t => (
                              <button
                                key={t}
                                type="button"
                                onClick={() => {
                                  setDeliveryTimeType('scheduled');
                                  setScheduledTime(t);
                                  setIsTimeDropdownOpen(false);
                                }}
                                className={`py-1.5 px-2 rounded-lg text-xs font-semibold transition-all text-center ${
                                  deliveryTimeType === 'scheduled' && scheduledTime === t
                                    ? 'bg-[#9f1239] text-white shadow-sm'
                                    : 'bg-white/5 text-zinc-300 hover:bg-white/10 hover:text-white'
                                }`}
                              >
                                {t}
                              </button>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Payment Section */}
              <div className="space-y-2 pt-1">
                <label className="text-xs font-bold text-zinc-300">Оплата</label>
                
                {/* Custom Payment Dropdown */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => {
                      setIsPaymentDropdownOpen(!isPaymentDropdownOpen);
                      setIsTimeDropdownOpen(false);
                    }}
                    className="w-full p-3 rounded-xl bg-[#181824] hover:bg-[#1f1f2e] border border-white/[0.08] flex items-center justify-between gap-3 text-left transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5 text-xs text-zinc-200 min-w-0">
                      {paymentMethod === 'card_online' && <Smartphone className="w-4 h-4 text-emerald-400 shrink-0" />}
                      {paymentMethod === 'card_courier' && <CreditCard className="w-4 h-4 text-amber-400 shrink-0" />}
                      {paymentMethod === 'cash' && <Banknote className="w-4 h-4 text-purple-400 shrink-0" />}
                      <span className="font-medium truncate">
                        {paymentMethod === 'card_online' && 'Оплата онлайн (Apple Pay / Картка)'}
                        {paymentMethod === 'card_courier' && (orderType === 'takeaway' ? 'Карткою на касі' : orderType === 'dinein' ? 'Карткою в закладі' : 'Карткою під час отримання (термінал)')}
                        {paymentMethod === 'cash' && (orderType === 'takeaway' ? 'Готівкою на касі' : orderType === 'dinein' ? 'Готівкою в закладі' : 'Готівкою під час отримання')}
                      </span>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-zinc-400 shrink-0 transition-transform duration-200 ${isPaymentDropdownOpen ? 'rotate-180 text-rose-400' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {isPaymentDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -6, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -6, scale: 0.98 }}
                        transition={{ duration: 0.15 }}
                        className="absolute left-0 right-0 top-full mt-1.5 z-40 bg-[#161622] border border-white/10 rounded-2xl p-2 shadow-2xl backdrop-blur-2xl space-y-1"
                      >
                        {[
                          {
                            id: 'card_courier' as const,
                            label: orderType === 'takeaway' ? 'Карткою на касі' : orderType === 'dinein' ? 'Карткою в закладі' : 'Карткою під час отримання',
                            sub: 'Термінал оплати при отриманні',
                            icon: CreditCard,
                            iconColor: 'text-amber-400'
                          },
                          {
                            id: 'cash' as const,
                            label: orderType === 'takeaway' ? 'Готівкою на касі' : orderType === 'dinein' ? 'Готівкою в закладі' : 'Готівкою під час отримання',
                            sub: 'Оплата готівкою кур\'єру',
                            icon: Banknote,
                            iconColor: 'text-purple-400'
                          },
                          {
                            id: 'card_online' as const,
                            label: 'Оплата онлайн',
                            sub: 'Apple Pay / Google Pay / Картка',
                            icon: Smartphone,
                            iconColor: 'text-emerald-400'
                          }
                        ].map(opt => {
                          const isSel = paymentMethod === opt.id;
                          const IconComp = opt.icon;
                          return (
                            <button
                              key={opt.id}
                              type="button"
                              onClick={() => {
                                setPaymentMethod(opt.id);
                                setIsPaymentDropdownOpen(false);
                              }}
                              className={`w-full p-2.5 rounded-xl text-left flex items-center justify-between gap-3 transition-all ${
                                isSel
                                  ? 'bg-[#9f1239] text-white shadow-sm'
                                  : 'text-zinc-300 hover:bg-white/5 hover:text-white'
                              }`}
                            >
                              <div className="flex items-center gap-3 min-w-0">
                                <IconComp className={`w-4 h-4 shrink-0 ${isSel ? 'text-white' : opt.iconColor}`} />
                                <div className="min-w-0">
                                  <div className="text-xs font-semibold truncate">{opt.label}</div>
                                  <div className={`text-[10px] truncate ${isSel ? 'text-rose-200' : 'text-zinc-400'}`}>{opt.sub}</div>
                                </div>
                              </div>
                              {isSel && <Check className="w-4 h-4 text-white shrink-0" />}
                            </button>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {paymentMethod === 'cash' && (
                  <div className="pt-1">
                    <input
                      type="text"
                      maxLength={50}
                      placeholder="Потрібна решта з купюри (наприклад, 500 грн)"
                      value={cashChangeFrom}
                      onChange={(e) => setCashChangeFrom(e.target.value)}
                      className="w-full bg-[#181824] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                    />
                  </div>
                )}
              </div>

              {/* Optional Cutlery & Comment */}
              <div className="pt-2 border-t border-white/[0.06] flex items-center gap-3">
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="text-xs text-zinc-400">Прибори:</span>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4].map(num => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setCutleryCount(num)}
                        className={`w-6 h-6 rounded-lg text-xs font-bold transition-all ${
                          cutleryCount === num
                            ? 'bg-[#9f1239] text-white'
                            : 'bg-white/5 text-zinc-400 hover:text-white'
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>

                <input
                  type="text"
                  maxLength={150}
                  placeholder="Коментар до замовлення..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="flex-1 bg-[#181824] border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none"
                />
              </div>

              {/* Order Items Summary with Modifier Editing */}
              <div className="pt-2 border-t border-white/[0.08] space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-zinc-300 flex items-center gap-1.5">
                    <ShoppingBag className="w-3.5 h-3.5 text-rose-500" />
                    <span>Склад замовлення ({cart.reduce((s, i) => s + i.quantity, 0)} шт)</span>
                  </label>
                  <span className="text-[11px] text-zinc-400 font-medium">
                    {subtotal} грн
                  </span>
                </div>

                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {cart.map((item) => {
                    const fullProd = catalogProducts.find(p => p.id === item.product.id) || PRODUCTS.find(p => p.id === item.product.id) || item.product;
                    const hasMods = fullProd.modifications && fullProd.modifications.length > 0;
                    const hasSelected = item.selectedOptions && item.selectedOptions.length > 0;

                    return (
                      <div
                        key={item.id}
                        className="p-2.5 rounded-xl bg-[#181824] border border-white/[0.06] flex items-center justify-between gap-3"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-10 h-10 rounded-lg object-cover bg-black/40 shrink-0 border border-white/10"
                          />
                          <div className="min-w-0">
                            <div className="text-xs font-bold text-white truncate">
                              {item.product.name} <span className="text-zinc-400 font-normal">× {item.quantity}</span>
                            </div>
                            {/* Modifiers chips */}
                            {hasSelected ? (
                              <div className="flex flex-wrap gap-1 mt-0.5">
                                {item.selectedOptions!.map((opt, idx) => (
                                  <span
                                    key={idx}
                                    className="text-[9px] px-1.5 py-0.2 rounded bg-white/5 border border-white/10 text-zinc-300 font-light truncate"
                                  >
                                    {opt.option_name} {opt.price > 0 ? `(+${opt.price} ₴)` : ''}
                                  </span>
                                ))}
                              </div>
                            ) : (
                              <div className="text-[10px] text-zinc-500">Стандартна порція</div>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <div className="text-right font-extrabold text-xs text-white">
                            {item.totalPrice} ₴
                          </div>
                          {hasMods && (
                            <button
                              type="button"
                              onClick={() => openEditCartItem(item)}
                              className="px-2 py-1 rounded-lg bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 hover:text-white border border-rose-500/30 transition-all flex items-center gap-1 text-[10px] font-semibold shadow-sm"
                              title="Змінити модифікатори"
                            >
                              <SlidersHorizontal className="w-3 h-3 text-rose-400" />
                              <span>{hasSelected ? 'Змінити' : '+ Модифікатори'}</span>
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bonus / Cashback Toggle if Available */}
              {availableBonuses > 0 && (
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-between gap-3">
                  <div className="text-xs text-white">
                    <span>Бонусів на рахунку: </span>
                    <strong className="text-amber-400">{availableBonuses} ₴</strong>
                  </div>
                  <button
                    type="button"
                    onClick={() => setUseBonuses(!useBonuses)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                      useBonuses
                        ? 'bg-amber-500 text-slate-950'
                        : 'bg-white/10 text-zinc-300'
                    }`}
                  >
                    {useBonuses ? `Списано ${bonusDeductible} ₴ ✓` : 'Списати'}
                  </button>
                </div>
              )}

              {/* Price Breakdown */}
              <div className="pt-2 space-y-1.5 text-xs text-zinc-400">
                <div className="flex justify-between items-center">
                  <span>Страви ({cart.reduce((s, i) => s + i.quantity, 0)} шт.):</span>
                  <span className="font-bold text-white text-sm">{subtotal} грн</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between items-center">
                    <span>Знижка:</span>
                    <span className="font-bold text-emerald-400 text-sm">−{discount} грн</span>
                  </div>
                )}
                {bonusDeductible > 0 && (
                  <div className="flex justify-between items-center">
                    <span>Бонуси списано:</span>
                    <span className="font-bold text-amber-400 text-sm">−{bonusDeductible} грн</span>
                  </div>
                )}
                {orderType === 'delivery' && (
                  <div className="flex justify-between items-center">
                    <span>Доставка ({zoneDetails.zoneName}):</span>
                    <span className={`font-bold text-sm ${finalDeliveryFee === 0 ? 'text-emerald-400' : 'text-white'}`}>
                      {finalDeliveryFee === 0 ? (
                        <span>Безкоштовно 🎉</span>
                      ) : (
                        `${finalDeliveryFee} грн`
                      )}
                    </span>
                  </div>
                )}
                {orderType === 'delivery' && finalDeliveryFee === 0 && zoneDetails.basePrice > 0 && (
                  <div className="text-[10px] text-emerald-400/70 text-right">
                    Безкоштовна доставка від {zoneDetails.threshold} грн ✓
                  </div>
                )}
                {orderType === 'delivery' && finalDeliveryFee > 0 && (
                  <div className="text-[10px] text-zinc-500 text-right">
                    Безкоштовно від {zoneDetails.threshold} грн (ще {zoneDetails.threshold - subtotal + discount} грн)
                  </div>
                )}
                <div className="flex justify-between items-center pt-1 border-t border-white/[0.08]">
                  <span className="font-bold text-white">Разом до сплати:</span>
                  <span className="font-bold text-amber-400 text-base">{finalTotal} грн</span>
                </div>
              </div>

              {/* Big Dark Red CTA Button (Matching Target Image) */}
              <div className="pt-2">
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  disabled={isSubmitting}
                  onClick={handleSubmitOrder}
                  className="w-full py-3.5 px-6 rounded-2xl bg-[#9f1239] hover:bg-[#881337] active:bg-[#700f2b] text-white font-bold text-base flex items-center justify-center gap-2 shadow-lg transition-all disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Оформлення...</span>
                  ) : (
                    <span>Оформити за {finalTotal} грн</span>
                  )}
                </motion.button>
              </div>

            </form>
          </motion.div>
        </div>
      )}

      {/* Online Payment Modal (Monobank / Apple Pay / Cards) */}
      <PaymentModal
        isOpen={isOnlinePayOpen}
        onClose={() => setIsOnlinePayOpen(false)}
        onSuccess={async (paymentId) => {
          if (pendingOrderDetails) {
            await completeOrder(pendingOrderDetails);
          }
        }}
        amount={finalTotal}
        orderNumber={pendingOrderDetails?.orderNumber || '0000'}
      />
    </AnimatePresence>
  );
};
