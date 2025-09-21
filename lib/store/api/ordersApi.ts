import { apiSlice } from './apiSlice';

export interface Order {
  id: string;
  orderNumber: string;
  status: 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  total: number;
  subtotal: number;
  shippingCost: number;
  discount: number;
  promoCode?: string;
  trackingNumber?: string;
  paymentStatus: string;
  paymentRef?: string;
  createdAt: string;
  updatedAt: string;
  user: {
    name: string;
    email: string;
  };
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
  };
  items: OrderItem[];
}

export interface OrderItem {
  id: string;
  quantity: number;
  price: number;
  product: {
    id: string;
    name: string;
    images: string[];
  };
}

export interface Address {
  id: string;
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  isDefault: boolean;
}

export const ordersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation<{ orderId: string; paymentUrl: string }, {
      items: Array<{
        productId: string;
        quantity: number;
        price: number;
      }>;
      addressId: string;
      promoCode?: string;
    }>({
      query: (body) => ({
        url: '/orders',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Order'],
    }),
    getOrders: builder.query<Order[], void>({
      query: () => '/orders',
      providesTags: ['Order'],
    }),
    getOrder: builder.query<Order, string>({
      query: (id) => `/orders/${id}`,
      providesTags: (result, error, id) => [{ type: 'Order', id }],
    }),
    trackOrder: builder.query<Order, { orderNumber: string; email: string }>({
      query: ({ orderNumber, email }) => 
        `/orders/track?orderNumber=${orderNumber}&email=${email}`,
    }),
    getAddresses: builder.query<Address[], void>({
      query: () => '/addresses',
      providesTags: ['User'],
    }),
    addAddress: builder.mutation<Address, Omit<Address, 'id'>>({
      query: (body) => ({
        url: '/addresses',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['User'],
    }),
    updateAddress: builder.mutation<Address, Address>({
      query: ({ id, ...body }) => ({
        url: `/addresses/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['User'],
    }),
    deleteAddress: builder.mutation<void, string>({
      query: (id) => ({
        url: `/addresses/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrdersQuery,
  useGetOrderQuery,
  useTrackOrderQuery,
  useGetAddressesQuery,
  useAddAddressMutation,
  useUpdateAddressMutation,
  useDeleteAddressMutation,
} = ordersApi;