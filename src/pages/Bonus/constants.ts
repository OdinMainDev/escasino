import { IBonusTabs } from './models/interface';

export const tabs: IBonusTabs[] = [
  {
    tab: {
      label: 'Активные',
      value: 'current',
    },
    filters: [
      {
        label: 'Все',
        value: 0,
      },
      {
        label: 'Активные',
        value: 2,
      },
      {
        label: 'Не активные',
        value: 1,
      },
    ],
  },
  {
    tab: {
      label: 'История',
      value: 'history',
    },
    filters: [
      {
        label: 'Все',
        value: 0,
      },
      {
        label: 'Завершенный',
        value: 3,
      },
      {
        label: 'Отмененные',
        value: 4,
      },
      {
        label: 'Истекший',
        value: 5,
      },
    ],
  },
];
