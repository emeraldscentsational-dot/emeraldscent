import { apiSlice } from './apiSlice';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  salePrice?: number;
  sku: string;
  inventory: number;
  images: string[];
  scentNotes: string[];
  size?: string;
  isPublished: boolean;
  categoryId: string;
  category: {
    id: string;
    name: string;
  };
  reviews: Review[];
  _avg?: {
    rating: number;
  };
}

export interface Review {
  id: string;
  rating: number;
  comment: string;
  isApproved: boolean;
  createdAt: string;
  user: {
    name: string;
  };
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  image?: string;
}

export const productsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<{
      products: Product[];
      total: number;
      totalPages: number;
    }, {
      page?: number;
      limit?: number;
      search?: string;
      category?: string;
      minPrice?: number;
      maxPrice?: number;
      scentNotes?: string[];
      sort?: string;
      inStock?: boolean;
    }>({
      query: (params) => ({
        url: '/products',
        params,
      }),
      providesTags: ['Product'],
    }),
    getProduct: builder.query<Product, string>({
      query: (id) => `/products/${id}`,
      providesTags: (result, error, id) => [{ type: 'Product', id }],
    }),
    getCategories: builder.query<Category[], void>({
      query: () => '/categories',
      providesTags: ['Category'],
    }),
    getFeaturedProducts: builder.query<Product[], void>({
      query: () => '/products/featured',
      providesTags: ['Product'],
    }),
    getBestsellers: builder.query<Product[], void>({
      query: () => '/products/bestsellers',
      providesTags: ['Product'],
    }),
    getNewArrivals: builder.query<Product[], void>({
      query: () => '/products/new-arrivals',
      providesTags: ['Product'],
    }),
    searchProducts: builder.query<Product[], string>({
      query: (query) => `/products/search?q=${query}`,
      providesTags: ['Product'],
    }),
    addReview: builder.mutation<void, {
      productId: string;
      rating: number;
      comment: string;
    }>({
      query: ({ productId, ...body }) => ({
        url: `/products/${productId}/reviews`,
        method: 'POST',
        body,
      }),
      invalidatesTags: (result, error, { productId }) => [
        { type: 'Product', id: productId },
      ],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useGetCategoriesQuery,
  useGetFeaturedProductsQuery,
  useGetBestsellersQuery,
  useGetNewArrivalsQuery,
  useSearchProductsQuery,
  useAddReviewMutation,
} = productsApi;