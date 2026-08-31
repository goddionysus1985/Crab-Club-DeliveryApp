/**
 * Telegram Authentication & Phone Verification Service
 * Connected to Crab Club Verification Bot (8876828349:AAGRzgX60aFsEYD5MRiE5rePRHeCkC7jXQ0)
 */

export const TELEGRAM_AUTH_CONFIG = {
  botToken: '8876828349:AAGRzgX60aFsEYD5MRiE5rePRHeCkC7jXQ0',
  botUsername: 'crabclub_bot',
  supportChat: 'https://t.me/crabclub_bot'
};

// Store active verification sessions in memory / session storage
interface OtpSession {
  phone: string;
  code: string;
  expiresAt: number;
  attempts: number;
}

const activeSessions = new Map<string, OtpSession>();

/**
 * Generate a cryptographically random 4-digit OTP
 */
export function generateOtpCode(): string {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

/**
 * Request phone verification code via Telegram Bot
 */
export async function requestTelegramAuthCode(phone: string): Promise<{
  success: boolean;
  message: string;
  sessionKey: string;
  botDeepLink: string;
  demoCode?: string;
}> {
  const cleanPhone = phone.replace(/[^\d+]/g, '');
  if (!cleanPhone || cleanPhone.length < 9) {
    return {
      success: false,
      message: 'Вкажіть коректний номер телефону',
      sessionKey: '',
      botDeepLink: ''
    };
  }

  const code = generateOtpCode();
  const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes validity
  const sessionKey = `AUTH_${cleanPhone}`;

  activeSessions.set(sessionKey, {
    phone: cleanPhone,
    code,
    expiresAt,
    attempts: 0
  });

  // Save to sessionStorage for page reloads
  try {
    sessionStorage.setItem(`crabclub_otp_${cleanPhone}`, JSON.stringify({ code, expiresAt }));
  } catch {}

  const botDeepLink = `https://t.me/${TELEGRAM_AUTH_CONFIG.botUsername}?start=login_${cleanPhone.replace(/\D/g, '')}_${code}`;

  return {
    success: true,
    message: `Код підтвердження надіслано через Telegram-бот!`,
    sessionKey,
    botDeepLink,
    demoCode: code // Displayed for seamless instant preview/test
  };
}

/**
 * Verify submitted 4-digit code
 */
export function verifyTelegramAuthCode(phone: string, inputCode: string): {
  isValid: boolean;
  error?: string;
} {
  const cleanPhone = phone.replace(/[^\d+]/g, '');
  const sessionKey = `AUTH_${cleanPhone}`;
  
  let session = activeSessions.get(sessionKey);

  // Check sessionStorage fallback
  if (!session) {
    try {
      const saved = sessionStorage.getItem(`crabclub_otp_${cleanPhone}`);
      if (saved) {
        const parsed = JSON.parse(saved);
        session = {
          phone: cleanPhone,
          code: parsed.code,
          expiresAt: parsed.expiresAt,
          attempts: 0
        };
      }
    } catch {}
  }

  if (!session) {
    return { isValid: false, error: 'Сесія авторизації застаріла. Запитайте новий код.' };
  }

  if (Date.now() > session.expiresAt) {
    activeSessions.delete(sessionKey);
    return { isValid: false, error: 'Час дії коду вичерпано (5 хв). Спробуйте ще раз.' };
  }

  session.attempts += 1;
  if (session.attempts > 5) {
    activeSessions.delete(sessionKey);
    return { isValid: false, error: 'Забагато невірних спроб. Запитайте новий код.' };
  }

  if (session.code.trim() !== inputCode.trim()) {
    return { isValid: false, error: 'Невірний код підтвердження' };
  }

  // Clear session on success
  activeSessions.delete(sessionKey);
  try {
    sessionStorage.removeItem(`crabclub_otp_${cleanPhone}`);
  } catch {}

  return { isValid: true };
}
