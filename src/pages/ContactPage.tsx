import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { PageBanner } from '../components/ui/PageBanner';
import { Reveal, Stagger, StaggerItem } from '../components/ui/Animation';
import { useCreateMessage } from '../hooks/useData';
import { useSiteSettings } from '../hooks/useSettings';

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().optional(),
  company: z.string().optional(),
  subject: z.string().min(3, 'Subject is required'),
  message: z.string().min(10, 'Please provide details'),
});
type FormData = z.infer<typeof schema>;

const inputClass =
  'w-full rounded-xl border border-brown-200 bg-cream/60 px-4 py-3 text-brown-800 outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 transition placeholder:text-brown-300 shadow-sm';
const labelClass = 'block text-sm font-medium text-brown-700 mb-1.5';

const departments = [
  { icon: 'bi bi-cart3', title: 'Wholesale Orders', desc: 'Product quotes, pricing, and bulk orders', contact: 'rrpatel@rrtobacco.in' },
  { icon: 'bi bi-people', title: 'Partnerships', desc: 'Distribution and retail partnerships', contact: 'rrpatel@rrtobacco.in' },
  { icon: 'bi bi-truck', title: 'Logistics', desc: 'Shipping, tracking, and delivery', contact: 'rrpatel@rrtobacco.in' },
];

export function ContactPage() {
  const { contact, hours, social } = useSiteSettings();
  const createMessage = useCreateMessage();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    try {
      await createMessage.mutateAsync({
        name: data.name,
        email: data.email,
        phone: data.phone,
        company: data.company,
        subject: data.subject,
        message: data.message,
      });
      toast.success('Message sent! Our sales team will respond within 24 business hours.');
      reset();
    } catch {
      toast.error('Failed to send message. Please try again or call us directly.');
    }
  };

  const whatsappLink = contact.whatsapp
    ? `https://wa.me/${contact.whatsapp.replace(/[^0-9]/g, '')}`
    : '#';

  const socialLinks = [
    { icon: 'bi-facebook', url: social.facebook, label: 'Facebook' },
    { icon: 'bi-instagram', url: social.instagram, label: 'Instagram' },
    { icon: 'bi-linkedin', url: social.linkedin, label: 'LinkedIn' },
    { icon: 'bi-twitter-x', url: social.twitter, label: 'Twitter' },
  ].filter((s) => s.url);

  return (
    <>
      <PageBanner
        eyebrow="Get In Touch"
        title="Contact Sales"
        subtitle="Reach our wholesale team for quotes, product enquiries, distribution partnerships, and business support."
        image="https://images.pexels.com/photos/27793716/pexels-photo-27793716.jpeg?auto=compress&cs=tinysrgb&w=1600"
      />

      {/* Info cards */}
      <section className="py-16 md:py-20">
        <div className="container-luxury">
          <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: 'bi-telephone-fill', label: 'Call Us', value: contact.phone, href: `tel:${contact.phone}` },
              { icon: 'bi-whatsapp', label: 'WhatsApp', value: contact.whatsapp, href: whatsappLink, external: true },
              { icon: 'bi-envelope-fill', label: 'Email Us', value: contact.email, href: `mailto:${contact.email}` },
              { icon: 'bi-geo-alt-fill', label: 'Visit Us', value: contact.address, href: '#map' },
            ].map((card) => (
              <StaggerItem key={card.label}>
                <a
                  href={card.href}
                  target={card.external ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="card-luxury p-7 text-center h-full block group hover:!shadow-dark"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brown-50 border border-gold-400/20 mb-5 group-hover:bg-gold-400 group-hover:border-gold-400 transition-all duration-300">
                    <i className={`bi ${card.icon} text-2xl text-gold-500 group-hover:text-brown-800 transition-colors`} />
                  </div>
                  <h3 className="font-heading text-base font-semibold text-brown-800 mb-1.5">{card.label}</h3>
                  <p className="text-brown-500 text-sm break-words leading-relaxed">{card.value}</p>
                </a>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Departments */}
      <section className="pb-16">
        <div className="container-luxury">
          <Reveal>
            <div className="text-center mb-10">
              <span className="section-eyebrow">Direct Lines</span>
              <h2 className="section-heading">Reach the Right Department</h2>
              <div className="gold-divider mx-auto mt-4" />
            </div>
          </Reveal>
          <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {departments.map((dept) => (
              <StaggerItem key={dept.title}>
                <div className="bg-white rounded-2xl p-7 border border-brown-100 hover:border-gold-400/40 transition-all duration-300 group h-full">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gold-400/10 flex items-center justify-center group-hover:bg-gold-400/20 transition-colors">
                      <i className={`${dept.icon} text-xl text-gold-500`} />
                    </div>
                    <h3 className="font-heading text-lg font-semibold text-brown-800">{dept.title}</h3>
                  </div>
                  <p className="text-brown-500 text-sm mb-3">{dept.desc}</p>
                  <a href={`mailto:${dept.contact}`} className="text-gold-600 text-sm font-medium hover:text-gold-500 transition-colors inline-flex items-center gap-1.5">
                    <i className="bi bi-envelope" /> {dept.contact}
                  </a>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Form + sidebar */}
      <section className="pb-20">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Form — 3/5 width */}
            <Reveal className="lg:col-span-3">
              <div className="bg-white rounded-3xl shadow-soft p-8 md:p-10 relative overflow-hidden">
                <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-gold-400/5" />
                <div className="absolute -bottom-12 -left-12 w-32 h-32 rounded-full bg-brown-50/50" />
                <div className="relative">
                  <span className="section-eyebrow">Send a Message</span>
                  <h2 className="font-heading text-2xl md:text-3xl font-bold text-brown-800 mb-2">
                    Wholesale Enquiry Form
                  </h2>
                  <div className="gold-divider mb-8" />

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className={labelClass}>Full Name *</label>
                        <input
                          {...register('name')}
                          className={inputClass}
                          placeholder="John Smith"
                        />
                        {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name.message}</p>}
                      </div>
                      <div>
                        <label className={labelClass}>Email *</label>
                        <input
                          {...register('email')}
                          type="email"
                          className={inputClass}
                          placeholder="john@company.com"
                        />
                        {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email.message}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className={labelClass}>Phone</label>
                        <input
                          {...register('phone')}
                          className={inputClass}
                          placeholder="+1 (555) 000-0000"
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Company</label>
                        <input
                          {...register('company')}
                          className={inputClass}
                          placeholder="Your company name"
                        />
                      </div>
                    </div>

                    <div>
                      <label className={labelClass}>Subject *</label>
                      <input
                        {...register('subject')}
                        className={inputClass}
                        placeholder="Wholesale enquiry subject"
                      />
                      {errors.subject && <p className="text-red-600 text-xs mt-1">{errors.subject.message}</p>}
                    </div>

                    <div>
                      <label className={labelClass}>Message *</label>
                      <textarea
                        {...register('message')}
                        rows={5}
                        className={`${inputClass} resize-none`}
                        placeholder="Tell us about your business and requirements — product types, estimated volumes, delivery location, and timeline..."
                      />
                      {errors.message && <p className="text-red-600 text-xs mt-1">{errors.message.message}</p>}
                    </div>

                    <button type="submit" disabled={createMessage.isPending} className="btn-gold w-full !py-3.5 disabled:opacity-60 flex items-center justify-center gap-2">
                      {createMessage.isPending ? (
                        <><span className="spinner-border spinner-border-sm" /> Sending...</>
                      ) : (
                        <><i className="bi bi-send" /> Send Message</>
                      )}
                    </button>
                    <p className="text-brown-400 text-xs text-center">
                      Our sales team responds within 24 business hours.
                    </p>
                  </form>
                </div>
              </div>
            </Reveal>

            {/* Sidebar — 2/5 width */}
            <div className="lg:col-span-2 space-y-6">
              {/* Business hours */}
              <Reveal delay={0.1}>
                <div className="bg-luxury-dark rounded-3xl p-8 relative overflow-hidden">
                  <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 80% 20%, #d4af37 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
                  <div className="relative">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-11 h-11 rounded-xl bg-gold-400/15 flex items-center justify-center">
                        <i className="bi bi-clock-fill text-xl text-gold-400" />
                      </div>
                      <h3 className="font-heading text-xl font-bold text-gold-400">Business Hours</h3>
                    </div>
                    <ul className="space-y-1">
                      {[
                        { day: 'Monday - Friday', hours: hours.weekdays, icon: 'bi-calendar-week' },
                        { day: 'Saturday', hours: hours.saturday, icon: 'bi-calendar-plus' },
                        { day: 'Sunday', hours: hours.sunday, icon: 'bi-calendar-x' },
                      ].map((row) => (
                        <li key={row.day} className="flex items-center justify-between py-3.5 border-b border-gold-400/10 last:border-0">
                          <span className="text-cream/70 text-sm flex items-center gap-2">
                            <i className={`bi ${row.icon} text-gold-400/70`} /> {row.day}
                          </span>
                          <span className={`text-sm font-medium ${row.hours === 'Sun: Closed' ? 'text-cream/40' : 'text-cream'}`}>
                            {row.hours}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>

              {/* WhatsApp CTA */}
              <Reveal delay={0.15}>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-gradient-to-br from-green-600 to-green-700 rounded-3xl p-8 hover:shadow-dark transition-all duration-300 group"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center group-hover:bg-white/25 transition-colors">
                      <i className="bi bi-whatsapp text-3xl text-white" />
                    </div>
                    <div>
                      <h3 className="font-heading text-lg font-bold text-white">WhatsApp Sales</h3>
                      <p className="text-white/70 text-xs">Fastest response channel</p>
                    </div>
                  </div>
                  <p className="text-white/80 text-sm mb-4">
                    Need an urgent response? Chat with our sales team directly on WhatsApp for immediate assistance.
                  </p>
                  <span className="inline-flex items-center gap-2 text-white text-sm font-semibold group-hover:gap-3 transition-all">
                    Start Chat <i className="bi bi-arrow-right" />
                  </span>
                </a>
              </Reveal>

              {/* Social */}
              <Reveal delay={0.2}>
                <div className="bg-white rounded-3xl p-8 border border-brown-100">
                  <h3 className="font-heading text-lg font-semibold text-brown-800 mb-4">Follow Our Business</h3>
                  <p className="text-brown-500 text-sm mb-5">Stay updated on new product lines and trade offers.</p>
                  <div className="flex gap-3">
                    {socialLinks.map((s) => (
                      <a
                        key={s.label}
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={s.label}
                        className="w-11 h-11 rounded-xl bg-brown-50 border border-brown-100 flex items-center justify-center text-brown-500 hover:bg-gold-400 hover:text-brown-800 hover:border-gold-400 transition-all"
                      >
                        <i className={`bi ${s.icon} text-lg`} />
                      </a>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Full-width map */}
      <section id="map" className="pb-20">
        <div className="container-luxury">
          <Reveal>
            <div className="rounded-3xl overflow-hidden shadow-soft border border-brown-100">
              <div className="bg-white px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-brown-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gold-400/10 flex items-center justify-center">
                    <i className="bi bi-geo-alt-fill text-xl text-gold-500" />
                  </div>
                  <div>
                    <h3 className="font-heading text-base font-semibold text-brown-800">Our Location</h3>
                    <p className="text-brown-500 text-sm">{contact.address}</p>
                  </div>
                </div>
                <a
                  href={`https://www.google.com/maps?q=${encodeURIComponent(contact.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary-luxury !py-2.5 !px-5 !text-sm shrink-0"
                >
                  <i className="bi bi-map" /> Open in Maps
                </a>
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="h-[420px]"
              >
                <iframe
                  title="RR Tobacco location"
                  src="https://www.google.com/maps?q=Tampa+Florida+Industry+Park&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </motion.div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
