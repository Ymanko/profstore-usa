import { Email } from '@/components/common/Email';
import { List } from '@/components/common/List';
import { Phone } from '@/components/common/Phone';
import { SiteLogo } from '@/components/common/SiteLogo';
import { NavLink } from '@/components/links/NavLink';
import { SocialLinks } from '@/components/links/SocialLinks';
import { Typography } from '@/components/ui/Typography';

export const Footer = () => {
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
              data={[
                { href: '/', label: 'New' },
                { href: '/delivery', label: 'Delivery and payment' },
                { href: '/contacts', label: 'Contacts' },
                { href: '/warranty', label: 'Warranty and service' },
                { href: '/how-to-buy', label: 'How to Buy' },
                { href: '/producers', label: 'Producers' },
                { href: '/shares', label: 'Shares' },
                { href: '/training', label: 'AI Training Page' },
              ]}
              renderItem={link => (
                <NavLink className='text-sm [&_span]:text-sm' href={link.href}>
                  {link.label}
                </NavLink>
              )}
              keyExtractor={link => link.href}
              className='grid grid-cols-2 gap-x-4 gap-y-5 md:grid-cols-3 md:gap-x-30 lg:gap-x-52 xl:grid-cols-2 xl:gap-x-4'
            />
          </div>

          {/*Contacts*/}
          <div className='footer-contact grid place-items-center gap-4.5 self-start md:place-items-start'>
            <Phone className='flex items-center gap-2' />
            <SocialLinks />
          </div>

          {/*Company*/}
          <div className='footer-company grid place-items-center self-start md:place-items-start'>
            <Typography variant='small' className='text-primary-foreground font-light'>
              Company &#34;Profstore&#34; Work Schedule:
            </Typography>
            <Typography variant='small' className='text-primary-foreground mt-2 font-light'>
              MON-FRI: from 9.00 to 18.00 Sat, Sun: days off
            </Typography>
            <Email />
          </div>
        </div>
      </div>
    </footer>
  );
};
