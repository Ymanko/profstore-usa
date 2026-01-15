import { queryOptions } from '@tanstack/react-query';

import { STALE_TIME } from '@/shared/constants/stale-time';
import { serverGraphqlFetcher } from '@/shared/lib/graphql/server-graphql-fetcher';

const GET_PRODUCT_RECOMMENDATIONS = `
  query GetProductRecommendations($productId: ID!, $intent: ProductRecommendationIntent) {
    productRecommendations(productId: $productId, intent: $intent) {
      id
      handle
      title
      availableForSale
      featuredImage {
        url
        altText
        width
        height
      }
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      compareAtPriceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      variants(first: 1) {
        edges {
          node {
            id
            price {
              amount
              currencyCode
            }
            compareAtPrice {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`;

export interface RecommendedProduct {
  id: string;
  handle: string;
  title: string;
  availableForSale: boolean;
  featuredImage: {
    url: string;
    altText: string | null;
    width: number;
    height: number;
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

interface RecommendationsData {
  productRecommendations: RecommendedProduct[] | null;
}

type RecommendationIntent = 'RELATED' | 'COMPLEMENTARY';

export const getProductRecommendationsQueryOptions = (
  productId: string,
  intent: RecommendationIntent = 'RELATED',
) =>
  queryOptions({
    queryKey: ['product-recommendations', productId, intent],
    queryFn: async () => {
      return serverGraphqlFetcher<RecommendationsData>(
        GET_PRODUCT_RECOMMENDATIONS,
        { productId, intent },
        { tags: ['recommendations', productId], revalidate: 3600 },
      );
    },
    staleTime: STALE_TIME.ONE_HOUR,
    select: data => data.productRecommendations || [],
    enabled: !!productId,
  });

// Convenience functions
export const getRelatedProductsQueryOptions = (productId: string) =>
  getProductRecommendationsQueryOptions(productId, 'RELATED');

export const getComplementaryProductsQueryOptions = (productId: string) =>
  getProductRecommendationsQueryOptions(productId, 'COMPLEMENTARY');
