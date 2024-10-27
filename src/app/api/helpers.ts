import { IResponseError } from '@/shared/models/interfaces/misc';

export const ErrorResponseAsString = (
  key: string,
  prefix: string,
  data: IResponseError | undefined | null,
): string => {
  if (!data || !data.errors) {
    return '';
  }

  if (typeof data.errors === 'string') {
    if (data.errors === key) {
      return `${prefix}(Ошибка: ${data.errors})`;
    }
    return '';
  }

  const error = data.errors[key];
  if (!error) {
    return '';
  }

  const errorMessage = Array.isArray(error) ? error.join(', ') : error;

  return `${prefix}(Ошибка: ${errorMessage})`;
};
