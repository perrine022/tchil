'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import { useStore } from '@/lib/store';
import Modal from '@/components/Modal';

export default function SettingsPage() {
  const { user, modules, toggleModule, logout, updateVerification } = useStore();
  const [showModuleSwitcher, setShowModuleSwitcher] = useState(false);
  const [showDemoMode, setShowDemoMode] = useState(false);
  const [demoAccount, setDemoAccount] = useState<'particulier' | 'createur' | 'professionnel'>('particulier');
  const [demoVerified, setDemoVerified] = useState(true);

  const handleDemoSwitch = () => {
    // Simuler changement de compte
    alert(`Mode démo: ${demoAccount} ${demoVerified ? 'vérifié' : 'non vérifié'}`);
    updateVerification(demoVerified, demoVerified ? 'verified' : 'pending');
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      <Header title="Paramètres" showBack />
      
      <div className="px-6 py-8 space-y-6">
        <div>
          <h2 className="text-lg font-semibold mb-4">Modules</h2>
          <button
            onClick={() => setShowModuleSwitcher(true)}
            className="w-full rounded-lg border-2 border-black bg-white px-4 py-3 text-left"
          >
            Gérer les modules
          </button>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4">Mode Démo</h2>
          <button
            onClick={() => setShowDemoMode(true)}
            className="w-full rounded-lg border-2 border-black bg-white px-4 py-3 text-left"
          >
            Changer de compte démo
          </button>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4">Compte</h2>
          <div className="space-y-2">
            <div className="rounded-lg border-2 border-black p-4">
              <div className="text-sm text-black/60">Type de compte</div>
              <div className="font-semibold">{user?.type}</div>
            </div>
            <div className="rounded-lg border-2 border-black p-4">
              <div className="text-sm text-black/60">Plan</div>
              <div className="font-semibold">{user?.plan}</div>
            </div>
            <Link
              href="/subscriptions"
              className="block w-full rounded-lg border-2 border-black bg-white px-4 py-3 text-center font-medium"
            >
              Gérer l'abonnement
            </Link>
          </div>
        </div>

        <button
          onClick={() => {
            if (confirm('Déconnexion ?')) {
              logout();
            }
          }}
          className="w-full rounded-lg border-2 border-black bg-white px-4 py-3 font-medium text-red-600"
        >
          Se déconnecter
        </button>
      </div>

      <Modal
        isOpen={showModuleSwitcher}
        onClose={() => setShowModuleSwitcher(false)}
        title="Gérer les modules"
      >
        <div className="space-y-4">
          {Object.entries(modules).map(([key, enabled]) => (
            <label key={key} className="flex items-center justify-between cursor-pointer">
              <span className="font-medium capitalize">{key}</span>
              <button
                onClick={() => toggleModule(key as keyof typeof modules)}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  enabled ? 'bg-black' : 'bg-black/20'
                }`}
              >
                <span
                  className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    enabled ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </label>
          ))}
        </div>
      </Modal>

      <Modal
        isOpen={showDemoMode}
        onClose={() => setShowDemoMode(false)}
        title="Mode Démo"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Type de compte</label>
            <select
              value={demoAccount}
              onChange={(e) => setDemoAccount(e.target.value as any)}
              className="w-full rounded-lg border-2 border-black px-4 py-2"
            >
              <option value="particulier">Particulier</option>
              <option value="createur">Créateur</option>
              <option value="professionnel">Professionnel</option>
            </select>
          </div>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={demoVerified}
              onChange={(e) => setDemoVerified(e.target.checked)}
              className="w-5 h-5 border-2 border-black"
            />
            <span>Compte vérifié</span>
          </label>
          <button
            onClick={handleDemoSwitch}
            className="w-full rounded-lg border-2 border-black bg-black text-white px-4 py-3 font-medium"
          >
            Appliquer
          </button>
        </div>
      </Modal>
    </div>
  );
}
