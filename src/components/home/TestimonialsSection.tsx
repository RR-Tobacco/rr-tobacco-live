import { Reveal, Stagger, StaggerItem } from '../ui/Animation';
import { SectionHeading } from '../ui/SectionHeading';
import { Skeleton } from '../ui/Skeleton';
import { useTestimonials } from '../../hooks/useData';

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1 mb-4">
      {[...Array(5)].map((_, i) => (
        <i key={i} className={`bi bi-star${i < rating ? '-fill' : ''} text-gold-400 text-sm`} />
      ))}
    </div>
  );
}

export function TestimonialsSection() {
  const { data: testimonials, isLoading } = useTestimonials();
  const items = testimonials ?? [];

  return (
    <section className="py-20 md:py-28">
      <div className="container-luxury">
        <Reveal>
          <SectionHeading
            eyebrow="Trusted Partners"
            title="What Our Partners Say"
            subtitle="Wholesalers, distributors, and retailers who trust RR Tobacco to supply their business."
            center
          />
        </Reveal>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-64 rounded-3xl" />)}
          </div>
        ) : (
          <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {items.map((t) => (
              <StaggerItem key={t.id}>
                <div className="card-luxury p-7 h-full flex flex-col">
                  <i className="bi bi-quote text-4xl text-gold-400/30 mb-2" />
                  <Stars rating={t.rating} />
                  <p className="text-brown-600 text-sm leading-relaxed flex-1 mb-6 italic">
                    "{t.message}"
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-brown-100">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-brown-100 shrink-0">
                      {t.image_url && <img src={t.image_url} alt={t.name} className="h-full w-full object-cover" loading="lazy" />}
                    </div>
                    <div>
                      <p className="font-heading font-semibold text-brown-800 text-sm">{t.name}</p>
                      <p className="text-brown-400 text-xs">{t.role}, {t.company}</p>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        )}
      </div>
    </section>
  );
}
