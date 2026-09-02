// Order Notification & Status Audio/Push Service

const NOTIFIED_STEP_PREFIX = 'crabclub_notified_step_';

/**
 * Get highest step index that has already been alerted for a specific order
 */
export function getHighestNotifiedStep(orderIdentifier: string | number): number {
  if (!orderIdentifier) return 0;
  try {
    const key = `${NOTIFIED_STEP_PREFIX}${orderIdentifier}`;
    const stored = localStorage.getItem(key) || sessionStorage.getItem(key);
    return stored ? parseInt(stored, 10) : 0;
  } catch {
    return 0;
  }
}

/**
 * Persist highest alerted step index to prevent repeat notifications
 */
export function setHighestNotifiedStep(orderIdentifier: string | number, step: number) {
  if (!orderIdentifier) return;
  try {
    const key = `${NOTIFIED_STEP_PREFIX}${orderIdentifier}`;
    localStorage.setItem(key, String(step));
    sessionStorage.setItem(key, String(step));
  } catch {}
}

/**
 * Clear notification history for testing or resetting
 */
export function clearNotifiedStep(orderIdentifier: string | number) {
  if (!orderIdentifier) return;
  try {
    const key = `${NOTIFIED_STEP_PREFIX}${orderIdentifier}`;
    localStorage.removeItem(key);
    sessionStorage.removeItem(key);
  } catch {}
}

/**
 * Melodic dual-tone audio chime (Web Audio API)
 */
export function playOrderSuccessChime() {
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const now = ctx.currentTime;

    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(523.25, now); // C5
    osc1.frequency.exponentialRampToValueAtTime(1046.5, now + 0.15); // C6
    gain1.gain.setValueAtTime(0.15, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.45);

    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(659.25, now + 0.1); // E5
    osc2.frequency.exponentialRampToValueAtTime(1318.5, now + 0.25); // E6
    gain2.gain.setValueAtTime(0.12, now + 0.1);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + 0.1);
    osc2.stop(now + 0.6);

    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate([100, 50, 150]);
    }
  } catch {}
}

/**
 * Native Browser Push / System Notification
 */
export function sendBrowserNotification(title: string, body: string) {
  try {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      if (Notification.permission === 'granted') {
        new Notification(title, {
          body,
          icon: 'https://img.postershop.me/21253/48ff3a5a-f1f0-4892-8331-602d1b6620bb_image.png'
        });
      }
    }
  } catch {}
}

/**
 * Request notification permission safely
 */
export function requestNotificationPermission() {
  try {
    if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission().catch(() => {});
    }
  } catch {}
}

let lastAlertTimestamp = 0;
let lastAlertStep = 0;
let lastAlertOrderId = '';

/**
 * Thread-safe, deduplicated notifier for order status step changes
 * Ensures audio chime, toast, and push notifications fire exactly once
 */
export function notifyStepChange(
  orderId: string | number,
  step: number,
  statusName: string,
  receiptNumber: string | number,
  showToastFn?: (text: string, image?: string, type?: 'success' | 'info' | 'error') => void
): boolean {
  const now = Date.now();
  const idStr = String(orderId);

  // Debounce lock: block any identical notification within 3 seconds
  if (lastAlertOrderId === idStr && lastAlertStep === step && (now - lastAlertTimestamp) < 3000) {
    return false;
  }

  const highest = getHighestNotifiedStep(orderId);
  if (step <= highest) {
    return false;
  }

  // Update timestamps and records
  lastAlertTimestamp = now;
  lastAlertStep = step;
  lastAlertOrderId = idStr;
  setHighestNotifiedStep(orderId, step);

  // Sound + Push + Toast
  playOrderSuccessChime();
  if (showToastFn) {
    showToastFn(`Статус оновлено: ${statusName}`, undefined, 'success');
  }
  sendBrowserNotification('🦀 Crab Club Delivery', `Замовлення #${receiptNumber}: ${statusName}`);
  return true;
}
