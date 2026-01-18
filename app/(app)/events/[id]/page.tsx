'use client';

import { use } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Header from '@/components/Header';
import mockEvents from '@/data/mockEvents.json';

export default function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const event = mockEvents.find(e => e.id === id);

  if (!event) {
    return (
      <div className="min-h-screen bg-white pb-20">
        <Header title="Événement" showBack />
        <div className="flex items-center justify-center h-64 px-6">
          <p className="text-black/60 text-center">Événement introuvable</p>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      <Header title="Événement" showBack />
      
      {/* Hero image en couleur */}
      {(event as { imageUrl?: string }).imageUrl ? (
        <div className="relative h-64 overflow-hidden">
          <Image 
            src={(event as { imageUrl: string }).imageUrl} 
            alt={event.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </div>
      ) : (
        <div className="relative h-48 bg-gradient-to-br from-black/5 to-black/10 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-9xl opacity-10">{event.image}</div>
          </div>
        </div>
      )}
      
      <div className="px-6 py-6 space-y-6">
        {/* Header */}
        <div className="space-y-1">
          <h1 className="text-3xl font-bold leading-tight">{event.title}</h1>
          <p className="text-sm text-black/50 font-medium">{formatDate(event.date)}</p>
        </div>
        
        {/* Infos principales */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-black/70">
            <span className="text-xs">○</span>
            <span>{event.location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-black/70">
            <span className="text-xs">◯</span>
            <span>Organisé par {event.organizerName}</span>
          </div>
          <div className="pt-2">
            <span className="text-xs text-black/50">
              {event.participants}/{event.maxParticipants} participants
            </span>
          </div>
        </div>
        
        {/* Description */}
        <div className="pt-4 border-t border-black/5">
          <h2 className="text-sm font-semibold mb-3 text-black/80 uppercase tracking-wide">Description</h2>
          <p className="text-black/70 leading-relaxed">{event.description}</p>
        </div>

        {/* CTA */}
        <div className="pt-4">
          <button
            onClick={() => {
              alert('Participation enregistrée !');
              router.back();
            }}
            className="w-full rounded-2xl bg-black text-white px-6 py-4 font-semibold hover-lift active:scale-95 shadow-xl transition-all"
          >
            Je participe
          </button>
        </div>
      </div>
    </div>
  );
}
