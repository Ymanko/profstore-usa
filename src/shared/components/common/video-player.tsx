'use client';

import ReactPlayer from 'react-player';

import { cn } from '@/shared/lib/utils';

import type { ComponentProps } from 'react';
import type { ReactPlayerProps } from 'react-player/types';

type VideoPlayerProps = ReactPlayerProps & ComponentProps<'div'>;

export function VideoPlayer({ light = true, className, ...props }: VideoPlayerProps) {
  return (
    <div className={cn('aspect-video overflow-hidden rounded', className)}>
      <ReactPlayer width='100%' height='100%' controls light={light} {...props} />
    </div>
  );
}
