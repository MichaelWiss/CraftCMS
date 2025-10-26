'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import PageSection from '@/components/ui/PageSection';
import ProductCard, { type ProductCardData } from '@/components/ui/ProductCard';

export default function ProductsPage() {
  const [products, setProducts] = useState<ProductCardData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`);
      const data = await response.json();
      if (data.success) {
        setProducts(data.data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <PageSection variant="tight">
        <div className="page-container">
          <div className="text-center">Loading products...</div>
        </div>
      </PageSection>
    );
  }

  return (
    <PageSection
      title="Products"
      subtitle="Explore our latest seafood offerings, prepared the Diana way."
      headingLevel={1}
    >
      {products.length === 0 ? (
        <div className="text-center page-section--tight">
          <p className="text-xl text-gray-600 mb-4">No products found</p>
          <p className="text-gray-500">Check back soon for new arrivals!</p>
        </div>
      ) : (
        <div className="products-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </PageSection>
  );
}
