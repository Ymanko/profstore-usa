import Link from 'next/link';

import { Icon } from '@/shared/components/common/icon';
import { List } from '@/shared/components/common/list';
import { SheetClose } from '@/shared/components/ui/sheet';
import { HEADER_USER_ACTIONS } from '@/shared/constants/user-menu';
import { cn } from '@/shared/lib/utils';

import type { ComponentProps } from 'react';

interface MobileUserActionsProps extends ComponentProps<'ul'> {
  closeSheetOnClick?: boolean;
}

export function MobileUserActions({ className, closeSheetOnClick = false, ...props }: MobileUserActionsProps) {
  return (
    <List
      data={HEADER_USER_ACTIONS}
      renderItem={(item, index) => {
        if (index === 0) return null;

        const linkElement = (
          <Link href={item.href} className='text-primary-foreground'>
            <Icon name={item.icon} />
          </Link>
        );

        if (closeSheetOnClick) {
          return <SheetClose asChild>{linkElement}</SheetClose>;
        }

        return linkElement;
      }}
      keyExtractor={item => item.label.toLowerCase()}
      className={cn('flex items-center gap-x-6', className)}
      {...props}
    />
  );
}
