'use client';

import { useQuery } from '@tanstack/react-query';
import { LayoutGrid, LoaderCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useDebounce } from 'use-debounce';

import { Show } from '@/components/common/Show';
import { Button } from '@/components/ui/Button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/Command';
import { Typography } from '@/components/ui/Typography';
import { SEARCH_DEBOUNCE_MS } from '@/constants/search';
import { useSearchState } from '@/hooks/use-search-state';
import { cn } from '@/lib/utils';
import { searchQueryOptions } from '@/queries/search-query';

import type { ComponentPropsWithoutRef, FC } from 'react';

export const Searchbar: FC<ComponentPropsWithoutRef<'div'>> = ({ className, ...props }) => {
  const { searchValue, setSearchValue, isFocus, handleFocus, handleBlur } = useSearchState();

  const [debouncedValue] = useDebounce(searchValue, SEARCH_DEBOUNCE_MS);
  const { data, isFetching: isLoadingSearch } = useQuery(searchQueryOptions(debouncedValue.trim()));

  return (
    <div className={cn('grid items-center gap-5 xl:grid-cols-[auto_1fr]', className)} {...props}>
      <Button size='lg' className='h-12.5 gap-2.5'>
        <LayoutGrid className='text-accent size-6' />
        <Typography as='span' className='font-medium'>
          Catalog
        </Typography>
      </Button>

      <Command className='relative w-full overflow-visible' shouldFilter={false}>
        <CommandInput
          placeholder='Search products...'
          value={searchValue}
          onValueChange={setSearchValue}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className='text-base'
        />

        {isFocus && searchValue.trim() && (
          <CommandList className='border-border animate-in fade-in-0 absolute top-14 left-0 z-50 w-full rounded-lg border bg-white shadow-xs duration-150'>
            <Show
              when={!isLoadingSearch}
              fallback={
                <div className='flex items-center justify-center py-6'>
                  <LoaderCircle className='text-primary size-6 animate-spin' />
                </div>
              }
            >
              <Show
                when={data && (data.products.length > 0 || data.collections.length > 0)}
                fallback={
                  <div className='p-3 text-center'>
                    <CommandEmpty className='font-montserrat text-base'>No results found</CommandEmpty>
                  </div>
                }
              >
                {data?.products && data.products.length > 0 && (
                  <CommandGroup heading='Products'>
                    {data.products.map(product => {
                      const altText = product.images.edges[0]?.node?.altText || product.title;
                      const imageUrl = product.images.edges[0]?.node?.url;
                      const price = product.priceRange.maxVariantPrice.amount;

                      return (
                        <CommandItem key={product.id} asChild>
                          <Link href={`/catalog/${product.handle}`} className='flex items-center gap-3'>
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

                {data?.collections && data.collections.length > 0 && (
                  <>
                    <CommandSeparator />
                    <CommandGroup heading='Collections'>
                      {data.collections.map(collection => (
                        <CommandItem key={collection.id} asChild>
                          <Link href={`/collections/${collection.handle}`}>
                            <Typography as='span'>{collection.title}</Typography>
                          </Link>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </>
                )}

                <CommandSeparator />
                <div className='p-2'>
                  <Link
                    href='/catalog'
                    className='text-primary hover:text-primary/80 block text-center text-sm font-medium transition-colors'
                  >
                    All results
                  </Link>
                </div>
              </Show>
            </Show>
          </CommandList>
        )}
      </Command>
    </div>
  );
};
