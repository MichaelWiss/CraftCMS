import { useEffect, useState, useCallback } from 'react';
import type { ProductCardData } from '@/components/ui/ProductCard';

interface ProductHookState {
  data: ProductCardData | null;
  isLoading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

async function fetchProductBySlug(slug: string): Promise<ProductCardData> {
  const response = await fetch(`${API_URL}/api/products/slug/${encodeURIComponent(slug)}`, {
    credentials: 'include',
  });

  if (!response.ok) {
    const errorBody = (await response.json().catch(() => ({}))) as { error?: string };
    const message = typeof errorBody?.error === 'string' ? errorBody.error : 'Unable to load product.';
    throw new Error(message);
  }

  const payload = (await response.json()) as { success: boolean; data: ProductCardData; error?: string };
  if (!payload.success) {
    throw new Error(payload.error ?? 'Unable to load product.');
  }

  return payload.data as ProductCardData;
}

export function useProductBySlug(slug: string | string[] | undefined): ProductHookState {
  const normalizedSlug = Array.isArray(slug) ? slug[0] : slug;
  const [data, setData] = useState<ProductCardData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(Boolean(normalizedSlug));
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!normalizedSlug) {
      setData(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const product = await fetchProductBySlug(normalizedSlug);
      setData(product);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message ?? 'Unable to load product.');
      } else {
        setError('Unable to load product.');
      }
      setData(null);
    } finally {
      setIsLoading(false);
    }
  }, [normalizedSlug]);

  useEffect(() => {
    load();
  }, [load]);

  return {
    data,
    isLoading,
    error,
    refresh: load,
  };
}

export default useProductBySlug;
