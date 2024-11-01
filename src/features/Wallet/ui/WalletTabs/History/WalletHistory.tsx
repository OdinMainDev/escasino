import { useEffect, useState } from 'react';
import styles from './WalletHisory.module.scss';
import { TabItem } from '@/entities/TabItem';
import WalletHistoryItem from './WalletHistoryItem';
import { getPaymentTransactions, getWithdrawTransactions } from '@/features/Wallet/api/historyApi';
import {
  IFilterHistory,
  IHistoryItem,
  IPaymentData,
  IPaymentTransaction,
} from '@/features/Wallet/models/interfaces';
import { filterHistory } from '@/features/Wallet/constants/tabs';
import Loader from '@/shared/ui/Loader';
import DatePicker from '@/shared/ui/DatePicker';
import SuccessPaymentModal from '../../SuccessPaymentModal';
import Button from '@/shared/ui/Button';
import { useAppSelector } from '@/store/hooks/redux';
import { useTranslation } from 'react-i18next';

const WalletHistory = () => {
  const { t } = useTranslation();
  const [selectedTab, setSelectedTab] = useState(filterHistory[0]);
  const [selectedPayment, setSelectedPayment] = useState<IPaymentTransaction | null>(null);
  const [transactionLoading, setTransactionLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [payments, setPayments] = useState<IHistoryItem[]>([]);
  const { paymentProviders } = useAppSelector((state) => state.paymentProvidersReducer);
  const { withdrawProviders } = useAppSelector((state) => state.withdrawProvidersReducer);
  const [withdraws, setWithdraws] = useState<IHistoryItem[]>([]);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [paymentData, setPaymentData] = useState<IPaymentData | null>(null);
  const [isError, setIsError] = useState(false);
  const [datePicker, setDatePicker] = useState({
    start: (() => {
      const d = new Date();
      d.setHours(0, 0, 0, 0);
      return d;
    })(),
    end: (() => {
      const d = new Date();
      d.setHours(23, 59, 59, 0);
      return d;
    })(),
  });

  const selectFilter = (tab: IFilterHistory) => {
    if (tab.value !== selectedTab.value) {
      setPage(1);
      setHasNextPage(false);
      setSelectedTab(tab);
      if (selectedTab.value === 'replenish') {
        setPayments([]);
      } else {
        setWithdraws([]);
      }
    }
  };

  useEffect(() => {
    const getPayments = async () => {
      setLoading(true);
      const newPayments = await getPaymentTransactions(page, datePicker);
      setHasNextPage(newPayments.length === 25);
      setPayments((prev) => [...prev, ...newPayments]);
      setLoading(false);
    };
    const getWithdraw = async () => {
      setLoading(true);
      const newWithdraws = await getWithdrawTransactions(page, datePicker);
      setHasNextPage(newWithdraws.length === 25);
      setWithdraws((prev) => [...prev, ...newWithdraws]);
      setLoading(false);
    };
    if (selectedTab.value === 'replenish') {
      void getPayments();
    } else {
      void getWithdraw();
    }
  }, [selectedTab.value, page, datePicker]);

  const addPage = (page: number) => {
    setPage(page);
  };

  const changeDate = (start: Date, end: Date) => {
    setDatePicker({ start: start, end: end });
    setPage(1);
    if (selectedTab.value === 'replenish') {
      setPayments([]);
    } else {
      setWithdraws([]);
    }
  };

  const closeModal = () => {
    setOpenModal(false);
    setSelectedPayment(null);
    setPaymentData(null);
  };

  return (
    <div className={styles.container}>
      <div className="flex gap-[15px] mb-[15px]">
        <DatePicker
          selectsStart
          selected={datePicker.start}
          startDate={datePicker.start}
          popperClassName={styles.date_popper}
          endDate={datePicker.end}
          onChange={(value) => changeDate(value, datePicker.end)}
          placeholder={t('start')}
        />
        <DatePicker
          containerClassName="w-[100px]"
          selectsEnd
          selected={datePicker.end}
          popperClassName={styles.r_date_popper}
          startDate={datePicker.start}
          endDate={datePicker.end}
          onChange={(value) => changeDate(datePicker.start, value)}
          placeholder={t('end')}
        />
      </div>
      <div className={styles.tabs}>
        {filterHistory.map((item, index) => (
          <TabItem
            selected={item.value === selectedTab.value}
            key={index}
            onClick={() => selectFilter(item)}
          >
            {t(item.label)}
          </TabItem>
        ))}
      </div>
      <div className={styles.list}>
        {!loading ? (
          selectedTab.value === 'replenish' ? (
            payments.map((item, index) => (
              <WalletHistoryItem
                key={index}
                setPaymentData={setPaymentData}
                transaction={item}
                setIsError={setIsError}
                openModal={setOpenModal}
                setSelectedPayment={setSelectedPayment}
                setTransactionLoading={setTransactionLoading}
                type="payment"
                providers={paymentProviders ? paymentProviders : []}
              />
            ))
          ) : (
            withdraws.map((item, index) => (
              <WalletHistoryItem
                key={index}
                setPaymentData={setPaymentData}
                setIsError={setIsError}
                transaction={item}
                openModal={setOpenModal}
                type="withdraw"
                setSelectedPayment={setSelectedPayment}
                setTransactionLoading={setTransactionLoading}
                providers={withdrawProviders ? withdrawProviders : []}
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
          onClick={() => addPage(page + 1)}
        >
          {t('MORE')}
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
        paymentData={paymentData}
        isError={isError}
        isOpen={openModal}
        loading={transactionLoading}
        transaction={selectedPayment}
        close={closeModal}
      />
    </div>
  );
};

export default WalletHistory;
