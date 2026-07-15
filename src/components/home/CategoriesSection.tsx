import { Link } from 'react-router-dom';
import { Reveal, Stagger, StaggerItem } from '../ui/Animation';
import { SectionHeading } from '../ui/SectionHeading';
import { Skeleton } from '../ui/Skeleton';
import { useCategories } from '../../hooks/useData';

export function CategoriesSection() {
  const { data: categories, isLoading } = useCategories();
  const active = categories ?? [];

  return (
    <section className="py-20 md:py-28">
      <div className="container-luxury">
        <Reveal>
          <SectionHeading
            eyebrow="Our Range"
            title="Product Categories"
            subtitle="Explore our curated wholesale categories, each sourced and crafted to meet the exacting standards of distributors and retailers worldwide."
            center
          />
        </Reveal>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="aspect-[3/4] rounded-3xl" />
            ))}
          </div>
        ) : (
          <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {active.map((cat) => (
              <StaggerItem key={cat.id}>
                <Link to="/products" className="group block relative overflow-hidden rounded-3xl aspect-[3/4] shadow-soft">
                  <img
                    src={cat.image_url ?? ''}
                    alt={cat.name}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brown-900/90 via-brown-900/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="font-heading text-xl font-bold text-cream mb-2">{cat.name}</h3>
                    <p className="text-cream/70 text-sm line-clamp-2 mb-3">{cat.description}</p>
                    <span className="inline-flex items-center gap-2 text-gold-400 text-sm font-medium group-hover:gap-3 transition-all">
                      Explore <i className="bi bi-arrow-right" />
                    </span>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        )}
      </div>
    </section>
  );
}
