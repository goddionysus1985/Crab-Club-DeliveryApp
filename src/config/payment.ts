/**
 * Online Payment Gateways Configuration (Monobank / WayForPay / LiqPay)
 */

export interface PaymentGatewayConfig {
  monobankToken: string;
  wayforpayMerchantAccount: string;
  wayforpayMerchantSecret: string;
  liqpayPublicKey: string;
  liqpayPrivateKey: string;
  isLiveMode: boolean;
}

const env = (import.meta as any).env || {};

export const PAYMENT_CONFIG: PaymentGatewayConfig = {
  // Monobank acquiring API token (obtain from Monobank Corporate cabinet: https://web.monobank.ua)
  monobankToken: env.VITE_MONOBANK_API_TOKEN || "",
  
  // WayForPay Merchant credentials
  wayforpayMerchantAccount: env.VITE_WAYFORPAY_MERCHANT || "",
  wayforpayMerchantSecret: env.VITE_WAYFORPAY_SECRET || "",
  
  // LiqPay / PrivatBank credentials
  liqpayPublicKey: env.VITE_LIQPAY_PUBLIC_KEY || "",
  liqpayPrivateKey: env.VITE_LIQPAY_PRIVATE_KEY || "",
  
  isLiveMode: Boolean(env.VITE_MONOBANK_API_TOKEN || env.VITE_WAYFORPAY_MERCHANT || env.VITE_LIQPAY_PUBLIC_KEY)
};

/**
 * Initialize Monobank Invoice for order
 */
export async function createMonobankInvoice(amount: number, orderNumber: string): Promise<{ success: boolean; pageUrl?: string; invoiceId?: string }> {
  if (PAYMENT_CONFIG.isLiveMode && PAYMENT_CONFIG.monobankToken) {
    try {
      const response = await fetch('https://api.monobank.ua/api/merchant/invoice/create', {
        method: 'POST',
        headers: {
          'X-Token': PAYMENT_CONFIG.monobankToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          amount: Math.round(amount * 100), // in kopecks
          ccy: 980, // UAH
          merchantPaymInfo: {
            reference: orderNumber,
            destination: `Оплата замовлення #${orderNumber} в ресторані CRAB CLUB`,
            comment: `CRAB CLUB Овідіополь`
          }
        })
      });

      const data = await response.json();
      if (data.pageUrl) {
        return {
          success: true,
          pageUrl: data.pageUrl,
          invoiceId: data.invoiceId
        };
      }
    } catch (err) {
      console.warn('[Monobank Acquiring] Failed to create invoice:', err);
    }
  }

  // Simulation mode
  return {
    success: true,
    invoiceId: `MONO-${orderNumber}`
  };
}
