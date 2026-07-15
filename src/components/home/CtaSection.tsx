import { Link } from 'react-router-dom';
import { Reveal } from '../ui/Animation';

export function CtaSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="container-luxury">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-luxury-dark px-8 py-16 md:px-16 md:py-20 text-center">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, #d4af37 1.5px, transparent 1.5px)', backgroundSize: '50px 50px' }} />
            <div className="relative z-10 max-w-2xl mx-auto">
              <span className="section-eyebrow text-gold-400">Partner With Us</span>
              <h2 className="font-heading text-3xl md:text-5xl font-bold text-cream leading-tight mb-6">
                Ready to Elevate Your Tobacco Business?
              </h2>
              <p className="text-cream/70 text-lg leading-relaxed mb-8">
                Join 480+ wholesalers and distributors who trust RR Tobacco for premium quality,
                reliable supply, and competitive wholesale terms.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link to="/contact" className="btn-gold">
                  <i className="bi bi-headset" /> Contact Sales
                </Link>
                <Link to="/products" className="btn-outline-gold">
                  Browse Products <i className="bi bi-arrow-right" />
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
