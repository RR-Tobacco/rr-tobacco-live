interface PageBannerProps {
  title: string;
  subtitle?: string;
  image: string;
  eyebrow?: string;
}

export function PageBanner({ title, subtitle, image, eyebrow }: PageBannerProps) {
  return (
    <section className="relative h-[50vh] min-h-[380px] flex items-center overflow-hidden">
      <img src={image} alt={title} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-brown-900/90 via-brown-900/70 to-brown-900/40" />
      <div className="relative z-10 container-luxury">
        <div className="max-w-2xl">
          {eyebrow && <span className="section-eyebrow text-gold-400">{eyebrow}</span>}
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-cream text-shadow-lg mb-4">
            {title}
          </h1>
          {subtitle && <p className="text-cream/80 text-lg md:text-xl leading-relaxed max-w-xl">{subtitle}</p>}
        </div>
      </div>
    </section>
  );
}
