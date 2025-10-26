import Link from 'next/link';
import ProductImage from '@/components/ui/ProductImage';
import PriceTag from '@/components/ui/PriceTag';

export interface ProductCardImage {
  id?: number;
  title?: string;
  url?: string;
  width?: number;
  height?: number;
}

export interface ProductCardData {
  id: number;
  title: string;
  slug: string;
  description?: string | null;
  price?: number | null;
  image?: ProductCardImage | null;
}

interface ProductCardProps {
  product: ProductCardData;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.slug}`} className="group">
      <article className="border rounded-lg overflow-hidden hover:shadow-lg transition bg-white h-full">
        <ProductImage
          src={product.image?.url}
          alt={product.image?.title ?? product.title}
          className="aspect-square"
        />
        <div className="p-4 space-y-3">
          <div>
            <h3 className="font-semibold group-hover:text-gray-700 transition">
              {product.title}
            </h3>
            {product.description ? (
              <p className="product-card__description">{product.description}</p>
            ) : null}
          </div>
          <PriceTag amount={product.price ?? null} />
        </div>
      </article>
    </Link>
  );
}
