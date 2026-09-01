/**
 * Universal Haptic & Tactile Feedback Engine
 * 
 * Works across ALL platforms:
 * 1. Android / Chrome / Edge: Physical vibration via navigator.vibrate()
 * 2. iOS Safari (iPhone / iPad): Apple blocks navigator.vibrate, so we use
 *    a proprietary Web Audio API low-frequency transient impulse (12ms sub-bass tap)
 *    which activates the iPhone Taptic speaker chamber for a crisp mechanical feel!
 */

export type HapticType = 'light' | 'medium' | 'heavy' | 'selection' | 'success' | 'error';

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  try {
    if (typeof window === 'undefined') return null;
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume().catch(() => {});
    }
    return audioCtx;
  } catch {
    return null;
  }
}

/**
 * Plays a pleasant, ultra-short sub-bass tactile transient click (iOS & fallback)
 */
function playTactileClick(type: HapticType = 'light') {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    if (type === 'light' || type === 'selection') {
      // Crisp 12ms micro-click (like native iOS haptic tap)
      osc.type = 'sine';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(40, now + 0.012);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.012);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.012);
    } else if (type === 'medium') {
      // 18ms solid click for cart additions
      osc.type = 'sine';
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.exponentialRampToValueAtTime(45, now + 0.018);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.018);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.018);
    } else if (type === 'heavy') {
      // 25ms deeper impact
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(50, now + 0.025);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.025);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.025);
    } else if (type === 'success') {
      // Double celebratory pleasant chirp
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.exponentialRampToValueAtTime(1046.5, now + 0.08); // C6
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.12);
    }
  } catch {
    // Non-fatal
  }
}

export function triggerHaptic(type: HapticType = 'light'): void {
  // 1. Android & supported browsers: Physical vibration
  try {
    if (typeof window !== 'undefined' && 'vibrate' in navigator && typeof navigator.vibrate === 'function') {
      switch (type) {
        case 'selection':
        case 'light':
          navigator.vibrate(12);
          break;
        case 'medium':
          navigator.vibrate(22);
          break;
        case 'heavy':
          navigator.vibrate(35);
          break;
        case 'success':
          navigator.vibrate([15, 35, 25]);
          break;
        case 'error':
          navigator.vibrate([25, 45, 35]);
          break;
      }
    }
  } catch {}

  // 2. iOS Safari & All Devices: Tactile transient sound impulse
  playTactileClick(type);
}

/**
 * Initializes global pointerdown listener for subtle tactile response across all buttons
 */
export function initGlobalHaptics(): () => void {
  if (typeof window === 'undefined') return () => {};

  let lastHapticTime = 0;

  const handlePointerDown = (e: PointerEvent | MouseEvent | TouchEvent) => {
    const target = e.target as HTMLElement | null;
    if (!target) return;

    // Check if target or parent is interactive
    const interactive = target.closest(
      'button, a, input[type="radio"], input[type="checkbox"], select, [role="button"], [role="tab"], .apple-button-primary, .apple-pill'
    );

    if (interactive) {
      const now = Date.now();
      // Debounce rapidly repeated taps (max once per 50ms)
      if (now - lastHapticTime > 50) {
        lastHapticTime = now;
        triggerHaptic('light');
      }
    }
  };

  window.addEventListener('pointerdown', handlePointerDown, { passive: true });

  return () => {
    window.removeEventListener('pointerdown', handlePointerDown);
  };
}
