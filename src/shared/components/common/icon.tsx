import type { SVGProps } from 'react';

export type IconNameProps =
  | 'arrow-down'
  | 'arrow-left'
  | 'call-receive'
  | 'checkmark-small'
  | 'close'
  | 'equipment'
  | 'heart'
  | 'mortarboard'
  | 'scales'
  | 'shopping-cart'
  | 'user'
  | 'vector'
  | 'view-grid';

type IconProps = SVGProps<SVGSVGElement> & { id: IconNameProps };

export const Icon = ({ id, width = 24, height = 24, ...props }: IconProps) => {
  return (
    <svg width={width} height={height} fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <use href={`/sprites.svg#${id}`} />
    </svg>
  );
};
