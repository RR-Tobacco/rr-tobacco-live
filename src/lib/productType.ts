import type { Product } from '../types';
import leafImage from '../assets/types/leaf.svg';
import kandiImage from '../assets/types/kandi.svg';
import dustImage from '../assets/types/dust.svg';

export interface ProductTypeInfo {
  label: 'Leaf' | 'Kandi' | 'Dust';
  image: string;
  description: string;
}

const isLeaf = (text: string) => /(leaf|tobacco|rawo|raw|desi|biri|pati|bhuko)\b/.test(text);
const isKandi = (text: string) => /\bkandi\b/.test(text);
const isDust = (text: string) => /\bdust\b/.test(text);

export function getProductType(product: Product): ProductTypeInfo {
  const text = [product.category?.name, product.name, product.short_description, product.description]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();

  if (isDust(text)) {
    return {
      label: 'Dust',
      image: dustImage,
      description: 'Raw tobacco dust',
    };
  }

  if (isKandi(text)) {
    return {
      label: 'Kandi',
      image: kandiImage,
      description: 'Kandi tobacco',
    };
  }

  if (isLeaf(text)) {
    return {
      label: 'Leaf',
      image: leafImage,
      description: 'Whole tobacco leaf',
    };
  }

  return {
    label: 'Leaf',
    image: leafImage,
    description: 'Whole tobacco leaf',
  };
}
