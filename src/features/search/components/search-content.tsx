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
      <Typography variant='h3' className='mb-2.5 text-lg font-bold md:mb-4 md:text-[22px] md:leading-5.5'>
        Search criteria
      </Typography>

      <SearchCriteriaForm />

      <Separator className='bg-accent mt-13 mb-10.5 h-0.75! md:mt-14.5 md:mb-11.5' />

      <div className='space-y-6.5 md:space-y-6 xl:space-y-8.5'>
        <Typography variant='h3' className='text-[22px] leading-5.5 font-bold'>
          Products matching your search criteria
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
