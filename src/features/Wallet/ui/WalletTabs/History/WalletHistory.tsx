import { useEffect, useState } from 'react';
import styles from './WalletHisory.module.scss';
import { TabItem } from '@/entities/TabItem';
import WalletHistoryItem from './WalletHistoryItem';
import { getPaymentTransactions, getWithdrawTransactions } from '@/features/Wallet/api/historyApi';
import { IFilterHistory, IHistoryItem } from '@/features/Wallet/models/interfaces';
import { IPaymentProvider } from '@/shared/models/interfaces/paymentProviders';
import { getWithdrawProvidersApi } from '@/features/Wallet/api/withdrawApi';
import { getPaymentProvidersApi } from '@/features/Wallet/api/replenishApi';
import { filterHistory } from '@/features/Wallet/constants/tabs';

const WalletHistory = () => {
  const [selectedTab, setSelectedTab] = useState(filterHistory[0]);
  const [payments, setPayments] = useState<IHistoryItem[]>([]);
  const [paymentProviders, setPaymentProviders] = useState<IPaymentProvider[]>([]);
  const [withdrawProviders, setWithdrawProviders] = useState<IPaymentProvider[]>([]);
  const [withdraws, setWithdraws] = useState<IHistoryItem[]>([]);

  const selectFilter = (tab: IFilterHistory) => {
    setSelectedTab(tab);
  };

  useEffect(() => {
    const getWithdrawProvidersHandler = async () => {
      try {
        const data = await getWithdrawProvidersApi();
        if (data.withdrawProviders) {
          setWithdrawProviders(
            data.withdrawProviders.map((item) => ({ ...item, billing_groups: [4] })),
          );
        }
      } catch (e) {
        /* empty */
      }
    };

    const getPaymentProvidersHandler = async () => {
      try {
        const data = await getPaymentProvidersApi();
        if (data.paymentProviders) {
          setPaymentProviders(data.paymentProviders);
        }
      } catch (e) {
        /* empty */
      }
    };

    void getPaymentProvidersHandler();
    void getWithdrawProvidersHandler();
  }, []);

  useEffect(() => {
    const getPayments = async () => {
      setPayments(await getPaymentTransactions());
    };
    const getWithdraw = async () => {
      setWithdraws(await getWithdrawTransactions());
    };
    if (selectedTab.value === 'replenish') {
      void getPayments();
    } else {
      void getWithdraw();
    }
  }, [selectedTab.value]);

  return (
    <div className={styles.container}>
      <div className={styles.tabs}>
        {filterHistory.map((item, index) => (
          <TabItem
            selected={item.value === selectedTab.value}
            key={index}
            onClick={() => selectFilter(item)}
          >
            {item.label}
          </TabItem>
        ))}
      </div>
      <div className={styles.list}>
        {selectedTab.value === 'replenish'
          ? payments.map((item, index) => (
              <WalletHistoryItem
                key={index}
                transaction={item}
                type="payment"
                providers={paymentProviders}
              />
            ))
          : withdraws.map((item, index) => (
              <WalletHistoryItem
                key={index}
                transaction={item}
                type="withdraw"
                providers={withdrawProviders}
              />
            ))}
      </div>
    </div>
  );
};

export default WalletHistory;
