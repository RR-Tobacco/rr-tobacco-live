import { useSiteSettings } from '../hooks/useSettings';

export function WhatsAppButton() {
  const { contact } = useSiteSettings();
  if (!contact.whatsapp) return null;

  const link = `https://wa.me/${contact.whatsapp.replace(/[^0-9]/g, '')}`;

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-green-600 text-white flex items-center justify-center shadow-lg hover:scale-110 hover:bg-green-500 transition-all duration-300"
      aria-label="Chat on WhatsApp"
    >
      <i className="bi bi-whatsapp text-2xl" />
      <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20" />
    </a>
  );
}
