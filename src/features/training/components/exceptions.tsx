import Image from 'next/image';

import { List } from '@/shared/components/common/list';
import { Show } from '@/shared/components/common/show';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/shared/components/ui/accordion';
import { Typography } from '@/shared/components/ui/typography';
import { cn } from '@/shared/lib/utils';

import type { FaqItem, FeatureItem } from '@/shared/queries/pages';

interface FeatureSectionProps {
  title: string | null;
  items: FeatureItem[];
  className?: string;
  cardClassName?: string;
}

export function FeatureSection({ title, items, className, cardClassName }: FeatureSectionProps) {
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

export function FeatureCard({ item, className }: FeatureCardProps) {
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

export function FaqSection({ title, items }: FaqSectionProps) {
  return (
    <section className='space-y-8'>
      <Show when={title}>
        <Typography variant='h2' className='text-center'>
          {title}
        </Typography>
      </Show>

      <div className='mx-auto max-w-4xl'>
        <Accordion type='single' collapsible defaultValue='item-0' className='space-y-2'>
          {items.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>
                <Typography>{item.answer}</Typography>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
