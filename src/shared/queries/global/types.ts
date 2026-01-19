export interface GlobalBenefitsData {
  metaobjects: {
    edges: Array<{
      node: {
        handle: string;
        fields: Array<{
          key: string;
          value: string | null;
          reference: {
            id: string;
            handle: string;
          } | null;
        }>;
      };
    }>;
  };
}

export interface ParsedGlobalBenefits {
  title: string | null;
  callToAction: boolean;
  benefitsList: string[];
  excludedProductId: string | null;
  excludedProductHandle: string | null;
}
