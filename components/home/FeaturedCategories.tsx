import Link from 'next/link';
import Image from 'next/image';

export default function FeaturedCategories() {
  const categories = [
    {
      id: '1',
      name: 'Eau de Parfum',
      description: 'Long-lasting luxury fragrances',
      image: 'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&cs=tinysrgb&w=600',
      href: '/shop?category=eau-de-parfum',
    },
    {
      id: '2',
      name: 'Body Mists',
      description: 'Light and refreshing scents',
      image: 'https://images.pexels.com/photos/1961793/pexels-photo-1961793.jpeg?auto=compress&cs=tinysrgb&w=600',
      href: '/shop?category=body-mists',
    },
    {
      id: '3',
      name: 'Cologne',
      description: 'Classic and sophisticated',
      image: 'https://images.pexels.com/photos/3059609/pexels-photo-3059609.jpeg?auto=compress&cs=tinysrgb&w=600',
      href: '/shop?category=cologne',
    },
    {
      id: '4',
      name: 'Limited Edition',
      description: 'Exclusive collector pieces',
      image: 'https://images.pexels.com/photos/2533266/pexels-photo-2533266.jpeg?auto=compress&cs=tinysrgb&w=600',
      href: '/shop?category=limited-edition',
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Explore Our Collections
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            From timeless classics to modern masterpieces, discover the perfect fragrance for every occasion.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={category.href}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="aspect-[3/4] relative">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-xl font-bold mb-2 group-hover:text-purple-300 transition-colors">
                  {category.name}
                </h3>
                <p className="text-gray-200 group-hover:text-white transition-colors">
                  {category.description}
                </p>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-purple-700/0 group-hover:bg-purple-700/10 transition-all duration-300" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}