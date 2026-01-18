'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import { useStore } from '@/lib/store';
import mockMessages from '@/data/mockMessages.json';

export default function MessagesPage() {
  const router = useRouter();
  const { isAuthenticated, modules, user } = useStore();
  const [conversations] = useState(mockMessages);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  if (!modules.messages) {
    return (
      <div className="min-h-screen bg-white pb-20">
        <Header title="Messages" />
        <div className="flex items-center justify-center h-64 px-6">
          <p className="text-black/60 text-center">Le module Messages est désactivé</p>
        </div>
      </div>
    );
  }

  // Vérifier les limitations selon le plan
  const isLimited = user?.plan === 'essentiel' || user?.plan === 'basic';
  const limitedMessage = isLimited 
    ? "La messagerie est limitée aux matchs sur le plan Basic. Passez à Gold pour une messagerie illimitée."
    : null;

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (hours < 1) return 'Il y a quelques minutes';
    if (hours < 24) return `Il y a ${hours}h`;
    const days = Math.floor(hours / 24);
    return `Il y a ${days}j`;
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      <Header title="Messages" />
      
      {limitedMessage && (
        <div className="mx-4 mt-4 rounded-2xl bg-black/5 p-4 shadow-sm">
          <p className="text-sm text-black/70">{limitedMessage}</p>
        </div>
      )}

      <div className="px-4 py-2 space-y-2">
        {conversations.map((conv, index) => (
          <Link 
            key={conv.id} 
            href={`/messages/${conv.id}`}
            className="block animate-fade-in"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <div className="p-4 flex items-center gap-4 bg-white rounded-2xl shadow-md hover-lift active:scale-[0.98] transition-all">
              {(conv as { userAvatarUrl?: string }).userAvatarUrl ? (
                <Image 
                  src={(conv as { userAvatarUrl: string }).userAvatarUrl} 
                  alt={conv.userName}
                  width={56}
                  height={56}
                  className="rounded-2xl object-cover"
                />
              ) : (
                <div className="text-5xl bg-gradient-to-br from-black/5 to-black/10 rounded-2xl p-2">
                  {conv.userAvatar}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold truncate">{conv.userName}</h3>
                  <span className="text-xs text-black/60 ml-2 flex-shrink-0">{formatTime(conv.timestamp)}</span>
                </div>
                <p className="text-sm text-black/60 line-clamp-1">{conv.lastMessage}</p>
              </div>
              {conv.unread > 0 && (
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-black text-xs font-bold text-white shadow-lg flex-shrink-0 animate-scale-in">
                  {conv.unread}
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>

      {conversations.length === 0 && (
        <div className="flex items-center justify-center h-64 px-6">
          <p className="text-black/60 text-center">Aucune conversation</p>
        </div>
      )}
    </div>
  );
}
