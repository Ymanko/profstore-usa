'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { RichText } from '@/shared/components/common/rich-text';
import { Section } from '@/shared/components/common/section';
import { Typography } from '@/shared/components/ui/typography';
import { getHomePageContentQueryOptions } from '@/shared/queries/home/content/get-home-page-content';

export function Description() {
  const {
    data: { descriptionTitle, descriptionContent },
  } = useSuspenseQuery(getHomePageContentQueryOptions);

  if (!descriptionTitle || !descriptionContent) return null;

  return (
    <Section className='pt-2.5 pb-5'>
      <Typography variant='h2' as='h2' className='mb-5 text-[27px] md:mb-4.5 md:text-3xl'>
        {descriptionTitle}
      </Typography>

      <RichText schema={descriptionContent} />
    </Section>
  );
}
