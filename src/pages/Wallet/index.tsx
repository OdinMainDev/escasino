import { WalletTabs } from '@/features/Wallet';
import styles from './styles.module.scss';
import { PageHeader } from '@/widgets/Header';
import { useTranslation } from 'react-i18next';

const Wallet = () => {
  const { t } = useTranslation();
  return (
    <>
      <PageHeader customBackPath="/profile" title={t('wallet')} />
      <div className={styles.container}>
        <WalletTabs />
      </div>
    </>
  );
};

export default Wallet;
