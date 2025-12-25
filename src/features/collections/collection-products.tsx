'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { List } from '@/shared/components/common/list';
import { PageWrapper } from '@/shared/components/common/page-wrapper';
import { ProductCard } from '@/shared/components/common/product-card';
import { Section } from '@/shared/components/common/section';
import { Show } from '@/shared/components/common/show';
import { Typography } from '@/shared/components/ui/typography';
import { getSubcategoryProductsQueryOptions } from '@/shared/queries/collections/get-subcategory-products';

type CollectionProductsProps = {
  handle: string;
};

export function CollectionProducts({ handle }: CollectionProductsProps) {
  const { data } = useSuspenseQuery(
    getSubcategoryProductsQueryOptions({
      handle,
      first: 24,
    }),
  );

  if (!data.collection) {
    return (
      <PageWrapper>
        <Section className='py-10'>
          <Typography variant='body-lg' className='text-muted-foreground text-center'>
            Collection not found
          </Typography>
        </Section>
      </PageWrapper>
    );
  }

  const { collection } = data;
  const products = collection.products.edges.map(edge => edge.node);
  const filters = collection.products.filters;

  return (
    <PageWrapper>
      <div className='space-y-8'>
        <div>
          <Typography variant='h1' as='h1' className='mb-2'>
            {collection.title}
          </Typography>

          <Show when={collection.description}>
            <Typography variant='body' className='text-muted-foreground'>
              {collection.description}
            </Typography>
          </Show>
        </div>

        <div className='grid grid-cols-1 gap-8 lg:grid-cols-4'>
          {/* Filters sidebar */}
          <Show when={filters.length > 0}>
            <aside className='lg:col-span-1'>
              <Typography variant='h3' as='h3' className='mb-4'>
                Filters
              </Typography>

              <div className='space-y-4'>
                {filters.map(filter => (
                  <div key={filter.id} className='border-b pb-4'>
                    <Typography variant='body' className='mb-2 font-semibold'>
                      {filter.label}
                    </Typography>

                    <div className='space-y-2'>
                      {filter.values.map(value => (
                        <label key={value.id} className='flex cursor-pointer items-center gap-2'>
                          <input type='checkbox' className='h-4 w-4' />
                          <Typography className='flex-1'>{value.label}</Typography>
                          <Typography className='text-muted-foreground'>({value.count})</Typography>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </aside>
          </Show>

          {/* Products grid */}
          <div className={filters.length > 0 ? 'lg:col-span-3' : 'lg:col-span-4'}>
            <div className='mb-4 flex items-center justify-between'>
              <Typography variant='body'>
                {products.length} {products.length === 1 ? 'product' : 'products'}
              </Typography>
              {/* Sort dropdown will be here */}
            </div>

            <Show
              when={products.length > 0}
              fallback={
                <Typography variant='body-lg' className='text-muted-foreground py-20 text-center'>
                  No products found
                </Typography>
              }
            >
              <List
                data={products}
                renderItem={product => <ProductCard product={product} />}
                keyExtractor={product => product.id}
                className='grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3'
              />
            </Show>

            {/* Pagination will be here */}
            <Show when={collection.products.pageInfo.hasNextPage}>
              <div className='mt-8 text-center'>
                <button className='rounded-lg border px-6 py-3'>
                  <Typography variant='body'>Load more</Typography>
                </button>
              </div>
            </Show>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
