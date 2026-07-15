import { Reveal, Stagger, StaggerItem } from '../ui/Animation';
import { ProductCard } from '../ui/ProductCard';
import { ProductCardSkeleton } from '../ui/Skeleton';
import { useProducts } from '../../hooks/useData';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { QuoteModal } from '../QuoteModal';

export function FeaturedProductsSection() {
  const { data: products, isLoading } = useProducts();
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [quoteProduct, setQuoteProduct] = useState('');

  const featured = (products ?? []).filter((p) => p.is_featured).slice(0, 4);
  const display = featured.length >= 4 ? featured : (products ?? []).slice(0, 4);

  const handleQuote = (name: string) => {
    setQuoteProduct(name);
    setQuoteOpen(true);
  };

  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(212,175,55,0.12),transparent_40%)]" />
      <div className="container-luxury relative">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="section-eyebrow">Handpicked Selection</span>
              <h2 className="section-heading">Featured Products</h2>
              <div className="gold-divider mt-4" />
            </div>
            <Link to="/products" className="btn-gold shrink-0 bg-gold-400 text-brown-950 hover:bg-gold-500 hover:text-brown-950">
              View All Products <i className="bi bi-arrow-right" />
            </Link>
          </div>
        </Reveal>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => <ProductCardSkeleton key={i} />)}
          </div>
        ) : (
          <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {display.map((product) => (
              <StaggerItem key={product.id}>
                <ProductCard
                  product={product}
                  onRequestQuote={handleQuote}
                  onGetSample={handleQuote}
                  onDetails={() => {}}
                />
              </StaggerItem>
            ))}
          </Stagger>
        )}
      </div>

      <QuoteModal open={quoteOpen} onClose={() => setQuoteOpen(false)} productName={quoteProduct} />
    </section>
  );
}
