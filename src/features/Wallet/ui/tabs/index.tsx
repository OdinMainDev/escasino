'use client';

import { useState } from 'react';
import styles from './styles.module.scss';
import { tabs } from '../../constants/tabs';
import Tabs, { ITab } from '@/entities/Tabs';
import WalletTopUp from './Deposit/WalletTopUp';
import WalletWithdraw from './Withdraw/WalletWithdraw';
import WalletHistory from './History/WalletHistory';

const WalletTabs = () => {
  const [contentType, setContentType] = useState<ITab>(tabs[0]);
  return (
    <div className={styles.container}>
      <Tabs tabs={tabs} value={contentType.value} onChange={(value) => setContentType(value)} />
      {contentType.value === 'top-up' && <WalletTopUp />}
      {contentType.value === 'withdraw' && <WalletWithdraw />}
      {contentType.value === 'history' && <WalletHistory />}
    </div>
  );
};

export default WalletTabs;
