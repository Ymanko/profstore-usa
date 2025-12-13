import { List } from '@/components/common/List';
import { Phone } from '@/components/common/Phone';
import { MobileMenu } from '@/components/layout/Header/MobileMenu';
import { MobileUserActions } from '@/components/layout/Header/MobileUserActions';
import { NavLink } from '@/components/links/NavLink';
import { SocialLinks } from '@/components/links/SocialLinks';
import { TrainingLink } from '@/components/links/TrainingLink';
import { NAV_ITEMS } from '@/constants/user-menu';

export const TopBar = () => {
  return (
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
  );
};
