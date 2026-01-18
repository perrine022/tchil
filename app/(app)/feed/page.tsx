'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
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
      <div className="px-4 py-6 space-y-6">
        {posts.map((post, index) => {
          const author = mockUsers.find(u => u.id === post.authorId);
          return (
            <article 
              key={post.id} 
              className="bg-white rounded-2xl p-5 space-y-4 shadow-lg hover-lift animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center gap-3">
                {author && (author as { avatarUrl?: string }).avatarUrl ? (
                  <Image 
                    src={(author as { avatarUrl: string }).avatarUrl} 
                    alt={post.authorName}
                    width={48}
                    height={48}
                    className="rounded-full object-cover"
                  />
                ) : (
                  <div className="text-3xl">{post.authorAvatar}</div>
                )}
                <div className="flex-1">
                  <div className="font-semibold">{post.authorName}</div>
                  <div className="text-xs text-black/60">{formatTime(post.timestamp)}</div>
                </div>
                <button className="text-sm font-medium text-black/70 hover:text-black px-3 py-1.5 rounded-xl hover:bg-black/5 transition-all active:scale-95">
                  S'abonner
                </button>
              </div>
              
              {post.content && (
                <p className="text-black leading-relaxed">{post.content}</p>
              )}
              
              {post.image && (
                <div className="relative h-64 rounded-xl overflow-hidden">
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
                <button
                  onClick={() => handleLike(post.id)}
                  className="flex items-center gap-1.5 hover:opacity-70 transition-opacity active:scale-95"
                  aria-label={post.isLiked ? 'Ne plus aimer' : 'Aimer'}
                >
                  <span className={`text-lg transition-all duration-300 ${post.isLiked ? 'scale-125' : ''}`}>
                    {post.isLiked ? '♥' : '○'}
                  </span>
                  <span className="font-medium">{post.likes}</span>
                </button>
                <button 
                  className="flex items-center gap-1.5 hover:opacity-70 transition-opacity active:scale-95" 
                  aria-label="Commenter"
                >
                  <span className="text-lg">◉</span>
                  <span className="font-medium">{post.comments}</span>
                </button>
                <button 
                  className="flex items-center gap-1.5 hover:opacity-70 transition-opacity active:scale-95" 
                  aria-label="Partager"
                >
                  <span className="text-lg transition-transform hover:translate-x-1">→</span>
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
