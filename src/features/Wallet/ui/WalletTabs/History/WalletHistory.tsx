import { useEffect, useState } from 'react';
import styles from './WalletHisory.module.scss';
import { TabItem } from '@/entities/TabItem';
import WalletHistoryItem from './WalletHistoryItem';
import { getPaymentTransactions, getWithdrawTransactions } from '@/features/Wallet/api/historyApi';
import {
  IFilterHistory,
  IHistoryItem,
  IPaymentTransaction,
} from '@/features/Wallet/models/interfaces';
import { IPaymentProvider } from '@/shared/models/interfaces/paymentProviders';
import { getWithdrawProvidersApi } from '@/features/Wallet/api/withdrawApi';
import { getPaymentProvidersApi } from '@/features/Wallet/api/replenishApi';
import { filterHistory } from '@/features/Wallet/constants/tabs';
import Loader from '@/shared/ui/Loader';
import DatePicker from '@/shared/ui/DatePicker';
import SuccessPaymentModal from '../../SuccessPaymentModal';
import Button from '@/shared/ui/Button';

const WalletHistory = () => {
  const [selectedTab, setSelectedTab] = useState(filterHistory[0]);
  const [selectedPayment, setSelectedPayment] = useState<IPaymentTransaction | null>(null);
  const [transactionLoading, setTransactionLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [payments, setPayments] = useState<IHistoryItem[]>([]);
  const [paymentProviders, setPaymentProviders] = useState<IPaymentProvider[]>([]);
  const [withdrawProviders, setWithdrawProviders] = useState<IPaymentProvider[]>([]);
  const [withdraws, setWithdraws] = useState<IHistoryItem[]>([]);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [datePicker, setDatePicker] = useState({
    start: new Date(),
    end: new Date(),
  });

  const selectFilter = (tab: IFilterHistory) => {
    if (tab.value !== selectedTab.value) {
      setPage(1);
      setHasNextPage(false);
      setSelectedTab(tab);
    }
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
      setLoading(true);
      const newPayments = await getPaymentTransactions();
      setHasNextPage(newPayments.length === 25);
      setPayments(newPayments);
      setLoading(false);
    };
    const getWithdraw = async () => {
      setLoading(true);
      const newWithdraws = await getWithdrawTransactions();
      setWithdraws(await getWithdrawTransactions());
      setHasNextPage(newWithdraws.length === 25);

      setLoading(false);
    };
    if (selectedTab.value === 'replenish') {
      void getPayments();
    } else {
      void getWithdraw();
    }
  }, [selectedTab.value]);

  const addPage = async (page: number) => {
    setPage(page);
    if (selectedTab.value === 'replenish') {
      const newPayments = await getPaymentTransactions(page);
      setHasNextPage(newPayments.length === 25);
      setPayments((prev) => [...prev, ...newPayments]);
    } else {
      const newWithdraw = await getWithdrawTransactions(page);
      setHasNextPage(newWithdraw.length === 25);
      setWithdraws((prev) => [...prev, ...newWithdraw]);
    }
  };

  const changeDate = (start: Date, end: Date) => {
    setDatePicker({ start: start, end: end });
    const startDate = start.getTime() / 1000;
    const endDate = end.getTime() / 1000;
    console.log(startDate, endDate);
  };

  const closeModal = () => {
    setOpenModal(false);
    setSelectedPayment(null);
  };

  return (
    <div className={styles.container}>
      <div className="flex gap-[15px] mb-[15px]">
        <DatePicker
          selectsStart
          selected={datePicker.start}
          startDate={datePicker.start}
          endDate={datePicker.end}
          onChange={(value) => changeDate(value, datePicker.end)}
          placeholder="Начало"
        />
        <DatePicker
          containerClassName="w-[100px]"
          selectsEnd
          selected={datePicker.end}
          startDate={datePicker.start}
          endDate={datePicker.end}
          onChange={(value) => changeDate(datePicker.start, value)}
          placeholder="Конец"
        />
      </div>
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
        {!loading ? (
          selectedTab.value === 'replenish' ? (
            payments.map((item, index) => (
              <WalletHistoryItem
                key={index}
                transaction={item}
                openModal={setOpenModal}
                setSelectedPayment={setSelectedPayment}
                setTransactionLoading={setTransactionLoading}
                type="payment"
                providers={paymentProviders}
              />
            ))
          ) : (
            withdraws.map((item, index) => (
              <WalletHistoryItem
                key={index}
                transaction={item}
                openModal={setOpenModal}
                type="withdraw"
                setSelectedPayment={setSelectedPayment}
                setTransactionLoading={setTransactionLoading}
                providers={withdrawProviders}
              />
            ))
          )
        ) : (
          <div className={styles.loader}>
            <Loader />
          </div>
        )}
      </div>
      {hasNextPage ? (
        <Button
          className="flex items-center w-[100%] justify-center gap-[10px]"
          onClick={() => void addPage(page + 1)}
        >
          ЕЩЕ
          <svg
            width="14"
            height="8"
            viewBox="0 0 14 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1L7 7L13 1"
              stroke="var(--primary)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Button>
      ) : null}

      <SuccessPaymentModal
        isOpen={openModal}
        loading={transactionLoading}
        payment={selectedPayment}
        close={closeModal}
        type="payment"
      />
    </div>
  );
};

export default WalletHistory;
