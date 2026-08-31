import React, { useEffect, useRef } from 'react';
import { TELEGRAM_AUTH_CONFIG } from '../services/telegramAuth';

export interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
  auth_date: number;
  hash: string;
}

interface TelegramLoginWidgetProps {
  onAuth: (user: TelegramUser) => void;
  buttonSize?: 'large' | 'medium' | 'small';
  cornerRadius?: number;
  requestAccess?: boolean;
}

declare global {
  interface Window {
    onTelegramAuth?: (user: TelegramUser) => void;
  }
}

export const TelegramLoginWidget: React.FC<TelegramLoginWidgetProps> = ({
  onAuth,
  buttonSize = 'large',
  cornerRadius = 16,
  requestAccess = true
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Define global callback handler
    window.onTelegramAuth = (user: TelegramUser) => {
      onAuth(user);
    };

    if (containerRef.current) {
      containerRef.current.innerHTML = '';
      
      const script = document.createElement('script');
      script.src = 'https://telegram.org/js/telegram-widget.js?22';
      script.async = true;
      script.setAttribute('data-telegram-login', TELEGRAM_AUTH_CONFIG.botUsername);
      script.setAttribute('data-size', buttonSize);
      script.setAttribute('data-radius', cornerRadius.toString());
      script.setAttribute('data-request-access', requestAccess ? 'write' : 'read');
      script.setAttribute('data-userpic', 'false');
      script.setAttribute('data-onauth', 'onTelegramAuth(user)');

      containerRef.current.appendChild(script);
    }

    return () => {
      if (window.onTelegramAuth) {
        delete window.onTelegramAuth;
      }
    };
  }, [onAuth, buttonSize, cornerRadius, requestAccess]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[44px]">
      <div ref={containerRef} className="flex justify-center" />
    </div>
  );
};
