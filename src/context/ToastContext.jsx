import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertCircle, Info, Heart, Sparkles, X } from 'lucide-react';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'success', duration = 3500) => {
    const id = Date.now() + Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    if (duration > 0) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, duration);
    }
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      {/* Toast Render Container */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="pointer-events-auto flex items-center justify-between gap-3 px-4 py-3 rounded-2xl bg-stone-900/95 text-white backdrop-blur-xl border border-stone-700/80 shadow-2xl shadow-stone-950/50 animate-slide-up transition-all"
          >
            <div className="flex items-center gap-3 min-w-0">
              {toast.type === 'success' && (
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              )}
              {toast.type === 'wishlist' && (
                <div className="w-8 h-8 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0 border border-rose-500/30">
                  <Heart className="w-4 h-4 fill-rose-400" />
                </div>
              )}
              {toast.type === 'compare' && (
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/30">
                  <Sparkles className="w-4 h-4" />
                </div>
              )}
              {toast.type === 'info' && (
                <div className="w-8 h-8 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0 border border-sky-500/30">
                  <Info className="w-4 h-4" />
                </div>
              )}
              {toast.type === 'error' && (
                <div className="w-8 h-8 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center shrink-0 border border-red-500/30">
                  <AlertCircle className="w-4 h-4" />
                </div>
              )}
              <span className="text-xs sm:text-sm font-medium text-stone-100 truncate">
                {toast.message}
              </span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-stone-400 hover:text-white p-1 rounded-lg hover:bg-stone-800 transition-colors cursor-pointer shrink-0"
              aria-label="Close notification"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    return {
      addToast: () => {}
    };
  }
  return context;
}
