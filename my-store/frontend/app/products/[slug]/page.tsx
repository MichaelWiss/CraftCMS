'use client';

import { useParams } from 'next/navigation';
import PageShell from '@/components/ui/PageShell';
import ProductImage from '@/components/ui/ProductImage';
import PriceTag from '@/components/ui/PriceTag';
import useProductBySlug from '@/lib/hooks/useProduct';
import useCartStore from '@/state/cart';

export default function ProductDetailPage() {
  const params = useParams();
  const { data: product, isLoading, error } = useProductBySlug(params.slug);
  const { addItem } = useCartStore();

  const handleAddToCart = async () => {
    if (!product) {
      return;
    }

    try {
      await addItem(product.id);
      alert('Added to cart!');
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  if (isLoading) {
    return (
      <PageShell variant="tight" title="Product">
        <div className="text-center">Loading product...</div>
      </PageShell>
    );
  }

  if (error || !product) {
    return (
      <PageShell variant="tight" title="Product">
        <div className="text-center empty-state">
          <h1>Product not found</h1>
          <a href="/products" className="btn">
            Back to products
          </a>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell variant="tight" title={product.title} headingLevel={1}>
      <div className="product-detail">
        <ProductImage
          src={product.image?.url ?? null}
          alt={product.image?.title ?? product.title}
          className="product-detail__image"
        />

        <div className="product-detail__content">
          <PriceTag amount={product.price ?? null} />

          {product.description ? (
            <p>{product.description}</p>
          ) : (
            <p>
              This product is freshly prepared and ready for your next seafood-inspired meal. Check back soon for
              full tasting notes.
            </p>
          )}

          <button type="button" onClick={handleAddToCart} className="btn">
            Add to Cart
          </button>
        </div>
      </div>
    </PageShell>
  );
}
