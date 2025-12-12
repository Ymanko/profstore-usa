import s from './styles.module.scss';

import type { ReactNode } from 'react';

type TAppContainerProps = {
  children: ReactNode;
  classes?: string;
};

export const AppContainer = ({ children, classes = '' }: TAppContainerProps) => {
  return <div className={`${s.container} ${classes}`}>{children}</div>;
};
