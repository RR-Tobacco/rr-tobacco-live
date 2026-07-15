import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { Reveal } from '../ui/Animation';
import { useCreateMessage } from '../../hooks/useData';

const schema = z.object({
  email: z.string().email('Valid email is required'),
});
type FormData = z.infer<typeof schema>;

export function NewsletterSection() {
  const createMessage = useCreateMessage();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      await createMessage.mutateAsync({
        name: 'Newsletter Subscriber',
        email: data.email,
        subject: 'Newsletter Subscription',
        message: 'Please add me to the RR Tobacco wholesale newsletter for product updates and trade offers.',
      });
      toast.success('Subscribed! Watch your inbox for wholesale updates.');
      reset();
    } catch {
      toast.error('Subscription failed. Please try again.');
    }
  };

  return (
    <section className="py-16 border-t border-brown-100">
      <div className="container-luxury">
        <Reveal>
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 bg-white rounded-3xl shadow-soft p-8 md:p-12">
            <div className="text-center lg:text-left max-w-xl">
              <h3 className="font-heading text-2xl md:text-3xl font-bold text-brown-800 mb-2">
                Wholesale Trade Newsletter
              </h3>
              <p className="text-brown-500 text-sm">
                Get notified about new product lines, seasonal stock, and exclusive wholesale offers.
              </p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full lg:w-auto flex flex-col sm:flex-row gap-3 lg:min-w-[420px]">
              <div className="flex-1">
                <input
                  {...register('email')}
                  type="email"
                  placeholder="Your business email"
                  className="w-full rounded-pill border border-brown-200 bg-cream px-5 py-3 text-brown-800 outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 transition"
                />
                {errors.email && <p className="text-red-600 text-xs mt-1 ml-4">{errors.email.message}</p>}
              </div>
              <button type="submit" className="btn-gold shrink-0" disabled={createMessage.isPending}>
                {createMessage.isPending ? <span className="spinner-border spinner-border-sm" /> : <><i className="bi bi-send" /> Subscribe</>}
              </button>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
