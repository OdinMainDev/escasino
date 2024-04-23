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

  if ((data.errors as unknown as string) === key) {
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands, @typescript-eslint/no-base-to-string
    return prefix + '(Ошибка: ' + data.errors + ' )';
  }

  if (!data.errors[key]) {
    return '';
  }

  return prefix + '(Ошибка: ' + data.errors[key].join(', ') + ' )';
};
