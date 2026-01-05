'use client';

import * as Accordion from '@radix-ui/react-accordion';
import { useSuspenseQuery } from '@tanstack/react-query';
import { LayoutGrid } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useBoolean, useMedia } from 'react-use';

import { TransitionLayout } from '@/features/layout/transition-layout';
import { CategoryCard } from '@/shared/components/common/category-card';
import { List } from '@/shared/components/common/list';
import { Button } from '@/shared/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/shared/components/ui/dropdown-menu';
import { Icon } from '@/shared/components/ui/icon';
import { Typography } from '@/shared/components/ui/typography';
import { cn } from '@/shared/lib/utils';
import { getMenuItemsQueryOptions } from '@/shared/queries/get-menu-items';
import { getCollectionPath } from '@/shared/utils/parsers/get-collection-path';
import { getPathAfterCom } from '@/shared/utils/parsers/get-path-after-com';
import { parseSubcategoryData } from '@/shared/utils/parsers/parse-subcategory-data';

import type { MenuItem } from '@/shared/lib/graphql/graphql';

export function SiteMenu() {
  const router = useRouter();

  const [activeId, setActiveId] = useState<string | null>(null);
  const [isCatalogOpen, setIsCatalogOpen] = useBoolean(false);
  const isMobile = useMedia('(max-width: 767px)');

  const { data: categories } = useSuspenseQuery(getMenuItemsQueryOptions);

  const activeCategory = categories.find(c => c.id === activeId);

  const handleCategoryClick = (item: MenuItem) => {
    if (item.url) {
      router.push(getPathAfterCom(item.url));
      setIsCatalogOpen(false);
    }
  };

  return (
    <DropdownMenu open={isCatalogOpen} onOpenChange={setIsCatalogOpen} modal>
      <DropdownMenuTrigger asChild>
        <Button size='lg' className={cn('relative h-12.5 gap-2.5', isCatalogOpen ? 'bg-secondary' : 'bg-primary')}>
          <LayoutGrid className='text-accent size-6' />
          <Typography as='span' className='font-medium'>
            Catalog
          </Typography>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        style={{ width: '100vw', maxWidth: '100%' }}
        className='right-0 left-0 z-50 flex overflow-auto border-none bg-transparent pt-0.5'
        onClick={() => setIsCatalogOpen(false)}
        align='start'
        sideOffset={isMobile ? 90 : 20}
        withOverlay
        overlayClassName='top-[351px]! md:top-[173px]! xl:top-[169px]! bottom-0! left-0! right-0!'
      >
        <div className='container flex h-full w-full overflow-auto'>
          {/* Desktop Sidebar */}
          <div
            onClick={e => e.stopPropagation()}
            className='bg-muted border-secondary relative hidden shrink-0 border-t-5 py-4 shadow-[inset_-10px_0_10px_0_rgba(0,0,0,0.1)] md:block'
          >
            <List
              data={categories}
              renderItem={category => (
                <button
                  key={category.id}
                  className={cn(
                    'flex w-full items-center gap-3 px-5 py-3 text-left transition-colors',
                    'from-sidebar-active-20 to-muted-20 hover:text-sidebar-active hover:bg-linear-to-r',
                    activeId === category.id && 'from-sidebar-active-20 to-muted-20 text-sidebar-active bg-linear-to-r',
                  )}
                  onMouseEnter={() => setActiveId(category.id)}
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
            onClick={e => e.stopPropagation()}
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
                            const parsed = parseSubcategoryData(sub.title);

                            return (
                              <Link
                                key={sub.id}
                                href={getCollectionPath(sub.url)}
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
            <TransitionLayout
              onClick={e => e.stopPropagation()}
              className='bg-background border-secondary relative hidden flex-1 border-t-5 p-10 duration-200 md:block xl:px-17.5 xl:py-8.75'
            >
              <button
                onClick={() => setIsCatalogOpen(false)}
                className='hover:bg-sidebar-active/10 absolute top-2 right-2 rounded-sm p-1 opacity-70 transition-opacity hover:opacity-100'
              >
                <Icon name='close' className='size-6' />
              </button>

              <div className='grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-5'>
                {activeCategory.items.map(sub => {
                  const parsed = parseSubcategoryData(sub.title);

                  return (
                    <CategoryCard
                      key={sub.id}
                      href={getCollectionPath(sub.url)}
                      title={parsed.title}
                      image={parsed?.image ?? ''}
                      alt={parsed.title}
                      titleClassName='text-sm uppercase'
                      onClick={() => setIsCatalogOpen(false)}
                    />
                  );
                })}
              </div>
            </TransitionLayout>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
