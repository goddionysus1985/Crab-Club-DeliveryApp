import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product, Category, OrderDetails, UserProfile } from '../types';
import { RESTAURANT_INFO, PROMO_CODES, PRODUCTS, CATEGORIES } from '../data/menuData';
import { fetchPosterStopList, fetchLivePosterCatalog } from '../services/posterApi';
import { 
  verifyAndSanitizeCart, 
  sanitizePromoCode, 
  cleanRawText, 
  securityRateLimiter 
} from '../utils/security';

interface Toast {
  id: string;
  text: string;
  image?: string;
  type?: 'success' | 'info' | 'error';
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, selectedOptions?: { group_name: string; option_name: string; price: number }[], comment?: string) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  addOrderItemsToCart: (order: OrderDetails) => void;
  
  // Totals & Calculations
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  minOrderAmount: number;
  isMinOrderReached: boolean;
  minOrderRemaining: number;
  freeDeliveryThreshold: number;
  amountNeededForFreeDelivery: number;
  freeDeliveryProgress: number; // 0 to 100%
  totalItemsCount: number;

  // Cashback & Loyalty (5% Cashback)
  cashbackEarned: number;
  bonusToUse: number;
  setBonusToUse: (amount: number) => void;

  // Order type
  orderType: 'delivery' | 'takeaway';
  setOrderType: (type: 'delivery' | 'takeaway') => void;

  // Promo
  promoCode: string;
  promoDiscountPercent: number;
  promoDiscountFixed: number;
  promoMessage: string;
  applyPromoCode: (code: string) => boolean;
  removePromoCode: () => void;

  // Modals & UI states
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isOrderTrackerOpen: boolean;
  setIsOrderTrackerOpen: (open: boolean) => void;
  isProfileOpen: boolean;
  setIsProfileOpen: (open: boolean) => void;
  profileTab: 'profile' | 'history' | 'favorites';
  setProfileTab: (tab: 'profile' | 'history' | 'favorites') => void;
  openProfileModal: (tab?: 'profile' | 'history' | 'favorites') => void;
  activeProductModal: Product | null;
  setActiveProductModal: (p: Product | null) => void;

  // User Profile & Account
  userProfile: UserProfile;
  updateUserProfile: (profile: Partial<UserProfile>) => void;

  // Current Active Order & History
  currentOrder: OrderDetails | null;
  setCurrentOrder: (order: OrderDetails | null) => void;
  orderHistory: OrderDetails[];

  // Wishlist
  favorites: number[];
  toggleFavorite: (productId: number) => void;
  isFavorite: (productId: number) => boolean;

  // Toast
  toast: Toast | null;
  showToast: (text: string, image?: string, type?: 'success' | 'info' | 'error') => void;
  hideToast: () => void;

  // Stop List (Live Kitchen Out of Stock Sync)
  stopList: Set<number>;
  isProductStopped: (productId: number) => boolean;

  // Live Catalog
  catalogProducts: Product[];
  setCatalogProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  catalogCategories: Category[];
  setCatalogCategories: React.Dispatch<React.SetStateAction<Category[]>>;

  // Helpers
  getItemQuantityInCart: (productId: number) => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const DEFAULT_PROFILE: UserProfile = {
  name: '',
  phone: '',
  city: 'смт. Овідіополь (Центр)',
  street: '',
  house: '',
  apartment: '',
  floor: '',
  doorphone: '',
  bonusBalance: 50, // Welcome gift of 50 bonus points for first-time guests
  totalSpent: 0
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load from localStorage with cryptographic-level integrity validation
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('crabclub_cart');
      if (saved) {
        const parsed = JSON.parse(saved);
        return verifyAndSanitizeCart(parsed);
      }
      return [];
    } catch {
      return [];
    }
  });

  const [favorites, setFavorites] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('crabclub_favorites');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          const validIds = new Set(PRODUCTS.map(p => p.id));
          return parsed.filter(id => typeof id === 'number' && validIds.has(id));
        }
      }
      return [];
    } catch {
      return [];
    }
  });

  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('crabclub_user_profile');
      return saved ? { ...DEFAULT_PROFILE, ...JSON.parse(saved) } : DEFAULT_PROFILE;
    } catch {
      return DEFAULT_PROFILE;
    }
  });

  const updateUserProfile = (updated: Partial<UserProfile>) => {
    setUserProfile(prev => {
      const newProfile = { ...prev, ...updated };
      try {
        localStorage.setItem('crabclub_user_profile', JSON.stringify(newProfile));
      } catch {}
      return newProfile;
    });
  };

  const [currentOrder, setCurrentOrderState] = useState<OrderDetails | null>(() => {
    try {
      const saved = localStorage.getItem('crabclub_last_order');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [orderHistory, setOrderHistory] = useState<OrderDetails[]>(() => {
    try {
      const saved = localStorage.getItem('crabclub_order_history');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [bonusToUse, setBonusToUse] = useState<number>(0);

  const setCurrentOrder = (order: OrderDetails | null) => {
    setCurrentOrderState(order);
    if (order) {
      localStorage.setItem('crabclub_last_order', JSON.stringify(order));
      setOrderHistory(prev => {
        const updated = [order, ...prev.filter(o => o.orderId !== order.orderId)].slice(0, 15);
        localStorage.setItem('crabclub_order_history', JSON.stringify(updated));
        return updated;
      });

      // Update cashback and bonus balance without overwriting permanent profile address
      const newBonusBalance = Math.max(0, userProfile.bonusBalance - (order.bonusUsed || 0) + (order.bonusEarned || 0));
      const newTotalSpent = (userProfile.totalSpent || 0) + order.total;

      updateUserProfile({
        name: userProfile.name || order.customerName,
        phone: userProfile.phone || order.phone,
        bonusBalance: newBonusBalance,
        totalSpent: newTotalSpent
      });

      setBonusToUse(0);
    }
  };

  const addOrderItemsToCart = (historicOrder: OrderDetails) => {
    if (!historicOrder.items || historicOrder.items.length === 0) return;

    setCart(prev => {
      const newItems: CartItem[] = [];
      historicOrder.items.forEach(histItem => {
        const prod = PRODUCTS.find(p => p.id === histItem.product.id) || histItem.product;
        if (prod) {
          const extraPrice = histItem.selectedOptions?.reduce((sum, o) => sum + (o.price || 0), 0) || 0;
          const unitPrice = (Number(prod.price) || 0) + extraPrice;
          const qty = Math.max(1, histItem.quantity);
          newItems.push({
            id: `item-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            product: prod,
            quantity: qty,
            selectedOptions: histItem.selectedOptions ? [...histItem.selectedOptions] : [],
            comment: histItem.comment,
            totalPrice: unitPrice * qty
          });
        }
      });
      const merged = [...prev, ...newItems];
      localStorage.setItem('crabclub_cart', JSON.stringify(merged));
      return merged;
    });

    showToast(`Страви з замовлення #${historicOrder.orderNumber} додано до кошика!`, undefined, 'success');
  };

  const [catalogProducts, setCatalogProducts] = useState<Product[]>(PRODUCTS);
  const [catalogCategories, setCatalogCategories] = useState<Category[]>(CATEGORIES);

  // Live Sync with Poster POS API on launch
  useEffect(() => {
    let isMounted = true;
    async function syncPosterCatalog() {
      try {
        const live = await fetchLivePosterCatalog();
        if (isMounted && live && live.products && live.products.length > 0) {
          setCatalogProducts(live.products);
          setCatalogCategories(live.categories);
        }
      } catch (err) {
        console.warn('[Poster Live Sync] Failed to sync catalog:', err);
      }
    }
    syncPosterCatalog();
    return () => { isMounted = false; };
  }, []);

  const [stopList, setStopList] = useState<Set<number>>(new Set());

  // Periodically poll Poster POS stop-list in real-time (every 30s)
  useEffect(() => {
    let isMounted = true;
    const loadStopList = async () => {
      if (typeof document !== 'undefined' && document.hidden) return;
      try {
        const list = await fetchPosterStopList();
        if (isMounted) setStopList(new Set(list));
      } catch {}
    };

    loadStopList();
    const interval = setInterval(loadStopList, 45000); // Poll every 45s when tab is active

    const handleVisibilityChange = () => {
      if (typeof document !== 'undefined' && !document.hidden) {
        loadStopList();
      }
    };

    if (typeof document !== 'undefined') {
      document.addEventListener('visibilitychange', handleVisibilityChange);
    }

    return () => {
      isMounted = false;
      clearInterval(interval);
      if (typeof document !== 'undefined') {
        document.removeEventListener('visibilitychange', handleVisibilityChange);
      }
    };
  }, []);

  const isProductStopped = (productId: number): boolean => {
    return stopList.has(productId);
  };

  const [orderType, setOrderType] = useState<'delivery' | 'takeaway'>('takeaway');
  const [promoCode, setPromoCode] = useState<string>('');
  const [promoDiscountPercent, setPromoDiscountPercent] = useState<number>(0);
  const [promoDiscountFixed, setPromoDiscountFixed] = useState<number>(0);
  const [promoMessage, setPromoMessage] = useState<string>('');

  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isOrderTrackerOpen, setIsOrderTrackerOpen] = useState<boolean>(false);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const [profileTab, setProfileTab] = useState<'profile' | 'history' | 'favorites'>('profile');

  const openProfileModal = (tab: 'profile' | 'history' | 'favorites' = 'profile') => {
    setProfileTab(tab);
    setIsProfileOpen(true);
  };

  const [activeProductModal, setActiveProductModalState] = useState<Product | null>(() => {
    try {
      const match = window.location.hash.match(/product[/-](\d+)/i);
      if (match && match[1]) {
        const prodId = parseInt(match[1], 10);
        return PRODUCTS.find(p => p.id === prodId) || null;
      }
    } catch {}
    return null;
  });

  const setActiveProductModal = (product: Product | null) => {
    setActiveProductModalState(product);
    try {
      if (product) {
        window.history.replaceState(null, '', `#/product/${product.id}`);
      } else {
        const currentHash = window.location.hash;
        if (currentHash.includes('product')) {
          window.history.replaceState(null, '', '#menu');
        }
      }
    } catch {}
  };

  const [toast, setToast] = useState<Toast | null>(null);

  // Lock background body scroll whenever any modal/drawer is open
  const isAnyModalOpen = isCartOpen || isCheckoutOpen || isSearchOpen || isOrderTrackerOpen || isProfileOpen || activeProductModal !== null;

  useEffect(() => {
    if (isAnyModalOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isAnyModalOpen]);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('crabclub_cart', JSON.stringify(cart));
    } catch {}
  }, [cart]);

  // Sync favorites to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('crabclub_favorites', JSON.stringify(favorites));
    } catch {}
  }, [favorites]);

  const showToast = (text: string, image?: string, type: 'success' | 'info' | 'error' = 'info') => {
    setToast({
      id: String(Date.now()),
      text: cleanRawText(text, 100),
      image,
      type
    });
  };

  const hideToast = () => setToast(null);

  // Auto-hide toast after 3s
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const toggleFavorite = (productId: number) => {
    setFavorites(prev => {
      const isFav = prev.includes(productId);
      if (isFav) {
        showToast('Видалено з обраного', undefined, 'info');
        return prev.filter(id => id !== productId);
      } else {
        const prod = PRODUCTS.find(p => p.id === productId);
        showToast(`Додано до обраного: ${prod?.name || ''}`, prod?.image, 'success');
        return [...prev, productId];
      }
    });
  };

  const isFavorite = (productId: number) => favorites.includes(productId);

  const addToCart = (
    product: Product, 
    quantity = 1, 
    selectedOptions?: { group_name: string; option_name: string; price: number }[],
    comment?: string
  ) => {
    if (!product || !product.id) {
      showToast('Цей товар наразі недоступний', undefined, 'error');
      return;
    }

    if (isProductStopped(product.id)) {
      showToast(`Страва "${product.name}" тимчасово на стопі`, undefined, 'error');
      return;
    }

    const safeOptions = selectedOptions?.map(opt => ({
      group_name: cleanRawText(opt.group_name, 50),
      option_name: cleanRawText(opt.option_name, 50),
      price: Math.max(0, Number(opt.price) || 0)
    })) || [];

    const optionsKey = safeOptions.length > 0
      ? safeOptions.map(o => `${o.group_name}:${o.option_name}`).sort().join('|')
      : 'standard';

    const safeQuantity = Math.max(1, Math.min(50, Math.floor(quantity)));

    // Extra cost calculation
    const extraPrice = safeOptions.reduce((sum, opt) => sum + opt.price, 0);
    const basePrice = Math.max(0, Number(product.price) || 0);
    const unitPrice = basePrice + extraPrice;

    setCart(prevCart => {
      const existingIndex = prevCart.findIndex(item => {
        const itemOptionsKey = item.selectedOptions && item.selectedOptions.length > 0
          ? item.selectedOptions.map(o => `${o.group_name}:${o.option_name}`).sort().join('|')
          : 'standard';
        return item.product.id === product.id && itemOptionsKey === optionsKey && item.comment === comment;
      });

      if (existingIndex > -1) {
        const newCart = [...prevCart];
        const newQuantity = Math.min(50, newCart[existingIndex].quantity + safeQuantity);
        newCart[existingIndex] = {
          ...newCart[existingIndex],
          quantity: newQuantity,
          totalPrice: unitPrice * newQuantity
        };
        return newCart;
      } else {
        const newItem: CartItem = {
          id: `item-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          product: { ...product, price: basePrice },
          quantity: safeQuantity,
          selectedOptions: safeOptions,
          comment: comment ? cleanRawText(comment, 150) : undefined,
          totalPrice: unitPrice * safeQuantity
        };
        return [...prevCart, newItem];
      }
    });

    try {
      if (typeof window !== 'undefined' && 'vibrate' in navigator) {
        navigator.vibrate(18);
      }
    } catch {}

    showToast(`Додано: ${product.name}`, product.image, 'success');
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    const safeQty = Math.min(50, Math.floor(newQuantity));
    setCart(prevCart =>
      prevCart.map(item => {
        if (item.id === cartItemId) {
          const originalProd = PRODUCTS.find(p => p.id === item.product.id);
          const basePrice = originalProd ? originalProd.price : item.product.price;
          const extraPrice = item.selectedOptions?.reduce((sum, opt) => sum + opt.price, 0) || 0;
          const unitPrice = basePrice + extraPrice;
          return {
            ...item,
            quantity: safeQty,
            totalPrice: unitPrice * safeQty
          };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
    showToast('Кошик очищено', undefined, 'info');
  };

  const getItemQuantityInCart = (productId: number): number => {
    return cart
      .filter(item => item.product.id === productId)
      .reduce((sum, item) => sum + item.quantity, 0);
  };

  const applyPromoCode = (rawCode: string): boolean => {
    const cleanCode = sanitizePromoCode(rawCode);
    if (!cleanCode) return false;

    // Security rate limiter for promo bruteforce
    if (!securityRateLimiter.isAllowed('promo_check', 5, 60000)) {
      showToast('Забагато спроб. Спробуйте пізніше', undefined, 'error');
      return false;
    }

    const codeKey = cleanCode.toUpperCase();
    const foundPromo = PROMO_CODES[codeKey];

    if (foundPromo) {
      setPromoCode(codeKey);
      if (foundPromo.discountPercent) {
        setPromoDiscountPercent(foundPromo.discountPercent);
        setPromoDiscountFixed(0);
        setPromoMessage(`Знижка -${foundPromo.discountPercent}% успішно активована!`);
      } else if (foundPromo.discountFixed) {
        setPromoDiscountFixed(foundPromo.discountFixed);
        setPromoDiscountPercent(0);
        setPromoMessage(`Знижка -${foundPromo.discountFixed} грн успішно активована!`);
      }
      showToast(`Промокод ${codeKey} застосовано! 🎉`, undefined, 'success');
      return true;
    } else {
      showToast('Недійсний промокод. Спробуйте CRABCLUB', undefined, 'error');
      return false;
    }
  };

  const removePromoCode = () => {
    setPromoCode('');
    setPromoDiscountPercent(0);
    setPromoDiscountFixed(0);
    setPromoMessage('');
  };

  // Safe Calculations
  const minOrderAmount = 300;
  const subtotal = cart.reduce((sum, item) => sum + Math.max(0, item.totalPrice), 0);
  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const isMinOrderReached = subtotal >= minOrderAmount || cart.length === 0;
  const minOrderRemaining = Math.max(0, minOrderAmount - subtotal);

  // Promo discount calculation
  const promoPercentDiscount = promoDiscountPercent > 0 ? Math.round(subtotal * (promoDiscountPercent / 100)) : 0;
  const discount = Math.min(subtotal, promoPercentDiscount + promoDiscountFixed);

  // 5% Cashback calculation from net order subtotal
  const cashbackEarned = Math.round(Math.max(0, subtotal - discount) * 0.05);

  const freeDeliveryThreshold = RESTAURANT_INFO.free_delivery_from;
  const amountNeededForFreeDelivery = Math.max(0, freeDeliveryThreshold - subtotal);
  const freeDeliveryProgress = Math.min(100, Math.round((subtotal / freeDeliveryThreshold) * 100));

  const deliveryFee = orderType === 'takeaway' || subtotal >= freeDeliveryThreshold || subtotal === 0 ? 0 : 50;
  const total = Math.max(0, subtotal - discount + deliveryFee - bonusToUse);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        addOrderItemsToCart,
        subtotal,
        discount,
        deliveryFee,
        total,
        minOrderAmount,
        isMinOrderReached,
        minOrderRemaining,
        cashbackEarned,
        bonusToUse,
        setBonusToUse,
        freeDeliveryThreshold,
        amountNeededForFreeDelivery,
        freeDeliveryProgress,
        totalItemsCount,
        orderType,
        setOrderType,
        promoCode,
        promoDiscountPercent,
        promoDiscountFixed,
        promoMessage,
        applyPromoCode,
        removePromoCode,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isSearchOpen,
        setIsSearchOpen,
        isOrderTrackerOpen,
        setIsOrderTrackerOpen,
        isProfileOpen,
        setIsProfileOpen,
        profileTab,
        setProfileTab,
        openProfileModal,
        activeProductModal,
        setActiveProductModal,
        userProfile,
        updateUserProfile,
        currentOrder,
        setCurrentOrder,
        orderHistory,
        favorites,
        toggleFavorite,
        isFavorite,
        toast,
        showToast,
        hideToast,
        stopList,
        isProductStopped,
        catalogProducts,
        setCatalogProducts,
        catalogCategories,
        setCatalogCategories,
        getItemQuantityInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
