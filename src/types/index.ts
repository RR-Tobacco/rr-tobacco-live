export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category_id: string | null;
  short_description: string | null;
  description: string | null;
  moq: string;
  packaging: string;
  images: string[];
  specifications: Record<string, string>;
  origin: string | null;
  is_featured: boolean;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  category?: Category | null;
}

export interface HeroSlider {
  id: string;
  title: string;
  subtitle: string | null;
  image_url: string;
  button_text: string | null;
  button_link: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  image_url: string;
  tag: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
}

export interface Testimonial {
  id: string;
  name: string;
  company: string;
  role: string | null;
  message: string;
  rating: number;
  image_url: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
}

export interface Message {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  subject: string;
  message: string;
  status: string;
  created_at: string;
}

export interface Setting {
  id: string;
  key: string;
  value: Record<string, string>;
  created_at: string;
  updated_at: string;
}

export type MessageStatus = 'new' | 'read' | 'responded' | 'archived';

export interface MessageInput {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
}
