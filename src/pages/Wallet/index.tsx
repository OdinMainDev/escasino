import { WalletTabs } from '@/features/Wallet';
import styles from './styles.module.scss';
import { PageHeader } from '@/widgets/Header';

const Wallet = () => {
  return (
    <>
      <PageHeader customBackPath="/profile" title="Кошелек" />
      <div className={styles.container}>
        <WalletTabs />
      </div>
    </>
  );
};

export default Wallet;
