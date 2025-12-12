import { MiddleNav } from './MiddleNav/MiddleNav';
import s from './styles.module.scss';
import { TopNav } from './TopNav/TopNav';

export const Header = () => {
  return (
    <header className={s.header}>
      <TopNav />
      <MiddleNav />
    </header>
  );
};
