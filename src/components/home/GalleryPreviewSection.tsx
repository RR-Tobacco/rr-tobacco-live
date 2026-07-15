import { Link } from 'react-router-dom';
import { Reveal, Stagger, StaggerItem } from '../ui/Animation';
import { Skeleton } from '../ui/Skeleton';
import { useGallery } from '../../hooks/useData';

export function GalleryPreviewSection() {
  const { data: gallery, isLoading } = useGallery();
  const items = (gallery ?? []).slice(0, 6);

  return (
    <section className="relative overflow-hidden py-20 md:py-28 bg-luxury-dark text-cream">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(212,175,55,0.08),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.05),transparent_35%)]" />
      <div className="container-luxury relative">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="section-eyebrow text-gold-400">Inside RR Tobacco</span>
              <h2 className="section-heading text-cream">Gallery Preview</h2>
              <div className="gold-divider mt-4" />
            </div>
            <Link to="/gallery" className="btn-gold shrink-0">
              Full Gallery <i className="bi bi-images" />
            </Link>
          </div>
        </Reveal>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => <Skeleton key={i} className="aspect-[4/3] rounded-2xl" />)}
          </div>
        ) : (
          <Stagger className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {items.map((item, i) => (
              <StaggerItem key={item.id}>
                <div className={`group relative overflow-hidden rounded-2xl cursor-pointer ${i === 0 ? 'col-span-2 row-span-2 aspect-square' : 'aspect-[4/3]'}`}>
                  <img
                    src={item.image_url}
                    alt={item.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brown-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4">
                    <div>
                      <span className="text-gold-400 text-xs uppercase tracking-wider">{item.tag}</span>
                      <p className="text-cream font-medium text-sm">{item.title}</p>
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
