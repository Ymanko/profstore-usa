import { Menu } from 'lucide-react';
import React from 'react';

import { List } from '@/components/common/List';
import { Phone } from '@/components/common/Phone';
import { MobileUserActions } from '@/components/layout/Header/MobileUserActions';
import { NavLink } from '@/components/links/NavLink';
import { SocialLinks } from '@/components/links/SocialLinks';
import { TrainingLink } from '@/components/links/TrainingLink';
import { Button } from '@/components/ui/Button';
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/Sheet';
import { NAV_ITEMS } from '@/constants/user-menu';

export const MobileMenu = () => {
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
};
