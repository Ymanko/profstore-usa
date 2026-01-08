import { queryOptions } from '@tanstack/react-query';

import { STALE_TIME } from '@/shared/constants/stale-time';
import { serverGraphqlFetcher } from '@/shared/lib/graphql/server-graphql-fetcher';

const GET_PRODUCT = `
  query GetProduct($handle: String!) {
    product(handle: $handle) {
      id
      handle
      title
      description
      descriptionHtml
      availableForSale
      productType
      vendor
      tags

      seo {
        title
        description
      }

      featuredImage {
        url
        altText
        width
        height
      }

      images(first: 10) {
        edges {
          node {
            url
            altText
            width
            height
          }
        }
      }

      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
        maxVariantPrice {
          amount
          currencyCode
        }
      }

      compareAtPriceRange {
        minVariantPrice {
          amount
          currencyCode
        }
        maxVariantPrice {
          amount
          currencyCode
        }
      }

      variants(first: 100) {
        edges {
          node {
            id
            title
            availableForSale
            quantityAvailable
            price {
              amount
              currencyCode
            }
            compareAtPrice {
              amount
              currencyCode
            }
            selectedOptions {
              name
              value
            }
            image {
              url
              altText
              width
              height
            }
          }
        }
      }

      options {
        id
        name
        values
      }
    }
  }
`;

interface ProductData {
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
  } | null;
}

export const getProductQueryOptions = (handle: string) =>
  queryOptions({
    queryKey: ['product', handle],
    queryFn: async () => {
      return serverGraphqlFetcher<ProductData>(
        GET_PRODUCT,
        { handle },
        { tags: ['product', handle], revalidate: 3600 },
      );
    },
    staleTime: STALE_TIME.ONE_HOUR,
    select: data => data.product,
  });
