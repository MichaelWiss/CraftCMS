import Image from 'next/image';

interface ProductImageProps {
  src?: string | null;
  alt?: string;
  className?: string;
  placeholder?: string;
  width?: number;
  height?: number;
}

export default function ProductImage({
  src,
  alt = '',
  className = '',
  placeholder = 'Product image coming soon',
  width,
  height,
}: ProductImageProps) {
  const wrapperClassName = ['product-image', className].filter(Boolean).join(' ');

  if (src) {
    return (
      <div className={wrapperClassName}>
        <Image
          src={src}
          alt={alt}
          fill={!width || !height}
          width={width}
          height={height}
          className="product-image__media"
          sizes="(min-width: 768px) 400px, 100vw"
        />
      </div>
    );
  }

  return (
    <div className={wrapperClassName}>
      <span className="product-image__placeholder">{placeholder}</span>
    </div>
  );
}
