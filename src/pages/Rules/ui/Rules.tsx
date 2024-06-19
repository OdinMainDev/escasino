import { PageHeader } from '@/widgets/Header';
import styles from './Rules.module.scss';
import Tabs, { ITab } from '@/entities/Tabs';
import { useState } from 'react';

const Rules = () => {
  const tabs: ITab[] = [
    {
      label: 'Общие',
      value: 'main',
    },
    {
      label: 'Бонусные',
      value: 'bonus',
    },
  ];
  const [selectedTab, setSelectedTab] = useState<ITab>(tabs[0]);

  return (
    <div className={styles.container}>
      <PageHeader title="Правила и условия" />
      <Tabs value={selectedTab.value} tabs={tabs} onChange={(value) => setSelectedTab(value)} />
    </div>
  );
};

export default Rules;
