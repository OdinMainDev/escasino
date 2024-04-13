import { ISelectOption } from '@/shared/ui/Select';

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
