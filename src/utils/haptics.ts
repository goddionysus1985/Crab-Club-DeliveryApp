/**
 * Universal Haptic & Tactile Vibration Feedback Engine
 * Provides pleasant, crisp iOS/Android-style micro-vibrations for buttons, switches, tabs & cart actions.
 */

export type HapticType = 'light' | 'medium' | 'heavy' | 'selection' | 'success' | 'error';

export function triggerHaptic(type: HapticType = 'light'): void {
  try {
    if (typeof window === 'undefined' || !('vibrate' in navigator)) return;

    switch (type) {
      case 'selection':
      case 'light':
        // Crisp 12ms micro-tap (feels like a native iOS switch or mechanical button)
        navigator.vibrate(12);
        break;
      case 'medium':
        // 22ms solid tactile response for additions and actions
        navigator.vibrate(22);
        break;
      case 'heavy':
        // 35ms impact for checkout and modal openings
        navigator.vibrate(35);
        break;
      case 'success':
        // Double pleasant celebratory pulse
        navigator.vibrate([15, 35, 25]);
        break;
      case 'error':
        // Distinct alert vibration
        navigator.vibrate([25, 45, 35]);
        break;
    }
  } catch {
    // Gracefully ignore on unsupported devices
  }
}

/**
 * Initializes global pointerdown listener that automatically produces subtle micro-haptics
 * on any button, link, tab or interactive element across the whole application.
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
      // Debounce rapidly repeated taps to maintain crisp feel
      if (now - lastHapticTime > 40) {
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
