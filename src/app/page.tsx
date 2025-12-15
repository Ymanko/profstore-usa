import { PageWrapper } from '@/components/common/PageWrapper';
import { Section } from '@/components/common/Section';
import { Typography } from '@/components/ui/Typography';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ProfStore',
  description: 'Some shop',
};

export default function Home() {
  return (
    <PageWrapper className='pt-4.5'>
      <Typography variant='h1' className='sr-only'>
        Welcome to ProfStore
      </Typography>

      {/*MainBanner*/}
      <Section className='pb-10.5 md:pb-12.5'>
        <Typography variant='h2' as='h2'>
          Banner
        </Typography>
      </Section>

      {/*Category*/}
      <Section className='pb-10.5 md:pb-12.5'>
        <Typography variant='h2' as='h2'>
          Categories
        </Typography>
      </Section>

      {/*Recommended*/}
      <Section className='pb-10.5 md:pb-12.5'>
        <div className='border-t-accent mb-10 border-t-3 md:mb-12.5 xl:mb-15' />

        <Typography variant='h2' as='h2'>
          Recommended
        </Typography>
      </Section>

      {/*ProductTabs*/}
      <Section className='pb-10.5 md:pb-12.5'>
        <Typography variant='h2' as='h2'>
          Product Tabs
        </Typography>
      </Section>

      {/*Description*/}
      <Section className='pb-10.5 md:pb-12.5'>
        <Typography variant='h2' as='h2'>
          Description
        </Typography>
      </Section>

      {/*Our Brands*/}
      <Section className='bg-border py-12.5 xl:pt-8 xl:pb-13'>
        <Typography variant='h2' as='h2'>
          Our Brands
        </Typography>
      </Section>
    </PageWrapper>
  );
}
