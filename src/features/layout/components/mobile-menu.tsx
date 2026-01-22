import { Menu } from 'lucide-react';
import React from 'react';

import { MobileUserActions } from '@/features/layout/components/mobile-user-actions';
import { List } from '@/shared/components/common/list';
import { Phone } from '@/shared/components/common/phone';
import { NavLink } from '@/shared/components/links/nav-link';
import { SocialLinks } from '@/shared/components/links/social-links';
import { TrainingLink } from '@/shared/components/links/training-link';
import { Button } from '@/shared/components/ui/button';
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/shared/components/ui/sheet';
import { NAV_ITEMS } from '@/shared/constants/user-menu';

export function MobileMenu() {
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
          <TrainingLink className='mx-auto' />
          <MobileUserActions />
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

          <Phone className='flex items-center justify-center gap-x-3' />

          <SocialLinks className='mx-auto' size={40} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
