export interface ILoginData {
  email: string;
  password: string;
  fid: string;
  captcha: string;
  remember: boolean;
}

export interface ILoginRes {
  success: boolean;
  token: string;
}

interface IError {
  email?: string[];
  password?: string[];
}

export interface ILoginError {
  error: IError | string;
  success: boolean;
}
