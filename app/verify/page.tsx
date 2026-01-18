'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import { useStore } from '@/lib/store';
import Badge from '@/components/Badge';

export default function VerifyPage() {
  const router = useRouter();
  const { user, updateVerification } = useStore();
  const [uploaded, setUploaded] = useState({
    identity: false,
    parental: false,
    kbis: false,
  });

  if (!user) {
    router.push('/');
    return null;
  }

  const handleUpload = (type: 'identity' | 'parental' | 'kbis') => {
    // Simuler upload
    setUploaded({ ...uploaded, [type]: true });
    alert('Document uploadé avec succès (Mode démo)');
  };

  const handleSubmit = () => {
    // Simuler vérification
    updateVerification(true, 'verified');
    alert('Vérification en cours... (Mode démo : approuvée automatiquement)');
    router.push('/feed');
  };

  const canSubmit = 
    (user.type === 'particulier' && uploaded.identity && (user.subType === 'adulte' || uploaded.parental)) ||
    (user.type === 'professionnel' && uploaded.identity && uploaded.kbis) ||
    (user.type === 'createur' && uploaded.identity);

  return (
    <div className="min-h-screen bg-white pb-20">
      <Header title="Vérifier mon identité" showBack={false} />
      <div className="px-6 py-8 space-y-6">
        {!user.verified && (
          <div className="rounded-lg border-2 border-black bg-black/5 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="warning">Statut Essentiel</Badge>
            </div>
            <p className="text-sm text-black/70">
              Votre compte est en mode Essentiel. Vérifiez votre identité pour accéder à toutes les fonctionnalités.
            </p>
          </div>
        )}

        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold mb-4">Documents requis</h2>
            
            {user.type === 'particulier' && (
              <>
                <div className="space-y-4">
                  <div className="border-2 border-black rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold">Pièce d'identité</span>
                      {uploaded.identity && <span className="text-sm">✓</span>}
                    </div>
                    <p className="text-sm text-black/60 mb-3">
                      CNI ou Passeport (recto/verso)
                    </p>
                    <button
                      onClick={() => handleUpload('identity')}
                      className="w-full rounded-lg border-2 border-black bg-white px-4 py-2 text-sm font-medium"
                    >
                      {uploaded.identity ? 'Document uploadé' : 'Uploader'}
                    </button>
                  </div>

                  {user.subType === 'mineur' && (
                    <div className="border-2 border-black rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold">Autorisation parentale</span>
                        {uploaded.parental && <span className="text-sm">✓</span>}
                      </div>
                      <p className="text-sm text-black/60 mb-3">
                        Autorisation parentale manuscrite numérisée
                      </p>
                      <button
                        onClick={() => handleUpload('parental')}
                        className="w-full rounded-lg border-2 border-black bg-white px-4 py-2 text-sm font-medium"
                      >
                        {uploaded.parental ? 'Document uploadé' : 'Uploader'}
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}

            {user.type === 'professionnel' && (
              <>
                <div className="space-y-4">
                  <div className="border-2 border-black rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold">KBIS</span>
                      {uploaded.kbis && <span className="text-sm">✓</span>}
                    </div>
                    <p className="text-sm text-black/60 mb-3">
                      Extrait K-Bis de moins de 3 mois
                    </p>
                    <button
                      onClick={() => handleUpload('kbis')}
                      className="w-full rounded-lg border-2 border-black bg-white px-4 py-2 text-sm font-medium"
                    >
                      {uploaded.kbis ? 'Document uploadé' : 'Uploader'}
                    </button>
                  </div>

                  <div className="border-2 border-black rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold">Pièce d'identité</span>
                      {uploaded.identity && <span className="text-sm">✓</span>}
                    </div>
                    <p className="text-sm text-black/60 mb-3">
                      CNI ou Passeport du représentant légal
                    </p>
                    <button
                      onClick={() => handleUpload('identity')}
                      className="w-full rounded-lg border-2 border-black bg-white px-4 py-2 text-sm font-medium"
                    >
                      {uploaded.identity ? 'Document uploadé' : 'Uploader'}
                    </button>
                  </div>
                </div>
              </>
            )}

            {user.type === 'createur' && (
              <div className="border-2 border-black rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">Pièce d'identité</span>
                  {uploaded.identity && <span className="text-sm">✓</span>}
                </div>
                <p className="text-sm text-black/60 mb-3">
                  CNI ou Passeport (recto/verso)
                </p>
                <button
                  onClick={() => handleUpload('identity')}
                  className="w-full rounded-lg border-2 border-black bg-white px-4 py-2 text-sm font-medium"
                >
                  {uploaded.identity ? 'Document uploadé' : 'Uploader'}
                </button>
              </div>
            )}
          </div>

          <button
            onClick={handleSubmit}
            disabled={!canSubmit}
            className="w-full rounded-lg border-2 border-black bg-black px-6 py-4 text-center font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Soumettre pour vérification
          </button>
        </div>
      </div>
    </div>
  );
}
