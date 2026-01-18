'use client';

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Badge from '@/components/Badge';
import Tabs from '@/components/Tabs';
import Modal from '@/components/Modal';
import { useStore } from '@/lib/store';
import mockPosts from '@/data/mockPosts.json';

export default function ProfilePage() {
  const router = useRouter();
  const { isAuthenticated, user, logout, modules } = useStore();
  const [activeTab, setActiveTab] = useState('posts');
  const [userPosts] = useState(mockPosts.slice(0, 3));
  const [showReport, setShowReport] = useState(false);
  const [showBlock, setShowBlock] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-white pb-20">
      <Header 
        title="Profil" 
        rightAction={
          <Link href="/profile/settings" className="text-xl">
            ⚙️
          </Link>
        }
      />
      
      <div className="px-6 py-8 space-y-6">
        <div className="flex items-center gap-4">
          <div className="text-6xl">{user.avatar || '👤'}</div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl font-bold">{user.name}</h1>
              {!user.verified && (
                <Badge variant="warning">Essentiel</Badge>
              )}
            </div>
            <p className="text-sm text-black/60">{user.type}</p>
            {user.bio && (
              <p className="text-sm text-black/70 mt-2">{user.bio}</p>
            )}
          </div>
        </div>

        <div className="flex gap-4">
          <button className="flex-1 rounded-lg border-2 border-black bg-white px-4 py-2 font-medium">
            Modifier le profil
          </button>
          <Link
            href="/shop"
            className="flex-1 rounded-lg border-2 border-black bg-black text-white px-4 py-2 text-center font-medium"
          >
            Boutique
          </Link>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setShowReport(true)}
            className="flex-1 rounded-lg border-2 border-black bg-white px-4 py-2 text-sm font-medium"
          >
            Signaler
          </button>
          <button
            onClick={() => setShowBlock(true)}
            className="flex-1 rounded-lg border-2 border-black bg-white px-4 py-2 text-sm font-medium"
          >
            Bloquer
          </button>
        </div>

        <Tabs
          tabs={[
            { id: 'posts', label: 'Publications' },
            { id: 'media', label: 'Médias' },
            { id: 'friends', label: 'Amis' },
          ]}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        <div className="space-y-4">
          {activeTab === 'posts' && (
            <>
              {userPosts.map((post) => (
                <div key={post.id} className="border-2 border-black rounded-lg p-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{post.authorAvatar}</div>
                    <div>
                      <div className="font-semibold">{post.authorName}</div>
                      <div className="text-xs text-black/60">{post.timestamp}</div>
                    </div>
                  </div>
                  {post.content && <p>{post.content}</p>}
                  {post.image && (
                    <div className="flex items-center justify-center h-48 bg-black/5 rounded-lg text-4xl">
                      {post.image}
                    </div>
                  )}
                  <div className="flex items-center gap-4 text-sm">
                    <span>❤️ {post.likes}</span>
                    <span>💬 {post.comments}</span>
                  </div>
                </div>
              ))}
              {userPosts.length === 0 && (
                <p className="text-center text-black/60 py-8">Aucune publication</p>
              )}
            </>
          )}

          {activeTab === 'media' && (
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="aspect-square bg-black/5 rounded-lg flex items-center justify-center text-2xl">
                  📷
                </div>
              ))}
            </div>
          )}

          {activeTab === 'friends' && (
            <div className="space-y-3">
              {['Alice', 'Bob', 'Sophie'].map((name, i) => (
                <div key={i} className="flex items-center gap-3 p-3 border-2 border-black rounded-lg">
                  <div className="text-3xl">👤</div>
                  <div className="flex-1">
                    <div className="font-semibold">{name}</div>
                    <div className="text-xs text-black/60">Ami(e)</div>
                  </div>
                  <button className="text-sm font-medium text-black underline">
                    Voir profil
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Modal
        isOpen={showReport}
        onClose={() => setShowReport(false)}
        title="Signaler"
      >
        <div className="space-y-4">
          <p className="text-sm text-black/70">
            Sélectionnez le motif de signalement :
          </p>
          <div className="space-y-2">
            {['Contenu inapproprié', 'Harcèlement', 'Spam', 'Faux compte', 'Autre'].map((reason) => (
              <button
                key={reason}
                onClick={() => {
                  alert(`Signalement envoyé : ${reason} (Mode démo)`);
                  setShowReport(false);
                }}
                className="w-full text-left rounded-lg border-2 border-black px-4 py-2 hover:bg-black/5"
              >
                {reason}
              </button>
            ))}
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={showBlock}
        onClose={() => setShowBlock(false)}
        title="Bloquer l'utilisateur"
      >
        <div className="space-y-4">
          <p className="text-sm text-black/70">
            Êtes-vous sûr de vouloir bloquer cet utilisateur ? Vous ne pourrez plus voir ses contenus ni recevoir de messages.
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => setShowBlock(false)}
              className="flex-1 rounded-lg border-2 border-black bg-white px-4 py-2 font-medium"
            >
              Annuler
            </button>
            <button
              onClick={() => {
                alert('Utilisateur bloqué (Mode démo)');
                setShowBlock(false);
              }}
              className="flex-1 rounded-lg border-2 border-black bg-black text-white px-4 py-2 font-medium"
            >
              Bloquer
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
