import { ReactNode } from 'react';

import styles from './styles.module.scss';
import { useAuthProvider } from '@/app/providers/AuthProvider';
import { PageHeader } from '@/widgets/Header';
import Footer from '@/widgets/Footer';
import useOrientation from '@/shared/hooks/useOrientation';
import classNames from 'classnames';

interface IProps {
  children: ReactNode;
  gameTitle?: string;
}

const GameLayout = ({ children, gameTitle }: IProps) => {
  const { isAuth } = useAuthProvider();
  const { isMobile, isPortrait } = useOrientation();
  return (
    <div
      className={classNames(styles.container, {
        [styles.mobileHirizont]: isMobile && !isPortrait,
      })}
    >
      <PageHeader title={gameTitle} />
      {children}
      <Footer isHidden={!isAuth} />
    </div>
  );
};

export default GameLayout;
