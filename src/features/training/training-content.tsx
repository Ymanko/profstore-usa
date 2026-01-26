'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import Image from 'next/image';

import { ContentBlock } from '@/features/categories/components/content-block';
import { NotFound } from '@/features/layout/not-found';
import { List } from '@/shared/components/common/list';
import { Show } from '@/shared/components/common/show';
import { Typography } from '@/shared/components/ui/typography';
import { cn } from '@/shared/lib/utils';
import { getTrainingPageQueryOptions } from '@/shared/queries/pages';

import type { FaqItem, FeatureItem } from '@/shared/queries/pages';
import type { HandleProps } from '@/shared/types/common';

export function TrainingContent({ handle }: HandleProps) {
  const { data: page } = useSuspenseQuery(getTrainingPageQueryOptions(handle));

  if (!page) {
    return (
      <NotFound>
        <Typography className='text-muted-foreground mt-4'>Training page not found.</Typography>
      </NotFound>
    );
  }

  const { training } = page;

  return (
    <div className='container space-y-16 py-8'>
      {/* Hero / Content Blocks */}
      <Show when={training.contentBlocks?.length > 0}>
        <div className='space-y-12'>
          {training.contentBlocks.map(block => (
            <ContentBlock
              key={block.id}
              title={block.title}
              text={block.text}
              media={block.media}
              poster={block.poster}
              mediaPosition={block.mediaPosition}
              logos={block.logos}
            />
          ))}
        </div>
      </Show>

      {/* How It Works Section */}
      <Show when={training.howItWorks?.length > 0}>
        <FeatureSection title={training.howItWorksTitle} items={training.howItWorks} />
      </Show>

      {/* Modules Section */}
      <Show when={training.modules?.length > 0}>
        <FeatureSection
          className='grid-cols-1 md:grid-cols-2 lg:grid-cols-2'
          cardClassName='bg-secondary/15 rounded-lg p-5 xl:px-7.5 xl:py-8'
          title={training.modulesTitle}
          items={training.modules}
        />
      </Show>

      {/* Logos Section */}
      <Show when={training.logos?.length > 0}>
        <div className='space-y-12'>
          {training.logos.map(block => (
            <ContentBlock
              key={block.id}
              title={block.title}
              text={block.text}
              media={block.media}
              poster={block.poster}
              mediaPosition={block.mediaPosition}
              logos={block.logos}
            />
          ))}
        </div>
      </Show>

      {/* Video Section */}
      <Show when={training.video}>
        <section className='space-y-6'>
          <Show when={training.videoTitle}>
            <Typography variant='h2' className='text-center'>
              {training.videoTitle}
            </Typography>
          </Show>
          <div className='mx-auto max-w-4xl'>
            <video className='h-auto w-full rounded-lg' controls poster={training.videoPoster || undefined}>
              <source src={training.video!} type='video/mp4' />
              Your browser does not support the video tag.
            </video>
          </div>
        </section>
      </Show>

      {/* FAQ Section */}
      <Show when={training.faq?.length > 0}>
        <FaqSection title={training.faqTitle} items={training.faq} />
      </Show>
    </div>
  );
}

interface FeatureSectionProps {
  title: string | null;
  items: FeatureItem[];
  className?: string;
  cardClassName?: string;
}

function FeatureSection({ title, items, className, cardClassName }: FeatureSectionProps) {
  return (
    <section className='space-y-8'>
      <Show when={title}>
        <Typography variant='h2' className='text-2xl'>
          {title}
        </Typography>
      </Show>

      <List
        data={items}
        renderItem={item => <FeatureCard item={item} className={cardClassName} />}
        keyExtractor={(_, index) => String(index)}
        className={cn('grid gap-6 md:grid-cols-2 lg:grid-cols-3', className)}
      />
    </section>
  );
}

interface FeatureCardProps {
  item: FeatureItem;
  className?: string;
}

function FeatureCard({ item, className }: FeatureCardProps) {
  return (
    <div className={cn('flex items-center gap-5', className)}>
      <Show when={item.icon}>
        <div className='flex justify-center'>
          <Image
            src={item.icon!}
            alt={item.title || ''}
            width={60}
            height={60}
            className='object-contain object-center'
          />
        </div>
      </Show>

      <div className='space-y-2'>
        <Show when={item.title}>
          <Typography variant='h3' className='text-xl font-bold'>
            {item.title}
          </Typography>
        </Show>

        <Show when={item.description}>
          <Typography className='text-wrap'>{item.description}</Typography>
        </Show>
      </div>
    </div>
  );
}

interface FaqSectionProps {
  title: string | null;
  items: FaqItem[];
}

function FaqSection({ title, items }: FaqSectionProps) {
  return (
    <section className='space-y-8'>
      <Show when={title}>
        <Typography variant='h2' className='text-center'>
          {title}
        </Typography>
      </Show>
      {/* TODO: Replace with shadcn Accordion */}
      <div className='mx-auto max-w-3xl space-y-4'>
        <List
          data={items}
          renderItem={(item, index) => (
            <div key={index} className='bg-card rounded-lg border p-4'>
              <Typography variant='h4' className='mb-2 text-lg'>
                {item.question}
              </Typography>
              <Typography className='text-muted-foreground'>{item.answer}</Typography>
            </div>
          )}
          keyExtractor={(_, index) => String(index)}
        />
      </div>
    </section>
  );
}
