'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import { useStore, UserType, AccountSubType } from '@/lib/store';

function RegisterFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useStore();
  
  const type = searchParams.get('type') as UserType;
  const subType = searchParams.get('subtype') as AccountSubType | null;
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [rgpdAccepted, setRgpdAccepted] = useState(false);
  const [step, setStep] = useState<'form' | 'rgpd'>('form');

  useEffect(() => {
    if (!type) {
      router.push('/auth/register');
    }
  }, [type, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 'form') {
      setStep('rgpd');
    } else {
      // Créer l'utilisateur mock
      const newUser = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        type: type!,
        subType: subType || undefined,
        verified: false,
        verificationStatus: 'pending' as const,
        plan: 'essentiel' as const,
      };
      login(newUser);
      router.push('/verify');
    }
  };

  if (step === 'rgpd') {
    return (
      <div className="min-h-screen bg-white">
        <Header title="Consentement RGPD" showBack />
        <div className="px-6 py-8 space-y-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Protection des données</h2>
            <p className="text-black/70 text-sm leading-relaxed">
              En utilisant Tchil, vous acceptez que nous collections et traitions vos données personnelles 
              conformément à notre politique de confidentialité et au RGPD.
            </p>
            <p className="text-black/70 text-sm leading-relaxed">
              Vos données sont utilisées uniquement pour améliorer votre expérience et vous connecter avec 
              d'autres utilisateurs. Vous pouvez à tout moment modifier ou supprimer vos données depuis 
              votre profil.
            </p>
          </div>
          
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={rgpdAccepted}
              onChange={(e) => setRgpdAccepted(e.target.checked)}
              className="mt-1 w-5 h-5 border-2 border-black"
            />
            <span className="text-sm text-black/70">
              J'accepte la collecte et le traitement de mes données personnelles
            </span>
          </label>

          <button
            onClick={handleSubmit}
            disabled={!rgpdAccepted}
            className="w-full rounded-lg border-2 border-black bg-black px-6 py-4 text-center font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Continuer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header title="Inscription" showBack />
      <form onSubmit={handleSubmit} className="px-6 py-8 space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Nom complet</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full rounded-lg border-2 border-black px-4 py-3"
            placeholder="Votre nom"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full rounded-lg border-2 border-black px-4 py-3"
            placeholder="votre@email.com"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Téléphone (optionnel)</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full rounded-lg border-2 border-black px-4 py-3"
            placeholder="+33 6 12 34 56 78"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Mot de passe</label>
          <input
            type="password"
            required
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full rounded-lg border-2 border-black px-4 py-3"
            placeholder="••••••••"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Confirmer le mot de passe</label>
          <input
            type="password"
            required
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            className="w-full rounded-lg border-2 border-black px-4 py-3"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-lg border-2 border-black bg-black px-6 py-4 text-center font-semibold text-white transition-opacity hover:opacity-90"
        >
          Continuer
        </button>
      </form>
    </div>
  );
}

export default function RegisterFormPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center">Chargement...</div>}>
      <RegisterFormContent />
    </Suspense>
  );
}
