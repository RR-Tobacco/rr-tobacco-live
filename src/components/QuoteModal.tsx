import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { useCreateMessage } from '../hooks/useData';

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().optional(),
  company: z.string().optional(),
  message: z.string().min(10, 'Please provide details about your enquiry'),
});

type FormData = z.infer<typeof schema>;

interface QuoteModalProps {
  open: boolean;
  onClose: () => void;
  productName?: string;
  defaultSubject?: string;
}

export function QuoteModal({ open, onClose, productName, defaultSubject = 'Wholesale Enquiry' }: QuoteModalProps) {
  const [submitting, setSubmitting] = useState(false);
  const createMessage = useCreateMessage();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', email: '', phone: '', company: '', message: '' },
  });

  useEffect(() => {
    if (open && productName) {
      setValue('message', `I would like to request a wholesale quote for ${productName}. Please contact me with pricing and MOQ details.`);
    }
  }, [open, productName, setValue]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    try {
      const subject = productName ? `Quote Request: ${productName}` : defaultSubject;
      await createMessage.mutateAsync({
        name: data.name,
        email: data.email,
        phone: data.phone,
        company: data.company,
        subject,
        message: data.message,
      });
      toast.success('Your enquiry has been submitted. Our sales team will contact you shortly.');
      reset();
      onClose();
    } catch {
      toast.error('Failed to submit enquiry. Please try again or contact us directly.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-brown-900/80 backdrop-blur-sm"
            onClick={onClose}
          />
          <div className="fixed inset-0 z-[95] flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-lg bg-cream rounded-3xl shadow-dark overflow-hidden my-8"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-luxury-dark px-6 py-5 flex items-center justify-between">
                <div>
                  <h3 className="font-heading text-xl font-bold text-gold-400">
                    {productName ? 'Request a Quote' : 'Wholesale Enquiry'}
                  </h3>
                  {productName && <p className="text-cream/60 text-sm mt-1">{productName}</p>}
                </div>
                <button
                  onClick={onClose}
                  className="w-9 h-9 rounded-full border border-gold-400/30 text-cream flex items-center justify-center hover:bg-gold-400/10"
                  aria-label="Close"
                >
                  <i className="bi bi-x-lg" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-brown-700 mb-1.5">Full Name *</label>
                    <input
                      {...register('name')}
                      className="w-full rounded-xl border border-brown-200 bg-white px-4 py-2.5 text-brown-800 outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 transition"
                      placeholder="John Smith"
                    />
                    {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-brown-700 mb-1.5">Email *</label>
                    <input
                      {...register('email')}
                      type="email"
                      className="w-full rounded-xl border border-brown-200 bg-white px-4 py-2.5 text-brown-800 outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 transition"
                      placeholder="john@company.com"
                    />
                    {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email.message}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-brown-700 mb-1.5">Phone</label>
                    <input
                      {...register('phone')}
                      className="w-full rounded-xl border border-brown-200 bg-white px-4 py-2.5 text-brown-800 outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 transition"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-brown-700 mb-1.5">Company</label>
                    <input
                      {...register('company')}
                      className="w-full rounded-xl border border-brown-200 bg-white px-4 py-2.5 text-brown-800 outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 transition"
                      placeholder="Your company"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-brown-700 mb-1.5">Message *</label>
                  <textarea
                    {...register('message')}
                    rows={4}
                    className="w-full rounded-xl border border-brown-200 bg-white px-4 py-2.5 text-brown-800 outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 transition resize-none"
                    placeholder="Tell us about your requirements, quantities, and delivery location..."
                  />
                  {errors.message && <p className="text-red-600 text-xs mt-1">{errors.message.message}</p>}
                </div>

                <button type="submit" disabled={submitting} className="btn-gold w-full disabled:opacity-60">
                  {submitting ? (
                    <><span className="spinner-border spinner-border-sm" /> Submitting...</>
                  ) : (
                    <><i className="bi bi-send" /> Submit Enquiry</>
                  )}
                </button>
                <p className="text-brown-400 text-xs text-center">
                  Our sales team responds within 24 business hours.
                </p>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
