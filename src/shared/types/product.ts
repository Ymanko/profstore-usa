/**
 * Product types
 *
 * This file re-exports all product-related types from their source files.
 * Import from here for convenience instead of importing from individual query files.
 */

// Base product type - minimum fields shared by all products
export type { BaseProduct } from '@/shared/queries/products/get-product';

// Full product data from product detail page
export type { ProductData } from '@/shared/queries/products/get-product';

// Catalog/collection product with additional fields
export type { Product } from '@/shared/queries/collections/get-subcategory-products';

// Recommended product from recommendations API
export type { RecommendedProduct } from '@/shared/queries/products/get-product-recommendations';
