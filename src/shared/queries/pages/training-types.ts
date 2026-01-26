import type { ContentBlock } from '@/shared/utils/parsers/parse-content-blocks';

export interface FeatureItem {
  title: string | null;
  description: string | null;
  icon: string | null;
}

export interface FaqItem {
  question: string | null;
  answer: string | null;
}

export interface TrainingPageData {
  contentBlocks: ContentBlock[];
  howItWorksTitle: string | null;
  howItWorks: FeatureItem[];
  modulesTitle: string | null;
  modules: FeatureItem[];
  logos: ContentBlock[];
  videoTitle: string | null;
  video: string | null;
  videoPoster: string | null;
  faqTitle: string | null;
  faq: FaqItem[];
}
