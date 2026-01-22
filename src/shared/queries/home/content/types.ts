export type MetaobjectField = {
  key: string;
  value: string;
  reference?: {
    image?: {
      url: string;
      altText?: string;
    };
  } | null;
};

export type MetaobjectNode = {
  id: string;
  type: string;
  fields: MetaobjectField[];
};

export type MetaobjectEdge = {
  node: MetaobjectNode;
};

export type MetaobjectFieldWithReferences = {
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

export type Brand = {
  name: string;
  logo: string;
  logoAlt: string;
};

export type HomePageContent = {
  bannerSlides: BannerSlide[];
  showCategories: boolean;
  showRecommended: boolean;
  showNewAndSaleProducts: boolean;
  descriptionTitle: string;
  descriptionContent: string;
  brands: Brand[];
};
