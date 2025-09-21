'use client';

import { useGetCategoriesQuery } from '@/lib/store/api/productsApi';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';

export default function CategoriesPage() {
  const { data: categories, isLoading } = useGetCategoriesQuery();

  // Mock category data with images for demo
  const categoryData = [
    {
      id: '1',
      name: 'Eau de Parfum',
      description: 'Long-lasting luxury fragrances with rich, complex scent profiles',
      image: 'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&cs=tinysrgb&w=600',
      productCount: 45,
    },
    {
      id: '2',
      name: 'Body Mists',
      description: 'Light and refreshing scents perfect for everyday wear',
      image: 'https://images.pexels.com/photos/1961793/pexels-photo-1961793.jpeg?auto=compress&cs=tinysrgb&w=600',
      productCount: 28,
    },
    {
      id: '3',
      name: 'Cologne',
      description: 'Classic and sophisticated fragrances with timeless appeal',
      image: 'https://images.pexels.com/photos/3059609/pexels-photo-3059609.jpeg?auto=compress&cs=tinysrgb&w=600',
      productCount: 32,
    },
    {
      id: '4',
      name: 'Limited Edition',
      description: 'Exclusive collector pieces with unique and rare scent combinations',
      image: 'https://images.pexels.com/photos/2533266/pexels-photo-2533266.jpeg?auto=compress&cs=tinysrgb&w=600',
      productCount: 12,
    },
    {
      id: '5',
      name: 'Unisex',
      description: 'Versatile fragrances designed for everyone to enjoy',
      image: 'https://images.pexels.com/photos/4465831/pexels-photo-4465831.jpeg?auto=compress&cs=tinysrgb&w=600',
      productCount: 24,
    },
    {
      id: '6',
      name: 'Gift Sets',
      description: 'Beautifully curated fragrance collections perfect for gifting',
      image: 'https://images.pexels.com/photos/1190829/pexels-photo-1190829.jpeg?auto=compress&cs=tinysrgb&w=600',
      productCount: 18,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-r from-purple-700 to-purple-900">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl font-bold text-white mb-6">
              Fragrance Categories
            </h1>
            <p className="text-xl text-purple-100 max-w-2xl mx-auto">
              Explore our carefully curated collections of luxury fragrances, 
              each category offering unique scent experiences.
            </p>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="aspect-[4/3] bg-gray-200 rounded-t-lg" />
                    <div className="bg-white p-6 rounded-b-lg">
                      <div className="h-6 bg-gray-200 rounded mb-2" />
                      <div className="h-4 bg-gray-200 rounded mb-4" />
                      <div className="h-4 bg-gray-200 rounded w-1/3" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {categoryData.map((category) => (
                  <Link key={category.id} href={`/shop?category=${category.id}`}>
                    <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <Image
                          src={category.image}
                          alt={category.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                        
                        {/* Product Count Badge */}
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-gray-900">
                          {category.productCount} products
                        </div>
                      </div>
                      
                      <CardContent className="p-6">
                        <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-purple-700 transition-colors">
                          {category.name}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {category.description}
                        </p>
                        
                        <div className="mt-4 flex items-center text-purple-700 font-medium group-hover:text-purple-800 transition-colors">
                          <span>Explore Collection</span>
                          <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Featured Section */}
        <section className="py-16 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Why Choose Our Categories?
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Each category is carefully curated to offer you the finest selection 
                of fragrances for every occasion and preference.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Quality Assured
                </h3>
                <p className="text-gray-600">
                  Every fragrance in our categories meets our strict quality standards 
                  for authenticity and excellence.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Expert Curation
                </h3>
                <p className="text-gray-600">
                  Our perfume experts carefully select each fragrance to ensure 
                  a diverse and exceptional collection.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Regular Updates
                </h3>
                <p className="text-gray-600">
                  We continuously update our categories with new arrivals and 
                  seasonal collections to keep your options fresh.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}