import { useState } from 'react';
import { Reveal } from '../ui/Animation';
import { AnimatePresence, motion } from 'framer-motion';

const faqs = [
  { q: 'Does RR Tobacco sell to individual consumers?', a: 'No. RR Tobacco is a B2B wholesale supplier serving wholesalers, distributors, retailers, and business partners only. We do not sell directly to consumers.' },
  { q: 'What is the minimum order quantity (MOQ)?', a: 'MOQs vary by product. Each product listing displays its specific MOQ. Typically, cigar orders start at 10 boxes while bulk tobacco starts at 50kg. Contact our sales team for tailored quotes.' },
  { q: 'Which countries do you ship to?', a: 'We distribute to over 32 countries across North America, Europe, Asia, and the Middle East. Our logistics team handles export documentation and compliance for international shipments.' },
  { q: 'How do I request a wholesale quote?', a: 'Click "Request Quote" on any product or submit a wholesale enquiry via our contact form. Our sales team responds with tailored pricing within 24 business hours.' },
  { q: 'Do you offer volume-based pricing?', a: 'Yes. Our wholesale terms are structured around order volume, with tiered pricing that improves margins for larger commitments. Your account manager will outline available tiers.' },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gold-400/10">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 py-6 text-left group"
      >
        <span className="font-heading text-base md:text-lg font-semibold text-cream group-hover:text-gold-400 transition-colors">
          {q}
        </span>
        <span className={`shrink-0 w-10 h-10 rounded-full border border-gold-400/30 bg-[#1d1410] text-gold-400 flex items-center justify-center transition-transform duration-300 ${open ? 'rotate-45' : ''}`}>
          <i className="bi bi-plus-lg" />
        </span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-cream/70 text-sm leading-relaxed pr-12">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FaqSection() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28 bg-luxury-dark text-cream">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(212,175,55,0.08),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.05),transparent_35%)]" />
      <div className="container-luxury relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <Reveal>
            <div className="lg:sticky lg:top-32">
              <span className="section-eyebrow text-gold-400">Questions & Answers</span>
              <h2 className="section-heading text-cream">Frequently Asked Questions</h2>
              <div className="gold-divider mt-4 mb-6" />
              <p className="text-cream/70 leading-relaxed mb-6">
                Everything you need to know about partnering with RR Tobacco as a wholesale buyer.
                Can't find your answer? Our sales team is ready to help.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div>
              {faqs.map((f) => <FaqItem key={f.q} {...f} />)}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
