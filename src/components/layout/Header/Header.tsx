import { TopNav } from './TopNav/TopNav';
import { MiddleNav } from './MiddleNav/MiddleNav';
import s from './styles.module.scss';

export const Header = () => {
  return (
    <header className={s.header}>
      <TopNav />
      <MiddleNav />
    </header>
  );
};
