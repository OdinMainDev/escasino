import { IResponseError } from '../models/interfaces/misc';

export const ErrorResponseAsString = (
  key: string,
  prefix: string,
  data: IResponseError | undefined | null,
) => {
  if (!data || !data.errors) {
    return '';
  }

  const error = typeof data.errors === 'object' ? data.errors[key] : '';

  if (!error) {
    return '';
  }

  const errorMessage = Array.isArray(error) ? error.join(', ') : error;

  return `${prefix}(${errorMessage})`;
};
