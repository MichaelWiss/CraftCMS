'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import PageSection from '@/components/ui/PageSection';
import ProductImage from '@/components/ui/ProductImage';
import PriceTag from '@/components/ui/PriceTag';
import type { ProductCardData } from '@/components/ui/ProductCard';
import useCartStore from '@/state/cart';

export default function ProductDetailPage() {
  const params = useParams();
  const [product, setProduct] = useState<ProductCardData | null>(null);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCartStore();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!params.slug) {
        return;
      }

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`);
        const data = await response.json();
        if (data.success) {
          const found = data.data.find((p: ProductCardData) => p.slug === params.slug);
          setProduct(found || null);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.slug]);

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

  if (loading) {
    return (
      <PageSection variant="tight">
        <div className="page-container">
          <div className="text-center">Loading product...</div>
        </div>
      </PageSection>
    );
  }

  if (!product) {
    return (
      <PageSection variant="tight">
        <div className="page-container">
          <div className="text-center empty-state">
            <h1>Product not found</h1>
            <a href="/products" className="btn">
              Back to products
            </a>
          </div>
        </div>
      </PageSection>
    );
  }

  return (
    <PageSection variant="tight">
      <div className="product-detail">
        <ProductImage
          src={product.image?.url ?? null}
          alt={product.image?.title ?? product.title}
          className="product-detail__image"
        />

        <div className="product-detail__content">
          <h1>{product.title}</h1>
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
    </PageSection>
  );
}
