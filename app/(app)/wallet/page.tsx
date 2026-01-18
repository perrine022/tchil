'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import { useStore } from '@/lib/store';

export default function WalletPage() {
  const router = useRouter();
  const { isAuthenticated, tchilCoins, updateTchilCoins } = useStore();
  const [showBalance, setShowBalance] = useState(true);
  const [activeTab, setActiveTab] = useState<'history' | 'earnings' | 'spending' | 'convert'>('history');

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  const mockTransactions = [
    { id: '1', type: 'earn', amount: 50, description: 'Parrainage utilisateur', date: '2024-01-15' },
    { id: '2', type: 'earn', amount: 10, description: 'Check-in QR', date: '2024-01-14' },
    { id: '3', type: 'spend', amount: -25, description: 'Achat contenu premium', date: '2024-01-13' },
    { id: '4', type: 'earn', amount: 5, description: 'Abonnement reçu', date: '2024-01-12' },
  ];

  return (
    <div className="min-h-screen bg-white pb-20">
      <Header title="TchilCoins" showBack />
      
      <div className="px-6 py-8 space-y-6">
        <div className="border-2 border-black rounded-lg p-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-sm text-black/60">Solde</span>
            <button
              onClick={() => setShowBalance(!showBalance)}
              className="text-xl"
              aria-label="Afficher/Masquer le solde"
            >
              {showBalance ? '◉' : '○'}
            </button>
          </div>
          <div className="text-4xl font-bold">
            {showBalance ? `${tchilCoins} TchilCoins` : '••••'}
          </div>
        </div>

        <div className="flex gap-2 border-b border-black">
          <button
            onClick={() => setActiveTab('history')}
            className={`flex-1 px-4 py-3 text-sm font-medium ${
              activeTab === 'history' ? 'border-b-2 border-black' : 'text-black/60'
            }`}
          >
            Historique
          </button>
          <button
            onClick={() => setActiveTab('earnings')}
            className={`flex-1 px-4 py-3 text-sm font-medium ${
              activeTab === 'earnings' ? 'border-b-2 border-black' : 'text-black/60'
            }`}
          >
            Gains
          </button>
          <button
            onClick={() => setActiveTab('spending')}
            className={`flex-1 px-4 py-3 text-sm font-medium ${
              activeTab === 'spending' ? 'border-b-2 border-black' : 'text-black/60'
            }`}
          >
            Dépenses
          </button>
          <button
            onClick={() => setActiveTab('convert')}
            className={`flex-1 px-4 py-3 text-sm font-medium ${
              activeTab === 'convert' ? 'border-b-2 border-black' : 'text-black/60'
            }`}
          >
            Conversion
          </button>
        </div>

        <div className="space-y-4">
          {activeTab === 'history' && (
            <>
              {mockTransactions.map((tx) => (
                <div key={tx.id} className="flex items-center justify-between border-2 border-black rounded-lg p-4">
                  <div>
                    <div className="font-medium">{tx.description}</div>
                    <div className="text-sm text-black/60">{tx.date}</div>
                  </div>
                  <div className={`font-semibold ${tx.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {tx.amount > 0 ? '+' : ''}{tx.amount} TC
                  </div>
                </div>
              ))}
            </>
          )}

          {activeTab === 'earnings' && (
            <div className="space-y-4">
              <div className="border-2 border-black rounded-lg p-4">
                <h3 className="font-semibold mb-2">Parrainage</h3>
                <p className="text-sm text-black/60">Gains illimités par parrainage</p>
                <p className="text-sm font-medium mt-2">+50 TC par utilisateur parrainé</p>
              </div>
              <div className="border-2 border-black rounded-lg p-4">
                <h3 className="font-semibold mb-2">Check-in QR</h3>
                <p className="text-sm text-black/60">Gains par check-in validé</p>
                <p className="text-sm font-medium mt-2">+10 TC par check-in</p>
              </div>
              <div className="border-2 border-black rounded-lg p-4">
                <h3 className="font-semibold mb-2">Abonnements</h3>
                <p className="text-sm text-black/60">Gains lorsque quelqu'un s'abonne à votre contenu</p>
                <p className="text-sm font-medium mt-2">+5 TC par abonnement</p>
              </div>
            </div>
          )}

          {activeTab === 'spending' && (
            <div className="space-y-4">
              <div className="border-2 border-black rounded-lg p-4">
                <h3 className="font-semibold mb-2">Achat de contenus</h3>
                <p className="text-sm text-black/60">Débloquer des contenus premium</p>
              </div>
              <div className="border-2 border-black rounded-lg p-4">
                <h3 className="font-semibold mb-2">Abonnements</h3>
                <p className="text-sm text-black/60">S'abonner à des créateurs</p>
              </div>
              <div className="border-2 border-black rounded-lg p-4">
                <h3 className="font-semibold mb-2">Boutique</h3>
                <p className="text-sm text-black/60">Acheter des produits</p>
              </div>
            </div>
          )}

          {activeTab === 'convert' && (
            <div className="space-y-4">
              <div className="border-2 border-black rounded-lg p-4">
                <h3 className="font-semibold mb-2">Conversion créateurs/pro</h3>
                <p className="text-sm text-black/60 mb-4">
                  Convertir vos TchilCoins en euros (uniquement pour créateurs et professionnels)
                </p>
                <div className="space-y-2">
                  <input
                    type="number"
                    placeholder="Montant en TchilCoins"
                    className="w-full rounded-lg border-2 border-black px-4 py-2"
                  />
                  <button
                    onClick={() => alert('Conversion demandée ! (Mode démo)')}
                    className="w-full rounded-lg border-2 border-black bg-black text-white px-4 py-2 font-medium"
                  >
                    Demander la conversion
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
