'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import PageShell from '@/components/ui/PageShell';
import PriceTag from '@/components/ui/PriceTag';
import useCartStore from '@/state/cart';

export default function CartPage() {
  const { cart, isLoading, fetchCart, updateItem, removeItem, hasCartItems, getItemCount, getSubtotal } = useCartStore();

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  if (isLoading) {
    return (
      <PageShell variant="tight" title="Shopping Cart">
        <div className="text-center">Loading cart...</div>
      </PageShell>
    );
  }

  if (!cart || !hasCartItems()) {
    return (
      <PageShell variant="tight" title="Shopping Cart">
        <div className="text-center empty-state">
          <h1>Your Cart is Empty</h1>
          <p>Add some products to get started.</p>
          <Link href="/products" className="btn">
            Continue Shopping
          </Link>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell title="Shopping Cart" headingLevel={1} sectionClassName="cart-shell" contentClassName="cart-layout">
      <div className="cart-items">
        {cart.lineItems.map((item) => (
          <article key={item.id} className="cart-line-item">
            <div className="cart-line-item__media" aria-hidden="true" />
            <div className="cart-line-item__content">
              <h3>Product #{item.purchasableId}</h3>
              <PriceTag amount={item.price} />
              <div className="cart-line-item__actions">
                <label>
                  <span className="sr-only">Quantity</span>
                  <input
                    type="number"
                    min="1"
                    value={item.qty}
                    onChange={(e) => {
                      const parsed = Number.parseInt(e.target.value, 10);
                      const nextQty = Number.isNaN(parsed) ? 1 : Math.max(1, parsed);
                      updateItem(item.id, nextQty);
                    }}
                  />
                </label>
                <button type="button" onClick={() => removeItem(item.id)} className="cart-line-item__remove">
                  Remove
                </button>
              </div>
            </div>
            <div className="cart-line-item__totals">
              <PriceTag amount={item.subtotal} />
            </div>
          </article>
        ))}
      </div>

      <aside className="cart-summary">
        <div className="cart-summary__box">
          <h2>Order Summary</h2>
          <div className="cart-summary__row">
            <span>Items</span>
            <span>{getItemCount()}</span>
          </div>
          <div className="cart-summary__row">
            <span>Subtotal</span>
            <PriceTag amount={getSubtotal()} />
          </div>
          <div className="cart-summary__row cart-summary__row--total">
            <span>Total</span>
            <PriceTag amount={cart.total} />
          </div>
          <Link href="/checkout" className="btn">
            Proceed to Checkout
          </Link>
        </div>
      </aside>
    </PageShell>
  );
}
