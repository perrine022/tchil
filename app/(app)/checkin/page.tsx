'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import { useStore } from '@/lib/store';
import mockPlaces from '@/data/mockPlaces.json';

export default function CheckInPage() {
  const router = useRouter();
  const { isAuthenticated, modules, checkInLimits, addCheckIn, user } = useStore();
  const [mode, setMode] = useState<'map' | 'scanner'>('map');
  const [qrCode, setQrCode] = useState('');
  const [places] = useState(mockPlaces);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  if (!modules.checkin) {
    return (
      <div className="min-h-screen bg-white pb-20">
        <Header title="Check-in" />
        <div className="flex items-center justify-center h-64 px-6">
          <p className="text-black/60 text-center">Le module Check-in est désactivé</p>
        </div>
      </div>
    );
  }

  const handleScan = () => {
    if (!qrCode.trim()) {
      alert('Veuillez entrer un code QR');
      return;
    }

    const place = places.find(p => p.qrCode === qrCode.toUpperCase());
    if (!place) {
      alert('Code QR invalide');
      return;
    }

    const success = addCheckIn();
    if (success) {
      alert(`Check-in réussi à ${place.name} !\nLimite: ${checkInLimits.daily}/3 par jour, ${checkInLimits.weekly}/10 par semaine`);
      setQrCode('');
    } else {
      if (checkInLimits.daily >= 3) {
        alert('Limite quotidienne atteinte (3/jour)');
      } else if (checkInLimits.weekly >= 10) {
        alert('Limite hebdomadaire atteinte (10/semaine)');
      }
    }
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      <Header title="Check-in" />
      
      <div className="flex border-b border-black">
        <button
          onClick={() => setMode('map')}
          className={`flex-1 px-4 py-3 text-sm font-medium ${
            mode === 'map' ? 'border-b-2 border-black' : 'text-black/60'
          }`}
        >
          Carte
        </button>
        <button
          onClick={() => setMode('scanner')}
          className={`flex-1 px-4 py-3 text-sm font-medium ${
            mode === 'scanner' ? 'border-b-2 border-black' : 'text-black/60'
          }`}
        >
          Scanner QR
        </button>
      </div>

      {mode === 'map' && (
        <div className="p-4 space-y-4">
          <div className="rounded-lg border-2 border-black p-4 bg-black/5">
            <p className="text-sm text-black/70 mb-2">
              Check-in aujourd'hui: {checkInLimits.daily}/3
            </p>
            <p className="text-sm text-black/70">
              Check-in cette semaine: {checkInLimits.weekly}/10
            </p>
          </div>

          <div className="space-y-3">
            {places.map((place) => (
              <div key={place.id} className="border-2 border-black rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold">{place.name}</h3>
                    <p className="text-sm text-black/60 mt-1">{place.address}</p>
                    <p className="text-xs text-black/60 mt-1">{place.distance}</p>
                  </div>
                  <button
                    onClick={() => {
                      setMode('scanner');
                      setQrCode(place.qrCode);
                    }}
                    className="text-sm font-medium text-black underline"
                  >
                    Voir
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {mode === 'scanner' && (
        <div className="p-6 space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-center h-64 bg-black/5 rounded-lg border-2 border-dashed border-black">
              <div className="text-center">
                <div className="text-6xl mb-4">📷</div>
                <p className="text-sm text-black/60">Scanner QR Code</p>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">
                Ou entrez le code QR manuellement
              </label>
              <input
                type="text"
                value={qrCode}
                onChange={(e) => setQrCode(e.target.value.toUpperCase())}
                placeholder="QR-TCHIL-XXX"
                className="w-full rounded-lg border-2 border-black px-4 py-3 font-mono"
              />
            </div>

            <div className="rounded-lg border-2 border-black p-4 bg-black/5">
              <p className="text-sm font-medium mb-2">Limites actuelles</p>
            <p className="text-xs text-black/70">
              Aujourd'hui: {checkInLimits.daily}/3
            </p>
            <p className="text-xs text-black/70">
              Cette semaine: {checkInLimits.weekly}/10
            </p>
          </div>

          <button
            onClick={handleScan}
            className="w-full rounded-lg border-2 border-black bg-black text-white px-6 py-4 font-semibold"
          >
            Valider le check-in
          </button>
        </div>
        </div>
      )}
    </div>
  );
}
