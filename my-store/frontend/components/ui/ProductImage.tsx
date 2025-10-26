interface ProductImageProps {
  src?: string | null;
  alt?: string;
  className?: string;
  placeholder?: string;
}

export default function ProductImage({
  src,
  alt = '',
  className = '',
  placeholder = 'Product image coming soon',
}: ProductImageProps) {
  const wrapperClassName = ['product-image', className].filter(Boolean).join(' ');

  if (src) {
    return (
      <div className={wrapperClassName}>
        <img src={src} alt={alt} className="product-image__media" />
      </div>
    );
  }

  return (
    <div className={wrapperClassName}>
      <span className="product-image__placeholder">{placeholder}</span>
    </div>
  );
}
