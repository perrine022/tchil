'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import { useStore } from '@/lib/store';
import mockProducts from '@/data/mockProducts.json';

export default function ShopPage() {
  const router = useRouter();
  const { isAuthenticated, cart, addToCart } = useStore();
  const [search, setSearch] = useState('');
  const [products] = useState(mockProducts);
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    if (search.trim()) {
      setFilteredProducts(
        products.filter(p =>
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.description.toLowerCase().includes(search.toLowerCase())
        )
      );
    } else {
      setFilteredProducts(products);
    }
  }, [search, products]);

  return (
    <div className="min-h-screen bg-white pb-20">
      <Header title="Boutique" />
      
      <div className="px-4 py-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Rechercher un produit..."
          className="w-full rounded-xl border-2 border-black px-4 py-3 focus:ring-2 focus:ring-black/20 focus:outline-none transition-all"
        />
      </div>

      <div className="px-4 pb-8 space-y-4">
        {filteredProducts.map((product, index) => (
          <div 
            key={product.id} 
            className="border-2 border-black rounded-xl p-4 bg-white hover-lift animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-start gap-4">
              <div className="text-5xl transition-transform hover:scale-110">{product.image}</div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{product.name}</h3>
                <p className="text-sm text-black/60 mt-1">{product.description}</p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-xl font-bold">{product.price.toFixed(2)} €</span>
                  <button
                    onClick={() => addToCart(product.id)}
                    className="rounded-xl border-2 border-black bg-black text-white px-4 py-2 text-sm font-medium hover-lift active:scale-95 transition-all shadow-lg"
                  >
                    Ajouter au panier
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="flex items-center justify-center h-64 px-6">
          <p className="text-black/60 text-center">Aucun produit trouvé</p>
        </div>
      )}

      <Link
        href="/shop/cart"
        className="fixed bottom-24 right-4 left-4 md:left-1/2 md:right-auto md:-translate-x-1/2 md:max-w-[420px] flex items-center justify-center gap-2 rounded-xl border-2 border-black bg-black text-white px-6 py-3 font-semibold hover-lift active:scale-95 shadow-xl transition-all"
      >
        <span>◉</span>
        <span>Panier ({cart.length})</span>
      </Link>
    </div>
  );
}
