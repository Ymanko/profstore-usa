'use client';

import { useQuery } from '@tanstack/react-query';

import { List } from '@/shared/components/common/list';
import { Button } from '@/shared/components/ui/button';
import { Typography } from '@/shared/components/ui/typography';
import { getGlobalBenefitsQueryOptions } from '@/shared/queries/global/get-global-benefits';

interface ProductBenefitsProps {
  productId?: string;
  installmentAmount?: string;
}

export function ProductBenefits({ productId, installmentAmount }: ProductBenefitsProps) {
  const { data: benefits } = useQuery(getGlobalBenefitsQueryOptions());

  // Debug
  console.log('GlobalBenefits:', benefits);

  // Don't render if this product is excluded
  if (benefits?.excludedProductId && productId === benefits.excludedProductId) {
    return null;
  }

  // Fallback data if no benefits configured
  const benefitsList = benefits?.benefitsList?.length
    ? benefits.benefitsList
    : [
        'FREE Delivery when you spend over 40$ ex VAT',
        'FREE Returns 30 day money back guarantee',
        'FREE 1 Hour Click & Collect check stock at your local store',
        'PREMIUM Delivery Options offered in checkout if available',
      ];

  return (
    <>
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
        data={benefitsList}
        renderItem={benefit => (
          <div className='flex items-center gap-1.25'>
            <Typography className='tracking-normal text-wrap md:text-lg'>{benefit}</Typography>
          </div>
        )}
        keyExtractor={(_, i) => i.toString()}
        className='space-y-4.5'
        itemClassName='list-disc ml-6'
      />
    </>
  );
}
