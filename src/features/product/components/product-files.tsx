import { ProductWrapper } from '@/features/product/components/product-tools';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui/tabs';
import { cn } from '@/shared/lib/utils';

import type { ComponentProps } from 'react';

export function ProductFiles({ className, ...props }: ComponentProps<'div'>) {
  return (
    <ProductWrapper className={cn('p-2.5', className)} {...props}>
      <Tabs defaultValue='files'>
        <TabsList className='w-full gap-4.25 rounded-xl bg-white px-5 py-2.5'>
          <TabsTrigger value='files'>Files</TabsTrigger>
          <TabsTrigger value='manuals'>Manuals</TabsTrigger>
        </TabsList>

        <div className='p-5'>
          <TabsContent value='files' className='grid grid-cols-2 gap-3.75 md:grid-cols-3 md:gap-5 xl:grid-cols-2'>
            Download available files here.
          </TabsContent>

          <TabsContent value='manuals' className='grid grid-cols-2 gap-3.75 md:grid-cols-3 md:gap-5 xl:grid-cols-2'>
            Download available manuals here.
          </TabsContent>
        </div>
      </Tabs>
    </ProductWrapper>
  );
}
