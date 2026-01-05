import { MobileMenu } from '@/features/layout/components/mobile-menu';
import { MobileUserActions } from '@/features/layout/components/mobile-user-actions';
import { Searchbar } from '@/features/layout/components/searchbar';
import { UserActions } from '@/features/layout/components/user-actions';
import { List } from '@/shared/components/common/list';
import { Phone } from '@/shared/components/common/phone';
import { SiteLogo } from '@/shared/components/common/site-logo';
import { NavLink } from '@/shared/components/links/nav-link';
import { SocialLinks } from '@/shared/components/links/social-links';
import { TrainingLink } from '@/shared/components/links/training-link';
import { NAV_ITEMS } from '@/shared/constants/user-menu';

export const Header = () => {
  return (
    <header className='bg-primary-foreground border-border relative border-b'>
      {/*Top Bar*/}
      <div className='bg-primary'>
        <div className='container flex items-center justify-between py-3 md:py-2.5'>
          <MobileMenu />
          <nav className='hidden xl:block'>
            <List
              data={NAV_ITEMS}
              renderItem={item => <NavLink href={item.href}>{item.label}</NavLink>}
              keyExtractor={item => item.label.toLowerCase()}
              className='flex items-center xl:gap-x-7.5'
            />
          </nav>
          <SocialLinks className='hidden md:flex' />
          <TrainingLink />
          <Phone className='hidden md:flex md:items-center md:gap-2' />
          <MobileUserActions className='xl:hidden' />
        </div>
      </div>

      {/*Search Bar*/}
      <div className='bg-primary-foreground container grid grid-cols-2 items-end gap-4 py-5 md:grid-cols-[auto_1fr_auto] md:gap-6'>
        <SiteLogo />
        <Searchbar className='col-span-2 md:col-span-1' />
        <UserActions className='col-start-2 row-start-1 justify-self-end md:col-start-3 md:row-start-1 md:justify-self-auto' />
      </div>
    </header>
  );
};
