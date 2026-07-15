import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export function NotFoundPage() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-luxury-dark">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center px-4"
      >
        <h1 className="font-heading text-7xl md:text-9xl font-bold text-gradient-gold mb-4">404</h1>
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-cream mb-3">Page Not Found</h2>
        <p className="text-cream/60 mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="btn-gold">
          <i className="bi bi-house" /> Back to Home
        </Link>
      </motion.div>
    </section>
  );
}
