import { queryOptions } from '@tanstack/react-query';

import { STALE_TIME } from '@/shared/constants/stale-time';
import { serverGraphqlFetcher } from '@/shared/lib/graphql/server-graphql-fetcher';
import { GET_TRAINING_PAGE } from '@/shared/queries/pages/training-query';
import { parseContentBlocks } from '@/shared/utils/parsers/parse-content-blocks';

import type { FaqItem, FeatureItem, TrainingPageData } from '@/shared/queries/pages/training-types';

interface FeatureField {
  key: string;
  value: string | null;
  reference?: {
    image?: {
      url: string;
    } | null;
  } | null;
}

interface ReferencesEdges<T> {
  references?: {
    edges: Array<{
      node: T;
    }>;
  } | null;
}

interface ContentBlockNode {
  id?: string;
  fields?: Array<{
    key: string;
    value?: string | null;
    type: string;
    reference?: unknown;
    references?: unknown;
  }>;
}

interface TrainingMetaobject {
  description?: ReferencesEdges<ContentBlockNode>;
  howItWorksTitle?: { value: string | null } | null;
  howItWorks?: ReferencesEdges<{ fields: FeatureField[] }>;
  modulesTitle?: { value: string | null } | null;
  modules?: ReferencesEdges<{ fields: FeatureField[] }>;
  logos?: ReferencesEdges<ContentBlockNode>;
  videoTitle?: { value: string | null } | null;
  video?: {
    reference?: {
      sources?: Array<{ url: string; mimeType: string }>;
    } | null;
  } | null;
  videoPoster?: {
    reference?: {
      image?: { url: string } | null;
    } | null;
  } | null;
  faqTitle?: { value: string | null } | null;
  faq?: ReferencesEdges<{ fields: Array<{ key: string; value: string | null }> }>;
}

interface TrainingPageRawData {
  page?: {
    id: string;
    title: string;
    handle: string;
    seo?: {
      title?: string | null;
      description?: string | null;
    } | null;
    training?: {
      reference?: TrainingMetaobject | null;
    } | null;
  } | null;
}

export interface ParsedTrainingPageData {
  id: string;
  title: string;
  handle: string;
  seo: {
    title: string;
    description: string | null;
  };
  training: TrainingPageData;
}

function parseFeatureItems(
  references?: {
    edges: Array<{
      node: {
        fields: FeatureField[];
      };
    }>;
  } | null,
): FeatureItem[] {
  if (!references?.edges) return [];

  return references.edges.map(edge => {
    const fields = edge.node.fields;
    const getField = (key: string) => fields.find(f => f.key === key)?.value ?? null;
    const iconField = fields.find(f => f.key === 'icon');

    return {
      title: getField('title'),
      description: getField('description'),
      icon: iconField?.reference?.image?.url ?? null,
    };
  });
}

function parseFaqItems(
  references?: {
    edges: Array<{
      node: {
        fields: Array<{ key: string; value: string | null }>;
      };
    }>;
  } | null,
): FaqItem[] {
  if (!references?.edges) return [];

  return references.edges.map(edge => {
    const fields = edge.node.fields;
    const getField = (key: string) => fields.find(f => f.key === key)?.value ?? null;

    return {
      question: getField('question'),
      answer: getField('answer'),
    };
  });
}

export function parseTrainingPageData(data: TrainingPageRawData): ParsedTrainingPageData | null {
  if (!data.page) return null;

  const { page } = data;
  const { id, title, handle, seo } = page;
  const trainingData = page.training?.reference;

  // Parse content blocks from training metaobject
  const contentBlocks = parseContentBlocks(
    trainingData?.description?.references as Parameters<typeof parseContentBlocks>[0],
  );

  // Parse logos as content blocks
  const logos = parseContentBlocks(trainingData?.logos?.references as Parameters<typeof parseContentBlocks>[0]);

  // Parse training-specific data
  const training: TrainingPageData = {
    contentBlocks,
    howItWorksTitle: trainingData?.howItWorksTitle?.value ?? null,
    howItWorks: parseFeatureItems(trainingData?.howItWorks?.references),
    modulesTitle: trainingData?.modulesTitle?.value ?? null,
    modules: parseFeatureItems(trainingData?.modules?.references),
    logos,
    videoTitle: trainingData?.videoTitle?.value ?? null,
    video: trainingData?.video?.reference?.sources?.[0]?.url ?? null,
    videoPoster: trainingData?.videoPoster?.reference?.image?.url ?? null,
    faqTitle: trainingData?.faqTitle?.value ?? null,
    faq: parseFaqItems(trainingData?.faq?.references),
  };

  return {
    id,
    title,
    handle,
    seo: {
      title: seo?.title || title,
      description: seo?.description || null,
    },
    training,
  };
}

export async function getTrainingPage(handle: string): Promise<ParsedTrainingPageData | null> {
  const data = await serverGraphqlFetcher<TrainingPageRawData>(
    GET_TRAINING_PAGE,
    { handle },
    { tags: ['page', handle] },
  );
  return parseTrainingPageData(data);
}

export const getTrainingPageQueryOptions = (handle: string) => {
  return queryOptions({
    queryKey: ['training-page', handle],
    queryFn: async () => {
      return serverGraphqlFetcher<TrainingPageRawData>(GET_TRAINING_PAGE, { handle }, { tags: ['page', handle] });
    },
    staleTime: STALE_TIME.ONE_HOUR,
    select: (data): ParsedTrainingPageData | null => parseTrainingPageData(data),
  });
};
