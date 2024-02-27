import { useState } from 'react';
import styles from './WalletHisory.module.scss';
import { TabItem } from '@/entities/TabItem';
import { WalletHistoryItem } from '@/entities/WalletHistoryItem';

const WalletHistory = () => {
  const [tabs, setTabs] = useState([
    {
      label: 'Все',
      value: 'all',
      selected: true,
    },
    {
      label: 'Пополнение',
      value: 'eplenishment',
      selected: false,
    },
    {
      label: 'Вывод',
      value: 'withdrawal',
      selected: false,
    },
  ]);

  const selectFilter = (value: string) => {
    setTabs((prev) =>
      prev.map((item) => {
        if (item.value === value) {
          return {
            ...item,
            selected: true,
          };
        }
        return {
          ...item,
          selected: false,
        };
      }),
    );
  };
  return (
    <div className={styles.container}>
      <div className={styles.tabs}>
        {tabs.map((item, index) => (
          <TabItem selected={item.selected} key={index} onClick={() => selectFilter(item.value)}>
            {item.label}
          </TabItem>
        ))}
      </div>
      <WalletHistoryItem />
    </div>
  );
};

export default WalletHistory;
