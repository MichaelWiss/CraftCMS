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
export const getCart = async () => {
  const response = await commerceClient.get('/api/cart');
  return response.data;
};

export const addToCart = async (purchasableId: number, qty: number = 1) => {
  const response = await commerceClient.post('/api/cart/add', {
    purchasableId,
    qty,
  });
  return response.data;
};

export const updateCartItem = async (lineItemId: number, qty: number) => {
  const response = await commerceClient.post('/api/cart/update', {
    lineItemId,
    qty,
  });
  return response.data;
};

export const removeFromCart = async (lineItemId: number) => {
  const response = await commerceClient.post('/api/cart/remove', {
    lineItemId,
  });
  return response.data;
};

// Checkout operations
export const checkout = async (data: {
  email: string;
  shippingAddress: any;
  billingAddress: any;
  gatewayId: number;
}) => {
  const response = await commerceClient.post('/api/checkout', data);
  return response.data;
};

// Use Craft Commerce actions for payment processing
export const processPayment = async (orderNumber: string, paymentData: any) => {
  const response = await commerceClient.post('/actions/commerce/payments/pay', {
    orderNumber,
    ...paymentData,
  });
  return response.data;
};

export default commerceClient;
