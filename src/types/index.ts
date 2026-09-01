export interface ModificationOption {
  id: number;
  name: string;
  price: number;
}

export interface ModificationGroup {
  group_id: number;
  group_name: string;
  type: number;
  min: number;
  max: number;
  options: ModificationOption[];
}

export interface Product {
  id: number;
  name: string;
  category_pos_id: number;
  category_name: string;
  category_url: string;
  parent_category_id?: number | null;
  parent_category_name?: string | null;
  parent_category_url?: string | null;
  price: number;
  old_price?: number;
  weight: string;
  ingredients: string;
  description_raw: string;
  image: string;
  popular?: boolean;
  is_new?: boolean;
  is_spicy?: boolean;
  is_vegetarian?: boolean;
  chef_choice?: boolean;
  tags?: string[];
  modifications?: ModificationGroup[];
}

export interface SubCategory {
  id: number;
  name: string;
  slug: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  icon?: string;
  subcategories: SubCategory[];
}

export interface CartItem {
  id: string; // generated unique id with selected options
  product: Product;
  quantity: number;
  selectedOptions: {
    group_name: string;
    option_name: string;
    price: number;
  }[];
  totalPrice: number;
  comment?: string;
}

export interface DeliveryZone {
  id: string;
  zone: string;
  price: number;
  freeFromAmount: number;
  time: string;
  description?: string;
}

export interface RestaurantInfo {
  name: string;
  badge: string;
  tagline: string;
  city: string;
  address: string;
  phone: string;
  phone_raw: string;
  work_hours: string;
  delivery_time: string;
  min_order: number;
  free_delivery_from: number;
  delivery_zones: DeliveryZone[];
  features: {
    icon: string;
    title: string;
    desc: string;
  }[];
  socials: {
    instagram: string;
    tiktok?: string;
    telegram: string;
    viber: string;
  };
  logo: string;
  logo_icon: string;
}

export interface Banner {
  id?: number;
  title: string;
  subtitle: string;
  badge?: string;
  image: string;
  link?: string;
  ctaText?: string;
}

export interface Review {
  id: number;
  author: string;
  rating: number;
  date: string;
  comment: string;
  dish: string;
  avatar?: string;
}

export interface OrderDetails {
  orderId: string;
  orderNumber: string;
  posterIncomingOrderId?: number;
  date: string;
  customerName: string;
  phone: string;
  orderType: 'delivery' | 'takeaway' | 'dinein';
  tableNumber?: string;
  address?: {
    city: string;
    street: string;
    house: string;
    apartment?: string;
    floor?: string;
    doorphone?: string;
  };
  deliveryTimeType: 'asap' | 'scheduled';
  scheduledTime?: string;
  paymentMethod: 'card_online' | 'card_courier' | 'cash';
  cashChangeFrom?: string;
  cutleryCount: number;
  comment?: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  promoCode?: string;
  bonusUsed?: number;
  bonusEarned?: number;
  status: 'received' | 'cooking' | 'delivering' | 'completed';
}

export interface UserProfile {
  name: string;
  phone: string;
  city: string;
  street: string;
  house: string;
  apartment?: string;
  floor?: string;
  doorphone?: string;
  bonusBalance: number; // Cashback balance in UAH
  totalSpent: number; // Total spent in UAH
  isLoggedIn?: boolean;
  isVerified?: boolean;
  registeredAt?: string;
}
