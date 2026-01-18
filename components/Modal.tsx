'use client';

import { useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 md:max-w-[420px] md:mx-auto"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-white rounded-lg shadow-lg border border-black"
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div className="flex items-center justify-between border-b border-black px-4 py-3">
            <h2 className="text-lg font-semibold">{title}</h2>
            <button
              onClick={onClose}
              className="flex items-center justify-center w-8 h-8"
              aria-label="Fermer"
            >
              <span className="text-xl">×</span>
            </button>
          </div>
        )}
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}
