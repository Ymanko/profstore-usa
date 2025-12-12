import { Searchbar } from '@/components/layout/Header/Searchbar';
import { TopBar } from '@/components/layout/Header/TopBar';

export const Header = () => {
  return (
    <header className='bg-primary'>
      <TopBar />
      <Searchbar />
    </header>
  );
};
