import { Menu } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { MobileUserActions } from '@/features/layout/components/mobile-user-actions';
import { Icon } from '@/shared/components/common/icon';
import { List } from '@/shared/components/common/list';
import { NavLink } from '@/shared/components/links/nav-link';
import { TrainingLink } from '@/shared/components/links/training-link';
import { Button } from '@/shared/components/ui/button';
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/shared/components/ui/sheet';
import { NAV_ITEMS } from '@/shared/constants/user-menu';

import type { StoreContact } from '@/shared/queries/contacts/types';

interface MobileMenuProps {
  contact: StoreContact | null;
}

export function MobileMenu({ contact }: MobileMenuProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='ghost' className='text-primary-foreground xl:hidden' size='icon'>
          <Menu className='size-6' />
          <span className='sr-only'>Open menu</span>
        </Button>
      </SheetTrigger>

      <SheetContent className='bg-primary' side='left'>
        <SheetHeader className='flex-row items-center justify-between pl-14'>
          <SheetTitle className='sr-only'>Mobile Menu</SheetTitle>
          <SheetClose asChild>
            <TrainingLink className='mx-auto' />
          </SheetClose>
          <MobileUserActions closeSheetOnClick />
        </SheetHeader>

        <div className='grid flex-1 auto-rows-min gap-14.5 px-4'>
          <nav>
            <List
              data={NAV_ITEMS}
              renderItem={item => (
                <SheetClose asChild>
                  <NavLink className='block text-center text-base' href={item.href}>
                    {item.label}
                  </NavLink>
                </SheetClose>
              )}
              keyExtractor={item => item.label.toLowerCase()}
              className='space-y-10'
            />
          </nav>

          {contact?.mainPhone && (
            <Link
              href={`tel:${contact.mainPhone.replace(/\D/g, '')}`}
              className='text-primary-foreground hover:text-accent flex items-center justify-center gap-x-3 text-lg font-semibold transition-colors duration-300'
            >
              <Icon name='call-receive' className='size-5' />
              {contact.mainPhone}
            </Link>
          )}

          {contact?.socials && contact.socials.length > 0 && (
            <div className='mx-auto flex items-center gap-3'>
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
                    <Image src={social.icon} alt={social.title || ''} width={40} height={40} className='rounded-full' />
                  )}
                </Link>
              ))}
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
