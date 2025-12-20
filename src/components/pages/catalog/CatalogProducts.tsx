'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';

import { List } from '@/components/common/List';
import { Show } from '@/components/common/Show';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card';
import { getProductsQueryOptions } from '@/queries/get-products';

export function CatalogProducts() {
  const { data: products } = useSuspenseQuery(getProductsQueryOptions);

  return (
    <List
      data={products}
      renderItem={product => (
        <Card className='flex h-full flex-col'>
          <CardHeader>
            <Show when={product?.featuredImage?.url}>
              <Image
                src={product.featuredImage?.url}
                alt={product.featuredImage?.altText || product.title}
                width={300}
                height={400}
                className='mb-4 aspect-square w-full rounded-md object-cover'
              />
            </Show>
          </CardHeader>

          <CardContent className='grow'>
            <CardTitle>{product.title}</CardTitle>
            <CardDescription>{product.description}</CardDescription>
          </CardContent>

          <CardFooter className='mt-auto'>
            <Link
              href={`/catalog/${product.handle}`}
              className='text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-200'
            >
              View product →
            </Link>
          </CardFooter>
        </Card>
      )}
      keyExtractor={product => product.id}
      className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
    />
  );
}
