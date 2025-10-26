interface PriceTagProps {
  amount?: number | null;
  currencySymbol?: string;
  currencyCode?: string;
  className?: string;
  showCode?: boolean;
}

export default function PriceTag({
  amount,
  currencySymbol = '$',
  currencyCode,
  className = '',
  showCode = false,
}: PriceTagProps) {
  const formattedAmount =
    typeof amount === 'number'
      ? amount.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      : null;

  return (
    <span className={['price-tag', className].filter(Boolean).join(' ')}>
      {formattedAmount ? (
        <>
          <span className="price-tag__symbol">{currencySymbol}</span>
          <span className="price-tag__amount">{formattedAmount}</span>
          {showCode && currencyCode ? <span className="price-tag__code"> {currencyCode}</span> : null}
        </>
      ) : (
        <span className="price-tag__placeholder">—</span>
      )}
    </span>
  );
}
