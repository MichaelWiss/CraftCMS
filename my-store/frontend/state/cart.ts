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
  itemCount: number;
  subtotal: number;
  hasItems: boolean;
  getItemCount: () => number;
  getSubtotal: () => number;
  hasCartItems: () => boolean;
  fetchCart: () => Promise<void>;
  addItem: (purchasableId: number, qty?: number) => Promise<void>;
  updateItem: (lineItemId: number, qty: number) => Promise<void>;
  removeItem: (lineItemId: number) => Promise<void>;
}

const cloneCart = (cart: Cart): Cart => ({
  ...cart,
  lineItems: cart.lineItems.map((item) => ({ ...item })),
});

const deriveCartMetrics = (cart: Cart | null) => {
  const itemCount = cart ? cart.lineItems.reduce((acc, item) => acc + item.qty, 0) : 0;
  const subtotal = cart ? cart.lineItems.reduce((acc, item) => acc + item.subtotal, 0) : 0;
  return {
    itemCount,
    subtotal,
    hasItems: itemCount > 0,
  };
};

const recalculateCart = (cart: Cart): Cart => {
  const totalQty = cart.lineItems.reduce((acc, item) => acc + item.qty, 0);
  const itemSubtotal = cart.lineItems.reduce((acc, item) => acc + item.subtotal, 0);

  return {
    ...cart,
    totalQty,
    itemSubtotal,
    total: itemSubtotal,
  };
};

const useCartStore = create<CartState>((set, get) => ({
  cart: null,
  isLoading: false,
  error: null,
  itemCount: 0,
  subtotal: 0,
  hasItems: false,
  getItemCount: () => get().itemCount,
  getSubtotal: () => get().subtotal,
  hasCartItems: () => get().hasItems,

  fetchCart: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await getCart();
      if (response.success) {
        const cart = recalculateCart(response.data);
        set({ cart, isLoading: false, error: null, ...deriveCartMetrics(cart) });
      } else {
        set({ error: response.error, isLoading: false });
      }
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unable to load cart.';
      set({ error: message, isLoading: false });
    }
  },

  addItem: async (purchasableId: number, qty: number = 1) => {
    const baseCart = get().cart ? cloneCart(get().cart as Cart) : null;
    const optimisticCart = baseCart ? cloneCart(baseCart) : null;

    if (optimisticCart) {
      const existing = optimisticCart.lineItems.find((item) => item.purchasableId === purchasableId);
      if (existing) {
        existing.qty += qty;
        existing.subtotal = existing.price * existing.qty;
      } else {
        optimisticCart.lineItems.push({
          id: Date.now(),
          purchasableId,
          qty,
          price: 0,
          subtotal: 0,
        });
      }

      const recalculated = recalculateCart(optimisticCart);
      set({ cart: recalculated, isLoading: true, error: null, ...deriveCartMetrics(recalculated) });
    } else {
      set({ isLoading: true, error: null });
    }

    try {
      const response = await addToCart(purchasableId, qty);
      if (response.success) {
        const cart = recalculateCart(response.data);
        set({ cart, isLoading: false, error: null, ...deriveCartMetrics(cart) });
      } else {
        throw new Error(response.error);
      }
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unable to update cart.';
      if (baseCart) {
        const metrics = deriveCartMetrics(baseCart);
        set({ cart: baseCart, error: message, isLoading: false, ...metrics });
      } else {
        set({ error: message, isLoading: false });
      }
    }
  },

  updateItem: async (lineItemId: number, qty: number) => {
    const baseCart = get().cart ? cloneCart(get().cart as Cart) : null;
    const optimisticCart = baseCart ? cloneCart(baseCart) : null;
    if (optimisticCart) {
      const target = optimisticCart.lineItems.find((item) => item.id === lineItemId);
      if (target) {
        target.qty = qty;
        target.subtotal = target.price * qty;
        const recalculated = recalculateCart(optimisticCart);
        set({ cart: recalculated, isLoading: true, error: null, ...deriveCartMetrics(recalculated) });
      } else {
        set({ isLoading: true, error: null });
      }
    } else {
      set({ isLoading: true, error: null });
    }

    try {
      const response = await updateCartItem(lineItemId, qty);
      if (response.success) {
        const cart = recalculateCart(response.data);
        set({ cart, isLoading: false, error: null, ...deriveCartMetrics(cart) });
      } else {
        throw new Error(response.error);
      }
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unable to update cart.';
      if (baseCart) {
        const metrics = deriveCartMetrics(baseCart);
        set({ cart: baseCart, error: message, isLoading: false, ...metrics });
      } else {
        set({ error: message, isLoading: false });
      }
    }
  },

  removeItem: async (lineItemId: number) => {
    const baseCart = get().cart ? cloneCart(get().cart as Cart) : null;

    if (baseCart) {
      const filteredItems = baseCart.lineItems.filter((item) => item.id !== lineItemId);
      const optimisticCart = recalculateCart({ ...baseCart, lineItems: filteredItems });
      set({ cart: optimisticCart, isLoading: true, error: null, ...deriveCartMetrics(optimisticCart) });
    } else {
      set({ isLoading: true, error: null });
    }

    try {
      const response = await removeFromCart(lineItemId);
      if (response.success) {
        const cart = recalculateCart(response.data);
        set({ cart, isLoading: false, error: null, ...deriveCartMetrics(cart) });
      } else {
        throw new Error(response.error);
      }
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unable to update cart.';
      if (baseCart) {
        const metrics = deriveCartMetrics(baseCart);
        set({ cart: baseCart, error: message, isLoading: false, ...metrics });
      } else {
        set({ error: message, isLoading: false });
      }
    }
  },
}));

export default useCartStore;
