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
        <div className="px-4 py-6 space-y-6">
          {/* Stats élégantes */}
          <div className="flex items-center gap-4 bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex-1">
              <p className="text-xs text-black/50 mb-1">Aujourd'hui</p>
              <p className="text-lg font-semibold">
                {checkInLimits.daily}/3
              </p>
            </div>
            <div className="w-px h-8 bg-black/10" />
            <div className="flex-1">
              <p className="text-xs text-black/50 mb-1">Cette semaine</p>
              <p className="text-lg font-semibold">
                {checkInLimits.weekly}/10
              </p>
            </div>
          </div>

          {/* Liste des lieux */}
          <div className="space-y-3">
            {places.map((place, index) => (
              <div 
                key={place.id} 
                className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-all active:scale-[0.98] animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-base mb-1">{place.name}</h3>
                    <p className="text-sm text-black/60 leading-relaxed">{place.address}</p>
                    <p className="text-xs text-black/50 mt-1.5">{place.distance}</p>
                  </div>
                  <button
                    onClick={() => {
                      setMode('scanner');
                      setQrCode(place.qrCode);
                    }}
                    className="text-sm font-medium text-black/70 hover:text-black px-3 py-1.5 rounded-xl hover:bg-black/5 transition-all active:scale-95 flex-shrink-0"
                  >
                    Scanner →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {mode === 'scanner' && (
        <div className="px-6 py-6 space-y-6">
          {/* Zone de scan */}
          <div className="relative flex items-center justify-center h-64 bg-gradient-to-br from-black/5 to-black/10 rounded-2xl overflow-hidden">
            <div className="absolute inset-0 border-2 border-dashed border-black/20 rounded-2xl m-4" />
            <div className="text-center z-10">
              <div className="text-6xl mb-3 opacity-50">◉</div>
              <p className="text-sm text-black/60 font-medium">Scanner QR Code</p>
            </div>
          </div>
          
          {/* Input manuel */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-black/70">
              Ou entrez le code QR manuellement
            </label>
            <input
              type="text"
              value={qrCode}
              onChange={(e) => setQrCode(e.target.value.toUpperCase())}
              placeholder="QR-TCHIL-XXX"
              className="w-full rounded-xl bg-black/5 px-4 py-3 font-mono focus:outline-none focus:ring-2 focus:ring-black/20 transition-all"
            />
          </div>

          {/* Stats limites */}
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <p className="text-sm font-medium mb-3 text-black/80">Limites actuelles</p>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <p className="text-xs text-black/50 mb-1">Aujourd'hui</p>
                <p className="text-base font-semibold">
                  {checkInLimits.daily}/3
                </p>
              </div>
              <div className="w-px h-8 bg-black/10" />
              <div className="flex-1">
                <p className="text-xs text-black/50 mb-1">Cette semaine</p>
                <p className="text-base font-semibold">
                  {checkInLimits.weekly}/10
                </p>
              </div>
            </div>
          </div>

          {/* Bouton validation */}
          <button
            onClick={handleScan}
            className="w-full rounded-2xl bg-black text-white px-6 py-4 font-semibold hover-lift active:scale-95 shadow-xl transition-all"
          >
            Valider le check-in
          </button>
        </div>
      )}
    </div>
  );
}
