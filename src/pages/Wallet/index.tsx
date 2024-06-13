import { WalletTabs } from '@/features/Wallet';
import styles from './styles.module.scss';
import { PageHeader } from '@/widgets/Header';

const Wallet = () => {
  return (
    <div className={styles.container}>
      <PageHeader customBackPath="/profile" title="Кошелек" />
      <WalletTabs />
    </div>
  );
};

export default Wallet;
