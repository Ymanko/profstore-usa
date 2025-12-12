import { MiddleNav } from '@/components/layout/Header/MiddleNav/MiddleNav';
import { TopBar } from '@/components/layout/Header/TopBar';

export const Header = () => {
  return (
    <header className='bg-primary'>
      <TopBar />
      <MiddleNav />
    </header>
  );
};
