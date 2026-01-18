'use client';

import { useState, use } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import mockMessages from '@/data/mockMessages.json';
import mockConversations from '@/data/mockConversations.json';

export default function ConversationPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const conversation = mockMessages.find(m => m.id === id);
  const messages = (mockConversations as any)[id] || [];
  const [newMessage, setNewMessage] = useState('');

  if (!conversation) {
    return (
      <div className="min-h-screen bg-white pb-20">
        <Header title="Conversation" showBack />
        <div className="flex items-center justify-center h-64 px-6">
          <p className="text-black/60 text-center">Conversation introuvable</p>
        </div>
      </div>
    );
  }

  const handleSend = () => {
    if (!newMessage.trim()) return;
    // En mode démo, on ne sauvegarde pas vraiment
    alert('Message envoyé ! (Mode démo)');
    setNewMessage('');
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-white pb-20">
      <Header title={conversation.userName} showBack />
      
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg: any, index: number) => (
          <div
            key={msg.id}
            className={`flex ${msg.senderId === 'current' ? 'justify-end' : 'justify-start'} animate-fade-in`}
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <div
              className={`max-w-[75%] rounded-2xl px-4 py-2.5 shadow-md ${
                msg.senderId === 'current'
                  ? 'bg-black text-white'
                  : 'bg-black/5 text-black'
              }`}
            >
              <p className="text-sm leading-relaxed">{msg.content}</p>
              <p className={`text-xs mt-1.5 ${
                msg.senderId === 'current' ? 'text-white/70' : 'text-black/50'
              }`}>
                {formatTime(msg.timestamp)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white/95 backdrop-blur-sm p-4 shadow-lg">
        <div className="flex gap-3">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Tapez un message..."
            className="flex-1 rounded-2xl bg-black/5 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/20 transition-all"
          />
          <button
            onClick={handleSend}
            className="rounded-2xl bg-black text-white px-6 py-3 font-medium hover-lift active:scale-95 shadow-lg transition-all"
          >
            Envoyer
          </button>
        </div>
      </div>
    </div>
  );
}
