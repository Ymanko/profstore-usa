'use client';

import Link from 'next/link';
import { useState } from 'react';

import { AppContainer } from '@/components/common/AppContainer';
import { Phone } from '@/components/common/Phone';
import { Show } from '@/components/common/Show';
import { SocialLinks } from '@/components/common/SocialLinks';
import { Navbar } from '@/components/layout/Header/Navbar';
import { HamburgerButton } from '@/components/layout/Header/TopNav/components/HamburgerButton/HamburgerButton';
import { MobileMenu } from '@/components/layout/Header/TopNav/components/MobileMenu/MobileMenu';
import { MobileUserActionsList } from '@/components/layout/Header/TopNav/components/MobileUserActionsList/MobileUserActionsList';
import { Icon } from '@/components/ui/Icon';
import { Typography } from '@/components/ui/Typography';

import s from './TopNav/styles.module.scss';

export const TopBar = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  return (
    <div className={s.headerTop}>
      <AppContainer className={s.headerTopContainer}>
        <div className={s.headerContent}>
          <HamburgerButton className={s.hBtn} isOpen={isOpenMenu} setIsOpenMenu={() => setIsOpenMenu(prev => !prev)} />

          <Navbar className='hidden truncate xl:block [&_ul]:flex [&_ul]:items-center xl:[&_ul]:gap-x-7.5' />

          <div className='hidden md:block'>
            <SocialLinks />
          </div>

          <Link href='/training' className='text-accent inline-flex items-center gap-x-3.75'>
            <Icon name='mortarboard' width='24' height='24' />
            <Typography variant='link' as='span' className='-mb-1 font-semibold'>
              Staff Training
            </Typography>
          </Link>

          <Phone className='hidden md:flex md:items-center md:gap-2' />

          <MobileUserActionsList className={s.mobileUserActionsList} />
        </div>
      </AppContainer>

      <Show when={isOpenMenu}>
        <MobileMenu closeMenu={() => setIsOpenMenu(false)} />
      </Show>
    </div>
  );
};
