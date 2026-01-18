'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import { useStore } from '@/lib/store';
import mockEvents from '@/data/mockEvents.json';

export default function EventsPage() {
  const router = useRouter();
  const { isAuthenticated, modules } = useStore();
  const [events, setEvents] = useState(mockEvents);
  const [showCreate, setShowCreate] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  if (!modules.events) {
    return (
      <div className="min-h-screen bg-white pb-20">
        <Header title="Événements" />
        <div className="flex items-center justify-center h-64 px-6">
          <p className="text-black/60 text-center">Le module Événements est désactivé</p>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleParticipate = (eventId: string) => {
    setEvents(events.map(event =>
      event.id === eventId
        ? { ...event, participants: event.participants + 1 }
        : event
    ));
    alert('Participation enregistrée !');
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      <Header 
        title="Événements" 
        rightAction={
          <button onClick={() => setShowCreate(true)} className="text-xl">
            +
          </button>
        }
      />
      
      <div className="px-4 py-6 space-y-6">
        {events.map((event, index) => (
          <Link 
            key={event.id} 
            href={`/events/${event.id}`}
            className="block animate-fade-in"
            style={{ animationDelay: `${index * 0.08}s` }}
          >
            <div className="group relative overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-lg transition-all duration-300 active:scale-[0.98]">
              {/* Image en couleur */}
              {(event as { imageUrl?: string }).imageUrl && (
                <div className="relative h-40 overflow-hidden">
                  <Image 
                    src={(event as { imageUrl: string }).imageUrl} 
                    alt={event.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
              )}
              
              <div className="relative p-5">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold mb-1.5 leading-tight">{event.title}</h3>
                    <p className="text-sm text-black/50 font-medium">{formatDate(event.date)}</p>
                  </div>
                  {event.type === 'private' && (
                    <span className="text-xs bg-black/10 text-black px-2.5 py-1 rounded-full font-medium flex-shrink-0">
                      Privé
                    </span>
                  )}
                </div>
                
                <div className="space-y-2 mb-4">
                  <p className="text-sm text-black/60 flex items-center gap-1.5">
                    <span className="text-xs">○</span>
                    {event.location}
                  </p>
                  <p className="text-xs text-black/50">
                    {event.participants}/{event.maxParticipants} participants
                  </p>
                </div>
                
                <div className="pt-3 border-t border-black/5">
                  <p className="text-sm text-black/70 line-clamp-2 leading-relaxed">{event.description}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {events.length === 0 && (
        <div className="flex items-center justify-center h-64 px-6">
          <p className="text-black/60 text-center">Aucun événement pour le moment</p>
        </div>
      )}

      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 space-y-5 animate-scale-in">
            <h2 className="text-xl font-semibold">Créer un événement</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-black/70">Titre</label>
                <input
                  type="text"
                  className="w-full rounded-xl bg-black/5 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/20 transition-all"
                  placeholder="Nom de l'événement"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-black/70">Description</label>
                <textarea
                  className="w-full rounded-xl bg-black/5 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/20 transition-all resize-none"
                  rows={3}
                  placeholder="Description..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-black/70">Date et heure</label>
                <input
                  type="datetime-local"
                  className="w-full rounded-xl bg-black/5 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/20 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-black/70">Lieu</label>
                <input
                  type="text"
                  className="w-full rounded-xl bg-black/5 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/20 transition-all"
                  placeholder="Adresse"
                />
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setShowCreate(false)}
                className="flex-1 rounded-xl bg-black/5 hover:bg-black/10 px-4 py-3 font-medium transition-all active:scale-95"
              >
                Annuler
              </button>
              <button
                onClick={() => {
                  alert('Événement créé ! (Mode démo)');
                  setShowCreate(false);
                }}
                className="flex-1 rounded-xl bg-black text-white px-4 py-3 font-medium hover-lift active:scale-95 shadow-lg transition-all"
              >
                Créer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
