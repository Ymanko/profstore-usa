import Link from 'next/link';
import s from './styles.module.scss';
import { AppContainer } from '@/components/common/AppContainer/AppContainer';

export const MiddleNav = () => {
  return (
    <div className={s.headerMiddle}>
      <AppContainer classes={s.headerMiddleContainer}>
        <Link href={"/catalog"} className={s.catalogLink}>Catalog</Link>
        <div className={s.logo}>ProfStore</div>
        <div className={s.searchBar}>
          <input type="text" placeholder="Search products..." className={s.searchInput} />
        </div>
      </AppContainer>
    </div>
  );
}