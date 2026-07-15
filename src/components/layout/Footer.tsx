import { Link } from 'react-router-dom';
import { useSiteSettings } from '../../hooks/useSettings';
import logo from '../../logo/logo.png';

export function Footer() {
  const { site, contact, hours, social } = useSiteSettings();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-luxury-dark text-cream pt-20 pb-8">
      <div className="container-luxury">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src={logo} alt="RR Tobacco logo" className="w-10 h-10 rounded-full border-2 border-gold-400 object-cover" />
              <span className="font-heading text-xl font-bold">{site.logoText}</span>
            </div>
            <p className="text-cream/70 text-sm leading-relaxed mb-6">
              {site.tagline}. Supplying premium cigars, pipe tobacco, and accessories to wholesalers,
              distributors, and business partners worldwide for over three decades.
            </p>
            <div className="flex gap-3">
              {social.facebook && (
                <a href={social.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-gold-400/25 flex items-center justify-center text-gold-400 hover:bg-gold-400 hover:text-brown-800 transition-all" aria-label="Facebook">
                  <i className="bi bi-facebook" />
                </a>
              )}
              {social.instagram && (
                <a href={social.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-gold-400/25 flex items-center justify-center text-gold-400 hover:bg-gold-400 hover:text-brown-800 transition-all" aria-label="Instagram">
                  <i className="bi bi-instagram" />
                </a>
              )}
              {social.linkedin && (
                <a href={social.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-gold-400/25 flex items-center justify-center text-gold-400 hover:bg-gold-400 hover:text-brown-800 transition-all" aria-label="LinkedIn">
                  <i className="bi bi-linkedin" />
                </a>
              )}
              {social.twitter && (
                <a href={social.twitter} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-gold-400/25 flex items-center justify-center text-gold-400 hover:bg-gold-400 hover:text-brown-800 transition-all" aria-label="Twitter">
                  <i className="bi bi-twitter-x" />
                </a>
              )}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-heading text-lg font-semibold text-gold-400 mb-5">Navigation</h4>
            <ul className="space-y-3">
              {[
                { to: '/', label: 'Home' },
                { to: '/about', label: 'About Us' },
                { to: '/products', label: 'Products' },
                { to: '/gallery', label: 'Gallery' },
                { to: '/contact', label: 'Contact' },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-cream/70 hover:text-gold-400 transition-colors text-sm inline-flex items-center gap-2 group">
                    <span className="w-0 h-[1px] bg-gold-400 group-hover:w-4 transition-all duration-300" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-lg font-semibold text-gold-400 mb-5">Contact</h4>
            <ul className="space-y-4 text-sm text-cream/70">
              <li className="flex items-start gap-3">
                <i className="bi bi-geo-alt-fill text-gold-400 mt-1" />
                <span>{contact.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <i className="bi bi-telephone-fill text-gold-400" />
                <a href={`tel:${contact.phone}`} className="hover:text-gold-400 transition-colors">{contact.phone}</a>
              </li>
              <li className="flex items-center gap-3">
                <i className="bi bi-envelope-fill text-gold-400" />
                <a href={`mailto:${contact.email}`} className="hover:text-gold-400 transition-colors">{contact.email}</a>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-heading text-lg font-semibold text-gold-400 mb-5">Business Hours</h4>
            <ul className="space-y-3 text-sm text-cream/70">
              <li className="flex items-center gap-3">
                <i className="bi bi-clock-fill text-gold-400" />
                {hours.weekdays}
              </li>
              <li className="flex items-center gap-3">
                <i className="bi bi-clock-fill text-gold-400" />
                {hours.saturday}
              </li>
              <li className="flex items-center gap-3">
                <i className="bi bi-clock-fill text-gold-400" />
                {hours.sunday}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gold-400/15 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-cream/50 text-sm text-center md:text-left">
            &copy; {year} {site.name}. All rights reserved.
          </p>
          <p className="text-cream/40 text-xs">
            Premium Tobacco Wholesale Supplier &middot; For Business Partners 18+ Only
          </p>
        </div>
      </div>
    </footer>
  );
}
