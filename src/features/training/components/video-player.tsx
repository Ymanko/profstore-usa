'use client';

import { useRef, useState } from 'react';

import { Icon } from '@/shared/components/common/icon';
import { Show } from '@/shared/components/common/show';
import { Typography } from '@/shared/components/ui/typography';

interface VideoPlayerProps {
  src: string;
  poster?: string | null;
  title?: string | null;
}

export function VideoPlayer({ src, poster, title }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasStarted, setHasStarted] = useState<boolean>(false);

  const handlePlay = async () => {
    if (videoRef.current) {
      await videoRef.current.play();
      setHasStarted(true);
    }
  };

  return (
    <section className='space-y-6'>
      <div className='relative mx-auto max-w-5xl'>
        <video ref={videoRef} className='h-auto w-full rounded-lg' controls={hasStarted} poster={poster || undefined}>
          <source src={src} type='video/mp4' />
          Your browser does not support the video tag.
        </video>

        {/* Custom Play Button */}
        <Show when={!hasStarted}>
          <div className='absolute inset-0 flex items-center justify-center'>
            <button
              onClick={handlePlay}
              className='flex size-31.25 items-center justify-center rounded-full border border-white/40 backdrop-blur-xs transition-transform duration-200 hover:scale-105'
              style={{
                background: 'linear-gradient(152.97deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0) 100%)',
              }}
              aria-label='Play video'
            >
              <Icon name='layer' width={39} height={47} />
            </button>
          </div>
        </Show>

        {/* Title Overlay */}
        <Show when={title && !hasStarted}>
          <div className='pointer-events-none absolute bottom-10 w-full bg-black/30 px-4 py-5'>
            <Typography variant='h2' className='text-center text-2xl text-wrap text-white'>
              {title}
            </Typography>
          </div>
        </Show>
      </div>
    </section>
  );
}
