import Link from 'next/link';
import { Play } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video/Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/1190829/pexels-photo-1190829.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop)',
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Discover Your
          <span className="block bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
            Signature Scent
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto leading-relaxed">
          Immerse yourself in our curated collection of luxury fragrances, 
          crafted for those who appreciate the art of fine perfumery.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/shop"
            className="bg-purple-700 hover:bg-purple-800 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Shop Now
          </Link>
          
          <button className="flex items-center space-x-2 text-white hover:text-purple-400 transition-colors group">
            <div className="bg-white/20 p-3 rounded-full group-hover:bg-purple-600/20 transition-colors">
              <Play className="h-5 w-5 fill-current" />
            </div>
            <span className="text-lg">Watch Our Story</span>
          </button>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-1/4 left-1/4 opacity-20">
          <div className="w-20 h-20 bg-purple-500 rounded-full blur-xl animate-pulse" />
        </div>
        <div className="absolute bottom-1/4 right-1/4 opacity-20">
          <div className="w-16 h-16 bg-purple-400 rounded-full blur-xl animate-pulse animation-delay-1000" />
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-bounce" />
        </div>
      </div>
    </section>
  );
}