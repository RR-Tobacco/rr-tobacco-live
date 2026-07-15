import { useSettings } from './useData';

export interface SiteSettings {
  name: string;
  tagline: string;
  logoText: string;
}
export interface ContactSettings {
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
}
export interface HoursSettings {
  weekdays: string;
  saturday: string;
  sunday: string;
}
export interface SocialSettings {
  facebook: string;
  instagram: string;
  linkedin: string;
  twitter: string;
}
export interface SeoSettings {
  title: string;
  description: string;
}
export interface StatsSettings {
  products: string;
  partners: string;
  countries: string;
  years: string;
}

export function useSiteSettings() {
  const { data } = useSettings();
  const get = <T,>(key: string, fallback: T): T => {
    const row = data?.find((s) => s.key === key);
    return (row?.value ?? fallback) as T;
  };
  return {
    site: get<SiteSettings>('site', { name: 'RR Tobacco', tagline: 'Premium Tobacco Wholesale Supplier', logoText: 'RR Tobacco' }),
    contact: get<ContactSettings>('contact', { phone: '', whatsapp: '', email: 'rrpatel@rrtobacco.in', address: '' }),
    hours: get<HoursSettings>('hours', { weekdays: '', saturday: '', sunday: '' }),
    social: get<SocialSettings>('social', { facebook: '', instagram: '', linkedin: '', twitter: '' }),
    seo: get<SeoSettings>('seo', { title: '', description: '' }),
    stats: get<StatsSettings>('stats', { products: '', partners: '', countries: '', years: '' }),
  };
}
