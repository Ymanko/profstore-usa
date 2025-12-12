import clsx from 'clsx';

import { Icon } from '@/components/ui/Icon';

import s from './styles.module.scss';

export const SOCIAL_ICONS = [
  { href: 'https://t.me/yourchannel', icon: 'socialsTg' },
  { href: 'viber://chat?number=123456789', icon: 'socialsViber' },
  { href: 'https://m.me/yourpage', icon: 'socialsMessenger' },
] as const;

interface SocialLinksProps {
  className?: string;
  size?: number | string;
}

export const SocialLinks = ({ className, size = 30 }: SocialLinksProps) => {
  return (
    <ul className={clsx(s.socialLinks, className)}>
      {SOCIAL_ICONS.map((social, index) => (
        <li key={index}>
          <a href={social.href} target='_blank' rel='noopener noreferrer'>
            <Icon name={social.icon} width={size} height={size} />
          </a>
        </li>
      ))}
    </ul>
  );
};
