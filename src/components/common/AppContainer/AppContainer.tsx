import { ReactNode } from 'react';
import s from './styles.module.scss';

type TAppContainerProps = {
  children: ReactNode;
  classes?: string;
};

export const AppContainer = ({
  children,
  classes = '',
}: TAppContainerProps) => {
  return <div className={`${s.container} ${classes}`}>{children}</div>;
};
