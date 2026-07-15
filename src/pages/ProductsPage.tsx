import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { PageBanner } from '../components/ui/PageBanner';
import { ProductCard } from '../components/ui/ProductCard';
import { ProductDetailModal } from '../components/ProductDetailModal';
import { QuoteModal } from '../components/QuoteModal';
import type { Category, Product } from '../types';

type SortKey = 'featured' | 'name-asc' | 'name-desc' | 'newest';

const staticCategories: Category[] = [
  { id: 'biri-patti', name: 'Biri Patti', slug: 'biri-patti', description: 'Premium Desi Bhuko category', image_url: null, sort_order: 1, is_active: true, created_at: '2026-01-01T00:00:00Z' },
  { id: 'ravo', name: 'Ravo', slug: 'ravo', description: 'Processed Ravo tobacco products', image_url: null, sort_order: 2, is_active: true, created_at: '2026-01-01T00:00:00Z' },
  { id: 'dust', name: 'Dust', slug: 'dust', description: 'Raw tobacco dust products', image_url: null, sort_order: 3, is_active: true, created_at: '2026-01-01T00:00:00Z' },
  { id: 'kandi', name: 'Kandi', slug: 'kandi', description: 'Kandi tobacco products', image_url: null, sort_order: 4, is_active: true, created_at: '2026-01-01T00:00:00Z' },
];

const staticProducts: Product[] = [
  {
    id: 'desi-bhuko',
    name: 'Desi Bhuko',
    slug: 'desi-bhuko',
    category_id: 'biri-patti',
    short_description: 'Premium Desi Bhuko tobacco from selected Desi Tamaku leaves.',
    description: 'Premium Desi Bhuko tobacco made from selected Desi Tamaku leaves. Suitable for traditional tobacco manufacturing with consistent quality.',
    moq: '10 boxes',
    packaging: 'Bulk Poly Bags',
    images: ['https://images.pexels.com/photos/11187632/pexels-photo-11187632.jpeg?auto=compress&cs=tinysrgb&w=1200'],
    specifications: {
      'Natural Tobacco': 'Pure leaf, no additives',
      'Premium Quality': 'Selected grade for export',
      'Wholesale Supply': 'Large quantity ready',
    },
    origin: 'India',
    is_featured: true,
    is_active: true,
    sort_order: 1,
    created_at: '2026-01-01T00:00:00Z',
    category: staticCategories[0],
  },
  {
    id: 'ravo-16',
    name: 'Ravo No.16',
    slug: 'ravo-16',
    category_id: 'ravo',
    short_description: 'Uniformly cut, moisture-balanced Ravo for wholesale orders.',
    description: 'Carefully processed tobacco with uniform cutting and moisture balance for industrial and wholesale requirements.',
    moq: '20 bags',
    packaging: 'PP Bags',
    images: ['https://images.pexels.com/photos/4505236/pexels-photo-4505236.jpeg?auto=compress&cs=tinysrgb&w=1200'],
    specifications: {
      'Premium Grade': 'Highest available grade',
      'Uniform Texture': 'Consistent processing',
      'Bulk Supply': 'Ready for large orders',
    },
    origin: 'India',
    is_featured: true,
    is_active: true,
    sort_order: 2,
    created_at: '2026-01-01T00:00:00Z',
    category: staticCategories[1],
  },
  {
    id: 'ravo-18',
    name: 'Ravo No.18',
    slug: 'ravo-18',
    category_id: 'ravo',
    short_description: 'Selected tobacco processed under strict quality standards.',
    description: 'Selected tobacco processed under strict quality standards to ensure excellent consistency and aroma.',
    moq: '20 bags',
    packaging: 'PP Bags',
    images: ['https://images.pexels.com/photos/4505225/pexels-photo-4505225.jpeg?auto=compress&cs=tinysrgb&w=1200'],
    specifications: {
      'Medium Cut': 'Balanced particle size',
      'High Quality': 'Carefully sorted leaf',
      'Export Ready': 'Packed for international shipment',
    },
    origin: 'India',
    is_featured: true,
    is_active: true,
    sort_order: 3,
    created_at: '2026-01-01T00:00:00Z',
    category: staticCategories[1],
  },
  {
    id: 'ravo-20',
    name: 'Ravo No.20',
    slug: 'ravo-20',
    category_id: 'ravo',
    short_description: 'Fine-quality Ravo tobacco with natural aroma for manufacturing.',
    description: 'Fine-quality tobacco with excellent texture and natural aroma, ideal for various tobacco manufacturing applications.',
    moq: '20 bags',
    packaging: 'PP Bags',
    images: ['https://images.pexels.com/photos/210632/pexels-photo-210632.jpeg?auto=compress&cs=tinysrgb&w=1200'],
    specifications: {
      'Fine Grade': 'Smooth and even cut',
      'Natural Aroma': 'Retains natural leaf scent',
      'Bulk Orders': 'Ideal for large production',
    },
    origin: 'India',
    is_featured: false,
    is_active: true,
    sort_order: 4,
    created_at: '2026-01-01T00:00:00Z',
    category: staticCategories[1],
  },
  {
    id: 'kukar-ravo',
    name: 'Kukar Ravo',
    slug: 'kukar-ravo',
    category_id: 'ravo',
    short_description: 'Custom-processed Ravo tobacco with premium quality control.',
    description: 'Specially processed Ravo tobacco prepared according to customer requirements with premium quality control.',
    moq: '20 bags',
    packaging: 'PP Bags',
    images: ['https://images.pexels.com/photos/327625/pexels-photo-327625.jpeg?auto=compress&cs=tinysrgb&w=1200'],
    specifications: {
      'Premium Processing': 'Tailored to customer needs',
      'Uniform Quality': 'Consistent batches',
      'Bulk Packaging': 'Wholesale-ready packaging',
    },
    origin: 'India',
    is_featured: false,
    is_active: true,
    sort_order: 5,
    created_at: '2026-01-01T00:00:00Z',
    category: staticCategories[1],
  },
  {
    id: 'raw-tobacco-dust',
    name: 'Raw Tobacco Dust',
    slug: 'raw-tobacco-dust',
    category_id: 'dust',
    short_description: 'High-quality raw tobacco dust with natural character.',
    description: 'High-quality raw tobacco dust collected during processing while maintaining natural characteristics.',
    moq: '25 bags',
    packaging: 'Sacks',
    images: ['https://images.pexels.com/photos/1255356/pexels-photo-1255356.jpeg?auto=compress&cs=tinysrgb&w=1200'],
    specifications: {
      'Natural Tobacco Dust': 'Retains natural leaf traits',
      'Industrial Grade': 'High-quality industrial product',
      'Bulk Supply': 'Ready for immediate dispatch',
    },
    origin: 'India',
    is_featured: false,
    is_active: true,
    sort_order: 6,
    created_at: '2026-01-01T00:00:00Z',
    category: staticCategories[2],
  },
  {
    id: 'kandi-ravo',
    name: 'Kandi Ravo',
    slug: 'kandi-ravo',
    category_id: 'kandi',
    short_description: 'Premium Kandi tobacco product made from selected leaves.',
    description: 'Premium Kandi tobacco products manufactured using carefully selected tobacco leaves.',
    moq: '20 bags',
    packaging: 'Kandi Bundles',
    images: ['https://images.pexels.com/photos/1255356/pexels-photo-1255356.jpeg?auto=compress&cs=tinysrgb&w=1200'],
    specifications: {
      'Premium Grade': 'Carefully selected tobacco',
      'Natural Processing': 'Minimal handling for purity',
      'Bulk Supply': 'Wholesale-ready volumes',
    },
    origin: 'India',
    is_featured: false,
    is_active: true,
    sort_order: 7,
    created_at: '2026-01-01T00:00:00Z',
    category: staticCategories[3],
  },
  {
    id: 'raw-kandi-tobacco-dust',
    name: 'Raw Kandi Tobacco Dust',
    slug: 'raw-kandi-tobacco-dust',
    category_id: 'dust',
    short_description: 'Fine raw Kandi tobacco dust for industrial use.',
    description: 'Fine-quality raw Kandi tobacco dust suitable for industrial and wholesale requirements.',
    moq: '25 bags',
    packaging: 'Sacks',
    images: ['https://images.pexels.com/photos/164767/pexels-photo-164767.jpeg?auto=compress&cs=tinysrgb&w=1200'],
    specifications: {
      'Premium Grade': 'High-quality Kandi dust',
      'Natural Processing': 'Maintains natural leaf properties',
      'Bulk Supply': 'Large quantities available',
    },
    origin: 'India',
    is_featured: false,
    is_active: true,
    sort_order: 8,
    created_at: '2026-01-01T00:00:00Z',
    category: staticCategories[3],
  },
];

export function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<SortKey>('featured');
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [quoteProduct, setQuoteProduct] = useState('');

  const filtered = useMemo(() => {
    let list = staticProducts;
    if (activeCategory !== 'all') {
      list = list.filter((p) => p.category?.slug === activeCategory);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.short_description?.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q),
      );
    }
    const sorted = [...list];
    switch (sort) {
      case 'name-asc':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'newest':
        sorted.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        break;
      default:
        sorted.sort((a, b) => Number(b.is_featured) - Number(a.is_featured) || a.sort_order - b.sort_order);
    }
    return sorted;
  }, [activeCategory, search, sort]);

  const selectedProduct: Product | null = useMemo(() => {
    if (!selectedSlug) return null;
    return staticProducts.find((p) => p.slug === selectedSlug) ?? null;
  }, [selectedSlug]);

  const handleQuote = (name: string) => {
    setQuoteProduct(name);
    setQuoteOpen(true);
  };

  const handleSample = (name: string) => {
    setQuoteProduct(`${name} - Sample Request`);
    setQuoteOpen(true);
  };

  const cats = staticCategories;

  return (
    <>
      <PageBanner
        eyebrow="Wholesale Catalog"
        title="Our Products"
        subtitle="Premium cigars, pipe tobacco, rolling tobacco, and accessories — curated for wholesalers, distributors, and retail partners."
        image="https://images.pexels.com/photos/14017014/pexels-photo-14017014.jpeg?auto=compress&cs=tinysrgb&w=1600"
      />

      {/* Sticky filter bar */}
      <div className="sticky top-16 z-30 bg-luxury-dark/95 backdrop-blur-md border-b border-gold-400/20 py-4">
        <div className="container-luxury">
          <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
            {/* Category pills */}
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
              <button
                onClick={() => setActiveCategory('all')}
                className={`shrink-0 rounded-pill px-4 py-2 text-sm font-medium transition-all ${
                  activeCategory === 'all'
                    ? 'bg-gold-400 text-brown-800'
                    : 'bg-white text-brown-600 border border-brown-200 hover:border-gold-400'
                }`}
              >
                All Products
              </button>
              {cats.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.slug)}
                  className={`shrink-0 rounded-pill px-4 py-2 text-sm font-medium transition-all ${
                    activeCategory === cat.slug
                      ? 'bg-gold-400 text-brown-800'
                      : 'bg-white text-brown-600 border border-brown-200 hover:border-gold-400'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            <div className="flex gap-3 items-center">
              {/* Search */}
              <div className="relative flex-1 lg:w-56">
                <i className="bi bi-search absolute left-3 top-1/2 -translate-y-1/2 text-brown-400 text-sm" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search products..."
                  className="w-full rounded-pill border border-brown-200 bg-white pl-9 pr-4 py-2 text-sm text-brown-800 outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 transition"
                />
              </div>
              {/* Sort */}
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="rounded-pill border border-brown-200 bg-white px-4 py-2 text-sm text-brown-800 outline-none focus:border-gold-400 cursor-pointer"
              >
                <option value="featured">Featured First</option>
                <option value="name-asc">Name A-Z</option>
                <option value="name-desc">Name Z-A</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Product grid */}
      <section className="py-12 md:py-16 bg-luxury-dark">
        <div className="container-luxury">
          <div className="flex items-center justify-between mb-8">
            <p className="text-cream/70 text-sm">
              Showing <span className="font-semibold text-cream">{filtered.length}</span> product{filtered.length !== 1 ? 's' : ''}
            </p>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <i className="bi bi-search text-5xl text-cream/40 mb-4 block" />
              <h3 className="font-heading text-xl font-semibold text-cream mb-2">No Products Found</h3>
              <p className="text-cream/60 text-sm mb-6">Try adjusting your filters or search terms.</p>
              <button
                onClick={() => { setActiveCategory('all'); setSearch(''); }}
                className="btn-secondary-luxury"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {filtered.map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProductCard
                    product={product}
                    onRequestQuote={handleQuote}
                    onGetSample={handleSample}
                    onDetails={setSelectedSlug}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedSlug(null)}
        onRequestQuote={(name) => {
          setSelectedSlug(null);
          handleQuote(name);
        }}
      />
      <QuoteModal open={quoteOpen} onClose={() => setQuoteOpen(false)} productName={quoteProduct} />
    </>
  );
}
