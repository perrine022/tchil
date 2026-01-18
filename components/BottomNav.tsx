'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useStore } from '@/lib/store';

const navItems = [
  { href: '/feed', label: 'Fil', icon: '📰' },
  { href: '/dating', label: 'Rencontres', icon: '💕' },
  { href: '/events', label: 'Événements', icon: '📅' },
  { href: '/checkin', label: 'Check-in', icon: '📍' },
  { href: '/profile', label: 'Profil', icon: '👤' },
];

export default function BottomNav() {
  const pathname = usePathname();
  const { modules } = useStore();

  // Ne pas afficher sur les pages auth/onboarding
  if (pathname?.startsWith('/auth') || pathname === '/' || pathname?.startsWith('/verify')) {
    return null;
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-black bg-white md:left-1/2 md:right-auto md:-translate-x-1/2 md:max-w-[420px]">
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const isDisabled = 
            (item.href === '/feed' && !modules.feed) ||
            (item.href === '/dating' && !modules.dating) ||
            (item.href === '/events' && !modules.events) ||
            (item.href === '/checkin' && !modules.checkin) ||
            (item.href === '/profile' && false); // Profil toujours accessible

          return (
            <Link
              key={item.href}
              href={isDisabled ? '#' : item.href}
              className={`flex flex-col items-center justify-center gap-1 px-3 py-2 transition-opacity ${
                isDisabled ? 'opacity-40 cursor-not-allowed' : ''
              } ${isActive ? 'opacity-100' : 'opacity-60'}`}
              aria-label={item.label}
            >
              <span className="text-2xl">{item.icon}</span>
              <span className="text-xs font-medium">{item.label}</span>
              {isActive && (
                <div className="absolute bottom-0 left-1/2 h-0.5 w-8 -translate-x-1/2 bg-black" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
