import { Link } from 'react-router-dom';
import type { Product } from '../../types';
import { getProductType } from '../../lib/productType';

interface ProductCardProps {
  product: Product;
  onRequestQuote: (productName: string) => void;
  onGetSample: (productName: string) => void;
  onDetails: (slug: string) => void;
}

export function ProductCard({ product, onRequestQuote, onGetSample, onDetails }: ProductCardProps) {
  const image = product.images?.[0] ?? '';
  const productType = getProductType(product);
  const features = Object.entries(product.specifications ?? {}).slice(0, 3);

  return (
    <div className="theme-panel group h-full flex flex-col overflow-hidden transition-all duration-500 hover:-translate-y-2">
      <div className="relative overflow-hidden aspect-[4/3] cursor-pointer" onClick={() => onDetails(product.slug)}>
        <img
          src={image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brown-900/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          <span className="inline-flex items-center gap-2 bg-brown-900/90 text-cream text-[11px] font-semibold uppercase tracking-[0.25em] rounded-full px-3 py-1">
            <i className="bi bi-shield-lock-fill text-gold-300" /> Wholesale Only
          </span>
          {product.is_featured && (
            <span className="inline-flex items-center gap-2 bg-gold-400 text-brown-800 text-[11px] font-semibold uppercase tracking-[0.25em] rounded-full px-3 py-1">
              <i className="bi bi-star-fill" /> Featured
            </span>
          )}
        </div>
        <div className="absolute bottom-3 left-3 right-3 flex gap-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
          <button onClick={() => onDetails(product.slug)} className="btn-luxury !px-4 !py-2 !text-xs bg-white/90 text-brown-800 hover:bg-white flex-1">
            <i className="bi bi-eye me-1" /> View
          </button>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        {product.category?.name && (
          <span className="font-btn text-[10px] font-semibold uppercase tracking-[0.3em] text-gold-600 mb-2">
            {product.category.name}
          </span>
        )}

        <div className="flex items-center gap-3 mb-3">
          <img src={productType.image} alt={productType.label} className="w-9 h-9 rounded-full border border-gold-400/15 object-cover" />
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-cream/70">Product Type</p>
            <p className="font-heading font-semibold text-sm text-cream">{productType.label}</p>
          </div>
        </div>

        <h3 className="font-heading text-lg font-bold text-cream leading-snug mb-3 line-clamp-2">
          {product.name}
        </h3>
        <p className="text-sm text-cream/70 mb-4 line-clamp-2 flex-1">
          {product.short_description ?? productType.description}
        </p>

        <div className="grid grid-cols-2 gap-2 mb-4">
          <span className="inline-flex items-center gap-1 text-xs font-medium text-cream bg-white/10 px-3 py-1.5 rounded-full">
            <i className="bi bi-box-seam text-gold-400" /> MOQ: {product.moq}
          </span>
          <span className="inline-flex items-center gap-1 text-xs font-medium text-cream bg-white/10 px-3 py-1.5 rounded-full">
            <i className="bi bi-box text-gold-400" /> {product.packaging}
          </span>
        </div>

        <div className="mb-4 space-y-2">
          {features.length > 0 ? (
            features.map(([key, value]) => (
              <p key={key} className="text-sm text-cream/70 leading-snug">
                <span className="font-semibold text-cream">{key}:</span> {value}
              </p>
            ))
          ) : (
            <p className="text-sm text-cream/70">Premium tobacco product for wholesale and international buyers.</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3 mt-auto">
          <button
            type="button"
            onClick={() => onGetSample(product.name)}
            className="btn-secondary-luxury !py-2 !text-sm border border-brown-200 bg-white text-brown-800 hover:bg-brown-50"
          >
            <i className="bi bi-box-arrow-in-right" /> Get Sample
          </button>
          <button
            type="button"
            onClick={() => onRequestQuote(product.name)}
            className="btn-gold !py-2 !text-sm"
          >
            <i className="bi bi-file-earmark-text" /> Quote
          </button>
        </div>
      </div>
    </div>
  );
}

export function ProductCardLinkWrapper({ to, children }: { to: string; children: React.ReactNode }) {
  return <Link to={to}>{children}</Link>;
}
