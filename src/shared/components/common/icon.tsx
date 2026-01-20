import spriteHref from '@/public/sprites.svg';

import type { IconName } from '@/shared/types/icon-names';
import type { SVGProps } from 'react';

export type { IconName };

type IconProps = SVGProps<SVGSVGElement> & {
  name: IconName;
};

export const Icon = ({ name, width = 24, height = 24, ...props }: IconProps) => {
  return (
    <svg width={width} height={height} fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <use href={`${spriteHref}#${name}`} />
    </svg>
  );
};
