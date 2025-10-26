import type { ReactNode } from 'react';

export interface FeatureGridItem {
  icon: ReactNode;
  title: string;
  description: string;
  accent?: 'primary' | 'secondary' | 'tertiary' | 'quaternary';
}

interface FeatureGridProps {
  items: FeatureGridItem[];
}

const accentBackgrounds: Record<NonNullable<FeatureGridItem['accent']>, string> = {
  primary: 'linear-gradient(135deg, #6b46c1, #fc8181)',
  secondary: 'linear-gradient(135deg, #ff5722, #ffc107)',
  tertiary: 'linear-gradient(135deg, #ff6b35, #f7931e)',
  quaternary: 'linear-gradient(135deg, #00a86b, #45b7d1)',
};

export default function FeatureGrid({ items }: FeatureGridProps) {
  return (
    <div className="product-grid">
      {items.map((item, index) => {
        const accentKey = item.accent ?? 'primary';
        const background =
          accentBackgrounds[accentKey as keyof typeof accentBackgrounds] ?? accentBackgrounds.primary;

        return (
          <div className="product-card" key={`${item.title}-${index}`}>
            <div className="product-image" style={{ background }}>
              {item.icon}
            </div>
            <div className="product-info">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
