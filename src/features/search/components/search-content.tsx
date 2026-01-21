'use client';

import { useSuspenseInfiniteQuery, useSuspenseQuery } from '@tanstack/react-query';

import { LoadMore } from '@/features/collections/components/load-more';
import { SearchCriteriaForm } from '@/features/search/components/search-criteria-form';
import { useGetCollectionHandles } from '@/features/search/hooks/use-get-collection-handles';
import { useSearchParams } from '@/features/search/hooks/use-search-params';
import { List } from '@/shared/components/common/list';
import { ProductCard } from '@/shared/components/common/product-card';
import { Show } from '@/shared/components/common/show';
import { Separator } from '@/shared/components/ui/separator';
import { Typography } from '@/shared/components/ui/typography';
import { getCollectionsWithParentQueryOptions } from '@/shared/queries/search/collections-with-parent/get-collections-with-parent';
import { getSearchProductsInfiniteQueryOptions } from '@/shared/queries/search/search-product/get-search-products';
import { buildProductUrl } from '@/shared/utils/build-product-url';

export function SearchContent() {
  const { params } = useSearchParams();
  const { data: collections } = useSuspenseQuery(getCollectionsWithParentQueryOptions);
  const { getCollectionHandles } = useGetCollectionHandles(params, collections);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useSuspenseInfiniteQuery(
    getSearchProductsInfiniteQueryOptions({
      query: params.q,
      collectionHandles: getCollectionHandles(),
      inDescription: params.inDescription,
    }),
  );

  // Combine all products from all pages
  const allProducts = data.pages.flatMap(page => page.products.edges.map(edge => edge.node));

  return (
    <>
      <SearchCriteriaForm />

      <Separator className='bg-primary h-0.5' />

      <div className='space-y-6'>
        <Typography variant='h3' className='font-semibold'>
          Products matching your search criteria
          <Show when={allProducts.length > 0}>
            <span className='text-muted-foreground ml-2 text-base font-normal'>({allProducts.length})</span>
          </Show>
        </Typography>

        <Show
          when={allProducts.length > 0}
          fallback={
            <div className='py-12 text-center'>
              <Typography className='text-muted-foreground'>
                {params.q ? 'No products found matching your criteria' : 'Enter a search term to find products'}
              </Typography>
            </div>
          }
        >
          <List
            data={allProducts}
            renderItem={product => <ProductCard product={product} href={buildProductUrl(product)} />}
            keyExtractor={product => product.id}
            className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4'
          />

          {/* Load More Button */}
          <Show when={hasNextPage}>
            <div className='flex justify-center pt-6'>
              <LoadMore isLoading={isFetchingNextPage} onClick={() => fetchNextPage()} disabled={isFetchingNextPage} />
            </div>
          </Show>
        </Show>
      </div>
    </>
  );
}
