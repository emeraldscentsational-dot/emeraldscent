'use client';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/lib/store/store';
import { removeFromWishlist, clearWishlist } from '@/lib/store/slices/wishlistSlice';
import { addToCart } from '@/lib/store/slices/cartSlice';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, ShoppingBag, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function WishlistPage() {
  const dispatch = useDispatch();
  const { items } = useSelector((state: RootState) => state.wishlist);

  const handleRemoveFromWishlist = (id: string, name: string) => {
    dispatch(removeFromWishlist(id));
    toast.success(`${name} removed from wishlist`);
  };

  const handleAddToCart = (item: any) => {
    dispatch(addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      salePrice: item.salePrice,
      image: item.image,
    }));
    toast.success(`${item.name} added to cart!`);
  };

  const handleClearWishlist = () => {
    if (window.confirm('Are you sure you want to clear your entire wishlist?')) {
      dispatch(clearWishlist());
      toast.success('Wishlist cleared');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                My Wishlist
              </h1>
              <p className="text-gray-600">
                {items.length} {items.length === 1 ? 'item' : 'items'} saved for later
              </p>
            </div>
            
            {items.length > 0 && (
              <Button
                variant="outline"
                onClick={handleClearWishlist}
                className="text-red-600 border-red-600 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Clear All
              </Button>
            )}
          </div>

          {items.length === 0 ? (
            /* Empty State */
            <Card>
              <CardContent className="text-center py-16">
                <Heart className="h-16 w-16 text-gray-300 mx-auto mb-6" />
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Your wishlist is empty
                </h2>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  Save your favorite fragrances here so you can easily find them later. 
                  Start exploring our collection to add items to your wishlist.
                </p>
                <Link href="/shop">
                  <Button className="bg-purple-700 hover:bg-purple-800">
                    Start Shopping
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            /* Wishlist Items */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {items.map((item) => (
                <Card key={item.id} className="group hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <div className="relative aspect-square overflow-hidden rounded-t-lg">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      
                      {/* Sale Badge */}
                      {item.salePrice && (
                        <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                          SALE
                        </div>
                      )}

                      {/* Remove Button */}
                      <button
                        onClick={() => handleRemoveFromWishlist(item.id, item.name)}
                        className="absolute top-2 right-2 p-2 bg-white/90 hover:bg-red-500 hover:text-white rounded-full transition-colors"
                      >
                        <Heart className="h-4 w-4 fill-current" />
                      </button>
                    </div>

                    <div className="p-4">
                      <Link href={`/products/${item.id}`}>
                        <h3 className="font-semibold text-gray-900 mb-2 hover:text-purple-700 transition-colors">
                          {item.name}
                        </h3>
                      </Link>
                      
                      {/* Price */}
                      <div className="flex items-center space-x-2 mb-4">
                        <span className="text-lg font-bold text-purple-700">
                          ₦{(item.salePrice || item.price).toLocaleString()}
                        </span>
                        {item.salePrice && (
                          <span className="text-sm text-gray-500 line-through">
                            ₦{item.price.toLocaleString()}
                          </span>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex space-x-2">
                        <Button
                          onClick={() => handleAddToCart(item)}
                          className="flex-1 bg-purple-700 hover:bg-purple-800"
                          size="sm"
                        >
                          <ShoppingBag className="h-4 w-4 mr-2" />
                          Add to Cart
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleRemoveFromWishlist(item.id, item.name)}
                          className="text-red-600 border-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Recommendations */}
          {items.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">
                You Might Also Like
              </h2>
              <div className="text-center py-8 bg-white rounded-lg border-2 border-dashed border-gray-200">
                <p className="text-gray-500 mb-4">
                  Discover more fragrances based on your wishlist
                </p>
                <Link href="/shop">
                  <Button variant="outline">
                    Browse More Products
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}