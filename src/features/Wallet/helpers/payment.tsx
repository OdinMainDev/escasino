import {
  IPaymentProviderFees,
  IPaymentProviderRules,
} from '@/shared/models/interfaces/paymentProviders';
import classNames from 'classnames';
import styles from '../ui/WalletTabs/styles.module.scss';

export const generateLimitText = (min: number, max: number, currency: string, amount: number) => {
  const minimum =
    min > 0 ? (
      <div className={classNames({ [styles.error]: checkAmount(amount, max, min) })}>
        Mинимум: {min} {currency}
      </div>
    ) : null;
  const maximum =
    max > 0 ? (
      <div className={classNames({ [styles.error]: checkAmount(amount, max, min) })}>
        Максимум: {max} {currency}
      </div>
    ) : null;
  return (
    <div>
      <div className="flex items-center justify-between">
        {minimum}
        {maximum}
      </div>
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
  if (amout <= min) {
    return true;
  }

  if (amout > max && max !== 0) {
    return true;
  }

  return false;
};
