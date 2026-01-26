'use client';

import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { ChevronDownIcon } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/shared/lib/utils';

function Accordion({ ...props }: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot='accordion' {...props} />;
}

function AccordionItem({ className, ...props }: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return <AccordionPrimitive.Item data-slot='accordion-item' className={cn(className)} {...props} />;
}

function AccordionTrigger({ className, children, ...props }: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className='flex'>
      <AccordionPrimitive.Trigger
        data-slot='accordion-trigger'
        className={cn(
          'bg-sidebar text-primary flex flex-1 items-start justify-between gap-4 rounded-t-lg rounded-b-lg px-7.5 py-4 text-left font-bold transition-all outline-none',
          'data-[state=open]:bg-primary/15 data-[state=open]:rounded-b-none [&[data-state=open]>svg]:rotate-180',
          'disabled:pointer-events-none disabled:opacity-50',
          'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
          className,
        )}
        {...props}
      >
        {children}
        <ChevronDownIcon className='text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200' />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({ className, children, ...props }: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot='accordion-content'
      className={cn(
        'overflow-hidden px-7.5 text-sm',
        'data-[state=open]:animate-accordion-down data-[state=open]:bg-primary/15 data-[state=open]:rounded-b-lg',
        'data-[state=closed]:animate-accordion-up',
      )}
      {...props}
    >
      <div className={cn('border-t border-black/20 py-7', className)}>{children}</div>
    </AccordionPrimitive.Content>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
