import { Email } from '@/components/common/Email';
import { List } from '@/components/common/List';
import { NavLink } from '@/components/common/NavLink';
import { Phone } from '@/components/common/Phone';
import { SiteLogo } from '@/components/common/SiteLogo';
import { SocialLinks } from '@/components/common/SocialLinks';
import { Typography } from '@/components/ui/Typography';

export const Footer = () => {
  return (
    <footer className='bg-primary-dark py-12.5'>
      <div className='container'>
        <div className='grid place-items-start gap-6.5 md:grid-cols-2 xl:grid-cols-4'>
          <div className='grid place-items-center gap-4.5 md:place-items-start'>
            <SiteLogo />
            <Typography variant='small' className='text-primary-foreground font-light'>
              <span className='text-muted-foreground'>© </span>
              {`${new Date().getFullYear()} - online store of kitchen equipment`}
            </Typography>
          </div>

          <div className='border-muted-foreground grid grid-cols-2 border-y py-4 md:w-full md:gap-x-14 md:border-none xl:place-items-start xl:gap-x-24 xl:p-0'>
            <List
              data={[
                { href: '/', label: 'New' },
                { href: '/delivery', label: 'Delivery and payment' },
                { href: '/contacts', label: 'Contacts' },
                { href: '/warranty', label: 'Warranty and service' },
              ]}
              renderItem={link => (
                <NavLink className='text-sm [&_span]:text-sm' href={link.href}>
                  {link.label}
                </NavLink>
              )}
              keyExtractor={link => link.href}
              className='space-y-5'
            />

            <List
              data={[
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
              className='space-y-5'
            />
          </div>

          <div className='grid place-items-center gap-4.5 md:place-items-start xl:order-2'>
            <Phone className='flex items-center gap-2' />
            <SocialLinks />
          </div>

          <div className='grid place-items-center gap-2 md:place-items-start xl:order-1'>
            <Typography variant='small' className='text-primary-foreground font-light'>
              Company &#34;Profstore&#34; Work Schedule:
            </Typography>
            <Typography variant='small' className='text-primary-foreground font-light'>
              MON-FRI: from 9.00 to 18.00 Sat, Sun: days off
            </Typography>
            <Email />
          </div>
        </div>
      </div>
    </footer>
  );
};
