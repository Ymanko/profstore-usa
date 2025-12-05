// HamburgerButton.tsx
import s from './styles.module.scss';

interface HamburgerButtonProps {
  isOpen: boolean;
  setIsOpenMenu: () => void;
}

export const HamburgerButton = ({ isOpen, setIsOpenMenu }: HamburgerButtonProps) => {
  return (
    <button
      className={`${s.hamburgerButton} ${isOpen ? s.open : ''}`}
      onClick={setIsOpenMenu}
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
    >
      <span />
      <span />
      <span />
    </button>
  );
};
