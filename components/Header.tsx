'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useStore } from '@/lib/store';

interface HeaderProps {
  title: string;
  showBack?: boolean;
  rightAction?: React.ReactNode;
}

export default function Header({ title, showBack = false, rightAction }: HeaderProps) {
  const router = useRouter();
  const { user, cart } = useStore();

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between border-b border-black bg-white/95 backdrop-blur-sm px-4 py-3 shadow-sm md:max-w-[420px] md:mx-auto">
      <div className="flex items-center gap-3 flex-1">
        {showBack && (
          <button
            onClick={() => router.back()}
            className="flex items-center justify-center w-10 h-10 -ml-2 rounded-full hover:bg-black/5 transition-all duration-200 active:scale-95"
            aria-label="Retour"
          >
            <span className="text-xl transition-transform hover:translate-x-[-2px]">◀</span>
          </button>
        )}
        <h1 className="text-lg font-semibold animate-fade-in">{title}</h1>
      </div>
      {rightAction && <div className="flex items-center">{rightAction}</div>}
      {title === 'Boutique' && (
        <Link
          href="/shop/cart"
          className="relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-black/5 transition-all duration-200 active:scale-95"
          aria-label="Panier"
        >
          <span className="text-xl">◉</span>
          {cart.length > 0 && (
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-black text-xs font-bold text-white animate-scale-in shadow-lg">
              {cart.length}
            </span>
          )}
        </Link>
      )}
    </header>
  );
}
