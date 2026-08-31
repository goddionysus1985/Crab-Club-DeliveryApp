/**
 * Payment Gateway Service for Monobank, Apple Pay, Google Pay, and WayForPay / LiqPay
 */

export interface PaymentConfig {
  merchantName: string;
  currency: string;
  monobankToken?: string;
  wayforpayAccount?: string;
  isSandbox: boolean;
}

const env = (import.meta as any).env || {};

export const PAYMENT_CONFIG: PaymentConfig = {
  merchantName: env.VITE_RESTAURANT_NAME || "CRAB CLUB",
  currency: "UAH",
  monobankToken: env.VITE_MONOBANK_TOKEN || "",
  wayforpayAccount: env.VITE_WAYFORPAY_MERCHANT_ACCOUNT || "",
  isSandbox: !Boolean(env.VITE_MONOBANK_TOKEN || env.VITE_WAYFORPAY_MERCHANT_ACCOUNT),
};

export type CardType = 'visa' | 'mastercard' | 'prostir' | 'unknown';

/**
 * Detect card type from number prefix
 */
export function detectCardType(number: string): CardType {
  const clean = number.replace(/\D/g, '');
  if (/^4/.test(clean)) return 'visa';
  if (/^(5[1-5]|2[2-7])/.test(clean)) return 'mastercard';
  if (/^(9804)/.test(clean)) return 'prostir';
  return 'unknown';
}

/**
 * Format credit card number with spaces (4-4-4-4)
 */
export function formatCardNumber(value: string): string {
  const clean = value.replace(/\D/g, '').slice(0, 16);
  const parts: string[] = [];
  for (let i = 0; i < clean.length; i += 4) {
    parts.push(clean.substring(i, i + 4));
  }
  return parts.join(' ');
}

/**
 * Format expiration date (MM/YY)
 */
export function formatExpDate(value: string): string {
  const clean = value.replace(/\D/g, '').slice(0, 4);
  if (clean.length >= 3) {
    return `${clean.slice(0, 2)}/${clean.slice(2, 4)}`;
  }
  return clean;
}

/**
 * Luhn Algorithm for credit card number validation
 */
export function validateCardNumber(number: string): boolean {
  const clean = number.replace(/\D/g, '');
  if (clean.length < 13 || clean.length > 19) return false;

  let sum = 0;
  let shouldDouble = false;

  for (let i = clean.length - 1; i >= 0; i--) {
    let digit = parseInt(clean.charAt(i), 10);

    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }

    sum += digit;
    shouldDouble = !shouldDouble;
  }

  return sum % 10 === 0;
}

/**
 * Validate card expiry date
 */
export function validateExpDate(exp: string): boolean {
  if (!/^\d{2}\/\d{2}$/.test(exp)) return false;
  const [monthStr, yearStr] = exp.split('/');
  const month = parseInt(monthStr, 10);
  const year = parseInt(`20${yearStr}`, 10);

  if (month < 1 || month > 12) return false;

  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;

  if (year < currentYear) return false;
  if (year === currentYear && month < currentMonth) return false;
  if (year > currentYear + 15) return false;

  return true;
}

/**
 * Generate Monobank QR Payment URL
 */
export function generateMonobankQrData(amount: number, orderId: string): { qrUrl: string; deepLink: string } {
  const encodedData = encodeURIComponent(`CRAB_CLUB_${orderId}_${amount}`);
  return {
    qrUrl: `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=https://send.monobank.ua/jar/CrabClub?amount=${amount}&ref=${orderId}`,
    deepLink: `https://send.monobank.ua/jar/CrabClub?amount=${amount}`
  };
}
