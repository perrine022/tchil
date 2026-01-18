'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import { useStore } from '@/lib/store';
import mockProducts from '@/data/mockProducts.json';

export default function CartPage() {
  const router = useRouter();
  const { isAuthenticated, cart, removeFromCart, clearCart } = useStore();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  const cartProducts = mockProducts.filter(p => cart.includes(p.id));
  const total = cartProducts.reduce((sum, p) => sum + p.price, 0);

  return (
    <div className="min-h-screen bg-white pb-20">
      <Header title="Panier" showBack />
      
      <div className="px-6 py-8 space-y-4">
        {cartProducts.length === 0 ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-black/60">Votre panier est vide</p>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {cartProducts.map((product) => (
                <div key={product.id} className="flex items-center gap-4 border-2 border-black rounded-lg p-4">
                  <div className="text-4xl">{product.image}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{product.name}</h3>
                    <p className="text-sm text-black/60">{product.price.toFixed(2)} €</p>
                  </div>
                  <button
                    onClick={() => removeFromCart(product.id)}
                    className="text-red-600 font-medium"
                  >
                    Retirer
                  </button>
                </div>
              ))}
            </div>

            <div className="border-t-2 border-black pt-4">
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-semibold">Total</span>
                <span className="text-xl font-bold">{total.toFixed(2)} €</span>
              </div>
              <button
                onClick={() => {
                  alert('Commande passée ! (Mode démo)');
                  clearCart();
                }}
                className="w-full rounded-lg border-2 border-black bg-black text-white px-6 py-4 font-semibold"
              >
                Passer la commande
              </button>
              <button
                onClick={clearCart}
                className="w-full rounded-lg border-2 border-black bg-white px-6 py-4 font-medium mt-2"
              >
                Vider le panier
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
