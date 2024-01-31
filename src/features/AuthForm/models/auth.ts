interface IError {
  email?: string[];
  password?: string[];
}

export interface IAuthRes {
  success: boolean;
  token: string;
}

export interface IAuthError {
  error: IError | string;
  success: boolean;
}
