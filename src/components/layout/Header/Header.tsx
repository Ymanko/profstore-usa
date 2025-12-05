'use client';

import s from './styles.module.scss';
import { TopNav } from './TopNav/TopNav';
// import { MiddleNav } from './MiddleNav/MiddleNav';
// import { c } from '@apollo/client/react/internal/compiler-runtime';


export const Header = () => {


  return (
    <header className={s.header}>
      <TopNav />
      {/* <MiddleNav /> */}
    </header>
  );
};
