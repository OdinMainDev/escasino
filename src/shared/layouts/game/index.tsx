import { ReactNode } from 'react';

import styles from './styles.module.scss';
import { useAuthProvider } from '@/app/providers/AuthProvider';
import { PageHeader } from '@/widgets/Header';
import Footer from '@/widgets/Footer';

interface IProps {
  children: ReactNode;
  gameTitle?: string;
}

const GameLayout = ({ children, gameTitle }: IProps) => {
  const { isAuth } = useAuthProvider();
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <PageHeader title={gameTitle} />
      </div>
      {children}
      <Footer isHidden={!isAuth} />
    </div>
  );
};

export default GameLayout;
