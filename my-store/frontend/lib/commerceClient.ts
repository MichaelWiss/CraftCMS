/**
 * Commerce Client for cart and checkout operations
 */

import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const commerceClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Cart operations
export interface CartResponse {
  success: boolean;
  data: unknown;
  error?: string;
}

export const getCart = async (): Promise<CartResponse> => {
  const response = await commerceClient.get<CartResponse>('/api/cart');
  return response.data;
};

export const addToCart = async (purchasableId: number, qty: number = 1): Promise<CartResponse> => {
  const response = await commerceClient.post<CartResponse>('/api/cart/add', {
    purchasableId,
    qty,
  });
  return response.data;
};

export const updateCartItem = async (lineItemId: number, qty: number): Promise<CartResponse> => {
  const response = await commerceClient.post<CartResponse>('/api/cart/update', {
    lineItemId,
    qty,
  });
  return response.data;
};

export const removeFromCart = async (lineItemId: number): Promise<CartResponse> => {
  const response = await commerceClient.post<CartResponse>('/api/cart/remove', {
    lineItemId,
  });
  return response.data;
};

// Checkout operations
export interface AddressPayload {
  firstName: string;
  lastName: string;
  address1: string;
  city: string;
  zipCode: string;
  countryCode: string;
  [key: string]: unknown;
}

export interface CheckoutPayload {
  email: string;
  shippingAddress: AddressPayload;
  billingAddress: AddressPayload;
  gatewayId: number;
  paymentSourceId?: number;
  paymentForm?: Record<string, unknown>;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}

export const checkout = async (data: CheckoutPayload): Promise<ApiResponse<unknown>> => {
  const response = await commerceClient.post<ApiResponse<unknown>>('/api/checkout', data);
  return response.data;
};

// Use Craft Commerce actions for payment processing
export const processPayment = async (
  orderNumber: string,
  paymentData: Record<string, unknown>
): Promise<ApiResponse<unknown>> => {
  const response = await commerceClient.post<ApiResponse<unknown>>('/actions/commerce/payments/pay', {
    orderNumber,
    ...paymentData,
  });
  return response.data;
};

export default commerceClient;
