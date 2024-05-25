import { isErrorResponseString } from '@/shared/helpers/error';
import { IErrorResponse } from '@/shared/models/interfaces/error';

export const errorValidator = (error?: IErrorResponse): string => {
  if (error && isErrorResponseString(error)) {
    switch (error.errors) {
      case 'BadAmount':
      case 'BadLimitMinimumAmount':
      case 'BadLimitMaximumAmount':
        return 'не верно указана сумма выплаты, повторите позже';
      case 'BadBalance':
        return 'у вас недостаточно средств';
      case 'HasWager':
        return 'у вас присутствует вейджер';
      case 'HasActiveBonus':
        return 'у вас есть активный бонус';
      case 'HasAliveBonuses':
        return 'у вас есть неиспользованные бонусы';
      default:
        return 'ошибка платежа, попробуйте позжe';
    }
  }

  return 'ошибка платежа, попробуйте позжe';
};
