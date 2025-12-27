import { convertSchemaToHtml } from '@thebeyondgroup/shopify-rich-text-renderer';

import { cn } from '@/shared/lib/utils';

import type { Schema } from '@thebeyondgroup/shopify-rich-text-renderer';
import type { ComponentPropsWithoutRef, FC } from 'react';

interface RichTextSchema extends ComponentPropsWithoutRef<'div'> {
  schema: string | Schema | Schema[];
}

export const RichText: FC<RichTextSchema> = ({ schema, className, ...props }) => {
  const html = convertSchemaToHtml(schema, { scoped: true });

  return (
    <div
      className={cn(
        'prose prose-base prose-p:mt-0 prose-h2:mt-0 prose-h3:mt-0 prose-h3:font-bold prose-li:marker:text-foreground text-foreground max-w-none',
        className,
      )}
      dangerouslySetInnerHTML={{ __html: html }}
      {...props}
    />
  );
};
