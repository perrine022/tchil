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
          className="w-full rounded-lg border-2 border-black px-4 py-3"
        />
      </div>

      <div className="px-4 pb-8 space-y-4">
        {filteredProducts.map((product) => (
          <div key={product.id} className="border-2 border-black rounded-lg p-4">
            <div className="flex items-start gap-4">
              <div className="text-5xl">{product.image}</div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{product.name}</h3>
                <p className="text-sm text-black/60 mt-1">{product.description}</p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-xl font-bold">{product.price.toFixed(2)} €</span>
                  <button
                    onClick={() => addToCart(product.id)}
                    className="rounded-lg border-2 border-black bg-black text-white px-4 py-2 text-sm font-medium"
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
        className="fixed bottom-24 right-4 left-4 md:left-1/2 md:right-auto md:-translate-x-1/2 md:max-w-[420px] flex items-center justify-center gap-2 rounded-lg border-2 border-black bg-black text-white px-6 py-3 font-semibold"
      >
        <span>🛒</span>
        <span>Panier ({cart.length})</span>
      </Link>
    </div>
  );
}
