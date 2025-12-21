import { queryOptions } from '@tanstack/react-query';

import { STALE_TIME } from '@/constants/stale-time';
import { serverGraphqlFetcher } from '@/lib/graphql/server-graphql-fetcher';

import type { QueryRoot } from '@/lib/graphql/graphql';

const GET_HOME_PAGE_CONTENT = `
  query GetHomePageContent {
    metaobject(handle: {type: "home_page", handle: "home"}) {
      fields {
        key
        value
        reference {
          ... on Metaobject {
            id
            type
            fields {
              key
              value
              reference {
                ... on MediaImage {
                  image {
                    url
                    altText
                  }
                }
              }
            }
          }
        }
        references(first: 10) {
          edges {
            node {
              ... on Metaobject {
                id
                type
                fields {
                  key
                  value
                  reference {
                    ... on MediaImage {
                      image {
                        url
                        altText
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

type MetaobjectField = {
  key: string;
  value: string;
  reference?: {
    image?: {
      url: string;
      altText?: string;
    };
  } | null;
};

type MetaobjectNode = {
  id: string;
  type: string;
  fields: MetaobjectField[];
};

type MetaobjectEdge = {
  node: MetaobjectNode;
};

type MetaobjectFieldWithReferences = {
  key: string;
  value: string;
  references?: {
    edges: MetaobjectEdge[];
  } | null;
};

export type BannerSlide = {
  image: string;
  imageAlt?: string;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
};

type Brand = {
  name: string;
  logo: string;
  logoAlt: string;
};

type HomePageContent = {
  bannerSlides: BannerSlide[];
  showCategories: boolean;
  showRecommended: boolean;
  showNewAndSaleProducts: boolean;
  descriptionTitle: string;
  descriptionContent: string;
  brands: Brand[];
};

function parseMetaobjectFields(fields: MetaobjectField[]): Record<string, unknown> {
  const result: Record<string, unknown> = {};

  fields.forEach(field => {
    if (field.reference?.image) {
      result[field.key] = field.reference.image.url;
      result[`${field.key}Alt`] = field.reference.image.altText || '';
    } else {
      result[field.key] = field.value;
    }
  });

  return result;
}

export const getHomePageContentQueryOptions = queryOptions({
  queryKey: ['home-page-content'],
  queryFn: async () => {
    const data = await serverGraphqlFetcher<Pick<QueryRoot, 'metaobject'>>(
      GET_HOME_PAGE_CONTENT,
      {},
      {
        tags: ['home-page-content'],
      },
    );

    if (!data.metaobject) {
      throw new Error('Home page metaobject not found');
    }

    const fields = data.metaobject.fields as unknown as MetaobjectFieldWithReferences[];
    const result: HomePageContent = {
      bannerSlides: [],
      showCategories: false,
      showRecommended: false,
      showNewAndSaleProducts: false,
      descriptionTitle: '',
      descriptionContent: '',
      brands: [],
    };

    fields.forEach((field: MetaobjectFieldWithReferences) => {
      switch (field.key) {
        case 'banner_slides':
          if (field.references?.edges) {
            result.bannerSlides = field.references.edges.map((edge: MetaobjectEdge) => {
              const slideFields = parseMetaobjectFields(edge.node.fields);
              return {
                image: (slideFields.image as string) || '',
                imageAlt: (slideFields.imageAlt as string) || (slideFields.title as string) || '',
                title: (slideFields.title as string) || '',
                subtitle: (slideFields.subtitle as string) || '',
                buttonText: (slideFields.button_text as string) || '',
                buttonLink: (slideFields.button_link as string) || '',
              };
            });
          }
          break;
        case 'show_categories':
          result.showCategories = field.value === 'true';
          break;
        case 'show_recommended':
          result.showRecommended = field.value === 'true';
          break;
        case 'show_newandsaleproducts':
          result.showNewAndSaleProducts = field.value === 'true';
          break;
        case 'description_title':
          result.descriptionTitle = field.value || '';
          break;
        case 'description_content':
          result.descriptionContent = field.value || '';
          break;
        case 'brands':
          if (field.references?.edges) {
            result.brands = field.references.edges.map((edge: MetaobjectEdge) => {
              const brandFields = parseMetaobjectFields(edge.node.fields);
              return {
                name: (brandFields.name as string) || '',
                logo: (brandFields.logo as string) || '',
                logoAlt: (brandFields.alt_text as string) || (brandFields.name as string) || '',
              };
            });
          }
          break;
      }
    });

    return result;
  },
  staleTime: STALE_TIME.ONE_HOUR,
});
