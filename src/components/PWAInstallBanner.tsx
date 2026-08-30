import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X, Share, PlusSquare, Smartphone, Sparkles, Check } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

export const PWAInstallBanner: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  useEffect(() => {
    // Check if already in standalone mode (already installed as PWA)
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone;
    if (isStandalone) return;

    // Check if user dismissed banner recently
    const dismissed = localStorage.getItem('crabclub_pwa_dismissed');
    if (dismissed && Date.now() - parseInt(dismissed, 10) < 1000 * 60 * 60 * 24 * 7) {
      // Dismissed within the last 7 days
      return;
    }

    // Detect iOS Safari
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIosDevice);

    // Android / Chrome beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      // Show install banner after 3 seconds of browsing
      setTimeout(() => setShowBanner(true), 3000);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // If iOS and not standalone, show after 4 seconds
    if (isIosDevice && !isStandalone) {
      const timer = setTimeout(() => setShowBanner(true), 4000);
      return () => clearTimeout(timer);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (isIOS) {
      setShowIOSGuide(true);
      return;
    }

    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setShowBanner(false);
      }
      setDeferredPrompt(null);
    } else {
      setShowIOSGuide(true);
    }
  };

  const handleDismiss = () => {
    localStorage.setItem('crabclub_pwa_dismissed', Date.now().toString());
    setShowBanner(false);
    setShowIOSGuide(false);
  };

  return (
    <>
      {/* Floating Bottom Install Banner */}
      <AnimatePresence>
        {showBanner && !showIOSGuide && (
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 60, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-20 sm:bottom-6 left-3 right-3 sm:left-auto sm:right-6 sm:max-w-md z-40 bg-[#12121D]/95 backdrop-blur-xl border border-crab-500/30 rounded-3xl p-3.5 sm:p-4 shadow-2xl shadow-black/80 flex items-center justify-between gap-3"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-crab-600 to-black p-0.5 border border-crab-500/30 shrink-0 shadow-lg shadow-crab-600/30 flex items-center justify-center">
                <img
                  src={RESTAURANT_INFO.logo_icon}
                  alt="Crab Club App"
                  className="w-full h-full object-contain p-1 rounded-[10px]"
                />
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h3 className="font-display font-extrabold text-white text-xs sm:text-sm tracking-tight truncate">
                    Встановити додаток CRAB CLUB
                  </h3>
                  <span className="px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-400 text-[9px] font-bold uppercase">
                    Швидко
                  </span>
                </div>
                <p className="text-[11px] text-zinc-400 font-light truncate mt-0.5">
                  Замовляйте в 1 клік з головного екрану
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <motion.button
                whileTap={{ scale: 0.93 }}
                onClick={handleInstallClick}
                className="px-3 sm:px-4 py-2 rounded-xl apple-button-primary text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-crab-600/30"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Встановити</span>
              </motion.button>

              <button
                onClick={handleDismiss}
                aria-label="Закрити"
                className="p-1.5 rounded-xl text-zinc-500 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* iOS Safari Step-by-Step Installation Modal */}
      <AnimatePresence>
        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowIOSGuide(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 30 }}
              transition={{ type: 'spring', damping: 26, stiffness: 320 }}
              className="relative w-full max-w-md bg-[#111119] border-t sm:border border-white/[0.12] rounded-t-[32px] sm:rounded-3xl p-5 sm:p-6 shadow-2xl z-10 mt-auto sm:my-auto text-center space-y-4"
            >
              <div className="w-12 h-1.5 bg-white/20 rounded-full mx-auto -mt-2 mb-2 sm:hidden shrink-0" />

              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-crab-600 to-black p-0.5 border border-crab-500/30 mx-auto shadow-xl flex items-center justify-center">
                <img
                  src={RESTAURANT_INFO.logo_icon}
                  alt="Crab Club"
                  className="w-full h-full object-contain p-1 rounded-[10px]"
                />
              </div>

              <div className="space-y-1">
                <h3 className="font-display font-extrabold text-lg text-white">
                  Встановлення додатку на iPhone / iPad
                </h3>
                <p className="text-xs text-zinc-400 font-light">
                  Додайте Crab Club на головний екран всього за 2 прості кроки:
                </p>
              </div>

              {/* Instructions steps */}
              <div className="space-y-2.5 text-left p-3.5 rounded-2xl bg-white/[0.04] border border-white/[0.08] text-xs text-zinc-300">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-lg bg-crab-600/20 border border-crab-500/30 text-crab-400 font-bold flex items-center justify-center shrink-0 text-xs">
                    1
                  </div>
                  <div>
                    <span>Натисніть кнопку </span>
                    <strong className="text-white inline-flex items-center gap-1 font-semibold">
                      «Поділитися» <Share className="w-3.5 h-3.5 text-blue-400 inline" />
                    </strong>
                    <span> внизу або вгорі вашого браузера Safari.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-2 border-t border-white/[0.06]">
                  <div className="w-6 h-6 rounded-lg bg-amber-500/20 border border-amber-500/30 text-amber-400 font-bold flex items-center justify-center shrink-0 text-xs">
                    2
                  </div>
                  <div>
                    <span>Прокрутіть меню та оберіть </span>
                    <strong className="text-white inline-flex items-center gap-1 font-semibold">
                      «На початковий екран» <PlusSquare className="w-3.5 h-3.5 text-amber-400 inline" />
                    </strong>
                    <span>.</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  onClick={handleDismiss}
                  className="flex-1 py-3 rounded-2xl apple-button-primary text-white font-bold text-xs sm:text-sm text-center shadow-lg"
                >
                  Зрозуміло, дякую!
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
