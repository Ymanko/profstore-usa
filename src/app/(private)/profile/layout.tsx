import { ProfileSidebar } from '@/features/profile/components/profile-sidebar';
import { ProfileTitle } from '@/features/profile/components/profile-title';
import { PageWrapper } from '@/shared/components/common/page-wrapper';
import { cn } from '@/shared/lib/utils';

import type { LayoutProps } from '@/shared/types/common';

export default function ProfileLayout({ children }: LayoutProps) {
  return (
    <PageWrapper>
      <div
        className={cn(
          'container grid gap-5 md:grid-cols-[auto_1fr] md:gap-5.5',
          '[grid-template-areas:"title"_"sidebar"_"content"]',
          'md:[grid-template-areas:"title_title"_"sidebar_content"]',
          'xl:[grid-template-areas:"sidebar_title"_"sidebar_content"]',
        )}
      >
        <ProfileTitle className='[grid-area:title]' />
        <ProfileSidebar className='h-fit [grid-area:sidebar] md:w-52.5 xl:w-86' />
        <div className='[grid-area:content]'>{children}</div>
      </div>
    </PageWrapper>
  );
}
