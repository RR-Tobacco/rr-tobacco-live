import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useSiteSettings } from '../../hooks/useSettings';
import logo from '../../logo/logo.png';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/products', label: 'Products' },
  { to: '/contact', label: 'Contact' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { site } = useSiteSettings();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const isHome = location.pathname === '/';
  const solid = scrolled || !isHome;

  return (
    <>
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          solid
            ? 'border-b border-primary/20 bg-[#1b120e]/85 backdrop-blur-xl shadow-[0_20px_70px_-30px_rgba(0,0,0,0.9)] py-2'
            : 'bg-transparent py-4'
        }`}
      >
        <nav className="container-luxury flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group shrink-0">
            <img
              src={logo}
              alt="RR Tobacco logo"
              className="w-10 h-10 rounded-full border-2 border-gold-400 object-cover transition-all duration-300"
            />
            <span className="font-heading text-xl font-bold text-cream hidden sm:inline">
              {site.logoText}
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `nav-link-luxury hover-underline text-cream ${isActive ? 'active text-gold-400' : ''}`
                }
                end={link.to === '/'}
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-3">
            <Link to="/contact" className="hidden lg:inline-flex btn-gold !py-2.5 !px-5 !text-sm">
              <i className="bi bi-headset" /> Contact Sales
            </Link>
            <button
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full border border-gold-400/40 text-cream"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <i className="bi bi-list text-xl" />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile offcanvas */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-brown-900/80 backdrop-blur-sm lg:hidden"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 right-0 bottom-0 z-[70] w-[300px] max-w-[85vw] bg-luxury-dark flex flex-col lg:hidden"
            >
              <div className="flex items-center justify-between p-6 border-b border-gold-400/15">
                <div className="flex items-center gap-3">
                  <img src={logo} alt="RR Tobacco logo" className="w-10 h-10 rounded-full border-2 border-gold-400 object-cover" />
                  <span className="font-heading text-xl font-bold text-gold-400">{site.logoText}</span>
                </div>
                <button
                  className="w-9 h-9 rounded-full border border-gold-400/30 text-cream flex items-center justify-center"
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <i className="bi bi-x-lg" />
                </button>
              </div>
              <div className="flex flex-col p-6 gap-2">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    end={link.to === '/'}
                    className={({ isActive }) =>
                      `font-body text-base font-medium uppercase tracking-wider py-3 px-4 rounded-xl transition-colors ${
                        isActive ? 'bg-gold-400/15 text-gold-400' : 'text-cream hover:bg-white/5'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
                <Link to="/contact" className="btn-gold mt-4 w-full">
                  <i className="bi bi-headset" /> Contact Sales
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
