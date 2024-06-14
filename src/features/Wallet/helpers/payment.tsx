import {
  IPaymentProviderFees,
  IPaymentProviderRules,
} from '@/shared/models/interfaces/paymentProviders';
import classNames from 'classnames';
import styles from '../ui/WalletTabs/styles.module.scss';
import { IPaymentTransaction } from '../models/interfaces';
import { transactionTypes } from '../models/types';

export const generateLimitText = (min: number, max: number, currency: string, amount: string) => {
  const minimum =
    min > 0 ? (
      <div
        className={classNames({
          [styles.error]: amount.length > 0 ? checkAmount(Number(amount), max, min) : false,
        })}
      >
        Mинимум: {min} {currency}
      </div>
    ) : null;
  const maximum =
    max > 0 ? (
      <div
        className={classNames({
          [styles.error]: amount.length > 0 ? checkAmount(Number(amount), max, min) : false,
        })}
      >
        Максимум: {max} {currency}
      </div>
    ) : null;
  return (
    <div className="flex items-center justify-between">
      {minimum}
      {maximum}
    </div>
  );
};

export const generateComissionText = (
  compensate?: IPaymentProviderRules,
  fees?: IPaymentProviderFees,
) => {
  return (
    <div className="flex items-center justify-between mb-[10px]">
      {fees && fees?.percent > 0 ? <div>Комиссия {fees?.percent}%</div> : ''}
      {compensate?.compensate_commission && (
        <div>Компенсируем комиссию платежной системы {compensate.without_bonus_wager}%</div>
      )}
    </div>
  );
};

export const checkAmount = (amout: number, max: number, min: number): boolean => {
  if (amout === 0) {
    return true;
  }
  if (amout < min) {
    return true;
  }

  if (amout > max && max !== 0) {
    return true;
  }

  return false;
};

export const getTransactionType = (transaction: IPaymentTransaction): transactionTypes => {
  if (transaction.status === 'success') {
    if ('address' in transaction) {
      return 'first';
    }

    if ('requisites' in transaction) {
      return 'requisites';
    }

    if ('url' in transaction) {
      return 'second';
    }

    if ('acs_url' in transaction) {
      return 'acs_url';
    }
  }
  if (transaction.status === 'paymentAccepted' || transaction.status === 'PaymentCompleted') {
    return 'paymentAccepted';
  }
  return 'success';
};
