'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import { useStore } from '@/lib/store';
import mockUsers from '@/data/mockUsers.json';

export default function DatingPage() {
  const router = useRouter();
  const { isAuthenticated, modules, user } = useStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [filters, setFilters] = useState({ distance: 50, ageMin: 18, ageMax: 99 });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  // Filtrer les utilisateurs (exclure soi-même et selon filtres)
  const availableUsers = mockUsers.filter(u => 
    u.id !== user?.id && 
    u.age! >= filters.ageMin && 
    u.age! <= filters.ageMax
  );

  const currentUser = availableUsers[currentIndex];

  if (!modules.dating) {
    return (
      <div className="min-h-screen bg-white pb-20">
        <Header title="Rencontres" />
        <div className="flex items-center justify-center h-64 px-6">
          <p className="text-black/60 text-center">Le module Rencontres est désactivé</p>
        </div>
      </div>
    );
  }

  const handleDragStart = (e: React.TouchEvent | React.MouseEvent) => {
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    setStartPos({ x: clientX, y: clientY });
  };

  const handleDrag = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
    setPosition({
      x: clientX - startPos.x,
      y: clientY - startPos.y,
    });
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    const threshold = 100;
    if (Math.abs(position.x) > threshold) {
      // Swipe détecté
      if (position.x > 0) {
        handleLike();
      } else {
        handlePass();
      }
    }
    setPosition({ x: 0, y: 0 });
  };

  const handleLike = () => {
    if (currentIndex < availableUsers.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Plus de profils
      alert('Plus de profils disponibles ! Modifiez vos filtres.');
    }
  };

  const handlePass = () => {
    if (currentIndex < availableUsers.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      alert('Plus de profils disponibles ! Modifiez vos filtres.');
    }
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-white pb-20">
        <Header 
          title="Rencontres" 
          rightAction={
            <button onClick={() => setShowFilters(!showFilters)} className="text-xl">
              ⚙️
            </button>
          }
        />
        <div className="flex items-center justify-center h-64 px-6">
          <p className="text-black/60 text-center">Aucun profil disponible</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-20">
      <Header 
        title="Rencontres" 
        rightAction={
          <button onClick={() => setShowFilters(!showFilters)} className="text-xl">
            ⚙️
          </button>
        }
      />
      
      {showFilters && (
        <div className="border-b border-black p-4 space-y-4 bg-white">
          <div>
            <label className="block text-sm font-medium mb-2">
              Distance max: {filters.distance} km
            </label>
            <input
              type="range"
              min="1"
              max="100"
              value={filters.distance}
              onChange={(e) => setFilters({ ...filters, distance: parseInt(e.target.value) })}
              className="w-full"
            />
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2">Âge min</label>
              <input
                type="number"
                min="18"
                max="99"
                value={filters.ageMin}
                onChange={(e) => setFilters({ ...filters, ageMin: parseInt(e.target.value) })}
                className="w-full rounded-lg border-2 border-black px-3 py-2"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2">Âge max</label>
              <input
                type="number"
                min="18"
                max="99"
                value={filters.ageMax}
                onChange={(e) => setFilters({ ...filters, ageMax: parseInt(e.target.value) })}
                className="w-full rounded-lg border-2 border-black px-3 py-2"
              />
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-center min-h-[calc(100vh-200px)] p-4">
        <div
          className="relative w-full max-w-sm"
          style={{
            transform: `translate(${position.x}px, ${position.y}px) rotate(${position.x * 0.1}deg)`,
            transition: isDragging ? 'none' : 'transform 0.3s',
          }}
          onTouchStart={handleDragStart}
          onTouchMove={handleDrag}
          onTouchEnd={handleDragEnd}
          onMouseDown={handleDragStart}
          onMouseMove={handleDrag}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
        >
          <div className="border-2 border-black rounded-lg bg-white p-6 space-y-4">
            <div className="flex items-center justify-center h-64 bg-black/5 rounded-lg text-8xl">
              {currentUser.avatar}
            </div>
            <div>
              <h2 className="text-2xl font-bold">{currentUser.name}, {currentUser.age}</h2>
              <p className="text-black/60">{currentUser.location}</p>
              <p className="text-sm text-black/60 mt-1">{currentUser.distance}</p>
            </div>
            {currentUser.bio && (
              <p className="text-black/70">{currentUser.bio}</p>
            )}
          </div>
        </div>
      </div>

      <div className="fixed bottom-20 left-0 right-0 flex items-center justify-center gap-6 p-4 md:left-1/2 md:right-auto md:-translate-x-1/2 md:max-w-[420px]">
        <button
          onClick={handlePass}
          className="flex items-center justify-center w-16 h-16 rounded-full border-2 border-black bg-white text-2xl"
          aria-label="Passer"
        >
          ✕
        </button>
        <button
          onClick={handleLike}
          className="flex items-center justify-center w-16 h-16 rounded-full border-2 border-black bg-black text-white text-2xl"
          aria-label="Aimer"
        >
          ❤️
        </button>
      </div>
    </div>
  );
}
