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
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg: any) => (
          <div
            key={msg.id}
            className={`flex ${msg.senderId === 'current' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg px-4 py-2 ${
                msg.senderId === 'current'
                  ? 'bg-black text-white'
                  : 'bg-black/10 text-black'
              }`}
            >
              <p className="text-sm">{msg.content}</p>
              <p className={`text-xs mt-1 ${
                msg.senderId === 'current' ? 'text-white/70' : 'text-black/60'
              }`}>
                {formatTime(msg.timestamp)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-black p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Tapez un message..."
            className="flex-1 rounded-lg border-2 border-black px-4 py-2"
          />
          <button
            onClick={handleSend}
            className="rounded-lg border-2 border-black bg-black text-white px-6 py-2 font-medium"
          >
            Envoyer
          </button>
        </div>
      </div>
    </div>
  );
}
