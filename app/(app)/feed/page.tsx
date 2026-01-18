'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Tabs from '@/components/Tabs';
import { useStore } from '@/lib/store';
import mockPosts from '@/data/mockPosts.json';
import mockUsers from '@/data/mockUsers.json';

export default function FeedPage() {
  const router = useRouter();
  const { isAuthenticated, modules } = useStore();
  const [activeTab, setActiveTab] = useState('foryou');
  const [posts, setPosts] = useState(mockPosts);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  if (!modules.feed) {
    return (
      <div className="min-h-screen bg-white pb-20">
        <Header title="Fil" />
        <div className="flex items-center justify-center h-64 px-6">
          <p className="text-black/60 text-center">Le module Fil est désactivé</p>
        </div>
      </div>
    );
  }

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

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
      <Header title="Fil" />
      <Tabs
        tabs={[
          { id: 'foryou', label: 'Pour toi' },
          { id: 'following', label: 'Abonnements' },
        ]}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      <div className="divide-y divide-black/10">
        {posts.map((post) => {
          const author = mockUsers.find(u => u.id === post.authorId);
          return (
            <article key={post.id} className="p-4 space-y-3">
              <div className="flex items-center gap-3">
                <div className="text-3xl">{post.authorAvatar}</div>
                <div className="flex-1">
                  <div className="font-semibold">{post.authorName}</div>
                  <div className="text-xs text-black/60">{formatTime(post.timestamp)}</div>
                </div>
                <button className="text-sm font-semibold text-black">S'abonner</button>
              </div>
              
              {post.content && (
                <p className="text-black">{post.content}</p>
              )}
              
              {post.image && (
                <div className="flex items-center justify-center h-64 bg-black/5 rounded-lg text-6xl">
                  {post.image}
                </div>
              )}
              
              <div className="flex items-center gap-6 pt-2">
                <button
                  onClick={() => handleLike(post.id)}
                  className="flex items-center gap-2"
                  aria-label={post.isLiked ? 'Ne plus aimer' : 'Aimer'}
                >
                  <span className="text-xl">{post.isLiked ? '❤️' : '🤍'}</span>
                  <span className="text-sm">{post.likes}</span>
                </button>
                <button className="flex items-center gap-2" aria-label="Commenter">
                  <span className="text-xl">💬</span>
                  <span className="text-sm">{post.comments}</span>
                </button>
                <button className="flex items-center gap-2" aria-label="Partager">
                  <span className="text-xl">📤</span>
                </button>
              </div>
            </article>
          );
        })}
      </div>
      
      {posts.length === 0 && (
        <div className="flex items-center justify-center h-64 px-6">
          <p className="text-black/60 text-center">Aucune publication pour le moment</p>
        </div>
      )}
    </div>
  );
}
