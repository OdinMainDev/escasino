import GoBackButton from '@/shared/ui/GoBackButton';
import styles from './styles.module.scss';
import Icons from '@/shared/ui/Icons';
import { WalletTabs } from '@/widgets/WalletTabs';

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
