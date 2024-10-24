import { IBonusTabs } from './models/interface';

export const tabs: IBonusTabs[] = [
  {
    tab: {
      label: 'actives',
      value: 'false',
    },
    filters: [
      {
        label: 'all',
        value: 0,
      },
      {
        label: 'actives',
        value: 2,
      },
      {
        label: 'noActives',
        value: 1,
      },
    ],
  },
  {
    tab: {
      label: 'History',
      value: 'true',
    },
    filters: [
      {
        label: 'all',
        value: 0,
      },
      {
        label: 'ended',
        value: 3,
      },
      {
        label: 'canceled',
        value: 4,
      },
      {
        label: 'expired',
        value: 5,
      },
    ],
  },
];
