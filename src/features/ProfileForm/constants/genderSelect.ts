import { ISelectOption } from '@/shared/models/interfaces/select';

export const genderSelect: ISelectOption[] = [
  {
    label: 'Не выбрано',
    value: '',
    disabled: true,
  },
  {
    value: 'male',
    label: 'Мужчина',
  },
  {
    value: 'female',
    label: 'Женщина',
  },
  {
    value: 'other',
    label: 'Не определились?',
  },
];
