import type { SVGProps } from 'react';
// Імпорти у форматі як у ArrowDown
import ArrowDown from '@/icons-react/ArrowDown';
import ArrowLeft from '@/icons-react/ArrowLeft';
import ArrowRight from '@/icons-react/ArrowRight';
import ArrowTop from '@/icons-react/ArrowTop';
import CallReceive from '@/icons-react/CallReceive';
import Close from '@/icons-react/Close';
import EyeOff from '@/icons-react/EyeOff';
import EyeShow from '@/icons-react/EyeShow';
import Heart from '@/icons-react/Heart';
import LogIn from '@/icons-react/LogIn';
import Menu from '@/icons-react/Menu';
import Mortarboard from '@/icons-react/Mortarboard';
import Scales from '@/icons-react/Scales';
import Search from '@/icons-react/Search';
import ShoppingCart from '@/icons-react/ShoppingCart';
import SocialsTg from '@/icons-react/SocialsTg';
import SocialsViber from '@/icons-react/SocialsViber';
import SocialsMessenger from '@/icons-react/SocialsMessenger';
import Trash from '@/icons-react/Trash';
import User from '@/icons-react/User';
import ViewGrid from '@/icons-react/ViewGrid';
import Equipment from '@/icons-react/Equipment';
import Vector from '@/icons-react/Vector';

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
  vector: Vector
} as const;

export type IconName = keyof typeof ICONS;

type IconProps = {
  name: IconName;
} & SVGProps<SVGSVGElement>;

export const Icon = ({ name, ...props }: IconProps) => {
  const Component = ICONS[name];
  return <Component {...props} />;
};
