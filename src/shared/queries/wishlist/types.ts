import type { BaseProduct } from '@/shared/queries/products/types';

export interface WishlistItem {
  customer_id: number;
  product_id: number;
  variant_id: number;
  category_id?: number;
  product_qty?: number;
}

export interface WishlistProductVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  inventoryPolicy: string;
  price: string;
  compareAtPrice: string | null;
  image: string | null;
  sku: string;
}

export interface WishlistProduct extends Omit<BaseProduct, 'variants' | 'collections' | 'featuredImage'> {
  vendor: string;
  tags: string[];
  featuredImage: string; // API returns string URL, not object
  variant: WishlistProductVariant;
}

export interface WishlistGetData {
  total_records: number;
  current_page: number;
  prev_page: number;
  next_page: number;
  result: WishlistProduct[];
}
