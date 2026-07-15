import { Reveal, Stagger, StaggerItem } from '../ui/Animation';
import { SectionHeading } from '../ui/SectionHeading';

const features = [
  { icon: 'bi-award-fill', title: 'Uncompromising Quality', desc: 'Every batch is inspected and aged to exacting standards, ensuring consistency your customers can rely on.' },
  { icon: 'bi-globe2', title: 'Global Sourcing Network', desc: 'We source from the finest tobacco regions — Dominican Republic, Nicaragua, and beyond — for authentic flavor.' },
  { icon: 'bi-truck', title: 'Reliable Distribution', desc: 'Robust supply chain and warehousing ensure on-time delivery to your distribution centers, worldwide.' },
  { icon: 'bi-people', title: 'Dedicated Account Managers', desc: 'A personal account manager handles your orders, logistics, and enquiries from quote to delivery.' },
  { icon: 'bi-cash-coin', title: 'Competitive Wholesale Terms', desc: 'Volume-based pricing and flexible terms designed to maximize margins for our business partners.' },
];

export function WhyChooseSection() {
  return (
    <section className="py-20 md:py-28 bg-luxury-dark relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #d4af37 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      <div className="container-luxury relative">
        <Reveal>
          <SectionHeading
            eyebrow="The RR Advantage"
            title="Why Choose RR Tobacco"
            subtitle="Three decades of wholesale expertise, built on relationships, reliability, and a relentless commitment to quality."
            center
            light
          />
        </Reveal>

        <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <StaggerItem key={f.title}>
              <div className="glass-dark rounded-2xl p-7 h-full hover:border-gold-400/40 transition-all duration-500 group">
                <div className="w-14 h-14 rounded-2xl bg-gold-400/10 border border-gold-400/20 flex items-center justify-center mb-5 group-hover:bg-gold-400/20 transition-colors">
                  <i className={`bi ${f.icon} text-2xl text-gold-400`} />
                </div>
                <h3 className="font-heading text-lg font-semibold text-cream mb-3">{f.title}</h3>
                <p className="text-cream/60 text-sm leading-relaxed">{f.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
