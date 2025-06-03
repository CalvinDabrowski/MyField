'use client';

import * as React from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ToastProps {
  id: string;
  title?: string;
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  onClose: (id: string) => void;
}

const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  ({ id, title, message, type = 'info', duration = 5000, onClose, ...props }, ref) => {
    React.useEffect(() => {
      const timer = setTimeout(() => {
        onClose(id);
      }, duration);

      return () => clearTimeout(timer);
    }, [id, duration, onClose]);

    const getToastStyles = () => {
      switch (type) {
        case 'success':
          return 'bg-green-50 border-green-200 text-green-800';
        case 'error':
          return 'bg-red-50 border-red-200 text-red-800';
        case 'warning':
          return 'bg-yellow-50 border-yellow-200 text-yellow-800';
        default:
          return 'bg-blue-50 border-blue-200 text-blue-800';
      }
    };

    return (
      <div
        ref={ref}
        className={cn(
          'relative flex items-start gap-3 rounded-lg border p-4 shadow-lg transition-all duration-300 ease-in-out',
          'animate-in slide-in-from-right-full',
          getToastStyles()
        )}
        {...props}
      >
        <div className="flex-1">
          {title && (
            <div className="font-medium text-sm mb-1">{title}</div>
          )}
          <div className="text-sm">{message}</div>
        </div>
        <button
          onClick={() => onClose(id)}
          className="flex-shrink-0 p-1 rounded-md hover:bg-black/10 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    );
  }
);

Toast.displayName = 'Toast';

export { Toast };

// Toast Provider and Hook
export interface ToastContextValue {
  showToast: (toast: Omit<ToastProps, 'id' | 'onClose'>) => void;
  toasts: ToastProps[];
}

const ToastContext = React.createContext<ToastContextValue | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastProps[]>([]);

  const showToast = React.useCallback((toast: Omit<ToastProps, 'id' | 'onClose'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: ToastProps = {
      ...toast,
      id,
      onClose: (toastId: string) => {
        setToasts(prev => prev.filter(t => t.id !== toastId));
      },
    };
    setToasts(prev => [...prev, newToast]);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast, toasts }}>
      {children}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-sm">
        {toasts.map(toast => (
          <Toast key={toast.id} {...toast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
