import Image from 'next/image';

import { List } from '@/components/common/List';
import { cn } from '@/lib/utils';

import type { ComponentPropsWithoutRef, FC } from 'react';

interface SocialLinksProps extends ComponentPropsWithoutRef<'ul'> {
  size?: number;
}

export const SocialLinks: FC<SocialLinksProps> = ({ className, size = 30 }) => {
  return (
    <List
      data={[
        { href: 'https://t.me/yourchannel', src: '/svg/socials-tg.svg', label: 'Telegram' },
        { href: 'viber://chat?number=123456789', src: '/svg/socials-viber.svg', label: 'Viber' },
        { href: 'https://m.me/yourpage', src: '/svg/socials-messenger.svg', label: 'Messenger' },
      ]}
      renderItem={social => (
        <a href={social.href} target='_blank' rel='noopener noreferrer'>
          <Image src={social.src} alt={social.label + ' icon'} width={size} height={size} />
          <span className='sr-only'>{social.label}</span>
        </a>
      )}
      keyExtractor={social => social.href}
      className={cn('flex items-center gap-x-3.75', className)}
    />
  );
};
