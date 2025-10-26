/**
 * Cart State Management with Zustand
 */

import { create } from 'zustand';
import { getCart, addToCart, updateCartItem, removeFromCart } from '@/lib/commerceClient';

export interface LineItem {
  id: number;
  purchasableId: number;
  qty: number;
  price: number;
  subtotal: number;
}

export interface Cart {
  id: number | null;
  number: string;
  lineItems: LineItem[];
  totalQty: number;
  itemSubtotal: number;
  total: number;
}

interface CartState {
  cart: Cart | null;
  isLoading: boolean;
  error: string | null;
  fetchCart: () => Promise<void>;
  addItem: (purchasableId: number, qty?: number) => Promise<void>;
  updateItem: (lineItemId: number, qty: number) => Promise<void>;
  removeItem: (lineItemId: number) => Promise<void>;
}

const useCartStore = create<CartState>((set) => ({
  cart: null,
  isLoading: false,
  error: null,

  fetchCart: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await getCart();
      if (response.success) {
        set({ cart: response.data, isLoading: false });
      } else {
        set({ error: response.error, isLoading: false });
      }
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  addItem: async (purchasableId: number, qty: number = 1) => {
    set({ isLoading: true, error: null });
    try {
      const response = await addToCart(purchasableId, qty);
      if (response.success) {
        set({ cart: response.data, isLoading: false });
      } else {
        set({ error: response.error, isLoading: false });
      }
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  updateItem: async (lineItemId: number, qty: number) => {
    set({ isLoading: true, error: null });
    try {
      const response = await updateCartItem(lineItemId, qty);
      if (response.success) {
        set({ cart: response.data, isLoading: false });
      } else {
        set({ error: response.error, isLoading: false });
      }
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  removeItem: async (lineItemId: number) => {
    set({ isLoading: true, error: null });
    try {
      const response = await removeFromCart(lineItemId);
      if (response.success) {
        set({ cart: response.data, isLoading: false });
      } else {
        set({ error: response.error, isLoading: false });
      }
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },
}));

export default useCartStore;
