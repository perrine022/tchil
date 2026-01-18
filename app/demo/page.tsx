'use client';

import { useRouter } from 'next/navigation';
import { useStore } from '@/lib/store';
import mockUsers from '@/data/mockUsers.json';

export default function DemoPage() {
  const router = useRouter();
  const { login } = useStore();

  const handleSelectDemo = (userIndex: number) => {
    const demoUser = mockUsers[userIndex];
    login({
      id: demoUser.id,
      name: demoUser.name,
      email: demoUser.email,
      type: demoUser.type as any,
      subType: demoUser.subType as any,
      verified: demoUser.verified,
      verificationStatus: demoUser.verificationStatus as any,
      plan: demoUser.plan as any,
    });
    router.push('/feed');
  };

  return (
    <div className="min-h-screen bg-white px-6 py-12">
      <div className="max-w-md mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Mode Démo</h1>
          <p className="text-black/70">
            Choisissez un compte de démonstration pour explorer l'application
          </p>
        </div>

        <div className="space-y-4">
          {mockUsers.map((user, index) => (
            <button
              key={user.id}
              onClick={() => handleSelectDemo(index)}
              className="w-full text-left border-2 border-black rounded-lg p-4 hover:bg-black/5 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="text-4xl">{user.avatar}</div>
                <div className="flex-1">
                  <div className="font-semibold text-lg">{user.name}</div>
                  <div className="text-sm text-black/60 capitalize">{user.type}</div>
                  <div className="text-xs text-black/60 mt-1">
                    {user.verified ? '✓ Vérifié' : '✗ Non vérifié'} • Plan: {user.plan}
                  </div>
                </div>
                <div className="text-xl">→</div>
              </div>
            </button>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={() => router.push('/')}
            className="text-sm text-black/60 underline"
          >
            Retour à l'accueil
          </button>
        </div>
      </div>
    </div>
  );
}
