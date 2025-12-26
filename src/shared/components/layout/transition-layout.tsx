import type { LayoutProps } from '@/shared/types/shared/types/common';
import type { FC } from 'react';

export const TransitionLayout: FC<LayoutProps> = ({ children }) => {
  return <div className='animate-in fade-in blur-in-xs duration-500'>{children}</div>;
};
