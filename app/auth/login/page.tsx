'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import { useStore } from '@/lib/store';
import mockUsers from '@/data/mockUsers.json';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useStore();
  const [method, setMethod] = useState<'email' | 'phone' | 'social'>('email');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simuler connexion avec premier utilisateur mock
    const user = mockUsers[0];
    login({
      id: user.id,
      name: user.name,
      email: user.email,
      type: user.type as any,
      subType: user.subType as any,
      verified: user.verified,
      verificationStatus: user.verificationStatus as any,
      plan: user.plan as any,
    });
    router.push('/feed');
  };

  const handlePhoneLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simuler OTP (juste pour la démo)
    alert('Code OTP envoyé ! (Mode démo : utilisez 123456)');
    const user = mockUsers[0];
    login({
      id: user.id,
      name: user.name,
      email: user.email,
      type: user.type as any,
      subType: user.subType as any,
      verified: user.verified,
      verificationStatus: user.verificationStatus as any,
      plan: user.plan as any,
    });
    router.push('/feed');
  };

  const handleSocialLogin = (provider: string) => {
    alert(`Connexion ${provider} (Mode démo)`);
    const user = mockUsers[0];
    login({
      id: user.id,
      name: user.name,
      email: user.email,
      type: user.type as any,
      subType: user.subType as any,
      verified: user.verified,
      verificationStatus: user.verificationStatus as any,
      plan: user.plan as any,
    });
    router.push('/feed');
  };

  return (
    <div className="min-h-screen bg-white">
      <Header title="Connexion" showBack />
      <div className="px-6 py-8 space-y-6">
        <div className="flex gap-2 border-b border-black">
          <button
            onClick={() => setMethod('email')}
            className={`flex-1 px-4 py-3 text-sm font-medium ${
              method === 'email' ? 'border-b-2 border-black' : 'text-black/60'
            }`}
          >
            Email
          </button>
          <button
            onClick={() => setMethod('phone')}
            className={`flex-1 px-4 py-3 text-sm font-medium ${
              method === 'phone' ? 'border-b-2 border-black' : 'text-black/60'
            }`}
          >
            Téléphone
          </button>
          <button
            onClick={() => setMethod('social')}
            className={`flex-1 px-4 py-3 text-sm font-medium ${
              method === 'social' ? 'border-b-2 border-black' : 'text-black/60'
            }`}
          >
            Social
          </button>
        </div>

        {method === 'email' && (
          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border-2 border-black px-4 py-3"
                placeholder="votre@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Mot de passe</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border-2 border-black px-4 py-3"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-lg border-2 border-black bg-black px-6 py-4 text-center font-semibold text-white transition-opacity hover:opacity-90"
            >
              Se connecter
            </button>
          </form>
        )}

        {method === 'phone' && (
          <form onSubmit={handlePhoneLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Téléphone</label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-lg border-2 border-black px-4 py-3"
                placeholder="+33 6 12 34 56 78"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-lg border-2 border-black bg-black px-6 py-4 text-center font-semibold text-white transition-opacity hover:opacity-90"
            >
              Envoyer le code OTP
            </button>
          </form>
        )}

        {method === 'social' && (
          <div className="space-y-4">
            <button
              onClick={() => handleSocialLogin('Apple')}
              className="w-full rounded-lg border-2 border-black bg-white px-6 py-4 text-center font-semibold text-black transition-opacity hover:opacity-80"
            >
              🍎 Continuer avec Apple
            </button>
            <button
              onClick={() => handleSocialLogin('Google')}
              className="w-full rounded-lg border-2 border-black bg-white px-6 py-4 text-center font-semibold text-black transition-opacity hover:opacity-80"
            >
              🔍 Continuer avec Google
            </button>
          </div>
        )}

        <div className="text-center">
          <Link href="/auth/register" className="text-sm text-black/60 underline">
            Pas encore de compte ? Créer un compte
          </Link>
        </div>
      </div>
    </div>
  );
}
