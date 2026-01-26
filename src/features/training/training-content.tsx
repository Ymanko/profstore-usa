'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { ContentBlock } from '@/features/categories/components/content-block';
import { NotFound } from '@/features/layout/not-found';
import { FaqSection, FeatureSection } from '@/features/training/components/exceptions';
import { Show } from '@/shared/components/common/show';
import { Typography } from '@/shared/components/ui/typography';
import { getTrainingPageQueryOptions } from '@/shared/queries/pages';

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
          <div className='relative mx-auto max-w-5xl'>
            <video className='h-auto w-full rounded-lg' controls poster={training.videoPoster || undefined}>
              <source src={training.video!} type='video/mp4' />
              Your browser does not support the video tag.
            </video>

            <Show when={training.videoTitle}>
              <div className='absolute bottom-10 w-full bg-black/30 px-4 py-5'>
                <Typography variant='h2' className='text-center text-2xl text-wrap text-white'>
                  {training.videoTitle}
                </Typography>
              </div>
            </Show>
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
