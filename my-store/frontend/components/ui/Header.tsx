import Link from 'next/link';
import PageContainer from '@/components/ui/PageContainer';

export default function Header() {
  return (
    <header className="top-nav">
      <PageContainer className="top-nav__inner">
        <nav className="top-nav-links">
          <Link href="/products">Products</Link>
          <Link href="/#about">About</Link>
          <Link href="/#recipes">Recipes</Link>
        </nav>
        <Link href="/products" className="shop-btn">
          SHOP NOW
        </Link>
      </PageContainer>
    </header>
  );
}
