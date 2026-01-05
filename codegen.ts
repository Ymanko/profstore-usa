import { config as dotenvConfig } from 'dotenv';

import type { CodegenConfig } from '@graphql-codegen/cli';

dotenvConfig();

const config: CodegenConfig = {
  schema: {
    [`${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/api/2024-04/graphql.json`]: {
      headers: {
        'X-Shopify-Storefront-Access-Token': process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN || '',
      },
    },
  },
  documents: ['src/**/*.graphql.ts'],
  ignoreNoDocuments: true,
  generates: {
    './src/shared/lib/graphql/': {
      preset: 'client',
      presetConfig: {
        fragmentMasking: false,
      },
      config: {
        useTypeImports: true,
        enumsAsTypes: true,
        skipTypename: false,
      },
    },
  },
};

export default config;
