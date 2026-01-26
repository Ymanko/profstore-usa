'use client';

import { useQuery } from '@tanstack/react-query';
import { LoaderCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useDebounce } from 'use-debounce';

import { Show } from '@/shared/components/common/show';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/shared/components/ui/command';
import { Typography } from '@/shared/components/ui/typography';
import { useSearchState } from '@/shared/hooks/use-search-state';
import { searchQueryOptions } from '@/shared/queries/search/search-query/search-query';

const SEARCH_DEBOUNCE_MS = 300;

export function Searchbar() {
  const { searchValue, setSearchValue, isFocus, handleFocus, handleBlur, closeSearch } = useSearchState();

  const [debouncedValue] = useDebounce(searchValue, SEARCH_DEBOUNCE_MS);
  const { data: searchData, isFetching: isLoadingSearch } = useQuery(searchQueryOptions(debouncedValue.trim()));

  return (
    <Command className='bg-surface-foreground relative w-full overflow-visible' shouldFilter={false}>
      <CommandInput
        placeholder='Product Search'
        value={searchValue}
        onValueChange={setSearchValue}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className='text-base'
      />

      {isFocus && searchValue.trim() && (
        <CommandList className='border-border animate-in fade-in-0 absolute top-14 left-0 z-50 w-full rounded-lg border bg-white pb-1 shadow-xs duration-150'>
          <Show
            when={!isLoadingSearch}
            fallback={
              <div className='flex items-center justify-center py-6'>
                <LoaderCircle className='text-primary size-6 animate-spin' />
              </div>
            }
          >
            <Show
              when={searchData && (searchData.products.length > 0 || searchData.collections.length > 0)}
              fallback={
                <div className='p-3 text-center'>
                  <CommandEmpty className='text-base'>No results found</CommandEmpty>
                </div>
              }
            >
              {searchData?.products && searchData.products.length > 0 && (
                <CommandGroup heading='Products'>
                  {searchData.products.map(product => {
                    const altText = product.images.edges[0]?.node?.altText || product.title;
                    const imageUrl = product.images.edges[0]?.node?.url;
                    const price = product.priceRange.maxVariantPrice.amount;

                    // Build product URL: /{category}/{subcategory}/{product}
                    const collection = product.collections?.edges[0]?.node;
                    const reference = collection?.metafield?.reference;
                    const categoryHandle =
                      reference && 'handle' in reference ? (reference.handle as string) : undefined;
                    const subcategoryHandle = collection?.handle;

                    const productUrl =
                      categoryHandle && subcategoryHandle
                        ? `/${categoryHandle}/${subcategoryHandle}/${product.handle}`
                        : `/catalog/${product.handle}`;

                    return (
                      <CommandItem key={product.id} asChild>
                        <Link href={productUrl} className='flex items-center gap-3' onClick={closeSearch}>
                          {imageUrl && (
                            <Image
                              src={imageUrl}
                              alt={altText}
                              width={60}
                              height={60}
                              className='rounded object-cover'
                              loading='lazy'
                            />
                          )}
                          <div className='flex flex-col gap-1'>
                            <Typography as='span' className='font-medium'>
                              {product.title}
                            </Typography>
                            <Typography as='span' className='text-muted-foreground text-sm'>
                              ${price}
                            </Typography>
                          </div>
                        </Link>
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              )}

              {searchData?.collections && searchData.collections.length > 0 && (
                <>
                  <CommandSeparator />
                  <CommandGroup heading='Collections'>
                    {searchData.collections.map(collection => {
                      const reference = collection.metafield?.reference;
                      const categoryHandle =
                        reference && 'handle' in reference ? (reference.handle as string) : undefined;
                      const collectionUrl = categoryHandle
                        ? `/${categoryHandle}/${collection.handle}`
                        : `/collections/${collection.handle}`;

                      return (
                        <CommandItem key={collection.id} asChild>
                          <Link href={collectionUrl} onClick={closeSearch}>
                            <Typography as='span'>{collection.title}</Typography>
                          </Link>
                        </CommandItem>
                      );
                    })}
                  </CommandGroup>
                </>
              )}

              <CommandSeparator />

              <Link
                href={`/search?q=${encodeURIComponent(searchValue.trim())}`}
                className='text-primary hover:text-primary/60 block p-2 text-center text-sm font-medium transition-colors duration-200'
                onClick={closeSearch}
              >
                All results
              </Link>
            </Show>
          </Show>
        </CommandList>
      )}
    </Command>
  );
}
