import ArrowDown from '@/shared/components/icons/ArrowDown';
import ArrowLeft from '@/shared/components/icons/ArrowLeft';
import ArrowRight from '@/shared/components/icons/ArrowRight';
import ArrowTop from '@/shared/components/icons/ArrowTop';
import CallReceive from '@/shared/components/icons/CallReceive';
import CheckmarkSmall from '@/shared/components/icons/CheckmarkSmall';
import Close from '@/shared/components/icons/Close';
import Equipment from '@/shared/components/icons/Equipment';
import EyeOff from '@/shared/components/icons/EyeOff';
import EyeShow from '@/shared/components/icons/EyeShow';
import Heart from '@/shared/components/icons/Heart';
import LogIn from '@/shared/components/icons/LogIn';
import Menu from '@/shared/components/icons/Menu';
import Mortarboard from '@/shared/components/icons/Mortarboard';
import Scales from '@/shared/components/icons/Scales';
import Search from '@/shared/components/icons/Search';
import ShoppingCart from '@/shared/components/icons/ShoppingCart';
import SocialsMessenger from '@/shared/components/icons/SocialsMessenger';
import SocialsTg from '@/shared/components/icons/SocialsTg';
import SocialsViber from '@/shared/components/icons/SocialsViber';
import Trash from '@/shared/components/icons/Trash';
import User from '@/shared/components/icons/User';
import Vector from '@/shared/components/icons/Vector';
import ViewGrid from '@/shared/components/icons/ViewGrid';

import type { SVGProps } from 'react';

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
