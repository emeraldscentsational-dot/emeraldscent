import ProductCard from '@/components/ProductCard';
import Link from 'next/link';

export default function NewArrivals() {
  // Mock new arrivals data
  const newArrivals = [
    {
      id: '6',
      name: 'Emerald Essence',
      price: 25000,
      image: 'https://images.pexels.com/photos/1190829/pexels-photo-1190829.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.9,
      reviewCount: 23,
    },
    {
      id: '7',
      name: 'Ruby Romance',
      price: 23000,
      salePrice: 20000,
      image: 'https://images.pexels.com/photos/4465815/pexels-photo-4465815.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.8,
      reviewCount: 15,
    },
    {
      id: '8',
      name: 'Sapphire Serenity',
      price: 21000,
      image: 'https://images.pexels.com/photos/3016430/pexels-photo-3016430.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.7,
      reviewCount: 31,
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            New Arrivals
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Be the first to experience our latest fragrance creations
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/shop?sort=newest"
            className="inline-block bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-800 transition-colors"
          >
            View All New Arrivals
          </Link>
        </div>
      </div>
    </section>
  );
}