import { queryOptions } from '@tanstack/react-query';

import { STALE_TIME } from '@/shared/constants/stale-time';
import { serverGraphqlFetcher } from '@/shared/lib/graphql/server-graphql-fetcher';
import { GET_HOME_PAGE_CONTENT } from '@/shared/queries/home/content/query';

import type { QueryRoot } from '@/shared/lib/graphql/graphql';
import type {
  HomePageContent,
  MetaobjectField,
  MetaobjectFieldWithReferences,
  MetaobjectEdge,
} from '@/shared/queries/home/content/types';

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
              console.log('RAW edge.node.fields:', edge.node.fields);
              const slideFields = parseMetaobjectFields(edge.node.fields);
              console.log('PARSED slideFields:', slideFields);
              return {
                image: (slideFields.image as string) || '',
                imageAlt: (slideFields.imageAlt as string) || (slideFields.title as string) || '',
                title: (slideFields.title as string) || '',
                subtitle: (slideFields.subtitle as string) || '',
                buttonText: (slideFields.button_text as string) || '',
                buttonLink: (slideFields.button_url as string) || (slideFields.button_link as string) || '',
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
