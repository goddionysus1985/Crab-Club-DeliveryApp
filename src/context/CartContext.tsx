import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { CartItem, Product, Category, OrderDetails, UserProfile } from '../types';
import { RESTAURANT_INFO, PROMO_CODES, PRODUCTS, CATEGORIES } from '../data/menuData';
import { fetchPosterStopList, fetchLivePosterCatalog, fetchPosterOrderStatus, getPosterClientByPhone } from '../services/posterApi';
import { 
  getHighestNotifiedStep, 
  setHighestNotifiedStep, 
  notifyStepChange,
  playOrderSuccessChime, 
  sendBrowserNotification 
} from '../services/orderNotificationService';
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
  orderType: 'delivery' | 'takeaway' | 'dinein';
  setOrderType: (type: 'delivery' | 'takeaway' | 'dinein') => void;

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
  editingCartItem: CartItem | null;
  setEditingCartItem: (item: CartItem | null) => void;
  openEditCartItem: (item: CartItem) => void;
  updateCartItem: (
    cartItemId: string,
    updatedOptions: { group_name: string; option_name: string; price: number }[],
    comment?: string,
    quantity?: number
  ) => void;

  // User Profile & Account
  userProfile: UserProfile;
  updateUserProfile: (profile: Partial<UserProfile>) => void;

  // Current Active Order & History
  currentOrder: OrderDetails | null;
  setCurrentOrder: (order: OrderDetails | null) => void;
  orderHistory: OrderDetails[];
  activeOrders: OrderDetails[];
  orderTrackingStep: number;
  setOrderTrackingStep: (step: number) => void;
  stepTimestamps: Record<number, string>;

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

export const isOrderCompleted = (order: OrderDetails | null | undefined): boolean => {
  if (!order) return true;
  if (order.status === 'completed') return true;
  if (order.orderTrackingStep && order.orderTrackingStep >= 4) return true;
  const numStep = getHighestNotifiedStep(order.orderNumber);
  if (numStep >= 4) return true;
  if (order.posterIncomingOrderId && getHighestNotifiedStep(order.posterIncomingOrderId) >= 4) return true;
  if (order.posterTransactionId && getHighestNotifiedStep(order.posterTransactionId) >= 4) return true;
  return false;
};

  const [currentOrder, setCurrentOrderState] = useState<OrderDetails | null>(() => {
    try {
      const saved = localStorage.getItem('crabclub_last_order');
      if (!saved) return null;
      const order: OrderDetails = JSON.parse(saved);
      return isOrderCompleted(order) ? { ...order, status: 'completed', orderTrackingStep: 4 } : order;
    } catch {
      return null;
    }
  });

  const [orderHistory, setOrderHistory] = useState<OrderDetails[]>(() => {
    try {
      const saved = localStorage.getItem('crabclub_order_history');
      if (!saved) return [];
      const list: OrderDetails[] = JSON.parse(saved);
      return list.map(o => isOrderCompleted(o) ? { ...o, status: 'completed', orderTrackingStep: 4 } : o);
    } catch {
      return [];
    }
  });

  const [bonusToUse, setBonusToUse] = useState<number>(0);

  // Synchronize active orders (strictly in-progress, non-completed orders)
  const activeOrders = React.useMemo(() => {
    const list: OrderDetails[] = [];
    const seenIds = new Set<string>();

    if (currentOrder && !isOrderCompleted(currentOrder)) {
      list.push(currentOrder);
      seenIds.add(currentOrder.orderId);
    }

    orderHistory.forEach(o => {
      if (!seenIds.has(o.orderId) && !isOrderCompleted(o)) {
        list.push(o);
        seenIds.add(o.orderId);
      }
    });

    return list;
  }, [currentOrder, orderHistory]);

  const setCurrentOrder = (order: OrderDetails | null) => {
    setCurrentOrderState(order);
    if (order) {
      localStorage.setItem('crabclub_last_order', JSON.stringify(order));
      setOrderHistory(prev => {
        const exists = prev.some(o => o.orderId === order.orderId);
        const updated = exists
          ? prev.map(o => o.orderId === order.orderId ? { ...o, ...order } : o)
          : [order, ...prev.filter(o => o.orderId !== order.orderId)].slice(0, 15);
        try { localStorage.setItem('crabclub_order_history', JSON.stringify(updated)); } catch {}
        return updated;
      });

      // Synchronize tracking step & timestamps for the selected order
      const step = order.orderTrackingStep || (order.status === 'completed' ? 4 : 1);
      setOrderTrackingStep(step);
      if (order.stepTimestamps && Object.keys(order.stepTimestamps).length > 0) {
        setStepTimestamps(order.stepTimestamps);
      } else {
        const now = new Date().toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' });
        const initial = { 1: now };
        setStepTimestamps(initial);
      }

      // Only deduct spent bonuses if order used bonuses.
      // In Poster POS, bonuses earned and total spent are officially credited only AFTER the check is closed (step 4).
      const newBonusBalance = Math.max(0, userProfile.bonusBalance - (order.bonusUsed || 0));

      updateUserProfile({
        name: userProfile.name || order.customerName,
        phone: userProfile.phone || order.phone,
        bonusBalance: newBonusBalance
      });

      setBonusToUse(0);
    }
  };

  const [orderTrackingStep, setOrderTrackingStep] = useState<number>(() => {
    if (currentOrder && currentOrder.status === 'completed') return 4;
    return currentOrder?.orderTrackingStep || 1;
  });

  // Timestamps for each completed step of the currently selected order
  const [stepTimestamps, setStepTimestamps] = useState<Record<number, string>>(() => {
    if (currentOrder?.stepTimestamps && Object.keys(currentOrder.stepTimestamps).length > 0) {
      return currentOrder.stepTimestamps;
    }
    return { 1: new Date().toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' }) };
  });

  // Global round-robin background order status tracker
  // Polls AT MOST one order every 12-14 seconds (gentle on Poster API, only ~4-5 req/min total), cycling through all active orders!
  const roundRobinIndexRef = useRef(0);

  useEffect(() => {
    if (activeOrders.length === 0) return;

    let isTerminated = false;
    let timerId: any = null;

    const pollNextActiveOrder = async () => {
      if (isTerminated) return;

      try {
        if (typeof document !== 'undefined' && document.hidden) {
          // When tab is in background, poll much less frequently
          timerId = setTimeout(pollNextActiveOrder, 35000);
          return;
        }

        if (activeOrders.length === 0) return;

        // Pick next active order in queue
        const targetOrder = activeOrders[roundRobinIndexRef.current % activeOrders.length];
        roundRobinIndexRef.current = (roundRobinIndexRef.current + 1) % activeOrders.length;

        const orderId = targetOrder.posterIncomingOrderId || parseInt(targetOrder.orderNumber, 10);
        if (!orderId) {
          timerId = setTimeout(pollNextActiveOrder, 12000);
          return;
        }

        const liveStatus = await fetchPosterOrderStatus(orderId);
        if (liveStatus && !isTerminated) {
          const newStep = liveStatus.stepIndex;
          const highestNotified = Math.max(
            getHighestNotifiedStep(targetOrder.orderNumber),
            getHighestNotifiedStep(orderId),
            targetOrder.orderTrackingStep || 0
          );

          if (newStep > highestNotified) {
            const now = new Date().toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' });
            setHighestNotifiedStep(targetOrder.orderNumber, newStep);
            setHighestNotifiedStep(orderId, newStep);
            if (liveStatus.transaction_id) {
              setHighestNotifiedStep(liveStatus.transaction_id, newStep);
            }

            // Record timestamp in updated order
            const existingTimestamps = targetOrder.stepTimestamps || {};
            const updatedTimestamps = { ...existingTimestamps, [newStep]: now };

            // Update order history
            setOrderHistory(prev => {
              const updated = prev.map(o => {
                if (o.orderId === targetOrder.orderId) {
                  return {
                    ...o,
                    orderTrackingStep: newStep,
                    statusName: liveStatus.statusName,
                    status: (newStep === 4 ? 'completed' : newStep === 3 ? 'delivering' : newStep === 2 ? 'cooking' : 'received') as any,
                    posterTransactionId: liveStatus.transaction_id || o.posterTransactionId,
                    stepTimestamps: updatedTimestamps
                  };
                }
                return o;
              });
              try { localStorage.setItem('crabclub_order_history', JSON.stringify(updated)); } catch {}
              return updated;
            });

            // If this is the currently viewed order in modal, update live view
            if (currentOrder?.orderId === targetOrder.orderId) {
              setOrderTrackingStep(newStep);
              setStepTimestamps(updatedTimestamps);
              if (liveStatus.transaction_id && !currentOrder.posterTransactionId) {
                setCurrentOrderState(prev => prev ? { ...prev, posterTransactionId: liveStatus.transaction_id } : prev);
              }
              if (newStep === 4) {
                setCurrentOrderState(prev => prev ? { ...prev, status: 'completed' } : prev);
              }
            }

            // Play melodic chime & show notifications using deduplicated service
            const receiptNumber = liveStatus.transaction_id || targetOrder.posterTransactionId || targetOrder.orderNumber;
            notifyStepChange(orderId, newStep, liveStatus.statusName, receiptNumber, showToast);

            // If order completed and paid in Poster, credit bonuses and refresh CRM
            if (newStep === 4) {
              if (targetOrder.phone) {
                const cleanPhone = targetOrder.phone.replace(/\D/g, '');
                getPosterClientByPhone(cleanPhone).then(client => {
                  if (client && client.bonus !== undefined) {
                    updateUserProfile({
                      bonusBalance: client.bonus,
                      totalSpent: (userProfile.totalSpent || 0) + targetOrder.total
                    });
                  } else if (targetOrder.bonusEarned) {
                    updateUserProfile({
                      bonusBalance: (userProfile.bonusBalance || 0) + targetOrder.bonusEarned,
                      totalSpent: (userProfile.totalSpent || 0) + targetOrder.total
                    });
                  }
                });
              } else if (targetOrder.bonusEarned) {
                updateUserProfile({
                  bonusBalance: (userProfile.bonusBalance || 0) + targetOrder.bonusEarned,
                  totalSpent: (userProfile.totalSpent || 0) + targetOrder.total
                });
              }
            }
          } else {
            // Keep transaction ID if resolved
            if (liveStatus.transaction_id && !targetOrder.posterTransactionId) {
              setOrderHistory(prev => {
                const updated = prev.map(o => o.orderId === targetOrder.orderId ? { ...o, posterTransactionId: liveStatus.transaction_id } : o);
                try { localStorage.setItem('crabclub_order_history', JSON.stringify(updated)); } catch {}
                return updated;
              });
            }
          }
        }
      } catch (err) {
        console.warn('[Round-Robin Order Radar]', err);
      }

      if (!isTerminated) {
        // Strict rate-limiting: 12 seconds between single requests
        timerId = setTimeout(pollNextActiveOrder, 12000);
      }
    };

    // Kickoff round-robin loop after brief delay
    timerId = setTimeout(pollNextActiveOrder, 2500);

    return () => {
      isTerminated = true;
      if (timerId) clearTimeout(timerId);
    };
  }, [activeOrders, currentOrder?.orderId]);



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
    const interval = setInterval(loadStopList, 300000); // Poll every 5 min — sufficient for kitchen stop-list changes

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

  const [orderType, setOrderType] = useState<'delivery' | 'takeaway' | 'dinein'>('delivery');
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

  const [editingCartItem, setEditingCartItem] = useState<CartItem | null>(null);

  const openEditCartItem = (item: CartItem) => {
    const fullProd = catalogProducts.find(p => p.id === item.product.id) || 
                     PRODUCTS.find(p => p.id === item.product.id) || 
                     item.product;
    setEditingCartItem(item);
    setActiveProductModalState(fullProd);
  };

  const updateCartItem = (
    cartItemId: string,
    updatedOptions: { group_name: string; option_name: string; price: number }[],
    comment?: string,
    quantity?: number
  ) => {
    setCart(prevCart => {
      const updated = prevCart.map(item => {
        if (item.id === cartItemId) {
          const originalProd = catalogProducts.find(p => p.id === item.product.id) || 
                               PRODUCTS.find(p => p.id === item.product.id) || 
                               item.product;
          const basePrice = originalProd ? Number(originalProd.price) || 0 : item.product.price;
          const safeOptions = updatedOptions.map(opt => ({
            group_name: cleanRawText(opt.group_name, 50),
            option_name: cleanRawText(opt.option_name, 50),
            price: Math.max(0, Number(opt.price) || 0)
          }));
          const extraPrice = safeOptions.reduce((sum, opt) => sum + opt.price, 0);
          const unitPrice = basePrice + extraPrice;
          const qty = quantity !== undefined ? Math.max(1, Math.min(50, Math.floor(quantity))) : item.quantity;
          return {
            ...item,
            product: { ...originalProd, price: basePrice },
            selectedOptions: safeOptions,
            comment: comment !== undefined ? (comment ? cleanRawText(comment, 150) : undefined) : item.comment,
            quantity: qty,
            totalPrice: unitPrice * qty
          };
        }
        return item;
      });
      localStorage.setItem('crabclub_cart', JSON.stringify(updated));
      return updated;
    });

    setEditingCartItem(null);
    showToast('Модифікатори страви оновлено', undefined, 'success');
  };

  const setActiveProductModal = (product: Product | null) => {
    setActiveProductModalState(product);
    if (!product) {
      setEditingCartItem(null);
    }
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

  const deliveryFee = orderType !== 'delivery' || subtotal >= freeDeliveryThreshold || subtotal === 0 ? 0 : 50;
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
        editingCartItem,
        setEditingCartItem,
        openEditCartItem,
        updateCartItem,
        userProfile,
        updateUserProfile,
        currentOrder,
        setCurrentOrder,
        orderHistory,
        activeOrders,
        orderTrackingStep,
        setOrderTrackingStep,
        stepTimestamps,
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
