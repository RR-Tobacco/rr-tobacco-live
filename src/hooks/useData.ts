import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import type {
  Category,
  Product,
  HeroSlider,
  GalleryItem,
  Testimonial,
  Message,
  MessageInput,
  Setting,
} from '../types';

const queryKeys = {
  categories: ['categories'] as const,
  products: ['products'] as const,
  product: (slug: string) => ['product', slug] as const,
  heroSliders: ['heroSliders'] as const,
  gallery: ['gallery'] as const,
  testimonials: ['testimonials'] as const,
  settings: ['settings'] as const,
  messages: ['messages'] as const,
};

/* ---------- Categories ---------- */
export function useCategories() {
  return useQuery<Category[]>({
    queryKey: queryKeys.categories,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });
      if (error) throw error;
      return data;
    },
  });
}

export function useCategoriesAll() {
  return useQuery<Category[]>({
    queryKey: ['categories', 'all'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('sort_order', { ascending: true });
      if (error) throw error;
      return data;
    },
  });
}

/* ---------- Products ---------- */
export function useProducts() {
  return useQuery<Product[]>({
    queryKey: queryKeys.products,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*, category:categories(*)')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });
      if (error) throw error;
      return data;
    },
  });
}

export function useProductsAll() {
  return useQuery<Product[]>({
    queryKey: ['products', 'all'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*, category:categories(*)')
        .order('sort_order', { ascending: true });
      if (error) throw error;
      return data;
    },
  });
}

export function useProduct(slug: string) {
  return useQuery<Product | null>({
    queryKey: queryKeys.product(slug),
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*, category:categories(*)')
        .eq('slug', slug)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });
}

/* ---------- Hero Sliders ---------- */
export function useHeroSliders() {
  return useQuery<HeroSlider[]>({
    queryKey: queryKeys.heroSliders,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('hero_sliders')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });
      if (error) throw error;
      return data;
    },
  });
}

/* ---------- Gallery ---------- */
export function useGallery() {
  return useQuery<GalleryItem[]>({
    queryKey: queryKeys.gallery,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('gallery')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });
      if (error) throw error;
      return data;
    },
  });
}

/* ---------- Testimonials ---------- */
export function useTestimonials() {
  return useQuery<Testimonial[]>({
    queryKey: queryKeys.testimonials,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });
      if (error) throw error;
      return data;
    },
  });
}

/* ---------- Settings ---------- */
export function useSettings() {
  return useQuery<Setting[]>({
    queryKey: queryKeys.settings,
    queryFn: async () => {
      const { data, error } = await supabase.from('settings').select('*');
      if (error) throw error;
      return data;
    },
  });
}

/* ---------- Messages ---------- */
export function useMessages() {
  return useQuery<Message[]>({
    queryKey: queryKeys.messages,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
  });
}

export function useCreateMessage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: MessageInput) => {
      const { error } = await supabase
        .from('messages')
        .insert(input);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.messages });
    },
  });
}
