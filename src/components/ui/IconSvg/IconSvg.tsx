export type IconName =
  | 'arrow-down'
  | 'arrow-left'
  | 'arrow-right'
  | 'arrow-top'
  | 'call-receive'
  | 'close'
  | 'eye-off'
  | 'eye-show'
  | 'heart'
  | 'log-in'
  | 'menu'
  | 'mortarboard'
  | 'scales'
  | 'search'
  | 'shopping-cart'
  | 'socials-tg'
  | 'socials-viber'
  | 'trash'
  | 'user'
  | 'view-grid';

interface IconProps {
  name: IconName;
  className?: string;
  fileName?: string;
  [key: string]: unknown;
}

export const IconSvg = ({ name, className = '', fileName = 'main-svg-icons', ...props }: IconProps) => {
  return (
    <svg className={className} {...props}>
      <use href={`/svg/${fileName}.svg#${name}`} />
    </svg>
  );
};
