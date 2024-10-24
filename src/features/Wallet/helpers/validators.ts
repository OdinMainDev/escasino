import { isErrorResponseString } from '@/shared/helpers/error';
import { IErrorResponse } from '@/shared/models/interfaces/error';
import { checkAmount } from './payment';
import { IValidateData } from '../models/interfaces';

export const errorValidator = (error?: IErrorResponse): string => {
  if (error && isErrorResponseString(error)) {
    switch (error.errors) {
      case 'BadAmount':
      case 'BadLimitMinimumAmount':
      case 'BadLimitMaximumAmount':
        return 'badAmount';
      case 'BadBalance':
        return 'badBalance';
      case 'HasWager':
        return 'hasWager';
      case 'HasActiveBonus':
        return 'hasActiveBonus';
      case 'HasAliveBonuses':
        return 'hasAliveBonuses';
      default:
        return 'paymentError';
    }
  }

  return 'paymentError';
};

export const validateCardData = (month: number, year: number): boolean => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear() % 100;

  if (year >= currentYear && month === 0) {
    return true;
  }

  if (year === 0 && month >= 1 && month <= 12) {
    return true;
  }

  if (year < currentYear) {
    return false;
  }

  if (year === currentYear && month < currentMonth) {
    return false;
  }

  if (month < 1 || month > 12) {
    return false;
  }

  return true;
};

export const validateByInputName = (name: string, value: string | null): boolean => {
  if (value) {
    if (name === 'exp_year') {
      return Number(new Date().getFullYear().toString().slice(-2)) <= Number(value);
    }

    if (name === 'exp_month') {
      return Number(value) <= 12 && Number(value) >= 1;
    }

    if (name === 'cvc') {
      return value.length === 3;
    }

    if (name === 'number') {
      return value.replace(/\s+/g, '').length === 16;
    }
    return true;
  }

  return true;
};

export const validateData = ({ amount, max, min, layout }: IValidateData) => {
  if (checkAmount(Number(amount), max, min)) {
    return false;
  }
  for (const key in layout) {
    if (!layout[key] || !validateByInputName(key, layout[key])) {
      return false;
    }
  }

  return true;
};
