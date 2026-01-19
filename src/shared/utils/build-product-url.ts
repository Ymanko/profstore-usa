interface ProductWithCollection {
  handle: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  collections?: any;
}

/**
 * Builds product URL based on category structure: /{category}/{subcategory}/{product}
 * Falls back to /catalog/{product} if category info is not available
 */
export function buildProductUrl(product: ProductWithCollection): string {
  const collection = product.collections?.edges?.[0]?.node;
  const reference = collection?.metafield?.reference;
  const categoryHandle = reference && 'handle' in reference ? (reference.handle as string) : undefined;
  const subcategoryHandle = collection?.handle as string | undefined;

  if (categoryHandle && subcategoryHandle) {
    return `/${categoryHandle}/${subcategoryHandle}/${product.handle}`;
  }

  return `/catalog/${product.handle}`;
}
