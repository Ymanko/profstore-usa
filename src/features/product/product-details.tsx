'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { MinusIcon, PlusIcon } from 'lucide-react';
import { useCounter } from 'react-use';

import { NotFound } from '@/features/layout/not-found';
import { Gallery } from '@/features/product/components/gallery';
import { Rating } from '@/features/product/components/rating';
import { BasketBtn } from '@/shared/components/common/basket-btn';
import { List } from '@/shared/components/common/list';
import { Show } from '@/shared/components/common/show';
import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import { Separator } from '@/shared/components/ui/separator';
import { Typography } from '@/shared/components/ui/typography';
import { getProductQueryOptions } from '@/shared/queries/products/get-product';

export function ProductDetails({ handle }: { handle: string }) {
  const { data: product } = useSuspenseQuery(getProductQueryOptions(handle));
  const [value, { inc, dec }] = useCounter(0, null, 0);

  const images = product?.images.edges.map(edge => edge.node) || [];

  return (
    <div className='container'>
      <Show when={product} fallback={<NotFound>Product not found</NotFound>}>
        <Typography variant='h1' as='h1' className='mb-3.5 md:mb-5'>
          {product?.title}
        </Typography>

        {/*Rating + Article*/}
        <div className='mb-6 items-center justify-between sm:flex md:mb-7.5'>
          <Rating rating={3.5} commentsCount={1} />
          <Typography className='text-muted-foreground font-inter'>
            Article: <span className='text-foreground'>0014</span>
          </Typography>
        </div>

        <div className='grid gap-12.5 md:gap-8.75 xl:grid-cols-16 xl:gap-5'>
          {/*Gallery*/}
          <Gallery className='xl:col-span-10' items={images} />

          {/*Discounts*/}
          <div className='space-y-6 xl:col-span-6'>
            <div className='bg-sidebar rounded-xl px-2.5 py-5 md:px-7.5 md:py-5.5'>
              <div className='flex items-center gap-x-4 md:gap-x-10'>
                {/*Price + Percentage*/}
                <Typography className='text-secondary text-3xl font-black md:text-[40px] md:leading-10'>
                  1,099 $
                </Typography>
                <Typography className='text-muted-foreground font-semibold md:text-xl'>13,233 $</Typography>
                <Badge className='bg-secondary ml-auto rounded-md px-5 py-1.5 text-sm font-semibold md:ml-0 md:text-base'>
                  20%
                </Badge>
              </div>

              <Separator className='my-3.75 md:mt-7.5 md:mb-6.25' />

              {/*List of benefits*/}
              <div className='inline-grid justify-items-start sm:inline-flex sm:items-center sm:justify-between'>
                <Typography className='text-lg font-light'>
                  4 interest-free payments of <span className='font-bold'>$274.75</span>
                </Typography>
                <Button variant='link' className='text-secondary font-montserrat text-lg font-normal'>
                  Apply Now
                </Button>
              </div>

              <List
                data={[
                  {
                    title: 'FREE Delivery',
                    description: 'when you spend over 40$ ex VAT',
                  },
                  {
                    title: 'FREE Returns',
                    description: '30 day money back guarantee',
                  },
                  {
                    title: 'FREE 1 Hour Click',
                    description: '& Collect check stock at your local store',
                  },
                  {
                    title: 'PREMIUM',
                    description: 'Delivery Options offered in checkout if available',
                  },
                ]}
                renderItem={item => (
                  <div className='flex items-center gap-1.25' key={item.title}>
                    <Typography className='tracking-normal text-wrap md:text-lg'>
                      <span className='font-bold'>{item.title} </span>
                      {item.description}
                    </Typography>
                  </div>
                )}
                keyExtractor={(_, i) => i.toString()}
                className='space-y-4.5'
                itemClassName='list-disc ml-6'
              />
            </div>

            {/*Actions*/}
            <div className='grid grid-cols-3 gap-5'>
              <div
                aria-label='Quantity selector'
                className='border-border flex items-center justify-between rounded-xl border px-1.5 py-1.25'
              >
                <Button
                  className='bg-accent hover:bg-accent/70 size-11.25 text-black'
                  onClick={() => dec()}
                  disabled={value <= 0}
                >
                  <MinusIcon strokeWidth={6} size={40} />
                </Button>

                <Typography className='text-muted-foreground text-[17px] leading-4.5'>{value}</Typography>

                <Button className='bg-accent hover:bg-accent/70 size-11.25 text-black' onClick={() => inc()}>
                  <PlusIcon strokeWidth={6} size={40} />
                </Button>
              </div>

              <BasketBtn />

              <Button
                className='h-13.5 bg-[linear-gradient(90deg,rgba(87,144,64,1),rgba(58,111,67,1)_100%)] text-xl'
                size='lg'
              >
                Buy
              </Button>
            </div>

            <Separator />
          </div>
        </div>
      </Show>
    </div>
  );
}
