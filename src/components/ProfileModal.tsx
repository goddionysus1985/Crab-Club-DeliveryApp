import React, { useState } from 'react';
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
  CheckCircle2, 
  ChevronRight, 
  Calendar,
  Save,
  Phone,
  ShieldCheck,
  Sparkles,
  UtensilsCrossed,
  FileText,
  RefreshCw,
  Send,
  Lock,
  LogOut,
  Award,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/menuData';
import { OrderDetails } from '../types';
import { getPosterClientByPhone } from '../services/posterApi';
import { TelegramLoginWidget, TelegramUser } from './TelegramLoginWidget';
import { 
  requestTelegramAuthCode, 
  verifyTelegramAuthCode, 
  TELEGRAM_AUTH_CONFIG 
} from '../services/telegramAuth';
import { validateAndFormatPhone, validateCustomerName } from '../utils/security';

export const ProfileModal: React.FC = () => {
  const { 
    isProfileOpen, 
    setIsProfileOpen, 
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

  // Tabs for logged in users
  const [activeTab, setActiveTab] = useState<'history' | 'profile' | 'favorites'>('history');

  // Edit profile local form state
  const [name, setName] = useState(userProfile.name);
  const [phone, setPhone] = useState(userProfile.phone);
  const [city, setCity] = useState(userProfile.city || 'смт. Овідіополь (Центр)');
  const [street, setStreet] = useState(userProfile.street);
  const [house, setHouse] = useState(userProfile.house);
  const [apartment, setApartment] = useState(userProfile.apartment || '');
  const [floor, setFloor] = useState(userProfile.floor || '');
  const [doorphone, setDoorphone] = useState(userProfile.doorphone || '');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [isSyncingPoster, setIsSyncingPoster] = useState(false);

  // 1-Click Official Telegram Widget Login Handler
  const handleTelegramWidgetAuth = async (user: TelegramUser) => {
    try {
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    } catch {}

    const fullName = [user.first_name, user.last_name].filter(Boolean).join(' ') || 'Клієнт';

    try {
      localStorage.setItem('crabclub_user_custom_name', fullName);
    } catch {}

    updateUserProfile({
      name: fullName,
      telegramUsername: user.username,
      isLoggedIn: true,
      isVerified: true,
      bonusBalance: userProfile.bonusBalance || 50,
      registeredAt: new Date().toLocaleDateString('uk-UA')
    });

    setName(fullName);
    showToast(`🎉 Вітаємо, ${user.first_name}! Ви успішно увійшли через Telegram`, undefined, 'success');
  };

  // Logout
  const handleLogout = () => {
    updateUserProfile({
      isLoggedIn: false,
      isVerified: false
    });
    showToast('Ви вийшли з профілю', undefined, 'info');
  };

  const handleSyncPoster = async () => {
    if (!phone || phone.replace(/[^\d]/g, '').length < 9) {
      showToast('Будь ласка, введіть коректний номер телефону', undefined, 'error');
      return;
    }
    setIsSyncingPoster(true);
    try {
      const client = await getPosterClientByPhone(phone);
      if (client) {
        // Keep current custom name if already customized
        const currentCustom = name.trim() || userProfile.name.trim();
        const resolvedName = currentCustom && currentCustom !== 'Гість' && currentCustom !== 'Клієнт'
          ? currentCustom
          : (client.firstname && client.firstname !== 'Гість' ? client.firstname : currentCustom || 'Клієнт');

        setName(resolvedName);
        updateUserProfile({
          name: resolvedName,
          phone: client.phone || phone,
          bonusBalance: client.bonus
        });
        showToast(`🎉 Баланс бонусів оновлено: ${client.bonus} ₴`, undefined, 'success');
      } else {
        showToast('Профіль збережено', undefined, 'info');
      }
    } catch (err) {
      showToast('Помилка зв\'язку з сервером лояльності', undefined, 'error');
    } finally {
      setIsSyncingPoster(false);
    }
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (name.trim()) {
        localStorage.setItem('crabclub_user_custom_name', name.trim());
      }
    } catch {}

    updateUserProfile({
      name: name.trim(),
      phone,
      city,
      street,
      house,
      apartment,
      floor,
      doorphone
    });
    setSavedSuccess(true);
    showToast('Дані профілю успішно збережено!', undefined, 'success');
    setTimeout(() => setSavedSuccess(false), 2500);
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
            initial={{ opacity: 0, scale: 0.94, y: 25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 25 }}
            transition={{ type: 'spring', damping: 26, stiffness: 320 }}
            className="relative w-full max-w-2xl bg-[#0F0F16] border border-white/[0.12] rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl z-10 max-h-[92vh] flex flex-col my-auto"
          >
            {/* Header */}
            <div className="p-4 sm:p-6 border-b border-white/[0.08] flex items-center justify-between bg-gradient-to-r from-crab-950/60 to-[#141422]/90 backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-crab-600 to-amber-500 text-white shadow-md">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-display font-extrabold text-white tracking-tight">
                    {userProfile.isLoggedIn ? (userProfile.name || 'Особистий кабінет') : 'Авторизація & Клуб'}
                  </h2>
                  <p className="text-xs text-zinc-400">
                    {userProfile.isLoggedIn ? 'Бонуси, історія замовлень та кешбек' : 'Офіційний вхід в 1 клік через Telegram'}
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

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 hide-scrollbar space-y-6">

              {/* NON-LOGGED-IN: OFFICIAL 1-CLICK TELEGRAM LOGIN */}
              {!userProfile.isLoggedIn ? (
                <div className="max-w-md mx-auto py-6 space-y-6">
                  
                  {/* Telegram Bot Hero Card */}
                  <div className="p-6 rounded-3xl bg-gradient-to-br from-[#161626] to-[#0F0F1A] border border-sky-500/30 text-center space-y-4 shadow-xl">
                    <div className="w-14 h-14 rounded-2xl bg-sky-500/20 border border-sky-400/40 text-sky-400 flex items-center justify-center mx-auto shadow-lg shadow-sky-500/20">
                      <Send className="w-7 h-7" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white mb-1">
                        Вхід в 1 клік через Telegram
                      </h3>
                      <p className="text-xs text-zinc-300 font-light leading-relaxed max-w-sm mx-auto">
                        Натисніть кнопку нижче для миттєвої та 100% безпечної авторизації через офіційний віджет Telegram.
                      </p>
                    </div>

                    {/* Official Telegram Login Widget */}
                    <div className="pt-3 pb-1 flex justify-center">
                      <TelegramLoginWidget
                        onAuth={handleTelegramWidgetAuth}
                        buttonSize="large"
                        cornerRadius={16}
                      />
                    </div>
                  </div>

                  {/* Club Perks Badges */}
                  <div className="grid grid-cols-2 gap-2.5">
                    <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 text-center">
                      <Sparkles className="w-4 h-4 text-amber-400 mx-auto mb-1" />
                      <div className="text-xs font-bold text-white">Кешбек 5%</div>
                      <div className="text-[10px] text-zinc-500">На всі замовлення</div>
                    </div>

                    <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 text-center">
                      <ShieldCheck className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
                      <div className="text-xs font-bold text-white">Безпека бонусів</div>
                      <div className="text-[10px] text-zinc-500">Захист каси Poster</div>
                    </div>
                  </div>

                </div>
              ) : (

                /* LOGGED IN USER DASHBOARD */
                <>
                  {/* VIP Member Gold Card */}
                  <div className="relative p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-[#1C1412] via-[#2A1B14] to-[#120F0D] border border-amber-500/30 shadow-xl overflow-hidden">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 blur-[60px] rounded-full pointer-events-none" />

                    <div className="flex items-start justify-between relative z-10 mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-300 text-black font-black text-xl flex items-center justify-center shadow-lg">
                          {(userProfile.name || 'C')[0].toUpperCase()}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-base text-white">{userProfile.name || 'Гість ресторану'}</span>
                            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30 flex items-center gap-1">
                              <ShieldCheck className="w-3 h-3" />
                              <span>Telegram</span>
                            </span>
                          </div>
                          <div className="text-xs text-zinc-400 font-mono">
                            {userProfile.telegramUsername ? `@${userProfile.telegramUsername}` : userProfile.phone}
                          </div>
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

                    <div className="grid grid-cols-2 gap-3 pt-3 border-t border-amber-500/20 relative z-10">
                      <div className="p-3 rounded-2xl bg-black/40 border border-white/5">
                        <div className="text-[11px] text-zinc-400 flex items-center gap-1">
                          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                          <span>Баланс бонусів:</span>
                        </div>
                        <div className="text-xl sm:text-2xl font-black text-amber-400 font-display mt-0.5">
                          {userProfile.bonusBalance || 0} ₴
                        </div>
                        <div className="text-[10px] text-zinc-500">Кешбек 5% на баланс</div>
                      </div>

                      <div className="p-3 rounded-2xl bg-black/40 border border-white/5">
                        <div className="text-[11px] text-zinc-400 flex items-center gap-1">
                          <Award className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Клубний статус:</span>
                        </div>
                        <div className="text-sm sm:text-base font-bold text-white mt-1">
                          Gold Member
                        </div>
                        <div className="text-[10px] text-emerald-400">Перевірений клієнт</div>
                      </div>
                    </div>
                  </div>

                  {/* Navigation Tabs */}
                  <div className="flex rounded-2xl bg-white/5 p-1 border border-white/10">
                    <button
                      onClick={() => setActiveTab('history')}
                      className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                        activeTab === 'history' ? 'bg-crab-600 text-white shadow-md' : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      <Clock className="w-4 h-4" />
                      <span>Історія ({orderHistory.length})</span>
                    </button>

                    <button
                      onClick={() => setActiveTab('profile')}
                      className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                        activeTab === 'profile' ? 'bg-crab-600 text-white shadow-md' : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      <MapPin className="w-4 h-4" />
                      <span>Мої адреси</span>
                    </button>

                    <button
                      onClick={() => setActiveTab('favorites')}
                      className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                        activeTab === 'favorites' ? 'bg-crab-600 text-white shadow-md' : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      <Heart className="w-4 h-4" />
                      <span>Обране ({favorites.length})</span>
                    </button>
                  </div>

                  {/* Tab 1: Order History */}
                  {activeTab === 'history' && (
                    <div className="space-y-3">
                      {orderHistory.length === 0 ? (
                        <div className="p-8 rounded-3xl text-center apple-card border border-white/10 space-y-2">
                          <ShoppingBag className="w-10 h-10 text-zinc-500 mx-auto" />
                          <h4 className="text-sm font-bold text-white">У вас поки немає замовлень</h4>
                          <p className="text-xs text-zinc-400 font-light">Оформіть перше замовлення та отримайте кешбек 5% на баланс!</p>
                        </div>
                      ) : (
                        orderHistory.map((histOrder) => (
                          <div
                            key={histOrder.orderId}
                            className="apple-card p-4 rounded-2xl border border-white/[0.08] space-y-3"
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <span className="font-bold text-xs text-white">Замовлення #{histOrder.orderNumber}</span>
                                <div className="text-[10px] text-zinc-400">{histOrder.date} • {histOrder.items.length} страв</div>
                              </div>
                              <div className="text-right">
                                <span className="font-black text-sm text-amber-400">{histOrder.total} ₴</span>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 pt-2 border-t border-white/5">
                              <button
                                onClick={() => {
                                  setCurrentOrder(histOrder);
                                  setIsProfileOpen(false);
                                  setIsOrderTrackerOpen(true);
                                }}
                                className="flex-1 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 text-xs font-medium border border-white/10 flex items-center justify-center gap-1.5"
                              >
                                <Clock className="w-3.5 h-3.5" />
                                <span>Трекер</span>
                              </button>

                              <button
                                onClick={() => addOrderItemsToCart(histOrder)}
                                className="flex-1 py-2 rounded-xl apple-button-primary text-white text-xs font-bold flex items-center justify-center gap-1.5"
                              >
                                <RotateCcw className="w-3.5 h-3.5" />
                                <span>Повторити</span>
                              </button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  )}

                  {/* Tab 2: Saved Address & Edit Profile */}
                  {activeTab === 'profile' && (
                    <form onSubmit={handleSaveProfile} className="space-y-3.5">
                      <div>
                        <label className="text-xs text-zinc-300 font-medium">Ваше ім'я:</label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full mt-1 bg-white/[0.04] border border-white/10 rounded-2xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                        />
                      </div>

                      <div>
                        <label className="text-xs text-zinc-300 font-medium">Телефон:</label>
                        <input
                          type="tel"
                          placeholder="+380..."
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full mt-1 bg-white/[0.04] border border-white/10 rounded-2xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                        />
                      </div>

                      <div>
                        <label className="text-xs text-zinc-300 font-medium">Населений пункт:</label>
                        <select
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          className="w-full mt-1 bg-[#161622] border border-white/10 rounded-2xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                        >
                          <option value="смт. Овідіополь (Центр)">смт. Овідіополь (Центр — 5-15 хв)</option>
                          <option value="смт. Овідіополь (Всі інші райони)">смт. Овідіополь (Всі інші райони — 15-30 хв)</option>
                          <option value="с. Роксолани">с. Роксолани</option>
                          <option value="с. Калаглія">с. Калаглія</option>
                          <option value="с. Миколаївка">с. Миколаївка</option>
                        </select>
                      </div>

                      <div className="grid grid-cols-3 gap-2">
                        <div className="col-span-2">
                          <label className="text-xs text-zinc-300 font-medium">Вулиця:</label>
                          <input
                            type="text"
                            placeholder="Шевченка"
                            value={street}
                            onChange={(e) => setStreet(e.target.value)}
                            className="w-full mt-1 bg-white/[0.04] border border-white/10 rounded-2xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-zinc-300 font-medium">Будинок:</label>
                          <input
                            type="text"
                            placeholder="12"
                            value={house}
                            onChange={(e) => setHouse(e.target.value)}
                            className="w-full mt-1 bg-white/[0.04] border border-white/10 rounded-2xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-2">
                        <div>
                          <label className="text-xs text-zinc-300 font-medium">Квартира:</label>
                          <input
                            type="text"
                            placeholder="4"
                            value={apartment}
                            onChange={(e) => setApartment(e.target.value)}
                            className="w-full mt-1 bg-white/[0.04] border border-white/10 rounded-2xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-zinc-300 font-medium">Поверх:</label>
                          <input
                            type="text"
                            placeholder="2"
                            value={floor}
                            onChange={(e) => setFloor(e.target.value)}
                            className="w-full mt-1 bg-white/[0.04] border border-white/10 rounded-2xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-zinc-300 font-medium">Домофон:</label>
                          <input
                            type="text"
                            placeholder="4К"
                            value={doorphone}
                            onChange={(e) => setDoorphone(e.target.value)}
                            className="w-full mt-1 bg-white/[0.04] border border-white/10 rounded-2xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                          />
                        </div>
                      </div>

                      <div className="pt-2 flex gap-2">
                        <button
                          type="button"
                          onClick={handleSyncPoster}
                          disabled={isSyncingPoster}
                          className="px-4 py-2.5 rounded-2xl bg-white/5 hover:bg-white/10 text-zinc-300 text-xs font-semibold border border-white/10 flex items-center gap-1.5"
                        >
                          <RefreshCw className={`w-3.5 h-3.5 ${isSyncingPoster ? 'animate-spin text-amber-400' : ''}`} />
                          <span>Оновити бонуси з каси</span>
                        </button>

                        <button
                          type="submit"
                          className="flex-1 py-2.5 rounded-2xl apple-button-primary text-white text-xs font-bold flex items-center justify-center gap-1.5"
                        >
                          <Save className="w-3.5 h-3.5" />
                          <span>Зберегти</span>
                        </button>
                      </div>
                    </form>
                  )}

                  {/* Tab 3: Favorites */}
                  {activeTab === 'favorites' && (
                    <div className="space-y-3">
                      {favoriteProductsList.length === 0 ? (
                        <div className="p-8 rounded-3xl text-center apple-card border border-white/10 space-y-2">
                          <Heart className="w-10 h-10 text-zinc-500 mx-auto" />
                          <h4 className="text-sm font-bold text-white">Список обраного порожній</h4>
                          <p className="text-xs text-zinc-400 font-light">Натискайте на сердечко біля страв у меню, щоб зберегти їх сюди!</p>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {favoriteProductsList.map((prod) => (
                            <div
                              key={prod.id}
                              className="apple-card p-3 rounded-2xl border border-white/[0.08] flex items-center gap-3"
                            >
                              <img
                                src={prod.image}
                                alt={prod.name}
                                className="w-14 h-14 rounded-xl object-cover shrink-0"
                              />
                              <div className="flex-1 min-w-0">
                                <h5 className="text-xs font-bold text-white truncate">{prod.name}</h5>
                                <div className="text-xs font-black text-amber-400">{prod.price} ₴</div>
                              </div>
                              <button
                                onClick={() => addToCart(prod)}
                                className="p-2 rounded-xl apple-button-primary text-white shrink-0"
                                aria-label="Додати в кошик"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
