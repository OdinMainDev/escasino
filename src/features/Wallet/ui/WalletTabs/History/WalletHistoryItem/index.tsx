import { IHistoryItem, IPaymentTransaction } from '@/features/Wallet/models/interfaces';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { padNumber } from '@/shared/helpers/padNumber';
import { IPaymentProvider } from '@/shared/models/interfaces/paymentProviders';
import { defaultLanguage } from '@/app/config/locales';
import { paymentTransaction } from '@/features/Wallet/api/replenishApi';
import Button from '@/shared/ui/Button';

interface IProps {
  transaction: IHistoryItem;
  type: 'payment' | 'withdraw';
  providers: IPaymentProvider[];
  setTransactionLoading: (value: boolean) => void;
  openModal: (value: boolean) => void;
  setSelectedPayment: (value: IPaymentTransaction | null) => void;
}

const WalletHistoryItem = ({
  transaction,
  providers,
  setTransactionLoading,
  openModal,
  setSelectedPayment,
}: IProps) => {
  const provider = providers.find((item) => item.id === transaction.provider_id);

  const getStatus = (status: number) => {
    if (status === 1) {
      return 'Создан';
    }
    if (status === 2) {
      return 'В обработке';
    }
    if (status === 3) {
      return 'Успешно';
    }
    if (status === 4) {
      return 'Ошибка';
    }
    if (status === 5) {
      return 'Удален';
    }
  };

  const getDate = (date: number): string => {
    if (date === 0) {
      const timestampInMilliseconds = date * 1000;
      const convertedDate = new Date(timestampInMilliseconds);
      return `${padNumber(convertedDate.getDate())}.${padNumber(convertedDate.getMonth() + 1)}.${padNumber(convertedDate.getFullYear())}, ${padNumber(convertedDate.getHours())}:${padNumber(convertedDate.getMinutes())}`;
    }
    return '--.--.----, --:--';
  };

  const paymentTransactionHandler = async (hash: string) => {
    try {
      setTransactionLoading(true);
      const { data } = await paymentTransaction(hash);
      if (data.data.status === 'success') {
        setTransactionLoading(false);
        setSelectedPayment(data.data);
      }
    } catch (e) {
      setTransactionLoading(false);
    }
  };

  const openProviderInfo = () => {
    if (transaction.status === 1) {
      openModal(true);
      void paymentTransactionHandler(transaction.hash);
    }
  };

  return (
    <div className={styles.container} onClick={openProviderInfo}>
      <div className="flex justify-between mb-[16px]">
        <div
          className={classNames(styles.status, {
            [styles.good]: transaction.status === 1 || transaction.status === 3,
            [styles.middle]: transaction.status === 2,
            [styles.bad]: transaction.status === 4 || transaction.status === 5,
          })}
        >
          {getStatus(transaction.status)}
        </div>
      </div>
      <div className="flex justify-between mb-[10px]">
        <div className={styles.data}>
          <div className={styles.label}>Дата создания</div>
          <div className={styles.value}>{getDate(transaction.created_at)}</div>
        </div>
        <div className={styles.data}>
          <div className={styles.label}>Дата завершения</div>
          <div className={styles.value}>{getDate(transaction.completed_at)}</div>
        </div>
      </div>
      <div className="flex justify-between mb-[10px]">
        <div className={styles.data}>
          <div className={styles.label}>Внесенная сумма</div>
          <div className={styles.value}>
            {transaction.formatted_amount} {transaction.currency}
          </div>
        </div>
        <div className={styles.data}>
          <div className={styles.label}>Итоговая сумма</div>
          <div className={styles.value}>
            {transaction.formatted_total_amount} {transaction.currency}
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <div className={styles.data}>
          <div className={styles.label}>Платежная система</div>
          <div className={styles.value}>
            {provider &&
              provider.meta.texts.find((item) => item.language.toLowerCase() === defaultLanguage)
                ?.value}
          </div>
        </div>
        {transaction.status === 1 && (
          <div className={styles.data}>
            <Button size="s" className="uppercase w-[100%]" elType="outlined">
              перейти к платежу
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WalletHistoryItem;
