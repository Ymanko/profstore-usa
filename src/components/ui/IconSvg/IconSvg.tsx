export type IconName =
  | "icon-arrow-down"
  | "icon-arrow-left"
  | "icon-arrow-right"
  | "icon-arrow-top"
  | "icon-call-receive"
  | "icon-close"
  | "icon-eye-off"
  | "icon-eye-show"
  | "icon-heart"
  | "icon-log-in"
  | "icon-menu"
  | "icon-mortarboard"
  | "icon-scales"
  | "icon-search"
  | "icon-shopping-cart"
  | "icon-socials-tg"
  | "icon-socials-viber"
  | "icon-trash"
  | "icon-user"
  | "icon-view-grid"

interface IconProps {
  name: IconName;
  className?: string;
  fileName?: string;
  [key: string]: unknown;
};

export const IconSvg = ({ name, className = '', fileName = 'main-svg-icons', ...props }: IconProps) => {
  return (
    <svg className={className} {...props}>
      <use href={`/svg/${fileName}.svg#${name}`} />
    </svg>
  );
};
