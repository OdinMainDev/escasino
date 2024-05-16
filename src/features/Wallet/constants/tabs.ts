import { ITab } from '@/entities/Tabs';

export const tabs: ITab[] = [
  {
    label: 'Пополнить',
    value: 'replenish',
  },
  {
    label: 'Вывести',
    value: 'withdraw',
  },
  {
    label: 'История',
    value: 'history',
  },
];

export const filterHistory = [
  {
    label: 'Пополнение',
    value: 'replenish',
  },
  {
    label: 'Выводы',
    value: 'withdrawal',
  },
];
