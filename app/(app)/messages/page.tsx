'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
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
        <div className="mx-4 mt-4 rounded-lg border-2 border-black bg-black/5 p-4">
          <p className="text-sm text-black/70">{limitedMessage}</p>
        </div>
      )}

      <div className="divide-y divide-black/10">
        {conversations.map((conv) => (
          <Link key={conv.id} href={`/messages/${conv.id}`}>
            <div className="p-4 flex items-center gap-4">
              <div className="text-4xl">{conv.userAvatar}</div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold">{conv.userName}</h3>
                  <span className="text-xs text-black/60">{formatTime(conv.timestamp)}</span>
                </div>
                <p className="text-sm text-black/60 line-clamp-1">{conv.lastMessage}</p>
              </div>
              {conv.unread > 0 && (
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-black text-xs font-bold text-white">
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
