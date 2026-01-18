'use client';

import { use } from 'react';
import { useRouter } from 'next/navigation';
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
      <div className="px-6 py-8 space-y-6">
        <div className="flex items-center justify-center h-64 bg-black/5 rounded-lg text-8xl">
          {event.image}
        </div>
        
        <div className="space-y-4">
          <h1 className="text-2xl font-bold">{event.title}</h1>
          <div className="space-y-2 text-black/70">
            <p>📅 {formatDate(event.date)}</p>
            <p>📍 {event.location}</p>
            <p>👤 Organisé par {event.organizerName}</p>
            <p>
              👥 {event.participants}/{event.maxParticipants} participants
            </p>
          </div>
          
          <div className="border-t border-black/10 pt-4">
            <h2 className="font-semibold mb-2">Description</h2>
            <p className="text-black/70">{event.description}</p>
          </div>

          <button
            onClick={() => {
              alert('Participation enregistrée !');
              router.back();
            }}
            className="w-full rounded-lg border-2 border-black bg-black text-white px-6 py-4 font-semibold"
          >
            Je participe
          </button>
        </div>
      </div>
    </div>
  );
}
