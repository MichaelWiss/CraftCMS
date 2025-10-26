'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import HeroSection from '@/components/ui/HeroSection';
import PageSection from '@/components/ui/PageSection';
import PageContainer from '@/components/ui/PageContainer';

const marqueePhrases = [
  'EXPLORE OUR SEAFOOD KITS',
  'MOTHER OF SEAFOOD SINCE 1979',
  'METHODS OF CAPTURE SINCE 2013',
  'METHODS OF SEAFOOD SINCE 2013',
];

const bottomMarqueePhrases = [
  'WHERE TO FIND US',
  'SCARBOROUGH SHOP',
  'EATALY TORONTO',
  'WHOLESALE INQUIRIES',
];

const productData = [
  {
    title: 'Atlantic SALMON Skewers',
    description: 'Tender, flavorful salmon on a stick',
  },
  {
    title: 'Mediterranean SEA BASS',
    description: 'Delicate and perfectly seasoned',
  },
  {
    title: 'Creole LOBSTER BISQUE',
    description: 'Rich, creamy, and indulgent',
  },
  {
    title: 'Wild CRAB Cakes',
    description: 'Crispy outside, tender inside',
  },
];

export default function HomePage() {
  const badgeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const observerOptions: IntersectionObserverInit = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    const targets = Array.from(document.querySelectorAll<HTMLElement>('.scroll-fade'));
    targets.forEach((target) => observer.observe(target));

    return () => {
      targets.forEach((target) => observer.unobserve(target));
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const duplicateMarquee = (selector: string) => {
      const element = document.querySelector<HTMLElement>(selector);
      if (!element || element.dataset.duplicated === 'true') {
        return;
      }

      element.innerHTML += element.innerHTML;
      element.dataset.duplicated = 'true';
    };

    duplicateMarquee('.marquee-content');
    duplicateMarquee('.marquee-content-bottom');
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const badge = badgeRef.current;
    if (!badge) {
      return;
    }

    let lastScrollY = window.scrollY;
    let rotation = 0;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const delta = scrollY - lastScrollY;

      rotation -= delta * 0.5;
      badge.style.transform = `rotate(${rotation}deg)`;
      lastScrollY = scrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const duplicatedProducts = [...productData, ...productData];

  return (
    <>
      <header className="header">
        <PageContainer>
          <h1>DIANA&apos;S SEAFOOD</h1>
          <p>
            High-quality, easy to prepare meals
            <br />
            that celebrate the joy of seafood
          </p>
        </PageContainer>
      </header>

      <section className="marquee" aria-label="Seafood promotions ticker">
        <div className="marquee-content">
          <span className="marquee-sequence">
            {marqueePhrases.map((phrase, index) => (
              <span className="marquee-item" key={`top-${index}`}>
                {phrase}
              </span>
            ))}
          </span>
        </div>
      </section>

      <HeroSection
        title="The Mother of Seafood since 1979"
        description="Diana has perfected the art of delivering restaurant-quality seafood experiences straight to your home. Every meal is crafted with care and passion."
        symbol={<span className="hero-symbol">♦</span>}
      />

      <div className="rotating-badge" ref={badgeRef} aria-hidden="true">
        <div className="badge-inner">
          <div className="badge-text">
            <svg viewBox="0 0 150 150">
              <path id="circlePath" d="M 75, 75 m -60, 0 a 60,60 0 1,1 120,0 a 60,60 0 1,1 -120,0" fill="none" />
              <text fill="white" fontFamily="Courier New" fontSize="11" fontWeight="900" letterSpacing="3">
                <textPath href="#circlePath" xlinkHref="#circlePath" startOffset="0">
                  Pearly Responsable Responsibly Sourced
                </textPath>
              </text>
            </svg>
          </div>
          <div className="badge-icon">
            <svg className="fish-icon" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <path d="M70,50 Q80,35 90,30 Q80,40 80,50 Q80,60 90,70 Q80,65 70,50 L30,50 Q20,40 10,45 Q15,50 10,55 Q20,60 30,50 L70,50 M60,45 Q62,42 65,45 Q62,48 60,45" />
              <circle cx="65" cy="45" r="3" />
            </svg>
          </div>
        </div>
      </div>

      <section className="icon-grid">
        <div className="icon-item">
          <div className="icon-circle">
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <path d="M70,50 Q80,35 90,30 Q80,40 80,50 Q80,60 90,70 Q80,65 70,50 L30,50 Q20,40 10,45 Q15,50 10,55 Q20,60 30,50 L70,50 M60,45 Q62,42 65,45 Q62,48 60,45" />
              <circle cx="65" cy="45" r="3" />
            </svg>
          </div>
          <h3>Responsibly Sourced</h3>
          <p>&amp; traceable practices.</p>
        </div>
        <div className="icon-item">
          <div className="icon-circle">
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="3" />
              <path d="M35,45 Q35,35 45,35 Q55,35 55,45 M30,55 Q40,65 50,60 Q60,65 70,55" stroke="currentColor" strokeWidth="3" fill="none" />
              <circle cx="40" cy="45" r="3" />
              <circle cx="60" cy="45" r="3" />
            </svg>
          </div>
          <h3>Real whole food</h3>
          <p>ingredients. No fillers, ever.</p>
        </div>
        <div className="icon-item">
          <div className="icon-circle">
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <path d="M50,20 L55,45 L80,45 L60,60 L70,85 L50,70 L30,85 L40,60 L20,45 L45,45 Z" stroke="currentColor" strokeWidth="3" fill="none" />
              <line x1="50" y1="30" x2="50" y2="15" stroke="currentColor" strokeWidth="3" />
              <circle cx="50" cy="10" r="4" />
            </svg>
          </div>
          <h3>High-quality</h3>
          <p>standards, no compromise.</p>
        </div>
        <div className="icon-item">
          <div className="icon-circle">
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <path d="M50,30 Q35,30 35,45 Q35,55 50,70 Q65,55 65,45 Q65,30 50,30 Z" stroke="currentColor" strokeWidth="3" fill="none" />
            </svg>
          </div>
          <h3>Delicious &amp; flavorful</h3>
          <p>recipes, naturally.</p>
        </div>
      </section>

      <PageSection
        id="products"
        className="products scroll-fade"
        variant="flush"
        containerClassName="products-fullbleed"
        title="OUR PRODUCTS"
        subtitle="Goodness made the Diana's way — with the best, most beautiful, real ingredients."
      >
        <div className="products-container">
          <div className="product-grid">
            {duplicatedProducts.map((product, index) => (
              <div className="product-card" key={`${product.title}-${index}`}>
                <div className="product-image" />
                <div className="product-info">
                  <h3>{product.title}</h3>
                  <p>{product.description}</p>
                  <Link href="/products" className="btn">
                    SHOP NOW
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </PageSection>

      <PageSection id="about" className="purple-section scroll-fade" variant="flush">
        <h2>A Safe Harbour for Responsibly Sourced Seafood.</h2>
        <div className="purple-content">
          <p>
            Real whole food is our promise. Harvested or wild-caught and shipped from thriving fisheries to us, to
            you. No artificial fillers, no fishy business — if we stamp on our name we take it to heart. Personal
            relationships keep our sources traceable. It&apos;s our passion to make ethically sourced, premium &amp;
            delicious, real seafood accessible to home cooks while building a better food system.
          </p>
        </div>
      </PageSection>

      <PageSection id="recipes" className="wave-section scroll-fade" variant="flush">
        <div className="wave-content">
          <div className="wave-item">
            <p>
              Visit our original retail shop in <a href="#">Scarborough</a> or at <a href="#">Eataly Toronto</a>.
              Proudly serving the local community since 1979.
            </p>
          </div>
          <div className="wave-item">
            <p>Find our packaged goods at grocers &amp; specialty shops across Canada and the US!</p>
          </div>
          <div className="wave-item">
            <p>
              Serving Canada&apos;s top chefs, restaurants &amp; retailers. Contact our <a href="#">wholesale team</a> to
              open an account.
            </p>
          </div>
        </div>
        <svg className="wave-svg" viewBox="0 0 1440 200" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path fill="#3D5CFF">
            <animate
              attributeName="d"
              dur="8s"
              repeatCount="indefinite"
              values="
                M0,100 Q60,50 120,80 T240,100 T360,80 T480,100 T600,80 T720,100 T840,80 T960,100 T1080,80 T1200,100 T1320,80 T1440,100 L1440,200 L0,200 Z;
                M0,80 Q60,110 120,90 T240,80 T360,90 T480,80 T600,90 T720,80 T840,90 T960,80 T1080,90 T1200,80 T1320,90 T1440,80 L1440,200 L0,200 Z;
                M0,90 Q60,70 120,85 T240,95 T360,75 T480,95 T600,75 T720,95 T840,75 T960,95 T1080,75 T1200,95 T1320,75 T1440,95 L1440,200 L0,200 Z;
                M0,100 Q60,50 120,80 T240,100 T360,80 T480,100 T600,80 T720,100 T840,80 T960,100 T1080,80 T1200,100 T1320,80 T1440,100 L1440,200 L0,200 Z
              "
            />
          </path>
        </svg>
      </PageSection>

      <section className="marquee marquee-bottom" aria-label="Location ticker">
        <div className="marquee-content-bottom">
          <span className="marquee-sequence">
            {bottomMarqueePhrases.map((phrase, index) => (
              <span className="marquee-item" key={`bottom-${index}`}>
                {phrase}
              </span>
            ))}
          </span>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Newsletter</h3>
            <form
              className="newsletter-form"
              onSubmit={(event) => {
                event.preventDefault();
              }}
            >
              <input type="email" className="newsletter-input" placeholder="Your email" aria-label="Email address" />
              <button type="submit" className="newsletter-btn">
                Submit →
              </button>
            </form>
          </div>
          <div className="footer-section">
            <h3>Scarborough Hours</h3>
            <p>
              Sunday 10am-5pm
              <br />
              Monday-Saturday 9am-6pm
            </p>
          </div>
          <div className="footer-section">
            <h3>Eataly Hours</h3>
            <p>
              Sunday-Thursday 8am-9pm
              <br />
              Friday-Saturday 8am-11pm
            </p>
          </div>
          <div className="footer-section">
            <h3>Address</h3>
            <p>
              2101 Lawrence Avenue
              <br />
              Scarborough, ON M1R 3C3
            </p>
          </div>
          <div className="footer-section">
            <h3>Join our team</h3>
            <p>careers@dianasseafod.com</p>
          </div>
        </div>
      </footer>
    </>
  );
}
