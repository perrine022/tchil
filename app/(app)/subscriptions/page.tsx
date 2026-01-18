'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Badge from '@/components/Badge';
import { useStore, PlanType } from '@/lib/store';

export default function SubscriptionsPage() {
  const router = useRouter();
  const { isAuthenticated, user, updatePlan } = useStore();
  const [selectedPlan, setSelectedPlan] = useState<PlanType | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  const particulierPlans = [
    {
      id: 'essentiel' as PlanType,
      name: 'Essentiel',
      price: 0,
      features: ['Accès limité', 'Messagerie limitée aux matchs', '3 check-ins/jour', '10 check-ins/semaine'],
    },
    {
      id: 'basic' as PlanType,
      name: 'Basic',
      price: 4.99,
      features: ['Accès complet', 'Messagerie limitée aux matchs', 'Check-in illimité', 'Filtres de base'],
    },
    {
      id: 'gold' as PlanType,
      name: 'Gold',
      price: 9.99,
      features: ['Tout Basic', 'Messagerie illimitée', 'Filtres avancés', 'Badge Gold'],
    },
    {
      id: 'infinity' as PlanType,
      name: 'Infinity',
      price: 14.99,
      features: ['Tout Gold', 'Fonctionnalités premium', 'Support prioritaire', 'Badge Infinity'],
    },
  ];

  const proPlans = [
    {
      id: 'pro' as PlanType,
      name: 'Pro',
      price: 39.99,
      features: ['Tout pour les professionnels', 'Statistiques avancées', 'Promotion de votre activité'],
    },
    {
      id: 'pro-plus' as PlanType,
      name: 'Pro+',
      price: 49.99,
      features: ['Tout Pro', 'Borne QR incluse', 'Support dédié', 'Badge Pro+'],
    },
  ];

  const handleSelectPlan = (plan: PlanType) => {
    setSelectedPlan(plan);
    updatePlan(plan);
    alert(`Plan ${plan} sélectionné ! (Mode démo)`);
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      <Header title="Abonnements" showBack />
      
      <div className="px-6 py-8 space-y-8">
        <div className="rounded-lg border-2 border-black p-4 bg-black/5">
          <div className="font-semibold mb-2">Plan actuel</div>
          <div className="text-2xl font-bold">{user?.plan || 'Aucun'}</div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Plans Particuliers</h2>
          <div className="space-y-4">
            {particulierPlans.map((plan) => (
              <div
                key={plan.id}
                className={`border-2 rounded-lg p-4 ${
                  user?.plan === plan.id ? 'border-black bg-black/5' : 'border-black'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-semibold">{plan.name}</h3>
                    <div className="text-2xl font-bold">{plan.price.toFixed(2)} €<span className="text-sm font-normal">/mois</span></div>
                  </div>
                  {user?.plan === plan.id && <Badge>Actuel</Badge>}
                </div>
                <ul className="space-y-2 mb-4">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="text-sm text-black/70 flex items-start gap-2">
                      <span>•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handleSelectPlan(plan.id)}
                  disabled={user?.plan === plan.id}
                  className={`w-full rounded-lg border-2 border-black px-4 py-2 font-medium ${
                    user?.plan === plan.id
                      ? 'bg-black/20 cursor-not-allowed'
                      : 'bg-black text-white hover:opacity-90'
                  }`}
                >
                  {user?.plan === plan.id ? 'Plan actuel' : 'Sélectionner'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {(user?.type === 'professionnel' || user?.type === 'createur') && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Plans Professionnels</h2>
            <div className="space-y-4">
              {proPlans.map((plan) => (
                <div
                  key={plan.id}
                  className={`border-2 rounded-lg p-4 ${
                    user?.plan === plan.id ? 'border-black bg-black/5' : 'border-black'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-semibold">{plan.name}</h3>
                      <div className="text-2xl font-bold">{plan.price.toFixed(2)} €<span className="text-sm font-normal">/mois</span></div>
                    </div>
                    {user?.plan === plan.id && <Badge>Actuel</Badge>}
                  </div>
                  <ul className="space-y-2 mb-4">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="text-sm text-black/70 flex items-start gap-2">
                        <span>•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => handleSelectPlan(plan.id)}
                    disabled={user?.plan === plan.id}
                    className={`w-full rounded-lg border-2 border-black px-4 py-2 font-medium ${
                      user?.plan === plan.id
                        ? 'bg-black/20 cursor-not-allowed'
                        : 'bg-black text-white hover:opacity-90'
                    }`}
                  >
                    {user?.plan === plan.id ? 'Plan actuel' : 'Sélectionner'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
