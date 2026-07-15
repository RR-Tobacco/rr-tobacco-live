import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useHeroSliders } from '../../hooks/useData';
import { Skeleton } from '../ui/Skeleton';

export function HeroSection() {
  const { data: slides, isLoading } = useHeroSliders();
  const [index, setIndex] = useState(0);

  const activeSlides = slides ?? [];

  useEffect(() => {
    if (activeSlides.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % activeSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [activeSlides.length]);

  if (isLoading) {
    return (
      <section className="relative h-screen min-h-[600px] bg-brown-900 flex items-center justify-center">
        <Skeleton className="absolute inset-0 !rounded-none" />
      </section>
    );
  }

  if (activeSlides.length === 0) {
    return (
      <section className="relative h-screen min-h-[600px] bg-luxury-dark flex items-center">
        <div className="container-luxury text-center">
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-cream mb-4">RR Tobacco</h1>
          <p className="text-cream/70 text-lg">Premium Tobacco Wholesale Supplier</p>
          <Link to="/contact" className="btn-gold mt-8 inline-flex">Contact Sales</Link>
        </div>
      </section>
    );
  }

  const slide = activeSlides[index];

  return (
    <section className="relative h-screen min-h-[600px] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="absolute inset-0"
        >
          <img src={slide.image_url} alt={slide.title} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(212,175,55,0.16),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.08),transparent_35%)]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#100b09]/95 via-[#100b09]/70 to-[#100b09]/25" />
          <div className="absolute -bottom-14 -right-14 h-56 w-56 rounded-full bg-gold-400/20 blur-3xl" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container-luxury">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-2xl"
            >
              <span className="section-eyebrow text-gold-400">Premium Wholesale Supplier</span>
              <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-cream leading-[1.1] text-shadow-lg mb-6">
                {slide.title}
              </h1>
              <p className="text-cream/80 text-lg md:text-xl leading-relaxed mb-8 max-w-xl">
                {slide.subtitle}
              </p>
              <div className="flex flex-wrap gap-4">
                {slide.button_text && slide.button_link && (
                  <Link to={slide.button_link} className="btn-gold">
                    <i className="bi bi-arrow-right" /> {slide.button_text}
                  </Link>
                )}
                <Link to="/products" className="btn-outline-gold">
                  Browse Catalog
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Dots */}
      {activeSlides.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {activeSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === index ? 'w-8 bg-gold-400' : 'w-2 bg-cream/40 hover:bg-cream/70'
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      )}

      {/* Scroll indicator */}
      <div className="absolute bottom-8 right-8 z-20 hidden md:flex flex-col items-center gap-2 text-cream/50">
        <span className="text-xs uppercase tracking-widest [writing-mode:vertical-rl]">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
          className="w-[1px] h-12 bg-gold-400"
        />
      </div>
    </section>
  );
}
