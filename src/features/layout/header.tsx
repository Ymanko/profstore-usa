import Image from 'next/image';
import Link from 'next/link';

import { MobileMenu } from '@/features/layout/components/mobile-menu';
import { MobileUserActions } from '@/features/layout/components/mobile-user-actions';
import { Searchbar } from '@/features/layout/components/searchbar';
import { SiteMenu } from '@/features/layout/components/site-menu';
import { UserActions } from '@/features/layout/components/user-actions';
import { Icon } from '@/shared/components/common/icon';
import { List } from '@/shared/components/common/list';
import { SiteLogo } from '@/shared/components/common/site-logo';
import { NavLink } from '@/shared/components/links/nav-link';
import { TrainingLink } from '@/shared/components/links/training-link';
import { NAV_ITEMS } from '@/shared/constants/user-menu';

import type { StoreContact } from '@/shared/queries/contacts/types';

interface HeaderProps {
  contact: StoreContact | null;
}

export function Header({ contact }: HeaderProps) {
  return (
    <header className='bg-primary-foreground border-border relative border-b'>
      {/*Top Bar*/}
      <div className='bg-primary'>
        <div className='container flex items-center justify-between py-3 md:py-2.5'>
          <MobileMenu contact={contact} />
          <nav className='hidden xl:block'>
            <List
              data={NAV_ITEMS}
              renderItem={item => <NavLink href={item.href}>{item.label}</NavLink>}
              keyExtractor={item => item.label.toLowerCase()}
              className='flex items-center xl:gap-x-7.5'
            />
          </nav>

          {contact?.socials && contact.socials.length > 0 && (
            <div className='hidden items-center gap-2 md:flex'>
              {contact.socials.map(social => (
                <Link
                  key={social.url}
                  href={social.url || '#'}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='transition-opacity hover:opacity-80'
                  title={social.title || undefined}
                >
                  {social.icon && (
                    <Image src={social.icon} alt={social.title || ''} width={32} height={32} className='rounded-full' />
                  )}
                </Link>
              ))}
            </div>
          )}
          <TrainingLink />
          {contact?.mainPhone && (
            <Link
              href={`tel:${contact.mainPhone.replace(/\D/g, '')}`}
              className='text-primary-foreground hover:text-accent hidden items-center gap-2 text-lg font-semibold transition-colors duration-300 md:flex'
            >
              <Icon name='call-receive' className='size-5' />
              {contact.mainPhone}
            </Link>
          )}
          <MobileUserActions className='xl:hidden' />
        </div>
      </div>

      {/*Search Bar*/}
      <div className='bg-primary-foreground container grid grid-cols-2 items-end gap-4 py-5 md:grid-cols-[auto_1fr_auto] md:gap-6'>
        <SiteLogo />

        <div className='col-span-2 grid items-center gap-5 md:col-span-1 md:grid-cols-[auto_1fr]'>
          <SiteMenu />
          <Searchbar />
        </div>

        <UserActions className='col-start-2 row-start-1 justify-self-end md:col-start-3 md:row-start-1 md:justify-self-auto' />
      </div>
    </header>
  );
}
