import { queryOptions } from '@tanstack/react-query';

import { baseClient } from '@/shared/lib/graphql/base-client';
import { GET_STORE_CONTACT } from '@/shared/queries/contacts/query';

import type { SocialLink, StoreContact, StoreContactData, StoreContactField } from '@/shared/queries/contacts/types';

export function parseStoreContact(fields: StoreContactField[]): StoreContact {
  const getField = (key: string) => fields.find(f => f.key === key)?.value ?? null;
  const phonesJson = getField('phones');

  // Parse socials from references
  const socialsField = fields.find(f => f.key === 'socials');
  const socials: SocialLink[] =
    socialsField?.references?.edges.map(edge => {
      const socialFields = edge.node.fields;
      const getSocialField = (key: string) => socialFields.find(f => f.key === key)?.value ?? null;
      const iconField = socialFields.find(f => f.key === 'icon');

      return {
        title: getSocialField('title'),
        url: getSocialField('url'),
        icon: iconField?.reference?.image?.url ?? null,
      };
    }) ?? [];

  return {
    title: getField('title'),
    address: getField('address'),
    phones: phonesJson ? JSON.parse(phonesJson) : [],
    mainPhone: getField('main_phone'),
    email: getField('email'),
    workingHours: getField('working_hours'),
    latitude: getField('latitude') ? parseFloat(getField('latitude')!) : null,
    longitude: getField('longitude') ? parseFloat(getField('longitude')!) : null,
    socials,
  };
}

export async function getStoreContact(handle: string): Promise<StoreContact | null> {
  const data = await baseClient<StoreContactData>(GET_STORE_CONTACT, { handle });

  if (!data.metaobject) return null;

  return parseStoreContact(data.metaobject.fields);
}

export function getStoreContactQueryOptions(handle: string) {
  return queryOptions({
    queryKey: ['store-contact', handle],
    queryFn: () => getStoreContact(handle),
  });
}
