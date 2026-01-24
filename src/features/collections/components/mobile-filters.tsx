import { ChevronDown, Menu } from 'lucide-react';
import React, { useRef } from 'react';
import { useMedia } from 'react-use';

import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/shared/components/ui/dropdown-menu';

import type { PropsWithChildren } from 'react';

export function MobileFilters({ children }: PropsWithChildren) {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const isMobile = useMedia('(max-width: 767px)');

  const handleOpenChange = (open: boolean) => {
    if (open && triggerRef.current) {
      // Scroll to trigger when opening
      setTimeout(() => {
        triggerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };

  return (
    <DropdownMenu modal onOpenChange={isMobile ? handleOpenChange : undefined}>
      <DropdownMenuTrigger
        ref={triggerRef}
        className='bg-sidebar font-montserrat relative z-50 flex w-full items-center justify-between rounded-[10px] px-5 py-2.5 text-xl font-bold data-[state=open]:rounded-b-none xl:hidden'
      >
        <Menu />
        Filter
        <ChevronDown />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className='max-h-[90vh] w-(--radix-dropdown-menu-trigger-width) overflow-y-auto rounded-b-xl border-none p-0 xl:hidden'
        sideOffset={0}
        align='start'
        side='bottom'
        avoidCollisions={false}
        withOverlay
        overlayClassName='xl:hidden'
      >
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
