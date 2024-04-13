/* eslint-disable react-hooks/exhaustive-deps */
import { WalletTabs } from '@/features/Wallet';
import styles from './styles.module.scss';

import GoBackButton from '@/shared/ui/GoBackButton';
import Icons from '@/shared/ui/Icons';

const Wallet = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <GoBackButton customPath="/" />
        <div className="title">Кошелек</div>
        <Icons icon="chat" />
      </div>
      <WalletTabs />
    </div>
  );
};

export default Wallet;
