import { IResponseError } from '@/shared/models/interfaces/misc';

export const ErrorResponseAsString = (
  key: string,
  prefix: string,
  data: IResponseError | undefined | null,
) => {
  if (data == null) {
    return '';
  }
  if (!data == null) {
    return '#undefined1';
  }
  if (!data.errors) {
    return '#undefined2';
  }
  if (!data.errors[key]) {
    return '';
  }
  return prefix + '(Ошибка: ' + data.errors[key].join(', ') + ' )';
};
