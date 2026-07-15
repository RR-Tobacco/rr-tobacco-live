import { useMemo, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageBanner } from '../components/ui/PageBanner';
import { Skeleton } from '../components/ui/Skeleton';
import { useGallery } from '../hooks/useData';

export function GalleryPage() {
  const { data: gallery, isLoading } = useGallery();
  const items = useMemo(() => gallery ?? [], [gallery]);

  const tags = useMemo(() => {
    const set = new Set<string>();
    items.forEach((g) => { if (g.tag) set.add(g.tag); });
    return ['All', ...Array.from(set)];
  }, [items]);

  const [activeTag, setActiveTag] = useState('All');
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = useMemo(() => {
    if (activeTag === 'All') return items;
    return items.filter((g) => g.tag === activeTag);
  }, [items, activeTag]);

  const closeLightbox = useCallback(() => setLightbox(null), []);

  const navigate = useCallback(
    (dir: number) => {
      setLightbox((curr) => {
        if (curr === null) return curr;
        const next = curr + dir;
        if (next < 0) return filtered.length - 1;
        if (next >= filtered.length) return 0;
        return next;
      });
    },
    [filtered.length],
  );

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') navigate(1);
      if (e.key === 'ArrowLeft') navigate(-1);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [lightbox, closeLightbox, navigate]);

  return (
    <>
      <PageBanner
        eyebrow="Visual Showcase"
        title="Gallery"
        subtitle="A glimpse into our warehouses, sourcing origins, craftsmanship, and the premium products we deliver to business partners worldwide."
        image="https://images.pexels.com/photos/4483610/pexels-photo-4483610.jpeg?auto=compress&cs=tinysrgb&w=1600"
      />

      <section className="py-12 md:py-16">
        <div className="container-luxury">
          {/* Tag filter */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar mb-10 justify-center flex-wrap">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`shrink-0 rounded-pill px-5 py-2 text-sm font-medium transition-all ${
                  activeTag === tag
                    ? 'bg-gold-400 text-brown-800'
                    : 'bg-white text-brown-600 border border-brown-200 hover:border-gold-400'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Masonry grid */}
          {isLoading ? (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
              {[...Array(9)].map((_, i) => (
                <Skeleton key={i} className={`mb-4 rounded-2xl ${i % 3 === 0 ? 'h-80' : i % 3 === 1 ? 'h-60' : 'h-72'}`} />
              ))}
            </div>
          ) : (
            <motion.div layout className="columns-1 sm:columns-2 lg:columns-3 gap-4">
              {filtered.map((item, i) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="break-inside-avoid mb-4 group relative overflow-hidden rounded-2xl cursor-pointer shadow-soft"
                  onClick={() => setLightbox(i)}
                >
                  <img
                    src={item.image_url}
                    alt={item.title}
                    loading="lazy"
                    className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brown-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-5">
                    <div>
                      {item.tag && <span className="text-gold-400 text-xs uppercase tracking-wider">{item.tag}</span>}
                      <p className="text-cream font-medium">{item.title}</p>
                    </div>
                  </div>
                  <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-brown-900/60 text-cream flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <i className="bi bi-arrows-fullscreen" />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && filtered[lightbox] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-brown-900/95 backdrop-blur-md flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            {/* Close */}
            <button
              className="absolute top-5 right-5 w-11 h-11 rounded-full border border-gold-400/30 text-cream flex items-center justify-center hover:bg-gold-400/10 z-10"
              onClick={closeLightbox}
              aria-label="Close"
            >
              <i className="bi bi-x-lg text-lg" />
            </button>

            {/* Prev */}
            <button
              className="absolute left-4 md:left-8 w-12 h-12 rounded-full border border-gold-400/30 text-cream flex items-center justify-center hover:bg-gold-400/10 z-10"
              onClick={(e) => { e.stopPropagation(); navigate(-1); }}
              aria-label="Previous"
            >
              <i className="bi bi-chevron-left text-xl" />
            </button>

            {/* Image */}
            <motion.div
              key={lightbox}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="max-w-4xl max-h-[80vh] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={filtered[lightbox].image_url}
                alt={filtered[lightbox].title}
                className="max-w-full max-h-[70vh] object-contain rounded-2xl"
              />
              <div className="text-center mt-4">
                {filtered[lightbox].tag && (
                  <span className="text-gold-400 text-xs uppercase tracking-wider">{filtered[lightbox].tag}</span>
                )}
                <p className="text-cream font-heading text-lg">{filtered[lightbox].title}</p>
                <p className="text-cream/40 text-xs mt-1">{lightbox + 1} of {filtered.length}</p>
              </div>
            </motion.div>

            {/* Next */}
            <button
              className="absolute right-4 md:right-8 w-12 h-12 rounded-full border border-gold-400/30 text-cream flex items-center justify-center hover:bg-gold-400/10 z-10"
              onClick={(e) => { e.stopPropagation(); navigate(1); }}
              aria-label="Next"
            >
              <i className="bi bi-chevron-right text-xl" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
