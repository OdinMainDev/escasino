import {
  IHistoryItem,
  IPaymentData,
  IPaymentTransaction,
} from '@/features/Wallet/models/interfaces';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { IPaymentProvider } from '@/shared/models/interfaces/paymentProviders';
import { paymentTransaction } from '@/features/Wallet/api/replenishApi';
import Button from '@/shared/ui/Button';
import { useTranslation } from 'react-i18next';
import { IWithdrawProvider } from '@/shared/models/interfaces/withdrawProviders';
import { useCurrentLanguage } from '@/app/providers/LangProvider';
import dateFormatter from '@/shared/helpers/dateFormatter';

interface IProps {
  transaction: IHistoryItem;
  type: 'payment' | 'withdraw';
  providers: IPaymentProvider[] | IWithdrawProvider[];
  setPaymentData: (data: IPaymentData) => void;
  setTransactionLoading: (value: boolean) => void;
  openModal: (value: boolean) => void;
  setIsError: (value: boolean) => void;
  setSelectedPayment: (value: IPaymentTransaction | null) => void;
}

const WalletHistoryItem = ({
  transaction,
  providers,
  type,
  setTransactionLoading,
  openModal,
  setPaymentData,
  setSelectedPayment,
  setIsError,
}: IProps) => {
  const provider = providers.find((item) => item.id === transaction.provider_id);
  const { t } = useTranslation();
  const currentLanguage = useCurrentLanguage();

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
      case 3:
        return 'Await';
      case 4:
        return 'Success';
      case 5:
        return 'Error';
      case 6:
        return 'Delete';
    }

    return 'Created';
  };

  const paymentTransactionHandler = async (hash: string) => {
    try {
      setIsError(false);
      setTransactionLoading(true);
      const { data } = await paymentTransaction(hash);
      if (data.success) {
        setTransactionLoading(false);
        setSelectedPayment(data.data);
        setPaymentData(data.payment_data);
      } else {
        setIsError(true);
      }
    } catch (e) {
      setTransactionLoading(false);
      setIsError(true);
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
          <div className={styles.value}>{dateFormatter(transaction.created_at)}</div>
        </div>
        <div className={styles.data}>
          <div className={styles.label}>Дата завершения</div>
          <div className={styles.value}>{dateFormatter(transaction.completed_at)}</div>
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
              provider.meta.texts.find((item) => item.language.toLowerCase() === currentLanguage)
                ?.value}
          </div>
        </div>
        {transaction.status === 1 && (
          <div className={styles.data}>
            <Button size="s" reverseTheme className="uppercase w-[100%]" elType="outlined">
              перейти к платежу
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WalletHistoryItem;
