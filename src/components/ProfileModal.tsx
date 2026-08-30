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
  FileText
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/menuData';
import { OrderDetails } from '../types';

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

  const [activeTab, setActiveTab] = useState<'history' | 'profile' | 'favorites'>('history');

  // Edit profile local form state
  const [name, setName] = useState(userProfile.name);
  const [phone, setPhone] = useState(userProfile.phone);
  const [city, setCity] = useState(userProfile.city || 'смт. Овідіополь');
  const [street, setStreet] = useState(userProfile.street);
  const [house, setHouse] = useState(userProfile.house);
  const [apartment, setApartment] = useState(userProfile.apartment || '');
  const [floor, setFloor] = useState(userProfile.floor || '');
  const [doorphone, setDoorphone] = useState(userProfile.doorphone || '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      name,
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
            onClick={() => setIsProfileOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 30 }}
            transition={{ type: 'spring', damping: 26, stiffness: 320 }}
            className="relative w-full max-w-2xl bg-[#111119] border-t sm:border border-white/[0.12] rounded-t-[32px] sm:rounded-3xl overflow-hidden shadow-2xl z-10 mt-auto sm:my-auto max-h-[92vh] sm:max-h-[90vh] flex flex-col"
          >
            {/* iOS Grabber Indicator on Mobile */}
            <div className="w-12 h-1.5 bg-white/20 rounded-full mx-auto mt-2.5 mb-1 sm:hidden shrink-0" />

            {/* Header & User Card */}
            <div className="p-4 sm:p-6 border-b border-white/[0.08] bg-[#141422]/90 backdrop-blur-xl shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-crab-600 to-amber-600 p-0.5 shadow-lg shadow-crab-600/30 flex items-center justify-center text-white">
                    <User className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                        {userProfile.name || 'Особистий кабінет'}
                      </h2>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold tracking-widest bg-amber-500/15 text-amber-400 border border-amber-500/25 uppercase">
                        Гість Crab Club
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400 flex items-center gap-1.5 mt-0.5">
                      <Phone className="w-3 h-3 text-zinc-500" />
                      {userProfile.phone || 'Вкажіть номер телефону у вкладці "Мої дані"'}
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

              {/* Luxury Bonus Balance & Cashback Card */}
              <div className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-amber-500/15 via-[#1E1724] to-crab-950/30 border border-amber-500/25 flex items-center justify-between shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-400">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-amber-300/80 font-bold block">
                      Бонусний баланс (Кешбек 5%)
                    </span>
                    <div className="font-display font-black text-2xl text-white tracking-tight">
                      {userProfile.bonusBalance || 0} <span className="text-amber-400 text-sm font-bold">₴</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 font-bold text-xs border border-amber-500/30 inline-block">
                    1 бонус = 1 ₴
                  </span>
                  <p className="text-[10px] text-zinc-400 mt-1">Списуйте при замовленні</p>
                </div>
              </div>

              {/* Apple Segmented Bar Tabs */}
              <div className="grid grid-cols-3 gap-1 bg-[#0A0A10] p-1 rounded-2xl border border-white/[0.06] mt-4">
                <button
                  type="button"
                  onClick={() => setActiveTab('history')}
                  className={`relative py-2 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 z-10 ${
                    activeTab === 'history' ? 'text-white' : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  {activeTab === 'history' && (
                    <motion.div
                      layoutId="profileTabPill"
                      className="absolute inset-0 bg-gradient-to-r from-crab-600 to-crab-700 rounded-xl shadow-md -z-10"
                      transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                    />
                  )}
                  <Clock className="w-3.5 h-3.5" />
                  <span>Історія ({orderHistory.length})</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('profile')}
                  className={`relative py-2 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 z-10 ${
                    activeTab === 'profile' ? 'text-white' : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  {activeTab === 'profile' && (
                    <motion.div
                      layoutId="profileTabPill"
                      className="absolute inset-0 bg-gradient-to-r from-crab-600 to-crab-700 rounded-xl shadow-md -z-10"
                      transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                    />
                  )}
                  <User className="w-3.5 h-3.5" />
                  <span>Мої дані</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('favorites')}
                  className={`relative py-2 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 z-10 ${
                    activeTab === 'favorites' ? 'text-white' : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  {activeTab === 'favorites' && (
                    <motion.div
                      layoutId="profileTabPill"
                      className="absolute inset-0 bg-gradient-to-r from-crab-600 to-crab-700 rounded-xl shadow-md -z-10"
                      transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                    />
                  )}
                  <Heart className="w-3.5 h-3.5" />
                  <span>Обране ({favorites.length})</span>
                </button>
              </div>
            </div>

            {/* Tab 1: Order History */}
            {activeTab === 'history' && (
              <div className="overflow-y-auto p-4 sm:p-6 space-y-3.5 flex-1">
                {orderHistory.length === 0 ? (
                  <div className="text-center py-12 space-y-3">
                    <div className="w-16 h-16 rounded-3xl bg-white/[0.03] border border-white/10 flex items-center justify-center mx-auto text-zinc-500">
                      <UtensilsCrossed className="w-8 h-8" />
                    </div>
                    <h3 className="text-base font-bold text-white">Історія замовлень порожня</h3>
                    <p className="text-xs text-zinc-400 max-w-xs mx-auto font-light">
                      Оформіть ваше перше замовлення, і воно з'явиться тут з можливістю додати страви в кошик в 1 клік!
                    </p>
                  </div>
                ) : (
                  orderHistory.map((order: OrderDetails) => (
                    <div
                      key={order.orderId}
                      className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.08] transition-all space-y-3.5"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-lg bg-crab-600/20 text-crab-300 font-bold text-xs border border-crab-500/30">
                            № {order.orderNumber}
                          </span>
                          <span className="text-xs text-zinc-400 flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-zinc-500" />
                            {order.date}
                          </span>
                        </div>

                        <span className="font-display font-black text-lg text-white tracking-tight">
                          {order.total} <span className="text-amber-400 text-xs font-semibold">₴</span>
                        </span>
                      </div>

                      {/* Dishes summary */}
                      <div className="space-y-1.5 bg-black/20 p-3 rounded-xl border border-white/[0.04]">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between text-xs">
                            <span className="text-zinc-300 font-light truncate max-w-[280px]">
                              {item.product.name}
                            </span>
                            <span className="text-zinc-400 shrink-0 font-medium">
                              {item.quantity} шт • {item.totalPrice} ₴
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Actions: Re-add to cart + View receipt */}
                      <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between gap-3">
                        <button
                          type="button"
                          onClick={() => {
                            setCurrentOrder(order);
                            setIsProfileOpen(false);
                            setIsOrderTrackerOpen(true);
                          }}
                          className="text-xs text-zinc-400 hover:text-white flex items-center gap-1.5 transition-colors"
                        >
                          <FileText className="w-3.5 h-3.5 text-zinc-400" />
                          <span>Чек замовлення</span>
                          <ChevronRight className="w-3 h-3" />
                        </button>

                        <motion.button
                          whileTap={{ scale: 0.94 }}
                          onClick={() => addOrderItemsToCart(order)}
                          className="flex items-center gap-1.5 px-4 py-2 rounded-xl apple-button-primary text-white text-xs font-bold shadow-md shadow-crab-600/30"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Додати в кошик</span>
                        </motion.button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Tab 2: User Profile Form */}
            {activeTab === 'profile' && (
              <form onSubmit={handleSaveProfile} className="overflow-y-auto p-4 sm:p-6 space-y-4 flex-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="space-y-1">
                    <label className="text-[11px] text-zinc-400 font-medium">Ваше ім'я</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Олександр"
                      className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] text-zinc-400 font-medium">Номер телефону</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+380 (__) ___ __ __"
                      className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="pt-2 border-t border-white/[0.06] space-y-3">
                  <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Збережена адреса доставки (для автопідстановки):</span>
                  </h4>

                  <div className="space-y-1">
                    <label className="text-[11px] text-zinc-400">Населений пункт</label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-[#181826] border border-white/10 rounded-2xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400 cursor-pointer"
                    >
                      <option value="смт. Овідіополь">смт. Овідіополь</option>
                      <option value="с. Роксолани">с. Роксолани</option>
                      <option value="с. Калаглія">с. Калаглія</option>
                      <option value="с. Миколаївка">с. Миколаївка</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="col-span-2 space-y-1">
                      <label className="text-[11px] text-zinc-400">Вулиця</label>
                      <input
                        type="text"
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                        placeholder="вул. Шевченка"
                        className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] text-zinc-400">Будинок</label>
                      <input
                        type="text"
                        value={house}
                        onChange={(e) => setHouse(e.target.value)}
                        placeholder="12"
                        className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <label className="text-[11px] text-zinc-400">Квартира</label>
                      <input
                        type="text"
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
                        value={doorphone}
                        onChange={(e) => setDoorphone(e.target.value)}
                        placeholder="45"
                        className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-3 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-3">
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-2xl apple-button-primary text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-crab-600/30"
                  >
                    <Save className="w-4 h-4" />
                    <span>{savedSuccess ? 'Збережено ✓' : 'Зберегти мої дані'}</span>
                  </motion.button>
                </div>
              </form>
            )}

            {/* Tab 3: Favorites */}
            {activeTab === 'favorites' && (
              <div className="overflow-y-auto p-4 sm:p-6 space-y-3 flex-1">
                {favoriteProductsList.length === 0 ? (
                  <div className="text-center py-12 space-y-3">
                    <div className="w-16 h-16 rounded-3xl bg-white/[0.03] border border-white/10 flex items-center justify-center mx-auto text-zinc-500">
                      <Heart className="w-8 h-8" />
                    </div>
                    <h3 className="text-base font-bold text-white">Список обраного порожній</h3>
                    <p className="text-xs text-zinc-400 max-w-xs mx-auto font-light">
                      Натискайте на сердечко на улюблених стравах, щоб вони завжди були під рукою!
                    </p>
                  </div>
                ) : (
                  favoriteProductsList.map((product) => (
                    <div
                      key={product.id}
                      className="p-3.5 rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.08] flex items-center justify-between gap-3 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-14 h-14 rounded-xl object-cover border border-white/10"
                        />
                        <div>
                          <h4 className="text-sm font-bold text-white line-clamp-1">{product.name}</h4>
                          <span className="font-display font-black text-amber-300 text-sm">{product.price} ₴</span>
                        </div>
                      </div>

                      <motion.button
                        whileTap={{ scale: 0.92 }}
                        onClick={() => addToCart(product)}
                        className="px-3.5 py-2 rounded-xl apple-button-primary text-white text-xs font-bold flex items-center gap-1.5 shrink-0 shadow-md"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>У кошик</span>
                      </motion.button>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Footer */}
            <div className="p-3.5 bg-[#0A0A10] border-t border-white/[0.06] flex items-center justify-between text-[11px] text-zinc-500 shrink-0">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Особисті дані надійно захищені
              </span>
              <span>Crab Club © 2026</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
