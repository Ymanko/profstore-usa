import { cn } from '@/shared/lib/utils';

import type { LayoutProps } from '@/shared/types/common';
import type { ComponentPropsWithoutRef } from 'react';

type Props = LayoutProps & ComponentPropsWithoutRef<'div'>;

export function TransitionLayout({ className, ...props }: Props) {
  return <div className={cn('animate-in fade-in blur-in-xs duration-500', className)} {...props} />;
}
