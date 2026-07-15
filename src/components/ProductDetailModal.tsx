import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Product } from '../types';
import { getProductType } from '../lib/productType';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onRequestQuote: (productName: string) => void;
}

export function ProductDetailModal({ product, onClose, onRequestQuote }: ProductDetailModalProps) {
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    setActiveImage(0);
  }, [product]);

  useEffect(() => {
    document.body.style.overflow = product ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [product]);

  const specEntries = product ? Object.entries(product.specifications) : [];

  return (
    <AnimatePresence>
      {product && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-brown-900/80 backdrop-blur-sm"
            onClick={onClose}
          />
          <div className="fixed inset-0 z-[95] flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-4xl bg-cream rounded-3xl shadow-dark overflow-hidden my-8"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-brown-800/80 text-cream flex items-center justify-center hover:bg-brown-800"
                aria-label="Close"
              >
                <i className="bi bi-x-lg" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Image gallery */}
                <div className="bg-brown-900 p-6">
                  <div className="overflow-hidden rounded-2xl mb-4 aspect-square">
                    <img
                      src={product.images[activeImage]}
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  {product.images.length > 1 && (
                    <div className="flex gap-2 overflow-x-auto no-scrollbar">
                      {product.images.map((img, i) => (
                        <button
                          key={i}
                          onClick={() => setActiveImage(i)}
                          className={`shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition ${
                            activeImage === i ? 'border-gold-400' : 'border-transparent opacity-60 hover:opacity-100'
                          }`}
                        >
                          <img src={img} alt={`${product.name} ${i + 1}`} className="h-full w-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="p-6 md:p-8 overflow-y-auto max-h-[80vh]">
                  {product.category?.name && (
                    <span className="font-btn text-xs font-semibold uppercase tracking-wider text-gold-600">
                      {product.category.name}
                    </span>
                  )}
                  <div className="flex items-center gap-3 mt-3 mb-4">
                    <img src={getProductType(product).image} alt={getProductType(product).label} className="w-10 h-10 rounded-full border border-brown-200" />
                    <div>
                      <p className="text-xs uppercase tracking-wider text-brown-500">Product Type</p>
                      <p className="font-heading text-lg font-semibold text-brown-800">{getProductType(product).label}</p>
                    </div>
                  </div>
                  <h3 className="font-heading text-2xl md:text-3xl font-bold text-brown-800 mt-1 mb-3">
                    {product.name}
                  </h3>
                  {product.origin && (
                    <p className="text-sm text-brown-500 mb-4 flex items-center gap-2">
                      <i className="bi bi-geo-alt text-gold-500" /> Origin: {product.origin}
                    </p>
                  )}

                  <p className="text-brown-600 text-sm leading-relaxed mb-6">
                    {product.description}
                  </p>

                  {/* MOQ + Packaging */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="bg-white rounded-xl p-4 border border-brown-100">
                      <p className="text-xs text-brown-400 uppercase tracking-wide mb-1">Minimum Order</p>
                      <p className="font-heading font-semibold text-brown-800">{product.moq}</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-brown-100">
                      <p className="text-xs text-brown-400 uppercase tracking-wide mb-1">Packaging</p>
                      <p className="font-heading font-semibold text-brown-800">{product.packaging}</p>
                    </div>
                  </div>

                  {/* Specifications */}
                  {specEntries.length > 0 && (
                    <div className="mb-6">
                      <h4 className="font-heading text-base font-semibold text-brown-800 mb-3">Specifications</h4>
                      <dl className="space-y-2">
                        {specEntries.map(([key, val]) => (
                          <div key={key} className="flex justify-between items-center py-2 border-b border-brown-100 last:border-0">
                            <dt className="text-sm text-brown-500">{key}</dt>
                            <dd className="text-sm font-medium text-brown-800">{val}</dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  )}

                  <div className="flex items-center gap-2 mb-6">
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-green-700">
                      <i className="bi bi-check-circle-fill" /> In Stock
                    </span>
                    <span className="text-brown-300">|</span>
                    <span className="text-sm text-brown-500">Wholesale Only</span>
                  </div>

                  <button
                    onClick={() => onRequestQuote(product.name)}
                    className="btn-gold w-full"
                  >
                    <i className="bi bi-file-earmark-text" /> Wholesale Inquiry
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
