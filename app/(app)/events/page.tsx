'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
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
      
      <div className="divide-y divide-black/10">
        {events.map((event) => (
          <Link key={event.id} href={`/events/${event.id}`}>
            <div className="p-4 space-y-3">
              <div className="flex items-start gap-4">
                <div className="text-4xl">{event.image}</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{event.title}</h3>
                  <p className="text-sm text-black/60 mt-1">{formatDate(event.date)}</p>
                  <p className="text-sm text-black/60">{event.location}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-xs text-black/60">
                      {event.participants}/{event.maxParticipants} participants
                    </span>
                    {event.type === 'private' && (
                      <span className="text-xs bg-black text-white px-2 py-0.5 rounded">Privé</span>
                    )}
                  </div>
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md bg-white rounded-lg border-2 border-black p-6 space-y-4">
            <h2 className="text-xl font-semibold">Créer un événement</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Titre</label>
                <input
                  type="text"
                  className="w-full rounded-lg border-2 border-black px-4 py-2"
                  placeholder="Nom de l'événement"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  className="w-full rounded-lg border-2 border-black px-4 py-2"
                  rows={3}
                  placeholder="Description..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Date et heure</label>
                <input
                  type="datetime-local"
                  className="w-full rounded-lg border-2 border-black px-4 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Lieu</label>
                <input
                  type="text"
                  className="w-full rounded-lg border-2 border-black px-4 py-2"
                  placeholder="Adresse"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowCreate(false)}
                className="flex-1 rounded-lg border-2 border-black bg-white px-4 py-2 font-medium"
              >
                Annuler
              </button>
              <button
                onClick={() => {
                  alert('Événement créé ! (Mode démo)');
                  setShowCreate(false);
                }}
                className="flex-1 rounded-lg border-2 border-black bg-black text-white px-4 py-2 font-medium"
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
