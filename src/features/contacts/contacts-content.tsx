'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';

import { ContactForm } from '@/features/contacts/contact-form';
import { NotFound } from '@/features/layout/not-found';
import { List } from '@/shared/components/common/list';
import Map from '@/shared/components/common/map';
import { Show } from '@/shared/components/common/show';
import { Typography } from '@/shared/components/ui/typography';
import { getPageQueryOptions } from '@/shared/queries/pages';

import type { HandleProps } from '@/shared/types/common';
import type { ReactNode } from 'react';

export function ContactsContent({ handle }: HandleProps) {
  const { data: page } = useSuspenseQuery(getPageQueryOptions(handle));
  const contact = page?.contact;

  if (!contact) {
    return (
      <NotFound>
        <Typography className='text-muted-foreground mt-4'>Contact information not available.</Typography>
      </NotFound>
    );
  }

  const hasCoordinates = contact.latitude !== null && contact.longitude !== null;

  return (
    <div className='container'>
      <Typography variant='h1' className='mb-8'>
        Contacts
      </Typography>

      <div className='grid gap-8 lg:grid-cols-16'>
        <div className='space-y-6 lg:col-span-5'>
          <Show when={contact?.address}>
            <ContactItem icon={<MapPin className='size-5' />}>
              <Typography>{contact.address}</Typography>
            </ContactItem>
          </Show>

          <Show when={contact?.phones?.length > 0}>
            <List
              data={contact.phones}
              renderItem={phone => (
                <ContactItem icon={<Phone className='size-5' />}>
                  <a href={`tel:${phone.replace(/\D/g, '')}`} className='hover:text-secondary transition-colors'>
                    {phone}
                  </a>
                </ContactItem>
              )}
              keyExtractor={phone => phone}
              className='space-y-3'
            />
          </Show>

          <Show when={contact?.email}>
            <ContactItem icon={<Mail className='size-5' />}>
              <a href={`mailto:${contact.email}`} className='hover:text-primary transition-colors'>
                {contact.email}
              </a>
            </ContactItem>
          </Show>

          <Show when={contact?.workingHours}>
            <ContactItem icon={<Clock className='size-5' />}>
              <Typography className='whitespace-pre-line'>{contact.workingHours}</Typography>
            </ContactItem>
          </Show>
        </div>

        <div className='hidden lg:col-span-2 lg:block' />

        <Show when={hasCoordinates}>
          <div className='h-80 overflow-hidden rounded-lg lg:col-span-9 lg:h-auto lg:min-h-122.5'>
            <Map latitude={contact.latitude!} longitude={contact.longitude!} markerTitle={contact.title || undefined} />
          </div>
        </Show>
      </div>

      {/* Divider */}
      <div className='md:bg-accent my-6 h-0.75 md:my-12' />

      {/* Contact Form */}
      <ContactForm />
    </div>
  );
}

function ContactItem({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <div className='flex items-center gap-4'>
      <div className='text-secondary'>{icon}</div>
      {children}
    </div>
  );
}
