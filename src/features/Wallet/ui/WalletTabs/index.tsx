'use client';
import styles from './styles.module.scss';
import { tabs } from '../../constants/tabs';
import Tabs, { ITab } from '@/entities/Tabs';
import WalletReplenish from './Replenish/WalletReplenish';
import WalletWithdraw from './Withdraw/WalletWithdraw';
import WalletHistory from './History/WalletHistory';
import { useParams } from 'react-router-dom';
import { useRouter } from '@/shared/helpers/navigation';

const WalletTabs = () => {
  const { tab } = useParams();
  const router = useRouter();

  const changeTab = (value: ITab) => {
    router.push(`/wallet/deposit/${value.value}`);
  };

  return (
    <div className={styles.container}>
      <Tabs tabs={tabs} value={tab} onChange={changeTab} />
      {tab === 'replenish' && <WalletReplenish />}
      {tab === 'withdraw' && <WalletWithdraw />}
      {tab === 'history' && <WalletHistory />}
    </div>
  );
};

export default WalletTabs;
