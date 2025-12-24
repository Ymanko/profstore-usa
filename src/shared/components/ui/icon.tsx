// Імпорти у форматі як у ArrowDown
import ArrowDown from '@/shared/icons-react/ArrowDown';
import ArrowLeft from '@/shared/icons-react/ArrowLeft';
import ArrowRight from '@/shared/icons-react/ArrowRight';
import ArrowTop from '@/shared/icons-react/ArrowTop';
import CallReceive from '@/shared/icons-react/CallReceive';
import CheckmarkSmall from '@/shared/icons-react/CheckmarkSmall';
import Close from '@/shared/icons-react/Close';
import Equipment from '@/shared/icons-react/Equipment';
import EyeOff from '@/shared/icons-react/EyeOff';
import EyeShow from '@/shared/icons-react/EyeShow';
import Heart from '@/shared/icons-react/Heart';
import LogIn from '@/shared/icons-react/LogIn';
import Menu from '@/shared/icons-react/Menu';
import Mortarboard from '@/shared/icons-react/Mortarboard';
import Scales from '@/shared/icons-react/Scales';
import Search from '@/shared/icons-react/Search';
import ShoppingCart from '@/shared/icons-react/ShoppingCart';
import SocialsMessenger from '@/shared/icons-react/SocialsMessenger';
import SocialsTg from '@/shared/icons-react/SocialsTg';
import SocialsViber from '@/shared/icons-react/SocialsViber';
import Trash from '@/shared/icons-react/Trash';
import User from '@/shared/icons-react/User';
import Vector from '@/shared/icons-react/Vector';
import ViewGrid from '@/shared/icons-react/ViewGrid';

import type { SVGProps } from 'react';

// Мапа іконок
const ICONS = {
  arrowDown: ArrowDown,
  arrowLeft: ArrowLeft,
  arrowRight: ArrowRight,
  arrowTop: ArrowTop,
  callReceive: CallReceive,
  close: Close,
  eyeOff: EyeOff,
  eyeShow: EyeShow,
  heart: Heart,
  logIn: LogIn,
  menu: Menu,
  mortarboard: Mortarboard,
  scales: Scales,
  search: Search,
  shoppingCart: ShoppingCart,
  socialsTg: SocialsTg,
  socialsViber: SocialsViber,
  socialsMessenger: SocialsMessenger,
  trash: Trash,
  user: User,
  viewGrid: ViewGrid,
  equipment: Equipment,
  vector: Vector,
  checkmarkSmall: CheckmarkSmall,
} as const;

export type IconName = keyof typeof ICONS;

type IconProps = {
  name: IconName;
} & SVGProps<SVGSVGElement>;

export const Icon = ({ name, ...props }: IconProps) => {
  const Component = ICONS[name];
  return <Component {...props} />;
};
