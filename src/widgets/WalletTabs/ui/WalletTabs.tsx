'use client';

import { useState } from 'react';
import Tabs from '@/shared/ui/Tabs';
import styles from './WalletTabs.module.scss';
import { tabs } from '../constants/tabs';
import { ITab } from '@/shared/models/interfaces/tabs';
import WalletTopUp from './WalletTopUp';
import WalletWithdraw from './WalletWithdraw';
import WalletHistory from './WalletHistory';

const WalletTabs = () => {
  const [contentType, setContentType] = useState<ITab>(tabs[0]);
  return (
    <div className={styles.container}>
      <Tabs tabs={tabs} value={contentType} onChange={(value) => setContentType(value)} />
      {contentType.value === 'top-up' && <WalletTopUp />}
      {contentType.value === 'withdraw' && <WalletWithdraw />}
      {contentType.value === 'history' && <WalletHistory />}
    </div>
  );
};

export default WalletTabs;
