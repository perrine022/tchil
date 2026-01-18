'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';

type AccountType = 'particulier' | 'createur' | 'professionnel';
type SubType = 'mineur' | 'adulte';

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState<'type' | 'subtype'>('type');
  const [accountType, setAccountType] = useState<AccountType | null>(null);

  const handleTypeSelect = (type: AccountType) => {
    setAccountType(type);
    if (type === 'particulier') {
      setStep('subtype');
    } else {
      router.push(`/auth/register/form?type=${type}`);
    }
  };

  const handleSubTypeSelect = (subType: SubType) => {
    router.push(`/auth/register/form?type=particulier&subtype=${subType}`);
  };

  if (step === 'subtype') {
    return (
      <div className="min-h-screen bg-white">
        <Header title="Type de compte" showBack />
        <div className="px-6 py-8 space-y-4">
          <p className="text-black/70 mb-6">Vous êtes :</p>
          <button
            onClick={() => handleSubTypeSelect('adulte')}
            className="w-full rounded-lg border-2 border-black bg-white px-6 py-4 text-left font-semibold text-black transition-opacity hover:opacity-80"
          >
            Majeur (18 ans et plus)
          </button>
          <button
            onClick={() => handleSubTypeSelect('mineur')}
            className="w-full rounded-lg border-2 border-black bg-white px-6 py-4 text-left font-semibold text-black transition-opacity hover:opacity-80"
          >
            Mineur (moins de 18 ans)
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header title="Créer un compte" showBack />
      <div className="px-6 py-8 space-y-4">
        <p className="text-black/70 mb-6">Choisissez votre type de compte :</p>
        <button
          onClick={() => handleTypeSelect('particulier')}
          className="w-full rounded-lg border-2 border-black bg-white px-6 py-4 text-left font-semibold text-black transition-opacity hover:opacity-80"
        >
          <div className="font-bold">Particulier</div>
          <div className="text-sm font-normal text-black/60 mt-1">
            Pour les utilisateurs individuels
          </div>
        </button>
        <button
          onClick={() => handleTypeSelect('createur')}
          className="w-full rounded-lg border-2 border-black bg-white px-6 py-4 text-left font-semibold text-black transition-opacity hover:opacity-80"
        >
          <div className="font-bold">Créateur</div>
          <div className="text-sm font-normal text-black/60 mt-1">
            Pour les créateurs de contenu
          </div>
        </button>
        <button
          onClick={() => handleTypeSelect('professionnel')}
          className="w-full rounded-lg border-2 border-black bg-white px-6 py-4 text-left font-semibold text-black transition-opacity hover:opacity-80"
        >
          <div className="font-bold">Professionnel</div>
          <div className="text-sm font-normal text-black/60 mt-1">
            Pour les entreprises et commerces
          </div>
        </button>
      </div>
    </div>
  );
}
