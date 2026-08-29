import { Product, CartItem, OrderDetails } from '../types';
import { PRODUCTS } from '../data/menuData';

/**
 * XSS & HTML Entity Escaping
 * Escapes characters to prevent any injected markup execution
 */
export function sanitizeText(input: string, maxLength = 300): string {
  if (typeof input !== 'string') return '';
  
  // Truncate to maximum safe length
  const truncated = input.trim().slice(0, maxLength);
  
  // Remove control characters & non-printable ASCII
  const cleaned = truncated.replace(/[\x00-\x1F\x7F-\x9F]/g, '');
  
  // Replace HTML special characters with entities
  return cleaned
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

/**
 * Clean text for safe rendering without HTML entities in standard React text nodes
 */
export function cleanRawText(input: string, maxLength = 300): string {
  if (typeof input !== 'string') return '';
  return input
    .trim()
    .slice(0, maxLength)
    .replace(/<[^>]*>?/gm, '') // Strip any HTML tags
    .replace(/[\x00-\x1F\x7F-\x9F]/g, '');
}

/**
 * Strict Ukrainian & International Phone Number Validation & Normalization
 */
export function validateAndFormatPhone(phone: string): { isValid: boolean; formatted: string; raw: string } {
  if (!phone || typeof phone !== 'string') {
    return { isValid: false, formatted: '', raw: '' };
  }

  // Remove all non-digits except leading plus
  const cleaned = phone.replace(/[^\d+]/g, '');
  const digitsOnly = cleaned.replace(/\D/g, '');

  // Must have 10 to 12 digits
  if (digitsOnly.length === 10 && digitsOnly.startsWith('0')) {
    // 0681234567 -> +380 (68) 123 45 67
    const code = digitsOnly.slice(0, 3);
    const p1 = digitsOnly.slice(3, 6);
    const p2 = digitsOnly.slice(6, 8);
    const p3 = digitsOnly.slice(8, 10);
    return {
      isValid: true,
      formatted: `+38 (${code}) ${p1} ${p2} ${p3}`,
      raw: `+38${digitsOnly}`
    };
  }

  if (digitsOnly.length === 12 && digitsOnly.startsWith('380')) {
    // 380681234567
    const code = digitsOnly.slice(2, 5);
    const p1 = digitsOnly.slice(5, 8);
    const p2 = digitsOnly.slice(8, 10);
    const p3 = digitsOnly.slice(10, 12);
    return {
      isValid: true,
      formatted: `+38 (${code}) ${p1} ${p2} ${p3}`,
      raw: `+${digitsOnly}`
    };
  }

  // Generic fallback if reasonable length (9-15 digits)
  if (digitsOnly.length >= 9 && digitsOnly.length <= 15) {
    return {
      isValid: true,
      formatted: phone.trim().slice(0, 25),
      raw: `+${digitsOnly}`
    };
  }

  return { isValid: false, formatted: phone.trim().slice(0, 25), raw: cleaned };
}

/**
 * Customer Name Validator
 * Only allows letters, spaces, hyphens, apostrophes (no scripts, numbers, special symbols)
 */
export function validateCustomerName(name: string): { isValid: boolean; sanitized: string; error?: string } {
  if (!name || typeof name !== 'string') {
    return { isValid: false, sanitized: '', error: 'Ім\'я обов\'язкове для заповнення' };
  }

  const cleaned = cleanRawText(name, 50);
  if (cleaned.length < 2) {
    return { isValid: false, sanitized: cleaned, error: 'Ім\'я повинно містити щонайменше 2 символи' };
  }

  // Ukrainian, English, spaces, dashes, apostrophes
  const nameRegex = /^[a-zA-Zа-яА-ЯіІїЇєЄґҐ\s'\-]{2,50}$/;
  if (!nameRegex.test(cleaned)) {
    return { isValid: false, sanitized: cleaned, error: 'Ім\'я містить неприпустимі символи' };
  }

  return { isValid: true, sanitized: cleaned };
}

/**
 * Promo Code Validator (Alphanumeric only, prevent regex injection / ReDoS)
 */
export function sanitizePromoCode(code: string): string {
  if (!code || typeof code !== 'string') return '';
  return code.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 20);
}

/**
 * Price & Cart Integrity Verifier
 * Validates that prices are NEVER spoofed or manipulated in LocalStorage or client state.
 * Cross-references products against authoritative PRODUCTS database.
 */
export function verifyAndSanitizeCart(rawCart: unknown[]): CartItem[] {
  if (!Array.isArray(rawCart)) return [];

  const verifiedCart: CartItem[] = [];

  for (const item of rawCart) {
    if (!item || typeof item !== 'object') continue;
    const cartItem = item as Record<string, unknown>;

    const product = cartItem.product as Product | undefined;
    if (!product || typeof product.id !== 'number') continue;

    // Source of Truth Lookup
    const authoritativeProduct = PRODUCTS.find(p => p.id === product.id);
    if (!authoritativeProduct) continue; // Remove unverified or outdated products

    const quantity = Math.max(1, Math.min(99, Number(cartItem.quantity) || 1));
    const safeComment = cleanRawText(String(cartItem.comment || ''), 200);

    // Validate selected options & verify their genuine prices
    const selectedOptions: { group_name: string; option_name: string; price: number }[] = [];
    let extraCost = 0;

    if (Array.isArray(cartItem.selectedOptions)) {
      for (const opt of cartItem.selectedOptions) {
        if (!opt || typeof opt !== 'object') continue;
        const optObj = opt as Record<string, unknown>;
        const groupName = cleanRawText(String(optObj.group_name || ''), 50);
        const optionName = cleanRawText(String(optObj.option_name || ''), 50);

        // Cross-verify price from authoritative modifications
        let verifiedPrice = 0;
        if (authoritativeProduct.modifications) {
          for (const modGroup of authoritativeProduct.modifications) {
            const foundOpt = modGroup.options.find(o => o.name === optionName);
            if (foundOpt) {
              verifiedPrice = Math.max(0, foundOpt.price);
              break;
            }
          }
        }

        selectedOptions.push({
          group_name: groupName,
          option_name: optionName,
          price: verifiedPrice
        });
        extraCost += verifiedPrice;
      }
    }

    const unitPrice = authoritativeProduct.price + extraCost;
    const totalPrice = unitPrice * quantity;

    verifiedCart.push({
      id: String(cartItem.id || authoritativeProduct.id),
      product: authoritativeProduct,
      quantity,
      selectedOptions,
      totalPrice,
      comment: safeComment
    });
  }

  return verifiedCart;
}

/**
 * Client-Side Rate Limiter (Token Bucket / Timestamp-based)
 * Prevents spamming order submits, review submits or brute-forcing promo codes
 */
class RateLimiter {
  private attempts: Map<string, number[]> = new Map();

  /**
   * Checks if an action is allowed within the time window
   * @param actionKey unique identifier for action (e.g. 'submit_order', 'promo_attempt')
   * @param maxAttempts maximum allowed attempts in window
   * @param windowMs time window in milliseconds
   */
  isAllowed(actionKey: string, maxAttempts = 5, windowMs = 60000): boolean {
    const now = Date.now();
    const timestamps = this.attempts.get(actionKey) || [];

    // Filter out timestamps outside window
    const recent = timestamps.filter(t => now - t < windowMs);

    if (recent.length >= maxAttempts) {
      this.attempts.set(actionKey, recent);
      return false;
    }

    recent.push(now);
    this.attempts.set(actionKey, recent);
    return true;
  }

  getRemainingCooldownSeconds(actionKey: string, windowMs = 60000): number {
    const now = Date.now();
    const timestamps = this.attempts.get(actionKey) || [];
    if (timestamps.length === 0) return 0;
    const oldest = timestamps[0];
    return Math.max(0, Math.ceil((windowMs - (now - oldest)) / 1000));
  }
}

export const securityRateLimiter = new RateLimiter();
