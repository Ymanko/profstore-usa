import Image from 'next/image';
import Link from 'next/link';

import { Icon } from '@/shared/components/common/icon';
import { List } from '@/shared/components/common/list';
import { Show } from '@/shared/components/common/show';
import { SiteLogo } from '@/shared/components/common/site-logo';
import { Typography } from '@/shared/components/ui/typography';
import { NAV_ITEMS } from '@/shared/constants/user-menu';

import type { StoreContact } from '@/shared/queries/contacts/types';

interface FooterProps {
  contact: StoreContact | null;
}

export function Footer({ contact }: FooterProps) {
  return (
    <footer className='bg-primary-dark py-12.5'>
      <div className='container'>
        <div className='footer-grid items-start gap-6.5 xl:gap-20'>
          {/*Logo*/}
          <div className='footer-logo grid place-items-center gap-4.5 self-start md:place-items-start'>
            <SiteLogo />
            <Typography variant='small' className='text-primary-foreground font-light'>
              <span className='text-muted-foreground'>© </span>
              {`${new Date().getFullYear()} - online store of kitchen equipment`}
            </Typography>
          </div>

          {/*Links*/}
          <div className='footer-links border-muted-foreground self-start border-t border-b py-4 md:w-full md:gap-x-14 md:border-b-0 xl:gap-x-24 xl:border-t-0 xl:p-0'>
            <List
              data={NAV_ITEMS}
              renderItem={link => (
                <Link
                  className='text-primary-foreground hover:text-accent truncate text-sm font-normal transition-colors duration-300'
                  href={link.href}
                >
                  {link.label}
                </Link>
              )}
              keyExtractor={link => link.href}
              className='grid grid-cols-2 gap-x-4 gap-y-5 md:grid-cols-3 md:gap-x-30 lg:gap-x-52 xl:grid-cols-2 xl:gap-x-4'
            />
          </div>

          {/*Contacts*/}
          <div className='footer-contact grid place-items-center gap-4.5 self-start md:place-items-start'>
            <Show when={!!contact?.mainPhone}>
              <Link
                href={`tel:${contact?.mainPhone?.replace(/\D/g, '')}`}
                className='text-primary-foreground hover:text-accent flex items-center gap-2 text-lg font-semibold transition-colors duration-300'
              >
                <Icon name='call-receive' className='size-5' />
                {contact?.mainPhone}
              </Link>
            </Show>

            <Show when={contact?.socials && contact.socials.length > 0}>
              <List
                data={contact?.socials ?? []}
                renderItem={social => (
                  <Link
                    key={social.url}
                    href={social.url || '#'}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='transition-opacity hover:opacity-80'
                    title={social.title || undefined}
                  >
                    {social.icon && (
                      <Image
                        src={social.icon}
                        alt={social.title || ''}
                        width={40}
                        height={40}
                        className='rounded-full'
                      />
                    )}
                  </Link>
                )}
                keyExtractor={social => social?.url ?? ''}
                className='flex items-center gap-3'
              />
            </Show>
          </div>

          {/*Company*/}
          <div className='footer-company grid place-items-center self-start md:place-items-start'>
            <Show when={!!contact?.title}>
              <Typography variant='small' className='text-primary-foreground font-light'>
                {contact?.title}
              </Typography>
            </Show>

            <Show when={!!contact?.workingHours}>
              <Typography variant='small' className='text-primary-foreground mt-2 font-light whitespace-pre-line'>
                {contact?.workingHours}
              </Typography>
            </Show>

            <Show when={!!contact?.email}>
              <Link
                href={`mailto:${contact?.email}`}
                className='text-accent hover:text-accent font-montserrat mt-2 text-sm font-light transition-colors duration-300'
              >
                {contact?.email}
              </Link>
            </Show>
          </div>
        </div>
      </div>
    </footer>
  );
}
