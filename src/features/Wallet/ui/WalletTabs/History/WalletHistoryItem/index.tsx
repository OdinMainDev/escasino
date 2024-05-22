import { IHistoryItem, IPaymentTransaction } from '@/features/Wallet/models/interfaces';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { padNumber } from '@/shared/helpers/padNumber';
import { IPaymentProvider } from '@/shared/models/interfaces/paymentProviders';
import { defaultLanguage } from '@/app/config/locales';
import { paymentTransaction } from '@/features/Wallet/api/replenishApi';
import Button from '@/shared/ui/Button';
import { useTranslation } from 'react-i18next';

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
  type,
  setTransactionLoading,
  openModal,
  setSelectedPayment,
}: IProps) => {
  const provider = providers.find((item) => item.id === transaction.provider_id);
  const { t } = useTranslation();

  const getStatus = (status: number, type: string) => {
    if (type == 'payment') {
      switch (status) {
        case 2:
          return 'Success';
        case 3:
          return 'Error';
        case 4:
          return 'Delete';
      }
    }
    switch (status) {
      case 2:
        return 'Await';
      case 3:
        return 'Success';
      case 4:
        return 'Error';
      case 5:
        return 'Delete';
    }

    return 'Created';
  };

  const getDate = (date: number): string => {
    if (date !== 0) {
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
            [styles.good]: getStatus(transaction.status, type) === 'Success',
            [styles.middle]: getStatus(transaction.status, type) == 'Await',
            [styles.bad]:
              getStatus(transaction.status, type) === 'Delete' ||
              getStatus(transaction.status, type) == 'Error',
          })}
        >
          {t('historyWalletStatuses.' + getStatus(transaction.status, type))}
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
