export interface IAuthRes {
  success: boolean;
  token: string;
}

export interface IAuthErrorCont {
  [key: string]: string[];
}

export interface IAuthError {
  errors: IAuthErrorCont;
  success: boolean;
}

export const AuthErrorResponse = (
  key: string,
  prefix: string,
  data: IAuthError | undefined | null,
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
