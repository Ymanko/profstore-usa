import clsx from 'clsx';
import s from './styles.module.scss';

interface HamburgerButtonProps {
  isOpen: boolean;
  setIsOpenMenu: () => void;
  className?: string;
}

export const HamburgerButton = ({
  isOpen,
  setIsOpenMenu,
  className,
}: HamburgerButtonProps) => {
  return (
    <button
      className={clsx(s.hamburgerButton, { [s.open]: isOpen }, className)}
      onClick={setIsOpenMenu}
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
    >
      <span />
      <span />
      <span />
    </button>
  );
};