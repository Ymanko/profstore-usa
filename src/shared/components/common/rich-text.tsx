import { convertSchemaToHtml } from '@thebeyondgroup/shopify-rich-text-renderer';

import type { Schema } from '@thebeyondgroup/shopify-rich-text-renderer';
import type { FC } from 'react';

type RichTextSchema = {
  schema: string | Schema | Schema[];
};

export const RichText: FC<RichTextSchema> = ({ schema }) => {
  const html = convertSchemaToHtml(schema, { scoped: true });

  return (
    <div
      className='prose prose-base prose-p:mt-0 prose-h2:mt-0 prose-h3:mt-0 prose-h3:font-bold prose-li:marker:text-foreground text-foreground max-w-none'
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};
