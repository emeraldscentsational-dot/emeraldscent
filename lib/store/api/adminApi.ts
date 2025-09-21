import { apiSlice } from './apiSlice';
import { Product, Category, Order, Review } from './productsApi';

export interface DashboardStats {
  totalRevenue: number;
  newOrders: number;
  totalCustomers: number;
  lowStockProducts: number;
  revenueData: Array<{
    date: string;
    revenue: number;
  }>;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  orders: Order[];
}

export const adminApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Dashboard
    getDashboardStats: builder.query<DashboardStats, void>({
      query: () => '/admin/dashboard',
      providesTags: ['Order', 'User'],
    }),

    // Products
    getAdminProducts: builder.query<Product[], void>({
      query: () => '/admin/products',
      providesTags: ['Product'],
    }),
    createProduct: builder.mutation<Product, Omit<Product, 'id' | 'category' | 'reviews' | '_avg'>>({
      query: (body) => ({
        url: '/admin/products',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Product'],
    }),
    updateProduct: builder.mutation<Product, { id: string } & Partial<Product>>({
      query: ({ id, ...body }) => ({
        url: `/admin/products/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Product'],
    }),
    deleteProduct: builder.mutation<void, string>({
      query: (id) => ({
        url: `/admin/products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Product'],
    }),

    // Categories
    getAdminCategories: builder.query<Category[], void>({
      query: () => '/admin/categories',
      providesTags: ['Category'],
    }),
    createCategory: builder.mutation<Category, Omit<Category, 'id'>>({
      query: (body) => ({
        url: '/admin/categories',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Category'],
    }),
    updateCategory: builder.mutation<Category, Category>({
      query: ({ id, ...body }) => ({
        url: `/admin/categories/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Category'],
    }),
    deleteCategory: builder.mutation<void, string>({
      query: (id) => ({
        url: `/admin/categories/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Category'],
    }),

    // Orders
    getAdminOrders: builder.query<Order[], void>({
      query: () => '/admin/orders',
      providesTags: ['Order'],
    }),
    updateOrderStatus: builder.mutation<Order, {
      id: string;
      status: Order['status'];
      trackingNumber?: string;
    }>({
      query: ({ id, ...body }) => ({
        url: `/admin/orders/${id}/status`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Order'],
    }),

    // Customers
    getCustomers: builder.query<Customer[], void>({
      query: () => '/admin/customers',
      providesTags: ['User'],
    }),

    // Reviews
    getAdminReviews: builder.query<Review[], void>({
      query: () => '/admin/reviews',
      providesTags: ['Review'],
    }),
    approveReview: builder.mutation<void, string>({
      query: (id) => ({
        url: `/admin/reviews/${id}/approve`,
        method: 'PUT',
      }),
      invalidatesTags: ['Review', 'Product'],
    }),
    deleteReview: builder.mutation<void, string>({
      query: (id) => ({
        url: `/admin/reviews/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Review', 'Product'],
    }),
  }),
});

export const {
  useGetDashboardStatsQuery,
  useGetAdminProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetAdminCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useGetAdminOrdersQuery,
  useUpdateOrderStatusMutation,
  useGetCustomersQuery,
  useGetAdminReviewsQuery,
  useApproveReviewMutation,
  useDeleteReviewMutation,
} = adminApi;