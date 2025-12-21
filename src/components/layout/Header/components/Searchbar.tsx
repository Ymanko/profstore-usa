'use client';

import * as Accordion from '@radix-ui/react-accordion';
import { useSuspenseQuery } from '@tanstack/react-query';
import { LayoutGrid, LoaderCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { useBoolean, useMedia } from 'react-use';
import { useDebounce } from 'use-debounce';

import { AppContainer } from '@/components/common/AppContainer';
import { List } from '@/components/common/List';
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
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/Dropdown-Menu';
import { Icon } from '@/components/ui/Icon';
import { Typography } from '@/components/ui/Typography';
import { SEARCH_DEBOUNCE_MS } from '@/constants/search';
import { useSearchState } from '@/hooks/use-search-state';
import { cn } from '@/lib/utils';
import { getMenuItemsQueryOptions } from '@/queries/get-menu-items';
import { searchQueryOptions } from '@/queries/search-query';
import { getLastSegment } from '@/utils/parsers/getLastSegment';
import { getPathAfterCom } from '@/utils/parsers/getPathAfterCom';
import { parseSubCategoryData } from '@/utils/parsers/parseSubcategoryData';

import type { MenuItem } from '@/lib/graphql/graphql';
import type { ComponentPropsWithoutRef, FC } from 'react';

export const Searchbar: FC<ComponentPropsWithoutRef<'div'>> = ({ className, ...props }) => {
  const router = useRouter();
  const { searchValue, setSearchValue, isFocus, handleFocus, handleBlur } = useSearchState();
  const [activeId, setActiveId] = React.useState<string | null>(null);
  const [isCatalogOpen, setIsCatalogOpen] = useBoolean(false);
  const isMobile = useMedia('(max-width: 767px)');

  const { data: categories } = useSuspenseQuery(getMenuItemsQueryOptions);

  const [debouncedValue] = useDebounce(searchValue, SEARCH_DEBOUNCE_MS);
  const { data: searchData, isFetching: isLoadingSearch } = useSuspenseQuery(searchQueryOptions(debouncedValue.trim()));

  const activeCategory = categories.find(c => c.id === activeId);

  const handleCategoryClick = (item: MenuItem) => {
    if (item.url) {
      router.push(getPathAfterCom(item.url));
      setIsCatalogOpen(false);
    }
  };

  React.useEffect(() => {
    document.body.style.overflow = isCatalogOpen ? 'hidden' : '';
  }, [isCatalogOpen]);

  return (
    <div className={cn('grid items-center gap-5 md:grid-cols-[auto_1fr]', className)} {...props}>
      <DropdownMenu open={isCatalogOpen} onOpenChange={setIsCatalogOpen} modal={false}>
        <DropdownMenuTrigger asChild>
          <Button size='lg' className={cn('relative h-12.5 gap-2.5', isCatalogOpen ? 'bg-secondary' : 'bg-primary')}>
            <LayoutGrid className='text-accent size-6' />
            <Typography as='span' className='font-medium'>
              Catalog
            </Typography>
            {/* {isCatalogOpen && <Icon className='absolute bottom-[-96px] md:bottom-[-26px] md:left-14 z-60' name="vector" />} */}
          </Button>
        </DropdownMenuTrigger>

        {/* Backdrop */}
        {isCatalogOpen && (
          <div
            className='absolute right-0 left-0 z-40 bg-black/40'
            // className="fixed inset-0 z-40 bg-black/40"
            onClick={() => setIsCatalogOpen(false)}
            style={{ top: '100%', height: '100vh' }}
          />
        )}
        {/* <Icon className='absolute top-[-10px] md:left-58 left-[50%] z-60' name="vector" /> */}
        <DropdownMenuContent
          style={{ width: '100vw', maxWidth: '100%' }}
          className='right-0 left-0 z-40 flex overflow-auto border-none bg-transparent pt-0.5'
          onClick={() => setIsCatalogOpen(false)}
          align='start'
          sideOffset={isMobile ? 90 : 20}
        >
          <AppContainer
            className='flex h-full w-full overflow-auto'
            onClick={e => activeCategory && activeCategory?.items?.length > 0 && e.stopPropagation()}
          >
            {/* Desktop Sidebar */}
            <div className='bg-muted border-secondary relative hidden shrink-0 border-t-5 py-4 shadow-[inset_-10px_0_10px_0_rgba(0,0,0,0.1)] md:block'>
              <List
                data={categories}
                renderItem={category => (
                  <button
                    key={category.id}
                    className={cn(
                      'flex w-full items-center gap-3 px-5 py-3 text-left transition-colors',
                      'from-sidebar-active-20 to-muted-20 hover:text-sidebar-active hover:bg-gradient-to-r',
                      activeId === category.id &&
                        'from-sidebar-active-20 to-muted-20 text-sidebar-active bg-gradient-to-r',
                    )}
                    onMouseEnter={() => {
                      setActiveId(category.id);
                      // if (category.items && category.items.length > 0) {
                      // }
                    }}
                    onClick={() => {
                      if (!category.items || category.items.length === 0) {
                        handleCategoryClick(category);
                      } else {
                        setActiveId(category.id);
                      }
                    }}
                  >
                    <Icon
                      name='equipment'
                      className={cn('size-5 shrink-0', activeId === category.id && 'text-sidebar-active')}
                    />
                    <Typography as='span' className='font-normal'>
                      {category.title}
                    </Typography>
                  </button>
                )}
                keyExtractor={category => category.id}
              />
            </div>

            {/* Mobile Accordion */}
            <Accordion.Root
              type='single'
              collapsible
              className='bg-background border-secondary w-full border-t-5 md:hidden'
            >
              <div className='py-4'>
                {categories.map(category => {
                  const hasSub = category.items && category.items.length > 0;

                  return (
                    <Accordion.Item key={category.id} value={category.id}>
                      <Accordion.Header>
                        {hasSub ? (
                          <Accordion.Trigger className='group hover:bg-sidebar-active/10 hover:text-sidebar-active data-[state=open]:accordion-open flex w-full items-center gap-3 px-5 py-3 text-left transition-colors'>
                            <Icon name='equipment' className='size-5 shrink-0' />
                            <Typography as='span' className='flex-1 font-normal'>
                              {category.title}
                            </Typography>
                            <Icon
                              name='arrowDown'
                              className='size-5 transition-transform group-data-[state=open]:rotate-180'
                            />
                          </Accordion.Trigger>
                        ) : (
                          <button
                            className='hover:bg-sidebar-active/10 hover:text-sidebar-active flex w-full items-center gap-3 px-5 py-3 text-left transition-colors'
                            onClick={() => handleCategoryClick(category)}
                          >
                            <Icon name='equipment' className='size-5 shrink-0' />
                            <Typography as='span' className='font-normal'>
                              {category.title}
                            </Typography>
                          </button>
                        )}
                      </Accordion.Header>

                      {hasSub && (
                        <Accordion.Content className='data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden'>
                          <div className='flex flex-col'>
                            {category.items?.map(sub => {
                              const parsed = parseSubCategoryData(sub.title);

                              return (
                                <Link
                                  key={sub.id}
                                  href={getLastSegment(sub.id)}
                                  onClick={() => setIsCatalogOpen(false)}
                                  className='hover:text-sidebar-active flex items-center px-6 py-2 uppercase transition-colors'
                                >
                                  <Image
                                    src={parsed.image || 'https://placehold.co/100x100.png'}
                                    alt={parsed.title}
                                    width={40}
                                    height={40}
                                    className='shrink-0 object-contain'
                                  />
                                  <Typography as='span' className='text-xs'>
                                    {parsed.title}
                                  </Typography>
                                </Link>
                              );
                            })}
                          </div>
                        </Accordion.Content>
                      )}
                    </Accordion.Item>
                  );
                })}
              </div>
            </Accordion.Root>

            {/* Desktop Content*/}
            {activeCategory?.items && activeCategory.items.length > 0 && (
              <div className='bg-background border-secondary relative hidden flex-1 border-t-5 p-10 md:block xl:px-[70px] xl:py-[35px]'>
                <button
                  onClick={() => setIsCatalogOpen(false)}
                  className='hover:bg-sidebar-active/10 absolute top-2 right-2 rounded-sm p-1 opacity-70 transition-opacity hover:opacity-100'
                >
                  <Icon name='close' className='size-6' />
                </button>

                <div className='grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-5'>
                  {activeCategory.items.map(sub => {
                    const parsed = parseSubCategoryData(sub.title);

                    return (
                      <Link
                        key={sub.id}
                        href={getLastSegment(sub.id)}
                        onClick={() => setIsCatalogOpen(false)}
                        className='border-border group hover:border-border flex flex-col items-center rounded-lg border p-4 text-center transition-all'
                      >
                        <div className='border-border mb-3 flex h-30 w-full items-center justify-center border-b pb-3 transition-transform group-hover:scale-105'>
                          <Image
                            src={parsed.image || 'https://placehold.co/100x100.png'}
                            alt={parsed.title}
                            width={100}
                            height={100}
                            className='object-contain'
                          />
                        </div>
                        <Typography
                          as='p'
                          className='font-montserrat group-hover:text-sidebar-active text-sm font-light uppercase transition-colors'
                        >
                          {parsed.title}
                        </Typography>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </AppContainer>
        </DropdownMenuContent>
      </DropdownMenu>

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

                {searchData?.collections && searchData.collections.length > 0 && (
                  <>
                    <CommandSeparator />
                    <CommandGroup heading='Collections'>
                      {searchData.collections.map(collection => (
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
