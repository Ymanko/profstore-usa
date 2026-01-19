'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { List } from '@/shared/components/common/list';
import { Show } from '@/shared/components/common/show';
import { Button } from '@/shared/components/ui/button';
import { Typography } from '@/shared/components/ui/typography';
import { getGlobalBenefitsQueryOptions } from '@/shared/queries/global/get-global-benefits';

import type { ProductIdProps } from '@/shared/types/common';

interface ProductBenefitsProps extends Partial<ProductIdProps> {
  installmentAmount?: string;
}

export function ProductBenefits({ productId, installmentAmount }: ProductBenefitsProps) {
  const { data: benefits } = useSuspenseQuery(getGlobalBenefitsQueryOptions);

  if (benefits?.excludedProductId && productId === benefits.excludedProductId) {
    return null;
  }

  return (
    <Show when={!!benefits?.benefitsList?.length}>
      {benefits?.callToAction && installmentAmount && (
        <div className='mb-3 inline-grid justify-items-start gap-x-0.5 sm:inline-flex sm:items-center sm:justify-between'>
          <Typography className='text-lg font-light text-nowrap'>
            4 interest-free payments of <span className='font-bold'>{installmentAmount}</span>
          </Typography>

          <Button variant='link' className='text-secondary font-montserrat -ml-4 text-left text-lg md:ml-0'>
            Apply Now
          </Button>
        </div>
      )}

      <List
        data={benefits?.benefitsList ?? []}
        renderItem={benefit => (
          <div className='flex items-center gap-1.25'>
            <Typography className='tracking-normal text-wrap md:text-lg'>{benefit}</Typography>
          </div>
        )}
        keyExtractor={(_, i) => i.toString()}
        className='space-y-4.5'
        itemClassName='list-disc ml-6'
      />
    </Show>
  );
}
