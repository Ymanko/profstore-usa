import { CircleAlert } from 'lucide-react';

import { Typography } from '@/shared/components/ui/typography';
import { cn } from '@/shared/lib/utils';

import type { TypographyProps } from '@/shared/components/ui/typography';

export function NotFound({ className, children }: TypographyProps) {
  return (
    <Typography
      variant='body-lg'
      className={cn('text-muted-foreground grid justify-center justify-items-center gap-x-2', className)}
    >
      <CircleAlert />
      {children}
    </Typography>
  );
}
