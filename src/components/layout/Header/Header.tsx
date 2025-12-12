import { MiddleNav } from '@/components/layout/Header/MiddleNav/MiddleNav';
import { TopNav } from '@/components/layout/Header/TopNav/TopNav';

export const Header = () => {
  return (
    // <header className={s.header}>
    <header className='bg-primary'>
      <TopNav />
      <MiddleNav />
    </header>
  );
};
