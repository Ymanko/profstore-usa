export interface SocialLink {
  title: string | null;
  url: string | null;
  icon: string | null;
}

export interface StoreContact {
  title: string | null;
  address: string | null;
  phones: string[];
  mainPhone: string | null;
  email: string | null;
  workingHours: string | null;
  latitude: number | null;
  longitude: number | null;
  socials: SocialLink[];
}

export interface SocialLinkField {
  key: string;
  value: string | null;
  reference?: {
    image?: {
      url: string;
    } | null;
  } | null;
}

export interface StoreContactField {
  key: string;
  value: string | null;
  references?: {
    edges: Array<{
      node: {
        fields: SocialLinkField[];
      };
    }>;
  } | null;
}

export interface StoreContactData {
  metaobject: {
    fields: StoreContactField[];
  } | null;
}
