/* eslint-disable react-hooks/exhaustive-deps */
import { WalletTabs } from '@/features/Wallet';
import styles from './styles.module.scss';

import GoBackButton from '@/shared/components/GoBackButton';
import Icons from '@/shared/components/Icons';

const Wallet = () => {
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
