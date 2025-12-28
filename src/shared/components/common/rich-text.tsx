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
        'prose prose-base text-foreground max-w-none',
        // Text styles
        'prose-h2:mt-0',
        'prose-h3:mt-0 prose-h3:font-bold',
        'prose-p:mt-0',
        // List styles
        'prose-ul:grid prose-ul:grid-cols-4',
        'prose-li:marker:text-foreground',
        // Image styles - responsive sizes based on design
        'prose-img:w-full prose-img:h-auto prose-img:object-cover prose-img:object-center',
        'prose-img:my-4 prose-img:mx-auto',
        // Mobile: 345x318
        'prose-img:max-w-86.25 prose-img:aspect-345/318',
        // Tablet: 669x410
        'md:prose-img:max-w-167.25 md:prose-img:aspect-669/410',
        // Desktop: 617x570
        'xl:prose-img:max-w-154.25 xl:prose-img:aspect-617/570',
        className,
      )}
      dangerouslySetInnerHTML={{ __html: html }}
      {...props}
    />
  );
};
