'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useStore } from '@/lib/store';

export default function Home() {
  const router = useRouter();
  const { isAuthenticated } = useStore();

  // Rediriger si déjà connecté
  if (isAuthenticated) {
    router.push('/feed');
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-6 animate-fade-in">
      <div className="w-full max-w-sm space-y-8 text-center">
        <div className="space-y-4 animate-scale-in">
          <h1 className="text-5xl font-bold tracking-tight">Tchil</h1>
          <p className="text-lg text-black/70">
            L'app sociale minimaliste
          </p>
        </div>

        <div className="space-y-4 animate-slide-in" style={{ animationDelay: '0.2s' }}>
          <Link
            href="/auth/register"
            className="block w-full rounded-xl border-2 border-black bg-black px-6 py-4 text-center font-semibold text-white hover-lift active:scale-95 shadow-lg"
          >
            Créer un compte
          </Link>
          <Link
            href="/auth/login"
            className="block w-full rounded-xl border-2 border-black bg-white px-6 py-4 text-center font-semibold text-black hover-lift active:scale-95"
          >
            Se connecter
          </Link>
        </div>

        <div className="pt-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <Link
            href="/demo"
            className="text-sm text-black/60 underline hover:text-black transition-colors"
          >
            Mode Démo
          </Link>
        </div>
      </div>
    </div>
  );
}
