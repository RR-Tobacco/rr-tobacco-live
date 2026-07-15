import { Reveal, Stagger, StaggerItem } from '../ui/Animation';
import { SectionHeading } from '../ui/SectionHeading';

const steps = [
  { num: '01', icon: 'bi-chat-dots', title: 'Submit Enquiry', desc: 'Share your requirements through our contact form or request a quote directly from any product.' },
  { num: '02', icon: 'bi-file-earmark-text', title: 'Receive Quote', desc: 'Our sales team prepares a tailored wholesale quote with pricing, MOQ, and lead times within 24 hours.' },
  { num: '03', icon: 'bi-box-seam', title: 'Order & Packaging', desc: 'We process your order, arrange specialized packaging, and prepare your master cartons for dispatch.' },
  { num: '04', icon: 'bi-truck', title: 'Delivery', desc: 'Reliable global shipping with tracking, delivered to your warehouse or distribution center on schedule.' },
];

export function ProcessSection() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28 bg-luxury-dark">
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_top_left,rgba(212,175,55,0.18),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.08),transparent_32%)]" />
      <div className="container-luxury relative">
        <Reveal>
          <SectionHeading
            eyebrow="How We Work"
            title="Our Business Process"
            subtitle="A streamlined wholesale partnership from first enquiry to reliable delivery — built for efficiency and trust."
            center
            light
          />
        </Reveal>

        <div className="relative">
          {/* connecting line */}
          <div className="hidden lg:block absolute top-24 left-[14%] right-[14%] h-[2px] bg-gradient-to-r from-gold-400/20 via-gold-400/55 to-gold-400/20" />

          <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step) => (
              <StaggerItem key={step.num}>
                <div className="theme-panel relative text-center rounded-[2rem] px-6 py-10 shadow-dark border border-gold-400/20">
                  <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-full bg-cream text-gold-500 border border-gold-400/20 mb-6 mx-auto shadow-soft">
                    <i className={`bi ${step.icon} text-2xl text-gold-500 leading-none relative z-10`} />
                    <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-brown-950 text-gold-400 font-heading text-xs font-bold flex items-center justify-center shadow-[0_10px_30px_-20px_rgba(0,0,0,0.6)]">
                      {step.num}
                    </span>
                  </div>

                  <h3 className="font-heading text-lg font-semibold text-cream mb-3">{step.title}</h3>
                  <p className="text-cream/70 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
