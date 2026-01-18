'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Tabs from '@/components/Tabs';
import Modal from '@/components/Modal';
import { useStore } from '@/lib/store';
import mockPosts from '@/data/mockPosts.json';
import mockUsers from '@/data/mockUsers.json';

export default function ProfilePage() {
  const router = useRouter();
  const { isAuthenticated, user } = useStore();
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
            ⚙
          </Link>
        }
      />
      
      <div className="px-6 py-8 space-y-6">
        {/* Header profil */}
        <div className="flex items-center gap-5 animate-fade-in">
          {'avatarUrl' in user && user.avatarUrl ? (
            <Image 
              src={user.avatarUrl as string} 
              alt={user.name}
              width={96}
              height={96}
              className="rounded-3xl object-cover shadow-lg"
            />
          ) : (
            <div className="text-7xl bg-gradient-to-br from-black/5 to-black/10 rounded-3xl p-4 shadow-lg">
              {user.avatar || '◯'}
            </div>
          )}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-3xl font-bold">{user.name}</h1>
              {!user.verified && (
                <span className="text-xs bg-black/10 text-black px-2 py-1 rounded-full font-medium">
                  Essentiel
                </span>
              )}
            </div>
            <p className="text-sm text-black/60 capitalize">{user.type}</p>
            {user.bio && (
              <p className="text-sm text-black/70 mt-2 leading-relaxed">{user.bio}</p>
            )}
          </div>
        </div>

        {/* Actions principales */}
        <div className="flex gap-3">
          <button className="flex-1 rounded-2xl bg-black/5 hover:bg-black/10 px-4 py-3 font-medium transition-all active:scale-95 shadow-sm">
            Modifier le profil
          </button>
          <Link
            href="/shop"
            className="flex-1 rounded-2xl bg-black text-white px-4 py-3 text-center font-medium hover-lift active:scale-95 shadow-lg"
          >
            Boutique
          </Link>
        </div>

        {/* Action messagerie */}
        <Link
          href="/messages"
          className="flex items-center justify-center gap-2 rounded-2xl bg-black/5 hover:bg-black/10 px-4 py-3 font-medium transition-all active:scale-95 shadow-sm"
        >
          <span className="text-lg">◉</span>
          <span>Messagerie</span>
        </Link>

        {/* Actions secondaires */}
        <div className="flex gap-3">
          <button
            onClick={() => setShowReport(true)}
            className="flex-1 rounded-2xl bg-black/5 hover:bg-black/10 px-4 py-2.5 text-sm font-medium transition-all active:scale-95"
          >
            Signaler
          </button>
          <button
            onClick={() => setShowBlock(true)}
            className="flex-1 rounded-2xl bg-black/5 hover:bg-black/10 px-4 py-2.5 text-sm font-medium transition-all active:scale-95"
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
              {userPosts.map((post, index) => (
                <div 
                  key={post.id} 
                  className="bg-white rounded-2xl p-5 space-y-4 shadow-lg hover-lift animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center gap-3">
                    {(() => {
                      const author = mockUsers.find(u => u.id === post.authorId) as { avatarUrl?: string } | undefined;
                      return author?.avatarUrl ? (
                        <Image 
                          src={author.avatarUrl} 
                          alt={post.authorName}
                          width={40}
                          height={40}
                          className="rounded-full object-cover"
                        />
                      ) : (
                        <div className="text-3xl">{post.authorAvatar}</div>
                      );
                    })()}
                    <div>
                      <div className="font-semibold">{post.authorName}</div>
                      <div className="text-xs text-black/60">{post.timestamp}</div>
                    </div>
                  </div>
                  {post.content && <p className="leading-relaxed">{post.content}</p>}
                  {post.image && (
                    <div className="relative h-48 rounded-xl overflow-hidden">
                      {(post as { imageUrl?: string }).imageUrl ? (
                        <Image 
                          src={(post as { imageUrl: string }).imageUrl} 
                          alt=""
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full bg-gradient-to-br from-black/5 to-black/10 text-4xl">
                          {post.image}
                        </div>
                      )}
                    </div>
                  )}
                  <div className="flex items-center gap-6 text-sm pt-2">
                    <span className="flex items-center gap-1">♥ {post.likes}</span>
                    <span className="flex items-center gap-1">◉ {post.comments}</span>
                  </div>
                </div>
              ))}
              {userPosts.length === 0 && (
                <p className="text-center text-black/60 py-8">Aucune publication</p>
              )}
            </>
          )}

          {activeTab === 'media' && (
            <div className="grid grid-cols-3 gap-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div 
                  key={i} 
                  className="aspect-square bg-gradient-to-br from-black/5 to-black/10 rounded-xl flex items-center justify-center text-2xl shadow-md hover:scale-105 transition-transform"
                >
                  ◉
                </div>
              ))}
            </div>
          )}

          {activeTab === 'friends' && (
            <div className="space-y-3">
              {['Alice', 'Bob', 'Sophie'].map((name, i) => (
                <div 
                  key={i} 
                  className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-md hover-lift transition-all"
                >
                  <div className="text-4xl bg-gradient-to-br from-black/5 to-black/10 rounded-xl p-2">
                    ◯
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold">{name}</div>
                    <div className="text-xs text-black/60">Ami(e)</div>
                  </div>
                  <button className="text-sm font-medium text-black/70 hover:text-black transition-colors">
                    Voir profil →
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
                className="w-full text-left rounded-xl bg-black/5 hover:bg-black/10 px-4 py-3 transition-all active:scale-95"
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
              className="flex-1 rounded-xl bg-black/5 hover:bg-black/10 px-4 py-3 font-medium transition-all active:scale-95"
            >
              Annuler
            </button>
            <button
              onClick={() => {
                alert('Utilisateur bloqué (Mode démo)');
                setShowBlock(false);
              }}
              className="flex-1 rounded-xl bg-black text-white px-4 py-3 font-medium hover-lift active:scale-95 shadow-lg"
            >
              Bloquer
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
