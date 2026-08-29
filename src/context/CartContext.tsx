import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product, OrderDetails } from '../types';
import { RESTAURANT_INFO, PROMO_CODES } from '../data/menuData';

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
  
  // Totals & Calculations
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  freeDeliveryThreshold: number;
  amountNeededForFreeDelivery: number;
  freeDeliveryProgress: number; // 0 to 100%
  totalItemsCount: number;

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
  activeProductModal: Product | null;
  setActiveProductModal: (p: Product | null) => void;

  // Current Active Order
  currentOrder: OrderDetails | null;
  setCurrentOrder: (order: OrderDetails | null) => void;

  // Wishlist
  favorites: number[];
  toggleFavorite: (productId: number) => void;
  isFavorite: (productId: number) => boolean;

  // Toast
  toast: Toast | null;
  showToast: (text: string, image?: string, type?: 'success' | 'info' | 'error') => void;
  hideToast: () => void;

  // Helpers
  getItemQuantityInCart: (productId: number) => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load from localStorage if available
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('crabclub_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [favorites, setFavorites] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('crabclub_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [currentOrder, setCurrentOrder] = useState<OrderDetails | null>(() => {
    try {
      const saved = localStorage.getItem('crabclub_last_order');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [orderType, setOrderType] = useState<'delivery' | 'takeaway'>('delivery');
  const [promoCode, setPromoCode] = useState<string>('');
  const [promoDiscountPercent, setPromoDiscountPercent] = useState<number>(0);
  const [promoDiscountFixed, setPromoDiscountFixed] = useState<number>(0);
  const [promoMessage, setPromoMessage] = useState<string>('');

  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isOrderTrackerOpen, setIsOrderTrackerOpen] = useState<boolean>(false);
  const [activeProductModal, setActiveProductModal] = useState<Product | null>(null);

  const [toast, setToast] = useState<Toast | null>(null);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem('crabclub_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('crabclub_favorites', JSON.stringify(favorites));
    } catch (e) {
      console.error(e);
    }
  }, [favorites]);

  useEffect(() => {
    try {
      if (currentOrder) {
        localStorage.setItem('crabclub_last_order', JSON.stringify(currentOrder));
      }
    } catch (e) {
      console.error(e);
    }
  }, [currentOrder]);

  const showToast = (text: string, image?: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({
      id: Date.now().toString(),
      text,
      image,
      type
    });
    setTimeout(() => {
      setToast(null);
    }, 3200);
  };

  const hideToast = () => setToast(null);

  const toggleFavorite = (productId: number) => {
    setFavorites(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Видалено з улюблених', undefined, 'info');
        return prev.filter(id => id !== productId);
      } else {
        showToast('Додано до улюблених ❤️', undefined, 'success');
        return [...prev, productId];
      }
    });
  };

  const isFavorite = (productId: number) => favorites.includes(productId);

  const generateCartItemId = (productId: number, options?: { group_name: string; option_name: string; price: number }[]) => {
    if (!options || options.length === 0) return `${productId}`;
    const optsStr = options.map(o => `${o.group_name}:${o.option_name}`).sort().join('|');
    return `${productId}_${optsStr}`;
  };

  const addToCart = (
    product: Product,
    quantity = 1,
    selectedOptions: { group_name: string; option_name: string; price: number }[] = [],
    comment = ''
  ) => {
    const extraPrice = selectedOptions.reduce((sum, opt) => sum + opt.price, 0);
    const unitPrice = product.price + extraPrice;
    const cartItemId = generateCartItemId(product.id, selectedOptions);

    setCart(prevCart => {
      const existingIndex = prevCart.findIndex(item => item.id === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        const newQty = updated[existingIndex].quantity + quantity;
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: newQty,
          totalPrice: newQty * unitPrice
        };
        return updated;
      } else {
        return [
          ...prevCart,
          {
            id: cartItemId,
            product,
            quantity,
            selectedOptions,
            totalPrice: quantity * unitPrice,
            comment
          }
        ];
      }
    });

    showToast(`Додано до кошика: ${product.name}`, product.image, 'success');
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(item => item.id !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart(prev =>
      prev.map(item => {
        if (item.id === cartItemId) {
          const extraPrice = item.selectedOptions.reduce((sum, opt) => sum + opt.price, 0);
          const unitPrice = item.product.price + extraPrice;
          return {
            ...item,
            quantity,
            totalPrice: quantity * unitPrice
          };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getItemQuantityInCart = (productId: number) => {
    return cart
      .filter(item => item.product.id === productId)
      .reduce((sum, item) => sum + item.quantity, 0);
  };

  const applyPromoCode = (code: string): boolean => {
    const upperCode = code.trim().toUpperCase();
    if (PROMO_CODES[upperCode]) {
      const promo = PROMO_CODES[upperCode];
      setPromoCode(upperCode);
      setPromoDiscountPercent(promo.discountPercent || 0);
      setPromoDiscountFixed(promo.discountFixed || 0);
      setPromoMessage(promo.description);
      showToast(`Промокод застосовано: ${promo.description}`, undefined, 'success');
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

  // Calculations
  const subtotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);
  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Takeaway gives 10% discount by default
  const takeawayDiscount = orderType === 'takeaway' ? Math.round(subtotal * 0.1) : 0;
  const promoPercentDiscount = promoDiscountPercent > 0 ? Math.round((subtotal - takeawayDiscount) * (promoDiscountPercent / 100)) : 0;
  const discount = takeawayDiscount + promoPercentDiscount + promoDiscountFixed;

  const freeDeliveryThreshold = RESTAURANT_INFO.free_delivery_from; // 700 грн
  const amountNeededForFreeDelivery = Math.max(0, freeDeliveryThreshold - subtotal);
  const freeDeliveryProgress = Math.min(100, Math.round((subtotal / freeDeliveryThreshold) * 100));

  const deliveryFee = orderType === 'takeaway' || subtotal >= freeDeliveryThreshold || subtotal === 0 ? 0 : 70;
  const total = Math.max(0, subtotal - discount + deliveryFee);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        subtotal,
        discount,
        deliveryFee,
        total,
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
        activeProductModal,
        setActiveProductModal,
        currentOrder,
        setCurrentOrder,
        favorites,
        toggleFavorite,
        isFavorite,
        toast,
        showToast,
        hideToast,
        getItemQuantityInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
