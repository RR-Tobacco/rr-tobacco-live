import { Reveal, Stagger, StaggerItem } from '../components/ui/Animation';
import { PageBanner } from '../components/ui/PageBanner';
import { SectionHeading } from '../components/ui/SectionHeading';
import { useGallery } from '../hooks/useData';

const values = [
  { icon: 'bi-gem', title: 'Quality Without Compromise', desc: 'We never sacrifice craftsmanship. Every product is aged, inspected, and approved before it reaches your shelves.' },
  { icon: 'bi-handshake', title: 'Partnership Over Transactions', desc: 'We invest in long-term relationships with our wholesalers and distributors — your growth is our growth.' },
  { icon: 'bi-people', title: 'Respect for the Craft', desc: 'From the farmers who grow the leaves to the torcedores who roll each cigar, we honor every hand in the process.' },
];

const timeline = [
  { year: '1994', title: 'The Beginning', desc: 'RR Tobacco founded as a family-owned cigar distributor serving local retailers in Florida.' },
  { year: '2002', title: 'National Expansion', desc: 'Expanded distribution to 15 states, partnering with tobacconists and retail chains across the US.' },
  { year: '2010', title: 'Global Sourcing', desc: 'Established direct sourcing relationships with premium tobacco growers in the Dominican Republic and Nicaragua.' },
  { year: '2020', title: 'International Distribution', desc: 'Crossed into 32 countries, becoming a trusted wholesale partner for distributors across four continents.' },
  { year: '2024', title: '480+ Partners', desc: 'Today, RR Tobacco proudly serves over 480 business partners worldwide with 250+ products in our catalog.' },
];

const missionVision = [
  { icon: 'bi-bullseye', title: 'Our Mission', desc: 'To empower wholesalers and retailers with premium tobacco products of uncompromising quality, delivered through reliable partnerships and ethical business practices that drive mutual growth.' },
  { icon: 'bi-eye', title: 'Our Vision', desc: 'To be the world\'s most trusted premium tobacco wholesale supplier — recognized for craftsmanship, consistency, and the lasting value we create for every business partner we serve.' },
];

export function AboutPage() {
  const { data: gallery } = useGallery();
  const warehouseImages = (gallery ?? []).filter((g) => g.tag === 'Warehouse' || g.tag === 'Logistics').slice(0, 3);

  return (
    <>
      <PageBanner
        eyebrow="About RR Tobacco"
        title="A Legacy of Premium Tobacco"
        subtitle="Three decades of sourcing, aging, and delivering the world's finest tobacco products to trusted business partners."
        image="https://images.pexels.com/photos/2888962/pexels-photo-2888962.jpeg?auto=compress&cs=tinysrgb&w=1600"
      />

      {/* Company Story */}
      <section className="py-20 md:py-28">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <Reveal>
              <div>
                <span className="section-eyebrow">Our Story</span>
                <h2 className="section-heading">From Family Business to Global Wholesale Partner</h2>
                <div className="gold-divider mt-4 mb-6" />
                <div className="space-y-4 text-cream/80 leading-relaxed">
                  <p>
                    RR Tobacco began in 1994 as a small family-owned cigar distributor in Tampa, Florida.
                    What started with a single warehouse and a handful of local retail partners has grown
                    into a globally recognized wholesale supplier serving over 480 business partners across 32 countries.
                  </p>
                  <p>
                    Our growth has always been guided by a simple principle: never compromise on quality.
                    We built direct relationships with tobacco growers in the Dominican Republic and Nicaragua,
                    invested in climate-controlled warehousing, and earned the trust of distributors who rely
                    on us for consistent, premium product.
                  </p>
                  <p>
                    Today, we offer 250+ products across cigars, pipe tobacco, rolling tobacco, and accessories —
                    each one representing the craftsmanship and care that has defined RR Tobacco for thirty years.
                  </p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="relative">
                <div className="rounded-3xl overflow-hidden shadow-dark aspect-[4/5]">
                  <img
                    src="https://images.pexels.com/photos/1637114/pexels-photo-1637114.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="RR Tobacco premium cigars"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 w-40 h-40 rounded-3xl overflow-hidden border-4 border-cream shadow-dark hidden md:block">
                  <img
                    src="https://images.pexels.com/photos/30733228/pexels-photo-30733228.jpeg?auto=compress&cs=tinysrgb&w=400"
                    alt="Tobacco farming"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 md:py-28 bg-luxury-dark">
        <div className="container-luxury">
          <Stagger className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {missionVision.map((mv) => (
              <StaggerItem key={mv.title}>
                <div className="theme-panel rounded-[1.75rem] p-8 md:p-10 h-full">
                  <div className="w-16 h-16 rounded-2xl bg-gold-400/10 border border-gold-400/20 flex items-center justify-center mb-6">
                    <i className={`bi ${mv.icon} text-3xl text-gold-400`} />
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-cream mb-4">{mv.title}</h3>
                  <p className="text-cream/70 leading-relaxed">{mv.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 md:py-28 bg-luxury-dark text-cream">
        <div className="container-luxury">
          <Reveal>
            <SectionHeading
              eyebrow="What We Stand For"
              title="Our Business Values"
              subtitle="The principles that guide every partnership, every shipment, and every product we deliver."
              center
              light
            />
          </Reveal>
          <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v) => (
              <StaggerItem key={v.title}>
                <div className="theme-panel rounded-[1.75rem] p-8 text-center transition-all hover:-translate-y-1">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-cream/10 border border-gold-400/20 mb-5 transition-colors">
                    <i className={`bi ${v.icon} text-2xl text-gold-400`} />
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-cream mb-3">{v.title}</h3>
                  <p className="text-cream/70 text-sm leading-relaxed">{v.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Warehouse images */}
      <section className="py-20 md:py-28 bg-luxury-dark">
        <div className="container-luxury">
          <Reveal>
            <SectionHeading
              eyebrow="Our Facilities"
              title="Warehouse & Distribution"
              center
            />
          </Reveal>
          <Stagger className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {warehouseImages.map((img) => (
              <StaggerItem key={img.id}>
                <div className="group relative overflow-hidden rounded-3xl aspect-[4/3] shadow-soft">
                  <img
                    src={img.image_url}
                    alt={img.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brown-900/70 to-transparent flex items-end p-5">
                    <p className="text-cream font-medium">{img.title}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
    </>
  );
}
