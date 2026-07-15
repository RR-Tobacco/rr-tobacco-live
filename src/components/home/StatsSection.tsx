import { Reveal } from '../ui/Animation';
import { Counter } from '../ui/Counter';
import { useSiteSettings } from '../../hooks/useSettings';

export function StatsSection() {
  const { stats } = useSiteSettings();

  const items = [
    { value: Number(stats.products?.replace(/\D/g, '') || 250), label: 'Products', suffix: stats.products?.includes('+') ? '+' : '' },
    { value: Number(stats.partners?.replace(/\D/g, '') || 480), label: 'Business Partners', suffix: stats.partners?.includes('+') ? '+' : '' },
    { value: Number(stats.countries?.replace(/\D/g, '') || 32), label: 'Countries Served', suffix: stats.countries?.includes('+') ? '+' : '' },
    { value: Number(stats.years?.replace(/\D/g, '') || 30), label: 'Years of Excellence', suffix: stats.years?.includes('+') ? '+' : '' },
  ];

  return (
    <section className="relative -mt-20 z-30">
      <div className="container-luxury">
        <Reveal>
          <div className="bg-white rounded-3xl shadow-dark p-8 md:p-10 grid grid-cols-2 lg:grid-cols-4 gap-8">
            {items.map((item, i) => (
              <div key={i} className="text-center">
                <div className="font-heading text-4xl md:text-5xl font-bold text-gradient-gold mb-2">
                  <Counter value={item.value} suffix={item.suffix} />
                </div>
                <div className="font-body text-sm uppercase tracking-wider text-brown-500">{item.label}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
