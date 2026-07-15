import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const STORAGE_KEY = 'rr_tobacco_age_verified';
const EXPIRY_DAYS = 30;

function isVerified(): boolean {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return false;
  const timestamp = Number(raw);
  if (Number.isNaN(timestamp)) return false;
  const ageMs = Date.now() - timestamp;
  return ageMs < EXPIRY_DAYS * 24 * 60 * 60 * 1000;
}

export function AgeVerification() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!isVerified()) {
      setShow(true);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleEnter = () => {
    localStorage.setItem(STORAGE_KEY, String(Date.now()));
    document.body.style.overflow = '';
    setShow(false);
  };

  const handleExit = () => {
    window.location.href = 'https://www.google.com';
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        >
          <div className="absolute inset-0 bg-luxury-dark" />

          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full max-w-md bg-brown-800 border border-gold-400/25 rounded-3xl p-8 md:p-10 text-center shadow-dark"
          >
            {/* 18+ badge */}
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full border-2 border-gold-400 mb-6">
              <span className="font-heading text-3xl font-bold text-gold-400">18+</span>
            </div>

            <h2 className="font-heading text-2xl md:text-3xl font-bold text-cream mb-3">
              Age Verification Required
            </h2>
            <p className="text-cream/70 text-sm leading-relaxed mb-8">
              This website is intended for wholesale and business partners aged 18 and above.
              RR Tobacco sells tobacco products to verified wholesalers, distributors, and retailers only.
              Please confirm you are of legal age to continue.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <button onClick={handleEnter} className="btn-gold flex-1">
                <i className="bi bi-check-circle" /> Enter Website
              </button>
              <button onClick={handleExit} className="btn-outline-gold flex-1">
                <i className="bi bi-x-circle" /> Exit Website
              </button>
            </div>

            <p className="text-cream/40 text-xs mt-6">
              By entering, you confirm you are 18 years or older and agree to our terms of business.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
