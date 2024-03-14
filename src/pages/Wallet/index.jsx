/* eslint-disable react-hooks/exhaustive-deps */
import { WalletTabs } from '@/features/Wallet';
import styles from './styles.module.scss';

import GoBackButton from '@/shared/components/GoBackButton';
import Icons from '@/shared/components/Icons';
import { usePreloader } from '@/app/providers/PreloaderProvider';
import { useEffect } from 'react';

const Wallet = () => {
  const { isLoading, hidePreloader } = usePreloader();

  useEffect(() => {
    hidePreloader();
  }, [isLoading]);
  if (isLoading) {
    return;
  }
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <GoBackButton />
        <div className="title">Кошелек</div>
        <Icons icon="chat" />
      </div>
      <WalletTabs />
    </div>
  );
};

export default Wallet;
