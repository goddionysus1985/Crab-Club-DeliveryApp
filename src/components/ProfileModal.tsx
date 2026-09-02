import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  User, 
  Clock, 
  MapPin, 
  Heart, 
  ShoppingBag, 
  RotateCcw, 
  Plus, 
  Calendar,
  Save,
  Phone,
  ShieldCheck,
  Sparkles,
  RefreshCw,
  LogOut,
  Award,
  Gift,
  Truck,
  Store,
  UtensilsCrossed
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/menuData';
import { searchOvidiopolStreets } from '../data/ovidiopolStreets';
import { getPosterClientByPhone, syncUserProfileToPoster } from '../services/posterApi';
import { validateAndFormatPhone, validateCustomerName } from '../utils/security';
import { setHighestNotifiedStep } from '../services/orderNotificationService';

export const ProfileModal: React.FC = () => {
  const { 
    isProfileOpen, 
    setIsProfileOpen, 
    setIsCartOpen,
    profileTab,
    setProfileTab,
    userProfile, 
    updateUserProfile,
    orderHistory,
    addOrderItemsToCart,
    setCurrentOrder,
    setIsOrderTrackerOpen,
    favorites,
    addToCart,
    showToast
  } = useCart();

  // Login form state
  const [loginPhone, setLoginPhone] = useState(userProfile.phone || '');
  const [loginName, setLoginName] = useState(userProfile.name || '');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Active Tab is controlled by context profileTab
  const activeTab = profileTab || 'profile';
  const setActiveTab = (tab: 'profile' | 'history' | 'favorites') => {
    setProfileTab(tab);
  };

  // Edit profile form state
  const [name, setName] = useState(userProfile.name);
  const [phone, setPhone] = useState(userProfile.phone);
  const [city, setCity] = useState(userProfile.city || 'смт. Овідіополь (Центр)');
  const [street, setStreet] = useState(userProfile.street);
  const [house, setHouse] = useState(userProfile.house);
  const [apartment, setApartment] = useState(userProfile.apartment || '');
  const [floor, setFloor] = useState(userProfile.floor || '');
  const [doorphone, setDoorphone] = useState(userProfile.doorphone || '');
  const [isSyncingPoster, setIsSyncingPoster] = useState(false);

  // Smart street autocomplete & collapsible private sector address fields
  const profileHouseInputRef = useRef<HTMLInputElement>(null);
  const profileStreetContainerRef = useRef<HTMLDivElement>(null);
  const [showProfileStreetSuggestions, setShowProfileStreetSuggestions] = useState(false);
  const [showProfileExtraAddress, setShowProfileExtraAddress] = useState<boolean>(() => {
    return Boolean(userProfile.apartment || userProfile.floor || userProfile.doorphone);
  });

  const profileStreetSuggestions = searchOvidiopolStreets(street);

  // Close street suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileStreetContainerRef.current && !profileStreetContainerRef.current.contains(e.target as Node)) {
        setShowProfileStreetSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Sync profile data when opened or changed
  useEffect(() => {
    setName(userProfile.name);
    setPhone(userProfile.phone);
    if (userProfile.city) setCity(userProfile.city);
    if (userProfile.street) setStreet(userProfile.street);
    if (userProfile.house) setHouse(userProfile.house);
    if (userProfile.apartment) setApartment(userProfile.apartment);
    if (userProfile.floor) setFloor(userProfile.floor);
    if (userProfile.doorphone) setDoorphone(userProfile.doorphone);
    if (userProfile.apartment || userProfile.floor || userProfile.doorphone) {
      setShowProfileExtraAddress(true);
    }
  }, [userProfile]);

  // Handle Login & Registration
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const phoneVal = validateAndFormatPhone(loginPhone);
    if (!phoneVal.isValid) {
      showToast('Вкажіть коректний номер телефону (наприклад: 098 123 45 67)', undefined, 'error');
      return;
    }

    const nameVal = validateCustomerName(loginName);
    const finalName = nameVal.isValid ? nameVal.sanitized : (loginName.trim() || 'Гість');

    setIsLoggingIn(true);
    let bonusBalance = 0;

    try {
      // Query Poster CRM by phone for real bonuses & existing profile
      const clean = phoneVal.formatted.replace(/\D/g, '');
      const posterClient = await getPosterClientByPhone(clean);
      if (posterClient && posterClient.bonus !== undefined) {
        bonusBalance = posterClient.bonus;
      }
    } catch {}

    updateUserProfile({
      name: finalName,
      phone: phoneVal.formatted,
      isLoggedIn: true,
      bonusBalance
    });

    try {
      localStorage.setItem('crabclub_user_custom_name', finalName);
    } catch {}

    setIsLoggingIn(false);
    showToast(`🎉 Вітаємо, ${finalName}! Вхід успішно виконано`, undefined, 'success');

    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {}
  };

  // Handle Logout
  const handleLogout = () => {
    updateUserProfile({
      name: '',
      phone: '',
      isLoggedIn: false
    });
    showToast('Ви вийшли з особистого кабінету', undefined, 'info');
  };

  // Sync Bonuses with Poster POS
  const handleSyncPoster = async () => {
    if (!userProfile.phone) return;
    setIsSyncingPoster(true);
    try {
      const clean = userProfile.phone.replace(/\D/g, '');
      const client = await getPosterClientByPhone(clean);
      if (client && client.bonus !== undefined) {
        updateUserProfile({ bonusBalance: client.bonus });
        showToast(`🎉 Баланс бонусів оновлено з каси: ${client.bonus} ₴`, undefined, 'success');
      } else {
        showToast('Дані збережено', undefined, 'info');
      }
    } catch {
      showToast('Помилка зв\'язку з сервером лояльності', undefined, 'error');
    } finally {
      setIsSyncingPoster(false);
    }
  };

  // Save Profile & Delivery Address
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();

    const nameVal = validateCustomerName(name);
    const finalName = nameVal.isValid ? nameVal.sanitized : name.trim() || 'Гість';

    try {
      localStorage.setItem('crabclub_user_custom_name', finalName);
    } catch {}

    updateUserProfile({
      name: finalName,
      phone,
      city,
      street,
      house,
      apartment,
      floor,
      doorphone
    });

    // Auto sync updated address directly to Poster CRM
    syncUserProfileToPoster({
      name: finalName,
      phone,
      city,
      street,
      house,
      apartment,
      floor,
      doorphone
    }).catch(() => {});

    showToast('✅ Дані профілю та адресу збережено і синхронізовано з касою!', undefined, 'success');
  };

  const favoriteProductsList = PRODUCTS.filter(p => favorites.includes(p.id));

  return (
    <AnimatePresence>
      {isProfileOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            onClick={() => setIsProfileOpen(false)}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 25 }}
            transition={{ type: 'spring', damping: 26, stiffness: 320 }}
            className="relative w-full max-w-xl bg-[#0F0F16] border border-white/[0.12] rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl z-10 max-h-[92vh] flex flex-col my-auto"
          >
            {/* Header */}
            <div className="p-4 sm:p-5 border-b border-white/[0.08] flex items-center justify-between bg-gradient-to-r from-crab-950/60 to-[#141422]/90 backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-crab-600 to-amber-500 text-white shadow-md">
                  {activeTab === 'favorites' ? (
                    <Heart className="w-5 h-5 fill-white" />
                  ) : activeTab === 'history' ? (
                    <Clock className="w-5 h-5" />
                  ) : (
                    <User className="w-5 h-5" />
                  )}
                </div>
                <div>
                  <h2 className="text-lg font-display font-extrabold text-white tracking-tight">
                    {activeTab === 'favorites' ? 'Улюблені страви' : activeTab === 'history' ? 'Історія замовлень' : (userProfile.isLoggedIn ? userProfile.name || 'Особистий кабінет' : 'Особистий кабінет & Клуб')}
                  </h2>
                  <p className="text-xs text-zinc-400">
                    {activeTab === 'favorites' ? `${favorites.length} збережених позицій` : activeTab === 'history' ? `${orderHistory.length} оформлених замовлень` : (userProfile.isLoggedIn ? 'Бонуси, адреси та профіль' : 'Вхід за номером телефону')}
                  </p>
                </div>
              </div>

              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsProfileOpen(false)}
                aria-label="Закрити"
                className="p-2 rounded-2xl bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Navigation Tabs Bar */}
            <div className="px-4 pt-3 pb-1 border-b border-white/5 bg-[#0D0D15]">
              <div className="flex rounded-2xl bg-white/5 p-1 border border-white/10">
                <button
                  type="button"
                  onClick={() => setActiveTab('profile')}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                    activeTab === 'profile' ? 'bg-crab-600 text-white shadow-md' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <User className="w-3.5 h-3.5" />
                  <span>{userProfile.isLoggedIn ? 'Профіль' : 'Кабінет'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('history')}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                    activeTab === 'history' ? 'bg-crab-600 text-white shadow-md' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>Історія {orderHistory.length > 0 ? `(${orderHistory.length})` : ''}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('favorites')}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                    activeTab === 'favorites' ? 'bg-crab-600 text-white shadow-md' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${favorites.length > 0 ? 'fill-current' : ''}`} />
                  <span>Обране {favorites.length > 0 ? `(${favorites.length})` : ''}</span>
                </button>
              </div>
            </div>

            {/* Content Body */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 hide-scrollbar space-y-5">

              {/* TAB 1: PROFILE & LOGIN */}
              {activeTab === 'profile' && (
                !userProfile.isLoggedIn ? (
                  <div className="space-y-5 py-1">
                    
                    {/* Loyalty Benefits Hero */}
                    <div className="p-5 rounded-3xl bg-gradient-to-br from-amber-500/15 via-crab-600/10 to-transparent border border-amber-500/25 space-y-2">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 text-[11px] font-bold">
                        <Gift className="w-3.5 h-3.5" />
                        <span>Програма лояльності Crab Club</span>
                      </div>
                      <h3 className="text-base font-bold text-white">
                        Отримуйте кешбек 5% з кожного замовлення
                      </h3>
                      <p className="text-xs text-zinc-300 font-light leading-relaxed">
                        Увійдіть за номером телефону, щоб накопичувати бонуси, зберігати адреси доставки в Овідіополі та повторювати замовлення в 1 клік.
                      </p>
                    </div>

                    {/* Login / Registration Form */}
                    <form onSubmit={handleLogin} className="space-y-3.5">
                      <div>
                        <label className="text-xs text-zinc-300 font-semibold flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5 text-amber-400" />
                          <span>Ваш номер телефону:</span>
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="+380 (__) ___-__-__"
                          value={loginPhone}
                          onChange={(e) => setLoginPhone(e.target.value)}
                          className="w-full mt-1.5 bg-white/[0.05] border border-white/15 rounded-2xl px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-amber-400"
                        />
                      </div>

                      <div>
                        <label className="text-xs text-zinc-300 font-semibold flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-amber-400" />
                          <span>Як до вас звертатися (ім'я):</span>
                        </label>
                        <input
                          type="text"
                          placeholder="Наприклад: Олена або Михайло"
                          value={loginName}
                          onChange={(e) => setLoginName(e.target.value)}
                          className="w-full mt-1.5 bg-white/[0.05] border border-white/15 rounded-2xl px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-amber-400"
                        />
                      </div>

                      <motion.button
                        whileTap={{ scale: 0.97 }}
                        type="submit"
                        disabled={isLoggingIn}
                        className="w-full py-3.5 rounded-2xl apple-button-primary text-white text-xs sm:text-sm font-bold shadow-lg shadow-crab-600/30 flex items-center justify-center gap-2 mt-2"
                      >
                        <Sparkles className="w-4 h-4" />
                        <span>{isLoggingIn ? 'Входимо...' : 'Увійти в кабінет'}</span>
                      </motion.button>
                    </form>

                    {/* Security Badge */}
                    <div className="flex items-center justify-center gap-2 text-[11px] text-zinc-400 pt-1">
                      <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Синхронізація з касою ресторану Poster POS</span>
                    </div>

                  </div>
                ) : (
                  <div className="space-y-5">
                    {/* VIP Member Gold Card */}
                    <div className="relative p-5 rounded-3xl bg-gradient-to-br from-[#1E1512] via-[#2A1B14] to-[#14100D] border border-amber-500/35 shadow-xl overflow-hidden">
                      <div className="absolute top-0 right-0 w-40 h-40 bg-amber-500/10 blur-[50px] rounded-full pointer-events-none" />

                      <div className="flex items-start justify-between relative z-10 mb-3.5">
                        <div className="flex items-center gap-3">
                          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-300 text-black font-black text-lg flex items-center justify-center shadow-lg">
                            {(userProfile.name || 'C')[0].toUpperCase()}
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="font-bold text-base text-white">{userProfile.name || 'Гість'}</span>
                              <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold border border-amber-500/30">
                                Gold
                              </span>
                            </div>
                            <div className="text-xs text-zinc-400 font-mono">{userProfile.phone}</div>
                          </div>
                        </div>

                        <button
                          onClick={handleLogout}
                          className="px-2.5 py-1.5 rounded-xl bg-white/5 hover:bg-rose-500/20 text-zinc-400 hover:text-rose-400 text-xs font-medium border border-white/10 flex items-center gap-1 transition-colors"
                        >
                          <LogOut className="w-3.5 h-3.5" />
                          <span>Вийти</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-2.5 pt-3 border-t border-amber-500/20 relative z-10">
                        <div className="p-3 rounded-2xl bg-black/40 border border-white/5 flex items-center justify-between">
                          <div>
                            <div className="text-[10px] text-zinc-400 flex items-center gap-1">
                              <Sparkles className="w-3 h-3 text-amber-400" />
                              <span>Баланс бонусів:</span>
                            </div>
                            <div className="text-xl font-black text-amber-400 font-display mt-0.5">
                              {userProfile.bonusBalance || 0} ₴
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={handleSyncPoster}
                            disabled={isSyncingPoster}
                            aria-label="Оновити бонуси з каси"
                            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-amber-400"
                          >
                            <RefreshCw className={`w-3.5 h-3.5 ${isSyncingPoster ? 'animate-spin text-amber-400' : ''}`} />
                          </button>
                        </div>

                        <div className="p-3 rounded-2xl bg-black/40 border border-white/5">
                          <div className="text-[10px] text-zinc-400 flex items-center gap-1">
                            <Award className="w-3 h-3 text-emerald-400" />
                            <span>Кешбек:</span>
                          </div>
                          <div className="text-sm font-bold text-white mt-1">
                            5% на баланс
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Saved Delivery Address Form */}
                    <form onSubmit={handleSaveProfile} className="space-y-3">
                      <div className="flex items-center gap-2 border-b border-white/10 pb-2">
                        <MapPin className="w-4 h-4 text-amber-400" />
                        <h4 className="text-xs font-bold text-white uppercase tracking-wider">Адреса доставки за замовчуванням</h4>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[11px] text-zinc-300 font-medium">Ваше ім'я:</label>
                          <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full mt-1 bg-white/[0.04] border border-white/10 rounded-2xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                          />
                        </div>

                        <div>
                          <label className="text-[11px] text-zinc-300 font-medium">Телефон:</label>
                          <input
                            type="tel"
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full mt-1 bg-white/[0.04] border border-white/10 rounded-2xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[11px] text-zinc-300 font-medium">Населений пункт / Зона доставки:</label>
                        <select
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          className="w-full mt-1 bg-[#161622] border border-white/10 rounded-2xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                        >
                          <option value="смт. Овідіополь (Центр)">смт. Овідіополь (Центр — 5-15 хв)</option>
                          <option value="смт. Овідіополь (Всі інші райони)">смт. Овідіополь (Всі інші райони — 15-30 хв)</option>
                          <option value="с. Роксолани">с. Роксолани</option>
                          <option value="с. Калаглія">с. Калаглія</option>
                          <option value="с. Миколаївка">с. Миколаївка</option>
                        </select>
                      </div>

                      <div className="grid grid-cols-3 gap-2">
                        <div ref={profileStreetContainerRef} className="col-span-2 relative">
                          <label className="text-[11px] text-zinc-300 font-medium">Вулиця:</label>
                          <input
                            type="text"
                            value={street}
                            onChange={(e) => {
                              setStreet(e.target.value);
                              setShowProfileStreetSuggestions(true);
                            }}
                            onFocus={() => setShowProfileStreetSuggestions(true)}
                            className="w-full mt-1 bg-white/[0.04] border border-white/10 rounded-2xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                          />

                          {/* Smart Street Autocomplete Dropdown */}
                          <AnimatePresence>
                            {showProfileStreetSuggestions && profileStreetSuggestions.length > 0 && (
                              <motion.div
                                initial={{ opacity: 0, y: -4 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -4 }}
                                transition={{ duration: 0.15 }}
                                className="absolute left-0 right-0 top-full mt-1 z-50 bg-[#161622] border border-white/15 rounded-2xl shadow-2xl py-1 backdrop-blur-xl overflow-hidden"
                              >
                                <div className="px-3 py-1 text-[10px] uppercase font-bold text-zinc-400 tracking-wider flex items-center justify-between border-b border-white/5">
                                  <span>Вулиці Овідіополя</span>
                                  <span className="text-[9px] text-zinc-500 font-normal">підказка</span>
                                </div>
                                {profileStreetSuggestions.map((item, idx) => (
                                  <button
                                    key={idx}
                                    type="button"
                                    onMouseDown={(e) => {
                                      e.preventDefault();
                                      setStreet(item);
                                      setShowProfileStreetSuggestions(false);
                                      setTimeout(() => profileHouseInputRef.current?.focus(), 50);
                                    }}
                                    className="w-full px-3 py-2 text-left text-xs text-zinc-200 hover:bg-amber-500/20 hover:text-white flex items-center justify-between transition-colors cursor-pointer"
                                  >
                                    <span className="font-medium truncate">{item}</span>
                                    <span className="text-[10px] text-zinc-500">смт. Овідіополь</span>
                                  </button>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                        <div>
                          <label className="text-[11px] text-zinc-300 font-medium">Будинок:</label>
                          <input
                            ref={profileHouseInputRef}
                            type="text"
                            value={house}
                            onChange={(e) => setHouse(e.target.value)}
                            className="w-full mt-1 bg-white/[0.04] border border-white/10 rounded-2xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                          />
                        </div>
                      </div>

                      {/* Collapsible Extra Address Fields for Private Sector vs Multi-story */}
                      {!showProfileExtraAddress ? (
                        <button
                          type="button"
                          onClick={() => setShowProfileExtraAddress(true)}
                          className="text-[11px] text-zinc-400 hover:text-amber-300 flex items-center gap-1.5 transition-colors py-1 cursor-pointer"
                        >
                          <span className="font-medium text-amber-400">+ Квартира, поверх, домофон</span>
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
                              onClick={() => setShowProfileExtraAddress(false)}
                              className="text-[10px] text-zinc-500 hover:text-zinc-300 cursor-pointer"
                            >
                              Сховати
                            </button>
                          </div>
                          <div className="grid grid-cols-3 gap-2">
                            <div>
                              <label className="text-[11px] text-zinc-300 font-medium">Кв.:</label>
                              <input
                                type="text"
                                value={apartment}
                                onChange={(e) => setApartment(e.target.value)}
                                className="w-full mt-1 bg-white/[0.04] border border-white/10 rounded-2xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                              />
                            </div>
                            <div>
                              <label className="text-[11px] text-zinc-300 font-medium">Поверх:</label>
                              <input
                                type="text"
                                value={floor}
                                onChange={(e) => setFloor(e.target.value)}
                                className="w-full mt-1 bg-white/[0.04] border border-white/10 rounded-2xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                              />
                            </div>
                            <div>
                              <label className="text-[11px] text-zinc-300 font-medium">Домофон:</label>
                              <input
                                type="text"
                                value={doorphone}
                                onChange={(e) => setDoorphone(e.target.value)}
                                className="w-full mt-1 bg-white/[0.04] border border-white/10 rounded-2xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                              />
                            </div>
                          </div>
                        </motion.div>
                      )}

                      <div className="pt-2">
                        <motion.button
                          whileTap={{ scale: 0.97 }}
                          type="submit"
                          className="w-full py-2.5 rounded-2xl apple-button-primary text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md"
                        >
                          <Save className="w-3.5 h-3.5" />
                          <span>Зберегти дані та адресу</span>
                        </motion.button>
                      </div>
                    </form>
                  </div>
                )
              )}

              {/* TAB 2: ORDER HISTORY */}
              {activeTab === 'history' && (
                <div className="space-y-3">
                  {!userProfile.isLoggedIn ? (
                    <div className="p-7 rounded-3xl text-center apple-card border border-white/10 space-y-3">
                      <Clock className="w-10 h-10 text-amber-400/80 mx-auto" />
                      <h4 className="text-sm font-bold text-white">Історія замовлень</h4>
                      <p className="text-xs text-zinc-400 font-light max-w-sm mx-auto">
                        Увійдіть за номером телефону, щоб бачити всі ваші минулі замовлення, повторювати їх в 1 клік та відстежувати кур'єра.
                      </p>
                      <button
                        type="button"
                        onClick={() => setActiveTab('profile')}
                        className="px-5 py-2.5 rounded-xl apple-button-primary text-white text-xs font-bold shadow-md shadow-crab-600/30 inline-flex items-center gap-1.5"
                      >
                        <User className="w-3.5 h-3.5" />
                        <span>Увійти за номером</span>
                      </button>
                    </div>
                  ) : orderHistory.length === 0 ? (
                    <div className="p-7 rounded-3xl text-center apple-card border border-white/10 space-y-2">
                      <ShoppingBag className="w-9 h-9 text-zinc-500 mx-auto" />
                      <h4 className="text-xs font-bold text-white">У вас поки немає замовлень</h4>
                      <p className="text-[11px] text-zinc-400 font-light">Оформіть замовлення та отримуйте кешбек 5% на ваш баланс!</p>
                    </div>
                  ) : (
                    orderHistory.map((histOrder) => {
                      const totalItemsCount = histOrder.items.reduce((acc, it) => acc + (it.quantity || 1), 0);
                      return (
                        <div
                          key={histOrder.orderId}
                          className="apple-card p-4 rounded-3xl border border-white/[0.08] hover:border-white/15 transition-all space-y-3"
                        >
                          {/* Header: Number, Order Type, Date, Total */}
                          <div className="flex items-start justify-between gap-3">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="font-bold text-sm text-white tracking-tight">
                                  Замовлення #{histOrder.orderNumber}
                                </span>
                                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                                  histOrder.orderType === 'dinein'
                                    ? 'bg-purple-500/10 text-purple-300 border-purple-500/25'
                                    : histOrder.orderType === 'takeaway'
                                    ? 'bg-amber-500/10 text-amber-300 border-amber-500/25'
                                    : 'bg-sky-500/10 text-sky-300 border-sky-500/25'
                                }`}>
                                  {histOrder.orderType === 'dinein' ? (
                                    <>
                                      <UtensilsCrossed className="w-3 h-3" />
                                      <span>В закладі</span>
                                    </>
                                  ) : histOrder.orderType === 'takeaway' ? (
                                    <>
                                      <Store className="w-3 h-3" />
                                      <span>Самовивіз</span>
                                    </>
                                  ) : (
                                    <>
                                      <Truck className="w-3 h-3" />
                                      <span>Доставка</span>
                                    </>
                                  )}
                                </span>

                                {/* Live Status Badge in History */}
                                {(() => {
                                  const step = histOrder.orderTrackingStep || (histOrder.status === 'completed' ? 4 : 1);
                                  const isCompleted = step === 4 || histOrder.status === 'completed';
                                  const isDelivering = step === 3 || histOrder.status === 'delivering';
                                  const isCooking = step === 2 || histOrder.status === 'cooking';

                                  return (
                                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                                      isCompleted
                                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25'
                                        : isDelivering
                                        ? 'bg-sky-500/15 text-sky-300 border-sky-500/30 animate-pulse'
                                        : isCooking
                                        ? 'bg-amber-500/15 text-amber-300 border-amber-500/30 animate-pulse'
                                        : 'bg-zinc-500/10 text-zinc-300 border-zinc-500/25'
                                    }`}>
                                      <span className={`w-1.5 h-1.5 rounded-full ${
                                        isCompleted ? 'bg-emerald-400' : isDelivering ? 'bg-sky-400' : isCooking ? 'bg-amber-400' : 'bg-zinc-400'
                                      }`} />
                                      <span>
                                        {isCompleted
                                          ? (histOrder.orderType === 'dinein' ? 'Подано ✓' : histOrder.orderType === 'takeaway' ? 'Видано ✓' : 'Доставлено ✓')
                                          : isDelivering
                                          ? (histOrder.orderType === 'takeaway' ? 'Готово до видачі' : histOrder.orderType === 'dinein' ? 'Подача за стіл' : 'Кур\'єр у дорозі')
                                          : isCooking
                                          ? 'Шеф готує'
                                          : 'Прийнято'}
                                      </span>
                                    </span>
                                  );
                                })()}
                              </div>
                              <div className="text-[11px] text-zinc-400 flex items-center gap-1.5 font-light">
                                <Clock className="w-3 h-3 text-zinc-500" />
                                <span>{histOrder.date}</span>
                                <span>•</span>
                                <span>{totalItemsCount} {totalItemsCount === 1 ? 'страва' : totalItemsCount < 5 ? 'страви' : 'страв'}</span>
                              </div>
                            </div>

                            <div className="text-right shrink-0">
                              <div className="text-base font-black text-amber-400 font-display leading-tight">
                                {histOrder.total} ₴
                              </div>
                              <div className="text-[10px] text-zinc-400 mt-0.5">
                                {histOrder.paymentMethod === 'card_online'
                                  ? 'Оплачено онлайн'
                                  : histOrder.paymentMethod === 'card_courier'
                                  ? 'Картка при отриманні'
                                  : 'Готівка'}
                              </div>
                            </div>
                          </div>

                          {/* Concise Dishes List */}
                          <div className="p-3 rounded-2xl bg-black/35 border border-white/5 space-y-2">
                            <div className="space-y-1.5">
                              {histOrder.items.map((item, idx) => (
                                <div key={idx} className="flex items-center justify-between text-xs text-zinc-200">
                                  <div className="flex items-center gap-2 min-w-0 pr-2">
                                    {item.product?.image && (
                                      <img
                                        src={item.product.image}
                                        alt={item.product.name}
                                        className="w-5 h-5 rounded-md object-cover shrink-0 border border-white/10"
                                      />
                                    )}
                                    <span className="truncate font-medium text-white/90">
                                      {item.product?.name || 'Страва'}
                                    </span>
                                    {item.selectedOptions && item.selectedOptions.length > 0 && (
                                      <span className="text-[10px] text-zinc-400 truncate hidden sm:inline">
                                        ({item.selectedOptions.map(opt => opt.option_name).join(', ')})
                                      </span>
                                    )}
                                  </div>
                                  <span className="text-zinc-400 text-[11px] font-mono shrink-0">
                                    ×{item.quantity}
                                  </span>
                                </div>
                              ))}
                            </div>

                            {/* Delivery Address (if delivery) */}
                            {histOrder.orderType === 'delivery' && histOrder.address && (
                              <div className="pt-2 border-t border-white/5 flex items-center gap-1.5 text-[11px] text-zinc-400 truncate">
                                <MapPin className="w-3 h-3 text-rose-400 shrink-0" />
                                <span className="truncate">
                                  {histOrder.address.city}, {histOrder.address.street} {histOrder.address.house}
                                  {histOrder.address.apartment ? `, кв. ${histOrder.address.apartment}` : ''}
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Action Buttons */}
                          <div className="flex items-center gap-2 pt-0.5">
                            <button
                              type="button"
                              onClick={() => {
                                setCurrentOrder(histOrder);
                                setIsProfileOpen(false);
                                setIsOrderTrackerOpen(true);
                              }}
                              className="flex-1 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-zinc-300 hover:text-white text-xs font-semibold border border-white/10 flex items-center justify-center gap-1.5 transition-colors"
                            >
                              <Clock className="w-3.5 h-3.5 text-amber-400" />
                              <span>Статус / Трекер</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                addOrderItemsToCart(histOrder);
                                setIsProfileOpen(false);
                                setIsCartOpen(true);
                                try {
                                  confetti({
                                    particleCount: 50,
                                    spread: 60,
                                    origin: { y: 0.7 }
                                  });
                                } catch {}
                                showToast(`🎉 Страви із замовлення #${histOrder.orderNumber} додано в кошик!`, undefined, 'success');
                              }}
                              className="flex-1 py-2 rounded-xl apple-button-primary text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-crab-600/30 transition-transform active:scale-[0.98]"
                            >
                              <RotateCcw className="w-3.5 h-3.5" />
                              <span>Повторити замовлення</span>
                            </button>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              )}

              {/* TAB 3: FAVORITES */}
              {activeTab === 'favorites' && (
                <div className="space-y-3">
                  {favoriteProductsList.length === 0 ? (
                    <div className="p-8 rounded-3xl text-center apple-card border border-white/10 space-y-2">
                      <Heart className="w-10 h-10 text-zinc-500 mx-auto" />
                      <h4 className="text-sm font-bold text-white">Список обраного порожній</h4>
                      <p className="text-xs text-zinc-400 font-light max-w-sm mx-auto">
                        Натискайте на сердечко біля страв у меню, щоб зберегти їх сюди для швидкого замовлення!
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {favoriteProductsList.map((prod) => (
                        <div
                          key={prod.id}
                          className="apple-card p-3 rounded-2xl border border-white/[0.08] flex items-center gap-3 hover:border-crab-500/30 transition-all"
                        >
                          <img
                            src={prod.image}
                            alt={prod.name}
                            className="w-14 h-14 rounded-2xl object-cover shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <h5 className="text-xs font-bold text-white truncate">{prod.name}</h5>
                            <span className="text-[10px] text-zinc-400 block">{prod.weight || '1 порція'}</span>
                            <div className="text-xs font-black text-amber-400 mt-0.5">{prod.price} ₴</div>
                          </div>
                          <button
                            onClick={() => addToCart(prod)}
                            className="p-2 rounded-xl apple-button-primary text-white shrink-0 shadow-md shadow-crab-600/30"
                            aria-label="Додати в кошик"
                            title="Додати в кошик"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
