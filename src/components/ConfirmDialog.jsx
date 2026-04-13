import { useState } from 'react';
import { AlertTriangle, Loader2, CheckCircle, XCircle } from 'lucide-react';
import clsx from 'clsx';

export default function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Action',
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  type = 'warning',
  loading = false
}) {
  if (!isOpen) return null;
  
  const icons = {
    warning: { icon: AlertTriangle, color: 'text-amber-500', bg: 'bg-amber-50', border: 'border-amber-200' },
    danger: { icon: XCircle, color: 'text-red-500', bg: 'bg-red-50', border: 'border-red-200' },
    success: { icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-50', border: 'border-green-200' }
  };
  
  const { icon: Icon, color, bg, border } = icons[type] || icons.warning;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl animate-slide-in overflow-hidden">
        <div className={clsx('p-6 border-b', border)}>
          <div className="flex items-center gap-4">
            <div className={clsx('w-12 h-12 rounded-full flex items-center justify-center', bg)}>
              <Icon className={clsx('w-6 h-6', color)} />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
              {message && <p className="text-sm text-slate-500 mt-1">{message}</p>}
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-end gap-3 px-6 py-4 bg-slate-50">
          <button
            onClick={onClose}
            disabled={loading}
            className="btn-secondary"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className={clsx(
              'btn-primary',
              type === 'danger' && 'bg-red-600 hover:bg-red-700'
            )}
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              confirmText
            )}
          </button>
        </div>
      </div>
    </div>
  );
}