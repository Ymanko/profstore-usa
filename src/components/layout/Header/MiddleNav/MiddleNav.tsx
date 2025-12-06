import Link from 'next/link';
import { AppContainer } from '@/components/common/AppContainer/AppContainer';
import s from './styles.module.scss';
import Image from 'next/image';
import { Icon } from '@/components/ui/Icon/Icon';
import { DesktopUserActionsList } from './components/DesktopUserActionsList/DesktopUserActionsList';

export const MiddleNav = () => {
  return (
    <div className={s.headerMiddle}>
      <AppContainer classes={s.headerMiddleContainer}>
        <Link href={"/catalog"} className={s.logoLink}>
          <Image src={"/img/profstore-logo.png"} alt={"Profstore logo"} width={141} height={66} />
        </Link>
        <DesktopUserActionsList />
        <div className={s.searchContainer}>
          <button className={s.catalogBtn} >
            <Icon name="viewGrid" width={24} height={24} />
            Catalog
          </button>
          <div className={s.inputWrap}>
            <label htmlFor="search" className="visuallyHidden">
              Search products
            </label>

            <input
              id="search"
              type="text"
              placeholder="Search products..."
              className={s.searchInput}
            />

            <div className={s.iconWrap}>
              <Icon className={s.searchIcon} name="search" width={24} height={24} />
            </div>
          </div>
        </div>
      </AppContainer>
    </div>
  );
}