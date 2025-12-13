import { List } from '@/components/common/List';
import { Phone } from '@/components/common/Phone';
import { SiteLogo } from '@/components/common/SiteLogo';
import { MobileMenu } from '@/components/layout/Header/components/MobileMenu';
import { MobileUserActions } from '@/components/layout/Header/components/MobileUserActions';
import { Searchbar } from '@/components/layout/Header/components/Searchbar';
import { UserActions } from '@/components/layout/Header/components/UserActions';
import { NavLink } from '@/components/links/NavLink';
import { SocialLinks } from '@/components/links/SocialLinks';
import { TrainingLink } from '@/components/links/TrainingLink';
import { NAV_ITEMS } from '@/constants/user-menu';

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
