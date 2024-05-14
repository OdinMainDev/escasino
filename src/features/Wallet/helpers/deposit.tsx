import {
  IPaymentProviderFees,
  IPaymentProviderRules,
} from '@/shared/models/interfaces/paymentProviders';

export const generateLimitText = (
  min: number,
  max: number,
  currency: string,
  compensate?: IPaymentProviderRules,
  fees?: IPaymentProviderFees,
) => {
  const minimum = min > 0 ? `Mинимум: ${min} ${currency}` : '';
  const maximum = max > 0 ? `Максимум: ${max} ${currency}` : '';
  return (
    <div>
      <div className="flex items-center justify-between mb-[10px]">
        {fees && fees?.percent > 0 ? <div>Комиссия {fees?.percent}%</div> : ''}
        {compensate?.compensate_commission && (
          <div>Компенсируем комиссию платежной системы {compensate.without_bonus_wager}%</div>
        )}
      </div>
      <div className="flex items-center justify-between">
        {minimum}
        {maximum}
      </div>
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
