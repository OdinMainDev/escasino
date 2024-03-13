import { ISelectOption } from '@/shared/components/Select';

export const genderSelect: ISelectOption[] = [
  {
    label: 'Выберите пол',
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
