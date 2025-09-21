'use client';

import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { closeSearch } from '@/lib/store/slices/uiSlice';
import { Search, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function SearchOverlay() {
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        dispatch(closeSearch());
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [dispatch]);

  // Mock search results for demo
  const mockResults = [
    { id: '1', name: 'Midnight Rose', price: 15000, image: 'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { id: '2', name: 'Ocean Breeze', price: 12000, image: 'https://images.pexels.com/photos/1961793/pexels-photo-1961793.jpeg?auto=compress&cs=tinysrgb&w=400' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
      <div className="mx-auto max-w-3xl p-4 sm:p-6 lg:p-8">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          {/* Search Input */}
          <div className="flex items-center p-6 border-b border-gray-200">
            <Search className="h-5 w-5 text-gray-400 mr-3" />
            <input
              type="text"
              placeholder="Search for fragrances..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 outline-none text-lg placeholder-gray-400"
              autoFocus
            />
            <button
              onClick={() => dispatch(closeSearch())}
              className="ml-4 p-1 hover:text-purple-700 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Search Results */}
          <div className="max-h-96 overflow-y-auto p-6">
            {query.length > 0 ? (
              <div className="space-y-4">
                {mockResults.map((product) => (
                  <Link
                    key={product.id}
                    href={`/products/${product.id}`}
                    onClick={() => dispatch(closeSearch())}
                    className="flex items-center space-x-4 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={48}
                      height={48}
                      className="rounded-lg object-cover"
                    />
                    <div>
                      <p className="font-medium text-gray-900">{product.name}</p>
                      <p className="text-purple-700 font-semibold">₦{product.price.toLocaleString()}</p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">Start typing to search for products...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}