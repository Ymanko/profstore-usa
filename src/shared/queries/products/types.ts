import type { Product } from '@/shared/lib/graphql/graphql';
import type { ContentMetaobjectField } from '@/shared/utils/parsers/parse-content-blocks';

export interface DiscountedProductsData {
  products: {
    edges: Array<{
      node: Product;
    }>;
  };
}

// Base product type with minimum required fields that all product types share
export interface BaseProduct {
  id: string;
  handle: string;
  title: string;
  availableForSale: boolean;
  featuredImage?: {
    url: string;
    altText?: string | null;
    width?: number | null;
    height?: number | null;
  } | null;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  compareAtPriceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  // Optional collection info for building product URL
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  collections?: any;
}

export interface ProductData {
  product: {
    id: string;
    handle: string;
    title: string;
    description: string;
    descriptionHtml: string;
    availableForSale: boolean;
    productType: string;
    vendor: string;
    tags: string[];
    seo: {
      title: string | null;
      description: string | null;
    };
    featuredImage: {
      url: string;
      altText?: string | null;
      width?: number | null;
      height?: number | null;
    } | null;
    images: {
      edges: Array<{
        node: {
          url: string;
          altText?: string | null;
          width?: number | null;
          height?: number | null;
        };
      }>;
    };
    priceRange: {
      minVariantPrice: {
        amount: string;
        currencyCode: string;
      };
      maxVariantPrice: {
        amount: string;
        currencyCode: string;
      };
    };
    compareAtPriceRange: {
      minVariantPrice: {
        amount: string;
        currencyCode: string;
      };
      maxVariantPrice: {
        amount: string;
        currencyCode: string;
      };
    };
    variants: {
      edges: Array<{
        node: {
          id: string;
          title: string;
          sku: string;
          availableForSale: boolean;
          quantityAvailable?: number | null;
          price: {
            amount: string;
            currencyCode: string;
          };
          compareAtPrice: {
            amount: string;
            currencyCode: string;
          } | null;
          selectedOptions: Array<{
            name: string;
            value: string;
          }>;
          image: {
            url: string;
            altText?: string | null;
            width?: number | null;
            height?: number | null;
          } | null;
        };
      }>;
    };
    options: Array<{
      id: string;
      name: string;
      values: string[];
    }>;
    fullDescription: {
      references: {
        edges: Array<{
          node: {
            id: string;
            fields: ContentMetaobjectField[];
          };
        }>;
      };
    } | null;
    videos: {
      references: {
        edges: Array<{
          node: {
            handle: string;
            type: string;
            fields: Array<{
              key: string;
              value: string | null;
              reference: {
                image: {
                  url: string;
                  altText: string | null;
                  width: number;
                  height: number;
                };
              } | null;
            }>;
          };
        }>;
      };
    } | null;
    characteristics: {
      references: {
        edges: Array<{
          node: {
            handle: string;
            type: string;
            fields: Array<{
              key: string;
              value: string | null;
            }>;
          };
        }>;
      };
    } | null;
    files: {
      references: {
        edges: Array<{
          node: {
            handle: string;
            type: string;
            fields: Array<{
              key: string;
              value: string | null;
              reference: {
                url: string;
                originalFileSize: number;
                mimeType: string;
              } | null;
            }>;
          };
        }>;
      };
    } | null;
    manufacturer: {
      value: string;
    } | null;
    brandLogo: {
      reference: {
        image: {
          url: string;
          altText: string | null;
          width: number;
          height: number;
        };
      };
    } | null;
  } | null;
}

// RecommendedProduct extends BaseProduct with variants info
export interface RecommendedProduct extends BaseProduct {
  variants: {
    edges: Array<{
      node: {
        id: string;
        price: {
          amount: string;
          currencyCode: string;
        };
        compareAtPrice: {
          amount: string;
          currencyCode: string;
        } | null;
      };
    }>;
  };
}

export interface RecommendationsData {
  productRecommendations: RecommendedProduct[] | null;
}

export type RecommendationIntent = 'RELATED' | 'COMPLEMENTARY';
