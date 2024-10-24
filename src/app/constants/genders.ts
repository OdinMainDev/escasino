import { ISelectOption } from '@/shared/ui/Select';

export const genderSelect: ISelectOption[] = [
  {
    label: 'chooseGender',
    value: '',
    disabled: true,
  },
  {
    value: 'male',
    label: 'male',
  },
  {
    value: 'female',
    label: 'female',
  },
  {
    value: 'other',
    label: 'other',
  },
];
