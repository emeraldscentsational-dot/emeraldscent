'use client';

import { useState, useEffect } from 'react';
import ProductCard from '@/components/ProductCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function BestsellersCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Mock bestsellers data
  const bestsellers = [
    {
      id: '1',
      name: 'Midnight Rose',
      price: 18000,
      salePrice: 15000,
      image: 'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.8,
      reviewCount: 124,
    },
    {
      id: '2',
      name: 'Ocean Breeze',
      price: 15000,
      image: 'https://images.pexels.com/photos/1961793/pexels-photo-1961793.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.6,
      reviewCount: 89,
    },
    {
      id: '3',
      name: 'Golden Sunset',
      price: 22000,
      image: 'https://images.pexels.com/photos/3059609/pexels-photo-3059609.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.9,
      reviewCount: 156,
    },
    {
      id: '4',
      name: 'Velvet Dreams',
      price: 20000,
      salePrice: 17000,
      image: 'https://images.pexels.com/photos/2533266/pexels-photo-2533266.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.7,
      reviewCount: 92,
    },
    {
      id: '5',
      name: 'Crystal Waters',
      price: 16000,
      image: 'https://images.pexels.com/photos/4465831/pexels-photo-4465831.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.5,
      reviewCount: 67,
    },
  ];

  const itemsPerSlide = 4;
  const maxSlides = Math.ceil(bestsellers.length / itemsPerSlide);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % maxSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + maxSlides) % maxSlides);
  };

  // Auto-play
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Bestsellers
            </h2>
            <p className="text-xl text-gray-600">
              Discover what everyone is talking about
            </p>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={prevSlide}
              className="p-3 bg-gray-100 hover:bg-purple-100 rounded-full transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={nextSlide}
              className="p-3 bg-gray-100 hover:bg-purple-100 rounded-full transition-colors"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="relative overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {Array.from({ length: maxSlides }).map((_, slideIndex) => (
              <div key={slideIndex} className="w-full flex-shrink-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {bestsellers
                    .slice(slideIndex * itemsPerSlide, (slideIndex + 1) * itemsPerSlide)
                    .map((product) => (
                      <ProductCard key={product.id} {...product} />
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="flex justify-center space-x-2 mt-8">
          {Array.from({ length: maxSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                currentSlide === index ? 'bg-purple-700' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}