'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { ContentBlock } from '@/features/categories/components/content-block';
import { NotFound } from '@/features/layout/not-found';
import { FaqSection, FeatureSection } from '@/features/training/components/exceptions';
import { VideoPlayer } from '@/features/training/components/video-player';
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
    <div className='container space-y-10 pt-3 md:pt-4'>
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
        <FeatureSection className='md:grid-cols-3' title={training.howItWorksTitle} items={training.howItWorks} />
      </Show>

      {/* Modules Section */}
      <Show when={training.modules?.length > 0}>
        <FeatureSection
          cardClassName='bg-secondary/15 rounded-lg p-5 xl:px-7.5 xl:py-8'
          title={training.modulesTitle}
          items={training.modules}
        />
      </Show>

      {/* Logos Section - full width background */}
      <Show when={training.logos?.length > 0}>
        <div className='bg-brand-section-bg relative left-1/2 w-screen -translate-x-1/2 py-10'>
          <div className='container space-y-5'>
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
        </div>
      </Show>

      {/* Video Section */}
      <Show when={training.video}>
        <VideoPlayer src={training.video!} poster={training.videoPoster} title={training.videoTitle} />
      </Show>

      {/* FAQ Section */}
      <Show when={training.faq?.length > 0}>
        <FaqSection title={training.faqTitle} items={training.faq} />
      </Show>
    </div>
  );
}
