import { ReactNode } from 'react';

import styles from './styles.module.scss';
import { Header } from '@/widgets/Header';
import { Footer } from '@/widgets/Footer';

interface IProps {
  children: ReactNode;
}

const IndexLayout = ({ children }: IProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Header />
      </div>
      {children}
      <Footer />
    </div>
  );
};

export default IndexLayout;
