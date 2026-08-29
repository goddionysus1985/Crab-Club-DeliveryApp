import React, { Component, ErrorInfo, ReactNode } from 'react';
import { ShieldAlert, RotateCcw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('CRAB CLUB Application Error Boundary caught:', error, errorInfo);
  }

  private handleReset = () => {
    try {
      localStorage.removeItem('crabclub_cart');
    } catch {
      // ignore
    }
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0B0B0F] text-zinc-100 flex items-center justify-center p-4 selection:bg-crab-600">
          <div className="max-w-md w-full apple-card p-8 rounded-3xl text-center space-y-6 border border-white/10 shadow-2xl">
            <div className="w-16 h-16 rounded-2xl bg-crab-600/20 border border-crab-500/30 flex items-center justify-center mx-auto text-crab-400">
              <ShieldAlert className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h2 className="text-xl sm:text-2xl font-display font-extrabold text-white">
                Безпечне відновлення
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
                Сталася непередбачена помилка інтерфейсу. Для вашої безпеки дані захищені.
              </p>
            </div>

            <button
              onClick={this.handleReset}
              className="w-full py-3.5 px-6 rounded-2xl apple-button-primary text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Перезавантажити сайт</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
