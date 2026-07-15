interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
  light?: boolean;
}

export function SectionHeading({ eyebrow, title, subtitle, center, light }: SectionHeadingProps) {
  return (
    <div className={center ? 'text-center max-w-2xl mx-auto mb-12' : 'max-w-2xl mb-12'}>
      {eyebrow && (
        <span className="section-eyebrow" style={light ? { color: '#e0cb78' } : undefined}>
          {eyebrow}
        </span>
      )}
      <h2 className={light ? 'section-heading !text-cream' : 'section-heading'}>{title}</h2>
      <div className={`gold-divider mt-4 ${center ? 'mx-auto' : ''}`} />
      {subtitle && (
        <p className={`mt-4 text-base md:text-lg ${light ? 'text-cream/70' : 'text-brown-500'}`}>{subtitle}</p>
      )}
    </div>
  );
}
